/*
 * REST API helper
 * --------------------------------------------------
 */
function getHomeFeedListAPI(id, type) {
    return "/home/api/" + id + "/" + type + "/";
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
function getProfileRequestAPI(id, type) {
    return "/profile/api/request/" + id +"/" + type + "/";
}

function getProfileOfferAPI(id, type) {
    return "/profile/api/offer/" + id +"/" + type + "/";
}

function getProfileInfoUpdateAPI() {
    return "/profile/api/updateprofile/";
}

function getProfileImageUploadAPI() {
    return "/profile/api/uploadimage/";
}

/*
 * Message Module
 * --------------------------------------------------
 */
function getMessageListAPI(type) {
    return "/message/api/list/" + type + "/";
}

function getMessageReplyListAPI(id) {
    return "/message/api/reply/list/" + id + "/";
}

function getMessageCreateAPI() {
    return "/message/api/create/";
}

function getMessageReplyCreateAPI() {
    return "/message/api/reply/create/";
}

function getMessageUnreadDeleteAPI(id) {
    return "/message/api/read/" + id +"/";
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

function getMyPickRequestListAPI(u_id) {
    return "/pickup/api/requesters/mylist/" + u_id + "/";
}

function getMyAllPickRequestListAPI() {
    return "/pickup/api/requesters/mylist/all/";
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