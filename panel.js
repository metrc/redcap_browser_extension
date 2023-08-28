base_url = '';


$( function() {
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

    chrome.storage.sync.get("redcap_path", function(data) {
        base_url = data.redcap_path;
    });
});

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