var adhaarPDF,dclink,drdlink;


function VerifyDr(){
  
    let result = document.querySelector('.result'); 
               var email = document.getElementById("iemail").value;
              var name = document.getElementById("name").value; 
              var number = document.getElementById("num").value; 
              var clna = document.getElementById("cname").value; 
              var clad = document.getElementById("cad").value; 
              
              var spec = document.getElementById("spec").value; 



              // Creating a XHR object 
              let xhr = new XMLHttpRequest(); 
              let url = "http://localhost:5000/apitut-5987c/us-central1/app/api/clincverify"; 
          
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
              var data = JSON.stringify({ "name": name, "email": email, "phno": number, "clna": clna,"clad": clad,"adlink":adhaarPDF,"drdlink":drdlink,"drc":dclink,"spec":spec}); 
  
              // Sending data with the request 
              xhr.send(data); 


          }
          
function uploadImgAdhaar(){

    var image=document.getElementById("adhaar").files[0];
    var imageName=image.name;
    var id=document.getElementById("num").value;
    var sr=firebase.storage().ref(id+'/adhaar');
    var uploadTask = sr.put(image);
    uploadTask.on('state_changed',function(snapshot){
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
       // alert("upload is "+progress+" done");

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

function uploadhdRd(){

    var hsdPdf=document.getElementById("drd").files[0];
   
    var id=document.getElementById("num").value;
    var sr=firebase.storage().ref(id+'/DRDPDF');
    var uploadTask = sr.put(hsdPdf);
    uploadTask.on('state_changed',function(snapshot){
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        //alert("upload is "+progress+" done");

    },function(error){
        console.log(error.message);

    },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log(downloadURL);
            alert(downloadURL)
            drdlink=downloadURL;
           
        });
    });
}

function uploadhdc(){

    var hsdPdf=document.getElementById("drc").files[0];
   
    var id=document.getElementById("num").value;
    var sr=firebase.storage().ref(id+'/Dr.cDPDF');
    var uploadTask = sr.put(hsdPdf);
    uploadTask.on('state_changed',function(snapshot){
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
       // alert("upload is "+progress+" done");

    },function(error){
        console.log(error.message);

    },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log(downloadURL);
            alert(downloadURL)
            dclink=downloadURL;
           
        });
    });
}