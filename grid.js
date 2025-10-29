const grid = document.querySelector('.grid');
const stripExtension = f => f.replace(/\.[^/.]+$/, '');

fetch('feed.json')
  .then(response => response.json())
  .then(posts => {
    grid.innerHTML = posts.reverse().map(post =>
      `<a href="post.html?${stripExtension(post.file)}" class="thumbnail">
        <img src="media/${post.file}" alt="post">
      </a>`
    ).join('');
  })
  .catch(() => {
  });
