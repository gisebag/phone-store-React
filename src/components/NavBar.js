import CartWidget from './CartWidget';
import Logo from '../img/phoneStore3a.png';
import { NavLink, Link } from 'react-router-dom';
const NavBar = () => {

  return (

    <nav className="navbar navbar-expand-lg navbar-light Header">
      <div className="container-fluid Header-content">
        <Link to="/" className=" Header-brand"><span>Phone</span>
          Store <img src={Logo} alt='logo' width={25} height={25}></img></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav Header-ul ">
            <li className="nav-item">
              <NavLink to='/' className="Header-options">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="Header-options dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categorías
              </a>
              <ul className="dropdown-menu subMenuOptions" aria-labelledby="navbarDropdownMenuLink">
                <li><NavLink to='/category/od-ds' className='Links'>Motorola</NavLink></li>
                <li><NavLink to='/category/modulation' className='Links'>Samsung</NavLink></li>
                <li><NavLink to='/category/delay' className='Links'>Iphone</NavLink></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to='/contact' className="Header-options">Contacto</NavLink>
            </li>
            
          </ul>
        </div>
        <Link to='/cart'><CartWidget /></Link>
      </div>
    </nav>

  );
}

export default NavBar;