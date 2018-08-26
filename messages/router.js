const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const {Messages} = require('./models');
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });


router.get('/', jwtAuth, (req, res) => {
  if (req.user){
    Messages
    .find({user_id: req.user.id})
    .sort({updatedDate: 'desc'})
		.then(messages => {
      res.json(messages.map(message => {
        return {
          id: message._id,
          createdDate: message.createdDate,
          updatedDate: message.updatedDate,
          title: message.title,
          subtitle: message.subtitle,
          fullcontent: message.fullcontent
        };
      }))
    })
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'Internal server error'});
    })
  }
  else {
    res.status(403);
  }
})

router.post('/', jwtAuth, (req, res) => {
  let {fullcontent, title, subtitle} = req.body;
	if (req.user){
    let user_id = req.user.id;
    Messages
    .create(
      {
        user_id,
        title,
        subtitle,
        fullcontent
      }
    )
    .then(message => {
      return res.status(201).json(message.serialize());
      }
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Internal server error'});
    })
  }
  else {
    res.status(403);
  }
});

router.put('/', jwtAuth, (req, res) => {
  let {currentmessageId, fullcontent, title, subtitle} = req.body;
  let updated = {fullcontent: fullcontent, title: title, subtitle: subtitle};
	if (req.user){
    Messages
		.findByIdAndUpdate(currentmessageId, {$set: updated}, {new: true})
		.then(updatedMessage => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal Server Error'}));
  }
});

router.delete('/', jwtAuth, (req, res) => {
  if (req.user) {
    Messages
		.findByIdAndRemove(req.body.currentmessageId)
		.then(() => {
			res.status(204).json({message: 'success'});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'Internal Server Error'});
		});
  }
});

module.exports = {router};