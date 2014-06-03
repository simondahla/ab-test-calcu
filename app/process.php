<?php

include 'inc/calculate.php';

$errors         = array();  	// array to hold validation errors
$data 			= array(); 		// array to pass back data

// validate the variables ======================================================
// if any of these variables don't exist, add an error to our $errors array

if (empty($_POST['treatment']))
	$errors['treatment'] = 'You have to fill in a name for each varaiation.';

if (empty($_POST['visitors']))
	$errors['visitors'] = 'You have to fill in the number of visitors per each variation';

if (empty($_POST['conversions']))
	$errors['conversions'] = 'You have to fill in the number of conversions per each variation';

if (empty($_POST['baseline']))
	$errors['baseline'] = 'You have to set a baseline';

// return a response ===========================================================

// if there are any errors in our errors array, return a success boolean of false
if ( ! empty($errors)) {

	// if there are items in our errors array, return those errors
	$data['success'] = false;
	$data['errors']  = $errors;

} else {

	//if there are no errors process our form, then return a message

	if(isset($_POST['treatment']) || isset($_POST['visitors']) || isset($_POST['conversions']) || isset($_POST['baseline'])){

		$treatment = $_POST['treatment'];
		$visitors = $_POST['visitors'];
		$conversions = $_POST['conversions'];
		$b = $_POST['baseline'];

		/* Loop through array and find baseline, set everything else to false */
		$baseline = array();
		foreach ($treatment as $key => $val) {
			if($key == $b[0]){
				array_push($baseline, true);
			} else {
				array_push($baseline, false);

			}

		}
		/* Set variables for calculations */
		$input = array(
			'Treatment' => $treatment,
			'Baseline' => $baseline,
			'Visitors' => $visitors,
			'Conversions' => $conversions
		);

		for ($i = 0; $i < count($input); ++$i) {

			if($input['Baseline'][$i] === true){

				$control = array($input['Visitors'][$i],$input['Conversions'][$i]);

			}

		}

		/* Do calculations */
		$conversionrate = array();
		$zscore = array();
		$confidence = array();
		$improvment = array();
		$samplesize = array();	

		for ($i = 0; $i < count($input); ++$i) {
			$x = array();

			$x['Baseline'] 		= $input['Baseline'][$i];
			$x['Treatment'] 	= $input['Treatment'][$i];
			$x['Visitors'] 		= $input['Visitors'][$i];
			$x['Conversions'] 	= $input['Conversions'][$i];


			$array = array($input['Visitors'][$i],$input['Conversions'][$i]);
			$ssize = ssize(cr($array));

			//ConversionRate
			$cr = round(cr($array) * 100, $decimals);
			// array_push($conversionrate, $cr);
			$x['ConversionRate']=$cr;

			//Z-Score
			if($input['Baseline'][$i] === false){
				$zs = round(zscore($control, $array), $decimals);
				// array_push($zscore, $zs);
				$x['Zscore'] = $zs;
			} else {
				// array_push($zscore, '-');
				$x['Zscore'] = '-';
			}

			//Confidence
			if($input['Baseline'][$i] === false){
				$cf = round(cumnormdist(zscore($control, $array)) * 100, $decimals);
				// array_push($confidence, $co);
				$x['Confidence']=$cf;				
			} else {
				// array_push($confidence, '-');
				$x['Confidence'] = '-';	
			}

			//Improvment
			if($input['Baseline'][$i] === false){
				$im = round((cr($array)/cr($control)-1)*100 ,$decimals);
				// array_push($improvment, $im);
				$x['Improvement']=$im;
			} else {
				// array_push($improvment, '-');
				$x['Improvement']='-';
			}

			//SampleSize
			$ss = $ssize[3];
			// array_push($samplesize, $ss);
			$x['SampleSize']=$ss;

			array_push($data, $x);

		}

		/* Put everyhing in a nice array to send back*/
		// $data = array(
		// 	'Treatment' => $treatment,
		// 	'Baseline' => $baseline,
		// 	'Visitors' => $visitors,
		// 	'Conversions' => $conversions,
		// 	'ConversionRate' => $conversionrate,
		// 	'Zscore' => $zscore,
		// 	'Confidence' => $confidence,
		// 	'Improvement' => $improvment,
		// 	'SampleSize' => $samplesize,
		// );

	}


	// show a message of success and provide a true success variable
	$data['success'] = true;
	$data['message'] = 'Success!';
}

// return all our data to an AJAX call
echo json_encode($data);
