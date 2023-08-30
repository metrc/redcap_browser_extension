base_url = '';

async function runMain() {
    // fetch the config url from storage
    let config_url = await chrome.storage.sync.get('redcap_path');
    config_url = config_url.redcap_path;

    if ((config_url == undefined) || (config_url == '')) {
        chrome.runtime.openOptionsPage();
        window.close();
    }

    // fetch the configuration file
    let config = await fetch(config_url);
    config = await config.json();

    base_url = config.base_url + 'redcap_v' + config.redcap_version + '/';
    $('#projects').autocomplete({ source: config.projects_url });

    if (config.super_user == false) {
        $('#adminLinks').hide();
    }

};

document.addEventListener('DOMContentLoaded', runMain);

document.getElementById('goToRecord').addEventListener('click', () => {
    let project_id = $( "#projects" ).val();
    let record_id = $( "#record" ).val();
    let url = base_url + 'DataEntry/record_home.php?pid=' + project_id + '&id=' + record_id;
    chrome.tabs.create({url: url});
});

document.getElementById('goToUserAdmin').addEventListener('click', () => {
    let project_id = $( "#projects" ).val();
    let url = base_url + 'UserRights/index.php?pid=' + project_id;
    chrome.tabs.create({url: url});
});

document.getElementById('goToSetup').addEventListener('click', () => {
    let project_id = $( "#projects" ).val();
    let url = base_url + 'ProjectSetup/index.php?pid=' + project_id;
    chrome.tabs.create({url: url});
});

document.getElementById('addUser').addEventListener('click', () => {
    let url = base_url + 'ControlCenter/create_user.php';
    chrome.tabs.create({url: url});
});

document.getElementById('manageEMs').addEventListener('click', () => {
    let url = base_url + 'ExternalModules/manager/control_center.php';
    chrome.tabs.create({url: url});
});

document.getElementById('goToDesign').addEventListener('click', () => {
    let project_id = $( "#projects" ).val();
    let url = base_url + 'Design/online_designer.php?pid=' + project_id;
    chrome.tabs.create({url: url});
});

document.getElementById('goToCodebook').addEventListener('click', () => {
    let project_id = $( "#projects" ).val();
    let url = base_url + 'Design/data_dictionary_codebook.php?pid=' + project_id;
    chrome.tabs.create({url: url});
});

document.getElementById('searchUsers').addEventListener('click', () => {
    let url = base_url + 'ControlCenter/view_users.php';
    chrome.tabs.create({url: url});
});