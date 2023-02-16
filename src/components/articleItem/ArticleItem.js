import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import setFavoriteArticlesOnLoad from '../../assets/setFavoriteArticlesOnLoad';
import setReadArticlesOnLoad from '../../assets/setReadArticlesOnLoad';
import { Icon } from '../../images/icons';

import './articleItem.scss';

export default function ArticleItem({
    description,
    created_date,
    media,
    category,
    title,
    resourse,
    id,
}) {
    const [favorite, setFavorite] = useState([]);
    const [read, setRead] = useState([]);

    const { articles } = useSelector(state => state.news);

    useEffect(() => {
        const favoriteArticles = JSON.parse(localStorage.getItem('favorite')) || [];
        const readArticles = JSON.parse(localStorage.getItem('read')) || [];

        setRead(readArticles);
        setFavorite(favoriteArticles);
    }, [articles]);

    useEffect(() => {
        setFavoriteArticlesOnLoad(favorite);
    }, [articles, favorite]);

    useEffect(() => {
        setReadArticlesOnLoad(read);
    }, [articles, read]);

    function handleToggleFavorite(e) {
        const favorite = JSON.parse(localStorage.getItem('favorite')) || [];

        const favBtn = e.currentTarget;
        const favBtnID = favBtn.dataset.id;
        const favBtnText = favBtn.firstElementChild;
        favBtn.classList.toggle('active');

        const article = articles.find(({ id }) => id === favBtnID);

        if (favBtn.classList.contains('active')) {
            const updatedFavorite = [...favorite, article];
            localStorage.setItem('favorite', JSON.stringify(updatedFavorite));
            favBtnText.textContent = 'Remove from favorite';
        } else {
            const updatedFavorite = favorite.filter(({ id }) => favBtnID !== id);
            localStorage.setItem('favorite', JSON.stringify(updatedFavorite));
            favBtnText.textContent = 'Add to favorite';
        }

        if (!favBtn.classList.contains('active') && window.location.pathname === '/favorite') {
            console.log(e.target.parentNode.parentNode);
            e.target.parentNode.parentNode.remove();
        }
    }

    function handleReadBtn(e) {
        const read = JSON.parse(localStorage.getItem('read')) || [];

        const readArticleID = e.target.dataset.id;
        const readMark = e.target.parentNode.parentNode.querySelector('.article__image-mark');
        const overlay = e.target.parentNode.parentNode.querySelector('.article__overlay');

        const article = articles.find(({ id }) => id === readArticleID);
        const readDate = new Date()
            .toLocaleDateString([], { year: 'numeric', month: 'numeric', day: 'numeric' })
            .replaceAll('.', '/');

        const updatedRead = [
            ...read,
            { ...article, readDate }
        ];
        localStorage.setItem('read', JSON.stringify(updatedRead));

        readMark.classList.add('active');
        overlay.classList.add('active');
    }

    return (
        <li className="article__item" key={id} data-id={id}>
            <div className="article__overlay"></div>
            <div className="article__image-wrapper">
                <span className="article__image-category">{category}</span>
                <span className="article__image-mark">
                    Already read <Icon id="success" />
                </span>
                <div className="article__image" style={{ backgroundImage: `url(${media})` }}></div>
                <button
                    type="button"
                    data-id={id}
                    className="article__image-button--favorite"
                    onClick={e => handleToggleFavorite(e)}
                >
                    <span>Add to favorite</span>
                    <Icon id="heart" className="article__image-button-icon" />
                </button>
            </div>
            <div className="article__title-wrapper">
                <h3 className="article__title">{title}</h3>
                <p className="article__description">{description}</p>
            </div>
            <div className="article__info-wrapper">
                <span className="article__info-date">{created_date}</span>
                <a
                    href={resourse}
                    target="_blank"
                    data-id={id}
                    className="article__info-button--readmore"
                    rel="noreferrer"
                    onClick={e => handleReadBtn(e)}
                >
                    Read more
                </a>
            </div>
        </li>
    );
}
