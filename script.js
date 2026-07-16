const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');

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

const audio = document.getElementById('site-audio');
const musicToggle = document.getElementById('music-toggle');

musicToggle?.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
      musicToggle.classList.add('playing');
      musicToggle.textContent = '❚❚';
    } else {
      audio.pause();
      musicToggle.classList.remove('playing');
      musicToggle.textContent = '♫';
    }
  } catch (error) {
    musicToggle.textContent = '!';
    musicToggle.title = 'Add your licensed MP3 at assets/audio/que-fue.mp3';
  }
});

audio?.addEventListener('error', () => {
  musicToggle.title = 'Add your licensed MP3 at assets/audio/que-fue.mp3';
});

const copyButton = document.getElementById('copy-contract');
const contract = document.getElementById('contract-address');

copyButton?.addEventListener('click', async () => {
  const address = contract.textContent.trim();
  if (!address || address === 'COMING SOON') return;
  try {
    await navigator.clipboard.writeText(address);
    copyButton.textContent = '✓';
    setTimeout(() => copyButton.textContent = '⧉', 1200);
  } catch {
    copyButton.textContent = '!';
  }
});
