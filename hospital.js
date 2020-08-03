

window.onload=(event)=>{
    CallMe("1nhp6hYXzKVnxhDQy8NZ");
  }

  var ad,dc,smc;
var j=0;

  function listRET(name,cna,cad,ph,dem,iid){
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
   imgg.src="C:/Users/syed/Pictures/dstrict.png";
 
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
   parr.appendChild(document.createTextNode("Hospital Name:"+cna+"  Hospital Address:"+cad));

   var parrr = document.createElement("p");
   parrr.id="dfeferg";
   parrr.className="content";
   parrr.setAttribute('id',candidate);
   parrr.appendChild(document.createTextNode("contact no:"+ph+"  Email:"+dem));
 
   var b = document.createElement("div");
   //b.id="btn"+Math.floor(Math.random() * 11);
   //b.id="btn"+ j++; 
   
   b.className="btn";
   b.setAttribute('id',"btn"+ j);
   b.appendChild(document.createTextNode("Details"));

   var b1 = document.createElement("div");
   //b.id="btn"+Math.floor(Math.random() * 11);
   //b.id="btn"+ j++; 
   
   b1.className="btn";
   b1.setAttribute('id',"btn1"+ j);
   b1.appendChild(document.createTextNode("Verified"));
   b1.style.marginLeft="420px"
 
 
   
 ul.appendChild(li);
 li.appendChild(u);
 u.appendChild(un);
 un.appendChild(unn);
 unn.appendChild(imgg);
 un.appendChild(uno);
 
 uno.appendChild(par);
 uno.appendChild(parr);
 uno.appendChild(parrr);

 uno.appendChild(b);
 uno.appendChild(b1);
 grnerateID(b.id,b1.id,iid);
 j++;
 //b.id.onclick= function(){
   //  window.location.replace("C:/Users/syed/a/public/test.html");
  //}
 //par.appendChild(document.createTextNode("Tomato"));
 }   
 var i=0;
var btnid=[];
let btns=new Map();
let vbtn=new Map();
function grnerateID(id,vid,docid){
btns.set(id,docid);
vbtn.set(vid,docid);
btnid[i]=id;
i++;  
  
}

 function CallMe(uid)
{
               
//alert("lll");

    var request = new XMLHttpRequest();
//var id=document.getElementById('readid').value;
request.open('GET', 'http://localhost:5000/apitut-5987c/us-central1/app/api/hospital/'+uid, true);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)


  if (request.status >= 200 && request.status < 400) {
    for (x in data) {
        if(data[x].status=="0"){
        //par.appendChild(document.createTextNode(data[x].name));
        //parr.appendChild(document.createTextNode(data[x].description));
        // document.getElementById("tit").innerHTML = data[x].name;
         //document.getElementById("desc").innerHTML = data[x].description;
 var pat=new String(data[x].docid);
 var iid=pat.substring(43);

   listRET(data[x].name,data[x].hna,data[x].had,data[x].ph,data[x].dem,iid);}
}
attach();
    
  } else {
    console.log('error')
  }
}
request.send();
}


