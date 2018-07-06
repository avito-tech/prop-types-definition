# prop-types-definition

[![NPM version](https://img.shields.io/npm/v/prop-types-definition.svg)](https://www.npmjs.com/package/prop-types-definition)
[![Build Status](https://travis-ci.org/avito-tech/prop-types-definition.svg?branch=master)](https://travis-ci.org/avito-tech/prop-types-definition)
[![Coverage Status](https://coveralls.io/repos/github/avito-tech/prop-types-definition/badge.svg?branch=master)](https://coveralls.io/github/avito-tech/prop-types-definition?branch=master)

Patch for [prop-types](https://github.com/facebook/prop-types) to get property type definition in runtime.

[![Sponsored by Avito](avito.svg)](https://www.avito.ru/)

## Why?

When using React components, `prop-types` is commonly used to define properties type checking. Unfortunally, `prop-type` doesn't provide definition details that can be useful for documentation generation or component's playground. This library adds ability to get property type definition in runtime by calling a `getTypeDefinition()` method.

As anternative, tools like [react-docgen](https://github.com/reactjs/react-docgen) can be used. However, such tools are usualy based on static code analysis and have many [limitations](https://github.com/reactjs/react-docgen#guidelines-for-default-resolvers-and-handlers).

## Install

```
npm install prop-types-definition
```

## Usage

`prop-types-definition` can be used in two ways:

- As `prop-types` patch on demand
- As a webpack loader

When `prop-types` is patched, you can get property type definition by calling `getTypeDefinition()` method.

> NOTE: `getTypeDefinition()` method can be missed for certain cases. Usually it's a custom type cheching. You need to check that a property checking has a method `getTypeDefinition()` before invoking it.

```js
import PropTypes from 'prop-types';

// patch PropTypes somehow, see below

export default class Component extends React.Component {
    static propTypes = {
        foo: PropTypes.string,
        bar: PropTypes.number.isRequired
    }

    // ...
}

// now we can get prop-types definitions
for (let name in Component.propTypes) {
    const type = Component.propTypes[key];

    // some type definitions can have no getTypeDefinition method
    if (typeof type.getTypeDefinition === 'function') {
        console.log(key, type.getTypeDefinition());
    }
}

// output
// foo {
//     required: false,
//     type: {
//         name: 'string'
//     }
// }
// bar: {
//     required: true,
//     type: {
//         name: 'number'
//     }
// }
```

### Patch prop-type by your own

```js
import PropTypes from 'prop-types';
import patchPropTypes from 'prop-types-definition';

patchPropTypes(PropTypes);

export default class Component extends React.Component {
    static propTypes = {
        foo: PropTypes.string,
        // ...
    }

    // ...
}
```

### Using as webpack loader

`prop-types` can be patched via a webpack loader. In this case you need to add a rule for `prop-types` index file in this way:

```js
const webpackConfig = {
    // ...
    module: {
        rules: [
            {
                test: /\/prop-types\/index\.js$/i,
                loader: 'prop-types-definition/loader'
            },
            // ...
        ]
    }
};
```

## Custom property types

In case you're implementing a custom property validator and want geting a definition details, you need to add `getTypeDefinition()` method to a validator.

```js
const myCustomType = function() {
    // ...
};

myCustomType.getTypeDefinition = function() {
    return {
        type: {
            name: 'myCustomType',
            // any extra details
        }
    }
}
```

## License

MIT
