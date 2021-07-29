function Techs(props) {
  return (
    <section id='techs' className='techs'>
      <h2 className='titleunderline'>Технологии</h2>
      <h2 className='techs__title'>7 технологий</h2>
      <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs__icons'>
        <li className='techs__icon'>HTML</li>
        <li className='techs__icon'>CSS</li>
        <li className='techs__icon'>JS</li>
        <li className='techs__icon'>React</li>
        <li className='techs__icon'>Git</li>
        <li className='techs__icon'>Express.js</li>
        <li className='techs__icon'>mongoDB</li>
      </ul>
    </section>
  )
};

export default Techs;