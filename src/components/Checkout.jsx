const Checkout = () => {
    return (
        <section className="section__container booking__container">
  <form action="/" className="booking__form">
    <div className="input__group">
      <span>
        <i className="ri-calendar-2-fill" />
      </span>
      <div>
        <label htmlFor="check-in">CHECK-IN</label>
        <input type="text" placeholder="Check In" />
      </div>
    </div>
    <div className="input__group">
      <span>
        <i className="ri-calendar-2-fill" />
      </span>
      <div>
        <label htmlFor="check-out">CHECK-OUT</label>
        <input type="text" placeholder="Check Out" />
      </div>
    </div>
    <div className="input__group">
      <span>
        <i className="ri-user-fill" />
      </span>
      <div>
        <label htmlFor="guest">GUEST</label>
        <input type="text" placeholder="Guest" />
      </div>
    </div>
    <div className="input__group input__btn">
      <button className="btn">CHECK-OUT</button>
    </div>
  </form>
</section>

    )
} 

export default Checkout