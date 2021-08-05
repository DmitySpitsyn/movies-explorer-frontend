

function Register(props) {

  function onClickLogin(evt) {
    evt.preventDefault();
    props.onClickLogin();
  }

    return (
        <section className='register'>
   <div className='signheader'>
     <div className='header__logo header__logo_type_loggedin header__logo_type_sign'></div>
     <h2 className='signheader__title'>Добро пожаловать!</h2>
      </div>
      <form className='form form_type_sign'>
        <label className='form__label' for='name'>Имя</label>
        <input id='name' className='form__input form__input_type_sign' placeholder='Введите имя' type="text"></input>
        <label className='form__label' for='email'>E-mail</label>
        <input id='email' className='form__input form__input_type_sign' placeholder='Введите email' type="text"></input>
        <label className='form__label' for='password'>Пароль</label>
        <input id='password' className='form__input form__input_type_sign' placeholder='Введите пароль' type="password"></input>
        <span className='form__input-error'>Что-то пошло не так</span>
        <button type='submit' className='form__button-submit'>Зарегистрироваться</button>
      </form>
      <a className="register__link" onClick={onClickLogin} href="/#" target="_blank"><span className="register__link_type_text">Уже зарегистрированы?</span>Войти</a>
    </section>
  )
};

export default Register;