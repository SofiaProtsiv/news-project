import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as newsAPI from '../../redux/newsSlice';
import { NavLink } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
import { Icon } from '../../images/icons';
import './header.scss';
import findActiveClass from '../../assets/findActiveClass';

export default function Header() {
  const dispatch = useDispatch();

  const [isDarkModeSelected, setIsDarkModeSelected] = useState(false);
  const [isMobileNavBarOpen, setIsMobileNavBarOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const onlyWidth = useWindowWidth();

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.body.classList.contains('light')
      ? document.body.classList.remove('light')
      : document.body.classList.remove('darkMode');

    document.body.classList.add(currentTheme);

    if (currentTheme === 'darkMode') {
      setIsDarkModeSelected(true);
    }
  }, []);

  const handleSelectDarkMode = () => {
    if (isDarkModeSelected) {
      document.body.classList.remove('darkMode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('darkMode');
      localStorage.setItem('theme', 'darkMode');
    }

    setIsDarkModeSelected(!isDarkModeSelected);
  };

  function handleNavigation({ target }) {
    setIsMobileNavBarOpen(false);
    setCurrentPage(window.location.pathname);
    document.body.classList.remove('lock');
  }

  function handleBurgerButton() {
    setIsMobileNavBarOpen(!isMobileNavBarOpen);
    document.body.classList.add('lock');
    if (isMobileNavBarOpen) {
      setIsInputOpen(false);
      document.body.classList.remove('lock');
    }
  }

  function handleInputSubmit(event) {
    event.preventDefault();

    const input = event.target.elements.query;

    findActiveClass('.filter__buttons-container', 'button')
    findActiveClass('.filter__select-text')

    const categorylist = document.querySelector('.filter__select-text span');

    if (onlyWidth <= 767) {
      categorylist.textContent = 'Categories';
    }
    if (onlyWidth >= 768) {
      categorylist.textContent = 'Others';
    }
    if (onlyWidth >= 1280) {
      categorylist.textContent = 'Others';
    }

    dispatch(newsAPI.setQuery(input.value));
    dispatch(newsAPI.fetchNews({ query: input.value, page: 1 }));
  }

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo" data-id="home" onClick={e => handleNavigation(e)}>
          News
        </NavLink>
        <nav className={isMobileNavBarOpen ? 'header__menu open' : 'header__menu'}>
          <ul className={isMobileNavBarOpen ? 'menu__list open' : 'menu__list'}>
            <li
              data-id="home"
              className={currentPage === '/' ? 'menu__item active' : 'menu__item'}
              onClick={e => handleNavigation(e)}
            >
              <Icon id="home" className="menu__item-icon" />
              <NavLink to="/" data-id="home" className="menu__link">
                Home
              </NavLink>
              <Icon id="arrow-right" className="menu__item-arrow-icon" />
            </li>
            <li
              data-id="favorite"
              className={currentPage === '/favorite' ? 'menu__item active' : 'menu__item'}
              onClick={e => handleNavigation(e)}
            >
              <Icon id="favorite" className="menu__item-icon" />
              <NavLink to="/favorite" data-id="favorite" className="menu__link">
                Favorite
              </NavLink>
              <Icon id="arrow-right" className="menu__item-arrow-icon" />
            </li>
            <li
              data-id="read"
              className={currentPage === '/read' ? 'menu__item active' : 'menu__item'}
              onClick={e => handleNavigation(e)}
            >
              <Icon id="book" className="menu__item-icon" />
              <NavLink to="/read" data-id="read" className="menu__link">
                Read
              </NavLink>
              <Icon id="arrow-right" className="menu__item-arrow-icon" />
            </li>
          </ul>
        </nav>
        <div className="header__search-conatiner" onClick={() => setIsInputOpen(true)}>
          {!isInputOpen && <Icon id="search" className="header__search-btn" />}

          <div className={isInputOpen ? 'header__search-wrapper open' : 'header__search-wrapper'}>
            <Icon id="search" className="header__search-icon" />
            <form onSubmit={e => handleInputSubmit(e)}>
              <input type="text" placeholder="Search" name="query" className="header__search" />
            </form>
          </div>
        </div>
        <div className="toggle-switch">
          <p>{onlyWidth >= 1280 ? "Dark" : <Icon id="darkMode" className={isDarkModeSelected ? "switch-icon--active" : "switch-icon"} />}</p>
          <span>
            <label className="switch">
              <input
                id="theme-switch"
                type="checkbox"
                checked={isDarkModeSelected}
                onChange={() => handleSelectDarkMode()}
              />
              <span className="slider round"></span>
            </label>
          </span>
          <p>{onlyWidth >= 1280 ? "Light" : <Icon id="lightMode" className={!isDarkModeSelected ? "switch-icon--active" : "switch-icon"} />}</p>
        </div>
        <button
          className={isMobileNavBarOpen ? 'header__burger-menu open' : 'header__burger-menu'}
          type="button"
          onClick={handleBurgerButton}
        >
          <span></span>
        </button>
      </div>
    </header>
  );
}
