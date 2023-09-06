let profile_keys = [];
let profile_names = [];

async function saveOptions() {
    var configKey = document.getElementById('config_key').value;
    await chrome.storage.sync.set({'config_key': configKey});
    saveProfiles();
    window.close();
}

async function restoreOptions() {
    chrome.storage.sync.get('config_key', function(data) {
        document.getElementById('config_key').value = data.config_key;
    });
    chrome.storage.sync.get('multi_profile', function(data) {
        document.getElementById("multi_profile").checked = data.multi_profile;
        if (data.multi_profile == true) {
            showMultiProfile();
            restoreProfiles();
        }
    });
}


async function saveProfiles() {
    for (var i = 0; i < 5; i++) {
        profile_keys[i] = document.getElementById('profile_key_' + i).value;
        profile_names[i] = document.getElementById('profile_name_' + i).value;
    }
    await chrome.storage.sync.set({'profile_keys': profile_keys});
    await chrome.storage.sync.set({'profile_names': profile_names});
}

async function restoreProfiles() {
    profile_keys = await chrome.storage.sync.get('profile_keys');
    profile_names = await chrome.storage.sync.get('profile_names');
    for (var i = 0; i < 5; i++) {
        var profileKey = document.getElementById('profile_key_' + i).value = profile_keys.profile_keys[i];
        var profileName = document.getElementById('profile_name_' + i).value = profile_names.profile_names[i];
    }
}

async function showMultiProfile() {
    var multiProfile = document.getElementById("multi_profile");
    var multiProfileText = document.getElementById("multi_profile_text");
    var singleProfileText = document.getElementById("single_profile_text");
    var profileOne = document.getElementById("profile_key_0");
    var singleProfile = document.getElementById("config_key");
    var body = document.getElementsByTagName("body")[0];
    if (multiProfile.checked == true){
        multiProfileText.style.display = "block";
        body.style.height = "500px";
        singleProfileText.style.display = "none";
        profileOne.value = singleProfile.value;
        await chrome.storage.sync.set({'multi_profile': true});
    } else {
        multiProfileText.style.display = "none";
        body.style.height = "150px";
        singleProfileText.style.display = "block";
        singleProfile.value = profileOne.value;
        await chrome.storage.sync.set({'multi_profile': false});
    }
}


document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('multi_profile').addEventListener('click', showMultiProfile);
document.addEventListener('DOMContentLoaded', restoreOptions);