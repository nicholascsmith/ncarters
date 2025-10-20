import { AudioPlayer } from '../components/audioPlayer.js';
import { getIcon } from '../utils/icons.js';

const postId = new URLSearchParams(window.location.search).get('id');
if (!postId) {
  showError();
} else {
  loadPost(postId);
}

document.getElementById('backLink').innerHTML = getIcon('backArrow');

async function loadPost(postId) {
  try {
    const response = await fetch('posts.json');
    const posts = await response.json();
    const post = posts.find(p => p.file && p.file.replace(/\.[^/.]+$/, '') === postId);

    if (!post) {
      showError();
      return;
    }

    showPost(post);
  } catch (error) {
    showError();
  }
}

function showPost(post) {
  const postContent = document.getElementById('postContent');
  const postImg = document.getElementById('post');
  const music = document.querySelector('.post-music');
  const audio = document.getElementById('audio');
  const muteIndicator = document.getElementById('muteIndicator');
  const postContainer = document.getElementById('postContainer');

  postContent.style.display = 'block';
  postImg.src = `media/${post.file}`;

  if (post.song && post.artist) {
    music.textContent = `♫ ${post.song} • ${post.artist}`;
  } else {
    music.style.display = 'none';
  }

  if (post.audio) {
    const player = new AudioPlayer(audio, muteIndicator, postContainer);
    player.setup(post.audio);
  }
}

function showError() {
  const errorContent = document.getElementById('errorContent');
  errorContent.style.display = 'flex';
  errorContent.querySelector('svg').outerHTML = getIcon('error404');
}
