const editSectionBtnEl = document.getElementById('edit-section-btn')
const editSectionModalEl = document.getElementById('edit-section-modal')
const closeModalBtnEl = document.getElementById('close-section-modal')


editSectionBtnEl.addEventListener('click', showModal)
//Hide modal if it's closed OR if the teacher adds a section
closeModalBtnEl.addEventListener('click', hideModal)

function showModal(){
  editSectionModalEl.style.display = 'block'
}

function hideModal(){
  editSectionModalEl.style.display = 'none'
}
