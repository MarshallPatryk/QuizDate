<?php
require_once './inc/vendor/autoload.php';

use Google\Cloud\Firestore\FirestoreClient;
use Google\Cloud\Firestore\FieldValue;
use Google\Cloud\Core\Timestamp;

$firestore = new FirestoreClient([
	'keyFile' => json_decode(file_get_contents('dane.json'), true)
]);

function getUserData($id, $firestore)
{
	$collectionReference = $firestore->collection('users');
	$documentReference = $collectionReference->document($id);
	$snapshot = $documentReference->snapshot();
	return $snapshot;
}
function getAllUsersData($firestore)
{
	$collectionReference = $firestore->collection('users');
	$snapshot = $collectionReference->documents();
	return $snapshot;
}
function dodajOdpowiedz($idquiz, $iduser, $data, $firestore)
{
	$Ref = $firestore->collection('odpowiedzi')->document($iduser);
	$dataWysylane = [
		'quizy' => [
			$idquiz . '' =>
			$data
		],
	];
	$Ref->set($dataWysylane, ['merge' => true]);
}
function updateSettings($iduser, $data, $firestore)
{
	$Ref = $firestore->collection('users')->document($iduser);
	$Ref->set($data, ['merge' => true]);
}
function dopasuj($iduser, $firestore)
{
	$Ref = $firestore->collection('users')->document($iduser);
	$snapshot = $Ref->snapshot();
	$ostatniaData = $snapshot['dopasowanie'];
	if ((strtotime('-1 day') > strtotime($ostatniaData)) || empty($ostatniaData)) {
		$data = array();
		$data['dopasowanie'] = new Timestamp(new DateTime());
		$Ref->set($data, ['merge' => true]);
		$UserRef = $firestore->collection('odpowiedzi')->document($iduser);
		$snapUserRef = $UserRef->snapshot();
		$quizes = $snapUserRef['quizy'];
		$UsersRef = $firestore->collection('odpowiedzi');
		$UsersRefdocuments = $UsersRef->documents();
		foreach ($UsersRefdocuments as $document) {
			if ($document->exists()) {
				$user2id = $document->id();
				if ($user2id == $iduser) {
					continue;
				}
				$wspolnequizy = 0;
				$wspolneodpowiedzi = 0;
				$wszystkieodpowiedzi = 0;
				$quizesUser2 = $document['quizy'];
				foreach ($quizesUser2 as $keyUr2 => $obj) {
					if (isset($quizes[$keyUr2])) {
						$wspolnequizy++;
						foreach ($obj as $Pytanie => $odp) {
							$wszystkieodpowiedzi++;
							if ($odp == $quizes[$keyUr2][$Pytanie]) {
								$wspolneodpowiedzi++;
							}
						}
					}
				}
				$procent = ($wspolneodpowiedzi / $wszystkieodpowiedzi);
				if ($procent >= 0.5) {
					$dowgrania = array();
					$dowgrania['WspolneQuizy'] = $wspolnequizy;
					$dowgrania['WspolneOdpowiedzi'] = $wspolneodpowiedzi;
					$dowgrania['WszystkieOdpowiedzi'] = $wszystkieodpowiedzi;
					$dowgrania['Procent'] = $procent * 100;
					$dowgrania['DataDopasowania'] = new Timestamp(new DateTime());
					$dowgrania['uid'] = $user2id;
					$Dopasowani = $firestore->collection('dopasowanie')->document($iduser);
					$dataWysylane = [
						$user2id . '' => $dowgrania
					];
					$Dopasowani->set($dataWysylane, ['merge' => true]);
				}
			}
		}
	} else {
		return "Możesz dopasowywać tylko raz na dzień!";
	}
}
