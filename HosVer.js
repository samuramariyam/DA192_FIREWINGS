var adhaarPDF,HRD;
  
function Login(){
var request = new XMLHttpRequest();

request.open('GET', 'http://localhost:5000/apitut-5987c/us-central1/app/api/adminlogin/', true);

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    for (x in data) {
     
        
   if(data[x].username==document.getElementById("una").value && data[x].key==document.getElementById("key").value){
    window.location.replace("C:/Users/syed/a/public/department.html");
   }
}
attach();
    
  } else {
    console.log('error')
  }
}

request.send();
}

function VerifyHos(){
  
    let result = document.querySelector('.result'); 
               var email = document.getElementById("iemail").value;
              var name = document.getElementById("name").value; 
              var number = document.getElementById("num").value; 
              var hosna = document.getElementById("ihosName").value; 
              var hosad = document.getElementById("ihosAddress").value; 

              // Creating a XHR object 
              let xhr = new XMLHttpRequest(); 
              let url = "http://localhost:5000/apitut-5987c/us-central1/app/api/hosverify"; 
          
              // open a connection 
              xhr.open("POST", url, true); 
  
              // Set the request header i.e. which type of content you are sending 
              xhr.setRequestHeader("Content-Type", "application/json"); 
  
              // Create a state change callback 
              xhr.onreadystatechange = function () { 
                  if (xhr.readyState === 4 && xhr.status === 200) { 
  
                      // Print received data from server 
                      //result.innerHTML = this.responseText; 
                      alert("sended for varification soon you will be updated");
                      window.location.replace("C:/Users/syed/a/public/selectRole.html");
  
                  } 
              }; 
  
              // Converting JSON data to string 
              var data = JSON.stringify({ "name": name, "email": email, "phno": number, "hosname": hosna,"hosad": hosad,"adlink":adhaarPDF,"hrdlink":HRD }); 
  
              // Sending data with the request 
              xhr.send(data); 
          }
          
function uploadImgAdhaar(){

    var image=document.getElementById("adhaar").files[0];
    var imageName=image.name;
    var id=document.getElementById("num").value;
    var sr=firebase.storage().ref(id+'/'+imageName);
    var uploadTask = sr.put(image);
    uploadTask.on('state_changed',function(snapshot){
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        alert("upload is "+progress+" done");

    },function(error){
        console.log(error.message);

    },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log(downloadURL);
            alert(downloadURL)
            adhaarPDF=downloadURL;
           
        });
    });
}

function uploadhRd(){

    var hsdPdf=document.getElementById("hrd").files[0];
   
    var id=document.getElementById("num").value;
    var sr=firebase.storage().ref(id+'/HRDPDF');
    var uploadTask = sr.put(hsdPdf);
    uploadTask.on('state_changed',function(snapshot){
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        alert("upload is "+progress+" done");

    },function(error){
        console.log(error.message);

    },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log(downloadURL);
            alert(downloadURL)
            HRD=downloadURL;
           
        });
    });
}