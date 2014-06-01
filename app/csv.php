<?php

include 'inc/array-to-csv.php';

if (!empty($_GET['json'])) {
	$json = $_GET['json'];

	echo '<pre>';
	var_dump($json);
	echo '</pre>';

	$data = json_decode($json,true);

	echo '<pre>';
	var_dump($data);
	echo '</pre>';

	str_putcsv($data);

	// Create an instace of the class
	$csv = new arrayToCsv();

	// Convert array to csv (you probably want to create a file with this info)
	echo '<pre>';
	echo $csv->convert($data);
	echo '</pre>';


}


/**
 * Convert a multi-dimensional, associative array to CSV data
 * <a href="/param">@param</a>  array $data the array of data
 * @return string       CSV text
 */
function str_putcsv($data) {
        # Generate CSV data from array
        $fh = fopen('php://temp', 'rw'); # don't create a file, attempt
                                         # to use memory instead

        # write out the headers
        fputcsv($fh, array_keys(current($data)));

        # write out the data
        foreach ( $data as $row ) {
                fputcsv($fh, $row);
        }
        rewind($fh);
        $csv = stream_get_contents($fh);
        fclose($fh);

        return $csv;
}
?>
