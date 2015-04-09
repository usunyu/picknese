/*
 * Static, Media, URL helper
 * --------------------------------------------------
 */
function getStaticURL() {
    if (production) {
        // set for production
        return 'https://picknese-s3.s3.amazonaws.com/';
    } else {
        // set for local development
        return '/static/';
    }
}

function getMediaURL() {
    if (production) {
        // set for production
        return 'https://picknese-s3.s3.amazonaws.com/';
    } else {
        // set for local development
        return '/';
    }
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