﻿function opentupfilez(){
//    deleteimgup();
    $('#uploader').click();    
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
    
}

function upfilez(){
  var files =  $('#uploader')[0].files;
  var linkfile="";var htmllinks="";
  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append(file.name, file);
	  var currentdate=new Date().toLocaleDateString();
	  linkfile+= currentdate.split('/')[1]+currentdate.split('/')[0]+currentdate.split('/')[2] + file.name+';';
    }

    $.ajax({
      url: 'uc/importexcel.ashx',
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success: function(){
         
//        setTimeout(loadimgup(),1000);
      },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress-bar').html('Đã tải xong');              
            }
            
          }

        }, false);

        return xhr;
      },
		error: function () {
		}
    });
  }  
}