const newTicketBtnEl = document.getElementById('new-ticket-btn')
const newTicketModalEl = document.getElementById('new-ticket-modal')
const closeModalBtnEl = document.getElementById('close-ticket-modal')


newTicketBtnEl.addEventListener('click', showModal)
//Hide modal if it's closed OR if the teacher adds a Search
closeModalBtnEl.addEventListener('click', hideModal)

function showModal(){
  newTicketModalEl.style.display = 'block'
}

function hideModal(){
  newTicketModalEl.style.display = 'none'
}
