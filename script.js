
const audio = document.getElementById('site-audio');
const soundToggle = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');
const soundLabel = document.getElementById('sound-label');

soundToggle?.addEventListener('click', async () => {
  if (!audio) return;
  try {
    if (audio.paused) {
      await audio.play();
      soundToggle.classList.add('playing');
      soundToggle.setAttribute('aria-pressed', 'true');
      soundIcon.textContent = '❚❚';
      soundLabel.textContent = 'Pause';
    } else {
      audio.pause();
      soundToggle.classList.remove('playing');
      soundToggle.setAttribute('aria-pressed', 'false');
      soundIcon.textContent = '♪';
      soundLabel.textContent = 'Sound';
    }
  } catch (error) {
    soundLabel.textContent = 'Add MP3';
    console.warn('Add your licensed MP3 at assets/audio/que-fue.mp3');
  }
});

audio?.addEventListener('error', () => {
  soundLabel.textContent = 'Add MP3';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const copyButton = document.getElementById('copy-ca');
const contract = document.getElementById('contract');

copyButton?.addEventListener('click', async () => {
  const value = contract?.textContent?.trim();
  if (!value || value === 'COMING AT LAUNCH') return;
  try {
    await navigator.clipboard.writeText(value);
    copyButton.textContent = 'Copied!';
    setTimeout(() => copyButton.textContent = 'Copy', 1300);
  } catch {
    copyButton.textContent = 'Failed';
  }
});
