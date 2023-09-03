// Sends user to another page and calls homeroute for one med cert with id
const moreInfo = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    document.location.replace(`/${id}`);
  }
};

// Event listener for more info
document.querySelector('.patient-info').addEventListener('click', moreInfo);
