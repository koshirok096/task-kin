import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    email: String,
    password: String,
    group: [],
    userInformation: {
        avatar: String,
        bio: String,
    }
});

const User = mongoose.model('User', userSchema);
export default User;