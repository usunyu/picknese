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

function trueValue(v) {
    return typeof v !== 'undefined' && v !== 'None' ? v : '';
}
