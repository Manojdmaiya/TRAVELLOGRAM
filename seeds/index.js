const cities = require('./cities')
const mongoose = require('mongoose')
const { places, descriptors } = require('./seedHelpers')

const campground = require('../models/campground')

mongoose
  .connect('mongodb://localhost:27017/TRAVELLOGRAM')
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Connection error:', error))

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await campground.deleteMany({})
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 200)
    const price = Math.floor(Math.random() * 20) + 10
    const tr = new campground({
      author: '6617f16cfcf44bb50e0dd6f0',
      location: `${cities[random].City}, ${cities[random].State}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/djicn6izz/image/upload/v1713451285/TRAVELLOGRAM/xggudwsbgnaap2ermwzc.jpg',
          filename: 'TRAVELLOGRAM/xggudwsbgnaap2ermwzc',
        },
      ],
    })
    await tr.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
