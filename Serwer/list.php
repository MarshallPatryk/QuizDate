<!doctype html>
<html lang="pl">
<?php
require_once('header.php');
$strona = "list";
?>
<body class="bg-light">
  <div class="container">
    <main>
      <?php
      require_once('logo.php');
      require_once './api/inc/vendor/autoload.php';

      use Google\Cloud\Firestore\FirestoreClient;
      use Google\Cloud\Firestore\FieldValue;
      use Google\Cloud\Core\Timestamp;
      $firestore = new FirestoreClient([
        'keyFile' => json_decode(file_get_contents('./api/dane.json'), true)
      ]);
      $quizes = $firestore->collection('quizes');
      $snapshot = $quizes->documents();
      ?>
      <div class="row g-3 ">
        <div class="col-md-12 col-lg-12">
          <h4 class="mb-3">Lista Quizów <a href="create.php" class="btn btn-info" role="button">Nowy Quiz</a></h4>
          <div class="whitebackground">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col" style="width: 26%">Nazwa</th>
                  <th scope="col" style="width: 26%">Opis</th>
                  <th scope="col">Ilość Pytań</th>
                  <th scope="col">Usuń</th>
                </tr>
              </thead>
              <tbody>
                <?php
                foreach ($snapshot as $quiz) {
                ?>
                  <tr>
                    <td><?php echo $quiz->id(); ?></td>
                    <td><?php echo $quiz['name']; ?></td>
                    <td><?php echo $quiz['description']; ?></td>
                    <td><?php echo count($quiz['quest1']); ?></td>
                    <td>
                      <a href="remove.php?id=<?php echo $quiz->id(); ?>" class="btn btn-outline-danger" role="button"><span class="bi bi-x-circle" aria-hidden="true"></span></a>
                    </td>
                  </tr>
                <?php
                }
                ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
    <?php
    require_once('footer.php');
    ?>
  </div>
</body>
</html>