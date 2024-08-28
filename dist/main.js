"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlers = exports.defaultHandlers = void 0;
exports.parse = defaultParse;
exports.utils = exports.resolver = void 0;
var allHandlers = _interopRequireWildcard(require("./handlers"));
exports.handlers = allHandlers;
var _parse = _interopRequireDefault(require("./parse"));
var AllResolver = _interopRequireWildcard(require("./resolver"));
exports.resolver = AllResolver;
var utils = _interopRequireWildcard(require("./utils"));
exports.utils = utils;
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

const defaultResolver = AllResolver.findExportedComponentDefinition;
const defaultHandlers = exports.defaultHandlers = [allHandlers.propTypeHandler, allHandlers.contextTypeHandler, allHandlers.childContextTypeHandler, allHandlers.propTypeCompositionHandler, allHandlers.propDocBlockHandler, allHandlers.flowTypeHandler, allHandlers.defaultPropsHandler, allHandlers.componentDocblockHandler, allHandlers.displayNameHandler, allHandlers.componentMethodsHandler, allHandlers.componentMethodsJsDocHandler];

/**
 * See `lib/parse.js` for more information about the arguments. This function
 * simply sets default values for convenience.
 *
 * The default resolver looks for *exported* `React.createClass(def)` calls
 * and expected `def` to resolve to an object expression.
 *
 * The default `handlers` look for `propTypes` and `getDefaultProps` in the
 * provided object expression, and extract prop type information, prop
 * documentation (from docblocks), default prop values and component
 * documentation (from a docblock).
 */
function defaultParse(src, resolver, handlers, options = {}) {
  if (!resolver) {
    resolver = defaultResolver;
  }
  if (!handlers) {
    handlers = defaultHandlers;
  }
  return (0, _parse.default)(String(src), resolver, handlers, options);
}