import axios from "axios";

const { REACT_APP_API_KEY } = process.env;
axios.defaults.baseURL = "https://api.nytimes.com/svc";

export async function fetchNews({ query, page }) {
    const { data } = await axios.get(`/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=${REACT_APP_API_KEY}`)
    return data
}

export async function fetchCategories() {
    const { data } = await axios.get(`/news/v3/content/section-list.json?api-key=${REACT_APP_API_KEY}`)
    return data
}

export async function fetchPopularNews(period = 1) {
    const { data } = await axios.get(`/mostpopular/v2/viewed/${period}.json?api-key=${REACT_APP_API_KEY}`)
    return data
}

export async function fetchNewsByCategory({ category, offset = 10 }) {
    const { data } = await axios.get(`/news/v3/content/nyt/${category}.json?api-key=${REACT_APP_API_KEY}&limit=8offset=${offset}`)
    return data

}