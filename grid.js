// Load posts
const container = document.querySelector('.post-grid');

fetch('feed.json')
  .then(response => response.json())
  .then(posts => {
    container.innerHTML = posts.map(post => {
      const postId = post.file.replace(/\.[^/.]+$/, '');
      return `<a href="post.html?${postId}" class="post-item">
        <img src="media/${post.file}" alt="Post" loading="lazy">
      </a>`;
    }).join('');
  })
  .catch(() => {
    container.innerHTML = '<p>Enable JavaScript to view posts.</p>';
  });
