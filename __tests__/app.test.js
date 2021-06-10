const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('lab-03-separation-of-concerns routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});
