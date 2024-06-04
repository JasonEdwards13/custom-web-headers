// Add a callback when HTML is loaded.
document.addEventListener('DOMContentLoaded', domLoadedCallback, false);

// This is a callback method once HTML is loaded. 
function domLoadedCallback() {

    // Get already saved value of header JSON & set it in UI text area.
    chrome.storage.sync.get('domainUrl', function (items) {
        if (typeof items.domainUrl != "undefined") {
            //document.getElementById("domainUrl").value = items.domainUrl;
            let radios = document.getElementsByName('domainUrl');
            
            for (let i = 0, length = radios.length; i < length; i++) {
                if (radios[i].value == items.domainUrl) {
                    radios[i].checked = true;
                    break;
                }
            }
        }
    });

    // Get already saved value of enable checkbox & check/uncheck UI checkbox with saved value.
    chrome.storage.sync.get('headerInjectionEnable', function (items) {
        if (typeof items.headerInjectionEnable != "undefined") {
            document.getElementById("enable").checked = items.headerInjectionEnable;
        }
    });

    // Add a call back for save button 
    document.getElementById('save').addEventListener('click', function () {
        buttonClickAction();
    });
}

/**
 * Action on save. Store value of enable checkbox & header JSON in chrome storage.
 */
function buttonClickAction() {
    
    var newDomainUrl = document.querySelector('input[name=domainUrl]:checked').value;
    console.log(newDomainUrl);

    chrome.storage.sync.set({
        'domainUrl': newDomainUrl
    }, function () { });

    // console.log(document.getElementById('domainUrl').value);

    // chrome.storage.sync.set({
    //     'domainUrl': document.getElementById('domainUrl').value
    // }, function () { });

    console.log(document.getElementById("enable").checked);
    chrome.storage.sync.set({
        'headerInjectionEnable': document.getElementById("enable").checked
    }, function () { });

    chrome.tabs.update({url: "https://localhost:5001/"});
    //chrome.tabs.update({url: "https://" + newDomainUrl});
    //chrome.tabs.reload(function(){});
    window.close();
}