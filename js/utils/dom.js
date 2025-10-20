import { getIcon } from './icons.js';

export function setButtonState(button, loading, text) {
  if (typeof button === 'string') {
    button = document.getElementById(button);
  }
  if (!button) return;

  button.disabled = loading;
  if (loading) {
    button.innerHTML = `<span class="spinner"></span>${text}`;
  } else {
    button.textContent = text;
  }
}

export function createLink(href, iconName, ariaLabel) {
  const a = document.createElement('a');
  a.href = href;
  a.setAttribute('aria-label', ariaLabel);
  a.setAttribute('rel', 'noopener');
  a.innerHTML = getIcon(iconName);
  return a;
}
