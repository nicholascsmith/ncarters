// Auto-generates the photo grid from photos.json
fetch('photos.json')
  .then(r => r.json())
  .then(photos => {
    const grid = document.querySelector('.photo-grid');
    const section = document.getElementById('photos-section');

    // Clear manual photos
    grid.innerHTML = '';

    photos.forEach(photo => {
      const a = document.createElement('a');
      const params = new URLSearchParams({
        src: `photos/${photo.file}`,
        song: photo.song,
        artist: photo.artist,
        caption: photo.caption
      });

      // Add audio parameter if it exists
      if (photo.audio) {
        params.set('audio', photo.audio);
      }

      a.href = `photo.html?${params.toString()}`;
      a.className = 'photo-item';

      const img = document.createElement('img');
      img.src = `photos/${photo.file}`;
      img.alt = photo.caption;
      img.loading = 'lazy';

      a.appendChild(img);
      grid.appendChild(a);
    });

    section.style.display = 'block';
  })
  .catch(err => console.error('Failed to load photos:', err));
