const uuidv4 = require('uuid/v4');
const rhinoceroses = require('./data');
const {  
  validateGetByQueryParams,
  validateNewRhino,
} = require('./validations');

const Rhinoceros = {
  create: data => {
    validateNewRhino(data);
    const newRhino = {
      id: uuidv4(),
      name: data.name,
      species: data.species,
    };
    rhinoceroses.push(newRhino);
    return newRhino;
  },

  getAll: () => rhinoceroses,

  getEndangered: () => {
    const numRhinosBySpecies = rhinoceroses.reduce((acc, { species }) => {
      if (!acc[species]) {
        acc[species] = 0;
      }
      acc[species] += 1;
      return acc;
    }, {});

    const endangeredSpeciesSet = Object
      .entries(numRhinosBySpecies)
      .filter(([species, numRhinos]) => numRhinos < 3)
      .reduce((acc, [species]) => acc.add(species), new Set());
    
    return rhinoceroses.filter(({species}) => endangeredSpeciesSet.has(species));
  },

  getById: (_id) => rhinoceroses.find(({id}) => id === _id),

  getByQuery: (query) => {
    validateGetByQueryParams(query);
    const queryKeysAndValue = Object.entries(query || {});
    return rhinoceroses.filter((rhino) => queryKeysAndValue.every(
      ([key, value]) => rhino[key] === value)
    );
  },
};

module.exports = Rhinoceros;