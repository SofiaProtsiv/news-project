import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArticleItem from '../../components/articleItem/ArticleItem';

import setFavoriteArticlesOnLoad from '../../assets/setFavoriteArticlesOnLoad';
import setReadArticlesOnLoad from '../../assets/setReadArticlesOnLoad';

import { Icon } from '../../images/icons';
import groupBy from '../../assets/groupBy';

import * as newsAPI from '../../redux/newsSlice';

import './read.scss';

export default function Favorite() {
    const dispatch = useDispatch();

    const { articles } = useSelector(state => state.news);

    const [readAndFavoriteArticles, setReadAndFavoriteArticles] = useState([]);

    useEffect(() => {
        const readArticles = JSON.parse(localStorage.getItem('read')) || [];
        const favoriteArticles = JSON.parse(localStorage.getItem('favorite')) || [];

        dispatch(newsAPI.setArticles(readArticles.reverse()));

        setReadAndFavoriteArticles(
            favoriteArticles.filter(({ id }) => readArticles.some(article => article.id === id)),
        );
    }, []);

    useEffect(() => {
        setFavoriteArticlesOnLoad(readAndFavoriteArticles);
        setReadArticlesOnLoad(articles);
    }, [articles, readAndFavoriteArticles]);

    const groupByDate = groupBy(articles, articleObj => articleObj.readDate);

    function handleMenuOpen({ target }) {
        if (target.tagName !== 'SPAN') {
            return;
        }

        const childrenContainer = target.parentNode.querySelector('ul');
        const arrow = target.lastElementChild;

        childrenContainer.classList.toggle('active');
        arrow.classList.toggle('active');
    }
    return (
        <section className="read__section">
            <div className="read__container">
                <ul className="accordionMenu__container" onClick={e => handleMenuOpen(e)}>
                    {groupByDate.map(([date, articles], index) => {
                        return (
                            <li className="accordionMenu__item" key={date}>
                                <span className="accordionMenu__item-date">
                                    {date}
                                    <Icon
                                        id="arrowUp"
                                        className={
                                            index === 0 ? 'accordionMenu__item-arrow active' : 'accordionMenu__item-arrow'
                                        }
                                    />
                                </span>
                                <ul className={index === 0 ? 'accordionMenu active' : 'accordionMenu'}>
                                    {articles.map(
                                        ({ description, created_date, media, category, title, resourse, id }) => {
                                            if (title || resourse || description) {
                                                return (
                                                    <ArticleItem
                                                        key={id}
                                                        description={description}
                                                        created_date={created_date}
                                                        media={media}
                                                        category={category}
                                                        title={title}
                                                        resourse={resourse}
                                                        id={id}
                                                    />
                                                );
                                            }
                                        },
                                    )}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
