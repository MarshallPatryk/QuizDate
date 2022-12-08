<?php
require_once './api/inc/vendor/autoload.php';
use Google\Cloud\Firestore\FirestoreClient;
use Google\Cloud\Firestore\FieldValue;
use Google\Cloud\Core\Timestamp;
$firestore = new FirestoreClient([
    'keyFile' => json_decode(file_get_contents('./api/dane.json'), true)
]);

if ($_POST['pytanie'] && $_POST['odp'] && $_POST['pytanieODP']) {
    $quizes = $firestore->collection('quizes')->newDocument();
    $pytania = $_POST['pytanie'];
    $iloscOdpDoPytania = $_POST['pytanieODP'];
    $odpowiedzi = $_POST['odp'];
    $dane = array();
    $dane['name'] = $_POST['nazwa'];
    $dane['description'] = $_POST['opis'];
    $dane['quest1'] = array();
    $alphabet = range('A', 'Z');
    $dodajLiczbe = 0;
    foreach ($pytania as $key => $value) {
        $ilosc = $iloscOdpDoPytania[$key];
        $object = array();
        $object['pytanie'] = $value;
        for ($i = 0; $i < $ilosc; $i++) {
            $object[$alphabet[$i]] = $odpowiedzi[$dodajLiczbe];
            $dodajLiczbe++;
        }
        $object = (object)$object;
        $dane['quest1'][] = $object;
    }
    $quizes->set($dane);
    header('Location: /api/list.php');
    exit;
}
