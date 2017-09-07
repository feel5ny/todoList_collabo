function changeProg() {
  const progress = document.querySelector(".ui.progress .bar");
  axios.get('/api/percent').then(res => {
    // console.log('prog:', res.data);
    progress.style.width = res.data;
  })
}
changeProg();


