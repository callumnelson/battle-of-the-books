const newTicketBtnEl = document.getElementById('new-ticket-btn')
const newTicketModalEl = document.getElementById('new-ticket-modal')
const closeModalBtnEl = document.getElementById('close-ticket-modal')
const formTypeEl = document.getElementById('ticket-type-input')
const apiFormEl = document.getElementById('api-form-wrapper')
const manualFormEl = document.getElementById('manual-form-wrapper')

newTicketBtnEl.addEventListener('click', showModal)
//Hide modal if it's closed OR if the teacher adds a Search
closeModalBtnEl.addEventListener('click', hideModal)

formTypeEl.addEventListener('change', showForm)
showForm()

function showModal(){
  newTicketModalEl.style.display = 'block'
}

function hideModal(){
  newTicketModalEl.style.display = 'none'
}

function showForm(){
  if(formTypeEl.value){
    if(formTypeEl.value === 'api-form'){
      apiFormEl.style.display = 'block'
      manualFormEl.style.display = 'none'
    }else if (formTypeEl.value === 'manual-form') {
      manualFormEl.style.display ='block'
      apiFormEl.style.display = 'none'
    }
  } else {
    apiFormEl.style.display = 'none'
    manualFormEl.style.display = 'none'
  }
}
