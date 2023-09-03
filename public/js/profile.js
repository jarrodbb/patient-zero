// For patient

// Handle new med cert request
// Makes a POST request to API patient
// Requires a doctor selection and reason
const newMedCert = async (event) => {
  event.preventDefault();

  const doctor_id = document.querySelector('#doctor-name').value;
  const reason = document.querySelector('#medical-reason').value.trim();

  if (doctor_id && reason) {
    const response = await fetch('/api/medcert', {
      method: 'POST',
      body: JSON.stringify({ doctor_id, reason }),
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

// Handles update request
// Sends user to a new page by calling homeroute to render
const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    document.location.replace('/updatePatient');
  }
};

// Handle delete request for med cert
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-name')) {
    const id = event.target.getAttribute('data-name');

    const response = await fetch(`/api/medcert/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete ');
    }
  }
};

//event listener for new med cert
document.querySelector('.med-cert').addEventListener('click', newMedCert);

//event listener to update patient
document
  .querySelector('.update-button')
  .addEventListener('click', updateButtonHandler);

//event listener to delete med cert
document
  .querySelector('.delete-now')
  .addEventListener('click', delButtonHandler);
