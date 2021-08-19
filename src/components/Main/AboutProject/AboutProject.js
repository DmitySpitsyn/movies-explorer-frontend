function AboutProject(props) {
  return (
    <section id='aboutproject' className='aboutproject'>
      <h2 className='titleunderline'>О проекте</h2>
      <div className='twocolumns'>
        <div className='firstcolumn'>
        <h3 className='aboutproject__subtitle'>Дипломный проект включал 5 этапов</h3>
        <p className='aboutproject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='secondcolumn'>
        <h3 className='aboutproject__subtitle'>На выполнение диплома ушло 5 недель</h3>
        <p className='aboutproject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='twocolumns twocolumns_type_progressline'>
        <div className='aboutproject__progressline aboutproject__progressline_type_short'>1 неделя</div>
        <div className='aboutproject__progressline'>4 недели</div>
        <p className='aboutproject__caption'>Back-end</p>
        <p className='aboutproject__caption'>Front-end</p>
      </div>
    </section>
  )
};

export default AboutProject;