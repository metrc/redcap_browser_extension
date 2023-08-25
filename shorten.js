async function getURL() {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let url = tab.url;

    // get the api key from storage
    let key = await chrome.storage.sync.get('api_key');
    let apiKey = key.api_key;

    if (apiKey === undefined) {
        document.getElementById('short_url').innerHTML = "<strong>API Key not set!</strong>";
        document.getElementById('copy').style.display = "none";
        chrome.runtime.openOptionsPage();
    }


    // get the shortened url
    let response = await fetch(`https://pj14.co/api/`, {
        method: 'POST',
        body: JSON.stringify({
                "long_url": url,
                "key": apiKey,
                "action": "newshort"
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`);
    }

    // fetch the data from the response
    let responseText = await response.json();

    if (responseText.error) {
        document.getElementById('short_url').innerHTML = "<strong>" + responseText.error + "</strong>";
        document.getElementById('copy').style.display = "none";

        if (responseText.error == "Invalid API key") {
            chrome.runtime.openOptionsPage();
        }

        return;
    } else if (responseText.short_url) {
        short_url = 'https://pj14.co/' + responseText.short_url;
        html = `<a href="${short_url}" target="_blank">${short_url}</a>`;
        document.getElementById('short_url').innerHTML = html;
    }

}

    // copy the shortened url to clipboard
    document.getElementById('copy').addEventListener('click', () => {
        navigator.clipboard.writeText(short_url);
    });


document.addEventListener('DOMContentLoaded', getURL);