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

    it('should return status code of 500 if duplicate is entered', async () => {

      await request(server).post('/api/dogs', {name: 'Rad Dog'});
      const response = await request(server).post('/api/dogs', {name: 'Rad Dog'});

      expect(response.status).toEqual(500);

    });

  });

  describe('DELETE /api/dogs/id', async () => {

    it('should return status code 200 upon successful deletion', async () => {

      const response = await request(server).delete('/api/dogs/1');

      expect(response.status).toEqual(200);

    });

    it('should return id of deleted dog', async () => {

      const response = await request(server).delete('/api/dogs/1');

      expect(response.data.id).not.toBe(null);

    });

    it('should return status code 404 if dog does not exist', async () => {

      const response = await request(server).delete('/api/dogs/1000');

      expect(response.status).toEqual(404);

    });

  });

});
