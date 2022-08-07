function requestCert() {
    
    token =sessionStorage.getItem("token");
    document.getElementById("notValid").style.display='none';
    document.getElementById("valid").style.display='none';
    axios.post('https://apigateway-dot-choreo-asgardeo-intern-project.de.r.appspot.com/idCheckApi',{
        id_number:document.getElementById("nicInput").value,
        address:document.getElementById("addressInput").value


    },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(response=>{
        console.log("id check api");
        console.log(response);
        
        idNumber =document.getElementById("nicInput").value;
        axios.post('https://apigateway-dot-choreo-asgardeo-intern-project.de.r.appspot.com/policeCheckApi',{
            id_number:idNumber,
            grama_id:response.data.grama_id

        },{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }).then(response=>{
            console.log("police report api");
            console.log(response);  
            
                     
        }).catch(error=>{
            console.log(error);
        })




    }).catch(error=>{
        console.log("error");
        console.log(error);
        document.getElementById("notValid").style.display='block';
    }
        )
    
}