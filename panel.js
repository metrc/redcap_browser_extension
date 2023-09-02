base_url = '';

async function runMain() {
    // fetch the config url from storage
    let config_key = await chrome.storage.sync.get('config_key');

    if ((config_key.config_key == undefined) || (config_key.config_key == '')) {
        chrome.runtime.openOptionsPage();
        window.close();
    }

    config_data = config_key.config_key.toString().split('|', 6);

    base_url = config_data[0] + 'redcap_v' + config_data[1] + '/';
    projects_url = base_url + 'ExternalModules/?prefix='+config_data[2]+'&page=projects&pid='+config_data[3]+
        '&NOAUTH&api_token='+config_data[4];
    console.log(projects_url);
    $('#projects').autocomplete({ source: projects_url });

    if (config_data[5] == 0) {
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