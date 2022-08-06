
if (localStorage.getItem("moreInfoID") === null) {
    console.log("local storage empty")
  }else{

    const idNumber = localStorage.getItem("moreInfoID");
    const token = localStorage.getItem("token");
    console.log(token);
    axios.post("https://getcertificatedetails-dot-choreo-asgardeo-intern-project.de.r.appspot.com/",{
    id_number:idNumber
    },{
      headers:{
          'Authorization': `Bearer ${token}`
      }
  }).then(response=>{
       var info=response.data;
        console.log(info);
        
    // var count =0;
    // for (const property in info) {
    //     if (count>1 &&count<10){
    //         var pTag = document.createElement("p");
    //         pTag.className= 'info-nic';
    //         var firstLet= property.charAt(0);
    //         var tag =firstLet.toUpperCase()+property.substring(1);
    //         pTag.appendChild(document.createTextNode(tag+"\xa0\xa0\xa0"+":"+"\xa0\xa0"));
    //         var span = document.createElement("span");
    //         var data=info[property];
    //         data=data.replaceAll(",","\xa0"+","+"\xa0")
    //         span.appendChild(document.createTextNode(data));
    //         pTag.appendChild(span);
    //         document.getElementById('info').appendChild(pTag);
            

    //     }
    //     count=count+1;
    // }


    //Entering user info
    document.getElementById("idNo").innerHTML=info.id_number;
    document.getElementById("gramaId").innerHTML=info.grama_id;
    document.getElementById("status").innerHTML=info.status;
    document.getElementById("date").innerHTML=info.application_date;
    document.getElementById("name").innerHTML=info.full_name;
    document.getElementById("division").innerHTML=info.division;
    document.getElementById("secDivision").innerHTML=info.sec_division;
    document.getElementById("address").innerHTML=info.full_address;


    //entering police data
    document.getElementById("caseNo").innerHTML=info.police_data.case_number;
    document.getElementById("severity").innerHTML=info.police_data.severity;
    document.getElementById("caseDate").innerHTML=info.police_data.case_date;
    document.getElementById("officer").innerHTML=info.police_data.reporting_officer;
    document.getElementById("summary").innerHTML=info.police_data.summary;
    document.getElementById("telephone").innerHTML=info.user_phone_number;
    
    if(info.status=="complete"){
      document.getElementById('done-btn').style.display='none';


    }
    
        



})
}


function changeStatus() {
  const token = localStorage.getItem('token');
  const idNumber = localStorage.getItem("moreInfoID");
    axios.post('https://apigateway-dot-choreo-asgardeo-intern-project.de.r.appspot.com/changeStatus',{
      id_number:idNumber
    },{
      headers:{
          'Authorization': `Bearer ${token}`
      }
  }).then(response=>{
      
      document.getElementById("status").innerHTML=response.data.status;
      window.location.href='pending-requests.html';
    }).catch(error=>{
      console.log(error);
    })
  }  

