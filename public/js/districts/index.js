const newDistrictBtnEl = document.getElementById('new-district-btn')
const newDistrictModalEl = document.getElementById('new-district-modal')
const closeModalBtnEl = document.getElementById('close-district-modal')

newDistrictBtnEl.addEventListener('click', showModal)
//Hide modal if it's closed OR if the teacher adds a section
closeModalBtnEl.addEventListener('click', hideModal)

function showModal(){
  console.log('Click!')
  newDistrictModalEl.style.display = 'block'
}

function hideModal(){
  newDistrictModalEl.style.display = 'none'
}
