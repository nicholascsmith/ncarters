import { getIcon } from '../utils/icons.js';

export class AudioPlayer {
  constructor(audioElement, muteIndicator, container) {
    this.audio = audioElement;
    this.muteIndicator = muteIndicator;
    this.container = container;
  }

  setup(audioSrc) {
    if (!audioSrc) return;

    this.audio.src = `media/${audioSrc}`;
    this.audio.muted = true;
    this.audio.loop = true;

    this.muteIndicator.style.display = 'flex';
    this.updateIndicator();

    this.audio.play().catch(() => {});

    this.container.addEventListener('click', () => this.toggleMute());
  }

  toggleMute() {
    this.audio.muted = !this.audio.muted;
    this.updateIndicator();
  }

  updateIndicator() {
    this.muteIndicator.innerHTML = this.audio.muted
      ? getIcon('muted')
      : getIcon('unmuted');
  }
}
