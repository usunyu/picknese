var PRODUCTION = false;

/*
 * Static, Media, URL helper
 * --------------------------------------------------
 */
function getStaticURL() {
    if (PRODUCTION) {
        // set for production
        return 'https://picknese-s3.s3.amazonaws.com/';
    } else {
        // set for local development
        return '/static/';
    }
}

function getMediaURL() {
    if (PRODUCTION) {
        // set for production
        return 'https://picknese-s3.s3.amazonaws.com/';
    } else {
        // set for local development
        return '/';
    }
}

function getHomeFeedURL(u_id) {
    return "/home/" + u_id + "/";
}

function getPostRequestURL(u_id) {
    return "/home/" + u_id + "/new/";
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
    return getStaticURL() + 'university/images/' + u_short + "/logo.jpg";
}

function getUniversityWide(u_short) {
    return getStaticURL() + 'university/images/' + u_short + "/wide.jpg";
}

function getProfileDefaultPic() {
    return getMediaURL() + 'media/default_pic.png';
}

function getPusheenSadnessGif() {
    return getStaticURL() + 'picknese/images/pusheen/pusheen_sadness.gif';
}

function getPusheenHappyGif() {
    return getStaticURL() + 'picknese/images/pusheen/pusheen_happy.gif';
}

function getPusheenLazyGif() {
    return getStaticURL() + 'picknese/images/pusheen/pusheen_lazy.gif';
}

function getPusheenGangnamStyleGif() {
    return getStaticURL() + 'picknese/images/pusheen/pusheen_gangnam_style.gif';
}
