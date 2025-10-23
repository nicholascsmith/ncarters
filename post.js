// Load and display post from feed.json based on URL parameter
const postId = window.location.search.slice(1);

if (!postId) {
  document.body.dataset.postError = 'true';
} else {
  fetch('feed.json')
    .then(response => response.json())
    .then(posts => {
      const post = posts.find(p => p.file.replace(/\.[^/.]+$/, '') === postId);

      if (!post) {
        document.body.dataset.postError = 'true';
        return;
      }

      document.body.dataset.postLoaded = 'true';
      document.getElementById('post').src = `media/${post.file}`;

      // Music metadata (optional)
      if (post.song && post.artist) {
        document.querySelector('.post-music').textContent = `♫ ${post.song} • ${post.artist}`;
      }

      // Audio player with mute toggle (optional)
      if (post.audio) {
        const audio = document.getElementById('audio');
        const muteIndicator = document.querySelector('.mute-indicator');
        const container = document.querySelector('.post-container');

        audio.src = `media/${post.audio}`;
        audio.muted = true;
        audio.loop = true;
        audio.play().catch(() => {});

        document.body.dataset.hasAudio = 'true';

        container.addEventListener('click', () => {
          audio.muted = !audio.muted;
          muteIndicator.classList.toggle('muted', audio.muted);
        });
      }
    })
    .catch(() => {
      document.body.dataset.postError = 'true';
    });
}