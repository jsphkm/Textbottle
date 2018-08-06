const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const {Accounts} = require('./models');

router.get('/:id', (req, res) => {
	Accounts
		.findById(req.params.id)
		.then(post => res.json(post.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'Internal server error'});
		})
})

router.post('/', (req, res) => {
	const requiredFields = ['firstname', 'lastname', 'email', 'password'];
	const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
	}
	
	const stringFields = ['firstName', 'lastName', 'email', 'password'];
	const nonStringField = stringFields.find(field => 
		field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
	}
	
	const explicityTrimmedFields = ['email', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
	}
	
	const sizedFields = {
    firstname: {
      min: 1
		},
		lastname: {
			min: 1
		},
    password: {
      min: 8,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
	);
	
	if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
	}
	
	let {email, password, firstname = '', lastname = ''} = req.body;
  firstname = firstname.trim();
	lastname = lastname.trim();
	
	return Accounts.find({email})
    .count()
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Email already taken',
          location: 'email'
        });
      }
      return Accounts.hashPassword(password);
    })
    .then(hash => {
      return Accounts.create({
				firstname,
				lastname,
				email,
        password: hash
      });
    })
    .then(account => {
      return res.status(201).json(account.serialize());
    })
    .catch(err => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

// Never expose all your users like below in a prod application
// we're just doing this so we have a quick way to see
// if we're creating users. keep in mind, you can also
// verify this in the Mongo shell.
router.get('/', (req, res) => {
  return Accounts.find()
    .then(accounts => res.json(accounts.map(account => account.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.delete('/:id', (req, res) => {
	Accounts
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).json({message: 'success'});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'Internal Server Error'});
		});
});

router.put('/:id', (req, res) => {
	if (!(req.params.id && req.body.id && req.params.id === req.body.id)){
		res.status(400).json({
			error: 'Request path id and request body id values must match'
		});
	}

	const updated = {};
	const updateableFields = ['firstname', 'lastname', 'email', 'password'];
	updateableFields.forEach(field => {
		if (field in req.body) {
			updated[field] = req.body[field];
		}
	});

	Accounts
		.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
		.then(updatedAccount => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal Server Error'}));
});

module.exports = {router};