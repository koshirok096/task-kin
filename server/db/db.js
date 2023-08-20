import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// dotenv is used to hide the connection URL
mongoose.Promise = global.Promise;

// process.env.MONGO comes from .env file
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to MongoDB using async/await
(async () => {
    try {
        await mongoose.connect(process.env.MONGO, connectionOptions);
        console.log('MongoDB Connection Succeeded.');
    } catch (error) {
        console.error('Error in DB connection:', error);
    }
})();

export default mongoose.connection;
