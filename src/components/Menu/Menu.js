import { useLocation } from "react-router-dom";

function Menu(props) {

  const location = useLocation();

  return (
    <section className={`menu ${props.isOpen ? 'menu_opened' : ''}`}>
      <div className='menu__list'>
      <button type="button" className="menu__button-close" onClick={props.onClose}></button>
      <a className={`header__link header__link_type_menu ${(location.pathname.includes('/') & !location.pathname.includes('/movies') &  !location.pathname.includes('/saved-movies') & !location.pathname.includes('/profile')) ? 'header__link_type_underline' : ''}`}  href="/">Главная</a>
          <a className={`header__link ${location.pathname.includes('/movies') ? 'header__link_type_underline' : ''} header__link_type_menu`} href="/movies">Фильмы</a>
            <a className={`header__link ${location.pathname.includes('/saved-movies') ? 'header__link_type_underline' : ''} header__link_type_menu`} href="/saved-movies">Сохранённые фильмы</a>
            <button className="header__link header__button_type_menu header__button header__button_type_loggedin" onClick={props.openProfile}>Аккаунт</button>
      </div>
    </section>
  );
}

export default Menu;