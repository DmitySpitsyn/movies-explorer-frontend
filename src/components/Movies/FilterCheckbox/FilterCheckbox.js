import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';


function FilterCheckBox(props) {

  const location = useLocation()

  const [isFilter, setIsFilter] = useState(false);

  function checkFilter() {
    setIsFilter(!isFilter);
    if (location.pathname.includes('/saved-movies')) {
      return; 
    }
    props.resetPageCounter();
  }

  useEffect(() => {
    props.setShortMovie(isFilter);
  }) 

  

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