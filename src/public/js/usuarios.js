function getUsuarios(){
    //let $('#tUsuarios')
    let html = "";
    fetch('api/v1/user',{
        method:'GET',
    }).then((response)=>response.json())
    .then(function(resp){
        console.log(resp)

        if(resp.data.length > 0){
            resp.data.forEach(item => {
                console.log(item.nombre_usuario)
                html += '<tr>';
                html += '<td>'+item.email+'</td>';
                html += '<td>'+item.nombre_usuario+'</td>';
                html += '<td>'+item.fecha_reg+'</td>';
                html += '<td><a href="#">Editar</a></td>';
                html += '</tr>';
                $('#tUsuarios').html(html);
            });
        }else{

        }
    });
}

$('#btnAgregar').click(function (e) { 
    e.preventDefault();
   $('#exampleModal').modal('show')
    
});

window.onload = getUsuarios();