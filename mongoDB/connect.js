const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log('Connected to MongoDB');
	}
	catch(error) {
		console.error('Mongoose connection error:', error);
        process.exit(0)
	}
};

module.exports = connectDB