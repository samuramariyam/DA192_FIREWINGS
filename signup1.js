
var btnn = document.getElementById("bttn");
 var item=document.getElementById("item");
 var list=document.getElementById("mylist")
 var imageDownloadURL;
 var modal = document.getElementById("myModal");
 var addD = document.getElementById("addD");


 var dr_btn;
 var drid;

 
//btnn.onclick= function(){
   //list.style.display="block";
   //item.style.display="block";
   //for(var i=0;i<2;i++){
    //listRET();
   // CallMe();
   //}

 //// }
  window.onload=(event)=>{
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
    var uid;
    var user = firebase.auth().currentUser;
    if (user != null) {
        uid = user.uid;
    }
    CallMe(uid);
  }
      });
  }
  
 

            

function signUp(){
    let result = document.querySelector('.result'); 
    var Email = document.getElementById("iemail").value;
    var hosName = document.getElementById("ihosName").value;
    var addr = document.getElementById("ihosAddress").value;
    
    ///var Password = document.getElementById("ipass").value;
    var Password= document.getElementById("ipass").value;
   /* var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;*/

        //const promise=firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword);
           //  promise.catch(e=>alert(e.message));
            //alert("sign up")



           const promise= firebase.auth().createUserWithEmailAndPassword(Email, Password).then(function(){
                 promise.catch(e=>alert(e.message));
            alert("sign up")
                var uid;
                var user = firebase.auth().currentUser;
                
                if (user != null) {
                    uid = user.uid;
                }
                var firebaseRef = firebase.database().ref();
                /*var userData = {
                    userEmail: userEmail,
                    userFullName: userFullName,
                    userSurname: userSurname,
                    
                    userPassword: userPassword,
                   
                }*/
               // firebaseRef.child(uid).set(userData);

               let xhr = new XMLHttpRequest(); 
			let url = "http://localhost:5000/apitut-5987c/us-central1/app/api/create/hospital"; 
		
			// open a connection 
			xhr.open("POST", url, true); 

			// Set the request header i.e. which type of content you are sending 
			xhr.setRequestHeader("Content-Type", "application/json"); 

			// Create a state change callback 
			xhr.onreadystatechange = function () { 
				if (xhr.readyState === 4 && xhr.status === 200) { 

					// Print received data from server 
					result.innerHTML = this.responseText; 

				} 
			}; 

			// Converting JSON data to string 
			var data = JSON.stringify({ "uid": uid, "name": hosName, "Email": Email, "Address": addr ,"Password":Password }); 

			// Sending data with the request 
			xhr.send(data); 
		
               
            }).catch(e=>alert(e.message));
            /*catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                
            });*/
        
        
}
function signIn(){
    var userEmail = document.getElementById("email").value;
    var userPassword= document.getElementById("pass").value;
    
   /* var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;*/

        const promise=firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function(){
         
            alert("sign IN "+userEmail)
            window.location.replace("C:/Users/syed/a/public/test.html");
          
      
           
        }).catch(e=>alert("Please register"));

}


function forgotPassword(){
    var userEmail = document.getElementById("email").value;
      if(userEmail!=""){
     firebase.auth().sendPasswordResetEmail(userEmail).then(function(){
       alert("email has been sent to you,plase check and verify");

    }).catch(e=>alert(e.message));
}
    else{
        alert("please enter the email")
    }
}



function signOut(){
    firebase.auth().signOut();
    alert("sign Out");
}
firebase.auth().onAuthStateChanged(function(user){
  if(user){
  var email=user.email;
  alert("active user"+email);

  }
  else{
 alert("no user");}
});


function uploadImg(){

    var image=document.getElementById("image").files[0];
    var imageName=image.name;
    var sr=firebase.storage().ref('images/'+imageName);
    var uploadTask = sr.put(image);
    uploadTask.on('state_changed',function(snapshot){
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is "+progress+"done");

    },function(error){
        console.log(error.message);

    },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log(downloadURL);
            alert(downloadURL)
            imageDownloadURL=downloadURL;
            addD.style.display = "block";
        });
    });
}
//to add list view
 var j=0;
