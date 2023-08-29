base_url = '';

async function runMain() {
    // fetch the config url from storage
    let config_url = await chrome.storage.sync.get('redcap_path');
    config_url = config_url.redcap_path;

    // fetch the configuration file
    let config = await fetch(config_url);
    config = await config.json();
    console.log(config);

    base_url = config.base_url + 'redcap_v' + config.redcap_version + '/';
    $('#projects').autocomplete({ source: config.projects_url });

    if (config.super_user == false) {
        $('#submit2').hide();
        $('#submit3').hide();
        $('#addUser').hide();
        $('#manageEMs').hide();
    }



/*
    chrome.storage.sync.get('project_json_path', function(data) {

        let project_json = $.getJSON(data.project_json_path, function(data) {
            let project_list = [];
            for (let i = 0; i < data.length; i++) {
                project_list.push({"value": data[i].project_id, "label": data[i].app_title});
            }

            $( "#projects" ).autocomplete({
                source: project_list
            });
        });
    });
*/

};

document.addEventListener('DOMContentLoaded', runMain);

document.getElementById('submit').addEventListener('click', () => {
    let project_id = $( "#projects" ).val();
    let record_id = $( "#record" ).val();
    let url = base_url + 'DataEntry/record_home.php?pid=' + project_id + '&id=' + record_id;
    chrome.tabs.create({url: url});
});

document.getElementById('submit2').addEventListener('click', () => {
    let project_id = $( "#projects" ).val();
    let url = base_url + 'UserRights/index.php?pid=' + project_id;
    chrome.tabs.create({url: url});
});

document.getElementById('submit3').addEventListener('click', () => {
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