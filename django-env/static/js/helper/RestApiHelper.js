/*
 * REST API helper
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