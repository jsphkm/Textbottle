require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
app.use(express.json());
app.use(morgan('common'));
app.use(express.static('public'));

mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');

const {router: accountsRouter} = require('./accounts');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/accounts', accountsRouter);
app.use('/api/auth', authRouter);


const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use('*', function(req, res){
	res.status(404).json({message: 'Not Found'});
})


let server;

function runServer(databaseUrl, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, {useNewUrlParser: true}, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`App listening on port ${port}`);
				resolve();
			})
				.on('error', err => {
					mongoose.disconnect();
					reject(err);
				});
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

if (require.main === module) {
	runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {runServer, app, closeServer};