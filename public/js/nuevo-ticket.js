const lblNewTicket = document.querySelector('#lblNewTicket')
const btnMade = document.querySelector('button')


const socket = io();



socket.on('connect', () => {
       btnMade.disabled = false

});

socket.on('disconnect', () => {
     btnMade.disabled = true
});

socket.on('last-ticket',(payload)=>{

    lblNewTicket.innerHTML = payload
})



btnMade.addEventListener( 'click', () => {

   
    socket.emit( 'new-ticket', null, ( ticket ) => {
       lblNewTicket.innerHTML = ticket
    });

});

console.log('Nuevo Ticket HTML');