<?php
require_once '../Vendors/autoload.php';
require_once 'config.php';

// hacky, should replace with a micro-framework

$callback = $_GET['callback'];
if( empty($_GET['url']) ) {
    $errMsg = array( 'verbose_msg' => 'Please provide an url' );
    echo renderJsonp( $callback, $errMsg);
    return;
}

$url = $_GET['url'];
$apiKey = API_KEY;

$urlInst = new \VirusTotal\Url($apiKey);
$scanResponse = $urlInst->scan($url);

if( isset($scanResponse['resource'] ) ) {
    $reportResponse = $urlInst->getReport($scanResponse['resource']);
    echo $callback . '('. json_encode($reportResponse) . ');';
    echo renderJsonp( $callback, $reportResponse);
    return;
}

echo renderJsonp( $callback, $scanResponse);

function renderJsonp( $callback, $response ) {
    return $callback . '('. json_encode($response) . ');';
}
?>
