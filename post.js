const key = decodeURIComponent(window.location.search.slice(1));

function parseTimestamp(timestamp) {
  const [min, sec] = timestamp.split(':').map(Number);
  return (min * 60) + sec;
}

async function initPost() {
  try {
    const posts = await fetch('feed.json').then(r => r.json());
    const post = posts.find(p => p.file.replace(/\.[^/.]+$/, '') === key);

    if (!post) {
      window.location.href = '/';
      return;
    }

    document.body.dataset.postLoaded = 'true';
    document.getElementById('post').src = `media/${post.file}`;

    if (post.year) {
      document.querySelector('.timestamp').textContent = post.year;
    }

    if (post.song && post.artist) {
      document.querySelector('.music').textContent = `♫ ${post.song} · ${post.artist}`;
    }

    if (post.audio) {
      const audio = document.getElementById('audio');
      const muteIndicator = document.querySelector('.mute');
      const container = document.querySelector('.container');

      const startTime = post.audioStart ? parseTimestamp(post.audioStart) : null;
      const endTime = post.audioEnd ? parseTimestamp(post.audioEnd) : null;

      audio.src = `media/${post.audio}`;
      document.body.dataset.hasAudio = 'true';

      if (endTime !== null) {
        audio.addEventListener('timeupdate', () => {
          if (audio.currentTime >= endTime) {
            audio.currentTime = startTime || 0;
          }
        });
      } else {
        audio.loop = true;
      }

      let isPlayPending = false;

      container.addEventListener('click', async () => {
        if (audio.paused && !isPlayPending) {
          isPlayPending = true;
          if (startTime !== null) audio.currentTime = startTime;

          try {
            await audio.play();
            muteIndicator.classList.remove('muted');
          } catch {
          } finally {
            isPlayPending = false;
          }
        } else if (!isPlayPending) {
          audio.pause();
          muteIndicator.classList.add('muted');
        }
      });
    }
  } catch {
    window.location.href = '/';
  }
}

if (!key) {
  window.location.href = '/';
} else {
  initPost();
}