<!doctype html>
<html lang="pl">
<?php
require_once('header.php');
$strona = "create";
?>
<body class="bg-light">
  <script>
    $(document).ready(function() {
      przelicz();
      var maxPytan = 10;
      var maxOdpowiedzi = 5;
      var pytanieNumer = 0;

      $(".addPytanie").click(function() {
        if ($('body').find('.fieldPytanie').length < maxPytan) {
          var fieldHTML = '<div class="form-group fieldPytanie">' + $(".fieldPytanieCopy").html() + '</div>';
          $('body').find('.fieldPytanie:last').after(fieldHTML);
          przelicz();
        } else {
          alert('Maksymalna ilość pytań to ' + maxPytan);
        }
      });

      $("body").on("click", ".addOdpowiedz", function() {
        if ($(this).closest(".fieldPytanie").find('.fieldOdpowiedz').length < maxOdpowiedzi) {
          var fieldHTML = document.createElement('div');
          fieldHTML.classList.add("input-group");
          fieldHTML.classList.add("fieldOdpowiedz");
          fieldHTML.innerHTML = $(".fieldOdpowiedzCopy").html();
          $(this).closest(".fieldPytanie").append(fieldHTML);
          przelicz();
        } else {
          alert('Maksymalna ilość odpowiedzi do jednego pytania to ' + maxOdpowiedzi);
        }
      });

      function przelicz() {
        var pytanie = 0;
        var odp = 0;
        $('.fieldPytanie').each(function() {
          $(this).find('.licznik').remove();
          var text = $("<input class='licznik' value='" + $(this).find('.odp').length + "' name='pytanieODP[]' type='hidden' />");
          $(this).closest('.fieldPytanie').append(text);
        });
      }

      $("body").on("click", ".PytanieRemove", function() {
        $(this).closest(".fieldPytanie").remove();
        przelicz();
      });

      $("body").on("click", ".OdpowiedzRemove", function() {
        $(this).closest(".fieldOdpowiedz").remove();
        przelicz();
      });
    });
  </script>
  <style>
    .fieldPytanie {
      margin: 10px 0;

    }
    .fieldOdpowiedz {
      margin-left: 50px;
      margin-top: 5px;
    }
    span {
      font-size: x-large;
      text-align: center;
    }
    label {
      margin-right: 50px;
    }
  </style>
  <div class="container">
    <main>
      <?php
      require_once('logo.php');
      ?>
      <div class="row">
        <div>
          <h4 class="mb-3">Tworzenie Quizu</h4>
          <form method="post" action="formularz.php">
            <div class="form-group" style="margin-top: 10px">
              <div class="input-group">
                <label for="nazwa">Nazwa</label>
                <input type="text" name="nazwa" id="nazwa" class="form-control" placeholder="Nazwa Quizu" required />
              </div>
            </div>
            <div class="form-group" style="margin-top: 10px">
              <div class="input-group">
                <label for="opis">Opis</label>
                <input type="text" name="opis" id="opis" class="form-control" placeholder="Opis Quizu" required />
              </div>
            </div>
            <div class="form-group fieldPytanie">

              <div class="input-group">
                <input type="text" name="pytanie[]" class="form-control pyt" placeholder="Pytanie" required />
                <div class="input-group-addon">
                  <a href="javascript:void(0)" class="btn btn-success addPytanie"><span class="bi bi-plus" aria-hidden="true"></span></a>
                </div>
              </div>
              <div class="input-group fieldOdpowiedz">
                <input type="text" name="odp[]" class="form-control odp" placeholder="Odpowiedź" required />
                <div class="input-group-addon">
                  <a href="javascript:void(0)" class="btn btn-success addOdpowiedz"><span class="bi bi-plus" aria-hidden="true"></span></a>
                </div>
              </div>
              <input name="ilosc" type="hidden">
            </div>
            <div class="text-center">
              <input type="submit" name="submit" class="btn btn-primary" value="Wyślij" />
            </div>
          </form>
        </div>
      </div>
    </main>
    <!-- Kopiowane divy -->
    <div class="form-group fieldPytanieCopy" style="display: none;">
      <div class="input-group">
        <input type="text" name="pytanie[]" class="form-control pyt" placeholder="Pytanie" required />
        <div class="input-group-addon">
          <a href="javascript:void(0)" class="btn btn-danger PytanieRemove"><span class="bi bi-dash" aria-hidden="true"></span></a>
        </div>
      </div>
      <div class="input-group fieldOdpowiedz">
        <input type="text" name="odp[]" class="form-control odp" placeholder="Odpowiedź" required />
        <div class="input-group-addon">
          <a href="javascript:void(0)" class="btn btn-success addOdpowiedz"><span class="bi bi-plus" aria-hidden="true"></span></a>
        </div>
      </div>
    </div>

    <div class="input-group fieldOdpowiedzCopy" style="display: none;">
      <input type="text" name="odp[]" class="form-control odp" placeholder="Odpowiedź" required />
      <div class="input-group-addon">
        <a href="javascript:void(0)" class="btn btn-danger OdpowiedzRemove"><span class="bi bi-dash" aria-hidden="true"></span></a>
      </div>
    </div>

    <?php
    require_once('footer.php');
    ?>
  </div>
</body>

</html>