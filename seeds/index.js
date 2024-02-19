const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const imageLink = require('../camping-photos');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const authors = ['65cb83e3702c1585f3109f2a', '65cb934136ed94e465a694a7', '65cb97114a4f571b0b5e3180', '65ce1b05a1441853214b3844', '65cb968c8badaf4261293cd2'];
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const linkIndex = Math.floor(Math.random() * 15);
        const authorIndex = Math.floor(Math.random() * 5);
        // console.log(imageLink[linkIndex].urls.regular);
        const link = imageLink[linkIndex].url;
        const fileName = imageLink[linkIndex].filename;
        console.log(link);
        console.log(fileName);
        const camp = new Campground({
            author: authors[authorIndex],
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue massa in nisi tempus venenatis. Pellentesque rhoncus lectus nec sem pulvinar, non auctor nunc vestibulum. Nunc at eleifend tortor. Donec maximus diam quis purus gravida, id facilisis erat pulvinar. Donec consectetur blandit est.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: `${link}`,
                    filename: `${fileName}`
                }
            ],
        });
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})