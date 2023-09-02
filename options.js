
function saveOptions() {
    var configKey = document.getElementById('config_key').value;
    chrome.storage.sync.set({'config_key': configKey}, function() {
        window.close();
    });
}

function restoreOptions() {
    chrome.storage.sync.get('config_key', function(data) {
        document.getElementById('config_key').value = data.config_key;
    });

}

function showMultiProfile() {
    var multiProfile = document.getElementById("multi_profile");
    var multiProfileText = document.getElementById("multi_profile_text");
    var body = document.getElementsByTagName("body")[0];
    if (multiProfile.checked == true){
        multiProfileText.style.display = "block";
        body.style.height = "500px";
    } else {
        multiProfileText.style.display = "none";
        body.style.height = "150px";
    }
}


document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('multi_profile').addEventListener('click', showMultiProfile);
document.addEventListener('DOMContentLoaded', restoreOptions);