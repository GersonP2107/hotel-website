const  HotelNews = () => {
    return (
      <div className="container">
        <p className="section__subheader">NOTICIAS</p>
        <h2 className="section__header">Manténganse al tanto</h2>
        <div className="grid">
          {/* Large image card */}
          <div className="large-card">
            <img
              src="/pool.jpg"
              alt="Skier on a snowy mountain"
            />
            <div className="card-overlay">
              <p className="date">14 DE MARZO DE 2023</p>
              <h2>Nuevo sitio web</h2>
              <button>LEER MÁS</button>
            </div>
          </div>
          {/* Blue card */}
          <div className="blue-card">
            <h2>Sigue nuestros <br/> Hoteles de Lujo</h2>
            <button>LEER MAS</button>
          </div>
          {/* Image with text overlay */}
          <div className="image-card">
            <img
              src="/food1.jpg"
              alt="Person relaxing in snow"
            />
            <div className="card-overlay">
              <p className="date">14 DE MARZO DE 2023</p>
              <h2>Zona de relax</h2>
            </div>
          </div>
          {/* Group photo */}
          <div className="image-card">
            <img
              src="/bread.jpg"
              alt="Group of people in snow"
            />
          </div>
          {/* Text card */}
          <div className="text-card">
            <p className="date">14 DE MARZO DE 2023</p>
            <h2>A nuestro alrededor</h2>
            <p>
              Para un texto corto, reemplazo o sustituir el de relleno, se suele
              utilizar el conocido , que puede ser útil...
            </p>
            <button>LEER MÁS</button>
          </div>
          {/* Image with text overlay */}
          <div className="image-card">
            <img
              src="/resort.jpg"
              alt="Skier on a steep slope"
            />
            <div className="card-overlay">
              <p className="date">14 DE MARZO DE 2023</p>
              <h2>Paseo diario</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default HotelNews