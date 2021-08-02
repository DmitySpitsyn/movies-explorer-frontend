function Login(props) {

  function onClickRegister(evt) {
    evt.preventDefault();
    props.onClickRegister();
  }

  return (
      <section className='register'>
 <div className='signheader singheader_type_signin'>
   <div className='header__logo header__logo_type_loggedin header__logo_type_sign'></div>
   <h2 className='signheader__title'>Рады видеть!</h2>
    </div>
    <form className='form form_type_sign'>
      <label className='form__label' for='email'>E-mail</label>
      <input id='email' className='form__input form__input_type_sign' placeholder='Введите email' type="text"></input>
      <label className='form__label' for='password'>Пароль</label>
      <input id='password' className='form__input form__input_type_sign' placeholder='Введите пароль' type="password"></input>
      <button type='submit' className='form__button-submit form__button-submit_type_login'>Войти</button>
    </form>
    <a className="register__link register__link_type_signin" onClick={onClickRegister} href="/#" target="_blank"><span className="register__link_type_text">Ещё не зарегистрированы?</span>Регистрация</a>
  </section>
)
};

export default Login;