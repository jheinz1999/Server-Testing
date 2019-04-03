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

      expect(response.text).not.toEqual(undefined);

    });

  });

  describe('POST /api/dogs', () => {

    it('should return status code of 201', async () => {

      const response = await request(server).post('/api/dogs').send({ name: 'Poodle' });

      expect(response.status).toEqual(201);

    });

    it('should return the id of the newly created dog', async () => {

      const response = await request(server).post('/api/dogs').send({ name: 'German Shepherd'});

      expect(response.body.id).not.toEqual(null);

    });

    it('should return status code of 500 if duplicate is entered', async () => {

      await request(server).post('/api/dogs').send({name: 'Rad Dog'});
      const response = await request(server).post('/api/dogs').send({name: 'Rad Dog'});;

      expect(response.status).toEqual(500);

    });

    it('should return status code of 400 if no name is provided', async () => {

      const response = await request(server).post('/api/dogs', {dog: 'A cool dog'});

      expect(response.status).toEqual(400);

    });

  });

  describe('DELETE /api/dogs/id', async () => {

    it('should return status code 200 upon successful deletion', async () => {

      const response = await request(server).delete('/api/dogs/2');

      expect(response.status).toEqual(200);

    });

    it('should return id of deleted dog', async () => {

      const response = await request(server).delete('/api/dogs/1');

      expect(response.body.id).not.toBe(null);

    });

    it('should return status code 404 if dog does not exist', async () => {

      const response = await request(server).delete('/api/dogs/1000');

      expect(response.status).toEqual(404);

    });

  });

});
