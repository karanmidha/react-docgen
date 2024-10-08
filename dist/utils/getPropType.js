"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPropType;
var _astTypes = require("ast-types");
var _docblock = require("../utils/docblock");
var _getMembers = _interopRequireDefault(require("./getMembers"));
var _getPropertyName = _interopRequireDefault(require("./getPropertyName"));
var _isRequiredPropType = _interopRequireDefault(require("../utils/isRequiredPropType"));
var _printValue = _interopRequireDefault(require("./printValue"));
var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));
var _resolveObjectKeysToArray = _interopRequireDefault(require("./resolveObjectKeysToArray"));
var _resolveObjectValuesToArray = _interopRequireDefault(require("./resolveObjectValuesToArray"));
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/*eslint no-use-before-define: 0*/

function getEnumValues(path) {
  const values = [];
  path.get('elements').each(function (elementPath) {
    if (_astTypes.namedTypes.SpreadElement.check(elementPath.node)) {
      const value = (0, _resolveToValue.default)(elementPath.get('argument'));
      if (_astTypes.namedTypes.ArrayExpression.check(value.node)) {
        // if the SpreadElement resolved to an Array, add all their elements too
        return values.push(...getEnumValues(value));
      } else {
        // otherwise we'll just print the SpreadElement itself
        return values.push({
          value: (0, _printValue.default)(elementPath),
          computed: !_astTypes.namedTypes.Literal.check(elementPath.node)
        });
      }
    }

    // try to resolve the array element to it's value
    const value = (0, _resolveToValue.default)(elementPath);
    return values.push({
      value: (0, _printValue.default)(value),
      computed: !_astTypes.namedTypes.Literal.check(value.node)
    });
  });
  return values;
}
function getPropTypeOneOf(argumentPath) {
  const type = {
    name: 'enum'
  };
  let value = (0, _resolveToValue.default)(argumentPath);
  if (!_astTypes.namedTypes.ArrayExpression.check(value.node)) {
    value = (0, _resolveObjectKeysToArray.default)(value) || (0, _resolveObjectValuesToArray.default)(value);
    if (value) {
      type.value = getEnumValues(value);
    } else {
      // could not easily resolve to an Array, let's print the original value
      type.computed = true;
      type.value = (0, _printValue.default)(argumentPath);
    }
  } else {
    type.value = getEnumValues(value);
  }
  return type;
}
function getPropTypeOneOfType(argumentPath) {
  const type = {
    name: 'union'
  };
  if (!_astTypes.namedTypes.ArrayExpression.check(argumentPath.node)) {
    type.computed = true;
    type.value = (0, _printValue.default)(argumentPath);
  } else {
    type.value = argumentPath.get('elements').map(function (itemPath) {
      const descriptor = getPropType(itemPath);
      const docs = (0, _docblock.getDocblock)(itemPath);
      if (docs) {
        descriptor.description = docs;
      }
      return descriptor;
    });
  }
  return type;
}
function getPropTypeArrayOf(argumentPath) {
  const type = {
    name: 'arrayOf'
  };
  const docs = (0, _docblock.getDocblock)(argumentPath);
  if (docs) {
    type.description = docs;
  }
  const subType = getPropType(argumentPath);
  if (subType.name === 'unknown') {
    type.value = (0, _printValue.default)(argumentPath);
    type.computed = true;
  } else {
    type.value = subType;
  }
  return type;
}
function getPropTypeObjectOf(argumentPath) {
  const type = {
    name: 'objectOf'
  };
  const docs = (0, _docblock.getDocblock)(argumentPath);
  if (docs) {
    type.description = docs;
  }
  const subType = getPropType(argumentPath);
  if (subType.name === 'unknown') {
    type.value = (0, _printValue.default)(argumentPath);
    type.computed = true;
  } else {
    type.value = subType;
  }
  return type;
}

/**
 * Handles shape and exact prop types
 */
function getPropTypeShapish(name, argumentPath) {
  const type = {
    name
  };
  if (!_astTypes.namedTypes.ObjectExpression.check(argumentPath.node)) {
    argumentPath = (0, _resolveToValue.default)(argumentPath);
  }
  if (_astTypes.namedTypes.ObjectExpression.check(argumentPath.node)) {
    const value = {};
    argumentPath.get('properties').each(function (propertyPath) {
      if (propertyPath.get('type').value === _astTypes.namedTypes.SpreadElement.name) {
        // It is impossible to resolve a name for a spread element
        return;
      }
      const propertyName = (0, _getPropertyName.default)(propertyPath);
      if (!propertyName) return;
      const descriptor = getPropType(propertyPath.get('value'));
      const docs = (0, _docblock.getDocblock)(propertyPath);
      if (docs) {
        descriptor.description = docs;
      }
      descriptor.required = (0, _isRequiredPropType.default)(propertyPath.get('value'));
      value[propertyName] = descriptor;
    });
    type.value = value;
  }
  if (!type.value) {
    type.value = (0, _printValue.default)(argumentPath);
    type.computed = true;
  }
  return type;
}
function getPropTypeInstanceOf(argumentPath) {
  return {
    name: 'instanceOf',
    value: (0, _printValue.default)(argumentPath)
  };
}
const simplePropTypes = ['array', 'bool', 'func', 'number', 'object', 'string', 'any', 'element', 'node', 'symbol', 'elementType'];
const propTypes = new Map([['oneOf', getPropTypeOneOf], ['oneOfType', getPropTypeOneOfType], ['instanceOf', getPropTypeInstanceOf], ['arrayOf', getPropTypeArrayOf], ['objectOf', getPropTypeObjectOf], ['shape', getPropTypeShapish.bind(null, 'shape')], ['exact', getPropTypeShapish.bind(null, 'exact')]]);

/**
 * Tries to identify the prop type by inspecting the path for known
 * prop type names. This method doesn't check whether the found type is actually
 * from React.PropTypes. It simply assumes that a match has the same meaning
 * as the React.PropTypes one.
 *
 * If there is no match, "custom" is returned.
 */
function getPropType(path) {
  let descriptor;
  (0, _getMembers.default)(path, true).some(member => {
    const node = member.path.node;
    let name;
    if (_astTypes.namedTypes.Literal.check(node)) {
      name = node.value;
    } else if (_astTypes.namedTypes.Identifier.check(node) && !member.computed) {
      name = node.name;
    }
    if (name) {
      if (simplePropTypes.includes(name)) {
        descriptor = {
          name
        };
        return true;
      } else if (propTypes.has(name) && member.argumentsPath) {
        // $FlowIssue
        descriptor = propTypes.get(name)(member.argumentsPath.get(0));
        return true;
      }
    }
  });
  if (!descriptor) {
    const node = path.node;
    if (_astTypes.namedTypes.Identifier.check(node) && simplePropTypes.includes(node.name)) {
      descriptor = {
        name: node.name
      };
    } else if (_astTypes.namedTypes.CallExpression.check(node) && _astTypes.namedTypes.Identifier.check(node.callee) && propTypes.has(node.callee.name)) {
      // $FlowIssue
      descriptor = propTypes.get(node.callee.name)(path.get('arguments', 0));
    } else {
      descriptor = {
        name: 'custom',
        raw: (0, _printValue.default)(path)
      };
    }
  }
  // $FlowIssue
  return descriptor;
}