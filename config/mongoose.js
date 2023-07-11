const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    console.log("mongoose has connected");
    
  await mongoose.connect(`${process.env.MONGO_URL}`);
}