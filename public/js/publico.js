const lblTicket1 = document.querySelector("#lblTicket1");
const lblEscritorio1 = document.querySelector("#lblEscritorio1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblEscritorio2 = document.querySelector("#lblEscritorio2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblEscritorio3 = document.querySelector("#lblEscritorio3");
const lblTicket4 = document.querySelector("#lblTicket4");
const lblEscritorio4 = document.querySelector("#lblEscritorio4");

const socket = io();

socket.on("actualState", (payload) => {

   const audio = new Audio('../audio/sonido-check.m4a')
   audio.play()

  const [ticket1, ticket2, ticket3, ticket4] = payload;

  if (ticket1) {
    lblTicket1.innerText = ticket1.number;
    lblEscritorio1.innerText = ticket1.desktop;
  }

  if (ticket2) {
    lblTicket2.innerText = ticket2.number;
    lblEscritorio2.innerText = ticket2.desktop;
  }

  if (ticket3) {
    lblTicket3.innerText = ticket3.number;
    lblEscritorio3.innerText = ticket3.desktop;
  }

  if (ticket4) {
    lblTicket4.innerText = ticket4.number;
    lblEscritorio4.innerText = ticket4.desktop;
  }

  console.log(payload);
});
