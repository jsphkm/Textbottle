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

function seedLoginData(firstname, lastname, email, password) {
  Users.hashPassword(password)
  .then(hash => {
    return Users.create({
      firstname,
      lastname,
      email,
      password: hash
    });
  })
}

function generateLoginData() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}


describe('Auth endpoints', function() {
  const {email, password} = generateLoginData();
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedLoginData(firstname, lastname, email, password);
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('/api/auth/login', function() {
    it('should reject requests with invalid credentials', function() {
      return chai.request(app)
        .post('/api/auth/login')
        .then(res => {
          expect(res).to.have.status(400);
        })
    });
    it('should reject requests with invalid emails', function() {
      return chai.request(app)
        .post('/api/auth/login')
        .send({email: 'invalidemail', password})
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it('should reject requests with invalid passwords', function() {
      return chai.request(app)
        .post('/api/auth/login')
        .send({email, password: 'invalidpassword'})
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it('should return an auth token', function() {
      return chai.request(app)
        .post('/api/auth/login')
        .send(generateLoginData())
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          const token = res.body.authToken;
          expect(token).to.be.a('string');
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ['HS256']
          });
          console.log(payload.user)
          // expect(payload.user).to.deep.equal({
          //   firstname,
          //   lastname,
          //   email,
            
          // })
        })
    })
  })
})