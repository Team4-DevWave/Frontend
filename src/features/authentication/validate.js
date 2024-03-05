import ReCAPTCHA from "react-google-recaptcha";

function validateLogin(values) {
    console.log(values);
  let errors = {};
  if (!values.username) {
    errors.username = 'Username is required';
  }
  else if(!values.username.match(/^[a-zA-Z0-9_]{3,16}$/)){
    errors.username = 'Invalid username';
  }
  else{
    errors.username = '';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
 else if(!values.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)){
    errors.password = 'Password must contain at least 8 characters, including at least one letter and one number';
  }
  else{
    errors.password = '';
  }
  return errors;
  
}

function validateSignup(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  }
  if(!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
    errors.email = 'Invalid email';
  }
  if (!values.username) {
    errors.username = 'Username is required';
  }
  if(!values.username.match(/^[a-zA-Z0-9_]{3,16}$/)){
    errors.username = 'Invalid username';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if(!values.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)){
    errors.password = 'Password must contain at least 8 characters, including at least one letter and one number';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  }
  if(values.password !== values.confirmPassword){
    errors.confirmPassword = 'Passwords do not match';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}

function validateCapcha(values) {
  let errors = {};
  if (!values.capcha) {
    errors.capcha = 'Capcha is required';
  }
  return errors;
}

export { validateLogin, validateSignup, validateCapcha};