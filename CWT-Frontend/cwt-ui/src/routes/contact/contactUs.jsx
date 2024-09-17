import React, { useState } from 'react';
import './contactUs.scss';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="contact-us-container">
      <h2>Get In Touch With Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Name" 
          />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
          />
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Phone" 
          />
        </div>
        <div className="form-group">
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="Message" 
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="button" className="back-btn">Back</button>
          <button type="submit" className="submit-btn">Send Email</button>
        </div>
      </form>
    </div>
  );
}
