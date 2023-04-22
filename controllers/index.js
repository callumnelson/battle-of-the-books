import { District } from '../models/district.js'

const index = async (req, res) => {
  try {
    const districts = await District.find({})
    .populate('schools')
    res.render('index', { 
      title: 'Home',
      districts 
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

export {
  index,
}