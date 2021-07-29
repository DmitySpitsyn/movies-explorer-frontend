import { useState, useEffect } from 'react';

function FilterCheckBox(props) {

  const [isFilter, setIsFilter] = useState(false);

  function checkFilter() {
    setIsFilter(!isFilter);
  }
  console.log(isFilter)
  return (
    <section className="filtercheckbox">
      <h2 className='filtercheckbox__title'>Короткометражки</h2>
      <label className='filtercheckbox__button'>
        <input type='checkbox' name='filter' visible='none' onInput={checkFilter}></input>
          <span className='filtercheckbox__span'></span>
      </label>
    </section>
  );
}

export default FilterCheckBox;