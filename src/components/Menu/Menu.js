
function Menu(props) {
  return (
    <section className={`menu ${props.isOpen ? 'menu_opened' : ''}`}>
      <div className='menu__list'>
      <button type="button" className="menu__button-close" onClick={props.onClose}></button>
      <h2 className='menu__title'>Главная</h2>
          <a className="header__link header__link_type_underline header__link_type_menu" href="/movies" target="_blank">Фильмы</a>
          <a className="header__link header__link_type_menu" href="/saved-movies" target="_blank">Сохранённые фильмы</a>
          <a className="header__link header__button header__button_type_menu" href="/#" target="_blank"> </a>
      </div>
    </section>
  );
}

export default Menu;