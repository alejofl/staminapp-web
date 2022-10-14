window.onoffline = event => {
  document.querySelector('#disconnected').style.display = 'block';
  document.querySelector('#app').style.display = 'none';
};

window.ononline = event => {
  document.querySelector('#disconnected').style.display = 'none';
  document.querySelector('#app').style.display = 'block';
};