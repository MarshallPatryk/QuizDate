<?php
require('api.php');
$json = json_decode(file_get_contents('php://input'), true);

if ($json['wgrajodpowiedzi']) {
	$data = $json['wartosci'];
	$idquiz = $json['idquizu'];
	$iduser = $json['iduser'];
	dodajOdpowiedz($idquiz, $iduser, $data, $firestore);
} else if ($json['dopasuj']) {
	$iduser = $json['uid'];
	dopasuj($iduser, $firestore);
} else if ($json['ustawienia']) {
	$iduser = $json['uid'];
	$data = array();
	if (!empty($json['haslo']) && (strlen($json['haslo']) > 8)) {
		$data['password'] = $json['haslo'];
	}
	if (!empty($json['nazwa'])) {
		$data['fullName'] = $json['nazwa'];
	}
	if (!empty($json['kontakt']) && (strlen($json['kontakt']) > 4)) {
		$data['contact'] = $json['kontakt'];
	}
	updateSettings($iduser, $data, $firestore);
}
