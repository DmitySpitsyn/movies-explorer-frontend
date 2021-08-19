import { useState, useCallback } from 'react';
import validator from 'validator';

export const Validation = (evt) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

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
 

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  function validationEmail(name, value) {
    if (validator.isEmail(value)) {
      setIsValidEmail(true)
      setErrors({ ...errors, [name]: ''});
    } else {
      setIsValidEmail(false)
      setErrors({ ...errors, [name]: 'Введен некорректный Email'});
    }
  }

  return { values, errors, isValid, resetForm };
}

