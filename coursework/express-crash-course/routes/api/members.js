const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const { body, validationResult } = require('express-validator');
const members = require('../../Members');

// Get all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if (found) {
		res.json(members.filter(member => member.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
});

// Create member
router.post(
	'/', 
	body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const newMember = {
			id: uuid.v4(),
			name: req.body.name,
			email: req.body.email,
			status: 'active'
		}

		members.push(newMember);
res.json(members);
});

// Update member
router.put('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if (found) {
		const updateMember = req.body;
		members.forEach(member => {
			if (member.id === parseInt(req.params.id)) {
				member.name = updateMember.name ? updateMember.name : member.name;
				member.email = updateMember.email ? updateMember.email : member.email;

				res.json({ mesg: 'Member updated', member });
			}
		});
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
});

// Delete member
router.delete('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if (found) {
		res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
});

module.exports = router;