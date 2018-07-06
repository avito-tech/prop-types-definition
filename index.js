// NOTE: all the code must be inside this function,
// since a webpack loader is using stringified version of it to patch prop-types
module.exports = function(ReactPropTypes) {
    function unwrapValueItem(value) {
        if (value) {
            if (typeof value.getTypeDefinition === 'function') {
                return value.getTypeDefinition();
            }

            if (typeof value === 'function') {
                return { name: 'custom' };
            }
        }

        return { name: 'unknown' };
    }

    function wrapFunction(fn, name, value, getTypeDefinition) {
        fn.getTypeDefinition = getTypeDefinition.bind(null, name, false, value);

        if (fn.isRequired) {
            fn.isRequired.getTypeDefinition = getTypeDefinition.bind(null, name, true, value);
        }

        return fn;
    }

    function wrapMethod(dict, name, getTypeDefinition) {
        var orig = dict[name];

        dict[name] = function(value) {
            return wrapFunction(orig.apply(this, arguments), name, value, getTypeDefinition);
        };
    }

    for (var method in ReactPropTypes) {
        switch (method) {
            case 'any':
            case 'array':
            case 'bool':
            case 'func':
            case 'number':
            case 'object':
            case 'string':
            case 'symbol':
            case 'node':
            case 'element':
                wrapFunction(ReactPropTypes[method], method, null, function(name, required) {
                    return {
                        type: { name: name },
                        required: required
                    };
                });
                break;

            case 'instanceOf':
            case 'oneOf':
                wrapMethod(ReactPropTypes, method, function(name, required, value) {
                    return {
                        type: {
                            name: name,
                            value: value
                        },
                        required: required
                    };
                });
                break;

            case 'oneOfType':
                wrapMethod(ReactPropTypes, method, function(name, required, value) {
                    return {
                        type: {
                            name: name,
                            value: Array.isArray(value) ? value.map(unwrapValueItem) : []
                        },
                        required: required
                    };
                });
                break;

            case 'arrayOf':
            case 'objectOf':
                wrapMethod(ReactPropTypes, method, function(name, required, value) {
                    return {
                        type: {
                            name: name,
                            value: unwrapValueItem(value)
                        },
                        required: required
                    };
                });
                break;

            case 'shape':
                wrapMethod(ReactPropTypes, method, function(name, required, value) {
                    var unwrapped = {};

                    for (var key in value) {
                        unwrapped[key] = unwrapValueItem(value[key]);
                    }

                    return {
                        type: {
                            name: name,
                            value: unwrapped
                        },
                        required: required
                    };
                });
                break;
        }
    }
};
