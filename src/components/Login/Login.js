import {useState, useCallback} from 'react'
import validator from 'validator';

function Login(props) {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isServerError, setIsServerError] = useState('');


  function handleChange(evt) {

    const target = evt.target;
    const name = target.name;
    const value = target.value;
    if (name === 'email') {
      validationEmail(name, value);
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    }
    setValues({ ...values, [name]: value });
  }


  function validationEmail(name, value) {
    if (validator.isEmail(value)) {
      setIsValidEmail(true)
      setErrors({ ...errors, [name]: '' });
    } else {
      setIsValidEmail(false)
      setErrors({ ...errors, [name]: 'Введен некорректный Email' });
    }
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  function onClickRegister(evt) {
    evt.preventDefault();
    props.onClickRegister();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(values).then(() => resetForm())
      .catch((err) => {
      err.json().then((err) => setIsServerError(err.message)) 
    });
  };

  return (
      <section className='register'>
 <div className='signheader singheader_type_signin'>
   <div className='header__logo header__logo_type_loggedin header__logo_type_sign'></div>
   <h2 className='signheader__title'>Рады видеть!</h2>
    </div>
    <form className='form form_type_sign' onSubmit={handleSubmit} noValidate>
      <label className='form__label' for='email'>E-mail</label>
      <input id='email' className='form__input form__input_type_sign' onChange={handleChange} value={values.email} name="email" placeholder='Введите email' type="text"></input>
      <span className='form__input-error'>{errors.email}</span>
      <label className='form__label' for='password'>Пароль</label>
      <input id='password' className='form__input form__input_type_sign' onChange={handleChange} value={values.password} name="password" required minLength="2" maxLength="40" placeholder='Введите пароль' type="password"></input>
      <span className='form__input-error'>{errors.password}</span>
      <button type='submit' disabled={(!isValid || !isValidEmail)} className='form__button-submit form__button-submit_type_login'>Войти</button>
      <span className='form__input-error'>{isServerError}</span>
    </form>
    <a className="register__link register__link_type_signin" onClick={onClickRegister} href="/#" target="_blank"><span className="register__link_type_text">Ещё не зарегистрированы?</span>Регистрация</a>
  </section>
)
};

export default Login;