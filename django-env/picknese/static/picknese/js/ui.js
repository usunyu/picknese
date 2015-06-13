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
    var alertDom =
        "<div id='alert-messages' class='alert " + alertType + " text-center' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "</div>";
    $("#messages").append(alertDom);
    $("#alert-messages").stop(false, true).hide().append(popupMessage)
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
