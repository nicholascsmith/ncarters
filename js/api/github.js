import { GITHUB } from '../config.js';
import { utf8ToBase64 } from '../utils/file.js';

export async function githubFetch(token, path, options = {}) {
  const url = `${GITHUB.API}/repos/${GITHUB.USER}/${GITHUB.REPO}/contents/${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `GitHub API error: ${response.status}`);
  }

  return response.json();
}

export async function getPostsJson(token) {
  try {
    const data = await githubFetch(token, 'posts.json');
    const content = atob(data.content.replace(/\n/g, ''));
    return {
      posts: JSON.parse(content),
      sha: data.sha
    };
  } catch (error) {
    return { posts: [], sha: null };
  }
}

export async function uploadFile(token, path, base64Content, message) {
  return githubFetch(token, path, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: base64Content
    })
  });
}

export async function updatePostsJson(token, posts, sha) {
  const content = utf8ToBase64(JSON.stringify(posts, null, 2));

  return githubFetch(token, 'posts.json', {
    method: 'PUT',
    body: JSON.stringify({
      message: '🤖 Update posts database',
      content,
      sha
    })
  });
}

export async function deleteFile(token, path) {
  const data = await githubFetch(token, path);

  return githubFetch(token, path, {
    method: 'DELETE',
    body: JSON.stringify({
      message: '🤖 Delete file',
      sha: data.sha
    })
  });
}

export async function getMediaFiles(token, filterFn = null) {
  const data = await githubFetch(token, 'media');

  if (!filterFn) return data;

  return data.filter(filterFn);
}

export async function getAudioFiles(token) {
  return getMediaFiles(token, file =>
    file.name.startsWith('audio') &&
    (file.name.endsWith('.mp3') || file.name.endsWith('.m4a'))
  );
}
