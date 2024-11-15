import "./Navbar.scss";

const Navbar = ({ setActivePanel }) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          
        </div>
        <div className="items">
          <div className="item">
            
          </div>
          <div className="item">
            
          </div>
          <div className="item">
            
            
          </div>
          <div className="item">
            
            
          </div>
          <div className="item">
            
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
              onClick={() => setActivePanel("adminlogo")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
