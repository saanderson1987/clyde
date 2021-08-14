const uuidv4 = require('uuid/v4');
const { ValidationError } = require('./errors')
const rhinoceroses = require('./data');
const { 
  RHINOCEROS: {
    SPECIES_SET,
    VALID_NEW_RHINO_PARAMS_SET,
    VALID_GET_BY_QUERY_PARAMS_SET
  } 
} = require('./constants')

const validateNewRhino = (newRhino) => {
  const { name, species } = newRhino || {};

  if (!name || typeof name !== 'string' || name.length > 20) {
    throw new ValidationError(
      'Invalid "name". "name" must be a string with a length between 1 and 20 characters',
    );
  }

  if (!SPECIES_SET.has(species)) {
    throw new ValidationError(
      `Invalid "species". "species" must be a string in the following set: ${Array.from(SPECIES_SET).join(', ')}`,
    );
  }

  if (Object.keys(newRhino).some((key) => !VALID_NEW_RHINO_PARAMS_SET.has(key))) {
    throw new ValidationError(
      '"name" and "species" are the only valid properties for a new rhinoceros.',
    );
  }

  return true;
};

const validateGetByQueryParams = (query) => {
  if (Object.keys(query).some((key) => !VALID_GET_BY_QUERY_PARAMS_SET.has(key))) {
    throw new ValidationError(
      '"name" and "species" are the only valid query parameters.',
    );
  }
  return true;
}

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