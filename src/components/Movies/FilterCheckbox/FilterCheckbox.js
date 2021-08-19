import { useState } from 'react';

function FilterCheckBox(props) {

  const [isFilter, setIsFilter] = useState(false);

  function checkFilter() {
    setIsFilter(!isFilter);
    props.resetPageCounter();
  }

  props.setShortMovie(isFilter);

  return (
    <section className="filtercheckbox">
      <label className='filtercheckbox__button'>
        <input type='checkbox' name='filter' visible='none' onInput={checkFilter}></input>
          <span className='filtercheckbox__span'>Короткометражки</span>
         
      </label>
    </section>
  );
}

export default FilterCheckBox;