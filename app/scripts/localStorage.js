var name = 'ab-calc';

function localLoad(){

  return JSON.parse( localStorage.getItem( name ) );

}


function localSave(data, entry){

  if(typeof(entry)==='undefined') entry = window.date;
  
  var o = localLoad();
  
  if(!o){
    o = [];
  };

  
  var d = [entry, data];

  o.push(d);

  //console.log(o);

  localStorage.setItem( name , JSON.stringify(o) );
  
  console.info('Data saved as ' + entry + ' in local storage' );
  
  localListObjects();

}

function localDestroy(){
  
  localStorage.removeItem(name);

  console.info('Local storage file ' + name  + ' destroyed!' );

  var gui = $('#saveList');

  if(gui.length){
    gui.remove();
  }
}

function localListObjects(){
  var data = localLoad();
  window.dataExport = data;

  if(!$('#saveList').length){
    $('.save-wrapper').append('<select id="saveList" class="form-control input-lg"></select>');
  }

  $('#saveList').html('');
  
  for (i = 0; i < data.length; ++i) {
    $('#saveList').append('<option value="' + i + '">' + data[i][0] + '</option>');
  }

}


function localRemoveEntry(entry){

  if(typeof(entry)==='undefined'){
    console.warn('You must specift an entry for the object!');
    return null;
  }

  data = localLoad();
  // console.log(data);

  for (i = 0; i < data.length; i++) {
    if(entry == i){
      data.splice(i, 1);
      console.info('Entry: ' + data[i] + ' removed');
    }
  }
  
  localStorage.setItem( name , JSON.stringify(data) );
  localListObjects();

}

function localOnLoad(){
  var o = localLoad();

  if(o){
    localListObjects();
  };
}

function removeButton(selector){
  var entry = $(selector).find(':selected').val();
  localRemoveEntry(entry);

}

function localUpdateFromStorage(entry){
  
  // var entry = $('select#saveList').find(':selected').val();
  
  var data = localLoad();

  for (var i = 0; i < data.length; i++) {
    
    if (entry == i){
      var x = data[i][1];
      console.log(x);
      updateRows(JSON.parse(x));
    }

  }

  // x = JSON.parse(x);

  // console.log(x);
  // y = [];

  // for (var i = 0; i < x.length; i++) {
    
  //   console.log(x[i][0][1]);
  //   console.log(x[i][1]);
  //   console.log(x[i][2]);
  //   console.log(x[i][3]);
  //   console.log(x[i][4]);
  //   console.log(x[i][5]);
  //   console.log(x[i][6]);
  //   console.log(x[i][7]);
  //   console.log(x[i][8]);

  // }



  
}

$(function() {
  localOnLoad();

  $('select#saveList').change(function() {
      // console.log($(this).find(':selected').val());
      var entry = $(this).find(':selected').val();
      localUpdateFromStorage(entry);
  });

});