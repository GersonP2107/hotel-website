const Rooms = () => {
    return (
        <section className="section__container room__container">
            <p className="section__subheader">NUESTRAS HABITACIONES</p>
            <h2 className="section__header">El descanso más memorable comienza aquí.</h2>
            <div className="room__grid">
            <div className="room__card">
            <div className="room__card__image">
             <img src="/room1.jpg" alt="room" />
      </div>
      <div className="room__card__details">
        <h4>Habitación Deluxe</h4>
        <p>
        Disfrute del lujo con impresionantes vistas al mar desde su suite privada.
        </p>
        <h5>
          Desde <span>$299/noche</span>
        </h5>
        <button className="btn">Reservar ahora</button>
      </div>
    </div>
    <div className="room__card">
      <div className="room__card__image">
        <img src="/room2.jpg" alt="room" />
      </div>
      <div className="room__card__details">
        <h4>Habitación Ejecutiva</h4>
        <p>
        Experimente la elegancia urbana y el confort moderno en el corazón de la ciudad.
        </p>
        <h5>
         Desde <span>$199/noche</span>
        </h5>
        <button className="btn">Reservar ahora</button>
      </div>
    </div>
    <div className="room__card">
      <div className="room__card__image">
        <img src="/room3.jpg" alt="room" />
      </div>
      <div className="room__card__details">
        <h4>Habitación Familiar</h4>
        <p>
        Espacioso y acogedor, perfecto para crear recuerdos preciados con sus seres queridos.
        </p>
        <h5>
          Desde <span>$249/noche</span>
        </h5>
        <button className="btn">Reservar ahora</button>
      </div>
    </div>
  </div>
</section>

    )
}

export default Rooms