import express from 'express';
const router = express.Router();
import User from '../model/user.js';
import Group from '../model/group.js';
import Invitation from '../model/invitation.js';
import { verifyUser } from '../middleware/verifyUser.js';

router.post('/:groupId', verifyUser, async (req, res) => {
  const { id } = req.user;
  const { email } = req.body;

  const invitation = new Invitation({
    group: req.params.groupId,
    invitingUser: id,
    invitedUser: email,
    status: 'pending'
  });
  await invitation.save();
  res.status(200).send('Invitation sent');
});

router.post('/:invitationId/accept',verifyUser, async (req, res) => {

  // or you can check if status of invitation is pending
  const { invitationId } = req.params;
  const { id } = req.user;
  const invitation = await Invitation.findById(invitationId).populate('group');

  invitation.status = 'accepted';
  await invitation.save();

  // add group id to user group array
  const user = await User.findById(id);
  console.log(user);
  user.group.push(invitation.group._id);

  await user.save();

  const group = await Group.findById(invitation.group._id);
  group.members.push(id);

  await group.save();
  // once the person accept, you should delete invitation
  res.status(200).send('Invitation accepted');
});

router.post('/:invitationId/reject', verifyUser, async (req, res) => {
  const invitation = await Invitation.findById(req.params.invitationId);
  invitation.status = 'rejected';
  await invitation.save();
  res.status(200).send('Invitation rejected');
});
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const invitations = await Invitation.find({ invitedUser: email }).populate('group');
  // const invitations = await Invitation.find({ invitedUser: email });
  res.json(invitations);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Invitation.findByIdAndDelete(id);
  res.status(200).send('Invitation deleted');
});


// module.exports = router;
export default router;

