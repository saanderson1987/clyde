const uuidv4 = require('uuid/v4');
const rhinoceroses = require('./data');

const Rhinoceros = {
  create: data => {
    const newRhino = {
      id: uuidv4(),
      name: data.name,
      species: data.species,
    };
    rhinoceroses.push(newRhino);
    return newRhino;
  },

  getAll: () => rhinoceroses,

  getById: (_id) => rhinoceroses.find(({id}) => id === _id),
};

module.exports = Rhinoceros;