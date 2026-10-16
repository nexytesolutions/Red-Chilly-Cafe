function convert_google_drive_image_url(image_url) {
    try {
        const url = new URL(image_url);
        const file_id = url.pathname.match(/^\/file\/d\/([A-Za-z0-9_-]+)(?:\/|$)/)?.[1];

        if (url.hostname !== "drive.google.com" || !file_id) return image_url;

        return `https://lh3.googleusercontent.com/d/${file_id}=w1000`;
    } catch {
        return image_url;
    }
}

module.exports = { convert_google_drive_image_url };
