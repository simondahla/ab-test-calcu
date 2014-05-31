$(document).ready(function() {
  
	$('#tableForm').submit(function(event) {
    postData(this);
	});

});

function postData(selector){
  var data = $(selector).serializeArray();
  ajaxPost(data);
  event.preventDefault();
}

function ajaxPost(postData){
  $.ajax({
    type    : 'POST',
    url     : 'process.php',
    data    : postData,
    dataType  : 'json',
    encode          : true
  })
    
    .done(function(data) {

      if ( ! data.success) {
        $('.container').append('<div class="alert alert-error fade in">' + data.message + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>');
          console.warn(data);


      } else {

        
        //$('.container').prepend('<div class="alert alert-success fade in">' + data.message + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>');
        updateRows(data);
        
      }
    })

    .fail(function(data) {
      console.warn(data);
    });
}