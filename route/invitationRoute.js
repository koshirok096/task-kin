import express from 'express';
const router = express.Router();
import User from '../model/user.js';
import Group from '../model/group.js';
import Invitation from '../model/invitation.js';

router.post('/groups/:groupId/invite', async (req, res) => {
  const invitation = new Invitation({
    group: req.params.groupId,
    invitingUser: req.body.id,
    invitedUser: req.body.invitedUserId,
    status: 'pending'
  });
  await invitation.save();
  res.status(200).send('Invitation sent');
});

router.post('/invitations/:invitationId/accept', async (req, res) => {
  const invitation = await Invitation.findById(req.params.invitationId).populate('group');
  // if (invitation.group.members.includes(req.query.id)) {
  //   return res.status(400).send('User is already a member of the group');
  // }

  invitation.status = 'accepted';
  await invitation.save();

  const group = await Group.findById(invitation.group._id);
  group.members.push(req.query.id);
  await group.save();

  res.status(200).send('Invitation accepted');
});

router.post('/invitations/:invitationId/reject', async (req, res) => {
  const invitation = await Invitation.findById(req.params.invitationId);
  invitation.status = 'rejected';
  await invitation.save();
  res.status(200).send('Invitation rejected');
});

router.get('/invitations', async (req, res) => {
  const invitations = await Invitation.find({ invitedUser: req.query.id, status: 'pending' }).populate('group');
  res.json(invitations);
});

// module.exports = router;
export default router;

