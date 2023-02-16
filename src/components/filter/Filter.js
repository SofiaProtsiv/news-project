import React, { useEffect, useState } from 'react';

import { useWindowWidth } from '@react-hook/window-size';
import { Icon } from '../../images/icons';
import Calendar from '../calendar';
import findActiveClass from '../../assets/findActiveClass';

import { useDispatch, useSelector } from "react-redux";
import * as newsAPI from "../../redux/newsSlice";

import './filter.scss';

export default function Filter() {
    const dispatch = useDispatch();

    const [quickAccessCategories, setQuickAccessCategories] = useState([]);
    const [isCategoriesSelectOpen, setIsCategoriesSelectOpen] = useState(false);
    const [selectName, setSelectName] = useState('Others');

    const onlyWidth = useWindowWidth();

    useEffect(() => {
        dispatch(newsAPI.fetchCategories());
    }, [dispatch]);

    const { categories } = useSelector((state) => state.news);

    useEffect(() => {
        if (onlyWidth <= 767) {
            setQuickAccessCategories([]);
            setSelectName('Categories');
        }
        if (onlyWidth >= 768) {
            setQuickAccessCategories(categories.slice(0, 4));
            setSelectName('Others');
        }
        if (onlyWidth >= 1280) {
            setQuickAccessCategories(categories.slice(0, 6));
            setSelectName('Others');
        }
    }, [categories, onlyWidth]);

    function handleSelectCategory({ target }) {
        const select = document.querySelector('.filter__select-text span');
        select.parentNode.classList.add('active');

        select.textContent = target.textContent;

        dispatch(newsAPI.setCategory(target.dataset.value));
        dispatch(newsAPI.fetchNewsByCategory({ category: target.dataset.value }));

        findActiveClass('.filter__buttons-container', 'button');

        setIsCategoriesSelectOpen(false);

        document.querySelector(".header__search").value = ""
    }

    function handleQuickAccessCategory({ target }) {
        const select = document.querySelector('.filter__select-text');
        select.classList.remove('active');
        select.firstChild.textContent = "Others"

        dispatch(newsAPI.setCategory(target.dataset.value));
        dispatch(newsAPI.fetchNewsByCategory({ category: target.dataset.value }));

        setIsCategoriesSelectOpen(false);
        findActiveClass('.filter__buttons-container', 'button');

        target.classList.add('active');

        document.querySelector(".header__search").value = ""
    }

    if (isCategoriesSelectOpen) {
        const select = document.querySelector('.filter__select-text');
        select.classList.add('active');
    }

    return (
        <section className="section__filter">
            <div className="filter__container">
                <div className="filter__buttons-container">
                    {quickAccessCategories &&
                        quickAccessCategories.map(({ display_name, section }) => {
                            return (
                                <button
                                    onClick={e => handleQuickAccessCategory(e)}
                                    className="filter__button"
                                    type="button"
                                    key={section}
                                    data-value={section}
                                >
                                    {display_name}
                                </button>
                            );
                        })}
                    <div className="filter__select-container">
                        <div
                            className="filter__select-text"
                            onClick={() => setIsCategoriesSelectOpen(!isCategoriesSelectOpen)}
                        >
                            <span>{selectName}</span>
                            <Icon
                                id={isCategoriesSelectOpen ? 'arrowUp' : 'arrowDown'}
                                className="filter__select-arrow"
                            />
                        </div>
                        {isCategoriesSelectOpen && (
                            <ul className="filter__select" onMouseLeave={() => setIsCategoriesSelectOpen(false)}>
                                <li
                                    className="filter__option"
                                    key="all"
                                    data-value="all"
                                    onClick={e => handleSelectCategory(e)}
                                >
                                    All
                                </li>
                                {categories.map(({ display_name, section }) => {
                                    return (
                                        <li
                                            className="filter__option"
                                            key={section}
                                            data-value={section}
                                            onClick={e => handleSelectCategory(e)}
                                        >
                                            {display_name}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="filter__calendar-container">
                    <p className="filter__calendar-label">Search date news</p>

                    <Calendar />
                </div>
            </div>
        </section>
    );
}
