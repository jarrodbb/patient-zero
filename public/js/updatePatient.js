const updatePatientInfo = async (event) => {
  event.preventDefault();

  const diabetes = document.querySelector('#diabetes').value;
  const allergies = document.querySelector('#allergies').value.trim();
  const medication_list = document.querySelector('#medication').value.trim();
  const heart_disease = document.querySelector('#heart').value;
  const high_blood_pressure = document.querySelector('#blood').value;
  const kidney_or_liver_disease = document.querySelector('#kidney').value;

  if (allergies && medication) {
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
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }

  //   if (allergies) {
  //     const response = await fetch(`/api/projects`, {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         diabetes,
  //         allergies,
  //         heartDisease,
  //         bloodPressure,
  //         kidneyLiver,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       document.location.replace('/profile');
  //     } else {
  //       alert('Failed to create project');
  //     }
  //   }

  //   if (medication) {
  //     const response = await fetch(`/api/projects`, {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         diabetes,
  //         medication,
  //         heartDisease,
  //         bloodPressure,
  //         kidneyLiver,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       document.location.replace('/profile');
  //     } else {
  //       alert('Failed to create project');
  //     }
  //   }
};

document
  .querySelector('.patient-update')
  .addEventListener('submit', updatePatientInfo);
