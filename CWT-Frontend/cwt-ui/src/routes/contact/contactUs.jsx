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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      alert("Please enter a valid phone number.");
      return;
    }
    
    // Here you would typically send the form data to your backend
    console.log(formData);
    
    alert("Form submitted successfully!");
    
    // Reset the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
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
            required
          />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
            required
          />
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Phone" 
            required
          />
        </div>
        <div className="form-group">
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="Message" 
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <a href="/" className="back-btn">Back</a>
          <button type="submit" className="submit-btn">Send Email</button>
        </div>
      </form>
    </div>
  );
}