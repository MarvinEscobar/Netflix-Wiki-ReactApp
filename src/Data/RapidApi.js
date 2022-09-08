const {Result, Endpoints} = require('./RapidApiEntities') ;
const {RapidApi} = require('../Constants/Messages');
const axios = require('axios');

export  function getAllCountries() {
    return fetchData(Endpoints.Countries);
}

export function getAllGenres() {
    return fetchData(Endpoints.Genres);
}

export function searchPeople() {
    return fetchData(Endpoints.SearchPeople);
}

export function searchTitles(params) {
    let endpoint = Endpoints.SearchTitles;
    endpoint.params = params;
    return fetchData(Endpoints.SearchTitles);
}

export function getImagesById(netflix_id) {
    let endpoint = Endpoints.Images;
    endpoint.params = {netflix_id:netflix_id};
    return fetchData(endpoint);
}

export function getDetailsById(netflix_id) {
    let endpoint = Endpoints.Details;
    endpoint.params = {netflix_id:netflix_id};
    return fetchData(Endpoints.Details);
}

async function fetchData(endpoint) {
    try {
        
        return await axios.request(endpoint).then(function (response) {
            return new Result(response.data.results, RapidApi.Succes);
        }).catch(function (error) {
            return new Result(null, error);
        });
    } catch (error) {
        return new Result(null, error);
    }

}

