function supportLocalStorage() {
    return typeof(Storage) !== "undefined";
}

/*
 * Alert Message
 * --------------------------------------------------
 */
function popupMessage() {
    if (!supportLocalStorage()) { return; }
    var popupMessage = localStorage.getItem("PopupMessage");
    var popupMessageType = localStorage.getItem("PopupMessageType");
    var alertType = 'alert-' + popupMessageType;
    $("#alert-messages").remove();
    var alertDom = "<div id='alert-messages' class='alert " + alertType + " text-center' role='alert'></div>";
    $("#messages").append(alertDom);
    $("#alert-messages").stop(false, true).hide().text(popupMessage)
    .slideDown("fast").delay(5000).slideUp('slow', function() {
        $(this).remove();
    });
    // clean up
    localStorage.setItem("PopupMessage", "");
    localStorage.setItem("PopupMessageType", "");
}

function preparePopupMessage(message, type) {
    if (!supportLocalStorage()) { return; }
    localStorage.setItem("PopupMessage", message);
    localStorage.setItem("PopupMessageType", type);
}

function hasPopupMessage() {
    if (!supportLocalStorage()) { return; }
    var message = localStorage.getItem("PopupMessage");
    return message != "" || message != null;
}

// deprecated
function popupSuccessMessage(message) {
    popupMessage(message, 'success');
}

function popupWarningMessage(message) {
    popupMessage(message, 'warning');
}

function popupDangerMessage(message) {
    popupMessage(message, 'danger');
}

function popupInfoMessage(message) {
    popupMessage(message, 'info');
}

/*
 * Pick Up
 * --------------------------------------------------
 */
function showPickRequestForm() {
    $('#pick-request-post').collapse('show');
}

function hidePickRequestForm() {
    $('#pick-request-post').collapse('hide');
}

/*
 * Loading
 * --------------------------------------------------
 */
function dismissLoadingEffect() {
    $("#loading").remove();
}

/*
 * Check selected tab
 * --------------------------------------------------
 */
function checkActiveTab(contain) {
    var pathname = window.location.pathname;
    if (pathname.search(contain) != -1) {
        return 'active';
    }
    return null;
}

/*
 * Bootstrap, not used
 * --------------------------------------------------
 */
function findBootstrapEnvironment() {
    var envs = ['xs', 'sm', 'md', 'lg'];

    $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        $el.addClass('hidden-'+env);
        if ($el.is(':hidden')) {
            $el.remove();
            return env;
        }
    };
}