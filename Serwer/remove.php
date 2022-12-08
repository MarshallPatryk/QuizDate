<?php
require_once './api/inc/vendor/autoload.php';

use Google\Cloud\Firestore\FirestoreClient;
use Google\Cloud\Firestore\FieldValue;
use Google\Cloud\Core\Timestamp;

$firestore = new FirestoreClient([
    'keyFile' => json_decode(file_get_contents('./api/dane.json'), true)
]);

if ($_GET['id']) {
    $quizes = $firestore->collection('quizes')->document($_GET['id'])->delete();
    header('Location: /api/list.php');
    exit;
}
