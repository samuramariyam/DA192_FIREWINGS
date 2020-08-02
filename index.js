
/*function CallMe()
{
    var email=document.getElementById("email").value;
    alert("Onclick: "+email);
}*/
const functions = require('firebase-functions');
const admin=require('firebase-admin');


var serviceAccount = require("C:/Users/syed/perr.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://apitut-5987c.firebaseio.com"
});

const express=require('express');

const app=express();
const db=admin.firestore();
const cors=require('cors');
const { firestore } = require('firebase-admin');
const { firebaseConfig } = require('firebase-functions');
app.use(cors({origin:true}));

//routs 

app.get('/hello',(req,res)=>{
    return res.status(200).send('hello world');
});
//create,post
app.post('/api/create',(req,res)=>{
    (async()=> {
        try{
             await db.collection('products').doc('/'+req.body.id+'/')
             .create({
                 name:req.body.name,
                 description:req.body.description,
                 price:req.body.price
             })
             return res.status(200).send();
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});

//creating hospital
app.post('/api/create/hospital',(req,res)=>{
    (async()=> {
        try{
             await db.collection('Hospital').doc('/'+req.body.uid+'/')
             .create({
                 Hospital_name:req.body.name,
                 Email:req.body.Email,
                 Address:req.body.Address,
                 Password:req.body.Password
             })
             return res.status(200).send();
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});

//creating department
app.post('/api/addDep',(req,res)=>{
    (async()=> {
        try{
            await db.collection('Hospital').doc('/'+req.body.uid+'/').collection('Departments')
             //await db.collection('/Hospital/GxSuiHLcUOTD6Vl6o4CHrMsSNby1/Departments')
             .add({
                 name:req.body.name,
                 description:req.body.description,
                 imagelink:req.body.imagelink
                 //Password:req.body.Password
             })
             return res.status(200).send();
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});

//read specific product
app.get('/api/read/:id',(req,res)=>{
    (async()=> {
        try{
            const document=db.collection('products').doc(req.params.id);
            let product = await document.get();
            let response =product.data();

             return res.status(200).send(response);
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});
//read all product
app.get('/api/read',(req,res)=>{
    (async()=> {
        try{
           let query = db.collection('products');
           let response = [];
           await query.get().then(querySnapshot=>{
               let docs=querySnapshot.docs;
               for(let doc of docs){
                   const selectedItem = {
                       //id:doc.id,
                       name:doc.data().name,
                       description:doc.data().description,
                       price:doc.data().price
                   };
                response.push(selectedItem);
               }
               return response;
           })
           return res.status(200).send(response);
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});


//read all department
app.get('/api/hospital/dept/:id',(req,res)=>{
    (async()=> {
        try{
           let query = db.collection('/Hospital/'+req.params.id+'/Departments');
           let response = [];
           await query.get().then(querySnapshot=>{
               let docs=querySnapshot.docs;
               for(let doc of docs){
                   const selectedItem = {
                      // Hospital_name:doc.data().Hospital_name,
                      // Password:doc.data().Password,
                     docid:doc.ref.path,
                        
                       name:doc.data().name,
                       description:doc.data().description,
                       imagelink:doc.data().imagelink
                   };
                response.push(selectedItem);
               }
               return response;
           })
           return res.status(200).send(response);
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});

//read all docter list
app.get('/api/docter/:id',(req,res)=>{
    (async()=> {
        try{
           let query = db.collection('/Hospital/EIJCdYbWlVhgNJkgI3VyuljtazS2/Departments/'+req.params.id+'/Dr_List');
           let response = [];
           await query.get().then(querySnapshot=>{
               let docs=querySnapshot.docs;
               for(let doc of docs){
                   const selectedItem = {
                      // Hospital_name:doc.data().Hospital_name,
                      // Password:doc.data().Password,
                       docid:doc.ref.path,
                       name:doc.data().name,
                       designation:doc.data().designation,
                       //imagelink:doc.data().imagelink
                   };
                response.push(selectedItem);
               }
               return response;
           })
           return res.status(200).send(response);
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});

//read all schedules
app.get('/api/schedules/:id',(req,res)=>{
    var pat=new String(req.params.id);
 var uid=pat.substring(0,28);
 var sid=pat.substring(28,48);
 var did=pat.substring(48);
    (async()=> {
        try{
           let query = db.collection('/Hospital/'+uid+'/Departments/'+did+'/Dr_List/').doc(sid).collection('schedules');
           let response = [];
           await query.get().then(querySnapshot=>{
               let docs=querySnapshot.docs;
               for(let doc of docs){
                   const selectedItem = {
                      // Hospital_name:doc.data().Hospital_name,
                      // Password:doc.data().Password,
                       //docid:doc.ref.path,
                       timefrom:doc.data().timefrom,
                       timeto:doc.data().timeto
                       //imagelink:doc.data().imagelink
                   };
                response.push(selectedItem);
               }
               return response;
           })
           return res.status(200).send(response);
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});

//read all slots
app.get('/api/slots/:id',(req,res)=>{
    var pat=new String(req.params.id);
 var uid=pat.substring(0,28);
 var sid=pat.substring(28,48);
 var did=pat.substring(48,68);
 var day=pat.substring(68);
    (async()=> {
        try{
           let query = db.collection('/Hospital/'+uid+'/Departments/'+did+'/Dr_List/').doc(sid).collection('schedules/'+day+'/slots');
           let response = [];
           await query.orderBy("index").get().then(querySnapshot=>{
               let docs=querySnapshot.docs;
               for(let doc of docs){
                   const selectedItem = {
                      // Hospital_name:doc.data().Hospital_name,
                      // Password:doc.data().Password,
                       //docid:doc.ref.path,
                       slotTime:doc.data().slotTime,
                       stat:doc.data().status
                       //timeto:doc.data().timeto
                       //imagelink:doc.data().imagelink
                   };
                response.push(selectedItem);
               }
               return response;
           })
           return res.status(200).send(response);
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});


//update,put
app.put('/api/update/:id',(req,res)=>{
   
    (async()=> {
        try{
            const document = db.collection('products').doc(req.params.id);
            await document.update({
                name:req.body.name,
                description:req.body.description,
                price:req.body.price
            });
             
             return res.status(200).send();
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});

//delete,delete
app.delete('/api/delete/:id',(req,res)=>{
    (async()=> {
        try{
            const document = db.collection('products').doc(req.params.id);
            await document.delete();
             
             return res.status(200).send();
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});
//add  schedules
app.post('/api/addShed',(req,res)=>{
    //var d=req.body.timefrom;
    //var m=new Map();
    //m.add(d,0);
    (async()=> {
        var to=new Date();
         var cr=to.getDay();
        var date2=new Date();
        var i=-1;
    switch(req.body.day){
      case "asun":i=0;break;
      case "bmon":i=1;break;
      case "ctue":i=2;break;
      case "dwed":i=3;break;
      case "ethu":i=4;break;
      case "ffri":i=5;break;
      case "gsat":i=6;break;
    }
    if(i==0){
      if(cr==0){
        date2.setDate(date2.getDate())
        //alert(date2)  
      }
      if(cr==1){
        date2.setDate(date2.getDate()+6)
       // alert(date2)  
      }
      if(cr==2){
        date2.setDate(date2.getDate()+5)
        //alert(date2)  
      }
      if(cr==3){
        date2.setDate(date2.getDate()+4)
        //alert(date2)  
      }
      if(cr==4){
        date2.setDate(date2.getDate()+3)
        //alert(date2)
      }
      if(cr==5){
        date2.setDate(date2.getDate()+2)
        //alert(date2)     
     }
      if(cr==6){
        date2.setDate(date2.getDate()+1)
        //alert(date2)  
      }
    }else if(i==1){
      if(cr==0){
        date2.setDate(date2.getDate()+1)
        //alert(date2)  
      }
      if(cr==1){
        date2.setDate(date2.getDate())
        //alert(date2)  
      }
      if(cr==2){
        date2.setDate(date2.getDate()+6)
        //alert(date2)  
      }
      if(cr==3){
        date2.setDate(date2.getDate()+5)
        //alert(date2)  
      }
      if(cr==4){
        date2.setDate(date2.getDate()+4)
        //alert(date2)
      }
      if(cr==5){
        date2.setDate(date2.getDate()+3)
        //alert(date2)   
       }
      if(cr==6){
        date2.setDate(date2.getDate()+2)
        //alert(date2)  
      }
    }
    else if(i==2){
        if(cr==0){
          date2.setDate(date2.getDate()+2)
          //alert(date2)  
        }
        if(cr==1){
          date2.setDate(date2.getDate()+1)
          //alert(date2)  
        }
        if(cr==2){
          date2.setDate(date2.getDate())
          //alert(date2)  
        }
        if(cr==3){
          date2.setDate(date2.getDate()+6)
          //alert(date2)  
        }
        if(cr==4){
          date2.setDate(date2.getDate()+5)
          //alert(date2)
        }
        if(cr==5){
          date2.setDate(date2.getDate()+4)
          //alert(date2)   
           }
        if(cr==6){
          date2.setDate(date2.getDate()+3)
          //alert(date2)  
        }
      }else if(i==3){
        if(cr==0){
          date2.setDate(date2.getDate()+3)
          //alert(date2)  
        }
        if(cr==1){
          date2.setDate(date2.getDate()+2)
          //alert(date2)  
        }
        if(cr==2){
          date2.setDate(date2.getDate()+1)
          //alert(date2)  
        }
        if(cr==3){
          date2.setDate(date2.getDate())
          //alert(date2)  
        }
        if(cr==4){
          date2.setDate(date2.getDate()+6)
          //alert(date2)
        }
        if(cr==5){
          date2.setDate(date2.getDate()+5)
          //alert(date2)   
           }
        if(cr==6){
          date2.setDate(date2.getDate()+4)
          //alert(date2)  
        }
      }else if(i==4){
        if(cr==0){
          date2.setDate(date2.getDate()+4)
          //alert(date2)  
        }
        if(cr==1){
          date2.setDate(date2.getDate()+3)
          //alert(date2)  
        }
        if(cr==2){
          date2.setDate(date2.getDate()+2)
          //alert(date2)  
        }
        if(cr==3){
          date2.setDate(date2.getDate()+1)
          //alert(date2)  
        }
        if(cr==4){
          date2.setDate(date2.getDate())
          //alert(date2)
        }
        if(cr==5){
          date2.setDate(date2.getDate()+6)
          //alert(date2)   
           }
        if(cr==6){
          date2.setDate(date2.getDate()+5)
          //alert(date2)  
        }
      }else if(i==5){
        if(cr==0){
          date2.setDate(date2.getDate()+5)
          //alert(date2)  
        }
        if(cr==1){
          date2.setDate(date2.getDate()+4)
          //alert(date2)  
        }
        if(cr==2){
          date2.setDate(date2.getDate()+3)
          //alert(date2)  
        }
        if(cr==3){
          date2.setDate(date2.getDate()+2)
          //alert(date2)  
        }
        if(cr==4){
          date2.setDate(date2.getDate()+1)
          //alert(date2)
        }
        if(cr==5){
          date2.setDate(date2.getDate())
          //alert(date2)   
           }
        if(cr==6){
          date2.setDate(date2.getDate()+6)
          //alert(date2)  
        }
      }else if(i==6){
        if(cr==0){
          date2.setDate(date2.getDate()+6)
          //alert(date2)  
        }
        if(cr==1){
          date2.setDate(date2.getDate()+5)
          //alert(date2)  
        }
        if(cr==2){
          date2.setDate(date2.getDate()+4)
          //alert(date2)  
        }
        if(cr==3){
          date2.setDate(date2.getDate()+3)
          //alert(date2)  
        }
        if(cr==4){
          date2.setDate(date2.getDate()+2)
          //alert(date2)
        }
        if(cr==5){
          date2.setDate(date2.getDate()+1)
          //alert(date2)    
          }
        if(cr==6){
          date2.setDate(date2.getDate())
          //alert(date2)  
        }
      }
        
       // date1.setDate(date2.getDate()+(req.body.ex)+2)
        var date1=new Date(date2)
       date1.setDate(date1.getDate()+2)
        try{
            // await db.collection('/Hospital/GxSuiHLcUOTD6Vl6o4CHrMsSNby1/Departments/Fuscly5WfFpzac3ckqu1/Dr_List/yx6Hwj0SqFTDHRUY5W01/schedules').doc('mon')
            
            await db.collection('/Hospital/'+req.body.uid+'/Departments/'+req.body.did+'/Dr_List/'+req.body.sid+'/schedules/'+req.body.day+'/slots').doc(req.body.timefrom)
            .create({
                
                 status:"0",
                 index:req.body.index,
                 AddedOn:to,
                expiers:date1,
                currentDate:date2,
                slotTime:req.body.timefrom
             //timeto:req.body.timeto
                 //Address:req.body.Address,
                 //Password:req.body.Password

             })
             return res.status(200).send();
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});

//update shedules
app.post('/api/updateShed',(req,res)=>{
    (async()=> {
        var today=new Date();
        //  var date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var date1=new Date();
          date1.setDate(date1.getDate()+(req.body.ex)+1)
          var date2=new Date(date1)
          date2.setDate(date2.getDate()-2)
          try{
              // await db.collection('/Hospital/GxSuiHLcUOTD6Vl6o4CHrMsSNby1/Departments/Fuscly5WfFpzac3ckqu1/Dr_List/yx6Hwj0SqFTDHRUY5W01/schedules').doc('mon')
              
              await db.collection('/Hospital/'+req.body.uid+'/Departments/'+req.body.did+'/Dr_List/'+req.body.sid+'/schedules/'+req.body.day+'/slots').doc(req.body.timefrom)
              .create({
                  
                   status:"0",
                   index:req.body.index,
                   AddedOn:today,
                  expiers:date1,
                  currentDate:date2,
                  slotTime:req.body.timefrom
               //timeto:req.body.timeto
                   //Address:req.body.Address,
                   //Password:req.body.Password
  
               })
             return res.status(200).send();
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});




//creating Docter profile
app.post('/api/addDr',(req,res)=>{

    (async()=> {
        try{
            await db.collection('Hospital/'+req.body.uid+'/Departments/'+req.body.didd+'/Dr_List')
             //await db.collection('/Hospital/GxSuiHLcUOTD6Vl6o4CHrMsSNby1/Departments')
             .add({
                 name:req.body.name,
                 designation:req.body.designation,
                 imagelink:req.body.imagelink
                 //Password:req.body.Password
             })
             return res.status(200).send();
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});

//delete,delete collection
app.delete('/api/delShed/:id',(req,res)=>{
    var pat=new String(req.params.id);
 var uid=pat.substring(0,28);
 var sid=pat.substring(28,48);
 var did=pat.substring(48,68);
 var day=pat.substring(68,72);
 var ti=pat.substring(72);
    (async()=> {
        try{
            //var document =db.collection('/Hospital/EIJCdYbWlVhgNJkgI3VyuljtazS2/Departments/mPZLYUkvVyz1YBnTn7lv/Dr_List/fEFisKYF8ZpKv9oXFcCB/schedules/bmon/slots/').doc('09:30AM');
            const document = db.collection('/Hospital/'+uid+'/Departments/'+did+'/Dr_List/'+sid+'/schedules/'+day+'/slots/').doc(ti);
            await document.delete();
             return res.status(200).send();
        }
        catch(error){
               console.log(error);
               return res.status(500).send(error);
        }
    })();
});



exports.app=functions.https.onRequest(app);
