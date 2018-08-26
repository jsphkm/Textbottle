const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const faker = require('faker');
const mongoose = require('mongoose');
const expect = chai.expect;
chai.use(chaiHttp);

const {Users} = require('../users/models');
const {app, runServer, closeServer} = require('../server');
const {JWT_SECRET, TEST_DATABASE_URL} = require('../config');

describe('/api/users', function() {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
  });

  afterEach(function() {
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
            firstname,
            lastname,
            email
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
            firstname,
            lastname,
            email: faker.random.objectElement(),
            password
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
          firstname,
          lastname,
          email,
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
          firstname,
          lastname,
          email,
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
        return Users.create({
          firstname,
          lastname,
          email,
          password
        })
        .then(() => {
          chai.request(app).post('/api/users').send({
            firstname,
            lastname,
            email,
            password
          })
        })
        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal('Email is already taken');
          expect(res.body.location).to.equal('email');
        })
      });
      it('should create a new user', function() {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            firstname,
            lastname,
            email,
            password
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys(
              'firstname',
              'lastname',
              'email',
              'password'
            );
            expect(res.body.firstname).to.equal(firstname);
            expect(res.body.lastname).to.equal(lastname);
            expect(res.body.email).to.equal(email);
            return Users.findOne({
              email
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.firstname).to.equal(firstname);
            expect(user.lastname).to.equal(lastname);
            return user.validatePassword(password);
          })
          .then(res => {
            expect(res).to.be.true;
          })
      })
    })

    describe('GET', function() {})
  })
})