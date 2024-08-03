

 function login(){
    let email = $('#email').val();
    let password = $('#password').val();

     fetch('api/v1/auth/login',{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({email,password})
    }).then((response)=>response.json())
    .then(function(resp){
        if(resp.estatus == true){
            window.location.href ="/home"
/*             $.confirm({
                title: 'Sesión iniciada',
                content: 'Autenticación correcta!!',
                type: 'blue',
                typeAnimated: true,
                buttons: {
                    Ok: function () {
                    }
                }
            }); */
        }else{
            $.confirm({
                title: '¡Atención!',
                content: resp.msj,
                type: 'orange',
                typeAnimated: true,
                buttons: {
                    Ok: function () {
                    }
                }
            });
        }
    });
    
}