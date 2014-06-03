function showStatusMessage(status, message){
  $('.container').prepend('<div class="alert alert-' + status + ' fade in out">' + message + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>');
  selector = $('.alert');
  time = 2000;
  setTimeout(function(){selector.fadeOut( "fast" )}, time);
  setTimeout(function(){selector.remove()}, time*2);
}

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
    type    	: 'POST',
    url     	: 'process.php',
    data    	: postData,
    dataType  : 'json',
    encode    : true
  })

    .done(function(data) {
        
      // console.log(data[3]);
      // console.log(data);
      // console.log(data.success);

      message = data.message;
    
      if (data.success !== true) {

        showStatusMessage('error', message);
        
        console.warn(data);


      } else {

        

        //showStatusMessage('success', message);
        delete data.success;
        delete data.message;
        // console.log(data);

        x = [];

        $.each( data, function( key, value ) {
          // console.log( key + ": " + value );
          x.push(value);
        });

        // console.log(x);
        updateRows(x);

      }
    })

    .fail(function(data) {
      console.warn(data);
    });
}
