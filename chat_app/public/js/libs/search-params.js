var makeOptions = function (opts) {
    if (opts === void 0) { opts = {}; }
    return ({
        arrayFormat: opts.arrayFormat || 'none',
        booleanFormat: opts.booleanFormat || 'none',
        nullFormat: opts.nullFormat || 'default'
    });
};
var encodeValue = function (value) { return encodeURIComponent(value); };
var decodeValue = function (value) { return decodeURIComponent(value); };
var encodeBoolean = function (name, value, opts) {
    if (opts.booleanFormat === 'empty-true' && value) {
        return name;
    }
    var encodedValue;
    if (opts.booleanFormat === 'unicode') {
        encodedValue = value ? '✓' : '✗';
    }
    else {
        encodedValue = value.toString();
    }
    return name + "=" + encodedValue;
};
var encodeNull = function (name, opts) {
    if (opts.nullFormat === 'hidden') {
        return '';
    }
    if (opts.nullFormat === 'string') {
        return name + "=null";
    }
    return name;
};
var getNameEncoder = function (opts) {
    if (opts.arrayFormat === 'index') {
        return function (name, index) { return name + "[" + index + "]"; };
    }
    if (opts.arrayFormat === 'brackets') {
        return function (name) { return name + "[]"; };
    }
    return function (name) { return name; };
};
var encodeArray = function (name, arr, opts) {
    var encodeName = getNameEncoder(opts);
    return arr
        .map(function (val, index) { return encodeName(name, index) + "=" + encodeValue(val); })
        .join('&');
};
var encode = function (name, value, opts) {
    if (value === null) {
        return encodeNull(name, opts);
    }
    if (typeof value === 'boolean') {
        return encodeBoolean(name, value, opts);
    }
    if (Array.isArray(value)) {
        return encodeArray(name, value, opts);
    }
    return name + "=" + encodeValue(value);
};
var decode = function (value, opts) {
    if (value === undefined) {
        return opts.booleanFormat === 'empty-true' ? true : null;
    }
    if (opts.booleanFormat === 'string') {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
    }
    else if (opts.booleanFormat === 'unicode') {
        if (value === '✓') {
            return true;
        }
        if (value === '✗') {
            return false;
        }
    }
    else if (opts.nullFormat === 'string') {
        if (value === 'null') {
            return null;
        }
    }
    return decodeValue(value);
};

var getSearch = function (path) {
    var pos = path.indexOf('?');
    if (pos === -1) {
        return path;
    }
    return path.slice(pos + 1);
};
var isSerialisable = function (val) { return val !== undefined; };
var parseName = function (name) {
    var bracketPosition = name.indexOf('[');
    var hasBrackets = bracketPosition !== -1;
    return {
        hasBrackets: hasBrackets,
        name: hasBrackets ? name.slice(0, bracketPosition) : name
    };
};

/**
 * Parse a querystring and return an object of parameters
 */
var parse = function (path, opts) {
    var options = makeOptions(opts);
    return getSearch(path)
        .split('&')
        .reduce(function (params, param) {
        var _a = param.split('='), rawName = _a[0], value = _a[1];
        var _b = parseName(rawName), hasBrackets = _b.hasBrackets, name = _b.name;
        var currentValue = params[name];
        var decodedValue = decode(value, options);
        if (currentValue === undefined) {
            params[name] = hasBrackets ? [decodedValue] : decodedValue;
        }
        else {
            params[name] = [].concat(currentValue, decodedValue);
        }
        return params;
    }, {});
};
/**
 * Build a querystring from an object of parameters
 */
var build = function (params, opts) {
    var options = makeOptions(opts);
    return Object.keys(params)
        .filter(function (paramName) { return isSerialisable(params[paramName]); })
        .map(function (paramName) { return encode(paramName, params[paramName], options); })
        .filter(Boolean)
        .join('&');
};
/**
 * Remove a list of parameters from a querystring
 */
var omit = function (path, paramsToOmit, opts) {
    var options = makeOptions(opts);
    var searchPart = getSearch(path);
    if (searchPart === '') {
        return {
            querystring: '',
            removedParams: {}
        };
    }
    var _a = path.split('&').reduce(function (_a, chunk) {
        var left = _a[0], right = _a[1];
        var rawName = chunk.split('=')[0];
        var name = parseName(rawName).name;
        return paramsToOmit.indexOf(name) === -1
            ? [left.concat(chunk), right]
            : [left, right.concat(chunk)];
    }, [[], []]), kept = _a[0], removed = _a[1];
    return {
        querystring: kept.join('&'),
        removedParams: parse(removed.join('&'), options)
    };
};
/**
 * Remove a list of parameters from a querystring
 */
var keep = function (path, paramsToKeep, opts) {
    var options = makeOptions(opts);
    var searchPart = getSearch(path);
    if (searchPart === '') {
        return {
            keptParams: {},
            querystring: ''
        };
    }
    var _a = path.split('&').reduce(function (_a, chunk) {
        var left = _a[0], right = _a[1];
        var rawName = chunk.split('=')[0];
        var name = parseName(rawName).name;
        return paramsToKeep.indexOf(name) >= 0
            ? [left.concat(chunk), right]
            : [left, right.concat(chunk)];
    }, [[], []]), kept = _a[0], removed = _a[1];
    return {
        keptParams: parse(kept.join('&'), options),
        querystring: kept.join('&')
    };
};

export { parse, build, omit, keep };
