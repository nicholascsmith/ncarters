import { FILE_LIMITS, UPLOAD } from '../config.js';

export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function convertToJPG(file) {
  const dataUrl = await readFile(file);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');

      let { width, height } = img;
      const maxSize = UPLOAD.IMAGE_MAX_DIMENSION;

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(resolve, 'image/jpeg', UPLOAD.IMAGE_QUALITY);
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

export async function blobToBase64(blob) {
  const dataUrl = await readFile(blob);
  return dataUrl.split(',')[1];
}

export function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function validateFileSize(file, maxSize) {
  if (!file) return { valid: true };

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File must be under ${(maxSize / 1024 / 1024).toFixed(0)}MB`
    };
  }

  return { valid: true };
}

export function generateRandomFilename(prefix, extension) {
  const randomId = Math.random().toString(36).substring(2, 10);
  return `${prefix}${randomId}.${extension}`;
}

export function createAudioFilename(artist, song, extension) {
  if (!artist || !song) {
    return generateRandomFilename('audio', extension);
  }

  const sanitize = (str) => str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[(),.]/g, '')
    .replace(/feat\.|featuring/gi, 'feat')
    .replace(/&/g, 'and')
    .replace(/[/\\:*?"<>|]/g, '');

  const cleanArtist = sanitize(artist);
  const cleanSong = sanitize(song);

  if (!cleanArtist || !cleanSong) {
    return generateRandomFilename('audio', extension);
  }

  const filename = `${cleanArtist}-${cleanSong}.${extension}`;

  // Fallback to random if too long
  if (filename.length > 200) {
    return generateRandomFilename('audio', extension);
  }

  return filename;
}
