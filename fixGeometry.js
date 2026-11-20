require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocoder = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  const listings = await Listing.find({});

  for (const l of listings) {
    if (
      l.geometry &&
      l.geometry.coordinates &&
      l.geometry.coordinates.length === 2
    ) {
      continue;
    }
    const res = await geocoder
      .forwardGeocode({ query: `${l.location}, ${l.country}`, limit: 1 })
      .send();

    if (res.body.features.length) {
      l.geometry = res.body.features[0].geometry;
      await l.save();
      console.log("fixed:", l.title);
    } else {
      console.log("no result for:", l.title);
    }
  }
  mongoose.connection.close();
}
run();
