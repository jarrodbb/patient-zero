const updatePatientInfo = async (event) => {
  event.preventDefault();

  const diabetes = document.querySelector('#diabetes').value;
  const allergies = document.querySelector('#allergies').value.trim();
  const medication_list = document.querySelector('#medication').value.trim();
  const heart_disease = document.querySelector('#heart').value;
  const high_blood_pressure = document.querySelector('#blood').value;
  const kidney_or_liver_disease = document.querySelector('#kidney').value;

  if (allergies && medication_list) {
    const response = await fetch(`/api/patient`, {
      method: 'PUT',
      body: JSON.stringify({
        diabetes,
        allergies,
        medication_list,
        heart_disease,
        high_blood_pressure,
        kidney_or_liver_disease,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return document.location.replace('/profile');
    } else {
      alert('Failed to update');
    }
  }

  if (allergies) {
    const response = await fetch(`/api/patient`, {
      method: 'PUT',
      body: JSON.stringify({
        diabetes,
        allergies,
        heart_disease,
        high_blood_pressure,
        kidney_or_liver_disease,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return document.location.replace('/profile');
    } else {
      alert('Failed to update');
    }
  }

  if (medication_list) {
    const response = await fetch(`/api/patient`, {
      method: 'PUT',
      body: JSON.stringify({
        diabetes,
        medication_list,
        heart_disease,
        high_blood_pressure,
        kidney_or_liver_disease,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return document.location.replace('/profile');
    } else {
      alert('Failed to update');
    }
  }
};

document
  .querySelector('.patient-update')
  .addEventListener('submit', updatePatientInfo);
