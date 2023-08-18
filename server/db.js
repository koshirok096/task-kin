import mongoose from "mongoose";

const connectDb = () => {
    try {
        mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;