
const TicketControl = require('../models/ticket-control')

const ticketControl = new TicketControl() 



 
const socketController = (socket) => {
    
    console.log('Cliente conectado', socket.id );


    socket.emit('last-ticket', ticketControl.lastOne)
    socket.emit('actualState', ticketControl.lastFour)
    socket.emit('ticketsCola', ticketControl.tickets.length )


    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });


     



    socket.on('new-ticket', ( payload, callback ) => {
        
     const next = ticketControl.next()
     socket.broadcast.emit('ticketsCola', ticketControl.tickets.length )
     callback(next)
       
    })

    socket.on('attend-ticket', ({desktop},callback) =>{

        if (!desktop){

            return callback({ 
                ok: false,
                msg: 'desktop is required'
            })
        }

        const ticket = ticketControl.serveTicket(desktop)
        socket.broadcast.emit('actualState',ticketControl.lastFour)
        socket.broadcast.emit('ticketsCola', ticketControl.tickets.length )


    if (!ticket){

        callback({
            ok:false,
            msg: 'any ticket'
        })
    }else{
        
        callback({

            ok:true,
            pendientes: ticketControl.tickets.length,
            ticket
        })
    }
    })

}



module.exports = {
    socketController
}

