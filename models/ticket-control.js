const path = require('path')
const fs = require('fs')



class Ticket{

    constructor(number, desktop){

        this.number = number
        this.desktop = desktop
    }



}

class TicketControl{

    constructor(){
        this.lastOne = 0
        this.today = new Date().getDate()
        this.tickets = []
        this.lastFour = []

        this.init()

    }

    get toJson(){

        return {

            lastOne : this.lastOne,
            today : this.today,
            tickets: this.tickets,
            lastFour : this.lastFour
        }
    }

    init(){

        const {  today, lastFour, lastOne , tickets} = require('../db/data.json')
        if( today === this.today){
            this.tickets = tickets
            this.lastOne = lastOne
            this.lastFour = lastFour
            
        } else{
            //another day
            this.saveDB()
        }
    }

    saveDB(){

        const dbPath = path.join(__dirname, '../db/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson) )
    }

    next(){
        this.lastOne +=1
        const ticket = new Ticket(this.lastOne, null)
        this.tickets.push(ticket)

        this.saveDB()
        return 'Ticket' + ticket.number

    }

    serveTicket(desktop){

        if(this.tickets.length === 0){

            return null
        }

        const ticket = this.tickets.shift()
        ticket.desktop = desktop

        this.lastFour.unshift(ticket)
        if (this.lastFour.length > 3 ){

          this.lastFour.splice(4)
        }

        this.saveDB()
        return ticket
    }



    
}

module.exports = TicketControl 