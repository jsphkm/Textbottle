const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const expect = chai.expect;
chai.use(chaiHttp);

const {Users} = require('../users/models');
const {app, runServer, closeServer} = require('../server');
const {JWT_SECRET, TEST_DATABASE_URL} = require('../config');

function seedUserData(firstnamefaker, lastnamefaker, emailfaker, passwordfaker) {
  return Users.hashPassword(passwordfaker)
  .then(hash => {
    return Users.create({
      firstname: firstnamefaker,
      lastname: lastnamefaker,
      email: emailfaker,
      password: hash
    });
  })
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('/api/users', function() {
  const emailfaker = faker.internet.email();
  const passwordfaker = faker.internet.password();
  const firstnamefaker = faker.name.firstName();
  const lastnamefaker = faker.name.lastName();

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedUserData(firstnamefaker, lastnamefaker, emailfaker, passwordfaker);
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('/api/users', function() {
    describe('POST', function() {
      it('should reject user with missing fields', function() {
        return chai.request(app)
          .post('/api/users')
          .send({
            firstname: firstnamefaker,
            lastname: lastnamefaker,
            email: emailfaker
          })
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
            expect(res.body.location).to.equal('password');
          })
      });
      it('should reject non-string fields', function() {
        return chai.request(app)
          .post('/api/users')
          .send({
            firstname: firstnamefaker,
            lastname: lastnamefaker,
            email: {},
            password: passwordfaker
          })
          .then(res => {
            expect(res).to.to.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Incorrect field type: expected string');
            expect(res.body.location).to.equal('email');
          })
      });
      it('should reject white-space starting & ending fields', function() {
        return chai.request(app)
        .post('/api/users')
        .send({
          firstname: firstnamefaker,
          lastname: lastnamefaker,
          email: emailfaker,
          password: `    ${faker.internet.password()}   `
        })
        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal('Cannot start or end with whitespace');
          expect(res.body.location).to.equal('password');
        });
      });
      it('should reject fields with less than required characters', function() {
        return chai.request(app)
        .post('/api/users')
        .send({
          firstname: firstnamefaker,
          lastname: lastnamefaker,
          email: emailfaker,
          password: faker.internet.password(3)
        })
        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal('Must be at least 8 characters long')
          expect(res.body.location).to.equal('password');
        })
      })
      it('should reject duplicate email', function() {
          return chai.request(app)
          .post('/api/users')
          .send({
            firstname: firstnamefaker,
            lastname: lastnamefaker,
            email: emailfaker,
            password: passwordfaker
          })
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Email is already taken');
            expect(res.body.location).to.equal('email');
          })
      });
      it('should create a new user', function() {
        const newemail = faker.internet.email();
        const newpassword = faker.internet.password();
        const newfirstname = faker.name.firstName();
        const newlastname = faker.name.lastName();
        return chai
        .request(app)
        .post('/api/users')
        .send({
          firstname: newfirstname,
          lastname: newlastname,
          email: newemail,
          password: newpassword
        })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          // expect(res.body).to.have.keys(
          //   'firstname',
          //   'lastname',
          //   'email',
          //   'password',
          //   'id'
          // );
          // expect(res.body.firstname).to.equal(newfirstname);
          // expect(res.body.lastname).to.equal(newlastname);
          // expect(res.body.email).to.equal(newemail);
          return Users.findOne({
            email: newemail
          });
        })
        .then(user => {
          expect(user).to.not.be.null;
          expect(user.firstname).to.equal(newfirstname);
          expect(user.lastname).to.equal(newlastname);
          return user.validatePassword(newpassword);
        })
        .then(res => {
          expect(res).to.be.true;
        })
      })
    })

    describe('GET', function() {})
  })
})