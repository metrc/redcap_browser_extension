chrome.runtime.onInstalled.addListener(function (object) {
    let version = chrome.runtime.getManifest().version;

    if (object.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        chrome.tabs.create({ url: "https://pj14.co/chrome-extension/updated/?version=" + version }, function (tab) { });
    }


    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: "https://pj14.co/chrome-extension/installed/?version=" + version }, function (tab) { });
    }

});

// popup if extension is removed
let version = chrome.runtime.getManifest().version;
chrome.runtime.setUninstallURL("https://pj14.co/chrome-extension/uninstalled/?version=" + version);