const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
        // useUnifiedTopology: true, 
        // useNewUrlParser: true, 
        // useCreateIndex: true
});

const db =  mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected")
}); 

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0;i<200;i++)
    {
        const random1000 =  Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            //Your User ID
            author: '654a7c10965b9a82cbd5bb0d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam',
            price,
            geometry:  { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzaks5yl1/image/upload/v1699899653/YelpCamp/l2c4ewgrxygevderbl0s.jpg',
                    filename: 'YelpCamp/l2c4ewgrxygevderbl0s',
                },
                {
                    url: 'https://res.cloudinary.com/dzaks5yl1/image/upload/v1699899656/YelpCamp/gt2ystanydylkguvmbaq.jpg',
                    filename: 'YelpCamp/gt2ystanydylkguvmbaq',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});