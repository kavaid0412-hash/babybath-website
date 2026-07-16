const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');
const loader = document.getElementById('site-loader');
const toast = document.getElementById('site-toast');

window.addEventListener('load', () => {
  window.setTimeout(() => loader?.classList.add('hidden'), 450);
});

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1900);
}

const audio = document.getElementById('site-audio');
const musicToggle = document.getElementById('music-toggle');

musicToggle?.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
      musicToggle.classList.add('playing');
      musicToggle.textContent = '❚❚';
      showToast('Bath soundtrack ON 🫧');
    } else {
      audio.pause();
      musicToggle.classList.remove('playing');
      musicToggle.textContent = '♫';
      showToast('Bath soundtrack paused');
    }
  } catch {
    musicToggle.textContent = '!';
    showToast('Audio file is missing or blocked');
  }
});

const bathMode = document.getElementById('bath-mode');
const heroBathTrigger = document.getElementById('hero-bath-trigger');

function toggleBathMode(forceOn = false) {
  const willEnable = forceOn || !document.body.classList.contains('bath-mode-on');
  document.body.classList.toggle('bath-mode-on', willEnable);
  bathMode?.classList.toggle('active', willEnable);
  if (bathMode) bathMode.textContent = willEnable ? '🫧 Bath Mode ON' : '🛁 Bath Mode';
  showToast(willEnable ? 'WELCOME TO BATH MODE 🛁' : 'Bath Mode off');
  createBubbleExplosion(window.innerWidth / 2, window.innerHeight / 2, 28);
}
bathMode?.addEventListener('click', () => toggleBathMode());
heroBathTrigger?.addEventListener('click', () => {
  toggleBathMode(true);
  openBathModal();
});

const cursorLayer = document.getElementById('cursor-bubbles');
let lastBubbleTime = 0;
document.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch') return;
  const now = performance.now();
  if (now - lastBubbleTime < 55) return;
  lastBubbleTime = now;
  makeCursorBubble(event.clientX, event.clientY);
});

function makeCursorBubble(x, y) {
  const bubble = document.createElement('i');
  bubble.className = 'cursor-bubble';
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.style.setProperty('--bubble-size', `${8 + Math.random() * 20}px`);
  bubble.style.setProperty('--drift', `${-25 + Math.random() * 50}px`);
  cursorLayer?.appendChild(bubble);
  setTimeout(() => bubble.remove(), 1200);
}

function createBubbleExplosion(x, y, count = 16) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const bubble = document.createElement('i');
      bubble.className = 'cursor-bubble';
      bubble.style.left = `${x + (Math.random() - .5) * 220}px`;
      bubble.style.top = `${y + (Math.random() - .5) * 80}px`;
      bubble.style.setProperty('--bubble-size', `${12 + Math.random() * 34}px`);
      bubble.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
      document.body.appendChild(bubble);
      setTimeout(() => bubble.remove(), 1200);
    }, i * 18);
  }
}

document.addEventListener('click', event => {
  if (event.target.closest('a,button,summary')) return;
  const pop = document.createElement('span');
  pop.className = 'pop-burst';
  pop.textContent = '🫧';
  pop.style.left = `${event.clientX}px`;
  pop.style.top = `${event.clientY}px`;
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 680);
});

document.querySelector('.meme-pop')?.addEventListener('click', event => {
  const rect = event.currentTarget.getBoundingClientRect();
  createBubbleExplosion(rect.left + rect.width / 2, rect.top, 22);
  showToast('POP! Clean charts only 🫧');
});

const modal = document.getElementById('bath-modal');
const modalClose = document.getElementById('modal-close');
function openBathModal() {
  modal?.classList.add('open');
  modal?.setAttribute('aria-hidden', 'false');
}
function closeBathModal() {
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
}
modalClose?.addEventListener('click', closeBathModal);
modal?.addEventListener('click', event => {
  if (event.target === modal) closeBathModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeBathModal();
});

const copyButton = document.getElementById('copy-contract');
const contract = document.getElementById('contract-address');

copyButton?.addEventListener('click', async () => {
  const address = contract.textContent.trim();
  if (!address || address === 'COMING SOON') {
    showToast('Contract will appear at launch');
    return;
  }
  try {
    await navigator.clipboard.writeText(address);
    copyButton.textContent = '✓';
    showToast('Contract copied');
    setTimeout(() => copyButton.textContent = '⧉', 1200);
  } catch {
    showToast('Could not copy contract');
  }
});

document.querySelectorAll('.disabled').forEach(button => {
  button.addEventListener('click', () => showToast('Trading links go live after token launch'));
});
