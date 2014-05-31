function createRows(data){
  for (var i = 0; i < data.Visitors.length; i++) {
      
    var bs = data.Baseline[i];
    var tr = data.Treatment[i];
    var vi = data.Visitors[i];
    var co = data.Conversions[i];
    var cr = data.ConversionRate[i];
    var zs = data.Zscore[i];
    var cf = data.Confidence[i];
    var im = data.Improvment[i];
    var ss = data.SampleSize[i];

    $('tbody').append('<tr class="row' + i + '"></tr>');
  
    $('.row' + i).append('<td class="cloumn0"><input class="input-lg" type="radio" name="baseline[]" id="baseline" value="' + i +'" ' + isBaseline(bs) + ' requried></td>');
    $('.row' + i).append('<td class="cloumn1"><label class="sr-only" for="t' + i + '">Variation name</label><input type="text" name="treatment[]" class="form-control" id="t' + i + '" placeholder="Variation ' + i + '" value="' + tr + '"></td>');
    $('.row' + i).append('<td class="cloumn2"><label class="sr-only" for="v' + i + '">Number of visitors</label><input type="number" name="visitors[]" class="form-control" id="v' + i + '" placeholder="1000" value="' + vi + '"></td>');
    $('.row' + i).append('<td class="cloumn3"><label class="sr-only" for="c' + i + '">Number of conversions</label><input type="number" name="conversions[]" class="form-control" id="c' + i + '" placeholder="50" value="' + co + '"></td>');
    $('.row' + i).append('<td class="cloumn4">' + cr + '</td>');
    $('.row' + i).append('<td class="cloumn5">' + zs + '</td>');
    $('.row' + i).append('<td class="cloumn6">' + cf + '</td>');
    $('.row' + i).append('<td class="cloumn7">' + im + '</td>');
    $('.row' + i).append('<td class="cloumn8">' + ss + '</td>');
    
  }
  createBlob(data);
}

function createBlob(data){

  delete data.success;
  delete data.message;

  data = JSON.stringify(data);

  window.date = date.toISOString();
  window.blob = new Blob([data], {type: "text/plain;charset=utf-8"});

}

function updateRows(data){
    function updateBaseline(selector, i, v){
      if (v === true){
        $(selector).prop('checked', true);
      } else {
        $(selector).removeAttr('checked');
      }
  }
  for (var i = 0; i < data.Visitors.length; i++) {
      
    var bs = data.Baseline[i];
    var tr = data.Treatment[i];
    var vi = data.Visitors[i];
    var co = data.Conversions[i];
    var cr = data.ConversionRate[i];
    var zs = data.Zscore[i];
    var cf = data.Confidence[i];
    var im = data.Improvment[i];
    var ss = data.SampleSize[i];

    $('tbody > tr:eq(' + i + ') > td:eq(0) > input').val(i);
    
    $('tbody > tr:eq(' + i + ') > td:eq(1) > input').val(tr);
    $('tbody > tr:eq(' + i + ') > td:eq(2) > input').val(vi);
    $('tbody > tr:eq(' + i + ') > td:eq(3) > input').val(co);
    $('tbody > tr:eq(' + i + ') > td:eq(4)').html(cr);
    $('tbody > tr:eq(' + i + ') > td:eq(5)').html(zs);
    $('tbody > tr:eq(' + i + ') > td:eq(6)').html(cf);
    $('tbody > tr:eq(' + i + ') > td:eq(7)').html(im);
    $('tbody > tr:eq(' + i + ') > td:eq(8)').html(ss);

    updateBaseline('tbody > tr:eq(' + i + ') > td:eq(0) > input', i, bs);

  }
  console.info(data);
}



function isBaseline(data) {
  if (data === true){
    return 'checked';
  } else {
    return '';
  }
}