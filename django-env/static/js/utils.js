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

function getUniversityBaseURL() {
    return "/universities/";
}

function getUniversityURL(u_id) {
    return getUniversityBaseURL() + u_id + "/";
}

function getPickupBaseURL() {
    return "/pickup/requesters/";
}

function getPickupURL(u_id) {
    return getPickupBaseURL() + u_id + "/";
}

function getMyPickupBaseURL() {
    return "/pickup/mylist/"; 
}

function getMyPickupURL(u_id) {
    return getMyPickupBaseURL() + u_id + "/";
}

function getUniversityLogo(u_short) {
    return getStaticURL() + 'images/campus/' + u_short + "/logo.jpg";
}

function getUniversityWide(u_short) {
    return getStaticURL() + 'images/campus/' + u_short + "/wide.jpg";
}

function getProfileDefaultPic() {
    return getMediaURL() + 'media/default_pic.png';
}

function getGlyphiconsCarIcon() {
    return getStaticURL() + 'images/glyphicons/png/glyphicons-6-car.png';
}

function getGlyphiconsAirplaneIcon() {
    return getStaticURL() + 'images/glyphicons/png/glyphicons-39-airplane.png';
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

function splitNumberCharInString(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
        var num = str.substring(i, str.length);
        if (isInt(num)) {
            var chars = str.substring(0, i);
            result.push(chars);
            result.push(num);
            break;
        }
    }
    return result;
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

/*
 * API helper
 * --------------------------------------------------
 */
function getCurrentUserAPI() {
    return "/accounts/api/me/";
}

function getProfileImageUploadAPI() {
    return "/accounts/api/uploadimage/"
}

function getCurrentUserPickCountAPI(u_id) {
    return "/pickup/api/mylist/count/" + u_id + "/";
}

function getCurrentUserAllPickCountAPI() {
    return "/pickup/api/mylist/count/all/";
}

function getPickRequesterListAPI(u_id) {
    return "/pickup/api/requesters/" + u_id + "/";
}

function getMyPickRequestListAPI(u_id) {
    return "/pickup/api/requesters/mylist/" + u_id + "/";
}

function getMyAllPickRequestListAPI() {
    return "/pickup/api/requesters/mylist/all/";
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

function getMyPickUpListAPI(u_id) {
    return "/pickup/api/mylist/" + u_id + "/";
}

function getMyAllPickUpListAPI() {
    return "/pickup/api/mylist/all/";
}

function getPickUpCreateAPI() {
    return "/pickup/api/create/";
}

function getUniversityAPI(u_id) {
    return "/universities/api/" + u_id + "/";
}

/*
 * Flight Status API Helper
 * https://developer.flightstats.com/getting-started/
 * --------------------------------------------------
 */
function getFlightStatusAppID() {
    return '81774f6f';
}

function getFlightStatusAppKey() {
    return 'dc765dd9201598b2191f7faa0ad5ad73';
}

function getFlightStatusBaseAPI() {
    return 'https://api.flightstats.com/flex/';
}

function getFlightStatusSchedulesAPI() {
    return getFlightStatusBaseAPI() + 'schedules/rest/v1/jsonp/';
}

function getFlightStatusScheduledFlightAPI(flightnumber, year, month, day) {
    var flightnumbers = splitNumberCharInString(flightnumber);
    return getFlightStatusSchedulesAPI() + 'flight/' + flightnumbers[0] + '/' + flightnumbers[1] + '/arriving/'
        + year + '/' + month + '/' + day + '/?appId=' + getFlightStatusAppID() + '&appKey=' + getFlightStatusAppKey();
}

/*
 * Prevent Enter Submit, TODO: improve user experence
 * --------------------------------------------------
 */
$(document).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});
