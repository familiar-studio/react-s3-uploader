$('#form').submit(function(e) {

  var data = new FormData();

  data.append('action','guestEntries/saveEntry');
  data.append('redirect','upload/index.json');
  data.append('sectionId','6');
  data.append('entryId','8552');

  
  data.append('fields[firstName]','keith');
  data.append('fields[lastName]','tester');

  // $.each(uploader.state.items,function (index, item) {
  //
  //   data.append('fields[artwork][new'+index+'][type]','artworkMatrix');
  //   data.append('fields[artwork][new'+index+'][fields][image]', item.file, item.file.name);
  //
  //   if (item.title) {
  //     data.append('fields[artwork][new'+index+'][fields][artworkTitle]', item.title);
  //   }
  //
  //   if (item.description) {
  //     data.append('fields[artwork][new'+index+'][fields][description]', item.description);
  //   }
  //
  //   if (item.artistName) {
  //     data.append('fields[artwork][new'+index+'][fields][artistName]', item.artistName);
  //   }
  //
  //   if (item.media) {
  //     data.append('fields[artwork][new'+index+'][fields][media]', item.media);
  //   }
  //
  //   if (item.year) {
  //     data.append('fields[artwork][new'+index+'][fields][year]', item.year);
  //   }
  //
  // });
  var oReq = new XMLHttpRequest();
  oReq.open("POST", "http://artmatters.craft.dev", true);
  oReq.onload = function(oEvent) {
    if (oReq.status == 200) {
      oOutput.innerHTML = "Uploaded!";
    } else {
      oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
    }
  };

  oReq.addEventListener("progress", function (event) {
    if (event.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total;
      // ...

      console.log('precent',percentComplete);
      $('#progress-bar').width(percentComplete+'%');
    } else {
      // Unable to compute progress information since the total size is unknown
      $('#progress-bar').width('100%');
    }
  });


  oReq.send(data);
  e.preventDefault();
});
