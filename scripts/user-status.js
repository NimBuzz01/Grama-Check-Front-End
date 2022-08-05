function statusCheck(){
    token =sessionStorage.getItem("token");
    console.log(token);
    var id = document.getElementById("formInput").value;
    console.log(id);
    axios.post('https://apigateway-dot-choreo-asgardeo-intern-project.de.r.appspot.com/statusCheckApi',{
        id_number:id
    },{
        Headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(response =>{
        if(response=="invalid"){
            document.getElementById('validation').style.display='block'
        }else{
            document.getElementById('validation').style.display='none';
            document.getElementById('statusField').innerHTML = response.data.status;
            document.getElementById('identityField').innerHTML = id;
        }
    }).catch(error=>{
        document.getElementById('validation').style.display='block'
        document.getElementById('statusField').innerHTML = "N/A";
            document.getElementById('identityField').innerHTML = "N/A";
    })

}
