export class PostGrid {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  async load() {
    if (!this.container) return;

    try {
      const response = await fetch('posts.json');
      const posts = await response.json();
      this.render(posts);
    } catch (error) {
      console.error('Failed to load posts:', error);
      this.container.innerHTML = '<p>Posts unavailable.</p>';
    }
  }

  render(posts) {
    this.container.innerHTML = posts.reverse().map(post => {
      const postId = post.file.replace(/\.[^/.]+$/, '');
      return `<a href="post.html?id=${postId}" class="post-item">
        <img src="media/${post.file}" alt="Post" loading="lazy">
      </a>`;
    }).join('');
  }
}
