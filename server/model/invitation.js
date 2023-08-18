import mongoose from "mongoose";

const invitation = new mongoose.Schema({
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    invitingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    invitedUser: String,
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

const Invitation = mongoose.model('Invitation', invitation);
export default Invitation;