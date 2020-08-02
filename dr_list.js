
        var uid;
      var didd;

if(window.location.pathname=="/C:/Users/syed/a/public/dr_list.html"){
   // window.location.pathname.onload=(event)=>{
        firebase.auth().onAuthStateChanged(function(user){
          var bbb;
           
          if(JSON.parse(window.localStorage.getItem("btn0"))==1){
             bbb=JSON.parse(window.localStorage.getItem("bt0"));
             window.localStorage.setItem("btn0",JSON.stringify(0));
            // window.localStorage.clear();

          }
          else if(JSON.parse(window.localStorage.getItem("btn1"))==1){
             bbb=JSON.parse(window.localStorage.getItem("bt1"));
             window.localStorage.setItem("btn1",JSON.stringify(0));
             //window.localStorage.clear();

          }
          else if(JSON.parse(window.localStorage.getItem("btn2"))==1){
             bbb=JSON.parse(window.localStorage.getItem("bt2"));
             window.localStorage.setItem("btn2",JSON.stringify(0));
            // window.localStorage.clear();

          }

          if(user){
        var user = firebase.auth().currentUser;
        if (user != null) {
            uid = user.uid;
        }
        CallDr(bbb);
      }
          });
      }
//}



  function CallDr(ui)
{
               
//alert("lll");

    var request = new XMLHttpRequest();
//var id=document.getElementById('readid').value;
request.open('GET', 'http://localhost:5000/apitut-5987c/us-central1/app/api/docter/'+ui, true);
//uid='GxSuiHLcUOTD6Vl6o4CHrMsSNby1';
//request.open('GET', 'http://localhost:5000/apitut-ac54a/us-central1/app/api/hospital/dept/'+uid, true);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    for (x in data) {
      var pat=new String(data[x].docid);
       did=pat.substring(50,70);
      
       sid=pat.substring(79);

     didd=did;
        //par.appendChild(document.createTextNode(data[x].name));
        //parr.appendChild(document.createTextNode(data[x].description));

  // document.getElementById("tit").innerHTML = data[x].name;
 //document.getElementById("desc").innerHTML = data[x].description;
   DoclistRET(data[x].name,data[x].designation,did,sid);
}
attach();
    
  } else {
    console.log('error')
  }
}

request.send();



}

var j=0;
function DoclistRET(name,desc,did,sid){
   var ul = document.getElementById('cont');
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
  //imgg.src=imglink;

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
  parr.appendChild(document.createTextNode(desc));

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
generateID(b.id,sid,did);
//b.id.onclick= function(){
  //  window.location.replace("C:/Users/syed/a/public/test.html");
 //}
//par.appendChild(document.createTextNode("Tomato"));
}
var i=0;
var btnid=[];
let btns=new Map();
let m=new Map();

function generateID(id,s,d){
m.set(id,s);
m.set(id+"1",d);
btns.set(id,uid+s+d);
btnid[i]=id;
i++;  
}


