let total = 0;
let current = 0;
let best = 0;

let disabled = false;
const bar = document.getElementById('active-bar');
const cVal = document.getElementById('c-value');
const tVal = document.getElementById('t-value');
const bVal = document.getElementById('b-value');
const startBtn = document.getElementById('start');
const vipBtn = document.getElementById('auto10');
const vipBtn16 = document.getElementById('auto16');

const animate = () => {
  return new Promise((resolve) => {
    let state = 0;
    const render = (e) => {
      if (state >= 99) {
        bar.style.width = `${99.6}%`;
        resolve(true)
        return;
      }

      state += 2;
      bar.style.width = `${state}%`;
      requestAnimationFrame(render)
    }
    render();
  })
}

const scaleAnim = (el) => {
  el.classList.add('pulse');
  setTimeout(() => el.classList.remove('pulse'), 1000)
}

const enchant = async (chance) => {
  if (disabled) return;
  disabled = true;
  await animate();
  total++;
  if (current < 3) {
    current++
  } else {
    current = Math.random() > (1 - chance / 100) ? current + 1 : 0;
  }

  if (current > best) {
    best = current;
    scaleAnim(bVal);
  }

  scaleAnim(cVal);

  cVal.innerHTML = current;
  tVal.innerHTML = total;
  bVal.innerHTML = best;
  disabled = false;
}

const auto10 = () => {
  let c = current;

  const i = setInterval(() => {
    if (c < 3) {
      c++
    } else {
      c = Math.random() > (1 - 40 / 100) ? c + 1 : 0;
    }

    total++;

    current = c;

    if (current > best) {
      best = current;
    }

    cVal.innerHTML = current;
    tVal.innerHTML = total;
    bVal.innerHTML = current;

    if (current === 10) {
      clearInterval(i);
    }
  }, 10)

  scaleAnim(cVal);
  scaleAnim(bVal);
}

const auto16 = () => {
  let c = current;

  while (c < 16) {
    if (c < 3) {
      c++
    } else {
      c = Math.random() > (1 - 40 / 100) ? c + 1 : 0;
    }

    total++;
  }

  current = c;

  cVal.innerHTML = current;
  tVal.innerHTML = total;
  bVal.innerHTML = current > best ? current : best;

  scaleAnim(cVal);
  scaleAnim(bVal);
}



startBtn.addEventListener('click', () => enchant(40))
vipBtn.addEventListener('click', auto10)
vipBtn16.addEventListener('click', auto16)

