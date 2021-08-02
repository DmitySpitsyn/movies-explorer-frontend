import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Header(props) {

const location = useLocation();

  const openMenu = () => {
    props.openMenu();
}
console.log(location.pathname)
  return (
    <section className={`header ${props.isLoggedIn ? 'header_type_loggedin' : ''}`}>
      {props.isLoggedIn ? <div className={`header__logo header__logo_type_loggedin ${location.pathname.includes('/profile') ? 'header__logo_type_profile' : ''}`}></div> : <div className="header__logo"></div>}
      {props.isLoggedIn ?
        (<ul className='header__link-list'>
          <a className="header__link header__link_type_loggedin header__link_type_bold" href="/movies" target="_blank">Фильмы</a>
          <a className="header__link header__link_type_loggedin" href="/saved-movies" target="_blank">Сохранённые фильмы</a>
          <a className="header__link header__button header__button_type_loggedin" href="/#" target="_blank"> </a>
          <button className="header__link header__button header__button_type_drop-down" onClick={openMenu}> </button>
        </ul>
        )
        : (
          <ul className='header__link-list'>
            <a className="header__link" onClick={props.onClickRegister} href="/#" target="_blank">Регистрация</a>
            <a className="header__link header__button" onClick={props.onClickLogin} href="/#" target="_blank">Войти</a>
          </ul>)}
    </section>
  )
};

export default Header;