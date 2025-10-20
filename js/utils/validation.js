import { FILE_LIMITS } from '../config.js';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_AUDIO_TYPES = ['audio/mp3', 'audio/mpeg', 'audio/mp4', 'audio/x-m4a'];

export function validateToken(token) {
  if (!token || token.trim().length === 0) {
    return { valid: false, error: 'Password is required' };
  }
  return { valid: true };
}

export function validatePhoto(file) {
  if (!file) {
    return { valid: false, error: 'Photo is required' };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Photo must be JPEG, PNG, GIF, or WebP' };
  }

  if (file.size > FILE_LIMITS.MAX_PHOTO_SIZE) {
    return {
      valid: false,
      error: `Photo must be under ${(FILE_LIMITS.MAX_PHOTO_SIZE / 1024 / 1024).toFixed(0)}MB`
    };
  }

  return { valid: true };
}

export function validateAudio(file) {
  if (!file) {
    return { valid: true };
  }

  if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
    return { valid: false, error: 'Audio must be MP3 or M4A' };
  }

  if (file.size > FILE_LIMITS.MAX_AUDIO_SIZE) {
    return {
      valid: false,
      error: `Audio must be under ${(FILE_LIMITS.MAX_AUDIO_SIZE / 1024 / 1024).toFixed(0)}MB`
    };
  }

  return { valid: true };
}

export function validateText(text, fieldName, maxLength = FILE_LIMITS.MAX_TEXT_LENGTH) {
  if (!text || text.trim().length === 0) {
    return { valid: true };
  }

  if (text.length > maxLength) {
    return {
      valid: false,
      error: `${fieldName} must be under ${maxLength} characters`
    };
  }

  return { valid: true };
}

export function validateMusicFields(song, artist, hasAudio) {
  if (!hasAudio) {
    return { valid: true };
  }

  if ((!song || song.trim().length === 0) && (!artist || artist.trim().length === 0)) {
    return {
      valid: false,
      error: 'Song title or artist name required when uploading audio'
    };
  }

  return { valid: true };
}

export function validateUploadForm(formData) {
  const errors = [];

  const tokenValidation = validateToken(formData.token);
  if (!tokenValidation.valid) errors.push(tokenValidation.error);

  const photoValidation = validatePhoto(formData.photo);
  if (!photoValidation.valid) errors.push(photoValidation.error);

  const audioValidation = validateAudio(formData.audio);
  if (!audioValidation.valid) errors.push(audioValidation.error);

  const songValidation = validateText(formData.song, 'Song title');
  if (!songValidation.valid) errors.push(songValidation.error);

  const artistValidation = validateText(formData.artist, 'Artist name');
  if (!artistValidation.valid) errors.push(artistValidation.error);

  const musicValidation = validateMusicFields(formData.song, formData.artist, !!formData.audio);
  if (!musicValidation.valid) errors.push(musicValidation.error);

  return {
    valid: errors.length === 0,
    errors
  };
}
