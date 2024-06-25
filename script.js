let currentTicket = [];

let tickets = [];

let ticketId = 0;

let winnerNumbers = [];

function newNumber() {
  while(true) {
  let newNumber = Math.floor(Math.random()*39 + 1);
  if(!winnerNumbers.includes(newNumber)) {
    winnerNumbers.push(newNumber);
    document.getElementById("winner").innerHTML += " " + newNumber;
    break;
  }
}
showStat();
}

function showStat() {
  let data = new Array(8).fill(0);
  for(ticket of tickets) {
    let howManyWinners = 0;
    for(number of winnerNumbers) {
      if(ticket.combination.includes(number)) {
        howManyWinners++;
      }
    }
    data[howManyWinners]++;
    if(howManyWinners == 7) {
      alert("The Winner ticket is from: " + ticket.place);
    }
  }
  let statistic = document.getElementById("statistics");
  statistic.innerHTML = "";
  for(let i=7; i>=1; i--) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = i;
    tr.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = data[i];
    tr.appendChild(td);
    statistic.appendChild(tr);
  }

}

function newTicket() {
  for(elem of document.getElementsByClassName("num")){
    elem.classList.remove("chosen");
  };
  currentTicket = [];
  document.getElementById("place").value = "";
};

function chosenNumbers(elem) {
  let number = parseInt(elem.innerHTML);
  if(currentTicket.includes(number)) {
    currentTicket.splice(currentTicket.indexOf(number), 1);
    elem.classList.remove("chosen");
  } else {
    currentTicket.push(number);
    elem.classList.add("chosen");
  }
};

function addTicketInTable(ticket) {
  let tbody = document.getElementById("tickets");
  let tr = document.createElement("tr");
  for(property in ticket) {
    let td = document.createElement("td");
    td.innerHTML = ticket[property];
    tr.appendChild(td);
  }
  
  tbody.appendChild(tr);
}

function submitTicket() {
  let place = document.getElementById("place").value;
  let time = new Date().toLocaleTimeString("en-US", {hour12:false});

  let ticket = {
    id: ++ticketId,
    combination: currentTicket,
    place: place,
    time: time,
  };
  tickets.push(ticket);
  newTicket();
  addTicketInTable(ticket);
}

function insertFields() {
  let ticket = document.getElementById("ticket");
  ticket.innerHTML = "";
  for(let i=1; i<=39; i++) {
    let btn = document.createElement("button");
    btn.className = "btn col-4 btn-outline-danger num";
    btn.innerHTML = i;
    btn.onclick = function(arg) {
      chosenNumbers(arg.target);
    };
    ticket.appendChild(btn);
  }
  
  let place = document.createElement("input");
  place.type = "text";
  place.id = "place";
  place.className = "form-control mt-2";
  place.placeholder = "Place..."
  ticket.appendChild(place);
  
  let submit = document.createElement("button");
  submit.className = "btn btn-success mt-2";
  submit.innerHTML = "Submit";
  submit.onclick = submitTicket;
  ticket.appendChild(submit);
}