//producing slots
function addTime(sh,eh){
  var slot=20;
  var i,j;
var sm=30,em=30;

var am=sh.substring(5);//am
var mids=sh.substring(3,5);      
var s=sh.substring(0,2);
var jj = parseInt(s, 10);// first ka int  jj=11


var e=eh.substring(5);//pm
var mide=eh.substring(3,5);
var ee=eh.substring(0,2);
var ii=parseInt(ee,10);//last ka int

//System.out.println(mide);

var p="PM";
var a="AM";
var min="30";
var max="00";
var t=[];
//for(i=sm;sm<=60;sm++){

// System.out.println(e);
//if(e.localeCompare(p) && am.localeCompare(a) &&  !(ee.localeCompare("12"))){
 if(e==p && am==a &&ee!="12"){
  // if(mids.localeCompare(min)&& mide.localeCompare(min)){
    if(mids==min && mide==min){
       var add=ii+12;
  var ss=String.valueOf(add);
  var c=add+e;
  var r=ee.replace(eh,c);
  //System.out.println(c);
  var counter = 0;
  while(jj!=add){
      jj++;
      counter++;
      
  }
  //System.out.println("HOURS="+""+counter);
// System.out.println("Slots"+"="+((counter*60))/slot);
 //System.out.println("minutes"+"= "+((counter*60)));
 var idd=((counter*60))/slot;
 //alert(idd); 
t= dddd(idd,sh,slot);     
   }
   else if(  !(mids==min) && mide==min) {
    var add=ii+12;
       var ss=String.valueOf(add);
       var c=add+e;
       var r=ee.replace(eh,c);
  //System.out.println(c);
  var counter = 0;
  while(jj!=add){
      jj++;
      counter++;
      
  }
  //System.out.println("HOURS="+""+counter);
// System.out.println("Slots"+"= "+((counter*60)+30)/slot);
 //System.out.println("minutes"+"= "+((counter*60)+30));
 var idd=((counter*60)+30)/slot;
 t= dddd(idd,sh,slot); 
      
   }
   
   else if(mids==min && !(mide==min)){
    var add=ii+12;
       var ss=String.valueOf(add);
       var c=add+e;
       var r=ee.replace(eh,c);
  //System.out.println(c);
  var counter = 0;
  while(jj!=add){
      jj++;
      counter++;
      
  }
  //System.out.println("HOURS="+""+counter);
 //System.out.println("Slots"+"="+((counter*60)-30)/slot);
 //System.out.println("minutes"+"= "+((counter*60)-30));
 var idd=((counter*60)-30)/slot;
 t= dddd(idd,sh,slot); 
   }
   
   else{
  var add=ii+12;
  var ss=String.valueOf(add);
  var c=add+e;
  var r=ee.replace(eh,c);
  //System.out.println(c);
  var counter = 0;
  while(jj!=add){
      jj++;
      counter++;
      
  }
  //System.out.println("HOURS="+""+counter);
  //System.out.println("Slots"+(counter*60)/slot);
  var idd=((counter*60)-30)/slot;
  t= dddd(idd,sh,slot); 
   }//else
   
}



//----------------------------------------------------------------------------------


else if((e==p) && am==p && !(ee=="12") && !(s=="12") || (e==a) && am==a && !(s=="12") && !(ee=="12")){
var counter = 0;
 if(mids==min && mide==min){
     while(jj!=ii){
      jj++;
      counter++;
   
}
//System.out.println("HOURS="+""+counter);
// System.out.println("Slots11111"+"="+((counter*60))/slot);
// System.out.println("minutes11111"+"= "+((counter*60)));
var idd=((counter*60))/slot;
t= dddd(idd,sh,slot);     
        
 } 
 
 else if( !(mids==min) && mide==min){
     
     while(jj!=ii){
      jj++;
      counter++;
   
}
//System.out.println("HOURS="+""+counter);
//System.out.println("Slots11111"+"="+((counter*60)+30)/slot);
 //System.out.println("minutes11111"+"= "+((counter*60)+30));
 var idd=((counter*60)+30)/slot;
 t= dddd(idd,sh,slot);  
 }
 else if(mids==min && !(mide==min)   ){
      while(jj!=ii){
      jj++;
      counter++;
   
}
//System.out.println("HOURS="+""+counter);
// System.out.println("Slots11111"+"="+((counter*60)-30)/slot);
 //System.out.println("minutes11111"+"= "+((counter*60)-30));
 var idd=((counter*60)-30)/slot;
 t= dddd(idd,sh,slot);  
 }
 else{
  while(jj!=ii){
      jj++;
      counter++;
   
}//System.out.println("HOURS="+""+counter);
  //System.out.println("Slots1111"+"= "+(counter*60)/slot);
  var idd=((counter*60)/slot);
  t= dddd(idd,sh,slot); 
 }//else
}



//----------------------------------------------------------------------------------------------------------


else if(e==p && am==a &&  (ee=="12") && !(s=="12")){
   var counter = 0;
   if(mids==min&& mide==min){
       
      while(jj!=ii){
      jj++;
      counter++;
   
}
  //System.out.println("Slots2222"+"="+((counter*60))/slot);
 //System.out.println("minutes2222"+"= "+((counter*60))); 
 var idd=((counter*60)/slot);
 t= dddd(idd,sh,slot); 
}
   
   else if(!(mids==min) && mide==min){
        while(jj!=ii){
      jj++;
      counter++;
   
}
  //System.out.println("Slots2222"+"="+((counter*60)+30)/slot);
 //System.out.println("minutes2222"+"= "+((counter*60)+30));
 var idd=((counter*60)+30)/slot;
 t= dddd(idd,sh,slot);   
   }
   else if(mids==min && !(mide==min)){
       while(jj!=ii){
      jj++;
      counter++;
   
}
  //System.out.println("Slots2222"+"="+((counter*60)-30)/slot);
 //System.out.println("minutes2222"+"= "+((counter*60)-30));
 var idd=((counter*60)-30)/slot;
 t= dddd(idd,sh,slot); 
}
   
   else{
  while(jj!=ii){
      jj++;
      counter++;
   
}
 // System.out.println("HOURS="+""+counter);
  //System.out.println("Slots2222"+"="+(counter*60)/slot);
  var idd=((counter*60)/slot);
  t= dddd(idd,sh,slot); 
}
 
}

//--------------------------------------------------------------------------------------------------

else if(e==p && am==p &&  (s=="12")){
  var counter = 0;
    jj=0;
   if(mids==min && mide==min){
       while(jj!=ii){
      
      jj++;
      counter++;
   
} 
  ///System.out.println("Slots2222"+"= "+((counter*60))/slot);
 //System.out.println("minutes2222"+"= "+((counter*60))); 
 var idd=((counter*60)/slot);
 t= dddd(idd,sh,slot);   
}
   else if( !(mids==min) && mide==min){
       
        while(jj!=ii){
      
       jj++;
       counter++;
   
} 
//System.out.println("Slots2222"+"="+((counter*60)+30)/slot);
 //System.out.println("minutes2222"+"= "+((counter*60)+30));
 var idd=((counter*60)+30)/slot;
 t= dddd(idd,sh,slot);    
   }
   else if(mids==min && !(mide==min)){
         while(jj!=ii){
      
      jj++;
      counter++;
   
} 
  //System.out.println("Slots2222"+"="+((counter*60)-30)/slot);
 //System.out.println("minutes2222"+"= "+((counter*60)-30));
 var idd=((counter*60)-30)/slot;
 t= dddd(idd,sh,slot); 
}
   
   else{
  while(jj!=ii){
      
      jj++;
      counter++;
   
} 
  //System.out.println("HOURS="+""+counter);
  //System.out.println("Slots33333"+"="+(counter*60)/slot);
  var idd=((counter*60))/slot;
 t= dddd(idd,sh,slot);  
}//else
 
}
return t;
}

