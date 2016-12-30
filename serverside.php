<?php
$token = $_GET['token'];

$now = new DateTime();
$ny_date = new DateTime('01.01.2017 00:00:00');
$interval = $ny_date->diff($now);

$status_text = '2017 наступит через '.$interval->format("%a д. %h ч. %i мин.");

$response = file_get_contents('https://api.vk.com/method/status.set?access_token='.$token.'&text='.$status_text.'&group_id=0&v=5.60');
echo $response;