<div class="py-5 text-center">
  <a href="index.php"><img class="d-block mx-auto mb-4" src="./assets/logo.png" alt="" width="50%"></a>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link <?php if ($strona == "index") {
                            echo "active";
                          } ?>" aria-current="page" href="index.php">Index</a>
    </li>
    <li class="nav-item">
      <a class="nav-link <?php if ($strona == "list") {
                            echo "active";
                          } ?>" aria-current="page" href="list.php">Quizy</a>
    </li>
    <li class="nav-item">
      <a class="nav-link <?php if ($strona == "create") {
                            echo "active";
                          } ?>" href="create.php">Stwórz</a>
    </li>
  </ul>
</div>