//dividing slots
function dddd(a,c,b){
   
    
  var st=c,slot=a,span=b;
  var time=[];
  time[0]=st;
  var t=0;
  var s=st.substring(0,2);
  var sm=st.substring(3,5);
  //var s;
//document.getElementById("demo").innerHTML = res;
 //alert(res);
 String.prototype.replaceM = function(index, replacement) {
 if (index >= this.length) {
   return this.valueOf();
 }

 return this.substring(0, index) + replacement + this.substring(index + 2);
}
String.prototype.replaceH = function(index, replacement) {
 if (index >= this.length) {
   return this.valueOf();
 }
var ss;
 return ss=replacement + this.substring(2);
}
 if(sm=="00" || sm=="30"){
 for(var i=1;i<slot;i++){
   var co=time[i-1]
  var r=11;
   //co=co.replaceM(0, r);
   //alert(co)
   if((co.substring(0,1))=="0" && ((co.substring(5))=="PM")){
     t=t+span;
     var rr=0;
           var rs=String.valueOf(t);
           if(t>60){
             rr =t-60;
             t=60;
           }
           
           if(t==60){
               rs="00";
              
               
               if(s<=12){
                   var d=String.valueOf(s);
                 //var f=String.valueOf(++s); 
                 var f=++s;
                 if(f==10|| f==11 || f==12){
                   co=co.replaceH(0, f);  
                 }else{
                 co=co.replaceH(0, '0'+f);}
                  //System.out.println(fc);
               }
               t=0;
           }
           if(t==0 && rr==0){
               co=co.replaceM(3, "00");
           }
           else if(co.substring(3,5)=="30" && rr==0 && t==span){
             t=t+30;
             co=co.replaceM(3, t);
           }else{
             t=t+rr;
           co=co.replaceM(3, t);
           rr=0; 
           }
           
           time[i]=co

  
//alert(time[i]);
   }else if(co.substring(0,1)=="0" && (co.substring(5))=="AM"){
              
     var rr=0;
          
              t=t+span;
           //var rs=String.valueOf(t);
           if(t>60){
             rr =t-60;
             t=60;
           }
           
           if(t==60){
               rs="00";
              
               
               if(s<=12){
                   
                   
                 var f=++s; 
                 if(f==10|| f==11 || f==12){
                  co=co.replaceH(0, f);  
                 
                 if(f==12){
                     co=co.replaceM(5, "PM");
                     s=0;
                 }
                 }else{
                 co=co.replaceH(0, '0'+f);}
                  //System.out.println(fc);
               }
               t=0;
           }
           if(t==0 && rr==0){
               co=co.replaceM(3, "00");
           }
           else if(co.substring(3,5)=="30" && rr==0 && t==span){
             t=t+30;
             co=co.replaceM(3, t);
           }else{
             t=t+rr;
           co=co.replaceM(3, t);
           rr=0; 
           }
           time[i]=co

  
//alert(time[i]);
          }
          else{
            var rr=0;
              t=t+span;
          //var rs=String.valueOf(t);
           if(t>60){
             rr =t-60;
             t=60;
           } if(t==60){
               rs="00";
              
               
               if(s<12){
                   
                   
                var f=++s; 
                if(f==10|| f==11 || f==12){
                  co= co.replaceH(0, f);  
                 
                 if(f==12){
                    co= co.replaceM(5, "PM");
                    // co.replace(0,2, "01");
                     s=0;
                 }
                 }
                 else{
                co= co.replaceH(0, '0'+f);}
                  //System.out.println(fc);
               }
               else if(s==12){
               co=co.replaceH(0, "01");  
                s=1;   
               }
               t=0;
           }
           
           if(t==0 && rr==0){
               co=co.replaceM(3, "00");
           }
           else if(co.substring(3,5)=="30" && rr==0 && t==span){
             t=t+30;
             co=co.replaceM(3, t);
           }else{
             t=t+rr;
           co=co.replaceM(3, t);
           rr=0; 
           }
           time[i]=co

  
//alert(time[i]);
    }
  }
 }
 return time;
}


