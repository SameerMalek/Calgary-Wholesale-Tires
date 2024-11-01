
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  export const validateOTP = (otp) => {
    return /^\d{6}$/.test(otp);
  };
  
  // Password strength checker
  export const checkPasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[@$!%*?&]+/)) strength += 1;
  
    return {
      score: strength,
      feedback: [
        strength < 2 ? 'Weak' : strength < 4 ? 'Medium' : 'Strong',
        password.length < 8 && 'Password should be at least 8 characters long',
        !password.match(/[a-z]+/) && 'Add lowercase letters',
        !password.match(/[A-Z]+/) && 'Add uppercase letters',
        !password.match(/[0-9]+/) && 'Add numbers',
        !password.match(/[@$!%*?&]+/) && 'Add special characters'
      ].filter(Boolean)
    };
  };