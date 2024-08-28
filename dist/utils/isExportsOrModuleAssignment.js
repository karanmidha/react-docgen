"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isExportsOrModuleAssignment;
var _astTypes = require("ast-types");
var expressionTo = _interopRequireWildcard(require("./expressionTo"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Returns true if the expression is of form `exports.foo = ...;` or
 * `modules.exports = ...;`.
 */
function isExportsOrModuleAssignment(path) {
  if (_astTypes.namedTypes.ExpressionStatement.check(path.node)) {
    path = path.get('expression');
  }
  if (!_astTypes.namedTypes.AssignmentExpression.check(path.node) || !_astTypes.namedTypes.MemberExpression.check(path.node.left)) {
    return false;
  }
  const exprArr = expressionTo.Array(path.get('left'));
  return exprArr[0] === 'module' && exprArr[1] === 'exports' || exprArr[0] === 'exports';
}