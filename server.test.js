const request = require('supertest');
const server = require('./server');

describe('server', () => {

  describe('GET /api/dogs', () => {

    it('should return status code of 200', async () => {

      const response = await request(server).get('/api/dogs');

      expect(response.status).toEqual(200);

    });

    it('should return an array of data', () => {

      const response = await request(server).get('/api/dogs');

      expect(Array.isArray(response.data)).toEqual(true);

    });

  });

});
