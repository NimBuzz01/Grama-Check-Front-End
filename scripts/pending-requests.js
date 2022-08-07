if(sessionStorage.getItem("pendingRequests")===null){
    console.log("empty");
}else{
    arr = JSON.parse(sessionStorage.getItem("pendingRequests"));
    createRequests(arr);
    
}


function getRequests() {
    const token = sessionStorage.getItem("token");
    console.log(token);
    document.getElementById("pendingRequests").innerHTML="";
    const idNumber = document.getElementById("formInput").value;
    axios.post('https://apigateway-dot-choreo-asgardeo-intern-project.de.r.appspot.com/certificateCheckApi',{
            grama_id:idNumber
            },{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }).then(response =>{
    const arr = response.data;    
   sessionStorage.setItem("pendingRequests",JSON.stringify(arr));
    

    if(response.data.message=='No new records exist!'){
        swal("No new records found","","error")
    }else{
        createRequests(arr);
    }
    
}).catch(error=>{
    console.log("error");
    
})
    
}


function createRequests(arr){
    for(i=0;i<arr.length;i++){
        
        var div =document.createElement("div");
        div.className ="pending-card";


        var idTag = document.createElement("p");
        idTag.appendChild(document.createTextNode("NIC:"));
        var idSpan = document.createElement("span");
        var idNumber= document.createTextNode(arr[i].id_number);
        idSpan.appendChild(idNumber);
        idTag.appendChild(idSpan);

        var addressTag = document.createElement("p");
        addressTag.appendChild(document.createTextNode("Address:"));
        var addressSpan = document.createElement("span");
        addressSpan.appendChild(document.createTextNode(arr[i].full_address));
        addressTag.appendChild(addressSpan);

        var button = document.createElement("a");
        button.id=arr[i].id_number;
        button.onclick=function() {
            sessionStorage.setItem("moreInfoID",this.id);
            window.location.href = "more-info.html"
            
            
        }
        button.className ='info-btn';
        button.innerHTML ='More Info';
        
        div.appendChild(idTag);
        div.appendChild(addressTag);
        div.appendChild(button);
        
        

        document.getElementById("pendingRequests").appendChild(div);

    }
}


