"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findExportedComponentDefinitions;
var _astTypes = require("ast-types");
var _isExportsOrModuleAssignment = _interopRequireDefault(require("../utils/isExportsOrModuleAssignment"));
var _isReactComponentClass = _interopRequireDefault(require("../utils/isReactComponentClass"));
var _isReactCreateClassCall = _interopRequireDefault(require("../utils/isReactCreateClassCall"));
var _isReactForwardRefCall = _interopRequireDefault(require("../utils/isReactForwardRefCall"));
var _isStatelessComponent = _interopRequireDefault(require("../utils/isStatelessComponent"));
var _normalizeClassDefinition = _interopRequireDefault(require("../utils/normalizeClassDefinition"));
var _resolveExportDeclaration = _interopRequireDefault(require("../utils/resolveExportDeclaration"));
var _resolveToValue = _interopRequireDefault(require("../utils/resolveToValue"));
var _resolveHOC = _interopRequireDefault(require("../utils/resolveHOC"));
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function ignore() {
  return false;
}
function isComponentDefinition(path) {
  return (0, _isReactCreateClassCall.default)(path) || (0, _isReactComponentClass.default)(path) || (0, _isStatelessComponent.default)(path) || (0, _isReactForwardRefCall.default)(path);
}
function resolveDefinition(definition) {
  if ((0, _isReactCreateClassCall.default)(definition)) {
    // return argument
    const resolvedPath = (0, _resolveToValue.default)(definition.get('arguments', 0));
    if (_astTypes.namedTypes.ObjectExpression.check(resolvedPath.node)) {
      return resolvedPath;
    }
  } else if ((0, _isReactComponentClass.default)(definition)) {
    (0, _normalizeClassDefinition.default)(definition);
    return definition;
  } else if ((0, _isStatelessComponent.default)(definition) || (0, _isReactForwardRefCall.default)(definition)) {
    return definition;
  }
  return null;
}

/**
 * Given an AST, this function tries to find the exported component definitions.
 *
 * The component definitions are either the ObjectExpression passed to
 * `React.createClass` or a `class` definition extending `React.Component` or
 * having a `render()` method.
 *
 * If a definition is part of the following statements, it is considered to be
 * exported:
 *
 * modules.exports = Definition;
 * exports.foo = Definition;
 * export default Definition;
 * export var Definition = ...;
 */
function findExportedComponentDefinitions(ast) {
  const components = [];
  function exportDeclaration(path) {
    const definitions = (0, _resolveExportDeclaration.default)(path).reduce((acc, definition) => {
      if (isComponentDefinition(definition)) {
        acc.push(definition);
      } else {
        const resolved = (0, _resolveToValue.default)((0, _resolveHOC.default)(definition));
        if (isComponentDefinition(resolved)) {
          acc.push(resolved);
        }
      }
      return acc;
    }, []).map(definition => resolveDefinition(definition));
    if (definitions.length === 0) {
      return false;
    }
    definitions.forEach(definition => {
      if (definition && components.indexOf(definition) === -1) {
        components.push(definition);
      }
    });
    return false;
  }
  (0, _astTypes.visit)(ast, {
    visitFunctionDeclaration: ignore,
    visitFunctionExpression: ignore,
    visitClassDeclaration: ignore,
    visitClassExpression: ignore,
    visitIfStatement: ignore,
    visitWithStatement: ignore,
    visitSwitchStatement: ignore,
    visitCatchCause: ignore,
    visitWhileStatement: ignore,
    visitDoWhileStatement: ignore,
    visitForStatement: ignore,
    visitForInStatement: ignore,
    visitExportDeclaration: exportDeclaration,
    visitExportNamedDeclaration: exportDeclaration,
    visitExportDefaultDeclaration: exportDeclaration,
    visitAssignmentExpression: function (path) {
      // Ignore anything that is not `exports.X = ...;` or
      // `module.exports = ...;`
      if (!(0, _isExportsOrModuleAssignment.default)(path)) {
        return false;
      }
      // Resolve the value of the right hand side. It should resolve to a call
      // expression, something like React.createClass
      path = (0, _resolveToValue.default)(path.get('right'));
      if (!isComponentDefinition(path)) {
        path = (0, _resolveToValue.default)((0, _resolveHOC.default)(path));
        if (!isComponentDefinition(path)) {
          return false;
        }
      }
      const definition = resolveDefinition(path);
      if (definition && components.indexOf(definition) === -1) {
        components.push(definition);
      }
      return false;
    }
  });
  return components;
}