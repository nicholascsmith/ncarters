// Auto-generates the post grid from posts.json
fetch('posts.json')
  .then(r => r.json())
  .then(posts => {
    const grid = document.querySelector('.post-grid');

    // HTML escape helper for security
    const escape = str => (str || '').replace(/[&<>"']/g, m => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;'})[m]);

    // Build post grid HTML
    grid.innerHTML = posts.map(post => {
      const params = new URLSearchParams({
        src: `photos/${post.file}`,
        song: post.song,
        artist: post.artist,
        caption: post.caption
      });
      if (post.audio) params.set('audio', post.audio);

      return `<a href="post.html?${params}" class="post-item">
        <img src="photos/${post.file}" alt="${escape(post.caption)}" loading="lazy">
      </a>`;
    }).join('');
  })
  .catch(err => {
    console.error('Failed to load posts:', err);
    document.querySelector('.post-grid').innerHTML = '<p>Posts unavailable.</p>';
  });
