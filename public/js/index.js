const districtSelectEl = document.getElementById('district-input')
const roleSelectEl = document.getElementById('role-input')
const schoolSelectEl = document.getElementById('school-input')
const teacherSelectEl = document.getElementById('teacher-input')
const sectionSelectEl = document.getElementById('section-input')
const schoolOptionEls = document.querySelectorAll('.school')
const teacherOptionEls = document.querySelectorAll('.teacher')
const sectionOptionEls = document.querySelectorAll('.section')
const teacherInputContEl = document.getElementById('teacher-input-container')
const sectionInputContEl = document.getElementById('section-input-container')

try {
  districtSelectEl.addEventListener('change', updateForDistrict)
  roleSelectEl.addEventListener('change', showStudentFields)
  schoolSelectEl.addEventListener('change', updateForSchool)
  teacherSelectEl.addEventListener('change', updateForTeacher)
  //Run to hide all but district initially
  updateForDistrict()
  updateForSchool()
  updateForTeacher()
} catch (err) {
  //Conditional rendering things
}

function updateForDistrict(){
  let districtId = districtSelectEl.selectedOptions[0].value
  schoolOptionEls.forEach(option => {
    if (!option.classList.contains(districtId)) option.setAttribute('hidden', '')
    else option.removeAttribute('hidden')
  })
  // teacherOptionEls.forEach( option => {
  //   if (!option.classList.contains(districtId)) option.setAttribute('hidden', '')
  //   else option.removeAttribute('hidden')
  // })
}

function updateForSchool(){
  let school = schoolSelectEl.selectedOptions[0].value.toLowerCase().replaceAll(' ', '-')
  teacherOptionEls.forEach( option => {
    if (!option.classList.contains(school)) option.setAttribute('hidden', '')
    else option.removeAttribute('hidden')
  })
}

function updateForTeacher(){
  let teacher = teacherSelectEl.selectedOptions[0].value
  sectionOptionEls.forEach( option => {
    if (!option.classList.contains(teacher)) option.setAttribute('hidden', '')
    else option.removeAttribute('hidden')
  })
}

function showStudentFields(){
  if (+roleSelectEl.selectedOptions[0].value === 100) {
    teacherInputContEl.removeAttribute('hidden')
    sectionInputContEl.removeAttribute('hidden')
    teacherSelectEl.setAttribute('required', '')
    sectionSelectEl.setAttribute('required', '')
  }else {
    teacherInputContEl.setAttribute('hidden', '')
    sectionInputContEl.setAttribute('hidden', '')
    teacherSelectEl.removeAttribute('required')
    sectionSelectEl.removeAttribute('required')
  }
}
