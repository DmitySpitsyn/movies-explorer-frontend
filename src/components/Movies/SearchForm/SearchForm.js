import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";
import {useState} from 'react';

function SearchForm(props) {

  const [dataForSearch, setDataForSearch] = useState('');

function handleChange(evt) {
  setDataForSearch(evt.target.value);
}


function handleSubmit(evt) {
    evt.preventDefault();
    console.log(dataForSearch)
    props.handleSearch(dataForSearch);
};

  return (
    <section className="searchform">
      <div className='searchform__form'>
        <form className='form' onSubmit={handleSubmit}>
          <input type='text' placeholder='Фильм' onChange={handleChange} value={dataForSearch.name} name='name' className='form__input'></input>
          <button type='submit' className='form__button'></button>
        </form>
        <FilterCheckBox setShortMovie={props.setShortMovie} />
      </div>
      <div className='underline'></div>
    </section>
  );
}

export default SearchForm;