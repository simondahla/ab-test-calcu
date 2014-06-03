var date = new Date();
date = date.toISOString();
var blob;
var dataExport;

var data = '[{"Baseline":false,"Treatment":"Control","Visitors":"1000","Conversions":"30","ConversionRate":3,"Zscore":-2.16,"Confidence":1.55,"Improvement":-37.87,"SampleSize":2484},{"Baseline":false,"Treatment":"Variation 1","Visitors":"960","Conversions":"43","ConversionRate":4.48,"Zscore":-0.37,"Confidence":35.43,"Improvement":-7.23,"SampleSize":1638},{"Baseline":true,"Treatment":"Variation 2","Visitors":"1077","Conversions":"52","ConversionRate":4.83,"Zscore":"-","Confidence":"-","Improvement":"-","SampleSize":1514},{"Baseline":false,"Treatment":"Variation 3","Visitors":"905","Conversions":"34","ConversionRate":3.76,"Zscore":-1.18,"Confidence":11.93,"Improvement":-22.19,"SampleSize":1968}]';
// console.log(data);

$(document).ready(function() {
  
  data = $.parseJSON(data);


  $('[data-toggle="tooltip"]').tooltip();
  $('.alert').alert();

  createRows(data);

  $('input[type="radio"]').click(function() {

    postData('#tableForm');

  });

  // $("input[type='radio']").bootstrapSwitch();
  $(".unicorn").unicorn({
    "saturation":100,
    "light":60,
    "speed":30,
    "ltr":true
  });
  $('#saveFile').hide();
  $('#export').hide();

});

// function readJson(filename){
//   var file = new XMLHttpRequest();
//   file.open("GET", filename, true);
//   file.onreadystatechange = function() {
//     if (file.readyState === 4) {
//       if (file.status === 200) {
//         fileResponse = file.responseText;
//         console.log(fileResponse);
//       }
//     }
//   };
//   file.send();
// }

// Dropzone.options.mad = {
//   method: "POST",
//   paramName: "file",
//   maxFilesize: 2,
//   uploadMultiple: false,
//   acceptedFiles: ".json",
//   previewsContainer: null,
//   init: function() {
//     this.on("success", function(file) {
//       var path = "uploads/" + file.name;
//       console.info('File uploaded to:' + path);
//       console.log(readJson(path))


//       // data = readJson(path);
//       // data = $.parseJSON(data);
//       // console.log(data);
//       // updateRows(data);

//     });
//   }

// };


function downloadFile(data, name){
  saveAs(new Blob([data], {type: "data:application/json;charset=utf-8"}), name + '_' + date + '.json');
}