//ad shedules
function AddShed(){
  var did;
  var sid;
  let result = document.querySelector('.result'); 
   var n=[];
   var d;
   
   if(JSON.parse(window.localStorage.getItem("bttn0"))==1){
    var bb=JSON.parse(window.localStorage.getItem("b0"));
    sid=m.get("btn0");
    did=m.get("btn01");
   
     //window.localStorage.clear();
     
  }
  else if(JSON.parse(window.localStorage.getItem("bttn1"))==1){
   var bb=JSON.parse(window.localStorage.getItem("b1"));
   sid=m.get("btn1");
   did=m.get("btn11");
     //window.localStorage.clear();
 
  }
  else if(JSON.parse(window.localStorage.getItem("bttn2"))==1){
   var bb=JSON.parse(window.localStorage.getItem("b2"));
   sid=m.get("btn2");
   did=m.get("btn21");
     //window.localStorage.clear();
     
 
  }
 
  

 
 
    for(var i=1;i<=14;i++){
       n[i] = document.getElementById(i).value; 
       }
              var uid;
              var ti=[];
              var user = firebase.auth().currentUser;
              
              if (user != null) {
                  uid = user.uid;
              }
              var day;
            for(var i=1; i<=7; i++){
           switch(i)
           {
             case 1:day='asun';
                        ti=addTime(n[i],n[i+7]);
                         break;
             case 2:day='bmon';ti=addTime(n[i],n[i+7]);break;
             case 3:day='ctue';ti=addTime(n[i],n[i+7]);break;
             case 4:day='dwed';ti=addTime(n[i],n[i+7]);break;
             case 5:day='ethu';ti=addTime(n[i],n[i+7]);break;
             case 6:day='ffri';ti=addTime(n[i],n[i+7]);break;
             case 7:day='gsat';ti=addTime(n[i],n[i+7]);break;
             default:day='none';ti=addTime(n[i],n[i+7]);break;
           }
            
      for(var k=0;k<ti.length;k++){



            // Creating a XHR object 
            let xhr = new XMLHttpRequest(); 
            let url = "http://localhost:5000/apitut-5987c/us-central1/app/api/addShed"; 
        
            // open a connection 
            xhr.open("POST", url, true); 

            // Set the request header i.e. which type of content you are sending 
            xhr.setRequestHeader("Content-Type", "application/json"); 

            // Create a state change callback 
            xhr.onreadystatechange = function () { 
                if (xhr.readyState === 4 && xhr.status === 200) { 

                    // Print received data from server 
                    //result.innerHTML = this.responseText; 
                    //alert("successful");
                    modal.style.display = "none";
                    window.localStorage.setItem("bttn0",JSON.stringify(0));
					 	       window.localStorage.setItem("bttn1",JSON.stringify(0));
						        window.localStorage.setItem("bttn2",JSON.stringify(0)); 
                } 
            }; 
          
             //var times=firebase.database.ServerValue.TIMESTAMP
            // Converting JSON data to string 
            var data = JSON.stringify({ "timefrom":ti[k],"index":k+1,"ex":i,"day":day,"uid":uid,"did":did,"sid":sid}); 

            // Sending data with the request 
            xhr.send(data); 
          }
          }
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

var sl=new Map();  

  function callmodal(bb)
  {
    var n=[];
    var d;
               
  //alert("lll");
  var pat=new String(bb);
  var uid=pat.substring(0,28);
  var sid=pat.substring(28,48);
  var did=pat.substring(48);
  
      var request = new XMLHttpRequest();
  //var id=document.getElementById('readid').value;
  request.open('GET', 'http://localhost:5000/apitut-5987c/us-central1/app/api/schedules/'+bb, true);
  //uid='GxSuiHLcUOTD6Vl6o4CHrMsSNby1';
  //request.open('GET', 'http://localhost:5000/apitut-ac54a/us-central1/app/api/hospital/dept/'+uid, true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
     var modal = document.getElementById("myModal");
    modal.style.display = "block";
    for(var i=1;i<=14;i++){
      n[i] = document.getElementById(i); 
      }  
    var j=1;
    if (request.status >= 200 && request.status < 400) {
      for (x in data) {
      
        document.getElementById(j).value=data[x].timefrom;
        document.getElementById(j+7).value=data[x].timeto;
       // n[j].appendChild(document.createTextNode(data[x].timefrom));
       // n[j+7].appendChild(document.createTextNode(data[x].timeto));
        j++;  
  
       
          //par.appendChild(document.createTextNode(data[x].name));
          //parr.appendChild(document.createTextNode(data[x].description));
  
    // document.getElementById("tit").innerHTML = data[x].name;
   //document.getElementById("desc").innerHTML = data[x].description;
     //DoclistRET(data[x].name,data[x].designation,did,sid);
  }
  //attach();
  
      
    } else {
      console.log('error')
    }
  }
  
  request.send();
  
  sl.set("1",bb);
  alert(sl.get("1"));
  
  }




