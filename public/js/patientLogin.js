const passwordGenerate = document.getElementById('passwordGenerator');
const passwordFormContent = document.getElementById('password-signup');

//Handle log in
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

// Handle new patient
const newPatient = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#patient-name').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/patient', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

// Event listener for login
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Password generator
passwordGenerate.addEventListener('click', async () => {
  passwordFormContent.value = '';
  const response = await fetch('/api/generator');
  const randomPassword = await response.text();
  passwordFormContent.value = randomPassword.replace(/['"]+/g, '');
  console.log(passwordFormContent.value);
});

// Event listener for signup
document
  .querySelector('.new-patient-form')
  .addEventListener('submit', newPatient);
