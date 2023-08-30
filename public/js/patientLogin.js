const passwordGenerate = document.getElementById('passwordGenerator');
const passwordFormContent = document.getElementById('password-signup');

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/patient/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/patient', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// const passwordContent = () => {};

// const newPassword = generator.generate({
//   length: 6,
//   numbers: true,
//   symbols: true,
// });

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

// document
//   .getElementById('passwordGenerator')
//   .addEventListener('submit', passwordContent);

passwordGenerate.addEventListener('click', async (event) => {
  passwordFormContent.value = '';
  const response = await fetch('/api/generator');
  const randomPassword = await response.text();
  passwordFormContent.value = randomPassword.replace(/['"]+/g, '');
  console.log(passwordFormContent.value);
});
