import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import setFavoriteArticlesOnLoad from "../../assets/setFavoriteArticlesOnLoad";
import setReadArticlesOnLoad from "../../assets/setReadArticlesOnLoad";
import ArticlesList from "../../components/articlesList";
import * as newsAPI from '../../redux/newsSlice';

export default function Favorite() {
    const dispatch = useDispatch();

    const { articles } = useSelector(state => state.news);

    const [favoriteAndRead, setFavoriteAndRead] = useState([]);

    useEffect(() => {
        const readArticles = JSON.parse(localStorage.getItem('read')) || [];
        const favoriteArticles = JSON.parse(localStorage.getItem('favorite')) || [];

        dispatch(newsAPI.setArticles(favoriteArticles.reverse()));

        setFavoriteAndRead(
            readArticles.filter(({ id }) => favoriteArticles.some(article => article.id === id)),
        );
    }, []);

    useEffect(() => {
        setFavoriteArticlesOnLoad(articles);
        setReadArticlesOnLoad(favoriteAndRead);
    }, [articles, favoriteAndRead]);

    return (<ArticlesList />)
}