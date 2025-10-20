import { PostGrid } from '../components/postGrid.js';
import { getIcon, createIconElement } from '../utils/icons.js';
import { createLink } from '../utils/dom.js';

async function loadSiteData() {
  const response = await fetch('data/site.json');
  return response.json();
}

async function renderSocialLinks(data) {
  const nav = document.querySelector('header nav');
  nav.innerHTML = '';

  data.social.forEach(link => {
    nav.appendChild(createLink(link.url, link.icon, link.name));
  });
}

async function renderPlaylists(data) {
  const nav = document.querySelector('#playlists nav');
  nav.innerHTML = '';

  data.playlists.forEach(link => {
    nav.appendChild(createLink(link.url, link.icon, link.name));
  });
}

async function renderLinks(data) {
  const ul = document.querySelector('#links ul');
  ul.innerHTML = '';

  data.links.forEach(link => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${link.url}" class="link-invert" rel="noopener">${link.text}</a>`;
    ul.appendChild(li);
  });
}

async function renderPayments(data) {
  const section = document.querySelector('#payments');
  section.innerHTML = '';

  data.payments.forEach(payment => {
    const div = document.createElement('div');
    div.className = 'payment-item';
    div.innerHTML = `
      ${getIcon(payment.icon)}
      <div>
        <p class="payment-label">${payment.label}</p>
        <p class="payment-address">${payment.address}</p>
      </div>
    `;
    section.appendChild(div);
  });
}

function renderFooter() {
  const footer = document.querySelector('footer');
  footer.innerHTML = `
    <a href="https://github.com/nicholascsmith/ncarters" aria-label="Source Code" rel="noopener">
      ${getIcon('sourceCode')}
    </a>
  `;
}

const grid = new PostGrid('.post-grid');
grid.load();

loadSiteData().then(data => {
  renderSocialLinks(data);
  renderPlaylists(data);
  renderLinks(data);
  renderPayments(data);
});

renderFooter();
