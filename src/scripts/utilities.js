const utils = {

    copy: function(o) {
        var _out, v, _key;
        _out = Array.isArray(o) ? [] : {};
        for (_key in o) {
            v = o[_key];
            _out[_key] = (typeof v === "object" && v !== null) ? utils.copy(v) : v;
        }
        return _out;
    },

    merge: function(oldObject, newObject, strict) {
        var obj = oldObject;
        for (var key in newObject) {
            if (typeof obj[key] === "object" && obj[key] !== null) {
                objFn.merge(obj[key], newObject[key]);
            } else {
                if (strict) {
                    if (obj.hasOwnProperty(key)) {
                        obj[key] = newObject[key];
                    }
                } else {
                    obj[key] = newObject[key];
                }
            }
        }
        return obj;
    }
};

export default utils;
