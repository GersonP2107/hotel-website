const Navbar = () => {
    return (
        <nav>
  <div className="nav__bar">
    <div className="logo">
      <a href="#">
        <img className="img_logo" src="/logo.png" alt="logo" />
      </a>
    </div>
    <div className="nav__menu__btn" id="menu-btn">
      <i className="ri-menu-line" />
    </div>
  </div>
  <ul className="nav__links" id="nav-links">
    <li>
      <a href="#home">Inicio</a>
    </li>
    <li>
      <a href="#about">Nosotros</a>
    </li>
    <li>
      <a href="#service">Servicios</a>
    </li>
    <li>
      <a href="#contact">Contacto</a>
    </li>
  </ul>
  <button className="btn nav__btn">Reservar Ahora</button>
</nav>

    )
}

export default Navbar 