const request = require('supertest');
const server = require('./server');

describe('server', () => {

  describe('GET /api/dogs', () => {

    it('should return status code of 200', async () => {

      const response = await request(server).get('/api/dogs');

      expect(response.status).toEqual(200);

    });

    it('should return an array of data', async () => {

      const response = await request(server).get('/api/dogs');

      expect(Array.isArray(response.data)).toEqual(true);

    });

  });

  describe('POST /api/dogs', () => {

    it('should return status code of 201', async () => {

      const response = await request(server).post('/api/dogs', { name: 'Poodle' });

      expect(response.status).toEqual(201);

    });

    it('should return the id of the newly created dog', async () => {

      const response = await request(server).post('/api/dogs', { name: 'German Shepherd'});

      expect(response.data.id).not.toEqual(null);

    });

  });

});
