import api from '../services/api.service';

const state = {
    countries: {},
    cities: {},
    airlines: {},
};

const getters = {
    getAutocompleteList() {
        // { 'Харьков, Украина': null, 'Киев, Украина': null, ... }
    }
};

const actions = {
    async init() {
        const [countries, cities, airlines] = await Promise.all([
            api.getCountries(),
            api.getCities(),
            api.getAirlines()
        ]);
        state.countries = countries;
        state.cities = cities;
        state.airlines = airlines;
    }
};

export default {
    state, getters, actions
}