const newMedCert = async (event) => {
  event.preventDefault();

  const doctor_id = document.querySelector('#doctor-name').value;
  const reason = document.querySelector('#medical-reason').value.trim();

  if (doctor_id && reason) {
    const response = await fetch(`/api/medcert`, {
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

const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    document.location.replace('/updatePatient');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

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

document.querySelector('.med-cert').addEventListener('click', newMedCert);

document
  .querySelector('.update-button')
  .addEventListener('click', updateButtonHandler);

document
  .querySelector('.delete-now')
  .addEventListener('click', delButtonHandler);

//needs updating
// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
