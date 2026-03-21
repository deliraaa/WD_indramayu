 const audio = document.getElementById('audio');
  const canvas = document.getElementById('waveCanvas');
  const ctx = canvas.getContext('2d');
  const timeDisplay = document.getElementById('timeDisplay');
  const iconPlay = document.getElementById('iconPlay');
  const iconPause = document.getElementById('iconPause');

  // Generate bar heights (simulasi waveform)
  const bars = 40;
  const barHeights = Array.from({length: bars}, () => 0.2 + Math.random() * 0.8);

  function drawWaveform(progress = 0) {
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const barW = Math.floor((W - bars) / bars);
    const gap = 2;

    for (let i = 0; i < bars; i++) {
      const x = i * (barW + gap);
      const bh = barHeights[i] * H;
      const y = (H - bh) / 2;
      const played = i / bars <= progress;

      ctx.fillStyle = played ? '#1877f2' : '#c4c7cb';
      ctx.beginPath();
      ctx.roundRect(x, y, barW, bh, 2);
      ctx.fill();
    }
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play();
      iconPlay.style.display = 'none';
      iconPause.style.display = '';
    } else {
      audio.pause();
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
    }
  }

  function seekAudio(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (audio.duration) {
      audio.currentTime = ratio * audio.duration;
    }
  }

  audio.addEventListener('timeupdate', () => {
    const progress = audio.duration ? audio.currentTime / audio.duration : 0;
    drawWaveform(progress);
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
  });

  audio.addEventListener('ended', () => {
    iconPlay.style.display = '';
    iconPause.style.display = 'none';
    drawWaveform(0);
  });

  window.addEventListener('resize', () => drawWaveform(
    audio.duration ? audio.currentTime / audio.duration : 0
  ));

  // Initial draw
  setTimeout(() => drawWaveform(0), 50);