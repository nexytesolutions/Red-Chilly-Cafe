export function convertGoogleDriveImageUrl(imageUrl: string): string {
  try {
    const url = new URL(imageUrl);
    const fileId = url.pathname.match(/^\/file\/d\/([A-Za-z0-9_-]+)(?:\/|$)/)?.[1];

    if (url.hostname !== 'drive.google.com' || !fileId) return imageUrl;

    return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
  } catch {
    return imageUrl;
  }
}
