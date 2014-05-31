var data;
var blob;
var date = new Date();

$(document).ready(function() {

  window.data = '{"Treatment":["Control","Variation 1","Variation 2","Variation 3"],"Baseline":[false,true,false,false],"Visitors":["1000","960","1077","905"],"Conversions":["30","43","52","34"],"ConversionRate":[3,4.48,4.83,3.76],"Zscore":[-1.72,"-",0.37,-0.79],"Confidence":[4.24,"-",64.57,21.6],"Improvment":[-33.02,"-",7.79,-16.12],"SampleSize":[2484,1638,1514,1968],"success":true,"message":"Success!"}';
  data = jQuery.parseJSON(data);

  
  $('[data-toggle="tooltip"]').tooltip();
  $('.alert').alert();

  createRows(data);

  $('input[type="radio"]').click(function() {
    
    postData('#tableForm');
    
  });

});

function readJson(filename){
  var file = new XMLHttpRequest();
  file.open("GET", filename, true);
  file.onreadystatechange = function() {
    if (file.readyState === 4) {
      if (file.status === 200) {
        fileResponse = file.responseText; 
        console.log(fileResponse);
      }
    }
  };
  file.send();
}

Dropzone.options.mad = {
  method: "POST",
  paramName: "file",
  maxFilesize: 2,
  uploadMultiple: false,
  acceptedFiles: ".json",
  previewsContainer: null,
  init: function() {
    this.on("success", function(file) {
      var path = "uploads/" + file.name;
      console.info('File uploaded to:' + path);
      
      // ajaxPost(readJson(path));

    });
  }     

};