import { HashLink as Link } from 'react-router-hash-link';

function NavTab(props) {
  return (
    <section className='navtab'>
<ul className='navtab__list'>
  <li className='navtab__link'><Link className='navtab__link' smooth to='/#aboutproject'>О проекте</Link></li>
  <li className='navtab__link'><Link className='navtab__link' smooth to='/#techs'>Технологии</Link></li>
  <li className='navtab__link'><Link className='navtab__link' smooth to='/#portfolio'>Студент</Link></li>
</ul>
    </section>
)
};

export default NavTab;