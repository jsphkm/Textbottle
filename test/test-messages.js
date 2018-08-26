const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const expect = chai.expect;
chai.use(chaiHttp);

const {Messages} = require('../messages/models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

function seedMessagesData() {
  console.info('seeding accounts data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateAccountsData());
  }
  return Messages.insertMany(seedData);
}

function generateMessagesData() {
  return {
    title: faker.lorem.sentence(),
    subtitle: faker.lorem.sentence(),
    fullcontent: faker.lorem.paragraphs()
  };
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}