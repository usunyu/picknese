/*
 * REST API helper
 * --------------------------------------------------
 */
function getHomeFeedListAPI(u_id, type) {
    return "/home/api/" + u_id + "/" + type + "/";
}

function getAuthAPI() {
    return "/api/account/login/";
}

/*
 * Pickup Module
 * --------------------------------------------------
 */
function getFlightPickRequestCreateAPI() {
    return "/pickup/api/flight_request/create/";
}

function getFlightPickRequestMutateAPI(id) {
    return "/pickup/api/flight_request/mutate/" + id + "/";
}

function getFlightPickUpCreateAPI() {
    return "/pickup/api/flight_pickup/create/";
}

function getFlightPickUpMutateAPI(id) {
    return "/pickup/api/flight_pickup/mutate/" + id + "/";
}

function getPickRequestCreateAPI() {
    return "/pickup/api/request/create/";
}

function getPickRequestMutateAPI(id) {
    return "/pickup/api/request/mutate/" + id + "/";
}

function getPickUpCreateAPI() {
    return "/pickup/api/pickup/create/";
}

function getPickUpMutateAPI(id) {
    return "/pickup/api/pickup/mutate/" + id + "/";
}

/*
 * Profile Module
 * --------------------------------------------------
 */
function getProfileImageUploadAPI() {
    return "/profile/api/uploadimage/"
}

/*
 * Legacy
 * --------------------------------------------------
 */
// @deprecated
function getCurrentUserAPI() {
    return "/accounts/api/me/";
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
// @deprecated
function getPickRequesterCreateAPI() {
    return "/pickup/api/requesters/create/";
}
// @deprecated
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

// function getPickUpCreateAPI() {
//     return "/pickup/api/create/";
// }

function getUniversityAPI(u_id) {
    return "/universities/api/" + u_id + "/";
}

function getUniversitySimpleListAPI () {
    return "/universities/api/simplelist/";
}