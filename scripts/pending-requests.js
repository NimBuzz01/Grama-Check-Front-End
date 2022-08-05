function getRequests() {
    const token = localStorage.getItem("token");
    document.getElementById("pendingRequests").innerHTML="";
    const idNumber = document.getElementById("formInput").value;
    axios.post('https://apigateway-dot-choreo-asgardeo-intern-project.de.r.appspot.com/certificateCheckApi',{
            grama_id:idNumber
            }, {
                headers: {
                    Authorization: token
                }
}).then(response =>{
    const arr = response.data;
    console.log(arr);
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
            localStorage.setItem("moreInfoID",this.id);
            window.location.href = "more-info.html"
            
            
        }
        button.className ='info-btn';
        button.innerHTML ='More Info';
        
        div.appendChild(idTag);
        div.appendChild(addressTag);
        div.appendChild(button);
        
        

        document.getElementById("pendingRequests").appendChild(div);

    }
}).catch(error=>{
    document.getElementById('validation').style.display='block'
})
    
}

