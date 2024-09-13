import React from 'react';
import './aboutUs.scss';

export default function AboutUs() {
  return (
    <div className="main">
      <section className="heading">
        <div className="image">
          <img src="/assets/aboutus2.jpeg" alt="Calgary Wholesale Tyre" />
          <img src="/assets/aboutus4.jpg" alt="Calgary Wholesale Tyre" />
        </div>
        <div className="sub-heading">
          <h2>YOUR WHOLESALE TIRE STORE IN CALGARY</h2>
        </div>
        <div className="info">
          <p>
            We offer a diverse selection of new tires for cars, light trucks, SUVs, and trailers from top brands like Michelin, Bridgestone, Toyo, Cooper, Starfire, and Firestone, as well as Chinese tires like Yeada, Fortune, Linglong, and Firemax. Our selection includes winter tires, summer tires, all-season tires, high-performance tires, and drifting tires. "We have tires for every need and budget, making us the go-to destination for tires in Calgary." We specialize in tire installation in Calgary, and our state-of-the-art equipment ensures that your tires are installed correctly and safely. We are dedicated to providing our customers with the best service possible and strive to be a leading tire shop in Calgary.
          </p>
        </div>
        <div className="sub-heading">
          <h2>OUR MISSION</h2>
        </div>
        <div className="info">
          <p>
            Our mission is to provide the highest quality tires at an affordable price to the people of Calgary. We are committed to delivering exceptional customer service and ensuring that our clients leave our shop satisfied. We strive to be the best in the industry and to build long-lasting relationships with our customers.
          </p>
        </div>
      </section>
    </div>
  );
}
