import mongoose from 'mongoose'
import crypto from 'crypto'

const EmployerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Company name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  company: {
    type: String,
    required: 'Company field is required',
  },
  role: {
    type: String,
    default: 'employer',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
  hashed_password: {
    type: String,
    required: 'Password is required',
  },
  salt: String,
})

EmployerSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

EmployerSchema.methods = {
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword(password) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt() {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  },
}

export default mongoose.model('Employer', EmployerSchema)