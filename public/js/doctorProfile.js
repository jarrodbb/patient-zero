const moreInfo = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    document.location.replace(`/${id}`);
  }
};

document.querySelector('.approve-button').addEventListener('click', moreInfo);
