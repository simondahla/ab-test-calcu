<?php

$decimals = 2;

if (!empty($_GET['decimals'])) {

    $decimals = $_GET['decimals'];
}

function cr($t) {
    return $t[1]/$t[0];
}

function zscore($c, $t) {
    $z = cr($t)-cr($c);
    $s = (cr($t)*(1-cr($t)))/$t[0] + (cr($c)*(1-cr($c)))/$c[0];
    return $z/sqrt($s);
}

function cumnormdist($x) {
  $b1 =  0.319381530;
  $b2 = -0.356563782;
  $b3 =  1.781477937;
  $b4 = -1.821255978;
  $b5 =  1.330274429;
  $p  =  0.2316419;
  $c  =  0.39894228;

  if($x >= 0.0) {
      $t = 1.0 / ( 1.0 + $p * $x );
      return (1.0 - $c * exp( -$x * $x / 2.0 ) * $t *
      ( $t *( $t * ( $t * ( $t * $b5 + $b4 ) + $b3 ) + $b2 ) + $b1 ));
  }
  else {
      $t = 1.0 / ( 1.0 - $p * $x );
      return ( $c * exp( -$x * $x / 2.0 ) * $t *
      ( $t *( $t * ( $t * ( $t * $b5 + $b4 ) + $b3 ) + $b2 ) + $b1 ));
    }
}

function ssize($conv) {
    $a = 3.84145882689;
    $res = array();
    $bs = array(0.0625, 0.0225, 0.0025, 0.05);
    foreach ($bs as $b) {
        $res[] = (int) ((1-$conv)*$a/($b*$conv));
    }
    return $res;
}

?>