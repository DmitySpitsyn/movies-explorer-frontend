import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="searchform">
      <div className='searchform__form'>
        <form className='form'>
          <input type='text' placeholder='Фильм' className='form__input'></input>
          <button type='button' className='form__button'></button>
        </form>
        <FilterCheckBox />
      </div>
      <div className='underline'></div>
    </section>
  );
}

export default SearchForm;