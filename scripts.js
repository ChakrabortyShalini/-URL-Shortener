// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shorten-form');
    const urlInput = document.getElementById('url-input');
    const resultDiv = document.getElementById('result');
    const shortUrlLink = document.getElementById('short-url');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const longUrl = urlInput.value.trim();

        if (longUrl) {
            // Simulating URL shortening by creating a fake shortened URL
            const shortUrl = `https://short.url/${Math.random().toString(36).substr(2, 8)}`;

            shortUrlLink.href = shortUrl;
            shortUrlLink.textContent = shortUrl;
            resultDiv.classList.remove('hidden');
        }
    });
});
