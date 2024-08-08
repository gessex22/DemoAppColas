const searhParams = new URLSearchParams(window.location.search);
const lblDesktop = document.querySelector("h1");
const btnMade = document.querySelector("button");
const lblTickets = document.querySelector("small");
const divAlert = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

if (!searhParams.has("desktop")) {
  //window.location = 'index.html'
  throw new Error("Desktop is required");
}

const desktop = searhParams.get("desktop");
lblDesktop.innerHTML = desktop;
divAlert.style.display = "none";

const socket = io();

socket.on("connect", () => {
  btnMade.disabled = false;
});

socket.on("disconnect", () => {
  btnMade.disabled = true;
});

socket.on("ticketsCola", (numberCola) => {
  lblPendientes.innerText = numberCola;
});

socket.on();

btnMade.addEventListener("click", () => {
  socket.emit("attend-ticket", { desktop }, ({ ok, ticket, pendientes }) => {
    if (!ok) {
      lblTickets.innerText = "anybody";
      return (divAlert.style.display = "");
    }
    lblPendientes.innerHTML = pendientes
    lblTickets.innerText = "Ticket " + ticket.number;
  });
});

console.log("Nuevo deskyop HTML");
