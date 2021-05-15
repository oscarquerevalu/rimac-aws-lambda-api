const { expect } = require('@jest/globals');
const datamanager = require('../datamanager/datamanager')

it('insertar personaje starwars', async () => {
    await datamanager.docClient
      .put({TableName: 'starwars', Item: {id: '1', nombre: 'Luke Skywalker'}})
      .promise();
  
    const {Item} = await datamanager.docClient.get({TableName: 'starwars', Key: {id: '1'}}).promise();
    
    expect(Item).toEqual({
      id: '1',
      nombre: 'Luke Skywalker',
    });
  });