function attach(){
    var i=0;
    var btn=[];
    while(btnid[i]!=null){
    btn[i]=document.getElementById(btnid[i]);
    drid=btns.get("btn"+i);
    window.localStorage.setItem("b"+i,JSON.stringify(drid));
    btn[i].onclick = function() {
      //window.localStorage.setItem("bt"+i,JSON.stringify(btn[i]));
     // f(btns.get("btn"+0));
         //if(document.getElementById())
      //window.location.replace("C:/Users/syed/a/public/dr_list.html");
      window.localStorage.setItem("btttn0",JSON.stringify(1));

        }
        btn0.onclick = function() {
          window.localStorage.setItem("bttn0",JSON.stringify(1));
          cs();
          //window.location.replace("C:/Users/syed/a/public/dr_list.html");
            }

            btn1.onclick = function() {
              window.localStorage.setItem("bttn1",JSON.stringify(1));
              window.localStorage.setItem("bttn0",JSON.stringify(0));
              cs();
              //window.location.replace("C:/Users/syed/a/public/dr_list.html");
                }
               /* btn2.onclick = function() {
                  window.localStorage.setItem("bttn2",JSON.stringify(1));
                  cs();
                  //window.location.replace("C:/Users/syed/a/public/dr_list.html");
                    }*/
               //verifing buttons
                    btn10.onclick = function() {
                        window.localStorage.setItem("btttn0",JSON.stringify(1));
                        sets();
                        //window.location.replace("C:/Users/syed/a/public/dr_list.html");
                          }
              
                          btn11.onclick = function() {
                            window.localStorage.setItem("btttn1",JSON.stringify(1));
                            window.localStorage.setItem("btttn0",JSON.stringify(0));
                            sets();
                            //window.location.replace("C:/Users/syed/a/public/dr_list.html");
                              }
    
    
    i++;
  }
 
   //dr_btn.addEventListener("click",window.location.replace("C:/Users/syed/a/public/test.html"));
   
} 
function cs(){
  if(JSON.parse(window.localStorage.getItem("bttn0"))==1){
    var bb=JSON.parse(window.localStorage.getItem("b0"));
   
     //window.localStorage.clear();
     callmodal(bb);
  }
  else if(JSON.parse(window.localStorage.getItem("bttn1"))==1){
   var bb=JSON.parse(window.localStorage.getItem("b1"));
   
     //window.localStorage.clear();
 callmodal(bb);
  }
  else if(JSON.parse(window.localStorage.getItem("bttn2"))==1){
   var bb=JSON.parse(window.localStorage.getItem("b2"));
   
     //window.localStorage.clear();
     callmodal(bb);
 
  }
}  
function sets(){
    if(JSON.parse(window.localStorage.getItem("btttn0"))==1){
      var bb=JSON.parse(window.localStorage.getItem("b0"));
     
       //window.localStorage.clear();
       callst(bb);
    }
    else if(JSON.parse(window.localStorage.getItem("btttn1"))==1){
     var bb=JSON.parse(window.localStorage.getItem("b1"));
     
       //window.localStorage.clear();
   callst(bb);
    }
    else if(JSON.parse(window.localStorage.getItem("btttn2"))==1){
     var bb=JSON.parse(window.localStorage.getItem("b2"));
     
       //window.localStorage.clear();
       callst(bb);
   
    }
  }  

var sl=new Map();  
var ad,dc,smc;
  function callmodal(bb)
  {
   var request = new XMLHttpRequest();
//var id=document.getElementById('readid').value;
request.open('GET', 'http://localhost:5000/apitut-5987c/us-central1/app/api/reqhospitalPDF/'+bb, true);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  if (request.status >= 200 && request.status < 400) {
    
        ad=data.Adhaar;
        dc=data.HRD_link;
        //smc=data.DRD_link;
  // document.getElementById("tit").innerHTML = data[x].name;
 //document.getElementById("desc").innerHTML = data[x].description;
 //var pat=new String(data[x].docid);
 //var iid=pat.substring(41);
    

   //listRET(data[x].name,data[x].cna,data[x].cad,data[x].ph,data[x].dem,iid);

attachD();
    
  } else {
    console.log('error')
  }
}
request.send();
 
  }

  function callst(bb){
    let result = document.querySelector('.result'); 
               
    //var name = document.getElementById("depna").value; 
    //var desc = document.getElementById("depdesc").value; 
    var uid;
      var user = firebase.auth().currentUser;
      
      if (user != null) {
          uid = user.uid;
      }
    
    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 
    let url = "http://localhost:5000/apitut-5987c/us-central1/app/api/hosstup/"+bb; 

    // open a connection 
    xhr.open("PUT", url, true); 

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
    var data = JSON.stringify({ "status":"0"}); 

    // Sending data with the request 
    xhr.send(data); 
    
     
  }
         
  function attachD(){
    var a=document.getElementById("adhaar");
    a.onclick=function(){
        //PDFObject.embed("C:/Users/syed/Downloads/Hackhaton.pdf", "#example1");
       
        var modal = document.getElementById("myModal");
         modal.style.display = "none";
        var moda=document.getElementById("myModa")
        moda.style.display="block";
        var omyFrame = document.getElementById("myFrame");
        omyFrame.style.display="block";
        
         omyFrame.src = ad;
         //"C:/Users/syed/Downloads/Hackhaton.pdf";
    }
}
