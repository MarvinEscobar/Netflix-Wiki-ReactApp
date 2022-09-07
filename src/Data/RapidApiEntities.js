export const Endpoints = {
    Countries: {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/static/countries',
        headers: {
            'X-RapidAPI-Key': 'f23e5ddefemshd3dd33b57f024e5p17703djsn41df2b7b17e2',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    },
    Genres: {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/static/genres',
        headers: {
            'X-RapidAPI-Key': 'f23e5ddefemshd3dd33b57f024e5p17703djsn41df2b7b17e2',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    },
    SearchTitles: {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/search/titles',
        params: { order_by: 'date', type: 'movie' },
        headers: {
            'X-RapidAPI-Key': 'f23e5ddefemshd3dd33b57f024e5p17703djsn41df2b7b17e2',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    },
    SearchPeople: {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/search/people',
        params: { person_type: 'Actor' },
        headers: {
            'X-RapidAPI-Key': 'f23e5ddefemshd3dd33b57f024e5p17703djsn41df2b7b17e2',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    },
    Details: {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/search/people',
        params: { person_type: 'Actor' },
        headers: {
            'X-RapidAPI-Key': 'f23e5ddefemshd3dd33b57f024e5p17703djsn41df2b7b17e2',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    },
    Images: {
        method: 'GET',
        url: 'https://unogs-unogs-v1.p.rapidapi.com/title/images',
        params: { netflix_id: '<REQUIRED>' },
        headers: {
            'X-RapidAPI-Key': 'f23e5ddefemshd3dd33b57f024e5p17703djsn41df2b7b17e2',
            'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
    }
};

export class Result {
    constructor(result, status) {
        this.Result = result;
        this.Status = status;
    }
}