// Initialize swup once globally
const swup = new Swup();

const MUTED_ICON = `<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
const UNMUTED_ICON = `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;

// Function to load posts on index page
function loadPosts() {
  const grid = document.querySelector('.post-grid');
  if (!grid) return;

  fetch('posts.json')
    .then(r => r.json())
    .then(posts => {
      grid.innerHTML = posts.reverse().map(post => {
        const postId = post.file.replace(/\.[^/.]+$/, '');
        return `<a href="post.html?id=${postId}" class="post-item">
          <img src="media/${post.file}" alt="Post" loading="lazy">
        </a>`;
      }).join('');
    })
    .catch(err => {
      console.error('Failed to load posts:', err);
      grid.innerHTML = '<p>Posts unavailable.</p>';
    });
}

// Function to load individual post on post.html
function loadPost() {
  const el = {
    post: document.getElementById('post'),
    music: document.querySelector('.post-music'),
    audio: document.getElementById('audio'),
    muteIndicator: document.getElementById('muteIndicator'),
    postContainer: document.getElementById('postContainer'),
    header: document.querySelector('.post-header'),
    errorMessage: document.querySelector('.error-message')
  };

  if (!el.post) return; // Not on post page

  const postId = new URLSearchParams(window.location.search).get('id');
  if (!postId) return;

  fetch('posts.json')
    .then(r => r.json())
    .then(posts => {
      const post = posts.find(p => p.file && p.file.replace(/\.[^/.]+$/, '') === postId);
      if (!post) {
        el.errorMessage.style.display = 'flex';
        return;
      }

      // Show post
      el.header.style.display = 'flex';
      el.post.src = `media/${post.file}`;
      el.post.style.display = 'block';

      // Show music info if exists
      if (post.song && post.artist) {
        el.music.textContent = `♫ ${post.song} • ${post.artist}`;
      } else {
        el.music.style.display = 'none';
      }

      // Setup audio with mute indicator if exists
      if (post.audio) {
        el.audio.src = `media/${post.audio}`;
        el.audio.muted = true;
        el.muteIndicator.style.display = 'flex';
        el.muteIndicator.innerHTML = MUTED_ICON;
        el.audio.play().catch(() => {});

        el.postContainer.addEventListener('click', () => {
          el.audio.muted = !el.audio.muted;
          el.muteIndicator.innerHTML = el.audio.muted ? MUTED_ICON : UNMUTED_ICON;
        });
      }
    })
    .catch(() => {});
}

// Initialize all page-specific content
function initPage() {
  loadPosts();
  loadPost();
}

// Run on initial load
initPage();

// Re-run after swup transitions
swup.hooks.on('content:replace', initPage);
