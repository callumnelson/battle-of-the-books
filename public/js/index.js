
try {
  const newDistrictEl = document.getElementById('new-district-container')
  const newSchoolEl = document.getElementById('new-school-container')
  const districtSelectEl = document.getElementById('district-input')
  const schoolSelectEl = document.getElementById('school-input')
  
  districtSelectEl.addEventListener('change', function(evt){
    if (evt.target.value === 'Add New District') {
      newDistrictEl.style.display = 'block'
    } else {
      newDistrictEl.style.display = 'none'
    }
  })
  schoolSelectEl.addEventListener('change', function(evt){
    if (evt.target.value === 'Add New School') {
      newSchoolEl.style.display = 'block'
    } else {
      newSchoolEl.style.display = 'none'
    }
  })
} catch (err) {
  //Conditional rendering things
}

