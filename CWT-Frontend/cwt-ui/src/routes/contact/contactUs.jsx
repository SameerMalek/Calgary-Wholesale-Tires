import React, { useState } from 'react';
import './contactUs.scss';
import emailjs from 'emailjs-com';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    // Use EmailJS to send the form data via email
    emailjs.send('service_v4yx2fl', 'template_hj72zfq', formData, 'ZLo-Q25axJSaGbHht')
      .then((result) => {
        console.log(result.text);
        alert("Form submitted successfully!");
      }, (error) => {
        console.log(error.text);
        alert("An error occurred while submitting the form. Please try again.");
      });

    // Reset the form
    setFormData({
      name: '',
      email: '',
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

// import React, { useState } from 'react';
// import './contactUs.scss';
// import emailjs from 'emailjs-com';

// export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Simple email validation
//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate email format
//     if (!validateEmail(formData.email)) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     // Access environment variables for EmailJS
//     const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
//     const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
//     const userID = process.env.REACT_APP_EMAILJS_USER_ID;

//     // Send the form data using EmailJS
//     emailjs.send(serviceID, templateID, formData, userID)
//       .then((result) => {
//         console.log('Email sent:', result.text);
//         alert("Form submitted successfully!");
//       })
//       .catch((error) => {
//         console.error('Error sending email:', error);
//         alert("An error occurred while submitting the form.");
//       });

//     // Reset the form after submission
//     setFormData({
//       name: '',
//       email: '',
//       message: ''
//     });
//   };

//   return (
//     <div className="contact-us-container">
//       <h2>Get In Touch With Us</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input 
//             type="text" 
//             name="name" 
//             value={formData.name} 
//             onChange={handleChange} 
//             placeholder="Name" 
//             required
//           />
//           <input 
//             type="email" 
//             name="email" 
//             value={formData.email} 
//             onChange={handleChange} 
//             placeholder="Email" 
//             required
//           />
//         </div>
//         <div className="form-group">
//           <textarea 
//             name="message" 
//             value={formData.message} 
//             onChange={handleChange} 
//             placeholder="Message" 
//             required
//           ></textarea>
//         </div>
//         <div className="form-actions">
//           <a href="/" className="back-btn">Back</a>
//           <button type="submit" className="submit-btn">Send Email</button>
//         </div>
//       </form>
//     </div>
//   );
// }
