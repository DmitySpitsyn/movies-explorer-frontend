function Footer(props) {
  return (
    <section className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='twocolumns twocolumns_type_footer'>
        <p className='footer__year'>&#169; 2021</p>
        <ul className='footer__links'>
          <li className='footer__listitem'><a className='footer__link' href='https://praktikum.yandex.ru/'>Яндекс.Практикум</a></li>
          <li className='footer__listitem'><a className='footer__link' href='https://github.com/'>Github</a></li>
          <li className='footer__listitem'><a className='footer__link' href='https://www.facebook.com/'>Facebook</a></li>
        </ul>
      </div>
    </section>
  )
};

export default Footer;