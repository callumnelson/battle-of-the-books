const newSearchBtnEl = document.getElementById('new-search-btn')
const newSearchModalEl = document.getElementById('new-search-modal')
const closeModalBtnEl = document.getElementById('close-search-modal')


newSearchBtnEl.addEventListener('click', showModal)
//Hide modal if it's closed OR if the teacher adds a Search
closeModalBtnEl.addEventListener('click', hideModal)

function showModal(){
  newSearchModalEl.style.display = 'block'
}

function hideModal(){
  newSearchModalEl.style.display = 'none'
}
