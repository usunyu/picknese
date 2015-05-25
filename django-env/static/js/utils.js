/*
 * Utils function helper
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

// return diff in arr1 but not in arr2
function arrayDiff(arr1, arr2) {
    var cache = [], diff = [];
    for (var i = 0; i < arr2.length; i++) {
        cache[arr2[i]] = true;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (!cache[arr1[i]]) {
            diff.push(arr1[i]);
        }
    }
    return diff;
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
