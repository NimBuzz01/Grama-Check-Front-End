function statusCheck(){
    token =sessionStorage.getItem("token");
    var id = document.getElementById("formInput").value;
    console.log(id);
    axios.post('https://apigateway-dot-choreo-asgardeo-intern-project.de.r.appspot.com/statusCheckApi',{
        id_number:id
    },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(response =>{
        console.log(response);
        if(response.data.message===null){
            swal("No pending requests for entered ID","","error")
        }else{
           
            document.getElementById('statusField').innerHTML = response.data.status;
            document.getElementById('identityField').innerHTML = id;
        }
    }).catch(error=>{
        console.log(error);
        
        document.getElementById('statusField').innerHTML = "N/A";
        document.getElementById('identityField').innerHTML = "N/A";
        if(error.data.message=="Access token validation failed"){
            alert("Sign in again");
        }
    })

}
