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

document.querySelector('.buttons-ok').addEventListener('click', approveCert);

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

document
  .querySelector('.buttons-delete')
  .addEventListener('click', delButtonHandler);
