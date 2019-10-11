import customHttp from './CustomHttp';

const http = customHttp();

export default function newsServiceModule() {
    const apiUrl = 'https://newsapi.org';
    const apiKey = '9c27b0f722b84da5a08312d2b125351b';
    return {
        topHeadlines(country, category, cb) {
            http.get(`${apiUrl}/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`, cb);
        },
        topHeadlinesBySources(sources, cb) {
            http.get(`${apiUrl}/v2/top-headlines?sources=${sources}&apiKey=${apiKey}`, cb);
        },
        everything(text, cb) {
            http.get(`${apiUrl}/v2/everything?q=${text}&apiKey=${apiKey}`, cb);
        },
        sources(cb) {
            http.get(`${apiUrl}/v2/sources?apiKey=${apiKey}`, cb);
        }
    }
}
