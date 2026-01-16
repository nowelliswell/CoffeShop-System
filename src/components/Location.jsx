const Location = () => {
  return (
    <section id="location">
      <h3 className="title">Visit Us</h3>
      <div className="location">
        <iframe
          src="https://maps.google.com/maps?q=jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
          title="Coffee Haven Location"
        ></iframe>
        <div className="info">
          <p>📍 Jakarta, Indonesia</p>
          <p>⏰ 08.00 - 23.00</p>
          <p>🚗 Parkir tersedia</p>
          <p>📶 Free WiFi</p>
          <p>🚬 Smoking Area</p>
        </div>
      </div>
    </section>
  );
};

export default Location;
