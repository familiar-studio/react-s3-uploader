import fetch from 'fetch'

export default {
  upload(file) {
    console.log(file)
    var data = new FormData()
    data.append('file', file)

    return fetch('http://localhost:5000/s3upload', {
      method: 'post',
      body: data
    }).then(res => res.json())


    // var xhr = new XMLHttpRequest();
    // xhr.responseType = 'arraybuffer'
    // xhr.open('post', '/s3upload', true);
    //
    // xhr.upload.onprogress = function(e) {
    //   if (e.lengthComputable) {
    //     var percentage = (e.loaded / e.total) * 100;
    //     console.log(percentage)
    //   }
    // };
    //
    // xhr.onerror = function(e) {
    //   console.log('An error occurred while submitting the form. Maybe your file is too big');
    // };
    //
    // xhr.onload = function() {
    //   console.log(this.statusText);
    // };
    //
    // xhr.onreadystatechange = function() {
    //   console.log(xhr.responseText);
    // }
    // xhr.send(data);
  }

}
