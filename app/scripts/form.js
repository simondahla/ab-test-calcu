function createRows(data){
  for (var i = 0; i < data.length; i++) {

    var bs = data[i].Baseline;
    var tr = data[i].Treatment;
    var vi = data[i].Visitors;
    var co = data[i].Conversions;
    var cr = data[i].ConversionRate;
    var zs = data[i].Zscore;
    var cf = data[i].Confidence;
    var im = data[i].Improvement;
    var ss = data[i].SampleSize;

    $('tbody').append('<tr class="row' + i + '"></tr>');

    $('.row' + i).append('<td class="cloumn0"><input class="input-lg" type="radio" name="baseline[]" id="baseline" value="' + i +'" ' + isBaseline(bs) + ' requried></td>');
    $('.row' + i).append('<td class="cloumn1"><label class="sr-only" for="t' + i + '">Variation name</label><input type="text" name="treatment[]" class="form-control" id="t' + i + '" placeholder="Variation ' + i + '" value="' + tr + '"></td>');
    $('.row' + i).append('<td class="cloumn2"><label class="sr-only" for="v' + i + '">Number of visitors</label><input type="number" name="visitors[]" class="form-control" id="v' + i + '" placeholder="1000" value="' + vi + '"></td>');
    $('.row' + i).append('<td class="cloumn3"><label class="sr-only" for="c' + i + '">Number of conversions</label><input type="number" name="conversions[]" class="form-control" id="c' + i + '" placeholder="50" value="' + co + '"></td>');
    $('.row' + i).append('<td class="cloumn4">' + cr + '%</td>');
    $('.row' + i).append('<td class="cloumn5">' + zs + '</td>');
    $('.row' + i).append('<td class="cloumn6">' + cf + '%</td>');
    $('.row' + i).append('<td class="cloumn7">' + im + '%</td>');
    $('.row' + i).append('<td class="cloumn8">' + ss + '</td>');
  }
}

function updateData(data){
    x = [];

    x.push(data);

    window.data = JSON.stringify(data);

    console.info('%cdata updated :%c' + window.data,'color: blue;', 'color: green;');
}

function updateRows(data){

  function updateBaseline(selector, i, v){
    if (v === true){
      $(selector).prop('checked', true);
    } else {
      $(selector).removeAttr('checked');
    }
  }

  for (var i = 0; i < data.length; i++) {

    var bs = data[i].Baseline;
    console.log(bs);
    var tr = data[i].Treatment;
    var vi = data[i].Visitors;
    var co = data[i].Conversions;
    var cr = data[i].ConversionRate;
    var zs = data[i].Zscore;
    var cf = data[i].Confidence;
    var im = data[i].Improvement;
    var ss = data[i].SampleSize;

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

  updateData(data);

}



function isBaseline(data) {
  // console.log(data[0]);
  // console.log(data.Baseline);
  if (data === true){
    return 'checked';
  } else {
    return '';
  }
}
