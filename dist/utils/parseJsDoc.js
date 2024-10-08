"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseJsDoc;
var _doctrine = _interopRequireDefault(require("doctrine"));
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function getType(tagType) {
  if (!tagType) {
    return null;
  }
  const {
    type,
    name,
    expression,
    elements,
    applications
  } = tagType;
  switch (type) {
    case 'NameExpression':
      // {a}
      return {
        name
      };
    case 'UnionType':
      // {a|b}
      return {
        name: 'union',
        elements: elements.map(element => getType(element))
      };
    case 'AllLiteral':
      // {*}
      return {
        name: 'mixed'
      };
    case 'TypeApplication':
      // {Array<string>} or {string[]}
      return {
        name: expression.name,
        elements: applications.map(element => getType(element))
      };
    case 'ArrayType':
      // {[number, string]}
      return {
        name: 'tuple',
        elements: elements.map(element => getType(element))
      };
    default:
      {
        const typeName = name ? name : expression ? expression.name : null;
        if (typeName) {
          return {
            name: typeName
          };
        } else {
          return null;
        }
      }
  }
}
function getOptional(tag) {
  return !!(tag.type && tag.type.type && tag.type.type === 'OptionalType');
}

// Add jsdoc @return description.
function getReturnsJsDoc(jsDoc) {
  const returnTag = jsDoc.tags.find(tag => tag.title === 'return' || tag.title === 'returns');
  if (returnTag) {
    return {
      description: returnTag.description,
      type: getType(returnTag.type)
    };
  }
  return null;
}

// Add jsdoc @param descriptions.
function getParamsJsDoc(jsDoc) {
  if (!jsDoc.tags) {
    return [];
  }
  return jsDoc.tags.filter(tag => tag.title === 'param').map(tag => {
    return {
      name: tag.name,
      description: tag.description,
      type: getType(tag.type),
      optional: getOptional(tag)
    };
  });
}
function parseJsDoc(docblock) {
  const jsDoc = _doctrine.default.parse(docblock);
  return {
    description: jsDoc.description || null,
    params: getParamsJsDoc(jsDoc),
    returns: getReturnsJsDoc(jsDoc)
  };
}