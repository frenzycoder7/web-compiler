var socket = io();
socket.on('connect', function(){
    var li = jQuery(`<div class="container-fluid btn btn-success"></div>`);
    li.text('Connected to server');
    jQuery('#msg').append(li);
    setTimeout(function(){
        $('#msg').hide();
    },2000);
});
socket.on('disconnect', function(){
    var li = jQuery(`<div class="container-fluid btn btn-danger"></div>`);
    li.text('Disconnected to server');
    jQuery('#msg').append(li);
    // setTimeout(function(){
    //     $('#msg').hide();
    // },5000);
    console.log('Disconnect');
});
socket.on('code_output', function(msg){
    if(typeof msg == 'string'){
        jQuery('#code-area').text(msg);
    }else{
        jQuery('#code-area').text(JSON.stringify(msg));
    }
})
// function design(){
//     console.log('work');
        
//         var li = jQuery(`<div class="container-fluid btn btn-danger"></div>`);
//         li.text('Please Select Langauge first');
//         jQuery('#lang').append(li);
//         $('#lang').show();
//         setTimeout(function(){
//             $('#lang').hide();
//             jQuery('#lang').remove();
//         },2000);
        
        
// }
jQuery('#codes-form').on('submit', function(err){
    err.preventDefault();
    if(jQuery('[name=langauge]').val()=='NULL'){
        alert('Select language first')
    }else{
        socket.emit('execute_code',{
            language: jQuery('[name=langauge]').val(),
            code: jQuery('[name=code]').val()
        }, function(){
        })
    }
    
})