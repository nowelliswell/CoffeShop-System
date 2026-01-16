const Footer = () => {
  return (
    <footer id="contact">
      <p>Contact Us</p>
      <div className="social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-tiktok"></i>
        </a>
        <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
      <p style={{ marginTop: "15px", fontSize: "13px", color: "#777" }}>
        © 2026 Coffee Haven
      </p>
    </footer>
  );
};

export default Footer;
