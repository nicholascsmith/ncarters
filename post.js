const key = window.location.search.slice(1);
const redirectHome = () => window.location.href = '/';

if (!key) {
  redirectHome();
} else {
  (async () => {
    const stripExtension = filename => filename.replace(/\.[^/.]+$/, '');

    try {
      const posts = await fetch('feed.json').then(r => r.json());
      const post = posts.find(p => stripExtension(p.file) === key);

      if (!post) {
        redirectHome();
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

        const parseTime = t => {
          if (!t) return null;
          const [min, sec] = t.split(':').map(Number);
          return (min * 60) + sec;
        };

        const startTime = parseTime(post.audioStart);
        const endTime = parseTime(post.audioEnd);

        audio.src = `media/${post.audio}`;
        document.body.dataset.hasAudio = 'true';

        audio.addEventListener('loadedmetadata', () => {
          if (startTime !== null) audio.currentTime = startTime;
        }, { once: true });

        if (endTime !== null) {
          audio.addEventListener('timeupdate', () => {
            if (audio.currentTime >= endTime) {
              audio.currentTime = startTime || 0;
            }
          });
        } else {
          audio.loop = true;
        }

        container.addEventListener('click', () => {
          if (audio.paused) {
            audio.play().catch(() => {});
          } else {
            audio.pause();
          }
          muteIndicator.classList.toggle('muted', audio.paused);
        });
      }
    } catch {
      redirectHome();
    }
  })();
}