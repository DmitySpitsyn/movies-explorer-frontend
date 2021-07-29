import portfolioFoto from '../../../images/portfolio_foto.jpg';

function Portfolio(props) {
  return (
    <section id='portfolio' className='portfolio'>
      <h2 className='titleunderline'>Студент</h2>
      <div className='twocolumns twocolumns_type_portfolio'>
        <div className='portfolio__about'>
          <h2 className='portfolio__namestudent'>Дмитрий</h2>
          <h3 className='portfolio__description'>Инженер-механик.</h3>
          <p className='portfolio__text'>Я родился в Свердловске ныне Екатеринбург, живу здесь же, Окончил УГТУ-УПИ, по специальности "Подъёмно-транспортные машины". В настоящее время решил сменить работу.</p>
          <ul className='portfolio__links'>
            <li className='portfolio__link'><a className='portfolio__link' href="https://www.facebook.com/">Facebook</a></li>
            <li className='portfolio__link'><a className='portfolio__link' href="https://github.com/">Github</a></li>
          </ul>
          <h3 className='portfolio__title'>Портфолио</h3>
        </div>
        <img className='portfolio__foto' src={portfolioFoto} alt='фото студента'></img>
      </div>
      <ul className='portfolio__workslist'>
        <li class='portfolio__listitem'>
          <a className='portfolio__worklink' href="/#">Статичный сайт</a>
          <div className='portfolio__arow'></div>
        </li>
        <li class='portfolio__listitem'>
          <a className='portfolio__worklink' href="/#">Адаптивный сайт</a>
          <div className='portfolio__arow'></div>
        </li>
        <li class='portfolio__listitem'>
          <a className='portfolio__worklink' href="/#">Одностраничное приложение</a>
          <div className='portfolio__arow'></div>
        </li>
      </ul>
    </section>
  )
};

export default Portfolio;