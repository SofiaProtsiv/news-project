import React from 'react';
import { useSelector } from 'react-redux';
import './articlesList.scss';
import ArticleItem from '../articleItem/ArticleItem';

export default function ArticlesList() {
    const { articles } = useSelector(state => state.news);

    return (
        <section className="section__articles">
            <div className="section__container">
                <ul className="aricles__list">
                    {articles.map(({ description, created_date, media, category, title, resourse, id }) => {
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
                    })}
                </ul>
            </div>
        </section>
    );
}
