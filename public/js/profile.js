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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    document.location.replace('/updatePatient');
  }
};

document.querySelector('.med-cert').addEventListener('click', newMedCert);

document
  .querySelector('.patient-info')
  .addEventListener('click', updateButtonHandler);

//needs updating
// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
