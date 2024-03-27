

const dot = document.getElementById('dot');
dot.addEventListener('click',()=>{
  dot.classList.toggle('animate');
  document.getElementsByTagName("body")[0].classList.toggle('body_animate');

}
)
