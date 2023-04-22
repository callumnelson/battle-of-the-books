import { Profile } from '../models/profile.js'

const show = async (req, res) => {
  try {
    const fullProfile = await Profile.findById(req.user.profile._id)
    .populate('district')
    res.render('profile/show', { 
      title: req.user.profile.name,
      profile: fullProfile
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const edit = async (req, res) => {
  try {
    res.render('profile/edit', {
      title: req.user.profile.name
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const update = async (req, res) => {
  try {
    req.body.isSignedUp = true
    const profile = await Profile.findByIdAndUpdate(req.user.profile._id, {
      $set: req.body
    }, {new: true})
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

export {
  show,
  edit,
  update
}