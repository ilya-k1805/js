import api from '../services/api.service';

const state = {
    countries: {},
    cities: {},
    airlines: {},
    countryNames: {},
    autoCompliteList: {},
};

const getters = {
    getAutocompleteList() {
        return state.autoCompliteList;
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

        prepateAutocompleteList();
    }
};

function prepateAutocompleteList() {
    prepareCountryNames();

    state.cities.forEach(function (city) {
        let cityName = city.name ? city.name : city.name_translations.en;
        let key = `${ cityName }, ${ state.countryNames[city.country_code] }`;

        state.autoCompliteList[key] = null;
    });
}

function prepareCountryNames() {
    state.countries.forEach(function (country) {
        let countryName = country.name ? country.name : country.name_translations.en;
        state.countryNames[country.code] = countryName;
    })
}

export default {
    state, getters, actions
}