//Adding new Docter
function AddDr(){
  
  let result = document.querySelector('.result'); 
             
            var name = document.getElementById("depna").value; 
            var designation = document.getElementById("depdesc").value; 
            var uid;
              var user = firebase.auth().currentUser;
              
              if (user != null) {
                  uid = user.uid;
              }
            
            // Creating a XHR object 
            let xhr = new XMLHttpRequest(); 
            let url = "http://localhost:5000/apitut-5987c/us-central1/app/api/addDr"; 
        
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
            var data = JSON.stringify({ "uid":uid,"name": name, "designation": designation ,"imagelink":imageDownloadURL,"didd":didd}); 

            // Sending data with the request 
            xhr.send(data); 
            
             }

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


//UPDATE SCHEDULES
function updateShed(bb,a,c){
  var pat=new String(bb);
  var uid=pat.substring(0,28);
  var sid=pat.substring(28,48);
  var did=pat.substring(48,68);
  var day=pat.substring(68);
  let result = document.querySelector('.result'); 
   var n=[];
   var d;
   
  /* if(JSON.parse(window.localStorage.getItem("bttn0"))==1){
    var bb=JSON.parse(window.localStorage.getItem("b0"));
    sid=m.get("btn0");
    did=m.get("btn01");
   
     //window.localStorage.clear();
     
  }
  else if(JSON.parse(window.localStorage.getItem("bttn1"))==1){
   var bb=JSON.parse(window.localStorage.getItem("b1"));
   sid=m.get("btn1");
   did=m.get("btn11");
     //window.localStorage.clear();
 
  }
  else if(JSON.parse(window.localStorage.getItem("bttn2"))==1){
   var bb=JSON.parse(window.localStorage.getItem("b2"));
   sid=m.get("btn2");
   did=m.get("btn21");
     //window.localStorage.clear();
     
 
  }
    for(var i=1;i<=14;i++){
       n[i] = document.getElementById(i).value; 
       }
              var uid;
              var user = firebase.auth().currentUser;
              
              if (user != null) {
                  uid = user.uid;
              }
              var day;
            for(var i=1; i<=7; i++){*/
              var ti=[];
              var i=0;
              ti=addTime(document.getElementById(a).value,document.getElementById(c).value);
           switch(day)
           {
             case 'asun':i=1;break;
             case 'bmon':i=2;break;
             case 'ctue':i=3;break;
             case 'dwed':i=4;break;
             case 'ethu':i=5;break;
             case 'ffri':i=6;break;
             case 'gsat':i=7;break;
             default:day='none';break;
           }
            
           

           for(var k=0;k<ti.length;k++){

            // Creating a XHR object 
            let xhr = new XMLHttpRequest(); 
            let url = "http://localhost:5000/apitut-5987c/us-central1/app/api/addShed"; 
        
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
                    window.localStorage.setItem("bttn0",JSON.stringify(0));
					 	       window.localStorage.setItem("bttn1",JSON.stringify(0));
						        window.localStorage.setItem("bttn2",JSON.stringify(0)); 
                } 
            }; 


            // Converting JSON data to string 
            var data = JSON.stringify({ "timefrom":ti[k],"index":k+1,"ex":i,"day":day,"uid":uid,"did":did,"sid":sid}); 


            // Sending data with the request 
            xhr.send(data); 
          }
          
  }
  var lab = document.getElementById("sun");
  var lab1 = document.getElementById("mon");
  var slot = document.getElementById("slots");
  var usn = document.getElementById("usun");
  var umn = document.getElementById("umon");


  lab.onclick = function() {
    modal.style.display = "none";
    callslots(sl.get("1")+"asun");
    }
    lab1.onclick = function() {
      modal.style.display = "none";
      callslots(sl.get("1")+"bmon");
      }
