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
        if(response.data.status===null){
            swal("No pending requests for entered ID","","error")
        }else{
           
            document.getElementById('statusField').innerHTML = response.data.status;
            document.getElementById('identityField').innerHTML = id;
        }
    }).catch(error=>{
        console.log(error);
        
        document.getElementById('statusField').innerHTML = "N/A";
            document.getElementById('identityField').innerHTML = "N/A";
    })

}
