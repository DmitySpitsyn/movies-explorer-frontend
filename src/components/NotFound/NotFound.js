import { useHistory } from 'react-router-dom';

function NotFound() {

  const history = useHistory();

  function goBack() {
    history.goBack();
  }


  return (
    <section className='notfound'>
      <h2 className='notfound__title'>404</h2>
      <h3 className='notfound__subtitle'>Страница не найдена</h3>
      <span className="register__link" onClick={goBack}>Назад</span>
    </section>
  )
};

export default NotFound;