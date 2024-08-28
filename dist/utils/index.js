"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.docblock = void 0;
Object.defineProperty(exports, "getClassMemberValuePath", {
  enumerable: true,
  get: function () {
    return _getClassMemberValuePath.default;
  }
});
Object.defineProperty(exports, "getFlowType", {
  enumerable: true,
  get: function () {
    return _getFlowType.default;
  }
});
Object.defineProperty(exports, "getFlowTypeFromReactComponent", {
  enumerable: true,
  get: function () {
    return _getFlowTypeFromReactComponent.default;
  }
});
Object.defineProperty(exports, "getMemberExpressionRoot", {
  enumerable: true,
  get: function () {
    return _getMemberExpressionRoot.default;
  }
});
Object.defineProperty(exports, "getMemberValuePath", {
  enumerable: true,
  get: function () {
    return _getMemberValuePath.default;
  }
});
Object.defineProperty(exports, "getMembers", {
  enumerable: true,
  get: function () {
    return _getMembers.default;
  }
});
Object.defineProperty(exports, "getMethodDocumentation", {
  enumerable: true,
  get: function () {
    return _getMethodDocumentation.default;
  }
});
Object.defineProperty(exports, "getNameOrValue", {
  enumerable: true,
  get: function () {
    return _getNameOrValue.default;
  }
});
Object.defineProperty(exports, "getParameterName", {
  enumerable: true,
  get: function () {
    return _getParameterName.default;
  }
});
Object.defineProperty(exports, "getPropType", {
  enumerable: true,
  get: function () {
    return _getPropType.default;
  }
});
Object.defineProperty(exports, "getPropertyName", {
  enumerable: true,
  get: function () {
    return _getPropertyName.default;
  }
});
Object.defineProperty(exports, "getPropertyValuePath", {
  enumerable: true,
  get: function () {
    return _getPropertyValuePath.default;
  }
});
Object.defineProperty(exports, "getTypeAnnotation", {
  enumerable: true,
  get: function () {
    return _getTypeAnnotation.default;
  }
});
Object.defineProperty(exports, "isExportsOrModuleAssignment", {
  enumerable: true,
  get: function () {
    return _isExportsOrModuleAssignment.default;
  }
});
Object.defineProperty(exports, "isReactComponentClass", {
  enumerable: true,
  get: function () {
    return _isReactComponentClass.default;
  }
});
Object.defineProperty(exports, "isReactComponentMethod", {
  enumerable: true,
  get: function () {
    return _isReactComponentMethod.default;
  }
});
Object.defineProperty(exports, "isReactCreateClassCall", {
  enumerable: true,
  get: function () {
    return _isReactCreateClassCall.default;
  }
});
Object.defineProperty(exports, "isReactForwardRefCall", {
  enumerable: true,
  get: function () {
    return _isReactForwardRefCall.default;
  }
});
Object.defineProperty(exports, "isReactModuleName", {
  enumerable: true,
  get: function () {
    return _isReactModuleName.default;
  }
});
Object.defineProperty(exports, "isStatelessComponent", {
  enumerable: true,
  get: function () {
    return _isStatelessComponent.default;
  }
});
Object.defineProperty(exports, "match", {
  enumerable: true,
  get: function () {
    return _match.default;
  }
});
Object.defineProperty(exports, "normalizeClassDefinition", {
  enumerable: true,
  get: function () {
    return _normalizeClassDefinition.default;
  }
});
Object.defineProperty(exports, "normalizeClassDefiniton", {
  enumerable: true,
  get: function () {
    return _normalizeClassDefinition.default;
  }
});
Object.defineProperty(exports, "printValue", {
  enumerable: true,
  get: function () {
    return _printValue.default;
  }
});
Object.defineProperty(exports, "resolveExportDeclaration", {
  enumerable: true,
  get: function () {
    return _resolveExportDeclaration.default;
  }
});
Object.defineProperty(exports, "resolveToModule", {
  enumerable: true,
  get: function () {
    return _resolveToModule.default;
  }
});
Object.defineProperty(exports, "resolveToValue", {
  enumerable: true,
  get: function () {
    return _resolveToValue.default;
  }
});
var docblock = _interopRequireWildcard(require("./docblock"));
exports.docblock = docblock;
var _getClassMemberValuePath = _interopRequireDefault(require("./getClassMemberValuePath"));
var _getFlowType = _interopRequireDefault(require("./getFlowType"));
var _getFlowTypeFromReactComponent = _interopRequireDefault(require("./getFlowTypeFromReactComponent"));
var _getMemberExpressionRoot = _interopRequireDefault(require("./getMemberExpressionRoot"));
var _getMembers = _interopRequireDefault(require("./getMembers"));
var _getMemberValuePath = _interopRequireDefault(require("./getMemberValuePath"));
var _getMethodDocumentation = _interopRequireDefault(require("./getMethodDocumentation"));
var _getNameOrValue = _interopRequireDefault(require("./getNameOrValue"));
var _getParameterName = _interopRequireDefault(require("./getParameterName"));
var _getPropertyName = _interopRequireDefault(require("./getPropertyName"));
var _getPropertyValuePath = _interopRequireDefault(require("./getPropertyValuePath"));
var _getPropType = _interopRequireDefault(require("./getPropType"));
var _getTypeAnnotation = _interopRequireDefault(require("./getTypeAnnotation"));
var _isExportsOrModuleAssignment = _interopRequireDefault(require("./isExportsOrModuleAssignment"));
var _isReactComponentClass = _interopRequireDefault(require("./isReactComponentClass"));
var _isReactComponentMethod = _interopRequireDefault(require("./isReactComponentMethod"));
var _isReactCreateClassCall = _interopRequireDefault(require("./isReactCreateClassCall"));
var _isReactForwardRefCall = _interopRequireDefault(require("./isReactForwardRefCall"));
var _isReactModuleName = _interopRequireDefault(require("./isReactModuleName"));
var _isStatelessComponent = _interopRequireDefault(require("./isStatelessComponent"));
var _match = _interopRequireDefault(require("./match"));
var _normalizeClassDefinition = _interopRequireDefault(require("./normalizeClassDefinition"));
var _printValue = _interopRequireDefault(require("./printValue"));
var _resolveExportDeclaration = _interopRequireDefault(require("./resolveExportDeclaration"));
var _resolveToModule = _interopRequireDefault(require("./resolveToModule"));
var _resolveToValue = _interopRequireDefault(require("./resolveToValue"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }