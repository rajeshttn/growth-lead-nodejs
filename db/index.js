const mongoose = require('mongoose');

module.exports.connect = async () => {
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/leads', mongooseOpts);
    } catch (error) {
        console.log("Error occurred while connection to db", error)
    }
}
