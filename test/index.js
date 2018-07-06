const assert = require('assert');
const PropTypes = require('prop-types');
const propTypesDefinitionPatch = require('..');

propTypesDefinitionPatch(PropTypes);

describe('getTypeDefinition()', function() {
    it('any', function() {
        const type = PropTypes.any;
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'any'
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'any'
            }
        });
    });

    it('array', function() {
        const type = PropTypes.array;
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'array'
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'array'
            }
        });
    });

    it('bool', function() {
        const type = PropTypes.bool;
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'bool'
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'bool'
            }
        });
    });

    it('func', function() {
        const type = PropTypes.func;
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'func'
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'func'
            }
        });
    });

    it('number', function() {
        const type = PropTypes.number;
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'number'
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'number'
            }
        });
    });

    it('object', function() {
        const type = PropTypes.object;
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'object'
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'object'
            }
        });
    });

    it('string', function() {
        const type = PropTypes.string;
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'string'
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'string'
            }
        });
    });

    it('symbol', function() {
        const type = PropTypes.symbol;
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'symbol'
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'symbol'
            }
        });
    });

    it('node', function() {
        const type = PropTypes.node;
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'node'
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'node'
            }
        });
    });

    it('element', function() {
        const type = PropTypes.element;
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'element'
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'element'
            }
        });
    });

    it('instanceOf', function() {
        const Class = function() {};
        const type = PropTypes.instanceOf(Class);
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'instanceOf',
                value: Class
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'instanceOf',
                value: Class
            }
        });
    });

    it('oneOf', function() {
        const type = PropTypes.oneOf([
            'foo',
            123
        ]);
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'oneOf',
                value: ['foo', 123]
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'oneOf',
                value: ['foo', 123]
            }
        });
    });

    describe('oneOfType', function() {
        it('basic', function() {
            const type = PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number.isRequired,
                function() {}
            ]);
            const requiredType = type.isRequired;

            assert(typeof type.getTypeDefinition, 'function');
            assert(typeof requiredType.getTypeDefinition, 'function');

            assert.deepEqual(type.getTypeDefinition(), {
                required: false,
                type: {
                    name: 'oneOfType',
                    value: [
                        {
                            required: false,
                            type: {
                                name: 'string'
                            }
                        },
                        {
                            required: true,
                            type: {
                                name: 'number'
                            }
                        },
                        {
                            name: 'custom'
                        }
                    ]
                }
            });
            assert.deepEqual(requiredType.getTypeDefinition(), {
                required: true,
                type: {
                    name: 'oneOfType',
                    value: [
                        {
                            required: false,
                            type: {
                                name: 'string'
                            }
                        },
                        {
                            required: true,
                            type: {
                                name: 'number'
                            }
                        },
                        {
                            name: 'custom'
                        }
                    ]
                }
            });
        });

        it('should not crash on non-array as a value', function() {
            const type = PropTypes.oneOfType('boo');

            assert(typeof type.getTypeDefinition, 'function');

            assert.deepEqual(type.getTypeDefinition(), {
                required: false,
                type: {
                    name: 'oneOfType',
                    value: []
                }
            });
        });

    });

    it('arrayOf', function() {
        const type = PropTypes.arrayOf(PropTypes.string);
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'arrayOf',
                value: {
                    required: false,
                    type: {
                        name: 'string'
                    }
                }
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'arrayOf',
                value: {
                    required: false,
                    type: {
                        name: 'string'
                    }
                }
            }
        });
    });

    it('objectOf', function() {
        const type = PropTypes.objectOf(PropTypes.number);
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'objectOf',
                value: {
                    required: false,
                    type: {
                        name: 'number'
                    }
                }
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'objectOf',
                value: {
                    required: false,
                    type: {
                        name: 'number'
                    }
                }
            }
        });
    });

    it('shape', function() {
        const type = PropTypes.shape({
            foo: PropTypes.string,
            bar: PropTypes.number.isRequired,
            baz: function() {}
        });
        const requiredType = type.isRequired;

        assert(typeof type.getTypeDefinition, 'function');
        assert(typeof requiredType.getTypeDefinition, 'function');

        assert.deepEqual(type.getTypeDefinition(), {
            required: false,
            type: {
                name: 'shape',
                value: {
                    foo: {
                        required: false,
                        type: {
                            name: 'string'
                        }
                    },
                    bar: {
                        required: true,
                        type: {
                            name: 'number'
                        }
                    },
                    baz: {
                        name: 'custom'
                    }
                }
            }
        });
        assert.deepEqual(requiredType.getTypeDefinition(), {
            required: true,
            type: {
                name: 'shape',
                value: {
                    foo: {
                        required: false,
                        type: {
                            name: 'string'
                        }
                    },
                    bar: {
                        required: true,
                        type: {
                            name: 'number'
                        }
                    },
                    baz: {
                        name: 'custom'
                    }
                }
            }
        });
    });

    describe('edge cases', function() {
        it('unknown type', function() {
            const type = PropTypes.oneOfType([
                /regexp/
            ]);

            assert(typeof type.getTypeDefinition, 'function');

            assert.deepEqual(type.getTypeDefinition(), {
                required: false,
                type: {
                    name: 'oneOfType',
                    value: [
                        {
                            name: 'unknown'
                        }
                    ]
                }
            });
        });

        it('falsy type', function() {
            const type = PropTypes.oneOfType([
                null
            ]);

            assert(typeof type.getTypeDefinition, 'function');

            assert.deepEqual(type.getTypeDefinition(), {
                required: false,
                type: {
                    name: 'oneOfType',
                    value: [
                        {
                            name: 'unknown'
                        }
                    ]
                }
            });
        });
    })
});
