base_url = '';
multiProfile = false;
is_system_admin = false;
profile_keys = [];
profile_names = [];
extra_config = [];
config_data = [];

async function runMain() {
    multiProfile = await chrome.storage.sync.get('multi_profile');

    if (!multiProfile.multi_profile) {
        let config_key = await chrome.storage.sync.get('config_key');


        if ((config_key.config_key === undefined) || (config_key.config_key == '')) {
            chrome.runtime.openOptionsPage();
            window.close();
            return;
        }
        document.getElementById("profileoptions").style.display = "none";

        config_data = config_key.config_key.toString().split('|', 6);

        base_url = config_data[0] + 'redcap_v' + config_data[1] + '/';
        projects_url = base_url + 'ExternalModules/?prefix='+config_data[2]+'&page=projects&pid='+config_data[3]+
            '&NOAUTH&api_token='+config_data[4];

        $('#projects').autocomplete({ source: projects_url });
        getExtraConfig();

        if ((config_data[5] == 1) || (extra_config.system_admin)) {
            is_system_admin = true;
            $('#adminLinks').show();
        }

    } else {
        profile_keys = await chrome.storage.sync.get('profile_keys');
        profile_names = await chrome.storage.sync.get('profile_names');

        if ((profile_keys.profile_keys[0] === undefined) || (profile_keys.profile_keys[0] == '')) {
            chrome.runtime.openOptionsPage();
            window.close();
            return;
        }
        document.getElementById("profileoptions").style.display = "block";
        // populate the dropdown
        let profile_dropdown = document.getElementById("profile");
        var options = [];
        for (var i = 0; i < 5; i++) {
            options[i] = { value: i+1, label: profile_names.profile_names[i] };
        }
        $('#profile').autocomplete({ source: options });
    }
};

async function profileOnChange() {
    profile = $('#profile').val();
    profile = profile - 1;

    config_data = profile_keys.profile_keys[profile].split('|', 6);
    base_url = config_data[0] + 'redcap_v' + config_data[1] + '/';

    projects_url = base_url + 'ExternalModules/?prefix='+config_data[2]+'&page=projects&pid='+config_data[3]+
        '&NOAUTH&api_token='+config_data[4];

    $('#projects').autocomplete({ source: projects_url });
    getExtraConfig();
    if ((config_data[5] == 1) || (extra_config.system_admin)) {
        is_system_admin = true;
        $('#adminLinks').show();
    }
}

function checkForDefaultProfile() {
    if (multiProfile.multi_profile) {
        if ($('#profile').val() == '') {
            $('#profile').val('1');
            profileOnChange();
        }
    }
}

async function getExtraConfig() {
    connection = await fetch(base_url + 'ExternalModules/?prefix='+config_data[2]+'&page=extraconfig&pid='+config_data[3]+
        '&NOAUTH&api_token='+config_data[4]);
    extra_config = await connection.json();
}

async function changeProjects() {
    console.log(is_system_admin);
    project_id = document.getElementById('projects').value;
    document.getElementById('projectLinks').style.display = 'block';

    if (is_system_admin) {
        $('#goToUserAdmin').show();
        $('#goToDesign').show();
    }

    if (!jQuery.isEmptyObject(extra_config)) {

        if (extra_config.project_data[project_id].user_rights == 1) {
            $('#goToUserAdmin').show();
        } else {
            $('#goToUserAdmin').hide();
        }
        if (extra_config.project_data[project_id].design == 1) {
            $('#goToDesign').show();
        } else {
            $('#goToDesign').hide();
        }

        document.getElementById('newRecord').style.display = 'inline-block';
        setNewHandler();

    }

}

document.addEventListener('DOMContentLoaded', runMain);
document.getElementById('profile').addEventListener('change', profileOnChange);
document.getElementById('projects').addEventListener('change', changeProjects);
document.getElementById('projects').addEventListener('click', checkForDefaultProfile);

document.getElementById('goToRecord').addEventListener('click', () => {
    checkForDefaultProfile()
    let project_id = $( "#projects" ).val();
    let record_id = $( "#record" ).val();
    let url = base_url + 'DataEntry/record_home.php?pid=' + project_id + '&id=' + record_id;
    chrome.tabs.create({url: url});
});

document.getElementById('goToUserAdmin').addEventListener('click', () => {
    checkForDefaultProfile()
    let project_id = $( "#projects" ).val();
    let url = base_url + 'UserRights/index.php?pid=' + project_id;
    chrome.tabs.create({url: url});
});

document.getElementById('goToHome').addEventListener('click', () => {
    checkForDefaultProfile()
    let project_id = $( "#projects" ).val();
    let url = base_url + '/index.php?pid=' + project_id;
    chrome.tabs.create({url: url});
});

document.getElementById('addUser').addEventListener('click', () => {
    checkForDefaultProfile()
    let url = base_url + 'ControlCenter/create_user.php';
    chrome.tabs.create({url: url});
});

document.getElementById('manageEMs').addEventListener('click', () => {
    checkForDefaultProfile()
    let url = base_url + 'ExternalModules/manager/control_center.php';
    chrome.tabs.create({url: url});
});

document.getElementById('goToDesign').addEventListener('click', () => {
    checkForDefaultProfile()
    let project_id = $( "#projects" ).val();
    let url = base_url + 'Design/online_designer.php?pid=' + project_id;
    chrome.tabs.create({url: url});
});

document.getElementById('searchUsers').addEventListener('click', () => {
    checkForDefaultProfile()
    let url = base_url + 'ControlCenter/view_users.php';
    chrome.tabs.create({url: url});
});

function setNewHandler() {
    document.getElementById('newRecord').addEventListener('click', () => {
        checkForDefaultProfile()
        let project_id = $("#projects").val();
        let url = base_url + 'ExternalModules/?prefix=' + config_data[2] + '&page=newrec&pid=' + config_data[3] +
            '&NOAUTH&api_token=' + config_data[4] + '&target_project=' + project_id;
        chrome.tabs.create({url: url});
    });
}