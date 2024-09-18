import Navbar from "./Navbar"

const Header = () => {
    return (
      <header className="header">
        <Navbar />
        <div className="section__container header__container" id="home">
          <h1>
            Siéntase como en casa
            <br />
            en <span>Royal Hotel</span>.
          </h1>
        </div>
      </header>
    )
} 

export default Header 