// Doctor to approve cert
// Makes a Put request to one medcert with id
const approveCert = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const approved = true;

    const response = await fetch(`/api/medcert/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ approved }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update ');
    }
  }
};

//Event listener for approving cert
document.querySelector('.buttons-ok').addEventListener('click', approveCert);

// Delete one medcert with id
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

// Event listener for delete
document
  .querySelector('.buttons-delete')
  .addEventListener('click', delButtonHandler);
