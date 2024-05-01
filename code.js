let total = 0;
let current = 0;
let disabled = false;
console.log(1);
const bar = document.getElementById('active-bar');
const cVal = document.getElementById('c-value');
const tVal = document.getElementById('t-value');
const startBtn = document.getElementById('start');

const animate = () => {
  return new Promise((resolve) => {
    let state = 0;
    const render = (e) => {
      if(state >= 100 ) {
        bar.style.width = `${100}%`;
        resolve(true)
        return;
      }
  
      state += 1;
      bar.style.width = `${state}%`;
      requestAnimationFrame(render)
    }
    render();
  })
}

const enchant = async () => {
  if(disabled) return;
  disabled = true;
  await animate();
  total++;
  if(current < 3) {
    current++
  } else {
    current = Math.random() > 0.5 ? current + 1 : 0;
  }
  cVal.innerHTML = current;
  tVal.innerHTML = total;
  disabled = false;
}

startBtn.addEventListener('click', enchant)