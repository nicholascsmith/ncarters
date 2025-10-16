// Auto-generates the post grid from posts.json
fetch('posts.json')
  .then(r => r.json())
  .then(posts => {
    const grid = document.querySelector('.post-grid');

    // Build post grid HTML (reverse to show newest first)
    grid.innerHTML = posts.reverse().map(post => {
      // Use filename (without extension) as post ID
      const postId = post.file.replace(/\.[^/.]+$/, '');

      return `<a href="post.html?id=${postId}" class="post-item">
        <img src="media/${post.file}" alt="Post" loading="lazy">
      </a>`;
    }).join('');
  })
  .catch(err => {
    console.error('Failed to load posts:', err);
    document.querySelector('.post-grid').innerHTML = '<p>Posts unavailable.</p>';
  });
