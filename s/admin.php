<?php
  header('Access-Control-Allow-Origin: *');
  require_once('../s/settings.php');
  
  switch ($_POST['admin']) {
    case "update":
      $url = $SETTINGS['SERVER'] . $_POST['colecoes'] . "/verbete/" . $_POST['id'] ."/";
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_HEADER, 0);
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($_POST["palavra"]));
      $response = curl_exec($ch);
      curl_close($ch);
      break;
    case "delete":
      $url = $SETTINGS['SERVER'] . $_POST['colecoes'] . "/verbete/" . $_POST['id'] ."/";
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_HEADER, 0);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
      $response = curl_exec($ch);
      curl_close($ch);
      break;
  }
?>