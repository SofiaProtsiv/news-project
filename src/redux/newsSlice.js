import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as newsAPI from '../api';
import normalizeResponse from "../assets/normalizeResponse";

const initialState = {
    articles: [],
    articlesGroup: [],
    totalPages: 0,
    categories: [],
    filters: {
        query: "",
        begin_date: "",
        category: "",
        page: 1,
        per_page: 8,
        limit: 10,
    },
    status: "pending",
};


export const fetchPopularNews = createAsyncThunk(
    "fetchPopularNews",
    async (_, { rejectWithValue, dispatch }) => {
        dispatch(resetFilters());

        const { results, num_results } = await newsAPI.fetchPopularNews();
        const normalizeResults = normalizeResponse("fetchPopularNews", results);


        dispatch(setTotalPages(num_results))
        dispatch(setArticles(normalizeResults));
    }
);

export const fetchNews = createAsyncThunk(
    "fetchNews",
    async (filters, { rejectWithValue, dispatch }) => {
        dispatch(resetFilters());

        const { response } = await newsAPI.fetchNews(filters);
        const normalizeResults = normalizeResponse("fetchNews", response.docs);

        dispatch(setTotalPages(response.meta.hits))
        dispatch(setArticles(normalizeResults));
    }
);

export const fetchNewsByCategory = createAsyncThunk(
    "fetchNewsByCategory",
    async (filters, { rejectWithValue, dispatch }) => {
        dispatch(resetFilters());

        const { results, num_results } = await newsAPI.fetchNewsByCategory(filters);
        const normalizeResults = normalizeResponse("fetchNewsByCategory", results);

        dispatch(setTotalPages(num_results))
        dispatch(setArticles(normalizeResults));
    }
);

export const fetchCategories = createAsyncThunk(
    "fetchCategories",
    async (_, { rejectWithValue, dispatch }) => {
        const { results } = await newsAPI.fetchCategories();
        const categories = results.filter(({ section }) => {
            if (section.includes("&") || section.includes("/")) {
                return;
            }
            return section
        })
        dispatch(setCategories(categories));
    }
);


export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setArticles: (state, action) => {
            state.articles = action.payload;

            const { per_page, page } = state.filters;
            state.articlesGroup = [...action.payload].splice(per_page * (page - 1), per_page)
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setCategory: (state, action) => {
            state.filters.category = action.payload;
        },
        setBeginDate: (state, action) => {
            state.filters.begin_date = action.payload;
        },
        setPage: (state, action) => {
            state.filters.page = action.payload;
        },
        setQuery: (state, action) => {
            state.filters.query = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setTotalPages: (state, action) => {
            if (action.payload > 1000) {
                state.totalPages = 100
            } else {
                state.totalPages = Math.ceil(action.payload / 10);
            }
        },
        setArticlesGroup: (state, action) => {
            const { per_page, page } = state.filters;
            state.articlesGroup = [...action.payload].splice(per_page * (page - 1), per_page)
        },
        resetFilters: (state, action) => {
            state.filters.query = "";
            state.filters.page = 1;
            state.filters.category = "";
            state.filters.begin_date = ""
        },
    },
});

export const {
    setArticles,
    setCategories,
    setCategory,
    setBeginDate,
    setPage,
    setQuery,
    resetFilters,
    setTotalPages,
    setArticlesGroup,
    setStatus
} = newsSlice.actions;

export default newsSlice.reducer;
