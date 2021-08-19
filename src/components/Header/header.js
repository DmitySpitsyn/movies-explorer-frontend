import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function Header(props) {

const history = useHistory();
const location = useLocation();

  const openMenu = () => {
    props.openMenu();
}

    const openProfile = () => {
      history.push('/profile');
    }

    const linkToMain = () => {
      window.open('/');
    }

  return (
    <section className={`header ${props.isLoggedIn ? 'header_type_loggedin' : ''} ${props.isOpenHeader ? 'header_opened' : ''}`}>
      {props.isLoggedIn ? <button className='header__logo' onClick={linkToMain}></button> : <button className="header__logo" onClick={linkToMain}></button>}
      {props.isLoggedIn ?
        (<><ul className='header__link-list header__link-list_type_loggedin'>
          <a className={`header__link header__link_type_loggedin header__link_type_bold ${location.pathname.includes('/movies') ? 'header__link_type_underline' : ''}`} href="/movies">Фильмы</a>
          <a className={`header__link header__link_type_loggedin ${location.pathname.includes('/saved-movies') ? 'header__link_type_underline' : ''}`} href="/saved-movies">Сохранённые фильмы</a>
        </ul>
          <button className={`header__link header__button header__button_type_loggedin ${location.pathname.includes('/profile') ? 'header__link_type_underline' : ''}`} onClick={openProfile}>Аккаунт</button>
          <button className="header__link header__button header__button_type_drop-down" onClick={openMenu}> </button>
        </>
        )
        : (
          <ul className='header__link-list'>
            <a className="header__link" onClick={props.onClickRegister} href="/signup" >Регистрация</a>
            <a className="header__link header__button" onClick={props.onClickLogin} href="/signin" >Войти</a>
          </ul>)}
    </section>
  )
};

export default Header;