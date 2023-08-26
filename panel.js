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