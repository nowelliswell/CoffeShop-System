import { menuData } from '../data/menuData';

const Menu = () => {
  return (
    <section id="menu">
      <h3 className="title">Our Menu</h3>
      <div className="menu-grid">
        {menuData.map((item, i) => (
          <div className="card" key={i}>
            <img src={item.img} alt={item.name} />
            <div className="card-body">
              <h4>{item.name}</h4>
              <p className="price">{item.price}</p>
              {item.label && <div className="badge">{item.label}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
