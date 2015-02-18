/*
 * Static, Media, URL helper
 * --------------------------------------------------
 */
function getStaticURL() {
    // set for local development
    return '/static/';
    // set for production
    // return 'https://picknese-s3.s3.amazonaws.com/';
}

function getMediaURL() {
    // set for local development
    return '/';
    // set for production
    // return 'https://picknese-s3.s3.amazonaws.com/';
}

function getUniversityLogo(u_short) {
    return getStaticURL() + 'images/campus/' + u_short + "/logo.jpg";
}

function getUniversityWide(u_short) {
    return getStaticURL() + 'images/campus/' + u_short + "/wide.jpg";
}

function getUniversityURL(u_id) {
    return "/universities/" + u_id + "/";
}

function getPickupURL(u_id) {
    return "/pickup/requesters/" + u_id + "/";
}

function getProfileDefaultPic() {
    return getMediaURL() + 'media/default_pic.png';
}

/*
 * Util function helper
 * --------------------------------------------------
 */
function isInt(n) {
    if((parseFloat(n) == parseInt(n)) && !isNaN(n)){
        return true;
    } else { 
        return false;
    }
}

function parseLastNumberInURLPath() {
    var path = window.location.pathname;
    var res = path.split("/");
    for (var i = res.length - 1; i >= 0; i--) {
        if (isInt(res[i])) {
            return res[i];
        }
    }
    return null;
}

/*
 * Alert Message
 * --------------------------------------------------
 */
function popupMessage(message, type) {
    var alertType = 'alert-' + type;
    $("#alert-messages").remove();
    var alertDom = "<div id='alert-messages' class='alert " + alertType + " text-center' role='alert'></div>";
    $("#messages").append(alertDom);
    $("#alert-messages").stop(false, true).hide().text(message)
    .slideDown("fast").delay(5000).slideUp('slow', function() {
        $(this).remove();
    });
}

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
 * API helper
 * --------------------------------------------------
 */
function getCurrentUserAPI() {
    return "/accounts/api/me/";
}

function getPickRequesterListAPI(u_id) {
    return "/pickup/api/requesters/" + u_id + "/";
}

function getPickRequesterCreateAPI() {
    return "/pickup/api/requesters/create/";
}

function getPickRequesterMutateAPI(r_id) {
    return "/pickup/api/requesters/mutate/" + r_id + "/";
}

function getPickUpListAPI(u_id) {
    return "/pickup/api/" + u_id + "/";
}

function getPickUpCreateAPI() {
    return "/pickup/api/create/";
}

function getUniversityAPI(u_id) {
    return "/universities/api/" + u_id + "/";
}
