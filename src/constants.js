module.exports = {
    RHINOCEROS: {
        SPECIES_SET: new Set([
            'black_rhinoceros',
            'indian_rhinoceros',
            'javan_rhinoceros',
            'sumatran_rhinoceros',
            'white_rhinoceros' 
          ]),
        VALID_GET_BY_QUERY_PARAMS_SET: new Set(['name', 'species']),
        VALID_NEW_RHINO_PARAMS_SET : new Set(['name', 'species']),
    }
}