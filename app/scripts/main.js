var data;
var date = new Date();
date = date.toISOString();
var eData;
var blob;

$(document).ready(function() {

  window.data = '{"Treatment":["Control","Variation 1","Variation 2","Variation 3"],"Baseline":[true,false,false,false],"Visitors":["1000","960","1077","905"],"Conversions":["30","43","52","34"],"ConversionRate":[3,4.48,4.83,3.76],"Zscore":["-",1.72,2.16,0.91],"Confidence":["-",95.76,98.45,81.88],"Improvement":["-",49.31,60.94,25.23],"SampleSize":[2484,1638,1514,1968]}';
  data = $.parseJSON(data);


  $('[data-toggle="tooltip"]').tooltip();
  $('.alert').alert();

  createRows(data);

  $('input[type="radio"]').click(function() {

    postData('#tableForm');

  });

  $('#saveFile').hide();
  $('#export').hide();

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
      console.log(readJson(path))


      // data = readJson(path);
      // data = $.parseJSON(data);
      // console.log(data);
      // updateRows(data);

    });
  }

};

function createJsonString(data){
  var x = [];

  for (var i = 0; i < data.Visitors.length; i++) {

    var y = [];

    var bs = data.Baseline[i];
    var tr = data.Treatment[i];
    var vi = data.Visitors[i];
    var co = data.Conversions[i];
    var cr = data.ConversionRate[i];
    var zs = data.Zscore[i];
    var cf = data.Confidence[i];
    var im = data.Improvement[i];
    var ss = data.SampleSize[i];

    y.push({'Baseline':bs});
    y.push({'Treatment':tr});
    y.push({'Visitors': vi});
    y.push({'Conversions': co});
    y.push({'ConversionRate': cr});
    y.push({'Zscore': zs});
    y.push({'Confidence': cf});
    y.push({'Improvement': im});
    y.push({'SampleSize': ss});

    x.push(y);

  }

  x = JSON.stringify(x);
  console.log(x);
  window.eData = x;

}
function updateDownloadLink(data){

  window.blob = new Blob([data], {
    type: "data:application/json;charset=utf-8"
  });

  $("#saveFile").show();
}

function downloadFile(){
  saveAs(blob, 'test_results_' + date + '.json');
}
