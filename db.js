const mongoose = require('mongoose');

module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to DB successfully");
    } catch (error) {
        console.error("Error connecting to DB:", error);
        console.log("Connect to DB failed");
    }
};
