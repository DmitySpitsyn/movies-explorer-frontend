import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import validator from 'validator';

function Profile(props) {

  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  props.setIsOpenHeader(true);

  useEffect(() => {
    setValues({name: currentUser.name, email: currentUser.email, message: currentUser.message});
  }, [currentUser]);

  useEffect(() => {
    setErrors({email: currentUser.message});
  }, [currentUser.message]);

  function handleChange(evt) {

    const target = evt.target;
    const name = target.name;
    const value = target.value;
    if (name === 'email') {
      validationEmail(name, value);
    } else {
      if (currentUser.name === value) {
        setIsValid(false);
        setErrors({ ...errors, [name]: 'Значение имени пользователя должно отличаться' });
      } else {
        setIsValid(target.closest("form").checkValidity());
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValidEmail(true);
      }
    }
    setValues({ ...values, [name]: value });
  }

  function validationEmail(name, value) {

    if (validator.isEmail(value)) {
      if (currentUser.email === value) {
        setIsValidEmail(false);
        setErrors({ ...errors, [name]: 'Значение почты пользователя должно отличаться' });
      } else {
        setIsValidEmail(true);
        setIsValid(true);
        setErrors({ ...errors, [name]: '' });
      }
    } else {
      setIsValidEmail(false)
      setErrors({ ...errors, [name]: 'Введен некорректный Email' });
    }
  }

console.log(isValid, isValidEmail)
    function handleSubmit(evt) {
      evt.preventDefault();
      props.onUpdateUser(values);
    };

    function onLogOut(evt) {
      props.onLogOut();
  };

  return (
    <section className='profile'>
      <h2 className='profile__title'>Привет, {values.name}</h2>
      <form className='form form_type_profile' onSubmit={handleSubmit}>
        <div className='form__input-label form__input-label_type_underline'>
        <label className='form__label form__label_type_profile' for='name'>Имя</label>
        <input id='name' className='form__input form__input_type_profile' name='name' onChange={handleChange} value={values.name} required minLength="2" maxLength="40" placeholder='Введите имя' type="text"></input>
        </div>
        <span className='form__input-error'>{errors.name}</span>
        <div className='form__input-label'>
        <label className='form__label form__label_type_profile' for='email'>E-mail</label>
        <input id='email' className='form__input form__input_type_profile' name='email' onChange={handleChange} value={values.email} required placeholder='Введите email' type="text"></input>
        </div>
        <span className='form__input-error'>{errors.email}</span>
        <button type='submit' disabled={!isValid || !isValidEmail} className='form__button-submit form__button-submit_type_profile'>Редактировать</button>
      </form>
      <button className="register__link register__link_type_profile" onClick={onLogOut}>Выйти из аккаунта</button>
    </section>
  )
};

export default Profile;