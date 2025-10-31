const grid = document.querySelector('.grid');

async function initGrid() {
  try {
    const response = await fetch('feed.json');
    const posts = await response.json();

    const fragment = document.createDocumentFragment();

    [...posts].reverse().forEach(post => {
      const link = document.createElement('a');
      link.href = `post.html?${post.file.replace(/\.[^/.]+$/, '')}`;
      link.className = 'thumbnail';

      const img = document.createElement('img');
      img.src = `media/${post.file}`;
      img.alt = 'post';

      link.appendChild(img);
      fragment.appendChild(link);
    });

    grid.appendChild(fragment);
  } catch {
  }
}

initGrid();
