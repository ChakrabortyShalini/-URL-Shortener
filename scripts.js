document.getElementById('url-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const originalUrl = document.getElementById('original-url').value;
    
    if (!isValidUrl(originalUrl)) {
        alert('Please enter a valid URL.');
        return;
    }

    shortenUrl(originalUrl);
    document.getElementById('original-url').value = ''; // Clear the input field
});

function isValidUrl(url) {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})' + // validate domain
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(url);
}

function shortenUrl(originalUrl) {
    fetch(`https://api.tinyurl.com/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_TINYURL_API_TOKEN'
        },
        body: JSON.stringify({
            url: originalUrl,
            domain: 'tiny.one'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.tiny_url) {
            const shortUrl = data.data.tiny_url;
            saveUrl(originalUrl, shortUrl);
            displayShortUrls();
        } else {
            alert('Failed to shorten the URL. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while shortening the URL. Please try again.');
    });
}

function saveUrl(originalUrl, shortUrl) {
    const urls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    urls.push({ originalUrl, shortUrl });
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
}

function displayShortUrls() {
    const urls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>Shortened URLs</h2>';
    
    urls.forEach(urlPair => {
        const urlDiv = document.createElement('div');
        urlDiv.className = 'url-pair';
        urlDiv.innerHTML = `
            <p>Original URL: <a href="${urlPair.originalUrl}" target="_blank">${urlPair.originalUrl}</a></p>
            <p>Shortened URL: <a href="${urlPair.shortUrl}" target="_blank">${urlPair.shortUrl}</a></p>
        `;
        resultDiv.appendChild(urlDiv);
    });

    resultDiv.classList.remove('hidden');
}

// Initial display of shortened URLs when the page loads
document.addEventListener('DOMContentLoaded', displayShortUrls);
