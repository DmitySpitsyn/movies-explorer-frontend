import Header from "../Header/header";

function Profile(props) {

  const openMenu = () => {
    props.openMenu();
  }

  return (
    <section className='profile'>
      <Header openMenu={openMenu} />
      <h2 className='profile__title'>Привет, Дмитрий</h2>
      <form className='form form_type_profile'>
        <div className='form__input-label form__input-label_type_underline'>
        <label className='form__label form__label_type_profile' for='name'>Имя</label>
        <input id='name' className='form__input form__input_type_profile' placeholder='Введите имя' type="text"></input>
        </div>
        <div className='form__input-label'>
        <label className='form__label form__label_type_profile' for='email'>E-mail</label>
        <input id='email' className='form__input form__input_type_profile' placeholder='Введите email' type="text"></input>
        </div>
        <button type='submit' className='form__button-submit form__button-submit_type_profile'>Редактировать</button>
      </form>
      <a className="register__link register__link_type_profile" href="/#" target="_blank">Выйти из аккаунта</a>
    </section>
  )
};

export default Profile;