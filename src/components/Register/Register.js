import { useState, useCallback } from 'react';
import validator from 'validator';

function Register(props) {

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

function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(values).then(() => {resetForm()})
    .catch((err) => {
      err.json().then((err) => setIsServerError(err.message)) 
    });
};

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
      <form className='form form_type_sign' onSubmit={handleSubmit}>
        <label className='form__label' for='name'>Имя</label>
        <input id='name' className='form__input form__input_type_sign' onChange={handleChange} value={values.name} name='name' required minLength="2" maxLength="40" placeholder='Введите имя' type="text"></input>
        <span className='form__input-error'>{errors.name}</span>
        <label className='form__label' for='email'>E-mail</label>
        <input id='email' className='form__input form__input_type_sign' onChange={handleChange} value={values.email} name='email' required minLength="2" maxLength="40" placeholder='Введите email' type="text"></input>
        <span className='form__input-error'>{errors.email}</span>
        <label className='form__label' for='password'>Пароль</label>
        <input id='password' className='form__input form__input_type_sign' onChange={handleChange} value={values.password} name='password' required minLength="2" maxLength="40" placeholder='Введите пароль' type="password"></input>
        <span className='form__input-error'>{errors.password}</span>
        <button type='submit' disabled={(!isValid || !isValidEmail)} className='form__button-submit'>Зарегистрироваться</button>
        <span className='form__input-error'>{isServerError}</span>
      </form>
      <a className="register__link" onClick={onClickLogin} href="/#" target="_blank"><span className="register__link_type_text">Уже зарегистрированы?</span>Войти</a>
    </section>
  )
};

export default Register;