export const STATE_ROW_STATISTICS = [
    'confirmed',
    'active',
    'recovered',
    'deaths',
];
export const DISTRICT_ROW_STATISTICS = [
    'confirmed',
    'active',
    'recovered',
    'deceased',
];

export const MAP_TYPES = {
    COUNTRY: 'country',
    STATE: 'state',
};

export const MAP_STATISTICS = {
    TOTAL: 0,
    PER_MILLION: 1,
};

export const MAPS_DIR = '/maps';

export const MAP_META={
    Karnataka: {
        name: 'Karnataka',
        geoDataFile: `${MAPS_DIR}/karnataka.json`,
        mapType: MAP_TYPES.STATE,
        graphObjectName: 'karnataka_district',
    },
};

export const STATE_CODES = {

    KA: 'Karnataka',

};

const stateCodes = [];
const reverseStateCodes = {};
Object.keys(STATE_CODES).map((key, index) => {
    reverseStateCodes[STATE_CODES[key]] = key;
    stateCodes.push({code: key, name: STATE_CODES[key]});
    return null;
});
export const STATE_CODES_REVERSE = reverseStateCodes;
export const STATE_CODES_ARRAY = stateCodes;


export const STATE_POPULATIONS = {

    Karnataka: 65798000,

};



export const DISTRICTS_ARRAY=[
    {
        district: 'Bagalkote',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Ballari',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Belagavi',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Bengaluru',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Bengaluru Rural',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Bidar',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Chamarajanagara',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Chikkaballapura',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Chikkamagaluru',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Chitradurga',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Dakshina Kannada',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Davanagere',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Dharwad',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Gadag',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Hassan',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Haveri',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Kalaburagi',
        othernamesspellings: 'Gulbarga',
        state: 'Karnataka',
    },
    {
        district: 'Kodagu',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Kolar',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Koppal',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Mandya',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Mysuru',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Raichur',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Ramanagara',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Shivamogga',
        othernamesspellings: 'Shimoga',
        state: 'Karnataka',
    },
    {
        district: 'Tumakuru',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Udupi',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Uttara Kannada',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Vijayapura',
        othernamesspellings: '',
        state: 'Karnataka',
    },
    {
        district: 'Yadgir',
        othernamesspellings: '',
        state: 'Karnataka',
    },
];




