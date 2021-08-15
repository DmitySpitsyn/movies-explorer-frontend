import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from 'react';

function MoviesCardList(props) {

  let arr = [];
  const [amountCards, setAmountCards] = useState(16);

  useEffect(() => {
    
    function howCards() {
      if (window.innerWidth > 800) 
      {props.resetPageCounter(); setAmountCards(7); return};
      if (window.innerWidth <= 400) 
      {props.resetPageCounter(); setAmountCards(5); return};
      if (window.innerWidth <= 800) 
      {props.resetPageCounter(); setAmountCards(7); return};
    }
    howCards();
    window.addEventListener('resize', () => {
      howCards();
    });
  }, []);


  for (let i=0; i < props.filteredMovies.length; i += amountCards) {
    arr.push(props.filteredMovies.slice(0, i + amountCards));
  }


useEffect(() => {
  if (arr.length > props.pageCounter + 1) 
  {props.hideButton(false); return;} 
  props.hideButton(true);
  
}, [props.pageCounter, amountCards, arr.length, props]);


  return (
    <section className='moviescardlist'>
      {
        (arr.length === 0) ? <span>Ничего не найдено</span> :
        arr[props.pageCounter].map((card) => (<MoviesCard
          key={card.id}
          card={card}
          createMovies={props.createMovies}
          savedMovies={props.savedMovies}
          deleteMovie={props.deleteMovie}
          checkLike={props.checkLike}
        />))
      }
    </section>
  );
}

export default MoviesCardList;