function listRET(name,desc,imglink,iid){
   var ul = document.getElementById("contain");
 //var candidate = document.getElementById("candidate");
  var candidate = "asif description ";
  
  var li = document.createElement("div");
  li.className="view_main";
  li.setAttribute('id',candidate);
 // li.appendChild(document.createTextNode(candidate));
 // li.appendChild(document.createTextNode(ss));
 // li.appendChild(document.createTextNode(sd));

  var u = document.createElement("div");
  u.className="view_wrap list-view";
  u.setAttribute('id',candidate);
 // u.appendChild(document.createTextNode(candidate));
  var un = document.createElement("div");
  un.className="view_item";
  un.setAttribute('id',candidate);
  //un.appendChild(document.createTextNode(candidate));
  
  var unn = document.createElement("div");
  unn.className="vi_left";
  unn.setAttribute('id',candidate);
 // unn.appendChild(document.createTextNode(candidate));

  var imgg=document.createElement("img");
  imgg.src=imglink;

  var uno = document.createElement("div");
  uno.className="vi_right";
  uno.setAttribute('id',candidate);

  var par = document.createElement("p");
  par.id="sad";
  par.className="title";
  par.setAttribute('id',candidate);
 par.appendChild(document.createTextNode(name));

  var parr = document.createElement("p");
  parr.id="dfeferg";
  parr.className="content";
  parr.setAttribute('id',candidate);
  parr.appendChild(document.createTextNode(desc+" "+iid));

  var b = document.createElement("div");
  //b.id="btn"+Math.floor(Math.random() * 11);
  //b.id="btn"+ j++; 
  
  b.className="btn";
  b.setAttribute('id',"btn"+ j++);
  b.appendChild(document.createTextNode("Details"));


  
ul.appendChild(li);
li.appendChild(u);
u.appendChild(un);
un.appendChild(unn);
unn.appendChild(imgg);
un.appendChild(uno);

uno.appendChild(par);
uno.appendChild(parr);
uno.appendChild(b);
grnerateID(b.id,iid);
//b.id.onclick= function(){
  //  window.location.replace("C:/Users/syed/a/public/test.html");
 //}
//par.appendChild(document.createTextNode("Tomato"));
}
var i=0;
var btnid=[];
let btns=new Map();
function grnerateID(id,docid){
btns.set(id,docid);
btnid[i]=id;
i++;  
  
}

//data retrive
function CallMe(uid)
{
               
//alert("lll");

    var request = new XMLHttpRequest();
//var id=document.getElementById('readid').value;
request.open('GET', 'http://localhost:5000/apitut-5987c/us-central1/app/api/hospital/dept/'+uid, true);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)


  if (request.status >= 200 && request.status < 400) {
    for (x in data) {
        //par.appendChild(document.createTextNode(data[x].name));
        //parr.appendChild(document.createTextNode(data[x].description));

  // document.getElementById("tit").innerHTML = data[x].name;
 //document.getElementById("desc").innerHTML = data[x].description;
 var pat=new String(data[x].docid);
 var iid=pat.substring(50);

   listRET(data[x].name,data[x].description,data[x].imagelink,iid);
}
attach();
    
  } else {
    console.log('error')
  }
}

request.send();



}



//Adding new department
function AddDep(){
  
    let result = document.querySelector('.result'); 
               
              var name = document.getElementById("depna").value; 
              var desc = document.getElementById("depdesc").value; 
              var uid;
                var user = firebase.auth().currentUser;
                
                if (user != null) {
                    uid = user.uid;
                }
              
              // Creating a XHR object 
              let xhr = new XMLHttpRequest(); 
              let url = "http://localhost:5000/apitut-5987c/us-central1/app/api/addDep"; 
          
              // open a connection 
              xhr.open("POST", url, true); 
  
              // Set the request header i.e. which type of content you are sending 
              xhr.setRequestHeader("Content-Type", "application/json"); 
  
              // Create a state change callback 
              xhr.onreadystatechange = function () { 
                  if (xhr.readyState === 4 && xhr.status === 200) { 
  
                      // Print received data from server 
                      //result.innerHTML = this.responseText; 
                      alert("successful");
                      modal.style.display = "none";
                  } 
              }; 
  
              // Converting JSON data to string 
              var data = JSON.stringify({ "uid":uid,"name": name, "description": desc ,"imagelink":imageDownloadURL}); 
  
              // Sending data with the request 
              xhr.send(data); 
              
               }

               
  function attach(){
    var i=0;
    var btn=[];
    while(btnid[i]!=null){
    btn[i]=document.getElementById(btnid[i]);
    drid=btns.get("btn"+i);
    window.localStorage.setItem("bt"+i,JSON.stringify(drid));
    btn[i].onclick = function() {
      //window.localStorage.setItem("bt"+i,JSON.stringify(btn[i]));
     // f(btns.get("btn"+0));
        // if(document.getElementById())
      window.location.replace("C:/Users/syed/a/public/dr_list.html");
        }
        btn0.onclick = function() {
          window.localStorage.setItem("btn0",JSON.stringify(1));
          window.location.replace("C:/Users/syed/a/public/dr_list.html");
            }

            btn1.onclick = function() {
              window.localStorage.setItem("btn1",JSON.stringify(1));
              window.location.replace("C:/Users/syed/a/public/dr_list.html");
                }
                btn2.onclick = function() {
                  window.localStorage.setItem("btn2",JSON.stringify(1));
                  window.location.replace("C:/Users/syed/a/public/dr_list.html");
                    }
                   
     i++;
    }
   //dr_btn.addEventListener("click",window.location.replace("C:/Users/syed/a/public/test.html"));

  }   
         
  //dr_list
  