usn.onclick = function() {
    var flag;
    checkslots(sl.get("1")+"asun","1","8");
    }
    umn.onclick = function() {
      var flag;
      checkslots(sl.get("1")+"bmon","2","9");
      }

    function callslots(bb)
  {
    var n=[];
    var d;
               
  //alert("lll");
  var pat=new String(bb);
  var uid=pat.substring(0,28);
  var sid=pat.substring(28,48);
  var did=pat.substring(48,68);
  var day=pat.substring(68);
  
      var request = new XMLHttpRequest();
  //var id=document.getElementById('readid').value;
  request.open('GET', 'http://localhost:5000/apitut-5987c/us-central1/app/api/slots/'+bb, true);
  //uid='GxSuiHLcUOTD6Vl6o4CHrMsSNby1';
  //request.open('GET', 'http://localhost:5000/apitut-ac54a/us-central1/app/api/hospital/dept/'+uid, true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
     var mo = document.getElementById("slots");
    mo.style.display = "block";
    //for(var i=1;i<=14;i++){
     // n[i] = document.getElementById(i); 
      //}  
    var j=1;
    if (request.status >= 200 && request.status < 400) {
      for (x in data) {
         
         n[j]=data[x].slotTime;
         document.getElementById("pr").innerHTML=n;  
      
        j++; 
  }
  //attach();
   } else {
      console.log('error')
    }
  }
  
  request.send();
  
  //sl.add("1",bb);
  
  }

function checkslots(b,a,c)
{
var j=0; var slotts=[];
    var request = new XMLHttpRequest();
//var id=document.getElementById('readid').value;
request.open('GET', 'http://localhost:5000/apitut-5987c/us-central1/app/api/slots/'+b, true);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    for (x in data) {
      slotts[x]=data[x].slotTime
    }
    for (x in data) {
      var statu=(data[x].stat);

     if(statu=="1"){
       j=1;
       alert("cant update");
     break;
      
     }
     else{
       continue ;
     }
  
}
 if(j==0){
   alert("run update fun");
   delcol(b,slotts);
   updateShed(b,a,c);
   
 }   
  } else {
    console.log('error')
  }
}
request.send();
}
//deleting
function delcol(b,slotts){
  var pat=new String(b+slotts);
  var uid=pat.substring(0,28);
  var sid=pat.substring(28,48);
  var did=pat.substring(48,68);
  var day=pat.substring(68,72);
  var ti=pat.substring(72);

for(i=0;i<slotts.length;i++){
var url = "http://localhost:5000/apitut-5987c/us-central1/app/api/delShed/"+b+slotts[i];
var xhr = new XMLHttpRequest();
xhr.open('DELETE', url, true);
xhr.onload = function () {
	var users = JSON.parse(xhr.response);
	if (xhr.readyState == 4 && xhr.status == "200") {
    //console.table(users);
    alert(users);
	} else {
    alert(users);
	}
}
xhr.send(null);
}
}