const newSectionBtnEl = document.getElementById('new-section-btn')
const newSectionModalEl = document.getElementById('new-section-modal')
const closeModalBtnEl = document.getElementById('close-section-modal')


newSectionBtnEl.addEventListener('click', showModal)
//Hide modal if it's closed OR if the teacher adds a section
closeModalBtnEl.addEventListener('click', hideModal)

function showModal(){
  newSectionModalEl.style.display = 'block'
}

function hideModal(){
  newSectionModalEl.style.display = 'none'
}
