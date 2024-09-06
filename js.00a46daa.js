// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/d3-selection/src/namespaces.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xhtml = exports.default = void 0;
var xhtml = exports.xhtml = "http://www.w3.org/1999/xhtml";
var _default = exports.default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
},{}],"node_modules/d3-selection/src/namespace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespaces = _interopRequireDefault(require("./namespaces.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(name) {
  var prefix = name += "",
    i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces.default.hasOwnProperty(prefix) ? {
    space: _namespaces.default[prefix],
    local: name
  } : name; // eslint-disable-line no-prototype-builtins
}
},{"./namespaces.js":"node_modules/d3-selection/src/namespaces.js"}],"node_modules/d3-selection/src/creator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespace = _interopRequireDefault(require("./namespace.js"));
var _namespaces = require("./namespaces.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function creatorInherit(name) {
  return function () {
    var document = this.ownerDocument,
      uri = this.namespaceURI;
    return uri === _namespaces.xhtml && document.documentElement.namespaceURI === _namespaces.xhtml ? document.createElement(name) : document.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function _default(name) {
  var fullname = (0, _namespace.default)(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
},{"./namespace.js":"node_modules/d3-selection/src/namespace.js","./namespaces.js":"node_modules/d3-selection/src/namespaces.js"}],"node_modules/d3-selection/src/selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function none() {}
function _default(selector) {
  return selector == null ? none : function () {
    return this.querySelector(selector);
  };
}
},{}],"node_modules/d3-selection/src/selection/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
var _selector = _interopRequireDefault(require("../selector.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(select) {
  if (typeof select !== "function") select = (0, _selector.default)(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new _index.Selection(subgroups, this._parents);
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js","../selector.js":"node_modules/d3-selection/src/selector.js"}],"node_modules/d3-selection/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return typeof x === "object" && "length" in x ? x // Array, TypedArray, NodeList, array-like
  : Array.from(x); // Map, Set, iterable, string, or anything else
}
},{}],"node_modules/d3-selection/src/selectorAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function empty() {
  return [];
}
function _default(selector) {
  return selector == null ? empty : function () {
    return this.querySelectorAll(selector);
  };
}
},{}],"node_modules/d3-selection/src/selection/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
var _array = _interopRequireDefault(require("../array.js"));
var _selectorAll = _interopRequireDefault(require("../selectorAll.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function arrayAll(select) {
  return function () {
    var group = select.apply(this, arguments);
    return group == null ? [] : (0, _array.default)(group);
  };
}
function _default(select) {
  if (typeof select === "function") select = arrayAll(select);else select = (0, _selectorAll.default)(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new _index.Selection(subgroups, parents);
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js","../array.js":"node_modules/d3-selection/src/array.js","../selectorAll.js":"node_modules/d3-selection/src/selectorAll.js"}],"node_modules/d3-selection/src/matcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.childMatcher = childMatcher;
exports.default = _default;
function _default(selector) {
  return function () {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function (node) {
    return node.matches(selector);
  };
}
},{}],"node_modules/d3-selection/src/selection/selectChild.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _matcher = require("../matcher.js");
var find = Array.prototype.find;
function childFind(match) {
  return function () {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function _default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : (0, _matcher.childMatcher)(match)));
}
},{"../matcher.js":"node_modules/d3-selection/src/matcher.js"}],"node_modules/d3-selection/src/selection/selectChildren.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _matcher = require("../matcher.js");
var filter = Array.prototype.filter;
function children() {
  return this.children;
}
function childrenFilter(match) {
  return function () {
    return filter.call(this.children, match);
  };
}
function _default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : (0, _matcher.childMatcher)(match)));
}
},{"../matcher.js":"node_modules/d3-selection/src/matcher.js"}],"node_modules/d3-selection/src/selection/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
var _matcher = _interopRequireDefault(require("../matcher.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(match) {
  if (typeof match !== "function") match = (0, _matcher.default)(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new _index.Selection(subgroups, this._parents);
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js","../matcher.js":"node_modules/d3-selection/src/matcher.js"}],"node_modules/d3-selection/src/selection/sparse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(update) {
  return new Array(update.length);
}
},{}],"node_modules/d3-selection/src/selection/enter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnterNode = EnterNode;
exports.default = _default;
var _sparse = _interopRequireDefault(require("./sparse.js"));
var _index = require("./index.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default() {
  return new _index.Selection(this._enter || this._groups.map(_sparse.default), this._parents);
}
function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function (child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function (child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function (selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function (selector) {
    return this._parent.querySelectorAll(selector);
  }
};
},{"./sparse.js":"node_modules/d3-selection/src/selection/sparse.js","./index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return function () {
    return x;
  };
}
},{}],"node_modules/d3-selection/src/selection/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
var _enter = require("./enter.js");
var _array = _interopRequireDefault(require("../array.js"));
var _constant = _interopRequireDefault(require("../constant.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
    node,
    groupLength = group.length,
    dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
    node,
    nodeByKeyValue = new Map(),
    groupLength = group.length,
    dataLength = data.length,
    keyValues = new Array(groupLength),
    keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function _default(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex,
    parents = this._parents,
    groups = this._groups;
  if (typeof value !== "function") value = (0, _constant.default)(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
      group = groups[j],
      groupLength = group.length,
      data = (0, _array.default)(value.call(parent, parent && parent.__data__, j, parents)),
      dataLength = data.length,
      enterGroup = enter[j] = new Array(dataLength),
      updateGroup = update[j] = new Array(dataLength),
      exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }
  update = new _index.Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js","./enter.js":"node_modules/d3-selection/src/selection/enter.js","../array.js":"node_modules/d3-selection/src/array.js","../constant.js":"node_modules/d3-selection/src/constant.js"}],"node_modules/d3-selection/src/selection/exit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sparse = _interopRequireDefault(require("./sparse.js"));
var _index = require("./index.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default() {
  return new _index.Selection(this._exit || this._groups.map(_sparse.default), this._parents);
}
},{"./sparse.js":"node_modules/d3-selection/src/selection/sparse.js","./index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/selection/join.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(onenter, onupdate, onexit) {
  var enter = this.enter(),
    update = this,
    exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
},{}],"node_modules/d3-selection/src/selection/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
function _default(selection) {
  if (!(selection instanceof _index.Selection)) throw new Error("invalid merge");
  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new _index.Selection(merges, this._parents);
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/selection/order.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
},{}],"node_modules/d3-selection/src/selection/sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
function _default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new _index.Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
},{"./index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/selection/call.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
},{}],"node_modules/d3-selection/src/selection/nodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  return Array.from(this);
}
},{}],"node_modules/d3-selection/src/selection/node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}
},{}],"node_modules/d3-selection/src/selection/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}
},{}],"node_modules/d3-selection/src/selection/empty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  return !this.node();
}
},{}],"node_modules/d3-selection/src/selection/each.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
},{}],"node_modules/d3-selection/src/selection/attr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespace = _interopRequireDefault(require("../namespace.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function _default(name, value) {
  var fullname = (0, _namespace.default)(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
},{"../namespace.js":"node_modules/d3-selection/src/namespace.js"}],"node_modules/d3-selection/src/window.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView // node is a Node
  || node.document && node // node is a Window
  || node.defaultView; // node is a Document
}
},{}],"node_modules/d3-selection/src/selection/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.styleValue = styleValue;
var _window = _interopRequireDefault(require("../window.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
  };
}
function _default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || (0, _window.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}
},{"../window.js":"node_modules/d3-selection/src/window.js"}],"node_modules/d3-selection/src/selection/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function propertyRemove(name) {
  return function () {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];else this[name] = v;
  };
}
function _default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
},{}],"node_modules/d3-selection/src/selection/classed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function (name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function (name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function (name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function () {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function () {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function _default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()),
      i = -1,
      n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
},{}],"node_modules/d3-selection/src/selection/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function _default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
},{}],"node_modules/d3-selection/src/selection/html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function _default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
},{}],"node_modules/d3-selection/src/selection/raise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function _default() {
  return this.each(raise);
}
},{}],"node_modules/d3-selection/src/selection/lower.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function _default() {
  return this.each(lower);
}
},{}],"node_modules/d3-selection/src/selection/append.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("../creator.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(name) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
}
},{"../creator.js":"node_modules/d3-selection/src/creator.js"}],"node_modules/d3-selection/src/selection/insert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("../creator.js"));
var _selector = _interopRequireDefault(require("../selector.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function constantNull() {
  return null;
}
function _default(name, before) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name),
    select = before == null ? constantNull : typeof before === "function" ? before : (0, _selector.default)(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
},{"../creator.js":"node_modules/d3-selection/src/creator.js","../selector.js":"node_modules/d3-selection/src/selector.js"}],"node_modules/d3-selection/src/selection/remove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function _default() {
  return this.each(remove);
}
},{}],"node_modules/d3-selection/src/selection/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function selection_cloneShallow() {
  var clone = this.cloneNode(false),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function _default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
},{}],"node_modules/d3-selection/src/selection/datum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
},{}],"node_modules/d3-selection/src/selection/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function contextListener(listener) {
  return function (event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
      i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name: name
    };
  });
}
function onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function () {
    var on = this.__on,
      o,
      listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      options: options
    };
    if (!on) this.__on = [o];else on.push(o);
  };
}
function _default(typename, value, options) {
  var typenames = parseTypenames(typename + ""),
    i,
    n = typenames.length,
    t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}
},{}],"node_modules/d3-selection/src/selection/dispatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _window = _interopRequireDefault(require("../window.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function dispatchEvent(node, type, params) {
  var window = (0, _window.default)(node),
    event = window.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
  return function () {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function () {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
function _default(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
},{"../window.js":"node_modules/d3-selection/src/window.js"}],"node_modules/d3-selection/src/selection/iterator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function* _default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}
},{}],"node_modules/d3-selection/src/selection/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = Selection;
exports.root = exports.default = void 0;
var _select = _interopRequireDefault(require("./select.js"));
var _selectAll = _interopRequireDefault(require("./selectAll.js"));
var _selectChild = _interopRequireDefault(require("./selectChild.js"));
var _selectChildren = _interopRequireDefault(require("./selectChildren.js"));
var _filter = _interopRequireDefault(require("./filter.js"));
var _data = _interopRequireDefault(require("./data.js"));
var _enter = _interopRequireDefault(require("./enter.js"));
var _exit = _interopRequireDefault(require("./exit.js"));
var _join = _interopRequireDefault(require("./join.js"));
var _merge = _interopRequireDefault(require("./merge.js"));
var _order = _interopRequireDefault(require("./order.js"));
var _sort = _interopRequireDefault(require("./sort.js"));
var _call = _interopRequireDefault(require("./call.js"));
var _nodes = _interopRequireDefault(require("./nodes.js"));
var _node = _interopRequireDefault(require("./node.js"));
var _size = _interopRequireDefault(require("./size.js"));
var _empty = _interopRequireDefault(require("./empty.js"));
var _each = _interopRequireDefault(require("./each.js"));
var _attr = _interopRequireDefault(require("./attr.js"));
var _style = _interopRequireDefault(require("./style.js"));
var _property = _interopRequireDefault(require("./property.js"));
var _classed = _interopRequireDefault(require("./classed.js"));
var _text = _interopRequireDefault(require("./text.js"));
var _html = _interopRequireDefault(require("./html.js"));
var _raise = _interopRequireDefault(require("./raise.js"));
var _lower = _interopRequireDefault(require("./lower.js"));
var _append = _interopRequireDefault(require("./append.js"));
var _insert = _interopRequireDefault(require("./insert.js"));
var _remove = _interopRequireDefault(require("./remove.js"));
var _clone = _interopRequireDefault(require("./clone.js"));
var _datum = _interopRequireDefault(require("./datum.js"));
var _on = _interopRequireDefault(require("./on.js"));
var _dispatch = _interopRequireDefault(require("./dispatch.js"));
var _iterator = _interopRequireDefault(require("./iterator.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var root = exports.root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: _select.default,
  selectAll: _selectAll.default,
  selectChild: _selectChild.default,
  selectChildren: _selectChildren.default,
  filter: _filter.default,
  data: _data.default,
  enter: _enter.default,
  exit: _exit.default,
  join: _join.default,
  merge: _merge.default,
  selection: selection_selection,
  order: _order.default,
  sort: _sort.default,
  call: _call.default,
  nodes: _nodes.default,
  node: _node.default,
  size: _size.default,
  empty: _empty.default,
  each: _each.default,
  attr: _attr.default,
  style: _style.default,
  property: _property.default,
  classed: _classed.default,
  text: _text.default,
  html: _html.default,
  raise: _raise.default,
  lower: _lower.default,
  append: _append.default,
  insert: _insert.default,
  remove: _remove.default,
  clone: _clone.default,
  datum: _datum.default,
  on: _on.default,
  dispatch: _dispatch.default,
  [Symbol.iterator]: _iterator.default
};
var _default = exports.default = selection;
},{"./select.js":"node_modules/d3-selection/src/selection/select.js","./selectAll.js":"node_modules/d3-selection/src/selection/selectAll.js","./selectChild.js":"node_modules/d3-selection/src/selection/selectChild.js","./selectChildren.js":"node_modules/d3-selection/src/selection/selectChildren.js","./filter.js":"node_modules/d3-selection/src/selection/filter.js","./data.js":"node_modules/d3-selection/src/selection/data.js","./enter.js":"node_modules/d3-selection/src/selection/enter.js","./exit.js":"node_modules/d3-selection/src/selection/exit.js","./join.js":"node_modules/d3-selection/src/selection/join.js","./merge.js":"node_modules/d3-selection/src/selection/merge.js","./order.js":"node_modules/d3-selection/src/selection/order.js","./sort.js":"node_modules/d3-selection/src/selection/sort.js","./call.js":"node_modules/d3-selection/src/selection/call.js","./nodes.js":"node_modules/d3-selection/src/selection/nodes.js","./node.js":"node_modules/d3-selection/src/selection/node.js","./size.js":"node_modules/d3-selection/src/selection/size.js","./empty.js":"node_modules/d3-selection/src/selection/empty.js","./each.js":"node_modules/d3-selection/src/selection/each.js","./attr.js":"node_modules/d3-selection/src/selection/attr.js","./style.js":"node_modules/d3-selection/src/selection/style.js","./property.js":"node_modules/d3-selection/src/selection/property.js","./classed.js":"node_modules/d3-selection/src/selection/classed.js","./text.js":"node_modules/d3-selection/src/selection/text.js","./html.js":"node_modules/d3-selection/src/selection/html.js","./raise.js":"node_modules/d3-selection/src/selection/raise.js","./lower.js":"node_modules/d3-selection/src/selection/lower.js","./append.js":"node_modules/d3-selection/src/selection/append.js","./insert.js":"node_modules/d3-selection/src/selection/insert.js","./remove.js":"node_modules/d3-selection/src/selection/remove.js","./clone.js":"node_modules/d3-selection/src/selection/clone.js","./datum.js":"node_modules/d3-selection/src/selection/datum.js","./on.js":"node_modules/d3-selection/src/selection/on.js","./dispatch.js":"node_modules/d3-selection/src/selection/dispatch.js","./iterator.js":"node_modules/d3-selection/src/selection/iterator.js"}],"node_modules/d3-selection/src/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./selection/index.js");
function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([[document.querySelector(selector)]], [document.documentElement]) : new _index.Selection([[selector]], _index.root);
}
},{"./selection/index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/create.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("./creator.js"));
var _select = _interopRequireDefault(require("./select.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(name) {
  return (0, _select.default)((0, _creator.default)(name).call(document.documentElement));
}
},{"./creator.js":"node_modules/d3-selection/src/creator.js","./select.js":"node_modules/d3-selection/src/select.js"}],"node_modules/d3-selection/src/local.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = local;
var nextId = 0;
function local() {
  return new Local();
}
function Local() {
  this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
  constructor: Local,
  get: function (node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function (node, value) {
    return node[this._] = value;
  },
  remove: function (node) {
    return this._ in node && delete node[this._];
  },
  toString: function () {
    return this._;
  }
};
},{}],"node_modules/d3-selection/src/sourceEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}
},{}],"node_modules/d3-selection/src/pointer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sourceEvent = _interopRequireDefault(require("./sourceEvent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(event, node) {
  event = (0, _sourceEvent.default)(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}
},{"./sourceEvent.js":"node_modules/d3-selection/src/sourceEvent.js"}],"node_modules/d3-selection/src/pointers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _pointer = _interopRequireDefault(require("./pointer.js"));
var _sourceEvent = _interopRequireDefault(require("./sourceEvent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(events, node) {
  if (events.target) {
    // i.e., instanceof Event, not TouchList or iterable
    events = (0, _sourceEvent.default)(events);
    if (node === undefined) node = events.currentTarget;
    events = events.touches || [events];
  }
  return Array.from(events, event => (0, _pointer.default)(event, node));
}
},{"./pointer.js":"node_modules/d3-selection/src/pointer.js","./sourceEvent.js":"node_modules/d3-selection/src/sourceEvent.js"}],"node_modules/d3-selection/src/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _array = _interopRequireDefault(require("./array.js"));
var _index = require("./selection/index.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([document.querySelectorAll(selector)], [document.documentElement]) : new _index.Selection([selector == null ? [] : (0, _array.default)(selector)], _index.root);
}
},{"./array.js":"node_modules/d3-selection/src/array.js","./selection/index.js":"node_modules/d3-selection/src/selection/index.js"}],"node_modules/d3-selection/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "creator", {
  enumerable: true,
  get: function () {
    return _creator.default;
  }
});
Object.defineProperty(exports, "local", {
  enumerable: true,
  get: function () {
    return _local.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "namespace", {
  enumerable: true,
  get: function () {
    return _namespace.default;
  }
});
Object.defineProperty(exports, "namespaces", {
  enumerable: true,
  get: function () {
    return _namespaces.default;
  }
});
Object.defineProperty(exports, "pointer", {
  enumerable: true,
  get: function () {
    return _pointer.default;
  }
});
Object.defineProperty(exports, "pointers", {
  enumerable: true,
  get: function () {
    return _pointers.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function () {
    return _select.default;
  }
});
Object.defineProperty(exports, "selectAll", {
  enumerable: true,
  get: function () {
    return _selectAll.default;
  }
});
Object.defineProperty(exports, "selection", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "selector", {
  enumerable: true,
  get: function () {
    return _selector.default;
  }
});
Object.defineProperty(exports, "selectorAll", {
  enumerable: true,
  get: function () {
    return _selectorAll.default;
  }
});
Object.defineProperty(exports, "style", {
  enumerable: true,
  get: function () {
    return _style.styleValue;
  }
});
Object.defineProperty(exports, "window", {
  enumerable: true,
  get: function () {
    return _window.default;
  }
});
var _create = _interopRequireDefault(require("./create.js"));
var _creator = _interopRequireDefault(require("./creator.js"));
var _local = _interopRequireDefault(require("./local.js"));
var _matcher = _interopRequireDefault(require("./matcher.js"));
var _namespace = _interopRequireDefault(require("./namespace.js"));
var _namespaces = _interopRequireDefault(require("./namespaces.js"));
var _pointer = _interopRequireDefault(require("./pointer.js"));
var _pointers = _interopRequireDefault(require("./pointers.js"));
var _select = _interopRequireDefault(require("./select.js"));
var _selectAll = _interopRequireDefault(require("./selectAll.js"));
var _index = _interopRequireDefault(require("./selection/index.js"));
var _selector = _interopRequireDefault(require("./selector.js"));
var _selectorAll = _interopRequireDefault(require("./selectorAll.js"));
var _style = require("./selection/style.js");
var _window = _interopRequireDefault(require("./window.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./create.js":"node_modules/d3-selection/src/create.js","./creator.js":"node_modules/d3-selection/src/creator.js","./local.js":"node_modules/d3-selection/src/local.js","./matcher.js":"node_modules/d3-selection/src/matcher.js","./namespace.js":"node_modules/d3-selection/src/namespace.js","./namespaces.js":"node_modules/d3-selection/src/namespaces.js","./pointer.js":"node_modules/d3-selection/src/pointer.js","./pointers.js":"node_modules/d3-selection/src/pointers.js","./select.js":"node_modules/d3-selection/src/select.js","./selectAll.js":"node_modules/d3-selection/src/selectAll.js","./selection/index.js":"node_modules/d3-selection/src/selection/index.js","./selector.js":"node_modules/d3-selection/src/selector.js","./selectorAll.js":"node_modules/d3-selection/src/selectorAll.js","./selection/style.js":"node_modules/d3-selection/src/selection/style.js","./window.js":"node_modules/d3-selection/src/window.js"}],"node_modules/d3-dispatch/src/dispatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var noop = {
  value: () => {}
};
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
      i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {
      type: t,
      name: name
    };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function (typename, callback) {
    var _ = this._,
      T = parseTypenames(typename + "", _),
      t,
      i = -1,
      n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function () {
    var copy = {},
      _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function (type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function (type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}
function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({
    name: name,
    value: callback
  });
  return type;
}
var _default = exports.default = dispatch;
},{}],"node_modules/d3-dispatch/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "dispatch", {
  enumerable: true,
  get: function () {
    return _dispatch.default;
  }
});
var _dispatch = _interopRequireDefault(require("./dispatch.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./dispatch.js":"node_modules/d3-dispatch/src/dispatch.js"}],"node_modules/d3-timer/src/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = Timer;
exports.now = now;
exports.timer = timer;
exports.timerFlush = timerFlush;
var frame = 0,
  // is an animation frame pending?
  timeout = 0,
  // is a timeout pending?
  interval = 0,
  // are any timers active?
  pokeDelay = 1000,
  // how frequently we check for clock skew
  taskHead,
  taskTail,
  clockLast = 0,
  clockNow = 0,
  clockSkew = 0,
  clock = typeof performance === "object" && performance.now ? performance : Date,
  setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (f) {
    setTimeout(f, 17);
  };
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function (callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function () {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead,
    e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now = clock.now(),
    delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}
function nap() {
  var t0,
    t1 = taskHead,
    t2,
    time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
},{}],"node_modules/d3-timer/src/timeout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _timer = require("./timer.js");
function _default(callback, delay, time) {
  var t = new _timer.Timer();
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
},{"./timer.js":"node_modules/d3-timer/src/timer.js"}],"node_modules/d3-timer/src/interval.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _timer = require("./timer.js");
function _default(callback, delay, time) {
  var t = new _timer.Timer(),
    total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  t._restart = t.restart;
  t.restart = function (callback, delay, time) {
    delay = +delay, time = time == null ? (0, _timer.now)() : +time;
    t._restart(function tick(elapsed) {
      elapsed += total;
      t._restart(tick, total += delay, time);
      callback(elapsed);
    }, delay, time);
  };
  t.restart(callback, delay, time);
  return t;
}
},{"./timer.js":"node_modules/d3-timer/src/timer.js"}],"node_modules/d3-timer/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "interval", {
  enumerable: true,
  get: function () {
    return _interval.default;
  }
});
Object.defineProperty(exports, "now", {
  enumerable: true,
  get: function () {
    return _timer.now;
  }
});
Object.defineProperty(exports, "timeout", {
  enumerable: true,
  get: function () {
    return _timeout.default;
  }
});
Object.defineProperty(exports, "timer", {
  enumerable: true,
  get: function () {
    return _timer.timer;
  }
});
Object.defineProperty(exports, "timerFlush", {
  enumerable: true,
  get: function () {
    return _timer.timerFlush;
  }
});
var _timer = require("./timer.js");
var _timeout = _interopRequireDefault(require("./timeout.js"));
var _interval = _interopRequireDefault(require("./interval.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./timer.js":"node_modules/d3-timer/src/timer.js","./timeout.js":"node_modules/d3-timer/src/timeout.js","./interval.js":"node_modules/d3-timer/src/interval.js"}],"node_modules/d3-transition/src/transition/schedule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STARTING = exports.STARTED = exports.SCHEDULED = exports.RUNNING = exports.ENDING = exports.ENDED = exports.CREATED = void 0;
exports.default = _default;
exports.get = get;
exports.init = init;
exports.set = set;
var _d3Dispatch = require("d3-dispatch");
var _d3Timer = require("d3-timer");
var emptyOn = (0, _d3Dispatch.dispatch)("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = exports.CREATED = 0;
var SCHEDULED = exports.SCHEDULED = 1;
var STARTING = exports.STARTING = 2;
var STARTED = exports.STARTED = 3;
var RUNNING = exports.RUNNING = 4;
var ENDING = exports.ENDING = 5;
var ENDED = exports.ENDED = 6;
function _default(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index,
    // For context during callback.
    group: group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}
function create(node, id, self) {
  var schedules = node.__transition,
    tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = (0, _d3Timer.timer)(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }
  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return (0, _d3Timer.timeout)(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    (0, _d3Timer.timeout)(function () {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
      i = -1,
      n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}
},{"d3-dispatch":"node_modules/d3-dispatch/src/index.js","d3-timer":"node_modules/d3-timer/src/index.js"}],"node_modules/d3-transition/src/interrupt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./transition/schedule.js");
function _default(node, name) {
  var schedules = node.__transition,
    schedule,
    active,
    empty = true,
    i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty = false;
      continue;
    }
    active = schedule.state > _schedule.STARTING && schedule.state < _schedule.ENDING;
    schedule.state = _schedule.ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty) delete node.__transition;
}
},{"./transition/schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/selection/interrupt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _interrupt = _interopRequireDefault(require("../interrupt.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(name) {
  return this.each(function () {
    (0, _interrupt.default)(this, name);
  });
}
},{"../interrupt.js":"node_modules/d3-transition/src/interrupt.js"}],"node_modules/d3-color/src/define.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.extend = extend;
function _default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
},{}],"node_modules/d3-color/src/color.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = Color;
exports.Rgb = Rgb;
exports.darker = exports.brighter = void 0;
exports.default = color;
exports.hsl = hsl;
exports.hslConvert = hslConvert;
exports.rgb = rgb;
exports.rgbConvert = rgbConvert;
var _define = _interopRequireWildcard(require("./define.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Color() {}
var darker = exports.darker = 0.7;
var brighter = exports.brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*",
  reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  reHex = /^#([0-9a-f]{3,8})$/,
  reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
  reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
  reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
  reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
  reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
  reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
(0, _define.default)(Color, color, {
  copy: function (channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
  : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
  : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
  : null // invalid hex
  ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
  : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
(0, _define.default)(Rgb, rgb, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function () {
    return this;
  },
  displayable: function () {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
    g = o.g / 255,
    b = o.b / 255,
    min = Math.min(r, g, b),
    max = Math.max(r, g, b),
    h = NaN,
    s = max - min,
    l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
(0, _define.default)(Hsl, hsl, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = this.h % 360 + (this.h < 0) * 360,
      s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
      l = this.l,
      m2 = l + (l < 0.5 ? l : 1 - l) * s,
      m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function () {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function () {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
},{"./define.js":"node_modules/d3-color/src/define.js"}],"node_modules/d3-color/src/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.radians = exports.degrees = void 0;
const radians = exports.radians = Math.PI / 180;
const degrees = exports.degrees = 180 / Math.PI;
},{}],"node_modules/d3-color/src/lab.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hcl = Hcl;
exports.Lab = Lab;
exports.default = lab;
exports.gray = gray;
exports.hcl = hcl;
exports.lch = lch;
var _define = _interopRequireWildcard(require("./define.js"));
var _color = require("./color.js");
var _math = require("./math.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// https://observablehq.com/@mbostock/lab-and-rgb
const K = 18,
  Xn = 0.96422,
  Yn = 1,
  Zn = 0.82521,
  t0 = 4 / 29,
  t1 = 6 / 29,
  t2 = 3 * t1 * t1,
  t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = rgb2lrgb(o.r),
    g = rgb2lrgb(o.g),
    b = rgb2lrgb(o.b),
    y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
    x,
    z;
  if (r === g && g === b) x = z = y;else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}
function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}
function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}
(0, _define.default)(Lab, lab, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function (k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function () {
    var y = (this.l + 16) / 116,
      x = isNaN(this.a) ? y : y + this.a / 500,
      z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color.Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * _math.degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math.radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
(0, _define.default)(Hcl, hcl, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function (k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function () {
    return hcl2lab(this).rgb();
  }
}));
},{"./define.js":"node_modules/d3-color/src/define.js","./color.js":"node_modules/d3-color/src/color.js","./math.js":"node_modules/d3-color/src/math.js"}],"node_modules/d3-color/src/cubehelix.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cubehelix = Cubehelix;
exports.default = cubehelix;
var _define = _interopRequireWildcard(require("./define.js"));
var _color = require("./color.js");
var _math = require("./math.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var A = -0.14861,
  B = +1.78277,
  C = -0.29227,
  D = -0.90649,
  E = +1.97294,
  ED = E * D,
  EB = E * B,
  BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = o.r / 255,
    g = o.g / 255,
    b = o.b / 255,
    l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
    bl = b - l,
    k = (E * (g - l) - C * bl) / D,
    s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
    // NaN if l=0 or l=1
    h = s ? Math.atan2(k, bl) * _math.degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
(0, _define.default)(Cubehelix, cubehelix, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    k = k == null ? _color.brighter : Math.pow(_color.brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? _color.darker : Math.pow(_color.darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math.radians,
      l = +this.l,
      a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
      cosh = Math.cos(h),
      sinh = Math.sin(h);
    return new _color.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));
},{"./define.js":"node_modules/d3-color/src/define.js","./color.js":"node_modules/d3-color/src/color.js","./math.js":"node_modules/d3-color/src/math.js"}],"node_modules/d3-color/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "color", {
  enumerable: true,
  get: function () {
    return _color.default;
  }
});
Object.defineProperty(exports, "cubehelix", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});
Object.defineProperty(exports, "gray", {
  enumerable: true,
  get: function () {
    return _lab.gray;
  }
});
Object.defineProperty(exports, "hcl", {
  enumerable: true,
  get: function () {
    return _lab.hcl;
  }
});
Object.defineProperty(exports, "hsl", {
  enumerable: true,
  get: function () {
    return _color.hsl;
  }
});
Object.defineProperty(exports, "lab", {
  enumerable: true,
  get: function () {
    return _lab.default;
  }
});
Object.defineProperty(exports, "lch", {
  enumerable: true,
  get: function () {
    return _lab.lch;
  }
});
Object.defineProperty(exports, "rgb", {
  enumerable: true,
  get: function () {
    return _color.rgb;
  }
});
var _color = _interopRequireWildcard(require("./color.js"));
var _lab = _interopRequireWildcard(require("./lab.js"));
var _cubehelix = _interopRequireDefault(require("./cubehelix.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
},{"./color.js":"node_modules/d3-color/src/color.js","./lab.js":"node_modules/d3-color/src/lab.js","./cubehelix.js":"node_modules/d3-color/src/cubehelix.js"}],"node_modules/d3-interpolate/src/basis.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basis = basis;
exports.default = _default;
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1,
    t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function _default(values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
      v1 = values[i],
      v2 = values[i + 1],
      v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
      v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
},{}],"node_modules/d3-interpolate/src/basisClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _basis = require("./basis.js");
function _default(values) {
  var n = values.length;
  return function (t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
      v0 = values[(i + n - 1) % n],
      v1 = values[i % n],
      v2 = values[(i + 1) % n],
      v3 = values[(i + 2) % n];
    return (0, _basis.basis)((t - i / n) * n, v0, v1, v2, v3);
  };
}
},{"./basis.js":"node_modules/d3-interpolate/src/basis.js"}],"node_modules/d3-interpolate/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = x => () => x;
exports.default = _default;
},{}],"node_modules/d3-interpolate/src/color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nogamma;
exports.gamma = gamma;
exports.hue = hue;
var _constant = _interopRequireDefault(require("./constant.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0, _constant.default)(isNaN(a) ? b : a);
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : (0, _constant.default)(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : (0, _constant.default)(isNaN(a) ? b : a);
}
},{"./constant.js":"node_modules/d3-interpolate/src/constant.js"}],"node_modules/d3-interpolate/src/rgb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbBasisClosed = exports.rgbBasis = exports.default = void 0;
var _d3Color = require("d3-color");
var _basis = _interopRequireDefault(require("./basis.js"));
var _basisClosed = _interopRequireDefault(require("./basisClosed.js"));
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = function rgbGamma(y) {
  var color = (0, _color.gamma)(y);
  function rgb(start, end) {
    var r = color((start = (0, _d3Color.rgb)(start)).r, (end = (0, _d3Color.rgb)(end)).r),
      g = color(start.g, end.g),
      b = color(start.b, end.b),
      opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  rgb.gamma = rgbGamma;
  return rgb;
}(1);
function rgbSpline(spline) {
  return function (colors) {
    var n = colors.length,
      r = new Array(n),
      g = new Array(n),
      b = new Array(n),
      i,
      color;
    for (i = 0; i < n; ++i) {
      color = (0, _d3Color.rgb)(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}
var rgbBasis = exports.rgbBasis = rgbSpline(_basis.default);
var rgbBasisClosed = exports.rgbBasisClosed = rgbSpline(_basisClosed.default);
},{"d3-color":"node_modules/d3-color/src/index.js","./basis.js":"node_modules/d3-interpolate/src/basis.js","./basisClosed.js":"node_modules/d3-interpolate/src/basisClosed.js","./color.js":"node_modules/d3-interpolate/src/color.js"}],"node_modules/d3-interpolate/src/numberArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.isNumberArray = isNumberArray;
function _default(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
    c = b.slice(),
    i;
  return function (t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
},{}],"node_modules/d3-interpolate/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.genericArray = genericArray;
var _value = _interopRequireDefault(require("./value.js"));
var _numberArray = _interopRequireWildcard(require("./numberArray.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(a, b) {
  return ((0, _numberArray.isNumberArray)(b) ? _numberArray.default : genericArray)(a, b);
}
function genericArray(a, b) {
  var nb = b ? b.length : 0,
    na = a ? Math.min(nb, a.length) : 0,
    x = new Array(na),
    c = new Array(nb),
    i;
  for (i = 0; i < na; ++i) x[i] = (0, _value.default)(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];
  return function (t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}
},{"./value.js":"node_modules/d3-interpolate/src/value.js","./numberArray.js":"node_modules/d3-interpolate/src/numberArray.js"}],"node_modules/d3-interpolate/src/date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  var d = new Date();
  return a = +a, b = +b, function (t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}
},{}],"node_modules/d3-interpolate/src/number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  return a = +a, b = +b, function (t) {
    return a * (1 - t) + b * t;
  };
}
},{}],"node_modules/d3-interpolate/src/object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _value = _interopRequireDefault(require("./value.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(a, b) {
  var i = {},
    c = {},
    k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};
  for (k in b) {
    if (k in a) {
      i[k] = (0, _value.default)(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function (t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}
},{"./value.js":"node_modules/d3-interpolate/src/value.js"}],"node_modules/d3-interpolate/src/string.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _number = _interopRequireDefault(require("./number.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  reB = new RegExp(reA.source, "g");
function zero(b) {
  return function () {
    return b;
  };
}
function one(b) {
  return function (t) {
    return b(t) + "";
  };
}
function _default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0,
    // scan index for next number in b
    am,
    // current match in a
    bm,
    // current match in b
    bs,
    // string preceding current number in b, if any
    i = -1,
    // index in s
    s = [],
    // string constants and placeholders
    q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i: i,
        x: (0, _number.default)(am, bm)
      });
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  });
}
},{"./number.js":"node_modules/d3-interpolate/src/number.js"}],"node_modules/d3-interpolate/src/value.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Color = require("d3-color");
var _rgb = _interopRequireDefault(require("./rgb.js"));
var _array = require("./array.js");
var _date = _interopRequireDefault(require("./date.js"));
var _number = _interopRequireDefault(require("./number.js"));
var _object = _interopRequireDefault(require("./object.js"));
var _string = _interopRequireDefault(require("./string.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
var _numberArray = _interopRequireWildcard(require("./numberArray.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(a, b) {
  var t = typeof b,
    c;
  return b == null || t === "boolean" ? (0, _constant.default)(b) : (t === "number" ? _number.default : t === "string" ? (c = (0, _d3Color.color)(b)) ? (b = c, _rgb.default) : _string.default : b instanceof _d3Color.color ? _rgb.default : b instanceof Date ? _date.default : (0, _numberArray.isNumberArray)(b) ? _numberArray.default : Array.isArray(b) ? _array.genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object.default : _number.default)(a, b);
}
},{"d3-color":"node_modules/d3-color/src/index.js","./rgb.js":"node_modules/d3-interpolate/src/rgb.js","./array.js":"node_modules/d3-interpolate/src/array.js","./date.js":"node_modules/d3-interpolate/src/date.js","./number.js":"node_modules/d3-interpolate/src/number.js","./object.js":"node_modules/d3-interpolate/src/object.js","./string.js":"node_modules/d3-interpolate/src/string.js","./constant.js":"node_modules/d3-interpolate/src/constant.js","./numberArray.js":"node_modules/d3-interpolate/src/numberArray.js"}],"node_modules/d3-interpolate/src/discrete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(range) {
  var n = range.length;
  return function (t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
},{}],"node_modules/d3-interpolate/src/hue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _color = require("./color.js");
function _default(a, b) {
  var i = (0, _color.hue)(+a, +b);
  return function (t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
}
},{"./color.js":"node_modules/d3-interpolate/src/color.js"}],"node_modules/d3-interpolate/src/round.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  return a = +a, b = +b, function (t) {
    return Math.round(a * (1 - t) + b * t);
  };
}
},{}],"node_modules/d3-interpolate/src/transform/decompose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.identity = void 0;
var degrees = 180 / Math.PI;
var identity = exports.identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function _default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}
},{}],"node_modules/d3-interpolate/src/transform/parse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCss = parseCss;
exports.parseSvg = parseSvg;
var _decompose = _interopRequireWildcard(require("./decompose.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? _decompose.identity : (0, _decompose.default)(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return _decompose.identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose.identity;
  value = value.matrix;
  return (0, _decompose.default)(value.a, value.b, value.c, value.d, value.e, value.f);
}
},{"./decompose.js":"node_modules/d3-interpolate/src/transform/decompose.js"}],"node_modules/d3-interpolate/src/transform/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolateTransformSvg = exports.interpolateTransformCss = void 0;
var _number = _interopRequireDefault(require("../number.js"));
var _parse = require("./parse.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: (0, _number.default)(xa, xb)
      }, {
        i: i - 2,
        x: (0, _number.default)(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path
      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: (0, _number.default)(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: (0, _number.default)(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: (0, _number.default)(xa, xb)
      }, {
        i: i - 2,
        x: (0, _number.default)(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function (a, b) {
    var s = [],
      // string constants and placeholders
      q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function (t) {
      var i = -1,
        n = q.length,
        o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = exports.interpolateTransformCss = interpolateTransform(_parse.parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = exports.interpolateTransformSvg = interpolateTransform(_parse.parseSvg, ", ", ")", ")");
},{"../number.js":"node_modules/d3-interpolate/src/number.js","./parse.js":"node_modules/d3-interpolate/src/transform/parse.js"}],"node_modules/d3-interpolate/src/zoom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var epsilon2 = 1e-12;
function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
var _default = exports.default = function zoomRho(rho, rho2, rho4) {
  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0],
      uy0 = p0[1],
      w0 = p0[2],
      ux1 = p1[0],
      uy1 = p1[1],
      w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function (t) {
        return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
      };
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function (t) {
        var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
      };
    }
    i.duration = S * 1000 * rho / Math.SQRT2;
    return i;
  }
  zoom.rho = function (_) {
    var _1 = Math.max(1e-3, +_),
      _2 = _1 * _1,
      _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);
},{}],"node_modules/d3-interpolate/src/hsl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hslLong = exports.default = void 0;
var _d3Color = require("d3-color");
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function hsl(hue) {
  return function (start, end) {
    var h = hue((start = (0, _d3Color.hsl)(start)).h, (end = (0, _d3Color.hsl)(end)).h),
      s = (0, _color.default)(start.s, end.s),
      l = (0, _color.default)(start.l, end.l),
      opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}
var _default = exports.default = hsl(_color.hue);
var hslLong = exports.hslLong = hsl(_color.default);
},{"d3-color":"node_modules/d3-color/src/index.js","./color.js":"node_modules/d3-interpolate/src/color.js"}],"node_modules/d3-interpolate/src/lab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lab;
var _d3Color = require("d3-color");
var _color = _interopRequireDefault(require("./color.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function lab(start, end) {
  var l = (0, _color.default)((start = (0, _d3Color.lab)(start)).l, (end = (0, _d3Color.lab)(end)).l),
    a = (0, _color.default)(start.a, end.a),
    b = (0, _color.default)(start.b, end.b),
    opacity = (0, _color.default)(start.opacity, end.opacity);
  return function (t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}
},{"d3-color":"node_modules/d3-color/src/index.js","./color.js":"node_modules/d3-interpolate/src/color.js"}],"node_modules/d3-interpolate/src/hcl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hclLong = exports.default = void 0;
var _d3Color = require("d3-color");
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function hcl(hue) {
  return function (start, end) {
    var h = hue((start = (0, _d3Color.hcl)(start)).h, (end = (0, _d3Color.hcl)(end)).h),
      c = (0, _color.default)(start.c, end.c),
      l = (0, _color.default)(start.l, end.l),
      opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}
var _default = exports.default = hcl(_color.hue);
var hclLong = exports.hclLong = hcl(_color.default);
},{"d3-color":"node_modules/d3-color/src/index.js","./color.js":"node_modules/d3-interpolate/src/color.js"}],"node_modules/d3-interpolate/src/cubehelix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.cubehelixLong = void 0;
var _d3Color = require("d3-color");
var _color = _interopRequireWildcard(require("./color.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function cubehelix(hue) {
  return function cubehelixGamma(y) {
    y = +y;
    function cubehelix(start, end) {
      var h = hue((start = (0, _d3Color.cubehelix)(start)).h, (end = (0, _d3Color.cubehelix)(end)).h),
        s = (0, _color.default)(start.s, end.s),
        l = (0, _color.default)(start.l, end.l),
        opacity = (0, _color.default)(start.opacity, end.opacity);
      return function (t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }
    cubehelix.gamma = cubehelixGamma;
    return cubehelix;
  }(1);
}
var _default = exports.default = cubehelix(_color.hue);
var cubehelixLong = exports.cubehelixLong = cubehelix(_color.default);
},{"d3-color":"node_modules/d3-color/src/index.js","./color.js":"node_modules/d3-interpolate/src/color.js"}],"node_modules/d3-interpolate/src/piecewise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = piecewise;
var _value = _interopRequireDefault(require("./value.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function piecewise(interpolate, values) {
  if (values === undefined) values = interpolate, interpolate = _value.default;
  var i = 0,
    n = values.length - 1,
    v = values[0],
    I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function (t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}
},{"./value.js":"node_modules/d3-interpolate/src/value.js"}],"node_modules/d3-interpolate/src/quantize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}
},{}],"node_modules/d3-interpolate/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "interpolate", {
  enumerable: true,
  get: function () {
    return _value.default;
  }
});
Object.defineProperty(exports, "interpolateArray", {
  enumerable: true,
  get: function () {
    return _array.default;
  }
});
Object.defineProperty(exports, "interpolateBasis", {
  enumerable: true,
  get: function () {
    return _basis.default;
  }
});
Object.defineProperty(exports, "interpolateBasisClosed", {
  enumerable: true,
  get: function () {
    return _basisClosed.default;
  }
});
Object.defineProperty(exports, "interpolateCubehelix", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});
Object.defineProperty(exports, "interpolateCubehelixLong", {
  enumerable: true,
  get: function () {
    return _cubehelix.cubehelixLong;
  }
});
Object.defineProperty(exports, "interpolateDate", {
  enumerable: true,
  get: function () {
    return _date.default;
  }
});
Object.defineProperty(exports, "interpolateDiscrete", {
  enumerable: true,
  get: function () {
    return _discrete.default;
  }
});
Object.defineProperty(exports, "interpolateHcl", {
  enumerable: true,
  get: function () {
    return _hcl.default;
  }
});
Object.defineProperty(exports, "interpolateHclLong", {
  enumerable: true,
  get: function () {
    return _hcl.hclLong;
  }
});
Object.defineProperty(exports, "interpolateHsl", {
  enumerable: true,
  get: function () {
    return _hsl.default;
  }
});
Object.defineProperty(exports, "interpolateHslLong", {
  enumerable: true,
  get: function () {
    return _hsl.hslLong;
  }
});
Object.defineProperty(exports, "interpolateHue", {
  enumerable: true,
  get: function () {
    return _hue.default;
  }
});
Object.defineProperty(exports, "interpolateLab", {
  enumerable: true,
  get: function () {
    return _lab.default;
  }
});
Object.defineProperty(exports, "interpolateNumber", {
  enumerable: true,
  get: function () {
    return _number.default;
  }
});
Object.defineProperty(exports, "interpolateNumberArray", {
  enumerable: true,
  get: function () {
    return _numberArray.default;
  }
});
Object.defineProperty(exports, "interpolateObject", {
  enumerable: true,
  get: function () {
    return _object.default;
  }
});
Object.defineProperty(exports, "interpolateRgb", {
  enumerable: true,
  get: function () {
    return _rgb.default;
  }
});
Object.defineProperty(exports, "interpolateRgbBasis", {
  enumerable: true,
  get: function () {
    return _rgb.rgbBasis;
  }
});
Object.defineProperty(exports, "interpolateRgbBasisClosed", {
  enumerable: true,
  get: function () {
    return _rgb.rgbBasisClosed;
  }
});
Object.defineProperty(exports, "interpolateRound", {
  enumerable: true,
  get: function () {
    return _round.default;
  }
});
Object.defineProperty(exports, "interpolateString", {
  enumerable: true,
  get: function () {
    return _string.default;
  }
});
Object.defineProperty(exports, "interpolateTransformCss", {
  enumerable: true,
  get: function () {
    return _index.interpolateTransformCss;
  }
});
Object.defineProperty(exports, "interpolateTransformSvg", {
  enumerable: true,
  get: function () {
    return _index.interpolateTransformSvg;
  }
});
Object.defineProperty(exports, "interpolateZoom", {
  enumerable: true,
  get: function () {
    return _zoom.default;
  }
});
Object.defineProperty(exports, "piecewise", {
  enumerable: true,
  get: function () {
    return _piecewise.default;
  }
});
Object.defineProperty(exports, "quantize", {
  enumerable: true,
  get: function () {
    return _quantize.default;
  }
});
var _value = _interopRequireDefault(require("./value.js"));
var _array = _interopRequireDefault(require("./array.js"));
var _basis = _interopRequireDefault(require("./basis.js"));
var _basisClosed = _interopRequireDefault(require("./basisClosed.js"));
var _date = _interopRequireDefault(require("./date.js"));
var _discrete = _interopRequireDefault(require("./discrete.js"));
var _hue = _interopRequireDefault(require("./hue.js"));
var _number = _interopRequireDefault(require("./number.js"));
var _numberArray = _interopRequireDefault(require("./numberArray.js"));
var _object = _interopRequireDefault(require("./object.js"));
var _round = _interopRequireDefault(require("./round.js"));
var _string = _interopRequireDefault(require("./string.js"));
var _index = require("./transform/index.js");
var _zoom = _interopRequireDefault(require("./zoom.js"));
var _rgb = _interopRequireWildcard(require("./rgb.js"));
var _hsl = _interopRequireWildcard(require("./hsl.js"));
var _lab = _interopRequireDefault(require("./lab.js"));
var _hcl = _interopRequireWildcard(require("./hcl.js"));
var _cubehelix = _interopRequireWildcard(require("./cubehelix.js"));
var _piecewise = _interopRequireDefault(require("./piecewise.js"));
var _quantize = _interopRequireDefault(require("./quantize.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./value.js":"node_modules/d3-interpolate/src/value.js","./array.js":"node_modules/d3-interpolate/src/array.js","./basis.js":"node_modules/d3-interpolate/src/basis.js","./basisClosed.js":"node_modules/d3-interpolate/src/basisClosed.js","./date.js":"node_modules/d3-interpolate/src/date.js","./discrete.js":"node_modules/d3-interpolate/src/discrete.js","./hue.js":"node_modules/d3-interpolate/src/hue.js","./number.js":"node_modules/d3-interpolate/src/number.js","./numberArray.js":"node_modules/d3-interpolate/src/numberArray.js","./object.js":"node_modules/d3-interpolate/src/object.js","./round.js":"node_modules/d3-interpolate/src/round.js","./string.js":"node_modules/d3-interpolate/src/string.js","./transform/index.js":"node_modules/d3-interpolate/src/transform/index.js","./zoom.js":"node_modules/d3-interpolate/src/zoom.js","./rgb.js":"node_modules/d3-interpolate/src/rgb.js","./hsl.js":"node_modules/d3-interpolate/src/hsl.js","./lab.js":"node_modules/d3-interpolate/src/lab.js","./hcl.js":"node_modules/d3-interpolate/src/hcl.js","./cubehelix.js":"node_modules/d3-interpolate/src/cubehelix.js","./piecewise.js":"node_modules/d3-interpolate/src/piecewise.js","./quantize.js":"node_modules/d3-interpolate/src/quantize.js"}],"node_modules/d3-transition/src/transition/tween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.tweenValue = tweenValue;
var _schedule = require("./schedule.js");
function tweenRemove(id, name) {
  var tween0, tween1;
  return function () {
    var schedule = (0, _schedule.set)(this, id),
      tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function () {
    var schedule = (0, _schedule.set)(this, id),
      tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {
          name: name,
          value: value
        }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function _default(name, value) {
  var id = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = (0, _schedule.get)(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}
function tweenValue(transition, name, value) {
  var id = transition._id;
  transition.each(function () {
    var schedule = (0, _schedule.set)(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function (node) {
    return (0, _schedule.get)(node, id).value[name];
  };
}
},{"./schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/transition/interpolate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Color = require("d3-color");
var _d3Interpolate = require("d3-interpolate");
function _default(a, b) {
  var c;
  return (typeof b === "number" ? _d3Interpolate.interpolateNumber : b instanceof _d3Color.color ? _d3Interpolate.interpolateRgb : (c = (0, _d3Color.color)(b)) ? (b = c, _d3Interpolate.interpolateRgb) : _d3Interpolate.interpolateString)(a, b);
}
},{"d3-color":"node_modules/d3-color/src/index.js","d3-interpolate":"node_modules/d3-interpolate/src/index.js"}],"node_modules/d3-transition/src/transition/attr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Interpolate = require("d3-interpolate");
var _d3Selection = require("d3-selection");
var _tween = require("./tween.js");
var _interpolate = _interopRequireDefault(require("./interpolate.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, interpolate, value1) {
  var string00,
    string1 = value1 + "",
    interpolate0;
  return function () {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS(fullname, interpolate, value1) {
  var string00,
    string1 = value1 + "",
    interpolate0;
  return function () {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0,
      value1 = value(this),
      string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0,
      value1 = value(this),
      string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function _default(name, value) {
  var fullname = (0, _d3Selection.namespace)(name),
    i = fullname === "transform" ? _d3Interpolate.interpolateTransformSvg : _interpolate.default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, (0, _tween.tweenValue)(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
},{"d3-interpolate":"node_modules/d3-interpolate/src/index.js","d3-selection":"node_modules/d3-selection/src/index.js","./tween.js":"node_modules/d3-transition/src/transition/tween.js","./interpolate.js":"node_modules/d3-transition/src/transition/interpolate.js"}],"node_modules/d3-transition/src/transition/attrTween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Selection = require("d3-selection");
function attrInterpolate(name, i) {
  return function (t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function (t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function _default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = (0, _d3Selection.namespace)(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
},{"d3-selection":"node_modules/d3-selection/src/index.js"}],"node_modules/d3-transition/src/transition/delay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function delayFunction(id, value) {
  return function () {
    (0, _schedule.init)(this, id).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id, value) {
  return value = +value, function () {
    (0, _schedule.init)(this, id).delay = value;
  };
}
function _default(value) {
  var id = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : (0, _schedule.get)(this.node(), id).delay;
}
},{"./schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/transition/duration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function durationFunction(id, value) {
  return function () {
    (0, _schedule.set)(this, id).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id, value) {
  return value = +value, function () {
    (0, _schedule.set)(this, id).duration = value;
  };
}
function _default(value) {
  var id = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : (0, _schedule.get)(this.node(), id).duration;
}
},{"./schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/transition/ease.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error();
  return function () {
    (0, _schedule.set)(this, id).ease = value;
  };
}
function _default(value) {
  var id = this._id;
  return arguments.length ? this.each(easeConstant(id, value)) : (0, _schedule.get)(this.node(), id).ease;
}
},{"./schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/transition/easeVarying.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function easeVarying(id, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    (0, _schedule.set)(this, id).ease = v;
  };
}
function _default(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}
},{"./schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/transition/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Selection = require("d3-selection");
var _index = require("./index.js");
function _default(match) {
  if (typeof match !== "function") match = (0, _d3Selection.matcher)(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new _index.Transition(subgroups, this._parents, this._name, this._id);
}
},{"d3-selection":"node_modules/d3-selection/src/index.js","./index.js":"node_modules/d3-transition/src/transition/index.js"}],"node_modules/d3-transition/src/transition/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
function _default(transition) {
  if (transition._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new _index.Transition(merges, this._parents, this._name, this._id);
}
},{"./index.js":"node_modules/d3-transition/src/transition/index.js"}],"node_modules/d3-transition/src/transition/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function (t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id, name, listener) {
  var on0,
    on1,
    sit = start(name) ? _schedule.init : _schedule.set;
  return function () {
    var schedule = sit(this, id),
      on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function _default(name, listener) {
  var id = this._id;
  return arguments.length < 2 ? (0, _schedule.get)(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
}
},{"./schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/transition/remove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function removeFunction(id) {
  return function () {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}
function _default() {
  return this.on("end.remove", removeFunction(this._id));
}
},{}],"node_modules/d3-transition/src/transition/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Selection = require("d3-selection");
var _index = require("./index.js");
var _schedule = _interopRequireWildcard(require("./schedule.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _default(select) {
  var name = this._name,
    id = this._id;
  if (typeof select !== "function") select = (0, _d3Selection.selector)(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        (0, _schedule.default)(subgroup[i], name, id, i, subgroup, (0, _schedule.get)(node, id));
      }
    }
  }
  return new _index.Transition(subgroups, this._parents, name, id);
}
},{"d3-selection":"node_modules/d3-selection/src/index.js","./index.js":"node_modules/d3-transition/src/transition/index.js","./schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/transition/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Selection = require("d3-selection");
var _index = require("./index.js");
var _schedule = _interopRequireWildcard(require("./schedule.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _default(select) {
  var name = this._name,
    id = this._id;
  if (typeof select !== "function") select = (0, _d3Selection.selectorAll)(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = (0, _schedule.get)(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            (0, _schedule.default)(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }
  return new _index.Transition(subgroups, parents, name, id);
}
},{"d3-selection":"node_modules/d3-selection/src/index.js","./index.js":"node_modules/d3-transition/src/transition/index.js","./schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/transition/selection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Selection = require("d3-selection");
var Selection = _d3Selection.selection.prototype.constructor;
function _default() {
  return new Selection(this._groups, this._parents);
}
},{"d3-selection":"node_modules/d3-selection/src/index.js"}],"node_modules/d3-transition/src/transition/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Interpolate = require("d3-interpolate");
var _d3Selection = require("d3-selection");
var _schedule = require("./schedule.js");
var _tween = require("./tween.js");
var _interpolate = _interopRequireDefault(require("./interpolate.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function () {
    var string0 = (0, _d3Selection.style)(this, name),
      string1 = (this.style.removeProperty(name), (0, _d3Selection.style)(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, interpolate, value1) {
  var string00,
    string1 = value1 + "",
    interpolate0;
  return function () {
    var string0 = (0, _d3Selection.style)(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0 = (0, _d3Selection.style)(this, name),
      value1 = value(this),
      string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), (0, _d3Selection.style)(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id, name) {
  var on0,
    on1,
    listener0,
    key = "style." + name,
    event = "end." + key,
    remove;
  return function () {
    var schedule = (0, _schedule.set)(this, id),
      on = schedule.on,
      listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function _default(name, value, priority) {
  var i = (name += "") === "transform" ? _d3Interpolate.interpolateTransformCss : _interpolate.default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, (0, _tween.tweenValue)(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
},{"d3-interpolate":"node_modules/d3-interpolate/src/index.js","d3-selection":"node_modules/d3-selection/src/index.js","./schedule.js":"node_modules/d3-transition/src/transition/schedule.js","./tween.js":"node_modules/d3-transition/src/transition/tween.js","./interpolate.js":"node_modules/d3-transition/src/transition/interpolate.js"}],"node_modules/d3-transition/src/transition/styleTween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function styleInterpolate(name, i, priority) {
  return function (t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function _default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
},{}],"node_modules/d3-transition/src/transition/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _tween = require("./tween.js");
function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function () {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function _default(value) {
  return this.tween("text", typeof value === "function" ? textFunction((0, _tween.tweenValue)(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
},{"./tween.js":"node_modules/d3-transition/src/transition/tween.js"}],"node_modules/d3-transition/src/transition/textTween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function textInterpolate(i) {
  return function (t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function _default(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}
},{}],"node_modules/d3-transition/src/transition/transition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index.js");
var _schedule = _interopRequireWildcard(require("./schedule.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _default() {
  var name = this._name,
    id0 = this._id,
    id1 = (0, _index.newId)();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = (0, _schedule.get)(node, id0);
        (0, _schedule.default)(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }
  return new _index.Transition(groups, this._parents, name, id1);
}
},{"./index.js":"node_modules/d3-transition/src/transition/index.js","./schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/transition/end.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _schedule = require("./schedule.js");
function _default() {
  var on0,
    on1,
    that = this,
    id = that._id,
    size = that.size();
  return new Promise(function (resolve, reject) {
    var cancel = {
        value: reject
      },
      end = {
        value: function () {
          if (--size === 0) resolve();
        }
      };
    that.each(function () {
      var schedule = (0, _schedule.set)(this, id),
        on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}
},{"./schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/transition/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transition = Transition;
exports.default = transition;
exports.newId = newId;
var _d3Selection = require("d3-selection");
var _attr = _interopRequireDefault(require("./attr.js"));
var _attrTween = _interopRequireDefault(require("./attrTween.js"));
var _delay = _interopRequireDefault(require("./delay.js"));
var _duration = _interopRequireDefault(require("./duration.js"));
var _ease = _interopRequireDefault(require("./ease.js"));
var _easeVarying = _interopRequireDefault(require("./easeVarying.js"));
var _filter = _interopRequireDefault(require("./filter.js"));
var _merge = _interopRequireDefault(require("./merge.js"));
var _on = _interopRequireDefault(require("./on.js"));
var _remove = _interopRequireDefault(require("./remove.js"));
var _select = _interopRequireDefault(require("./select.js"));
var _selectAll = _interopRequireDefault(require("./selectAll.js"));
var _selection = _interopRequireDefault(require("./selection.js"));
var _style = _interopRequireDefault(require("./style.js"));
var _styleTween = _interopRequireDefault(require("./styleTween.js"));
var _text = _interopRequireDefault(require("./text.js"));
var _textTween = _interopRequireDefault(require("./textTween.js"));
var _transition = _interopRequireDefault(require("./transition.js"));
var _tween = _interopRequireDefault(require("./tween.js"));
var _end = _interopRequireDefault(require("./end.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var id = 0;
function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}
function transition(name) {
  return (0, _d3Selection.selection)().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = _d3Selection.selection.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: _select.default,
  selectAll: _selectAll.default,
  filter: _filter.default,
  merge: _merge.default,
  selection: _selection.default,
  transition: _transition.default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: _on.default,
  attr: _attr.default,
  attrTween: _attrTween.default,
  style: _style.default,
  styleTween: _styleTween.default,
  text: _text.default,
  textTween: _textTween.default,
  remove: _remove.default,
  tween: _tween.default,
  delay: _delay.default,
  duration: _duration.default,
  ease: _ease.default,
  easeVarying: _easeVarying.default,
  end: _end.default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};
},{"d3-selection":"node_modules/d3-selection/src/index.js","./attr.js":"node_modules/d3-transition/src/transition/attr.js","./attrTween.js":"node_modules/d3-transition/src/transition/attrTween.js","./delay.js":"node_modules/d3-transition/src/transition/delay.js","./duration.js":"node_modules/d3-transition/src/transition/duration.js","./ease.js":"node_modules/d3-transition/src/transition/ease.js","./easeVarying.js":"node_modules/d3-transition/src/transition/easeVarying.js","./filter.js":"node_modules/d3-transition/src/transition/filter.js","./merge.js":"node_modules/d3-transition/src/transition/merge.js","./on.js":"node_modules/d3-transition/src/transition/on.js","./remove.js":"node_modules/d3-transition/src/transition/remove.js","./select.js":"node_modules/d3-transition/src/transition/select.js","./selectAll.js":"node_modules/d3-transition/src/transition/selectAll.js","./selection.js":"node_modules/d3-transition/src/transition/selection.js","./style.js":"node_modules/d3-transition/src/transition/style.js","./styleTween.js":"node_modules/d3-transition/src/transition/styleTween.js","./text.js":"node_modules/d3-transition/src/transition/text.js","./textTween.js":"node_modules/d3-transition/src/transition/textTween.js","./transition.js":"node_modules/d3-transition/src/transition/transition.js","./tween.js":"node_modules/d3-transition/src/transition/tween.js","./end.js":"node_modules/d3-transition/src/transition/end.js"}],"node_modules/d3-ease/src/linear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linear = void 0;
const linear = t => +t;
exports.linear = linear;
},{}],"node_modules/d3-ease/src/quad.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quadIn = quadIn;
exports.quadInOut = quadInOut;
exports.quadOut = quadOut;
function quadIn(t) {
  return t * t;
}
function quadOut(t) {
  return t * (2 - t);
}
function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
},{}],"node_modules/d3-ease/src/cubic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cubicIn = cubicIn;
exports.cubicInOut = cubicInOut;
exports.cubicOut = cubicOut;
function cubicIn(t) {
  return t * t * t;
}
function cubicOut(t) {
  return --t * t * t + 1;
}
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
},{}],"node_modules/d3-ease/src/poly.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyOut = exports.polyInOut = exports.polyIn = void 0;
var exponent = 3;
var polyIn = exports.polyIn = function custom(e) {
  e = +e;
  function polyIn(t) {
    return Math.pow(t, e);
  }
  polyIn.exponent = custom;
  return polyIn;
}(exponent);
var polyOut = exports.polyOut = function custom(e) {
  e = +e;
  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }
  polyOut.exponent = custom;
  return polyOut;
}(exponent);
var polyInOut = exports.polyInOut = function custom(e) {
  e = +e;
  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }
  polyInOut.exponent = custom;
  return polyInOut;
}(exponent);
},{}],"node_modules/d3-ease/src/sin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sinIn = sinIn;
exports.sinInOut = sinInOut;
exports.sinOut = sinOut;
var pi = Math.PI,
  halfPi = pi / 2;
function sinIn(t) {
  return +t === 1 ? 1 : 1 - Math.cos(t * halfPi);
}
function sinOut(t) {
  return Math.sin(t * halfPi);
}
function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}
},{}],"node_modules/d3-ease/src/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tpmt = tpmt;
// tpmt is two power minus ten times t scaled to [0,1]
function tpmt(x) {
  return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
}
},{}],"node_modules/d3-ease/src/exp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expIn = expIn;
exports.expInOut = expInOut;
exports.expOut = expOut;
var _math = require("./math.js");
function expIn(t) {
  return (0, _math.tpmt)(1 - +t);
}
function expOut(t) {
  return 1 - (0, _math.tpmt)(t);
}
function expInOut(t) {
  return ((t *= 2) <= 1 ? (0, _math.tpmt)(1 - t) : 2 - (0, _math.tpmt)(t - 1)) / 2;
}
},{"./math.js":"node_modules/d3-ease/src/math.js"}],"node_modules/d3-ease/src/circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circleIn = circleIn;
exports.circleInOut = circleInOut;
exports.circleOut = circleOut;
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}
function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
},{}],"node_modules/d3-ease/src/bounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bounceIn = bounceIn;
exports.bounceInOut = bounceInOut;
exports.bounceOut = bounceOut;
var b1 = 4 / 11,
  b2 = 6 / 11,
  b3 = 8 / 11,
  b4 = 3 / 4,
  b5 = 9 / 11,
  b6 = 10 / 11,
  b7 = 15 / 16,
  b8 = 21 / 22,
  b9 = 63 / 64,
  b0 = 1 / b1 / b1;
function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}
function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}
function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}
},{}],"node_modules/d3-ease/src/back.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backOut = exports.backInOut = exports.backIn = void 0;
var overshoot = 1.70158;
var backIn = exports.backIn = function custom(s) {
  s = +s;
  function backIn(t) {
    return (t = +t) * t * (s * (t - 1) + t);
  }
  backIn.overshoot = custom;
  return backIn;
}(overshoot);
var backOut = exports.backOut = function custom(s) {
  s = +s;
  function backOut(t) {
    return --t * t * ((t + 1) * s + t) + 1;
  }
  backOut.overshoot = custom;
  return backOut;
}(overshoot);
var backInOut = exports.backInOut = function custom(s) {
  s = +s;
  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }
  backInOut.overshoot = custom;
  return backInOut;
}(overshoot);
},{}],"node_modules/d3-ease/src/elastic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elasticOut = exports.elasticInOut = exports.elasticIn = void 0;
var _math = require("./math.js");
var tau = 2 * Math.PI,
  amplitude = 1,
  period = 0.3;
var elasticIn = exports.elasticIn = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticIn(t) {
    return a * (0, _math.tpmt)(- --t) * Math.sin((s - t) / p);
  }
  elasticIn.amplitude = function (a) {
    return custom(a, p * tau);
  };
  elasticIn.period = function (p) {
    return custom(a, p);
  };
  return elasticIn;
}(amplitude, period);
var elasticOut = exports.elasticOut = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticOut(t) {
    return 1 - a * (0, _math.tpmt)(t = +t) * Math.sin((t + s) / p);
  }
  elasticOut.amplitude = function (a) {
    return custom(a, p * tau);
  };
  elasticOut.period = function (p) {
    return custom(a, p);
  };
  return elasticOut;
}(amplitude, period);
var elasticInOut = exports.elasticInOut = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0 ? a * (0, _math.tpmt)(-t) * Math.sin((s - t) / p) : 2 - a * (0, _math.tpmt)(t) * Math.sin((s + t) / p)) / 2;
  }
  elasticInOut.amplitude = function (a) {
    return custom(a, p * tau);
  };
  elasticInOut.period = function (p) {
    return custom(a, p);
  };
  return elasticInOut;
}(amplitude, period);
},{"./math.js":"node_modules/d3-ease/src/math.js"}],"node_modules/d3-ease/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "easeBack", {
  enumerable: true,
  get: function () {
    return _back.backInOut;
  }
});
Object.defineProperty(exports, "easeBackIn", {
  enumerable: true,
  get: function () {
    return _back.backIn;
  }
});
Object.defineProperty(exports, "easeBackInOut", {
  enumerable: true,
  get: function () {
    return _back.backInOut;
  }
});
Object.defineProperty(exports, "easeBackOut", {
  enumerable: true,
  get: function () {
    return _back.backOut;
  }
});
Object.defineProperty(exports, "easeBounce", {
  enumerable: true,
  get: function () {
    return _bounce.bounceOut;
  }
});
Object.defineProperty(exports, "easeBounceIn", {
  enumerable: true,
  get: function () {
    return _bounce.bounceIn;
  }
});
Object.defineProperty(exports, "easeBounceInOut", {
  enumerable: true,
  get: function () {
    return _bounce.bounceInOut;
  }
});
Object.defineProperty(exports, "easeBounceOut", {
  enumerable: true,
  get: function () {
    return _bounce.bounceOut;
  }
});
Object.defineProperty(exports, "easeCircle", {
  enumerable: true,
  get: function () {
    return _circle.circleInOut;
  }
});
Object.defineProperty(exports, "easeCircleIn", {
  enumerable: true,
  get: function () {
    return _circle.circleIn;
  }
});
Object.defineProperty(exports, "easeCircleInOut", {
  enumerable: true,
  get: function () {
    return _circle.circleInOut;
  }
});
Object.defineProperty(exports, "easeCircleOut", {
  enumerable: true,
  get: function () {
    return _circle.circleOut;
  }
});
Object.defineProperty(exports, "easeCubic", {
  enumerable: true,
  get: function () {
    return _cubic.cubicInOut;
  }
});
Object.defineProperty(exports, "easeCubicIn", {
  enumerable: true,
  get: function () {
    return _cubic.cubicIn;
  }
});
Object.defineProperty(exports, "easeCubicInOut", {
  enumerable: true,
  get: function () {
    return _cubic.cubicInOut;
  }
});
Object.defineProperty(exports, "easeCubicOut", {
  enumerable: true,
  get: function () {
    return _cubic.cubicOut;
  }
});
Object.defineProperty(exports, "easeElastic", {
  enumerable: true,
  get: function () {
    return _elastic.elasticOut;
  }
});
Object.defineProperty(exports, "easeElasticIn", {
  enumerable: true,
  get: function () {
    return _elastic.elasticIn;
  }
});
Object.defineProperty(exports, "easeElasticInOut", {
  enumerable: true,
  get: function () {
    return _elastic.elasticInOut;
  }
});
Object.defineProperty(exports, "easeElasticOut", {
  enumerable: true,
  get: function () {
    return _elastic.elasticOut;
  }
});
Object.defineProperty(exports, "easeExp", {
  enumerable: true,
  get: function () {
    return _exp.expInOut;
  }
});
Object.defineProperty(exports, "easeExpIn", {
  enumerable: true,
  get: function () {
    return _exp.expIn;
  }
});
Object.defineProperty(exports, "easeExpInOut", {
  enumerable: true,
  get: function () {
    return _exp.expInOut;
  }
});
Object.defineProperty(exports, "easeExpOut", {
  enumerable: true,
  get: function () {
    return _exp.expOut;
  }
});
Object.defineProperty(exports, "easeLinear", {
  enumerable: true,
  get: function () {
    return _linear.linear;
  }
});
Object.defineProperty(exports, "easePoly", {
  enumerable: true,
  get: function () {
    return _poly.polyInOut;
  }
});
Object.defineProperty(exports, "easePolyIn", {
  enumerable: true,
  get: function () {
    return _poly.polyIn;
  }
});
Object.defineProperty(exports, "easePolyInOut", {
  enumerable: true,
  get: function () {
    return _poly.polyInOut;
  }
});
Object.defineProperty(exports, "easePolyOut", {
  enumerable: true,
  get: function () {
    return _poly.polyOut;
  }
});
Object.defineProperty(exports, "easeQuad", {
  enumerable: true,
  get: function () {
    return _quad.quadInOut;
  }
});
Object.defineProperty(exports, "easeQuadIn", {
  enumerable: true,
  get: function () {
    return _quad.quadIn;
  }
});
Object.defineProperty(exports, "easeQuadInOut", {
  enumerable: true,
  get: function () {
    return _quad.quadInOut;
  }
});
Object.defineProperty(exports, "easeQuadOut", {
  enumerable: true,
  get: function () {
    return _quad.quadOut;
  }
});
Object.defineProperty(exports, "easeSin", {
  enumerable: true,
  get: function () {
    return _sin.sinInOut;
  }
});
Object.defineProperty(exports, "easeSinIn", {
  enumerable: true,
  get: function () {
    return _sin.sinIn;
  }
});
Object.defineProperty(exports, "easeSinInOut", {
  enumerable: true,
  get: function () {
    return _sin.sinInOut;
  }
});
Object.defineProperty(exports, "easeSinOut", {
  enumerable: true,
  get: function () {
    return _sin.sinOut;
  }
});
var _linear = require("./linear.js");
var _quad = require("./quad.js");
var _cubic = require("./cubic.js");
var _poly = require("./poly.js");
var _sin = require("./sin.js");
var _exp = require("./exp.js");
var _circle = require("./circle.js");
var _bounce = require("./bounce.js");
var _back = require("./back.js");
var _elastic = require("./elastic.js");
},{"./linear.js":"node_modules/d3-ease/src/linear.js","./quad.js":"node_modules/d3-ease/src/quad.js","./cubic.js":"node_modules/d3-ease/src/cubic.js","./poly.js":"node_modules/d3-ease/src/poly.js","./sin.js":"node_modules/d3-ease/src/sin.js","./exp.js":"node_modules/d3-ease/src/exp.js","./circle.js":"node_modules/d3-ease/src/circle.js","./bounce.js":"node_modules/d3-ease/src/bounce.js","./back.js":"node_modules/d3-ease/src/back.js","./elastic.js":"node_modules/d3-ease/src/elastic.js"}],"node_modules/d3-transition/src/selection/transition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("../transition/index.js");
var _schedule = _interopRequireDefault(require("../transition/schedule.js"));
var _d3Ease = require("d3-ease");
var _d3Timer = require("d3-timer");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: _d3Ease.easeCubicInOut
};
function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}
function _default(name) {
  var id, timing;
  if (name instanceof _index.Transition) {
    id = name._id, name = name._name;
  } else {
    id = (0, _index.newId)(), (timing = defaultTiming).time = (0, _d3Timer.now)(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        (0, _schedule.default)(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }
  return new _index.Transition(groups, this._parents, name, id);
}
},{"../transition/index.js":"node_modules/d3-transition/src/transition/index.js","../transition/schedule.js":"node_modules/d3-transition/src/transition/schedule.js","d3-ease":"node_modules/d3-ease/src/index.js","d3-timer":"node_modules/d3-timer/src/index.js"}],"node_modules/d3-transition/src/selection/index.js":[function(require,module,exports) {
"use strict";

var _d3Selection = require("d3-selection");
var _interrupt = _interopRequireDefault(require("./interrupt.js"));
var _transition = _interopRequireDefault(require("./transition.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_d3Selection.selection.prototype.interrupt = _interrupt.default;
_d3Selection.selection.prototype.transition = _transition.default;
},{"d3-selection":"node_modules/d3-selection/src/index.js","./interrupt.js":"node_modules/d3-transition/src/selection/interrupt.js","./transition.js":"node_modules/d3-transition/src/selection/transition.js"}],"node_modules/d3-transition/src/active.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./transition/index.js");
var _schedule = require("./transition/schedule.js");
var root = [null];
function _default(node, name) {
  var schedules = node.__transition,
    schedule,
    i;
  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > _schedule.SCHEDULED && schedule.name === name) {
        return new _index.Transition([[node]], root, name, +i);
      }
    }
  }
  return null;
}
},{"./transition/index.js":"node_modules/d3-transition/src/transition/index.js","./transition/schedule.js":"node_modules/d3-transition/src/transition/schedule.js"}],"node_modules/d3-transition/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "active", {
  enumerable: true,
  get: function () {
    return _active.default;
  }
});
Object.defineProperty(exports, "interrupt", {
  enumerable: true,
  get: function () {
    return _interrupt.default;
  }
});
Object.defineProperty(exports, "transition", {
  enumerable: true,
  get: function () {
    return _index2.default;
  }
});
require("./selection/index.js");
var _index2 = _interopRequireDefault(require("./transition/index.js"));
var _active = _interopRequireDefault(require("./active.js"));
var _interrupt = _interopRequireDefault(require("./interrupt.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./selection/index.js":"node_modules/d3-transition/src/selection/index.js","./transition/index.js":"node_modules/d3-transition/src/transition/index.js","./active.js":"node_modules/d3-transition/src/active.js","./interrupt.js":"node_modules/d3-transition/src/interrupt.js"}],"js/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animals = void 0;
var animals = exports.animals = [{
  id: 1,
  class: "train",
  animal: "cat",
  fluffiness: 0.3395684301,
  weight: 3.8497090733
}, {
  id: 2,
  class: "train",
  animal: "cat",
  fluffiness: 0.9329005738,
  weight: 4.1921745764
}, {
  id: 3,
  class: "train",
  animal: "cat",
  fluffiness: 1.4649664364,
  weight: 4.980204621
}, {
  id: 4,
  class: "train",
  animal: "cat",
  fluffiness: -1.754603978,
  weight: 2.3205771242
}, {
  id: 5,
  class: "train",
  animal: "cat",
  fluffiness: 3.3171174006,
  weight: 1.4309180305
}, {
  id: 6,
  class: "validation",
  animal: "cat",
  fluffiness: 5.969038196,
  weight: 5.4902168132
}, {
  id: 7,
  class: "train",
  animal: "cat",
  fluffiness: 4.2734221774,
  weight: 1.3867782915
}, {
  id: 8,
  class: "test",
  animal: "cat",
  fluffiness: 1.7798907274,
  weight: -0.4432623166
}, {
  id: 9,
  class: "validation",
  animal: "cat",
  fluffiness: 0.9958266626,
  weight: 2.2605570081
}, {
  id: 10,
  class: "train",
  animal: "cat",
  fluffiness: 1.9513266053,
  weight: 3.4254536937
}, {
  id: 11,
  class: "train",
  animal: "cat",
  fluffiness: 0.7102687647,
  weight: 2.5828849987
}, {
  id: 12,
  class: "test",
  animal: "cat",
  fluffiness: 2.2935555279,
  weight: 4.1506316501
}, {
  id: 13,
  class: "train",
  animal: "cat",
  fluffiness: 1.243045228,
  weight: 5.0072872251
}, {
  id: 14,
  class: "validation",
  animal: "cat",
  fluffiness: 1.3801740281,
  weight: 1.8401170569
}, {
  id: 15,
  class: "train",
  animal: "cat",
  fluffiness: 2.2194120188,
  weight: 3.7368825622
}, {
  id: 16,
  class: "test",
  animal: "cat",
  fluffiness: 1.1446295763,
  weight: -0.7676447929
}, {
  id: 17,
  class: "train",
  animal: "cat",
  fluffiness: 4.9640417147,
  weight: 4.5967988261
}, {
  id: 18,
  class: "validation",
  animal: "cat",
  fluffiness: 3.585817288,
  weight: 3.2829857923
}, {
  id: 19,
  class: "validation",
  animal: "cat",
  fluffiness: 5.1693458925,
  weight: 0.3535120496
}, {
  id: 20,
  class: "test",
  animal: "cat",
  fluffiness: 1.0451056615,
  weight: 2.3045578302
}, {
  id: 21,
  class: "test",
  animal: "cat",
  fluffiness: 1.0740808468,
  weight: 0.1892981831
}, {
  id: 22,
  class: "test",
  animal: "cat",
  fluffiness: 0.7764178017,
  weight: 1.9052039509
}, {
  id: 23,
  class: "train",
  animal: "cat",
  fluffiness: 2.6598947539,
  weight: 0.0559172102
}, {
  id: 24,
  class: "train",
  animal: "cat",
  fluffiness: 2.1372303538,
  weight: 3.9144280381
}, {
  id: 25,
  class: "test",
  animal: "cat",
  fluffiness: 3.4749431662,
  weight: 5.1588436095
}, {
  id: 26,
  class: "train",
  animal: "cat",
  fluffiness: 2.8535408727,
  weight: 0.6913539509
}, {
  id: 27,
  class: "train",
  animal: "cat",
  fluffiness: 4.1249118506,
  weight: 2.5370126092
}, {
  id: 28,
  class: "validation",
  animal: "cat",
  fluffiness: 8.456993295,
  weight: 7.6355901615
}, {
  id: 29,
  class: "validation",
  animal: "cat",
  fluffiness: 4.8289402678,
  weight: 2.2588681402
}, {
  id: 30,
  class: "test",
  animal: "cat",
  fluffiness: 4.7317139061,
  weight: 4.5245785086
}, {
  id: 31,
  class: "validation",
  animal: "cat",
  fluffiness: -0.020449048,
  weight: 6.7229624238
}, {
  id: 32,
  class: "train",
  animal: "cat",
  fluffiness: 0.3980243841,
  weight: 1.5793157914
}, {
  id: 33,
  class: "test",
  animal: "cat",
  fluffiness: 1.1194665869,
  weight: 3.0749664648
}, {
  id: 34,
  class: "test",
  animal: "dog",
  fluffiness: 4.1798149279,
  weight: 3.7530702897
}, {
  id: 35,
  class: "validation",
  animal: "dog",
  fluffiness: 3.430356098,
  weight: 4.9522229119
}, {
  id: 36,
  class: "validation",
  animal: "dog",
  fluffiness: 4.1092221307,
  weight: 5.1129316259
}, {
  id: 37,
  class: "test",
  animal: "dog",
  fluffiness: 4.3597474532,
  weight: 4.8591861099
}, {
  id: 38,
  class: "train",
  animal: "dog",
  fluffiness: 4.1680410042,
  weight: 4.2694119763
}, {
  id: 39,
  class: "train",
  animal: "dog",
  fluffiness: 4.3136539571,
  weight: 4.8750020036
}, {
  id: 40,
  class: "validation",
  animal: "dog",
  fluffiness: 2.9295977765,
  weight: 3.5141707844
}, {
  id: 41,
  class: "train",
  animal: "dog",
  fluffiness: 4.7573689612,
  weight: 6.3884272365
}, {
  id: 42,
  class: "train",
  animal: "dog",
  fluffiness: 6.0135223606,
  weight: 4.2875695824
}, {
  id: 43,
  class: "train",
  animal: "dog",
  fluffiness: 3.1238974229,
  weight: 5.9264108312
}, {
  id: 44,
  class: "train",
  animal: "dog",
  fluffiness: 5.8386068945,
  weight: 4.8610556341
}, {
  id: 45,
  class: "train",
  animal: "dog",
  fluffiness: 2.8963612818,
  weight: 5.6217562101
}, {
  id: 46,
  class: "validation",
  animal: "dog",
  fluffiness: 4.7228669078,
  weight: 3.5962935509
}, {
  id: 47,
  class: "train",
  animal: "dog",
  fluffiness: 4.0018535795,
  weight: 3.6803748587
}, {
  id: 48,
  class: "test",
  animal: "dog",
  fluffiness: 4.3172921474,
  weight: 5.1232517288
}, {
  id: 49,
  class: "test",
  animal: "dog",
  fluffiness: 3.6360179255,
  weight: 7.3927980009
}, {
  id: 50,
  class: "train",
  animal: "dog",
  fluffiness: 5.5713447453,
  weight: 6.1974414184
}, {
  id: 51,
  class: "validation",
  animal: "dog",
  fluffiness: 5.4478954122,
  weight: 4.4923585338
}, {
  id: 52,
  class: "validation",
  animal: "dog",
  fluffiness: 7.0171795504,
  weight: 5.0476809105
}, {
  id: 53,
  class: "test",
  animal: "dog",
  fluffiness: 5.3263760362,
  weight: 3.3503760428
}, {
  id: 54,
  class: "train",
  animal: "dog",
  fluffiness: 3.1220500159,
  weight: 5.5761419998
}, {
  id: 55,
  class: "validation",
  animal: "dog",
  fluffiness: 3.8820683137,
  weight: 6.1581615814
}, {
  id: 56,
  class: "train",
  animal: "dog",
  fluffiness: 5.961141133,
  weight: 6.1566959577
}, {
  id: 57,
  class: "test",
  animal: "dog",
  fluffiness: 4.9399098656,
  weight: 6.768915416
}, {
  id: 58,
  class: "train",
  animal: "dog",
  fluffiness: 3.0794095057,
  weight: 4.5547527302
}, {
  id: 59,
  class: "train",
  animal: "dog",
  fluffiness: 5.2144455712,
  weight: 3.7487027893
}, {
  id: 60,
  class: "validation",
  animal: "dog",
  fluffiness: 4.2903883693,
  weight: 5.8219822698
}, {
  id: 61,
  class: "test",
  animal: "dog",
  fluffiness: 5.7338553022,
  weight: 5.1246676088
}, {
  id: 62,
  class: "train",
  animal: "dog",
  fluffiness: 3.9063076337,
  weight: 4.4531077178
}];
},{}],"js/LogisticRegression.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogisticRegression = void 0;
var _data = require("./data");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LogisticRegression = exports.LogisticRegression = /*#__PURE__*/function () {
  function LogisticRegression(opts) {
    _classCallCheck(this, LogisticRegression);
    this.iterations = opts.iterations;
    this.startFeature = opts.startFeature;
    this.learningRate = opts.learningRate;
    this.X = _data.animals.map(function (d) {
      return {
        weight: d.weight,
        fluffiness: d.fluffiness
      };
    });
    // this.X.filter((d) => d.class === "train");

    this.y = _data.animals.map(function (d) {
      return d.animal;
    });
    this.yLabel = this.y.map(function (d) {
      return d === "cat" ? 0 : 1;
    });
    this.fit("weight", this.X);
  }
  return _createClass(LogisticRegression, [{
    key: "fit",
    value: function fit(feature, data) {
      if (feature === "both") {
        // let's just start off with X1
        var trainData = [data.map(function (d) {
          return +d["fluffiness"];
        }), data.map(function (d) {
          return +d["weight"];
        })];
        var label = this.yLabel;
        this.weights = this.logReg(trainData, label);
        this.decisionBoundary = -this.weights[0] / this.weights[1];
      } else {
        // let's just start off with X1
        var _trainData = [data.map(function (d) {
          return +d[feature];
        })];
        var _label = this.yLabel;
        this.weights = this.logReg(_trainData, _label);
        this.decisionBoundary = -this.weights[0] / this.weights[1];
      }
    }
  }, {
    key: "sigmoid",
    value: function sigmoid(scores) {
      // define equation: 1 / ( 1 + e( - z ) )
      var sigmoidEq = function sigmoidEq(d) {
        return 1 / (1 + Math.exp(-d));
      };
      // destructure arrays from matrix
      var _scores = _slicedToArray(scores, 2),
        x1 = _scores[0],
        x2 = _scores[1];
      // evaluate sigmoid
      if (scores.length === 1) {
        return [x1.map(sigmoidEq)];
      } else {
        // 2 dimension case, so apply to each side
        x1 = x1.map(sigmoidEq);
        x2 = x2.map(sigmoidEq);
        return [x1, x2];
      }
    }

    // compute dot product between our features and weights
  }, {
    key: "dotProduct",
    value: function dotProduct(a, weights) {
      var n = a[0].length;

      // init scores array
      var scores = [];
      var _loop = function _loop(row) {
        var rowSum = 0;
        weights.map(function (weight, col) {
          rowSum += a[col][row] * weight;
        });
        scores.push(rowSum);
      };
      for (var row = 0; row < n; row++) {
        _loop(row);
      }
      return [scores];
    }
  }, {
    key: "logReg",
    value: function logReg(features, target) {
      var _this = this;
      var self = this;
      // helper func
      var subtractArrays = function subtractArrays(a, b) {
        return a.map(function (x, i) {
          return x - b[i];
        });
      };

      // add intercept term
      var m = features[0].length;

      // add intercept to data
      var intercept = new Array(m).fill(1);
      features.unshift(intercept);

      // initialize weights
      // (get length here to pad for bias weight)
      var n = features.length;
      this.weights = new Array(n).fill(0.5);

      // perform updates
      var _loop2 = function _loop2() {
        var scores = _this.dotProduct(features, _this.weights);
        var predictions = _this.sigmoid(scores);
        var error = subtractArrays(target, predictions[0]);
        var gradient = _this.dotProduct(transpose(features), error);
        _this.weights = _this.weights.map(function (w, i) {
          return w + gradient[0][i] * self.learningRate;
        });
      };
      for (var index = 0; index < self.iterations; index++) {
        _loop2();
      }
      return this.weights;
    }
  }]);
}(); // transpose matrix
function transpose(m) {
  return m[0].map(function (x, i) {
    return m.map(function (x) {
      return x[i];
    });
  });
}
},{"./data":"js/data.js"}],"js/colors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationColor = exports.trainColor = exports.testColor = void 0;
var trainColor = exports.trainColor = "#2D3142";
var testColor = exports.testColor = "#FF934F";
var validationColor = exports.validationColor = "#058ED9";
},{}],"node_modules/d3-array/src/ascending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
},{}],"node_modules/d3-array/src/bisector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _ascending = _interopRequireDefault(require("./ascending.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(f) {
  let delta = f;
  let compare = f;
  if (f.length === 1) {
    delta = (d, x) => f(d) - x;
    compare = ascendingComparator(f);
  }
  function left(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
    }
    return lo;
  }
  function right(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
    }
    return lo;
  }
  function center(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }
  return {
    left,
    center,
    right
  };
}
function ascendingComparator(f) {
  return (d, x) => (0, _ascending.default)(f(d), x);
}
},{"./ascending.js":"node_modules/d3-array/src/ascending.js"}],"node_modules/d3-array/src/number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.numbers = numbers;
function _default(x) {
  return x === null ? NaN : +x;
}
function* numbers(values, valueof) {
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}
},{}],"node_modules/d3-array/src/bisect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.bisectRight = exports.bisectLeft = exports.bisectCenter = void 0;
var _ascending = _interopRequireDefault(require("./ascending.js"));
var _bisector = _interopRequireDefault(require("./bisector.js"));
var _number = _interopRequireDefault(require("./number.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ascendingBisect = (0, _bisector.default)(_ascending.default);
const bisectRight = exports.bisectRight = ascendingBisect.right;
const bisectLeft = exports.bisectLeft = ascendingBisect.left;
const bisectCenter = exports.bisectCenter = (0, _bisector.default)(_number.default).center;
var _default = exports.default = bisectRight;
},{"./ascending.js":"node_modules/d3-array/src/ascending.js","./bisector.js":"node_modules/d3-array/src/bisector.js","./number.js":"node_modules/d3-array/src/number.js"}],"node_modules/d3-array/src/count.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = count;
function count(values, valueof) {
  let count = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        ++count;
      }
    }
  }
  return count;
}
},{}],"node_modules/d3-array/src/cross.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cross;
function length(array) {
  return array.length | 0;
}
function empty(length) {
  return !(length > 0);
}
function arrayify(values) {
  return typeof values !== "object" || "length" in values ? values : Array.from(values);
}
function reducer(reduce) {
  return values => reduce(...values);
}
function cross(...values) {
  const reduce = typeof values[values.length - 1] === "function" && reducer(values.pop());
  values = values.map(arrayify);
  const lengths = values.map(length);
  const j = values.length - 1;
  const index = new Array(j + 1).fill(0);
  const product = [];
  if (j < 0 || lengths.some(empty)) return product;
  while (true) {
    product.push(index.map((j, i) => values[i][j]));
    let i = j;
    while (++index[i] === lengths[i]) {
      if (i === 0) return reduce ? product.map(reduce) : product;
      index[i--] = 0;
    }
  }
}
},{}],"node_modules/d3-array/src/cumsum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cumsum;
function cumsum(values, valueof) {
  var sum = 0,
    index = 0;
  return Float64Array.from(values, valueof === undefined ? v => sum += +v || 0 : v => sum += +valueof(v, index++, values) || 0);
}
},{}],"node_modules/d3-array/src/descending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
},{}],"node_modules/d3-array/src/variance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = variance;
function variance(values, valueof) {
  let count = 0;
  let delta;
  let mean = 0;
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        delta = value - mean;
        mean += delta / ++count;
        sum += delta * (value - mean);
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        delta = value - mean;
        mean += delta / ++count;
        sum += delta * (value - mean);
      }
    }
  }
  if (count > 1) return sum / (count - 1);
}
},{}],"node_modules/d3-array/src/deviation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deviation;
var _variance = _interopRequireDefault(require("./variance.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function deviation(values, valueof) {
  const v = (0, _variance.default)(values, valueof);
  return v ? Math.sqrt(v) : v;
}
},{"./variance.js":"node_modules/d3-array/src/variance.js"}],"node_modules/d3-array/src/extent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(values, valueof) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}
},{}],"node_modules/d3-array/src/fsum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Adder = void 0;
exports.fcumsum = fcumsum;
exports.fsum = fsum;
// https://github.com/python/cpython/blob/a74eea238f5baba15797e2e8b570d153bc8690a7/Modules/mathmodule.c#L1423
class Adder {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x) {
    const p = this._partials;
    let i = 0;
    for (let j = 0; j < this._n && j < 32; j++) {
      const y = p[j],
        hi = x + y,
        lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
      if (lo) p[i++] = lo;
      x = hi;
    }
    p[i] = x;
    this._n = i + 1;
    return this;
  }
  valueOf() {
    const p = this._partials;
    let n = this._n,
      x,
      y,
      lo,
      hi = 0;
    if (n > 0) {
      hi = p[--n];
      while (n > 0) {
        x = hi;
        y = p[--n];
        hi = x + y;
        lo = y - (hi - x);
        if (lo) break;
      }
      if (n > 0 && (lo < 0 && p[n - 1] < 0 || lo > 0 && p[n - 1] > 0)) {
        y = lo * 2;
        x = hi + y;
        if (y == x - hi) hi = x;
      }
    }
    return hi;
  }
}
exports.Adder = Adder;
function fsum(values, valueof) {
  const adder = new Adder();
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        adder.add(value);
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        adder.add(value);
      }
    }
  }
  return +adder;
}
function fcumsum(values, valueof) {
  const adder = new Adder();
  let index = -1;
  return Float64Array.from(values, valueof === undefined ? v => adder.add(+v || 0) : v => adder.add(+valueof(v, ++index, values) || 0));
}
},{}],"node_modules/internmap/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternSet = exports.InternMap = void 0;
class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, {
      _intern: {
        value: new Map()
      },
      _key: {
        value: key
      }
    });
    if (entries != null) for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}
exports.InternMap = InternMap;
class InternSet extends Set {
  constructor(values, key = keyof) {
    super();
    Object.defineProperties(this, {
      _intern: {
        value: new Map()
      },
      _key: {
        value: key
      }
    });
    if (values != null) for (const value of values) this.add(value);
  }
  has(value) {
    return super.has(intern_get(this, value));
  }
  add(value) {
    return super.add(intern_set(this, value));
  }
  delete(value) {
    return super.delete(intern_delete(this, value));
  }
}
exports.InternSet = InternSet;
function intern_get({
  _intern,
  _key
}, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({
  _intern,
  _key
}, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({
  _intern,
  _key
}, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(value);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}
},{}],"node_modules/d3-array/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return x;
}
},{}],"node_modules/d3-array/src/group.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = group;
exports.groups = groups;
exports.index = index;
exports.indexes = indexes;
exports.rollup = rollup;
exports.rollups = rollups;
var _internmap = require("internmap");
var _identity = _interopRequireDefault(require("./identity.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function group(values, ...keys) {
  return nest(values, _identity.default, _identity.default, keys);
}
function groups(values, ...keys) {
  return nest(values, Array.from, _identity.default, keys);
}
function rollup(values, reduce, ...keys) {
  return nest(values, _identity.default, reduce, keys);
}
function rollups(values, reduce, ...keys) {
  return nest(values, Array.from, reduce, keys);
}
function index(values, ...keys) {
  return nest(values, _identity.default, unique, keys);
}
function indexes(values, ...keys) {
  return nest(values, Array.from, unique, keys);
}
function unique(values) {
  if (values.length !== 1) throw new Error("duplicate key");
  return values[0];
}
function nest(values, map, reduce, keys) {
  return function regroup(values, i) {
    if (i >= keys.length) return reduce(values);
    const groups = new _internmap.InternMap();
    const keyof = keys[i++];
    let index = -1;
    for (const value of values) {
      const key = keyof(value, ++index, values);
      const group = groups.get(key);
      if (group) group.push(value);else groups.set(key, [value]);
    }
    for (const [key, values] of groups) {
      groups.set(key, regroup(values, i));
    }
    return map(groups);
  }(values, 0);
}
},{"internmap":"node_modules/internmap/src/index.js","./identity.js":"node_modules/d3-array/src/identity.js"}],"node_modules/d3-array/src/permute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(source, keys) {
  return Array.from(keys, key => source[key]);
}
},{}],"node_modules/d3-array/src/sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sort;
var _ascending = _interopRequireDefault(require("./ascending.js"));
var _permute = _interopRequireDefault(require("./permute.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function sort(values, ...F) {
  if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
  values = Array.from(values);
  let [f = _ascending.default] = F;
  if (f.length === 1 || F.length > 1) {
    const index = Uint32Array.from(values, (d, i) => i);
    if (F.length > 1) {
      F = F.map(f => values.map(f));
      index.sort((i, j) => {
        for (const f of F) {
          const c = (0, _ascending.default)(f[i], f[j]);
          if (c) return c;
        }
      });
    } else {
      f = values.map(f);
      index.sort((i, j) => (0, _ascending.default)(f[i], f[j]));
    }
    return (0, _permute.default)(values, index);
  }
  return values.sort(f);
}
},{"./ascending.js":"node_modules/d3-array/src/ascending.js","./permute.js":"node_modules/d3-array/src/permute.js"}],"node_modules/d3-array/src/groupSort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = groupSort;
var _ascending = _interopRequireDefault(require("./ascending.js"));
var _group = _interopRequireWildcard(require("./group.js"));
var _sort = _interopRequireDefault(require("./sort.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function groupSort(values, reduce, key) {
  return (reduce.length === 1 ? (0, _sort.default)((0, _group.rollup)(values, reduce, key), ([ak, av], [bk, bv]) => (0, _ascending.default)(av, bv) || (0, _ascending.default)(ak, bk)) : (0, _sort.default)((0, _group.default)(values, key), ([ak, av], [bk, bv]) => reduce(av, bv) || (0, _ascending.default)(ak, bk))).map(([key]) => key);
}
},{"./ascending.js":"node_modules/d3-array/src/ascending.js","./group.js":"node_modules/d3-array/src/group.js","./sort.js":"node_modules/d3-array/src/sort.js"}],"node_modules/d3-array/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slice = exports.map = void 0;
var array = Array.prototype;
var slice = exports.slice = array.slice;
var map = exports.map = array.map;
},{}],"node_modules/d3-array/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return function () {
    return x;
  };
}
},{}],"node_modules/d3-array/src/ticks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.tickIncrement = tickIncrement;
exports.tickStep = tickStep;
var e10 = Math.sqrt(50),
  e5 = Math.sqrt(10),
  e2 = Math.sqrt(2);
function _default(start, stop, count) {
  var reverse,
    i = -1,
    n,
    ticks,
    step;
  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];
  if (step > 0) {
    let r0 = Math.round(start / step),
      r1 = Math.round(stop / step);
    if (r0 * step < start) ++r0;
    if (r1 * step > stop) --r1;
    ticks = new Array(n = r1 - r0 + 1);
    while (++i < n) ticks[i] = (r0 + i) * step;
  } else {
    step = -step;
    let r0 = Math.round(start * step),
      r1 = Math.round(stop * step);
    if (r0 / step < start) ++r0;
    if (r1 / step > stop) --r1;
    ticks = new Array(n = r1 - r0 + 1);
    while (++i < n) ticks[i] = (r0 + i) / step;
  }
  if (reverse) ticks.reverse();
  return ticks;
}
function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
    power = Math.floor(Math.log(step) / Math.LN10),
    error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
    step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
    error = step0 / step1;
  if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}
},{}],"node_modules/d3-array/src/nice.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nice;
var _ticks = require("./ticks.js");
function nice(start, stop, count) {
  let prestep;
  while (true) {
    const step = (0, _ticks.tickIncrement)(start, stop, count);
    if (step === prestep || step === 0 || !isFinite(step)) {
      return [start, stop];
    } else if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
    }
    prestep = step;
  }
}
},{"./ticks.js":"node_modules/d3-array/src/ticks.js"}],"node_modules/d3-array/src/threshold/sturges.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _count = _interopRequireDefault(require("../count.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(values) {
  return Math.ceil(Math.log((0, _count.default)(values)) / Math.LN2) + 1;
}
},{"../count.js":"node_modules/d3-array/src/count.js"}],"node_modules/d3-array/src/bin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _array = require("./array.js");
var _bisect = _interopRequireDefault(require("./bisect.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
var _extent = _interopRequireDefault(require("./extent.js"));
var _identity = _interopRequireDefault(require("./identity.js"));
var _nice = _interopRequireDefault(require("./nice.js"));
var _ticks = _interopRequireWildcard(require("./ticks.js"));
var _sturges = _interopRequireDefault(require("./threshold/sturges.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default() {
  var value = _identity.default,
    domain = _extent.default,
    threshold = _sturges.default;
  function histogram(data) {
    if (!Array.isArray(data)) data = Array.from(data);
    var i,
      n = data.length,
      x,
      values = new Array(n);
    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }
    var xz = domain(values),
      x0 = xz[0],
      x1 = xz[1],
      tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds, and nice the
    // default domain accordingly.
    if (!Array.isArray(tz)) {
      const max = x1,
        tn = +tz;
      if (domain === _extent.default) [x0, x1] = (0, _nice.default)(x0, x1, tn);
      tz = (0, _ticks.default)(x0, x1, tn);

      // If the last threshold is coincident with the domain’s upper bound, the
      // last bin will be zero-width. If the default domain is used, and this
      // last threshold is coincident with the maximum input value, we can
      // extend the niced upper bound by one tick to ensure uniform bin widths;
      // otherwise, we simply remove the last threshold. Note that we don’t
      // coerce values or the domain to numbers, and thus must be careful to
      // compare order (>=) rather than strict equality (===)!
      if (tz[tz.length - 1] >= x1) {
        if (max >= x1 && domain === _extent.default) {
          const step = (0, _ticks.tickIncrement)(x0, x1, tn);
          if (isFinite(step)) {
            if (step > 0) {
              x1 = (Math.floor(x1 / step) + 1) * step;
            } else if (step < 0) {
              x1 = (Math.ceil(x1 * -step) + 1) / -step;
            }
          }
        } else {
          tz.pop();
        }
      }
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;
    var bins = new Array(m + 1),
      bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[(0, _bisect.default)(tz, x, 0, m)].push(data[i]);
      }
    }
    return bins;
  }
  histogram.value = function (_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constant.default)(_), histogram) : value;
  };
  histogram.domain = function (_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : (0, _constant.default)([_[0], _[1]]), histogram) : domain;
  };
  histogram.thresholds = function (_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? (0, _constant.default)(_array.slice.call(_)) : (0, _constant.default)(_), histogram) : threshold;
  };
  return histogram;
}
},{"./array.js":"node_modules/d3-array/src/array.js","./bisect.js":"node_modules/d3-array/src/bisect.js","./constant.js":"node_modules/d3-array/src/constant.js","./extent.js":"node_modules/d3-array/src/extent.js","./identity.js":"node_modules/d3-array/src/identity.js","./nice.js":"node_modules/d3-array/src/nice.js","./ticks.js":"node_modules/d3-array/src/ticks.js","./threshold/sturges.js":"node_modules/d3-array/src/threshold/sturges.js"}],"node_modules/d3-array/src/max.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = max;
function max(values, valueof) {
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null && (max < value || max === undefined && value >= value)) {
        max = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (max < value || max === undefined && value >= value)) {
        max = value;
      }
    }
  }
  return max;
}
},{}],"node_modules/d3-array/src/min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = min;
function min(values, valueof) {
  let min;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null && (min > value || min === undefined && value >= value)) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (min > value || min === undefined && value >= value)) {
        min = value;
      }
    }
  }
  return min;
}
},{}],"node_modules/d3-array/src/quickselect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quickselect;
var _ascending = _interopRequireDefault(require("./ascending.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Based on https://github.com/mourner/quickselect
// ISC license, Copyright 2018 Vladimir Agafonkin.
function quickselect(array, k, left = 0, right = array.length - 1, compare = _ascending.default) {
  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      quickselect(array, k, newLeft, newRight, compare);
    }
    const t = array[k];
    let i = left;
    let j = right;
    swap(array, left, k);
    if (compare(array[right], t) > 0) swap(array, left, right);
    while (i < j) {
      swap(array, i, j), ++i, --j;
      while (compare(array[i], t) < 0) ++i;
      while (compare(array[j], t) > 0) --j;
    }
    if (compare(array[left], t) === 0) swap(array, left, j);else ++j, swap(array, j, right);
    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
  return array;
}
function swap(array, i, j) {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
}
},{"./ascending.js":"node_modules/d3-array/src/ascending.js"}],"node_modules/d3-array/src/quantile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quantile;
exports.quantileSorted = quantileSorted;
var _max = _interopRequireDefault(require("./max.js"));
var _min = _interopRequireDefault(require("./min.js"));
var _quickselect = _interopRequireDefault(require("./quickselect.js"));
var _number = _interopRequireWildcard(require("./number.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function quantile(values, p, valueof) {
  values = Float64Array.from((0, _number.numbers)(values, valueof));
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return (0, _min.default)(values);
  if (p >= 1) return (0, _max.default)(values);
  var n,
    i = (n - 1) * p,
    i0 = Math.floor(i),
    value0 = (0, _max.default)((0, _quickselect.default)(values, i0).subarray(0, i0 + 1)),
    value1 = (0, _min.default)(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}
function quantileSorted(values, p, valueof = _number.default) {
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
    i = (n - 1) * p,
    i0 = Math.floor(i),
    value0 = +valueof(values[i0], i0, values),
    value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}
},{"./max.js":"node_modules/d3-array/src/max.js","./min.js":"node_modules/d3-array/src/min.js","./quickselect.js":"node_modules/d3-array/src/quickselect.js","./number.js":"node_modules/d3-array/src/number.js"}],"node_modules/d3-array/src/threshold/freedmanDiaconis.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _count = _interopRequireDefault(require("../count.js"));
var _quantile = _interopRequireDefault(require("../quantile.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(values, min, max) {
  return Math.ceil((max - min) / (2 * ((0, _quantile.default)(values, 0.75) - (0, _quantile.default)(values, 0.25)) * Math.pow((0, _count.default)(values), -1 / 3)));
}
},{"../count.js":"node_modules/d3-array/src/count.js","../quantile.js":"node_modules/d3-array/src/quantile.js"}],"node_modules/d3-array/src/threshold/scott.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _count = _interopRequireDefault(require("../count.js"));
var _deviation = _interopRequireDefault(require("../deviation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(values, min, max) {
  return Math.ceil((max - min) / (3.5 * (0, _deviation.default)(values) * Math.pow((0, _count.default)(values), -1 / 3)));
}
},{"../count.js":"node_modules/d3-array/src/count.js","../deviation.js":"node_modules/d3-array/src/deviation.js"}],"node_modules/d3-array/src/maxIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = maxIndex;
function maxIndex(values, valueof) {
  let max;
  let maxIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      if (value != null && (max < value || max === undefined && value >= value)) {
        max = value, maxIndex = index;
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (max < value || max === undefined && value >= value)) {
        max = value, maxIndex = index;
      }
    }
  }
  return maxIndex;
}
},{}],"node_modules/d3-array/src/mean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mean;
function mean(values, valueof) {
  let count = 0;
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  }
  if (count) return sum / count;
}
},{}],"node_modules/d3-array/src/median.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _quantile = _interopRequireDefault(require("./quantile.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(values, valueof) {
  return (0, _quantile.default)(values, 0.5, valueof);
}
},{"./quantile.js":"node_modules/d3-array/src/quantile.js"}],"node_modules/d3-array/src/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}
function merge(arrays) {
  return Array.from(flatten(arrays));
}
},{}],"node_modules/d3-array/src/minIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minIndex;
function minIndex(values, valueof) {
  let min;
  let minIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      if (value != null && (min > value || min === undefined && value >= value)) {
        min = value, minIndex = index;
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (min > value || min === undefined && value >= value)) {
        min = value, minIndex = index;
      }
    }
  }
  return minIndex;
}
},{}],"node_modules/d3-array/src/pairs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pairs;
exports.pair = pair;
function pairs(values, pairof = pair) {
  const pairs = [];
  let previous;
  let first = false;
  for (const value of values) {
    if (first) pairs.push(pairof(previous, value));
    previous = value;
    first = true;
  }
  return pairs;
}
function pair(a, b) {
  return [a, b];
}
},{}],"node_modules/d3-array/src/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
  var i = -1,
    n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
    range = new Array(n);
  while (++i < n) {
    range[i] = start + i * step;
  }
  return range;
}
},{}],"node_modules/d3-array/src/least.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = least;
var _ascending = _interopRequireDefault(require("./ascending.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function least(values, compare = _ascending.default) {
  let min;
  let defined = false;
  if (compare.length === 1) {
    let minValue;
    for (const element of values) {
      const value = compare(element);
      if (defined ? (0, _ascending.default)(value, minValue) < 0 : (0, _ascending.default)(value, value) === 0) {
        min = element;
        minValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined ? compare(value, min) < 0 : compare(value, value) === 0) {
        min = value;
        defined = true;
      }
    }
  }
  return min;
}
},{"./ascending.js":"node_modules/d3-array/src/ascending.js"}],"node_modules/d3-array/src/leastIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = leastIndex;
var _ascending = _interopRequireDefault(require("./ascending.js"));
var _minIndex = _interopRequireDefault(require("./minIndex.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function leastIndex(values, compare = _ascending.default) {
  if (compare.length === 1) return (0, _minIndex.default)(values, compare);
  let minValue;
  let min = -1;
  let index = -1;
  for (const value of values) {
    ++index;
    if (min < 0 ? compare(value, value) === 0 : compare(value, minValue) < 0) {
      minValue = value;
      min = index;
    }
  }
  return min;
}
},{"./ascending.js":"node_modules/d3-array/src/ascending.js","./minIndex.js":"node_modules/d3-array/src/minIndex.js"}],"node_modules/d3-array/src/greatest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = greatest;
var _ascending = _interopRequireDefault(require("./ascending.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function greatest(values, compare = _ascending.default) {
  let max;
  let defined = false;
  if (compare.length === 1) {
    let maxValue;
    for (const element of values) {
      const value = compare(element);
      if (defined ? (0, _ascending.default)(value, maxValue) > 0 : (0, _ascending.default)(value, value) === 0) {
        max = element;
        maxValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined ? compare(value, max) > 0 : compare(value, value) === 0) {
        max = value;
        defined = true;
      }
    }
  }
  return max;
}
},{"./ascending.js":"node_modules/d3-array/src/ascending.js"}],"node_modules/d3-array/src/greatestIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = greatestIndex;
var _ascending = _interopRequireDefault(require("./ascending.js"));
var _maxIndex = _interopRequireDefault(require("./maxIndex.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function greatestIndex(values, compare = _ascending.default) {
  if (compare.length === 1) return (0, _maxIndex.default)(values, compare);
  let maxValue;
  let max = -1;
  let index = -1;
  for (const value of values) {
    ++index;
    if (max < 0 ? compare(value, value) === 0 : compare(value, maxValue) > 0) {
      maxValue = value;
      max = index;
    }
  }
  return max;
}
},{"./ascending.js":"node_modules/d3-array/src/ascending.js","./maxIndex.js":"node_modules/d3-array/src/maxIndex.js"}],"node_modules/d3-array/src/scan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scan;
var _leastIndex = _interopRequireDefault(require("./leastIndex.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function scan(values, compare) {
  const index = (0, _leastIndex.default)(values, compare);
  return index < 0 ? undefined : index;
}
},{"./leastIndex.js":"node_modules/d3-array/src/leastIndex.js"}],"node_modules/d3-array/src/shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.shuffler = shuffler;
var _default = exports.default = shuffler(Math.random);
function shuffler(random) {
  return function shuffle(array, i0 = 0, i1 = array.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i = random() * m-- | 0,
        t = array[m + i0];
      array[m + i0] = array[i + i0];
      array[i + i0] = t;
    }
    return array;
  };
}
},{}],"node_modules/d3-array/src/sum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sum;
function sum(values, valueof) {
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        sum += value;
      }
    }
  }
  return sum;
}
},{}],"node_modules/d3-array/src/transpose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _min = _interopRequireDefault(require("./min.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = (0, _min.default)(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
}
function length(d) {
  return d.length;
}
},{"./min.js":"node_modules/d3-array/src/min.js"}],"node_modules/d3-array/src/zip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _transpose = _interopRequireDefault(require("./transpose.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default() {
  return (0, _transpose.default)(arguments);
}
},{"./transpose.js":"node_modules/d3-array/src/transpose.js"}],"node_modules/d3-array/src/every.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = every;
function every(values, test) {
  if (typeof test !== "function") throw new TypeError("test is not a function");
  let index = -1;
  for (const value of values) {
    if (!test(value, ++index, values)) {
      return false;
    }
  }
  return true;
}
},{}],"node_modules/d3-array/src/some.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = some;
function some(values, test) {
  if (typeof test !== "function") throw new TypeError("test is not a function");
  let index = -1;
  for (const value of values) {
    if (test(value, ++index, values)) {
      return true;
    }
  }
  return false;
}
},{}],"node_modules/d3-array/src/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;
function filter(values, test) {
  if (typeof test !== "function") throw new TypeError("test is not a function");
  const array = [];
  let index = -1;
  for (const value of values) {
    if (test(value, ++index, values)) {
      array.push(value);
    }
  }
  return array;
}
},{}],"node_modules/d3-array/src/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;
function map(values, mapper) {
  if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
  if (typeof mapper !== "function") throw new TypeError("mapper is not a function");
  return Array.from(values, (value, index) => mapper(value, index, values));
}
},{}],"node_modules/d3-array/src/reduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reduce;
function reduce(values, reducer, value) {
  if (typeof reducer !== "function") throw new TypeError("reducer is not a function");
  const iterator = values[Symbol.iterator]();
  let done,
    next,
    index = -1;
  if (arguments.length < 3) {
    ({
      done,
      value
    } = iterator.next());
    if (done) return;
    ++index;
  }
  while ({
    done,
    value: next
  } = iterator.next(), !done) {
    value = reducer(value, next, ++index, values);
  }
  return value;
}
},{}],"node_modules/d3-array/src/reverse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reverse;
function reverse(values) {
  if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
  return Array.from(values).reverse();
}
},{}],"node_modules/d3-array/src/difference.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = difference;
function difference(values, ...others) {
  values = new Set(values);
  for (const other of others) {
    for (const value of other) {
      values.delete(value);
    }
  }
  return values;
}
},{}],"node_modules/d3-array/src/disjoint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = disjoint;
function disjoint(values, other) {
  const iterator = other[Symbol.iterator](),
    set = new Set();
  for (const v of values) {
    if (set.has(v)) return false;
    let value, done;
    while ({
      value,
      done
    } = iterator.next()) {
      if (done) break;
      if (Object.is(v, value)) return false;
      set.add(value);
    }
  }
  return true;
}
},{}],"node_modules/d3-array/src/set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = set;
function set(values) {
  return values instanceof Set ? values : new Set(values);
}
},{}],"node_modules/d3-array/src/intersection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intersection;
var _set = _interopRequireDefault(require("./set.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function intersection(values, ...others) {
  values = new Set(values);
  others = others.map(_set.default);
  out: for (const value of values) {
    for (const other of others) {
      if (!other.has(value)) {
        values.delete(value);
        continue out;
      }
    }
  }
  return values;
}
},{"./set.js":"node_modules/d3-array/src/set.js"}],"node_modules/d3-array/src/superset.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = superset;
function superset(values, other) {
  const iterator = values[Symbol.iterator](),
    set = new Set();
  for (const o of other) {
    if (set.has(o)) continue;
    let value, done;
    while ({
      value,
      done
    } = iterator.next()) {
      if (done) return false;
      set.add(value);
      if (Object.is(o, value)) break;
    }
  }
  return true;
}
},{}],"node_modules/d3-array/src/subset.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subset;
var _superset = _interopRequireDefault(require("./superset.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function subset(values, other) {
  return (0, _superset.default)(other, values);
}
},{"./superset.js":"node_modules/d3-array/src/superset.js"}],"node_modules/d3-array/src/union.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = union;
function union(...others) {
  const set = new Set();
  for (const other of others) {
    for (const o of other) {
      set.add(o);
    }
  }
  return set;
}
},{}],"node_modules/d3-array/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Adder", {
  enumerable: true,
  get: function () {
    return _fsum.Adder;
  }
});
Object.defineProperty(exports, "InternMap", {
  enumerable: true,
  get: function () {
    return _internmap.InternMap;
  }
});
Object.defineProperty(exports, "InternSet", {
  enumerable: true,
  get: function () {
    return _internmap.InternSet;
  }
});
Object.defineProperty(exports, "ascending", {
  enumerable: true,
  get: function () {
    return _ascending.default;
  }
});
Object.defineProperty(exports, "bin", {
  enumerable: true,
  get: function () {
    return _bin.default;
  }
});
Object.defineProperty(exports, "bisect", {
  enumerable: true,
  get: function () {
    return _bisect.default;
  }
});
Object.defineProperty(exports, "bisectCenter", {
  enumerable: true,
  get: function () {
    return _bisect.bisectCenter;
  }
});
Object.defineProperty(exports, "bisectLeft", {
  enumerable: true,
  get: function () {
    return _bisect.bisectLeft;
  }
});
Object.defineProperty(exports, "bisectRight", {
  enumerable: true,
  get: function () {
    return _bisect.bisectRight;
  }
});
Object.defineProperty(exports, "bisector", {
  enumerable: true,
  get: function () {
    return _bisector.default;
  }
});
Object.defineProperty(exports, "count", {
  enumerable: true,
  get: function () {
    return _count.default;
  }
});
Object.defineProperty(exports, "cross", {
  enumerable: true,
  get: function () {
    return _cross.default;
  }
});
Object.defineProperty(exports, "cumsum", {
  enumerable: true,
  get: function () {
    return _cumsum.default;
  }
});
Object.defineProperty(exports, "descending", {
  enumerable: true,
  get: function () {
    return _descending.default;
  }
});
Object.defineProperty(exports, "deviation", {
  enumerable: true,
  get: function () {
    return _deviation.default;
  }
});
Object.defineProperty(exports, "difference", {
  enumerable: true,
  get: function () {
    return _difference.default;
  }
});
Object.defineProperty(exports, "disjoint", {
  enumerable: true,
  get: function () {
    return _disjoint.default;
  }
});
Object.defineProperty(exports, "every", {
  enumerable: true,
  get: function () {
    return _every.default;
  }
});
Object.defineProperty(exports, "extent", {
  enumerable: true,
  get: function () {
    return _extent.default;
  }
});
Object.defineProperty(exports, "fcumsum", {
  enumerable: true,
  get: function () {
    return _fsum.fcumsum;
  }
});
Object.defineProperty(exports, "filter", {
  enumerable: true,
  get: function () {
    return _filter.default;
  }
});
Object.defineProperty(exports, "fsum", {
  enumerable: true,
  get: function () {
    return _fsum.fsum;
  }
});
Object.defineProperty(exports, "greatest", {
  enumerable: true,
  get: function () {
    return _greatest.default;
  }
});
Object.defineProperty(exports, "greatestIndex", {
  enumerable: true,
  get: function () {
    return _greatestIndex.default;
  }
});
Object.defineProperty(exports, "group", {
  enumerable: true,
  get: function () {
    return _group.default;
  }
});
Object.defineProperty(exports, "groupSort", {
  enumerable: true,
  get: function () {
    return _groupSort.default;
  }
});
Object.defineProperty(exports, "groups", {
  enumerable: true,
  get: function () {
    return _group.groups;
  }
});
Object.defineProperty(exports, "histogram", {
  enumerable: true,
  get: function () {
    return _bin.default;
  }
});
Object.defineProperty(exports, "index", {
  enumerable: true,
  get: function () {
    return _group.index;
  }
});
Object.defineProperty(exports, "indexes", {
  enumerable: true,
  get: function () {
    return _group.indexes;
  }
});
Object.defineProperty(exports, "intersection", {
  enumerable: true,
  get: function () {
    return _intersection.default;
  }
});
Object.defineProperty(exports, "least", {
  enumerable: true,
  get: function () {
    return _least.default;
  }
});
Object.defineProperty(exports, "leastIndex", {
  enumerable: true,
  get: function () {
    return _leastIndex.default;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return _map.default;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return _max.default;
  }
});
Object.defineProperty(exports, "maxIndex", {
  enumerable: true,
  get: function () {
    return _maxIndex.default;
  }
});
Object.defineProperty(exports, "mean", {
  enumerable: true,
  get: function () {
    return _mean.default;
  }
});
Object.defineProperty(exports, "median", {
  enumerable: true,
  get: function () {
    return _median.default;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function () {
    return _merge.default;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return _min.default;
  }
});
Object.defineProperty(exports, "minIndex", {
  enumerable: true,
  get: function () {
    return _minIndex.default;
  }
});
Object.defineProperty(exports, "nice", {
  enumerable: true,
  get: function () {
    return _nice.default;
  }
});
Object.defineProperty(exports, "pairs", {
  enumerable: true,
  get: function () {
    return _pairs.default;
  }
});
Object.defineProperty(exports, "permute", {
  enumerable: true,
  get: function () {
    return _permute.default;
  }
});
Object.defineProperty(exports, "quantile", {
  enumerable: true,
  get: function () {
    return _quantile.default;
  }
});
Object.defineProperty(exports, "quantileSorted", {
  enumerable: true,
  get: function () {
    return _quantile.quantileSorted;
  }
});
Object.defineProperty(exports, "quickselect", {
  enumerable: true,
  get: function () {
    return _quickselect.default;
  }
});
Object.defineProperty(exports, "range", {
  enumerable: true,
  get: function () {
    return _range.default;
  }
});
Object.defineProperty(exports, "reduce", {
  enumerable: true,
  get: function () {
    return _reduce.default;
  }
});
Object.defineProperty(exports, "reverse", {
  enumerable: true,
  get: function () {
    return _reverse.default;
  }
});
Object.defineProperty(exports, "rollup", {
  enumerable: true,
  get: function () {
    return _group.rollup;
  }
});
Object.defineProperty(exports, "rollups", {
  enumerable: true,
  get: function () {
    return _group.rollups;
  }
});
Object.defineProperty(exports, "scan", {
  enumerable: true,
  get: function () {
    return _scan.default;
  }
});
Object.defineProperty(exports, "shuffle", {
  enumerable: true,
  get: function () {
    return _shuffle.default;
  }
});
Object.defineProperty(exports, "shuffler", {
  enumerable: true,
  get: function () {
    return _shuffle.shuffler;
  }
});
Object.defineProperty(exports, "some", {
  enumerable: true,
  get: function () {
    return _some.default;
  }
});
Object.defineProperty(exports, "sort", {
  enumerable: true,
  get: function () {
    return _sort.default;
  }
});
Object.defineProperty(exports, "subset", {
  enumerable: true,
  get: function () {
    return _subset.default;
  }
});
Object.defineProperty(exports, "sum", {
  enumerable: true,
  get: function () {
    return _sum.default;
  }
});
Object.defineProperty(exports, "superset", {
  enumerable: true,
  get: function () {
    return _superset.default;
  }
});
Object.defineProperty(exports, "thresholdFreedmanDiaconis", {
  enumerable: true,
  get: function () {
    return _freedmanDiaconis.default;
  }
});
Object.defineProperty(exports, "thresholdScott", {
  enumerable: true,
  get: function () {
    return _scott.default;
  }
});
Object.defineProperty(exports, "thresholdSturges", {
  enumerable: true,
  get: function () {
    return _sturges.default;
  }
});
Object.defineProperty(exports, "tickIncrement", {
  enumerable: true,
  get: function () {
    return _ticks.tickIncrement;
  }
});
Object.defineProperty(exports, "tickStep", {
  enumerable: true,
  get: function () {
    return _ticks.tickStep;
  }
});
Object.defineProperty(exports, "ticks", {
  enumerable: true,
  get: function () {
    return _ticks.default;
  }
});
Object.defineProperty(exports, "transpose", {
  enumerable: true,
  get: function () {
    return _transpose.default;
  }
});
Object.defineProperty(exports, "union", {
  enumerable: true,
  get: function () {
    return _union.default;
  }
});
Object.defineProperty(exports, "variance", {
  enumerable: true,
  get: function () {
    return _variance.default;
  }
});
Object.defineProperty(exports, "zip", {
  enumerable: true,
  get: function () {
    return _zip.default;
  }
});
var _bisect = _interopRequireWildcard(require("./bisect.js"));
var _ascending = _interopRequireDefault(require("./ascending.js"));
var _bisector = _interopRequireDefault(require("./bisector.js"));
var _count = _interopRequireDefault(require("./count.js"));
var _cross = _interopRequireDefault(require("./cross.js"));
var _cumsum = _interopRequireDefault(require("./cumsum.js"));
var _descending = _interopRequireDefault(require("./descending.js"));
var _deviation = _interopRequireDefault(require("./deviation.js"));
var _extent = _interopRequireDefault(require("./extent.js"));
var _fsum = require("./fsum.js");
var _group = _interopRequireWildcard(require("./group.js"));
var _groupSort = _interopRequireDefault(require("./groupSort.js"));
var _bin = _interopRequireDefault(require("./bin.js"));
var _freedmanDiaconis = _interopRequireDefault(require("./threshold/freedmanDiaconis.js"));
var _scott = _interopRequireDefault(require("./threshold/scott.js"));
var _sturges = _interopRequireDefault(require("./threshold/sturges.js"));
var _max = _interopRequireDefault(require("./max.js"));
var _maxIndex = _interopRequireDefault(require("./maxIndex.js"));
var _mean = _interopRequireDefault(require("./mean.js"));
var _median = _interopRequireDefault(require("./median.js"));
var _merge = _interopRequireDefault(require("./merge.js"));
var _min = _interopRequireDefault(require("./min.js"));
var _minIndex = _interopRequireDefault(require("./minIndex.js"));
var _nice = _interopRequireDefault(require("./nice.js"));
var _pairs = _interopRequireDefault(require("./pairs.js"));
var _permute = _interopRequireDefault(require("./permute.js"));
var _quantile = _interopRequireWildcard(require("./quantile.js"));
var _quickselect = _interopRequireDefault(require("./quickselect.js"));
var _range = _interopRequireDefault(require("./range.js"));
var _least = _interopRequireDefault(require("./least.js"));
var _leastIndex = _interopRequireDefault(require("./leastIndex.js"));
var _greatest = _interopRequireDefault(require("./greatest.js"));
var _greatestIndex = _interopRequireDefault(require("./greatestIndex.js"));
var _scan = _interopRequireDefault(require("./scan.js"));
var _shuffle = _interopRequireWildcard(require("./shuffle.js"));
var _sum = _interopRequireDefault(require("./sum.js"));
var _ticks = _interopRequireWildcard(require("./ticks.js"));
var _transpose = _interopRequireDefault(require("./transpose.js"));
var _variance = _interopRequireDefault(require("./variance.js"));
var _zip = _interopRequireDefault(require("./zip.js"));
var _every = _interopRequireDefault(require("./every.js"));
var _some = _interopRequireDefault(require("./some.js"));
var _filter = _interopRequireDefault(require("./filter.js"));
var _map = _interopRequireDefault(require("./map.js"));
var _reduce = _interopRequireDefault(require("./reduce.js"));
var _reverse = _interopRequireDefault(require("./reverse.js"));
var _sort = _interopRequireDefault(require("./sort.js"));
var _difference = _interopRequireDefault(require("./difference.js"));
var _disjoint = _interopRequireDefault(require("./disjoint.js"));
var _intersection = _interopRequireDefault(require("./intersection.js"));
var _subset = _interopRequireDefault(require("./subset.js"));
var _superset = _interopRequireDefault(require("./superset.js"));
var _union = _interopRequireDefault(require("./union.js"));
var _internmap = require("internmap");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
},{"./bisect.js":"node_modules/d3-array/src/bisect.js","./ascending.js":"node_modules/d3-array/src/ascending.js","./bisector.js":"node_modules/d3-array/src/bisector.js","./count.js":"node_modules/d3-array/src/count.js","./cross.js":"node_modules/d3-array/src/cross.js","./cumsum.js":"node_modules/d3-array/src/cumsum.js","./descending.js":"node_modules/d3-array/src/descending.js","./deviation.js":"node_modules/d3-array/src/deviation.js","./extent.js":"node_modules/d3-array/src/extent.js","./fsum.js":"node_modules/d3-array/src/fsum.js","./group.js":"node_modules/d3-array/src/group.js","./groupSort.js":"node_modules/d3-array/src/groupSort.js","./bin.js":"node_modules/d3-array/src/bin.js","./threshold/freedmanDiaconis.js":"node_modules/d3-array/src/threshold/freedmanDiaconis.js","./threshold/scott.js":"node_modules/d3-array/src/threshold/scott.js","./threshold/sturges.js":"node_modules/d3-array/src/threshold/sturges.js","./max.js":"node_modules/d3-array/src/max.js","./maxIndex.js":"node_modules/d3-array/src/maxIndex.js","./mean.js":"node_modules/d3-array/src/mean.js","./median.js":"node_modules/d3-array/src/median.js","./merge.js":"node_modules/d3-array/src/merge.js","./min.js":"node_modules/d3-array/src/min.js","./minIndex.js":"node_modules/d3-array/src/minIndex.js","./nice.js":"node_modules/d3-array/src/nice.js","./pairs.js":"node_modules/d3-array/src/pairs.js","./permute.js":"node_modules/d3-array/src/permute.js","./quantile.js":"node_modules/d3-array/src/quantile.js","./quickselect.js":"node_modules/d3-array/src/quickselect.js","./range.js":"node_modules/d3-array/src/range.js","./least.js":"node_modules/d3-array/src/least.js","./leastIndex.js":"node_modules/d3-array/src/leastIndex.js","./greatest.js":"node_modules/d3-array/src/greatest.js","./greatestIndex.js":"node_modules/d3-array/src/greatestIndex.js","./scan.js":"node_modules/d3-array/src/scan.js","./shuffle.js":"node_modules/d3-array/src/shuffle.js","./sum.js":"node_modules/d3-array/src/sum.js","./ticks.js":"node_modules/d3-array/src/ticks.js","./transpose.js":"node_modules/d3-array/src/transpose.js","./variance.js":"node_modules/d3-array/src/variance.js","./zip.js":"node_modules/d3-array/src/zip.js","./every.js":"node_modules/d3-array/src/every.js","./some.js":"node_modules/d3-array/src/some.js","./filter.js":"node_modules/d3-array/src/filter.js","./map.js":"node_modules/d3-array/src/map.js","./reduce.js":"node_modules/d3-array/src/reduce.js","./reverse.js":"node_modules/d3-array/src/reverse.js","./sort.js":"node_modules/d3-array/src/sort.js","./difference.js":"node_modules/d3-array/src/difference.js","./disjoint.js":"node_modules/d3-array/src/disjoint.js","./intersection.js":"node_modules/d3-array/src/intersection.js","./subset.js":"node_modules/d3-array/src/subset.js","./superset.js":"node_modules/d3-array/src/superset.js","./union.js":"node_modules/d3-array/src/union.js","internmap":"node_modules/internmap/src/index.js"}],"node_modules/d3-collection/src/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefix = exports.default = void 0;
var prefix = exports.prefix = "$";
function Map() {}
Map.prototype = map.prototype = {
  constructor: Map,
  has: function (key) {
    return prefix + key in this;
  },
  get: function (key) {
    return this[prefix + key];
  },
  set: function (key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function (key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function () {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function () {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function () {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function () {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({
      key: property.slice(1),
      value: this[property]
    });
    return entries;
  },
  size: function () {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function () {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function (f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};
function map(object, f) {
  var map = new Map();

  // Copy constructor.
  if (object instanceof Map) object.each(function (value, key) {
    map.set(key, value);
  });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
      n = object.length,
      o;
    if (f == null) while (++i < n) map.set(i, object[i]);else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);
  return map;
}
var _default = exports.default = map;
},{}],"node_modules/d3-collection/src/nest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _map = _interopRequireDefault(require("./map"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default() {
  var keys = [],
    sortKeys = [],
    sortValues,
    rollup,
    nest;
  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }
    var i = -1,
      n = array.length,
      key = keys[depth++],
      keyValue,
      value,
      valuesByKey = (0, _map.default)(),
      values,
      result = createResult();
    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }
    valuesByKey.each(function (values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });
    return result;
  }
  function entries(map, depth) {
    if (++depth > keys.length) return map;
    var array,
      sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map.entries();else array = [], map.each(function (v, k) {
      array.push({
        key: k,
        values: entries(v, depth)
      });
    });
    return sortKey != null ? array.sort(function (a, b) {
      return sortKey(a.key, b.key);
    }) : array;
  }
  return nest = {
    object: function (array) {
      return apply(array, 0, createObject, setObject);
    },
    map: function (array) {
      return apply(array, 0, createMap, setMap);
    },
    entries: function (array) {
      return entries(apply(array, 0, createMap, setMap), 0);
    },
    key: function (d) {
      keys.push(d);
      return nest;
    },
    sortKeys: function (order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    },
    sortValues: function (order) {
      sortValues = order;
      return nest;
    },
    rollup: function (f) {
      rollup = f;
      return nest;
    }
  };
}
function createObject() {
  return {};
}
function setObject(object, key, value) {
  object[key] = value;
}
function createMap() {
  return (0, _map.default)();
}
function setMap(map, key, value) {
  map.set(key, value);
}
},{"./map":"node_modules/d3-collection/src/map.js"}],"node_modules/d3-collection/src/set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _map = _interopRequireWildcard(require("./map"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Set() {}
var proto = _map.default.prototype;
Set.prototype = set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function (value) {
    value += "";
    this[_map.prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};
function set(object, f) {
  var set = new Set();

  // Copy constructor.
  if (object instanceof Set) object.each(function (value) {
    set.add(value);
  });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1,
      n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);else while (++i < n) set.add(f(object[i], i, object));
  }
  return set;
}
var _default = exports.default = set;
},{"./map":"node_modules/d3-collection/src/map.js"}],"node_modules/d3-collection/src/keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
}
},{}],"node_modules/d3-collection/src/values.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
}
},{}],"node_modules/d3-collection/src/entries.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(map) {
  var entries = [];
  for (var key in map) entries.push({
    key: key,
    value: map[key]
  });
  return entries;
}
},{}],"node_modules/d3-collection/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "entries", {
  enumerable: true,
  get: function () {
    return _entries.default;
  }
});
Object.defineProperty(exports, "keys", {
  enumerable: true,
  get: function () {
    return _keys.default;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return _map.default;
  }
});
Object.defineProperty(exports, "nest", {
  enumerable: true,
  get: function () {
    return _nest.default;
  }
});
Object.defineProperty(exports, "set", {
  enumerable: true,
  get: function () {
    return _set.default;
  }
});
Object.defineProperty(exports, "values", {
  enumerable: true,
  get: function () {
    return _values.default;
  }
});
var _nest = _interopRequireDefault(require("./nest"));
var _set = _interopRequireDefault(require("./set"));
var _map = _interopRequireDefault(require("./map"));
var _keys = _interopRequireDefault(require("./keys"));
var _values = _interopRequireDefault(require("./values"));
var _entries = _interopRequireDefault(require("./entries"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./nest":"node_modules/d3-collection/src/nest.js","./set":"node_modules/d3-collection/src/set.js","./map":"node_modules/d3-collection/src/map.js","./keys":"node_modules/d3-collection/src/keys.js","./values":"node_modules/d3-collection/src/values.js","./entries":"node_modules/d3-collection/src/entries.js"}],"node_modules/d3-force/src/center.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x, y) {
  var nodes,
    strength = 1;
  if (x == null) x = 0;
  if (y == null) y = 0;
  function force() {
    var i,
      n = nodes.length,
      node,
      sx = 0,
      sy = 0;
    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }
    for (sx = (sx / n - x) * strength, sy = (sy / n - y) * strength, i = 0; i < n; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }
  force.initialize = function (_) {
    nodes = _;
  };
  force.x = function (_) {
    return arguments.length ? (x = +_, force) : x;
  };
  force.y = function (_) {
    return arguments.length ? (y = +_, force) : y;
  };
  force.strength = function (_) {
    return arguments.length ? (strength = +_, force) : strength;
  };
  return force;
}
},{}],"node_modules/d3-quadtree/src/add.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAll = addAll;
exports.default = _default;
function _default(d) {
  const x = +this._x.call(null, d),
    y = +this._y.call(null, d);
  return add(this.cover(x, y), x, y, d);
}
function add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
    node = tree._root,
    leaf = {
      data: d
    },
    x0 = tree._x0,
    y0 = tree._y0,
    x1 = tree._x1,
    y1 = tree._y1,
    xm,
    ym,
    xp,
    yp,
    right,
    bottom,
    i,
    j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return tree._root = leaf, tree;

  // Find the existing leaf for the new point, or add it.
  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }

  // Is the new point is exactly coincident with the existing point?
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
  return parent[j] = node, parent[i] = leaf, tree;
}
function addAll(data) {
  var d,
    i,
    n = data.length,
    x,
    y,
    xz = new Array(n),
    yz = new Array(n),
    x0 = Infinity,
    y0 = Infinity,
    x1 = -Infinity,
    y1 = -Infinity;

  // Compute the points and their extent.
  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  // If there were no (valid) points, abort.
  if (x0 > x1 || y0 > y1) return this;

  // Expand the tree to cover the new points.
  this.cover(x0, y0).cover(x1, y1);

  // Add the new points.
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }
  return this;
}
},{}],"node_modules/d3-quadtree/src/cover.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
    y0 = this._y0,
    x1 = this._x1,
    y1 = this._y1;

  // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  }

  // Otherwise, double repeatedly to cover.
  else {
    var z = x1 - x0 || 1,
      node = this._root,
      parent,
      i;
    while (x0 > x || x >= x1 || y0 > y || y >= y1) {
      i = (y < y0) << 1 | x < x0;
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0:
          x1 = x0 + z, y1 = y0 + z;
          break;
        case 1:
          x0 = x1 - z, y1 = y0 + z;
          break;
        case 2:
          x1 = x0 + z, y0 = y1 - z;
          break;
        case 3:
          x0 = x1 - z, y0 = y1 - z;
          break;
      }
    }
    if (this._root && this._root.length) this._root = node;
  }
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}
},{}],"node_modules/d3-quadtree/src/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var data = [];
  this.visit(function (node) {
    if (!node.length) do data.push(node.data); while (node = node.next);
  });
  return data;
}
},{}],"node_modules/d3-quadtree/src/extent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(_) {
  return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
}
},{}],"node_modules/d3-quadtree/src/quad.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}
},{}],"node_modules/d3-quadtree/src/find.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _quad = _interopRequireDefault(require("./quad.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(x, y, radius) {
  var data,
    x0 = this._x0,
    y0 = this._y0,
    x1,
    y1,
    x2,
    y2,
    x3 = this._x1,
    y3 = this._y1,
    quads = [],
    node = this._root,
    q,
    i;
  if (node) quads.push(new _quad.default(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }
  while (q = quads.pop()) {
    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node) || (x1 = q.x0) > x3 || (y1 = q.y0) > y3 || (x2 = q.x1) < x0 || (y2 = q.y1) < y0) continue;

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
        ym = (y1 + y2) / 2;
      quads.push(new _quad.default(node[3], xm, ym, x2, y2), new _quad.default(node[2], x1, ym, xm, y2), new _quad.default(node[1], xm, y1, x2, ym), new _quad.default(node[0], x1, y1, xm, ym));

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | x >= xm) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
        dy = y - +this._y.call(null, node.data),
        d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }
  return data;
}
},{"./quad.js":"node_modules/d3-quadtree/src/quad.js"}],"node_modules/d3-quadtree/src/remove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.removeAll = removeAll;
function _default(d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
    node = this._root,
    retainer,
    previous,
    next,
    x0 = this._x0,
    y0 = this._y0,
    x1 = this._x1,
    y1 = this._y1,
    x,
    y,
    xm,
    ym,
    right,
    bottom,
    i,
    j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm;else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym;else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;

  // If there are multiple coincident points, remove just the point.
  if (previous) return next ? previous.next = next : delete previous.next, this;

  // If this is the root point, remove it.
  if (!parent) return this._root = next, this;

  // Remove this leaf.
  next ? parent[i] = next : delete parent[i];

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
    if (retainer) retainer[j] = node;else this._root = node;
  }
  return this;
}
function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}
},{}],"node_modules/d3-quadtree/src/root.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  return this._root;
}
},{}],"node_modules/d3-quadtree/src/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var size = 0;
  this.visit(function (node) {
    if (!node.length) do ++size; while (node = node.next);
  });
  return size;
}
},{}],"node_modules/d3-quadtree/src/visit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _quad = _interopRequireDefault(require("./quad.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(callback) {
  var quads = [],
    q,
    node = this._root,
    child,
    x0,
    y0,
    x1,
    y1;
  if (node) quads.push(new _quad.default(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2,
        ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new _quad.default(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new _quad.default(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new _quad.default(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new _quad.default(child, x0, y0, xm, ym));
    }
  }
  return this;
}
},{"./quad.js":"node_modules/d3-quadtree/src/quad.js"}],"node_modules/d3-quadtree/src/visitAfter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _quad = _interopRequireDefault(require("./quad.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(callback) {
  var quads = [],
    next = [],
    q;
  if (this._root) quads.push(new _quad.default(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child,
        x0 = q.x0,
        y0 = q.y0,
        x1 = q.x1,
        y1 = q.y1,
        xm = (x0 + x1) / 2,
        ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new _quad.default(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new _quad.default(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new _quad.default(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new _quad.default(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}
},{"./quad.js":"node_modules/d3-quadtree/src/quad.js"}],"node_modules/d3-quadtree/src/x.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.defaultX = defaultX;
function defaultX(d) {
  return d[0];
}
function _default(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}
},{}],"node_modules/d3-quadtree/src/y.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.defaultY = defaultY;
function defaultY(d) {
  return d[1];
}
function _default(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}
},{}],"node_modules/d3-quadtree/src/quadtree.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quadtree;
var _add = _interopRequireWildcard(require("./add.js"));
var _cover = _interopRequireDefault(require("./cover.js"));
var _data = _interopRequireDefault(require("./data.js"));
var _extent = _interopRequireDefault(require("./extent.js"));
var _find = _interopRequireDefault(require("./find.js"));
var _remove = _interopRequireWildcard(require("./remove.js"));
var _root = _interopRequireDefault(require("./root.js"));
var _size = _interopRequireDefault(require("./size.js"));
var _visit = _interopRequireDefault(require("./visit.js"));
var _visitAfter = _interopRequireDefault(require("./visitAfter.js"));
var _x = _interopRequireWildcard(require("./x.js"));
var _y = _interopRequireWildcard(require("./y.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? _x.defaultX : x, y == null ? _y.defaultY : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}
function leaf_copy(leaf) {
  var copy = {
      data: leaf.data
    },
    next = copy;
  while (leaf = leaf.next) next = next.next = {
    data: leaf.data
  };
  return copy;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function () {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
    node = this._root,
    nodes,
    child;
  if (!node) return copy;
  if (!node.length) return copy._root = leaf_copy(node), copy;
  nodes = [{
    source: node,
    target: copy._root = new Array(4)
  }];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({
          source: child,
          target: node.target[i] = new Array(4)
        });else node.target[i] = leaf_copy(child);
      }
    }
  }
  return copy;
};
treeProto.add = _add.default;
treeProto.addAll = _add.addAll;
treeProto.cover = _cover.default;
treeProto.data = _data.default;
treeProto.extent = _extent.default;
treeProto.find = _find.default;
treeProto.remove = _remove.default;
treeProto.removeAll = _remove.removeAll;
treeProto.root = _root.default;
treeProto.size = _size.default;
treeProto.visit = _visit.default;
treeProto.visitAfter = _visitAfter.default;
treeProto.x = _x.default;
treeProto.y = _y.default;
},{"./add.js":"node_modules/d3-quadtree/src/add.js","./cover.js":"node_modules/d3-quadtree/src/cover.js","./data.js":"node_modules/d3-quadtree/src/data.js","./extent.js":"node_modules/d3-quadtree/src/extent.js","./find.js":"node_modules/d3-quadtree/src/find.js","./remove.js":"node_modules/d3-quadtree/src/remove.js","./root.js":"node_modules/d3-quadtree/src/root.js","./size.js":"node_modules/d3-quadtree/src/size.js","./visit.js":"node_modules/d3-quadtree/src/visit.js","./visitAfter.js":"node_modules/d3-quadtree/src/visitAfter.js","./x.js":"node_modules/d3-quadtree/src/x.js","./y.js":"node_modules/d3-quadtree/src/y.js"}],"node_modules/d3-quadtree/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "quadtree", {
  enumerable: true,
  get: function () {
    return _quadtree.default;
  }
});
var _quadtree = _interopRequireDefault(require("./quadtree.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./quadtree.js":"node_modules/d3-quadtree/src/quadtree.js"}],"node_modules/d3-force/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return function () {
    return x;
  };
}
},{}],"node_modules/d3-force/src/jiggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(random) {
  return (random() - 0.5) * 1e-6;
}
},{}],"node_modules/d3-force/src/collide.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Quadtree = require("d3-quadtree");
var _constant = _interopRequireDefault(require("./constant.js"));
var _jiggle = _interopRequireDefault(require("./jiggle.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function x(d) {
  return d.x + d.vx;
}
function y(d) {
  return d.y + d.vy;
}
function _default(radius) {
  var nodes,
    radii,
    random,
    strength = 1,
    iterations = 1;
  if (typeof radius !== "function") radius = (0, _constant.default)(radius == null ? 1 : +radius);
  function force() {
    var i,
      n = nodes.length,
      tree,
      node,
      xi,
      yi,
      ri,
      ri2;
    for (var k = 0; k < iterations; ++k) {
      tree = (0, _d3Quadtree.quadtree)(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }
    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data,
        rj = quad.r,
        r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x = xi - data.x - data.vx,
            y = yi - data.y - data.vy,
            l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) x = (0, _jiggle.default)(random), l += x * x;
            if (y === 0) y = (0, _jiggle.default)(random), l += y * y;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y *= l) * r;
            data.vx -= x * (r = 1 - r);
            data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }
  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }
  function initialize() {
    if (!nodes) return;
    var i,
      n = nodes.length,
      node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }
  force.initialize = function (_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.iterations = function (_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function (_) {
    return arguments.length ? (strength = +_, force) : strength;
  };
  force.radius = function (_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : (0, _constant.default)(+_), initialize(), force) : radius;
  };
  return force;
}
},{"d3-quadtree":"node_modules/d3-quadtree/src/index.js","./constant.js":"node_modules/d3-force/src/constant.js","./jiggle.js":"node_modules/d3-force/src/jiggle.js"}],"node_modules/d3-force/src/link.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _constant = _interopRequireDefault(require("./constant.js"));
var _jiggle = _interopRequireDefault(require("./jiggle.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function index(d) {
  return d.index;
}
function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("node not found: " + nodeId);
  return node;
}
function _default(links) {
  var id = index,
    strength = defaultStrength,
    strengths,
    distance = (0, _constant.default)(30),
    distances,
    nodes,
    count,
    bias,
    random,
    iterations = 1;
  if (links == null) links = [];
  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }
  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x + target.vx - source.x - source.vx || (0, _jiggle.default)(random);
        y = target.y + target.vy - source.y - source.vy || (0, _jiggle.default)(random);
        l = Math.sqrt(x * x + y * y);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x *= l, y *= l;
        target.vx -= x * (b = bias[i]);
        target.vy -= y * b;
        source.vx += x * (b = 1 - b);
        source.vy += y * b;
      }
    }
  }
  function initialize() {
    if (!nodes) return;
    var i,
      n = nodes.length,
      m = links.length,
      nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])),
      link;
    for (i = 0, count = new Array(n); i < m; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }
    for (i = 0, bias = new Array(m); i < m; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }
    strengths = new Array(m), initializeStrength();
    distances = new Array(m), initializeDistance();
  }
  function initializeStrength() {
    if (!nodes) return;
    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }
  function initializeDistance() {
    if (!nodes) return;
    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }
  force.initialize = function (_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.links = function (_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };
  force.id = function (_) {
    return arguments.length ? (id = _, force) : id;
  };
  force.iterations = function (_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function (_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0, _constant.default)(+_), initializeStrength(), force) : strength;
  };
  force.distance = function (_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : (0, _constant.default)(+_), initializeDistance(), force) : distance;
  };
  return force;
}
},{"./constant.js":"node_modules/d3-force/src/constant.js","./jiggle.js":"node_modules/d3-force/src/jiggle.js"}],"node_modules/d3-force/src/lcg.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32

function _default() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}
},{}],"node_modules/d3-force/src/simulation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.x = x;
exports.y = y;
var _d3Dispatch = require("d3-dispatch");
var _d3Timer = require("d3-timer");
var _lcg = _interopRequireDefault(require("./lcg.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function x(d) {
  return d.x;
}
function y(d) {
  return d.y;
}
var initialRadius = 10,
  initialAngle = Math.PI * (3 - Math.sqrt(5));
function _default(nodes) {
  var simulation,
    alpha = 1,
    alphaMin = 0.001,
    alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
    alphaTarget = 0,
    velocityDecay = 0.6,
    forces = new Map(),
    stepper = (0, _d3Timer.timer)(step),
    event = (0, _d3Dispatch.dispatch)("tick", "end"),
    random = (0, _lcg.default)();
  if (nodes == null) nodes = [];
  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }
  function tick(iterations) {
    var i,
      n = nodes.length,
      node;
    if (iterations === undefined) iterations = 1;
    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;
      forces.forEach(function (force) {
        force(alpha);
      });
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;else node.y = node.fy, node.vy = 0;
      }
    }
    return simulation;
  }
  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(0.5 + i),
          angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }
  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes, random);
    return force;
  }
  initializeNodes();
  return simulation = {
    tick: tick,
    restart: function () {
      return stepper.restart(step), simulation;
    },
    stop: function () {
      return stepper.stop(), simulation;
    },
    nodes: function (_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
    },
    alpha: function (_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },
    alphaMin: function (_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },
    alphaDecay: function (_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },
    alphaTarget: function (_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },
    velocityDecay: function (_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },
    randomSource: function (_) {
      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
    },
    force: function (name, _) {
      return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
    },
    find: function (x, y, radius) {
      var i = 0,
        n = nodes.length,
        dx,
        dy,
        d2,
        node,
        closest;
      if (radius == null) radius = Infinity;else radius *= radius;
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x - node.x;
        dy = y - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }
      return closest;
    },
    on: function (name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}
},{"d3-dispatch":"node_modules/d3-dispatch/src/index.js","d3-timer":"node_modules/d3-timer/src/index.js","./lcg.js":"node_modules/d3-force/src/lcg.js"}],"node_modules/d3-force/src/manyBody.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Quadtree = require("d3-quadtree");
var _constant = _interopRequireDefault(require("./constant.js"));
var _jiggle = _interopRequireDefault(require("./jiggle.js"));
var _simulation = require("./simulation.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default() {
  var nodes,
    node,
    random,
    alpha,
    strength = (0, _constant.default)(-30),
    strengths,
    distanceMin2 = 1,
    distanceMax2 = Infinity,
    theta2 = 0.81;
  function force(_) {
    var i,
      n = nodes.length,
      tree = (0, _d3Quadtree.quadtree)(nodes, _simulation.x, _simulation.y).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }
  function initialize() {
    if (!nodes) return;
    var i,
      n = nodes.length,
      node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
  }
  function accumulate(quad) {
    var strength = 0,
      q,
      c,
      weight = 0,
      x,
      y,
      i;

    // For internal nodes, accumulate forces from child quadrants.
    if (quad.length) {
      for (x = y = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c = Math.abs(q.value))) {
          strength += q.value, weight += c, x += c * q.x, y += c * q.y;
        }
      }
      quad.x = x / weight;
      quad.y = y / weight;
    }

    // For leaf nodes, accumulate forces from coincident quadrants.
    else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do strength += strengths[q.data.index]; while (q = q.next);
    }
    quad.value = strength;
  }
  function apply(quad, x1, _, x2) {
    if (!quad.value) return true;
    var x = quad.x - node.x,
      y = quad.y - node.y,
      w = x2 - x1,
      l = x * x + y * y;

    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x === 0) x = (0, _jiggle.default)(random), l += x * x;
        if (y === 0) y = (0, _jiggle.default)(random), l += y * y;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x * quad.value * alpha / l;
        node.vy += y * quad.value * alpha / l;
      }
      return true;
    }

    // Otherwise, process points directly.
    else if (quad.length || l >= distanceMax2) return;

    // Limit forces for very close nodes; randomize direction if coincident.
    if (quad.data !== node || quad.next) {
      if (x === 0) x = (0, _jiggle.default)(random), l += x * x;
      if (y === 0) y = (0, _jiggle.default)(random), l += y * y;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }
    do if (quad.data !== node) {
      w = strengths[quad.data.index] * alpha / l;
      node.vx += x * w;
      node.vy += y * w;
    } while (quad = quad.next);
  }
  force.initialize = function (_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.strength = function (_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0, _constant.default)(+_), initialize(), force) : strength;
  };
  force.distanceMin = function (_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };
  force.distanceMax = function (_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };
  force.theta = function (_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };
  return force;
}
},{"d3-quadtree":"node_modules/d3-quadtree/src/index.js","./constant.js":"node_modules/d3-force/src/constant.js","./jiggle.js":"node_modules/d3-force/src/jiggle.js","./simulation.js":"node_modules/d3-force/src/simulation.js"}],"node_modules/d3-force/src/radial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _constant = _interopRequireDefault(require("./constant.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(radius, x, y) {
  var nodes,
    strength = (0, _constant.default)(0.1),
    strengths,
    radiuses;
  if (typeof radius !== "function") radius = (0, _constant.default)(+radius);
  if (x == null) x = 0;
  if (y == null) y = 0;
  function force(alpha) {
    for (var i = 0, n = nodes.length; i < n; ++i) {
      var node = nodes[i],
        dx = node.x - x || 1e-6,
        dy = node.y - y || 1e-6,
        r = Math.sqrt(dx * dx + dy * dy),
        k = (radiuses[i] - r) * strengths[i] * alpha / r;
      node.vx += dx * k;
      node.vy += dy * k;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i,
      n = nodes.length;
    strengths = new Array(n);
    radiuses = new Array(n);
    for (i = 0; i < n; ++i) {
      radiuses[i] = +radius(nodes[i], i, nodes);
      strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function (_) {
    nodes = _, initialize();
  };
  force.strength = function (_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0, _constant.default)(+_), initialize(), force) : strength;
  };
  force.radius = function (_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : (0, _constant.default)(+_), initialize(), force) : radius;
  };
  force.x = function (_) {
    return arguments.length ? (x = +_, force) : x;
  };
  force.y = function (_) {
    return arguments.length ? (y = +_, force) : y;
  };
  return force;
}
},{"./constant.js":"node_modules/d3-force/src/constant.js"}],"node_modules/d3-force/src/x.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _constant = _interopRequireDefault(require("./constant.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(x) {
  var strength = (0, _constant.default)(0.1),
    nodes,
    strengths,
    xz;
  if (typeof x !== "function") x = (0, _constant.default)(x == null ? 0 : +x);
  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i,
      n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function (_) {
    nodes = _;
    initialize();
  };
  force.strength = function (_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0, _constant.default)(+_), initialize(), force) : strength;
  };
  force.x = function (_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : (0, _constant.default)(+_), initialize(), force) : x;
  };
  return force;
}
},{"./constant.js":"node_modules/d3-force/src/constant.js"}],"node_modules/d3-force/src/y.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _constant = _interopRequireDefault(require("./constant.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(y) {
  var strength = (0, _constant.default)(0.1),
    nodes,
    strengths,
    yz;
  if (typeof y !== "function") y = (0, _constant.default)(y == null ? 0 : +y);
  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }
  function initialize() {
    if (!nodes) return;
    var i,
      n = nodes.length;
    strengths = new Array(n);
    yz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  force.initialize = function (_) {
    nodes = _;
    initialize();
  };
  force.strength = function (_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0, _constant.default)(+_), initialize(), force) : strength;
  };
  force.y = function (_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : (0, _constant.default)(+_), initialize(), force) : y;
  };
  return force;
}
},{"./constant.js":"node_modules/d3-force/src/constant.js"}],"node_modules/d3-force/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "forceCenter", {
  enumerable: true,
  get: function () {
    return _center.default;
  }
});
Object.defineProperty(exports, "forceCollide", {
  enumerable: true,
  get: function () {
    return _collide.default;
  }
});
Object.defineProperty(exports, "forceLink", {
  enumerable: true,
  get: function () {
    return _link.default;
  }
});
Object.defineProperty(exports, "forceManyBody", {
  enumerable: true,
  get: function () {
    return _manyBody.default;
  }
});
Object.defineProperty(exports, "forceRadial", {
  enumerable: true,
  get: function () {
    return _radial.default;
  }
});
Object.defineProperty(exports, "forceSimulation", {
  enumerable: true,
  get: function () {
    return _simulation.default;
  }
});
Object.defineProperty(exports, "forceX", {
  enumerable: true,
  get: function () {
    return _x.default;
  }
});
Object.defineProperty(exports, "forceY", {
  enumerable: true,
  get: function () {
    return _y.default;
  }
});
var _center = _interopRequireDefault(require("./center.js"));
var _collide = _interopRequireDefault(require("./collide.js"));
var _link = _interopRequireDefault(require("./link.js"));
var _manyBody = _interopRequireDefault(require("./manyBody.js"));
var _radial = _interopRequireDefault(require("./radial.js"));
var _simulation = _interopRequireDefault(require("./simulation.js"));
var _x = _interopRequireDefault(require("./x.js"));
var _y = _interopRequireDefault(require("./y.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./center.js":"node_modules/d3-force/src/center.js","./collide.js":"node_modules/d3-force/src/collide.js","./link.js":"node_modules/d3-force/src/link.js","./manyBody.js":"node_modules/d3-force/src/manyBody.js","./radial.js":"node_modules/d3-force/src/radial.js","./simulation.js":"node_modules/d3-force/src/simulation.js","./x.js":"node_modules/d3-force/src/x.js","./y.js":"node_modules/d3-force/src/y.js"}],"node_modules/d3-polygon/src/area.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(polygon) {
  var i = -1,
    n = polygon.length,
    a,
    b = polygon[n - 1],
    area = 0;
  while (++i < n) {
    a = b;
    b = polygon[i];
    area += a[1] * b[0] - a[0] * b[1];
  }
  return area / 2;
}
},{}],"node_modules/d3-polygon/src/centroid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(polygon) {
  var i = -1,
    n = polygon.length,
    x = 0,
    y = 0,
    a,
    b = polygon[n - 1],
    c,
    k = 0;
  while (++i < n) {
    a = b;
    b = polygon[i];
    k += c = a[0] * b[1] - b[0] * a[1];
    x += (a[0] + b[0]) * c;
    y += (a[1] + b[1]) * c;
  }
  return k *= 3, [x / k, y / k];
}
},{}],"node_modules/d3-polygon/src/cross.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
// Returns the 2D cross product of AB and AC vectors, i.e., the z-component of
// the 3D cross product in a quadrant I Cartesian coordinate system (+x is
// right, +y is up). Returns a positive value if ABC is counter-clockwise,
// negative if clockwise, and zero if the points are collinear.
function _default(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}
},{}],"node_modules/d3-polygon/src/hull.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _cross = _interopRequireDefault(require("./cross.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function lexicographicOrder(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}

// Computes the upper convex hull per the monotone chain algorithm.
// Assumes points.length >= 3, is sorted by x, unique in y.
// Returns an array of indices into points in left-to-right order.
function computeUpperHullIndexes(points) {
  const n = points.length,
    indexes = [0, 1];
  let size = 2,
    i;
  for (i = 2; i < n; ++i) {
    while (size > 1 && (0, _cross.default)(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) --size;
    indexes[size++] = i;
  }
  return indexes.slice(0, size); // remove popped points
}
function _default(points) {
  if ((n = points.length) < 3) return null;
  var i,
    n,
    sortedPoints = new Array(n),
    flippedPoints = new Array(n);
  for (i = 0; i < n; ++i) sortedPoints[i] = [+points[i][0], +points[i][1], i];
  sortedPoints.sort(lexicographicOrder);
  for (i = 0; i < n; ++i) flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];
  var upperIndexes = computeUpperHullIndexes(sortedPoints),
    lowerIndexes = computeUpperHullIndexes(flippedPoints);

  // Construct the hull polygon, removing possible duplicate endpoints.
  var skipLeft = lowerIndexes[0] === upperIndexes[0],
    skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1],
    hull = [];

  // Add upper hull in right-to-l order.
  // Then add lower hull in left-to-right order.
  for (i = upperIndexes.length - 1; i >= 0; --i) hull.push(points[sortedPoints[upperIndexes[i]][2]]);
  for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) hull.push(points[sortedPoints[lowerIndexes[i]][2]]);
  return hull;
}
},{"./cross.js":"node_modules/d3-polygon/src/cross.js"}],"node_modules/d3-polygon/src/contains.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(polygon, point) {
  var n = polygon.length,
    p = polygon[n - 1],
    x = point[0],
    y = point[1],
    x0 = p[0],
    y0 = p[1],
    x1,
    y1,
    inside = false;
  for (var i = 0; i < n; ++i) {
    p = polygon[i], x1 = p[0], y1 = p[1];
    if (y1 > y !== y0 > y && x < (x0 - x1) * (y - y1) / (y0 - y1) + x1) inside = !inside;
    x0 = x1, y0 = y1;
  }
  return inside;
}
},{}],"node_modules/d3-polygon/src/length.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(polygon) {
  var i = -1,
    n = polygon.length,
    b = polygon[n - 1],
    xa,
    ya,
    xb = b[0],
    yb = b[1],
    perimeter = 0;
  while (++i < n) {
    xa = xb;
    ya = yb;
    b = polygon[i];
    xb = b[0];
    yb = b[1];
    xa -= xb;
    ya -= yb;
    perimeter += Math.hypot(xa, ya);
  }
  return perimeter;
}
},{}],"node_modules/d3-polygon/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "polygonArea", {
  enumerable: true,
  get: function () {
    return _area.default;
  }
});
Object.defineProperty(exports, "polygonCentroid", {
  enumerable: true,
  get: function () {
    return _centroid.default;
  }
});
Object.defineProperty(exports, "polygonContains", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "polygonHull", {
  enumerable: true,
  get: function () {
    return _hull.default;
  }
});
Object.defineProperty(exports, "polygonLength", {
  enumerable: true,
  get: function () {
    return _length.default;
  }
});
var _area = _interopRequireDefault(require("./area.js"));
var _centroid = _interopRequireDefault(require("./centroid.js"));
var _hull = _interopRequireDefault(require("./hull.js"));
var _contains = _interopRequireDefault(require("./contains.js"));
var _length = _interopRequireDefault(require("./length.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./area.js":"node_modules/d3-polygon/src/area.js","./centroid.js":"node_modules/d3-polygon/src/centroid.js","./hull.js":"node_modules/d3-polygon/src/hull.js","./contains.js":"node_modules/d3-polygon/src/contains.js","./length.js":"node_modules/d3-polygon/src/length.js"}],"node_modules/d3-path/src/path.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const pi = Math.PI,
  tau = 2 * pi,
  epsilon = 1e-6,
  tauEpsilon = tau - epsilon;
function Path() {
  this._x0 = this._y0 =
  // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}
function path() {
  return new Path();
}
Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function (x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function () {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function (x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function (x1, y1, x, y) {
    this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function (x1, y1, x2, y2, x, y) {
    this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function (x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
      y0 = this._y1,
      x21 = x2 - x1,
      y21 = y2 - y1,
      x01 = x0 - x1,
      y01 = y0 - y1,
      l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) ;

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
        y20 = y2 - y0,
        l21_2 = x21 * x21 + y21 * y21,
        l20_2 = x20 * x20 + y20 * y20,
        l21 = Math.sqrt(l21_2),
        l01 = Math.sqrt(l01_2),
        l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
        t01 = l / l01,
        t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }
      this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function (x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0),
      dy = r * Math.sin(a0),
      x0 = x + dx,
      y0 = y + dy,
      cw = 1 ^ ccw,
      da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function (x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
  },
  toString: function () {
    return this._;
  }
};
var _default = exports.default = path;
},{}],"node_modules/d3-path/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "path", {
  enumerable: true,
  get: function () {
    return _path.default;
  }
});
var _path = _interopRequireDefault(require("./path.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./path.js":"node_modules/d3-path/src/path.js"}],"node_modules/d3-shape/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return function constant() {
    return x;
  };
}
},{}],"node_modules/d3-shape/src/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abs = void 0;
exports.acos = acos;
exports.asin = asin;
exports.tau = exports.sqrt = exports.sin = exports.pi = exports.min = exports.max = exports.halfPi = exports.epsilon = exports.cos = exports.atan2 = void 0;
var abs = exports.abs = Math.abs;
var atan2 = exports.atan2 = Math.atan2;
var cos = exports.cos = Math.cos;
var max = exports.max = Math.max;
var min = exports.min = Math.min;
var sin = exports.sin = Math.sin;
var sqrt = exports.sqrt = Math.sqrt;
var epsilon = exports.epsilon = 1e-12;
var pi = exports.pi = Math.PI;
var halfPi = exports.halfPi = pi / 2;
var tau = exports.tau = 2 * pi;
function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}
function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}
},{}],"node_modules/d3-shape/src/arc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Path = require("d3-path");
var _constant = _interopRequireDefault(require("./constant.js"));
var _math = require("./math.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function arcInnerRadius(d) {
  return d.innerRadius;
}
function arcOuterRadius(d) {
  return d.outerRadius;
}
function arcStartAngle(d) {
  return d.startAngle;
}
function arcEndAngle(d) {
  return d.endAngle;
}
function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}
function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0,
    y10 = y1 - y0,
    x32 = x3 - x2,
    y32 = y3 - y2,
    t = y32 * x10 - x32 * y10;
  if (t * t < _math.epsilon) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
    y01 = y0 - y1,
    lo = (cw ? rc : -rc) / (0, _math.sqrt)(x01 * x01 + y01 * y01),
    ox = lo * y01,
    oy = -lo * x01,
    x11 = x0 + ox,
    y11 = y0 + oy,
    x10 = x1 + ox,
    y10 = y1 + oy,
    x00 = (x11 + x10) / 2,
    y00 = (y11 + y10) / 2,
    dx = x10 - x11,
    dy = y10 - y11,
    d2 = dx * dx + dy * dy,
    r = r1 - rc,
    D = x11 * y10 - x10 * y11,
    d = (dy < 0 ? -1 : 1) * (0, _math.sqrt)((0, _math.max)(0, r * r * d2 - D * D)),
    cx0 = (D * dy - dx * d) / d2,
    cy0 = (-D * dx - dy * d) / d2,
    cx1 = (D * dy + dx * d) / d2,
    cy1 = (-D * dx + dy * d) / d2,
    dx0 = cx0 - x00,
    dy0 = cy0 - y00,
    dx1 = cx1 - x00,
    dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}
function _default() {
  var innerRadius = arcInnerRadius,
    outerRadius = arcOuterRadius,
    cornerRadius = (0, _constant.default)(0),
    padRadius = null,
    startAngle = arcStartAngle,
    endAngle = arcEndAngle,
    padAngle = arcPadAngle,
    context = null;
  function arc() {
    var buffer,
      r,
      r0 = +innerRadius.apply(this, arguments),
      r1 = +outerRadius.apply(this, arguments),
      a0 = startAngle.apply(this, arguments) - _math.halfPi,
      a1 = endAngle.apply(this, arguments) - _math.halfPi,
      da = (0, _math.abs)(a1 - a0),
      cw = a1 > a0;
    if (!context) context = buffer = (0, _d3Path.path)();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > _math.epsilon)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > _math.tau - _math.epsilon) {
      context.moveTo(r1 * (0, _math.cos)(a0), r1 * (0, _math.sin)(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > _math.epsilon) {
        context.moveTo(r0 * (0, _math.cos)(a1), r0 * (0, _math.sin)(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
        a11 = a1,
        a00 = a0,
        a10 = a1,
        da0 = da,
        da1 = da,
        ap = padAngle.apply(this, arguments) / 2,
        rp = ap > _math.epsilon && (padRadius ? +padRadius.apply(this, arguments) : (0, _math.sqrt)(r0 * r0 + r1 * r1)),
        rc = (0, _math.min)((0, _math.abs)(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
        rc0 = rc,
        rc1 = rc,
        t0,
        t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > _math.epsilon) {
        var p0 = (0, _math.asin)(rp / r0 * (0, _math.sin)(ap)),
          p1 = (0, _math.asin)(rp / r1 * (0, _math.sin)(ap));
        if ((da0 -= p0 * 2) > _math.epsilon) p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > _math.epsilon) p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }
      var x01 = r1 * (0, _math.cos)(a01),
        y01 = r1 * (0, _math.sin)(a01),
        x10 = r0 * (0, _math.cos)(a10),
        y10 = r0 * (0, _math.sin)(a10);

      // Apply rounded corners?
      if (rc > _math.epsilon) {
        var x11 = r1 * (0, _math.cos)(a11),
          y11 = r1 * (0, _math.sin)(a11),
          x00 = r0 * (0, _math.cos)(a00),
          y00 = r0 * (0, _math.sin)(a00),
          oc;

        // Restrict the corner radius according to the sector angle.
        if (da < _math.pi && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
          var ax = x01 - oc[0],
            ay = y01 - oc[1],
            bx = x11 - oc[0],
            by = y11 - oc[1],
            kc = 1 / (0, _math.sin)((0, _math.acos)((ax * bx + ay * by) / ((0, _math.sqrt)(ax * ax + ay * ay) * (0, _math.sqrt)(bx * bx + by * by))) / 2),
            lc = (0, _math.sqrt)(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = (0, _math.min)(rc, (r0 - lc) / (kc - 1));
          rc1 = (0, _math.min)(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > _math.epsilon)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > _math.epsilon) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, (0, _math.atan2)(t0.y01, t0.x01), (0, _math.atan2)(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, (0, _math.atan2)(t0.y01, t0.x01), (0, _math.atan2)(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, (0, _math.atan2)(t0.cy + t0.y11, t0.cx + t0.x11), (0, _math.atan2)(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, (0, _math.atan2)(t1.y11, t1.x11), (0, _math.atan2)(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > _math.epsilon) || !(da0 > _math.epsilon)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > _math.epsilon) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, (0, _math.atan2)(t0.y01, t0.x01), (0, _math.atan2)(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, (0, _math.atan2)(t0.y01, t0.x01), (0, _math.atan2)(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, (0, _math.atan2)(t0.cy + t0.y11, t0.cx + t0.x11), (0, _math.atan2)(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, (0, _math.atan2)(t1.y11, t1.x11), (0, _math.atan2)(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }
    context.closePath();
    if (buffer) return context = null, buffer + "" || null;
  }
  arc.centroid = function () {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
      a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - _math.pi / 2;
    return [(0, _math.cos)(a) * r, (0, _math.sin)(a) * r];
  };
  arc.innerRadius = function (_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : innerRadius;
  };
  arc.outerRadius = function (_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : outerRadius;
  };
  arc.cornerRadius = function (_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : cornerRadius;
  };
  arc.padRadius = function (_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : padRadius;
  };
  arc.startAngle = function (_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : startAngle;
  };
  arc.endAngle = function (_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : endAngle;
  };
  arc.padAngle = function (_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), arc) : padAngle;
  };
  arc.context = function (_) {
    return arguments.length ? (context = _ == null ? null : _, arc) : context;
  };
  return arc;
}
},{"d3-path":"node_modules/d3-path/src/index.js","./constant.js":"node_modules/d3-shape/src/constant.js","./math.js":"node_modules/d3-shape/src/math.js"}],"node_modules/d3-shape/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.slice = void 0;
var slice = exports.slice = Array.prototype.slice;
function _default(x) {
  return typeof x === "object" && "length" in x ? x // Array, TypedArray, NodeList, array-like
  : Array.from(x); // Map, Set, iterable, string, or anything else
}
},{}],"node_modules/d3-shape/src/curve/linear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
      // proceed
      default:
        this._context.lineTo(x, y);
        break;
    }
  }
};
function _default(context) {
  return new Linear(context);
}
},{}],"node_modules/d3-shape/src/point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.x = x;
exports.y = y;
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}
},{}],"node_modules/d3-shape/src/line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Path = require("d3-path");
var _array = _interopRequireDefault(require("./array.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
var _linear = _interopRequireDefault(require("./curve/linear.js"));
var _point = require("./point.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(x, y) {
  var defined = (0, _constant.default)(true),
    context = null,
    curve = _linear.default,
    output = null;
  x = typeof x === "function" ? x : x === undefined ? _point.x : (0, _constant.default)(x);
  y = typeof y === "function" ? y : y === undefined ? _point.y : (0, _constant.default)(y);
  function line(data) {
    var i,
      n = (data = (0, _array.default)(data)).length,
      d,
      defined0 = false,
      buffer;
    if (context == null) output = curve(buffer = (0, _d3Path.path)());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  line.x = function (_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : (0, _constant.default)(+_), line) : x;
  };
  line.y = function (_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : (0, _constant.default)(+_), line) : y;
  };
  line.defined = function (_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : (0, _constant.default)(!!_), line) : defined;
  };
  line.curve = function (_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };
  line.context = function (_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };
  return line;
}
},{"d3-path":"node_modules/d3-path/src/index.js","./array.js":"node_modules/d3-shape/src/array.js","./constant.js":"node_modules/d3-shape/src/constant.js","./curve/linear.js":"node_modules/d3-shape/src/curve/linear.js","./point.js":"node_modules/d3-shape/src/point.js"}],"node_modules/d3-shape/src/area.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Path = require("d3-path");
var _array = _interopRequireDefault(require("./array.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
var _linear = _interopRequireDefault(require("./curve/linear.js"));
var _line = _interopRequireDefault(require("./line.js"));
var _point = require("./point.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(x0, y0, y1) {
  var x1 = null,
    defined = (0, _constant.default)(true),
    context = null,
    curve = _linear.default,
    output = null;
  x0 = typeof x0 === "function" ? x0 : x0 === undefined ? _point.x : (0, _constant.default)(+x0);
  y0 = typeof y0 === "function" ? y0 : y0 === undefined ? (0, _constant.default)(0) : (0, _constant.default)(+y0);
  y1 = typeof y1 === "function" ? y1 : y1 === undefined ? _point.y : (0, _constant.default)(+y1);
  function area(data) {
    var i,
      j,
      k,
      n = (data = (0, _array.default)(data)).length,
      d,
      defined0 = false,
      buffer,
      x0z = new Array(n),
      y0z = new Array(n);
    if (context == null) output = curve(buffer = (0, _d3Path.path)());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  function arealine() {
    return (0, _line.default)().defined(defined).curve(curve).context(context);
  }
  area.x = function (_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : (0, _constant.default)(+_), x1 = null, area) : x0;
  };
  area.x0 = function (_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : (0, _constant.default)(+_), area) : x0;
  };
  area.x1 = function (_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : (0, _constant.default)(+_), area) : x1;
  };
  area.y = function (_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : (0, _constant.default)(+_), y1 = null, area) : y0;
  };
  area.y0 = function (_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : (0, _constant.default)(+_), area) : y0;
  };
  area.y1 = function (_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : (0, _constant.default)(+_), area) : y1;
  };
  area.lineX0 = area.lineY0 = function () {
    return arealine().x(x0).y(y0);
  };
  area.lineY1 = function () {
    return arealine().x(x0).y(y1);
  };
  area.lineX1 = function () {
    return arealine().x(x1).y(y0);
  };
  area.defined = function (_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : (0, _constant.default)(!!_), area) : defined;
  };
  area.curve = function (_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };
  area.context = function (_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };
  return area;
}
},{"d3-path":"node_modules/d3-path/src/index.js","./array.js":"node_modules/d3-shape/src/array.js","./constant.js":"node_modules/d3-shape/src/constant.js","./curve/linear.js":"node_modules/d3-shape/src/curve/linear.js","./line.js":"node_modules/d3-shape/src/line.js","./point.js":"node_modules/d3-shape/src/point.js"}],"node_modules/d3-shape/src/descending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
},{}],"node_modules/d3-shape/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(d) {
  return d;
}
},{}],"node_modules/d3-shape/src/pie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _array = _interopRequireDefault(require("./array.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
var _descending = _interopRequireDefault(require("./descending.js"));
var _identity = _interopRequireDefault(require("./identity.js"));
var _math = require("./math.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default() {
  var value = _identity.default,
    sortValues = _descending.default,
    sort = null,
    startAngle = (0, _constant.default)(0),
    endAngle = (0, _constant.default)(_math.tau),
    padAngle = (0, _constant.default)(0);
  function pie(data) {
    var i,
      n = (data = (0, _array.default)(data)).length,
      j,
      k,
      sum = 0,
      index = new Array(n),
      arcs = new Array(n),
      a0 = +startAngle.apply(this, arguments),
      da = Math.min(_math.tau, Math.max(-_math.tau, endAngle.apply(this, arguments) - a0)),
      a1,
      p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
      pa = p * (da < 0 ? -1 : 1),
      v;
    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function (i, j) {
      return sortValues(arcs[i], arcs[j]);
    });else if (sort != null) index.sort(function (i, j) {
      return sort(data[i], data[j]);
    });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }
    return arcs;
  }
  pie.value = function (_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constant.default)(+_), pie) : value;
  };
  pie.sortValues = function (_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };
  pie.sort = function (_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };
  pie.startAngle = function (_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), pie) : startAngle;
  };
  pie.endAngle = function (_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), pie) : endAngle;
  };
  pie.padAngle = function (_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : (0, _constant.default)(+_), pie) : padAngle;
  };
  return pie;
}
},{"./array.js":"node_modules/d3-shape/src/array.js","./constant.js":"node_modules/d3-shape/src/constant.js","./descending.js":"node_modules/d3-shape/src/descending.js","./identity.js":"node_modules/d3-shape/src/identity.js","./math.js":"node_modules/d3-shape/src/math.js"}],"node_modules/d3-shape/src/curve/radial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curveRadialLinear = void 0;
exports.default = curveRadial;
var _linear = _interopRequireDefault(require("./linear.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var curveRadialLinear = exports.curveRadialLinear = curveRadial(_linear.default);
function Radial(curve) {
  this._curve = curve;
}
Radial.prototype = {
  areaStart: function () {
    this._curve.areaStart();
  },
  areaEnd: function () {
    this._curve.areaEnd();
  },
  lineStart: function () {
    this._curve.lineStart();
  },
  lineEnd: function () {
    this._curve.lineEnd();
  },
  point: function (a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};
function curveRadial(curve) {
  function radial(context) {
    return new Radial(curve(context));
  }
  radial._curve = curve;
  return radial;
}
},{"./linear.js":"node_modules/d3-shape/src/curve/linear.js"}],"node_modules/d3-shape/src/lineRadial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.lineRadial = lineRadial;
var _radial = _interopRequireWildcard(require("./curve/radial.js"));
var _line = _interopRequireDefault(require("./line.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function lineRadial(l) {
  var c = l.curve;
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  l.curve = function (_) {
    return arguments.length ? c((0, _radial.default)(_)) : c()._curve;
  };
  return l;
}
function _default() {
  return lineRadial((0, _line.default)().curve(_radial.curveRadialLinear));
}
},{"./curve/radial.js":"node_modules/d3-shape/src/curve/radial.js","./line.js":"node_modules/d3-shape/src/line.js"}],"node_modules/d3-shape/src/areaRadial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _radial = _interopRequireWildcard(require("./curve/radial.js"));
var _area = _interopRequireDefault(require("./area.js"));
var _lineRadial = require("./lineRadial.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _default() {
  var a = (0, _area.default)().curve(_radial.curveRadialLinear),
    c = a.curve,
    x0 = a.lineX0,
    x1 = a.lineX1,
    y0 = a.lineY0,
    y1 = a.lineY1;
  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function () {
    return (0, _lineRadial.lineRadial)(x0());
  }, delete a.lineX0;
  a.lineEndAngle = function () {
    return (0, _lineRadial.lineRadial)(x1());
  }, delete a.lineX1;
  a.lineInnerRadius = function () {
    return (0, _lineRadial.lineRadial)(y0());
  }, delete a.lineY0;
  a.lineOuterRadius = function () {
    return (0, _lineRadial.lineRadial)(y1());
  }, delete a.lineY1;
  a.curve = function (_) {
    return arguments.length ? c((0, _radial.default)(_)) : c()._curve;
  };
  return a;
}
},{"./curve/radial.js":"node_modules/d3-shape/src/curve/radial.js","./area.js":"node_modules/d3-shape/src/area.js","./lineRadial.js":"node_modules/d3-shape/src/lineRadial.js"}],"node_modules/d3-shape/src/pointRadial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}
},{}],"node_modules/d3-shape/src/link/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkHorizontal = linkHorizontal;
exports.linkRadial = linkRadial;
exports.linkVertical = linkVertical;
var _d3Path = require("d3-path");
var _array = require("../array.js");
var _constant = _interopRequireDefault(require("../constant.js"));
var _point = require("../point.js");
var _pointRadial = _interopRequireDefault(require("../pointRadial.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function linkSource(d) {
  return d.source;
}
function linkTarget(d) {
  return d.target;
}
function link(curve) {
  var source = linkSource,
    target = linkTarget,
    x = _point.x,
    y = _point.y,
    context = null;
  function link() {
    var buffer,
      argv = _array.slice.call(arguments),
      s = source.apply(this, argv),
      t = target.apply(this, argv);
    if (!context) context = buffer = (0, _d3Path.path)();
    curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }
  link.source = function (_) {
    return arguments.length ? (source = _, link) : source;
  };
  link.target = function (_) {
    return arguments.length ? (target = _, link) : target;
  };
  link.x = function (_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : (0, _constant.default)(+_), link) : x;
  };
  link.y = function (_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : (0, _constant.default)(+_), link) : y;
  };
  link.context = function (_) {
    return arguments.length ? (context = _ == null ? null : _, link) : context;
  };
  return link;
}
function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}
function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}
function curveRadial(context, x0, y0, x1, y1) {
  var p0 = (0, _pointRadial.default)(x0, y0),
    p1 = (0, _pointRadial.default)(x0, y0 = (y0 + y1) / 2),
    p2 = (0, _pointRadial.default)(x1, y0),
    p3 = (0, _pointRadial.default)(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}
function linkHorizontal() {
  return link(curveHorizontal);
}
function linkVertical() {
  return link(curveVertical);
}
function linkRadial() {
  var l = link(curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}
},{"d3-path":"node_modules/d3-path/src/index.js","../array.js":"node_modules/d3-shape/src/array.js","../constant.js":"node_modules/d3-shape/src/constant.js","../point.js":"node_modules/d3-shape/src/point.js","../pointRadial.js":"node_modules/d3-shape/src/pointRadial.js"}],"node_modules/d3-shape/src/symbol/circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _math = require("../math.js");
var _default = exports.default = {
  draw: function (context, size) {
    var r = Math.sqrt(size / _math.pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, _math.tau);
  }
};
},{"../math.js":"node_modules/d3-shape/src/math.js"}],"node_modules/d3-shape/src/symbol/cross.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  draw: function (context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};
},{}],"node_modules/d3-shape/src/symbol/diamond.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var tan30 = Math.sqrt(1 / 3),
  tan30_2 = tan30 * 2;
var _default = exports.default = {
  draw: function (context, size) {
    var y = Math.sqrt(size / tan30_2),
      x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};
},{}],"node_modules/d3-shape/src/symbol/star.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _math = require("../math.js");
var ka = 0.89081309152928522810,
  kr = Math.sin(_math.pi / 10) / Math.sin(7 * _math.pi / 10),
  kx = Math.sin(_math.tau / 10) * kr,
  ky = -Math.cos(_math.tau / 10) * kr;
var _default = exports.default = {
  draw: function (context, size) {
    var r = Math.sqrt(size * ka),
      x = kx * r,
      y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = _math.tau * i / 5,
        c = Math.cos(a),
        s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};
},{"../math.js":"node_modules/d3-shape/src/math.js"}],"node_modules/d3-shape/src/symbol/square.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  draw: function (context, size) {
    var w = Math.sqrt(size),
      x = -w / 2;
    context.rect(x, x, w, w);
  }
};
},{}],"node_modules/d3-shape/src/symbol/triangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var sqrt3 = Math.sqrt(3);
var _default = exports.default = {
  draw: function (context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};
},{}],"node_modules/d3-shape/src/symbol/wye.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var c = -0.5,
  s = Math.sqrt(3) / 2,
  k = 1 / Math.sqrt(12),
  a = (k / 2 + 1) * 3;
var _default = exports.default = {
  draw: function (context, size) {
    var r = Math.sqrt(size / a),
      x0 = r / 2,
      y0 = r * k,
      x1 = x0,
      y1 = r * k + r,
      x2 = -x1,
      y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};
},{}],"node_modules/d3-shape/src/symbol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.symbols = void 0;
var _d3Path = require("d3-path");
var _circle = _interopRequireDefault(require("./symbol/circle.js"));
var _cross = _interopRequireDefault(require("./symbol/cross.js"));
var _diamond = _interopRequireDefault(require("./symbol/diamond.js"));
var _star = _interopRequireDefault(require("./symbol/star.js"));
var _square = _interopRequireDefault(require("./symbol/square.js"));
var _triangle = _interopRequireDefault(require("./symbol/triangle.js"));
var _wye = _interopRequireDefault(require("./symbol/wye.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var symbols = exports.symbols = [_circle.default, _cross.default, _diamond.default, _square.default, _star.default, _triangle.default, _wye.default];
function _default(type, size) {
  var context = null;
  type = typeof type === "function" ? type : (0, _constant.default)(type || _circle.default);
  size = typeof size === "function" ? size : (0, _constant.default)(size === undefined ? 64 : +size);
  function symbol() {
    var buffer;
    if (!context) context = buffer = (0, _d3Path.path)();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }
  symbol.type = function (_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : (0, _constant.default)(_), symbol) : type;
  };
  symbol.size = function (_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : (0, _constant.default)(+_), symbol) : size;
  };
  symbol.context = function (_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };
  return symbol;
}
},{"d3-path":"node_modules/d3-path/src/index.js","./symbol/circle.js":"node_modules/d3-shape/src/symbol/circle.js","./symbol/cross.js":"node_modules/d3-shape/src/symbol/cross.js","./symbol/diamond.js":"node_modules/d3-shape/src/symbol/diamond.js","./symbol/star.js":"node_modules/d3-shape/src/symbol/star.js","./symbol/square.js":"node_modules/d3-shape/src/symbol/square.js","./symbol/triangle.js":"node_modules/d3-shape/src/symbol/triangle.js","./symbol/wye.js":"node_modules/d3-shape/src/symbol/wye.js","./constant.js":"node_modules/d3-shape/src/constant.js"}],"node_modules/d3-shape/src/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {}
},{}],"node_modules/d3-shape/src/curve/basis.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Basis = Basis;
exports.default = _default;
exports.point = point;
function point(that, x, y) {
  that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x) / 6, (that._y0 + 4 * that._y1 + y) / 6);
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 3:
        point(this, this._x1, this._y1);
      // proceed
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // proceed
      default:
        point(this, x, y);
        break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};
function _default(context) {
  return new Basis(context);
}
},{}],"node_modules/d3-shape/src/curve/basisClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _noop = _interopRequireDefault(require("../noop.js"));
var _basis = require("./basis.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: _noop.default,
  areaEnd: _noop.default,
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 1:
        {
          this._context.moveTo(this._x2, this._y2);
          this._context.closePath();
          break;
        }
      case 2:
        {
          this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
          this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
          this._context.closePath();
          break;
        }
      case 3:
        {
          this.point(this._x2, this._y2);
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          break;
        }
    }
  },
  point: function (x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x, this._y2 = y;
        break;
      case 1:
        this._point = 2;
        this._x3 = x, this._y3 = y;
        break;
      case 2:
        this._point = 3;
        this._x4 = x, this._y4 = y;
        this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
        break;
      default:
        (0, _basis.point)(this, x, y);
        break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};
function _default(context) {
  return new BasisClosed(context);
}
},{"../noop.js":"node_modules/d3-shape/src/noop.js","./basis.js":"node_modules/d3-shape/src/curve/basis.js"}],"node_modules/d3-shape/src/curve/basisOpen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _basis = require("./basis.js");
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x) / 6,
          y0 = (this._y0 + 4 * this._y1 + y) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      // proceed
      default:
        (0, _basis.point)(this, x, y);
        break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};
function _default(context) {
  return new BasisOpen(context);
}
},{"./basis.js":"node_modules/d3-shape/src/curve/basis.js"}],"node_modules/d3-shape/src/curve/bump.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bumpX = bumpX;
exports.bumpY = bumpY;
class Bump {
  constructor(context, x) {
    this._context = context;
    this._x = x;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        {
          this._point = 1;
          if (this._line) this._context.lineTo(x, y);else this._context.moveTo(x, y);
          break;
        }
      case 1:
        this._point = 2;
      // proceed
      default:
        {
          if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x) / 2, this._y0, this._x0, y, x, y);else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y) / 2, x, this._y0, x, y);
          break;
        }
    }
    this._x0 = x, this._y0 = y;
  }
}
function bumpX(context) {
  return new Bump(context, true);
}
function bumpY(context) {
  return new Bump(context, false);
}
},{}],"node_modules/d3-shape/src/curve/bundle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _basis = require("./basis.js");
function Bundle(context, beta) {
  this._basis = new _basis.Basis(context);
  this._beta = beta;
}
Bundle.prototype = {
  lineStart: function () {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function () {
    var x = this._x,
      y = this._y,
      j = x.length - 1;
    if (j > 0) {
      var x0 = x[0],
        y0 = y[0],
        dx = x[j] - x0,
        dy = y[j] - y0,
        i = -1,
        t;
      while (++i <= j) {
        t = i / j;
        this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function (x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};
var _default = exports.default = function custom(beta) {
  function bundle(context) {
    return beta === 1 ? new _basis.Basis(context) : new Bundle(context, beta);
  }
  bundle.beta = function (beta) {
    return custom(+beta);
  };
  return bundle;
}(0.85);
},{"./basis.js":"node_modules/d3-shape/src/curve/basis.js"}],"node_modules/d3-shape/src/curve/cardinal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cardinal = Cardinal;
exports.default = void 0;
exports.point = point;
function point(that, x, y) {
  that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x), that._y2 + that._k * (that._y1 - y), that._x2, that._y2);
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        this._x1 = x, this._y1 = y;
        break;
      case 2:
        this._point = 3;
      // proceed
      default:
        point(this, x, y);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
var _default = exports.default = function custom(tension) {
  function cardinal(context) {
    return new Cardinal(context, tension);
  }
  cardinal.tension = function (tension) {
    return custom(+tension);
  };
  return cardinal;
}(0);
},{}],"node_modules/d3-shape/src/curve/cardinalClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardinalClosed = CardinalClosed;
exports.default = void 0;
var _noop = _interopRequireDefault(require("../noop.js"));
var _cardinal = require("./cardinal.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: _noop.default,
  areaEnd: _noop.default,
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 1:
        {
          this._context.moveTo(this._x3, this._y3);
          this._context.closePath();
          break;
        }
      case 2:
        {
          this._context.lineTo(this._x3, this._y3);
          this._context.closePath();
          break;
        }
      case 3:
        {
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          this.point(this._x5, this._y5);
          break;
        }
    }
  },
  point: function (x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x, this._y3 = y;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x, this._y4 = y);
        break;
      case 2:
        this._point = 3;
        this._x5 = x, this._y5 = y;
        break;
      default:
        (0, _cardinal.point)(this, x, y);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
var _default = exports.default = function custom(tension) {
  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }
  cardinal.tension = function (tension) {
    return custom(+tension);
  };
  return cardinal;
}(0);
},{"../noop.js":"node_modules/d3-shape/src/noop.js","./cardinal.js":"node_modules/d3-shape/src/curve/cardinal.js"}],"node_modules/d3-shape/src/curve/cardinalOpen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardinalOpen = CardinalOpen;
exports.default = void 0;
var _cardinal = require("./cardinal.js");
function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // proceed
      default:
        (0, _cardinal.point)(this, x, y);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
var _default = exports.default = function custom(tension) {
  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }
  cardinal.tension = function (tension) {
    return custom(+tension);
  };
  return cardinal;
}(0);
},{"./cardinal.js":"node_modules/d3-shape/src/curve/cardinal.js"}],"node_modules/d3-shape/src/curve/catmullRom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.point = point;
var _math = require("../math.js");
var _cardinal = require("./cardinal.js");
function point(that, x, y) {
  var x1 = that._x1,
    y1 = that._y1,
    x2 = that._x2,
    y2 = that._y2;
  if (that._l01_a > _math.epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
      n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }
  if (that._l23_a > _math.epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
      m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }
  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;
    if (this._point) {
      var x23 = this._x2 - x,
        y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // proceed
      default:
        point(this, x, y);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
var _default = exports.default = function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new _cardinal.Cardinal(context, 0);
  }
  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };
  return catmullRom;
}(0.5);
},{"../math.js":"node_modules/d3-shape/src/math.js","./cardinal.js":"node_modules/d3-shape/src/curve/cardinal.js"}],"node_modules/d3-shape/src/curve/catmullRomClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cardinalClosed = require("./cardinalClosed.js");
var _noop = _interopRequireDefault(require("../noop.js"));
var _catmullRom = require("./catmullRom.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: _noop.default,
  areaEnd: _noop.default,
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 1:
        {
          this._context.moveTo(this._x3, this._y3);
          this._context.closePath();
          break;
        }
      case 2:
        {
          this._context.lineTo(this._x3, this._y3);
          this._context.closePath();
          break;
        }
      case 3:
        {
          this.point(this._x3, this._y3);
          this.point(this._x4, this._y4);
          this.point(this._x5, this._y5);
          break;
        }
    }
  },
  point: function (x, y) {
    x = +x, y = +y;
    if (this._point) {
      var x23 = this._x2 - x,
        y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x, this._y3 = y;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x, this._y4 = y);
        break;
      case 2:
        this._point = 3;
        this._x5 = x, this._y5 = y;
        break;
      default:
        (0, _catmullRom.point)(this, x, y);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
var _default = exports.default = function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new _cardinalClosed.CardinalClosed(context, 0);
  }
  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };
  return catmullRom;
}(0.5);
},{"./cardinalClosed.js":"node_modules/d3-shape/src/curve/cardinalClosed.js","../noop.js":"node_modules/d3-shape/src/noop.js","./catmullRom.js":"node_modules/d3-shape/src/curve/catmullRom.js"}],"node_modules/d3-shape/src/curve/catmullRomOpen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cardinalOpen = require("./cardinalOpen.js");
var _catmullRom = require("./catmullRom.js");
function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function () {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;
    if (this._point) {
      var x23 = this._x2 - x,
        y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // proceed
      default:
        (0, _catmullRom.point)(this, x, y);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};
var _default = exports.default = function custom(alpha) {
  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new _cardinalOpen.CardinalOpen(context, 0);
  }
  catmullRom.alpha = function (alpha) {
    return custom(+alpha);
  };
  return catmullRom;
}(0.5);
},{"./cardinalOpen.js":"node_modules/d3-shape/src/curve/cardinalOpen.js","./catmullRom.js":"node_modules/d3-shape/src/curve/catmullRom.js"}],"node_modules/d3-shape/src/curve/linearClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _noop = _interopRequireDefault(require("../noop.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: _noop.default,
  areaEnd: _noop.default,
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    if (this._point) this._context.closePath();
  },
  point: function (x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);else this._point = 1, this._context.moveTo(x, y);
  }
};
function _default(context) {
  return new LinearClosed(context);
}
},{"../noop.js":"node_modules/d3-shape/src/noop.js"}],"node_modules/d3-shape/src/curve/monotone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monotoneX = monotoneX;
exports.monotoneY = monotoneY;
function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
    h1 = x2 - that._x1,
    s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
    s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
    p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point(that, t0, t1) {
  var x0 = that._x0,
    y0 = that._y0,
    x1 = that._x1,
    y1 = that._y1,
    dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function (x, y) {
    var t1 = NaN;
    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point(this, slope2(this, t1 = slope3(this, x, y)), t1);
        break;
      default:
        point(this, this._t0, t1 = slope3(this, x, y));
        break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function (x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function (x, y) {
    this._context.moveTo(y, x);
  },
  closePath: function () {
    this._context.closePath();
  },
  lineTo: function (x, y) {
    this._context.lineTo(y, x);
  },
  bezierCurveTo: function (x1, y1, x2, y2, x, y) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
  }
};
function monotoneX(context) {
  return new MonotoneX(context);
}
function monotoneY(context) {
  return new MonotoneY(context);
}
},{}],"node_modules/d3-shape/src/curve/natural.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x = [];
    this._y = [];
  },
  lineEnd: function () {
    var x = this._x,
      y = this._y,
      n = x.length;
    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
          py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function (x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
    n = x.length - 1,
    m,
    a = new Array(n),
    b = new Array(n),
    r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}
function _default(context) {
  return new Natural(context);
}
},{}],"node_modules/d3-shape/src/curve/step.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.stepAfter = stepAfter;
exports.stepBefore = stepBefore;
function Step(context, t) {
  this._context = context;
  this._t = t;
}
Step.prototype = {
  areaStart: function () {
    this._line = 0;
  },
  areaEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function () {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function (x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2;
      // proceed
      default:
        {
          if (this._t <= 0) {
            this._context.lineTo(this._x, y);
            this._context.lineTo(x, y);
          } else {
            var x1 = this._x * (1 - this._t) + x * this._t;
            this._context.lineTo(x1, this._y);
            this._context.lineTo(x1, y);
          }
          break;
        }
    }
    this._x = x, this._y = y;
  }
};
function _default(context) {
  return new Step(context, 0.5);
}
function stepBefore(context) {
  return new Step(context, 0);
}
function stepAfter(context) {
  return new Step(context, 1);
}
},{}],"node_modules/d3-shape/src/offset/none.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}
},{}],"node_modules/d3-shape/src/order/none.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(series) {
  var n = series.length,
    o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}
},{}],"node_modules/d3-shape/src/stack.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _array = _interopRequireDefault(require("./array.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
var _none = _interopRequireDefault(require("./offset/none.js"));
var _none2 = _interopRequireDefault(require("./order/none.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function stackValue(d, key) {
  return d[key];
}
function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}
function _default() {
  var keys = (0, _constant.default)([]),
    order = _none2.default,
    offset = _none.default,
    value = stackValue;
  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries),
      i,
      n = sz.length,
      j = -1,
      oz;
    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }
    for (i = 0, oz = (0, _array.default)(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }
    offset(sz, oz);
    return sz;
  }
  stack.keys = function (_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : (0, _constant.default)(Array.from(_)), stack) : keys;
  };
  stack.value = function (_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constant.default)(+_), stack) : value;
  };
  stack.order = function (_) {
    return arguments.length ? (order = _ == null ? _none2.default : typeof _ === "function" ? _ : (0, _constant.default)(Array.from(_)), stack) : order;
  };
  stack.offset = function (_) {
    return arguments.length ? (offset = _ == null ? _none.default : _, stack) : offset;
  };
  return stack;
}
},{"./array.js":"node_modules/d3-shape/src/array.js","./constant.js":"node_modules/d3-shape/src/constant.js","./offset/none.js":"node_modules/d3-shape/src/offset/none.js","./order/none.js":"node_modules/d3-shape/src/order/none.js"}],"node_modules/d3-shape/src/offset/expand.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _none = _interopRequireDefault(require("./none.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  (0, _none.default)(series, order);
}
},{"./none.js":"node_modules/d3-shape/src/offset/none.js"}],"node_modules/d3-shape/src/offset/diverging.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = 0, d[1] = dy;
      }
    }
  }
}
},{}],"node_modules/d3-shape/src/offset/silhouette.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _none = _interopRequireDefault(require("./none.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  (0, _none.default)(series, order);
}
},{"./none.js":"node_modules/d3-shape/src/offset/none.js"}],"node_modules/d3-shape/src/offset/wiggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _none = _interopRequireDefault(require("./none.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
        sij0 = si[j][1] || 0,
        sij1 = si[j - 1][1] || 0,
        s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
          skj0 = sk[j][1] || 0,
          skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  (0, _none.default)(series, order);
}
},{"./none.js":"node_modules/d3-shape/src/offset/none.js"}],"node_modules/d3-shape/src/order/appearance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _none = _interopRequireDefault(require("./none.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(series) {
  var peaks = series.map(peak);
  return (0, _none.default)(series).sort(function (a, b) {
    return peaks[a] - peaks[b];
  });
}
function peak(series) {
  var i = -1,
    j = 0,
    n = series.length,
    vi,
    vj = -Infinity;
  while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;
  return j;
}
},{"./none.js":"node_modules/d3-shape/src/order/none.js"}],"node_modules/d3-shape/src/order/ascending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.sum = sum;
var _none = _interopRequireDefault(require("./none.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(series) {
  var sums = series.map(sum);
  return (0, _none.default)(series).sort(function (a, b) {
    return sums[a] - sums[b];
  });
}
function sum(series) {
  var s = 0,
    i = -1,
    n = series.length,
    v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}
},{"./none.js":"node_modules/d3-shape/src/order/none.js"}],"node_modules/d3-shape/src/order/descending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _ascending = _interopRequireDefault(require("./ascending.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(series) {
  return (0, _ascending.default)(series).reverse();
}
},{"./ascending.js":"node_modules/d3-shape/src/order/ascending.js"}],"node_modules/d3-shape/src/order/insideOut.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _appearance = _interopRequireDefault(require("./appearance.js"));
var _ascending = require("./ascending.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(series) {
  var n = series.length,
    i,
    j,
    sums = series.map(_ascending.sum),
    order = (0, _appearance.default)(series),
    top = 0,
    bottom = 0,
    tops = [],
    bottoms = [];
  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }
  return bottoms.reverse().concat(tops);
}
},{"./appearance.js":"node_modules/d3-shape/src/order/appearance.js","./ascending.js":"node_modules/d3-shape/src/order/ascending.js"}],"node_modules/d3-shape/src/order/reverse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _none = _interopRequireDefault(require("./none.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(series) {
  return (0, _none.default)(series).reverse();
}
},{"./none.js":"node_modules/d3-shape/src/order/none.js"}],"node_modules/d3-shape/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "arc", {
  enumerable: true,
  get: function () {
    return _arc.default;
  }
});
Object.defineProperty(exports, "area", {
  enumerable: true,
  get: function () {
    return _area.default;
  }
});
Object.defineProperty(exports, "areaRadial", {
  enumerable: true,
  get: function () {
    return _areaRadial.default;
  }
});
Object.defineProperty(exports, "curveBasis", {
  enumerable: true,
  get: function () {
    return _basis.default;
  }
});
Object.defineProperty(exports, "curveBasisClosed", {
  enumerable: true,
  get: function () {
    return _basisClosed.default;
  }
});
Object.defineProperty(exports, "curveBasisOpen", {
  enumerable: true,
  get: function () {
    return _basisOpen.default;
  }
});
Object.defineProperty(exports, "curveBumpX", {
  enumerable: true,
  get: function () {
    return _bump.bumpX;
  }
});
Object.defineProperty(exports, "curveBumpY", {
  enumerable: true,
  get: function () {
    return _bump.bumpY;
  }
});
Object.defineProperty(exports, "curveBundle", {
  enumerable: true,
  get: function () {
    return _bundle.default;
  }
});
Object.defineProperty(exports, "curveCardinal", {
  enumerable: true,
  get: function () {
    return _cardinal.default;
  }
});
Object.defineProperty(exports, "curveCardinalClosed", {
  enumerable: true,
  get: function () {
    return _cardinalClosed.default;
  }
});
Object.defineProperty(exports, "curveCardinalOpen", {
  enumerable: true,
  get: function () {
    return _cardinalOpen.default;
  }
});
Object.defineProperty(exports, "curveCatmullRom", {
  enumerable: true,
  get: function () {
    return _catmullRom.default;
  }
});
Object.defineProperty(exports, "curveCatmullRomClosed", {
  enumerable: true,
  get: function () {
    return _catmullRomClosed.default;
  }
});
Object.defineProperty(exports, "curveCatmullRomOpen", {
  enumerable: true,
  get: function () {
    return _catmullRomOpen.default;
  }
});
Object.defineProperty(exports, "curveLinear", {
  enumerable: true,
  get: function () {
    return _linear.default;
  }
});
Object.defineProperty(exports, "curveLinearClosed", {
  enumerable: true,
  get: function () {
    return _linearClosed.default;
  }
});
Object.defineProperty(exports, "curveMonotoneX", {
  enumerable: true,
  get: function () {
    return _monotone.monotoneX;
  }
});
Object.defineProperty(exports, "curveMonotoneY", {
  enumerable: true,
  get: function () {
    return _monotone.monotoneY;
  }
});
Object.defineProperty(exports, "curveNatural", {
  enumerable: true,
  get: function () {
    return _natural.default;
  }
});
Object.defineProperty(exports, "curveStep", {
  enumerable: true,
  get: function () {
    return _step.default;
  }
});
Object.defineProperty(exports, "curveStepAfter", {
  enumerable: true,
  get: function () {
    return _step.stepAfter;
  }
});
Object.defineProperty(exports, "curveStepBefore", {
  enumerable: true,
  get: function () {
    return _step.stepBefore;
  }
});
Object.defineProperty(exports, "line", {
  enumerable: true,
  get: function () {
    return _line.default;
  }
});
Object.defineProperty(exports, "lineRadial", {
  enumerable: true,
  get: function () {
    return _lineRadial.default;
  }
});
Object.defineProperty(exports, "linkHorizontal", {
  enumerable: true,
  get: function () {
    return _index.linkHorizontal;
  }
});
Object.defineProperty(exports, "linkRadial", {
  enumerable: true,
  get: function () {
    return _index.linkRadial;
  }
});
Object.defineProperty(exports, "linkVertical", {
  enumerable: true,
  get: function () {
    return _index.linkVertical;
  }
});
Object.defineProperty(exports, "pie", {
  enumerable: true,
  get: function () {
    return _pie.default;
  }
});
Object.defineProperty(exports, "pointRadial", {
  enumerable: true,
  get: function () {
    return _pointRadial.default;
  }
});
Object.defineProperty(exports, "radialArea", {
  enumerable: true,
  get: function () {
    return _areaRadial.default;
  }
});
Object.defineProperty(exports, "radialLine", {
  enumerable: true,
  get: function () {
    return _lineRadial.default;
  }
});
Object.defineProperty(exports, "stack", {
  enumerable: true,
  get: function () {
    return _stack.default;
  }
});
Object.defineProperty(exports, "stackOffsetDiverging", {
  enumerable: true,
  get: function () {
    return _diverging.default;
  }
});
Object.defineProperty(exports, "stackOffsetExpand", {
  enumerable: true,
  get: function () {
    return _expand.default;
  }
});
Object.defineProperty(exports, "stackOffsetNone", {
  enumerable: true,
  get: function () {
    return _none.default;
  }
});
Object.defineProperty(exports, "stackOffsetSilhouette", {
  enumerable: true,
  get: function () {
    return _silhouette.default;
  }
});
Object.defineProperty(exports, "stackOffsetWiggle", {
  enumerable: true,
  get: function () {
    return _wiggle.default;
  }
});
Object.defineProperty(exports, "stackOrderAppearance", {
  enumerable: true,
  get: function () {
    return _appearance.default;
  }
});
Object.defineProperty(exports, "stackOrderAscending", {
  enumerable: true,
  get: function () {
    return _ascending.default;
  }
});
Object.defineProperty(exports, "stackOrderDescending", {
  enumerable: true,
  get: function () {
    return _descending.default;
  }
});
Object.defineProperty(exports, "stackOrderInsideOut", {
  enumerable: true,
  get: function () {
    return _insideOut.default;
  }
});
Object.defineProperty(exports, "stackOrderNone", {
  enumerable: true,
  get: function () {
    return _none2.default;
  }
});
Object.defineProperty(exports, "stackOrderReverse", {
  enumerable: true,
  get: function () {
    return _reverse.default;
  }
});
Object.defineProperty(exports, "symbol", {
  enumerable: true,
  get: function () {
    return _symbol.default;
  }
});
Object.defineProperty(exports, "symbolCircle", {
  enumerable: true,
  get: function () {
    return _circle.default;
  }
});
Object.defineProperty(exports, "symbolCross", {
  enumerable: true,
  get: function () {
    return _cross.default;
  }
});
Object.defineProperty(exports, "symbolDiamond", {
  enumerable: true,
  get: function () {
    return _diamond.default;
  }
});
Object.defineProperty(exports, "symbolSquare", {
  enumerable: true,
  get: function () {
    return _square.default;
  }
});
Object.defineProperty(exports, "symbolStar", {
  enumerable: true,
  get: function () {
    return _star.default;
  }
});
Object.defineProperty(exports, "symbolTriangle", {
  enumerable: true,
  get: function () {
    return _triangle.default;
  }
});
Object.defineProperty(exports, "symbolWye", {
  enumerable: true,
  get: function () {
    return _wye.default;
  }
});
Object.defineProperty(exports, "symbols", {
  enumerable: true,
  get: function () {
    return _symbol.symbols;
  }
});
var _arc = _interopRequireDefault(require("./arc.js"));
var _area = _interopRequireDefault(require("./area.js"));
var _line = _interopRequireDefault(require("./line.js"));
var _pie = _interopRequireDefault(require("./pie.js"));
var _areaRadial = _interopRequireDefault(require("./areaRadial.js"));
var _lineRadial = _interopRequireDefault(require("./lineRadial.js"));
var _pointRadial = _interopRequireDefault(require("./pointRadial.js"));
var _index = require("./link/index.js");
var _symbol = _interopRequireWildcard(require("./symbol.js"));
var _circle = _interopRequireDefault(require("./symbol/circle.js"));
var _cross = _interopRequireDefault(require("./symbol/cross.js"));
var _diamond = _interopRequireDefault(require("./symbol/diamond.js"));
var _square = _interopRequireDefault(require("./symbol/square.js"));
var _star = _interopRequireDefault(require("./symbol/star.js"));
var _triangle = _interopRequireDefault(require("./symbol/triangle.js"));
var _wye = _interopRequireDefault(require("./symbol/wye.js"));
var _basisClosed = _interopRequireDefault(require("./curve/basisClosed.js"));
var _basisOpen = _interopRequireDefault(require("./curve/basisOpen.js"));
var _basis = _interopRequireDefault(require("./curve/basis.js"));
var _bump = require("./curve/bump.js");
var _bundle = _interopRequireDefault(require("./curve/bundle.js"));
var _cardinalClosed = _interopRequireDefault(require("./curve/cardinalClosed.js"));
var _cardinalOpen = _interopRequireDefault(require("./curve/cardinalOpen.js"));
var _cardinal = _interopRequireDefault(require("./curve/cardinal.js"));
var _catmullRomClosed = _interopRequireDefault(require("./curve/catmullRomClosed.js"));
var _catmullRomOpen = _interopRequireDefault(require("./curve/catmullRomOpen.js"));
var _catmullRom = _interopRequireDefault(require("./curve/catmullRom.js"));
var _linearClosed = _interopRequireDefault(require("./curve/linearClosed.js"));
var _linear = _interopRequireDefault(require("./curve/linear.js"));
var _monotone = require("./curve/monotone.js");
var _natural = _interopRequireDefault(require("./curve/natural.js"));
var _step = _interopRequireWildcard(require("./curve/step.js"));
var _stack = _interopRequireDefault(require("./stack.js"));
var _expand = _interopRequireDefault(require("./offset/expand.js"));
var _diverging = _interopRequireDefault(require("./offset/diverging.js"));
var _none = _interopRequireDefault(require("./offset/none.js"));
var _silhouette = _interopRequireDefault(require("./offset/silhouette.js"));
var _wiggle = _interopRequireDefault(require("./offset/wiggle.js"));
var _appearance = _interopRequireDefault(require("./order/appearance.js"));
var _ascending = _interopRequireDefault(require("./order/ascending.js"));
var _descending = _interopRequireDefault(require("./order/descending.js"));
var _insideOut = _interopRequireDefault(require("./order/insideOut.js"));
var _none2 = _interopRequireDefault(require("./order/none.js"));
var _reverse = _interopRequireDefault(require("./order/reverse.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./arc.js":"node_modules/d3-shape/src/arc.js","./area.js":"node_modules/d3-shape/src/area.js","./line.js":"node_modules/d3-shape/src/line.js","./pie.js":"node_modules/d3-shape/src/pie.js","./areaRadial.js":"node_modules/d3-shape/src/areaRadial.js","./lineRadial.js":"node_modules/d3-shape/src/lineRadial.js","./pointRadial.js":"node_modules/d3-shape/src/pointRadial.js","./link/index.js":"node_modules/d3-shape/src/link/index.js","./symbol.js":"node_modules/d3-shape/src/symbol.js","./symbol/circle.js":"node_modules/d3-shape/src/symbol/circle.js","./symbol/cross.js":"node_modules/d3-shape/src/symbol/cross.js","./symbol/diamond.js":"node_modules/d3-shape/src/symbol/diamond.js","./symbol/square.js":"node_modules/d3-shape/src/symbol/square.js","./symbol/star.js":"node_modules/d3-shape/src/symbol/star.js","./symbol/triangle.js":"node_modules/d3-shape/src/symbol/triangle.js","./symbol/wye.js":"node_modules/d3-shape/src/symbol/wye.js","./curve/basisClosed.js":"node_modules/d3-shape/src/curve/basisClosed.js","./curve/basisOpen.js":"node_modules/d3-shape/src/curve/basisOpen.js","./curve/basis.js":"node_modules/d3-shape/src/curve/basis.js","./curve/bump.js":"node_modules/d3-shape/src/curve/bump.js","./curve/bundle.js":"node_modules/d3-shape/src/curve/bundle.js","./curve/cardinalClosed.js":"node_modules/d3-shape/src/curve/cardinalClosed.js","./curve/cardinalOpen.js":"node_modules/d3-shape/src/curve/cardinalOpen.js","./curve/cardinal.js":"node_modules/d3-shape/src/curve/cardinal.js","./curve/catmullRomClosed.js":"node_modules/d3-shape/src/curve/catmullRomClosed.js","./curve/catmullRomOpen.js":"node_modules/d3-shape/src/curve/catmullRomOpen.js","./curve/catmullRom.js":"node_modules/d3-shape/src/curve/catmullRom.js","./curve/linearClosed.js":"node_modules/d3-shape/src/curve/linearClosed.js","./curve/linear.js":"node_modules/d3-shape/src/curve/linear.js","./curve/monotone.js":"node_modules/d3-shape/src/curve/monotone.js","./curve/natural.js":"node_modules/d3-shape/src/curve/natural.js","./curve/step.js":"node_modules/d3-shape/src/curve/step.js","./stack.js":"node_modules/d3-shape/src/stack.js","./offset/expand.js":"node_modules/d3-shape/src/offset/expand.js","./offset/diverging.js":"node_modules/d3-shape/src/offset/diverging.js","./offset/none.js":"node_modules/d3-shape/src/offset/none.js","./offset/silhouette.js":"node_modules/d3-shape/src/offset/silhouette.js","./offset/wiggle.js":"node_modules/d3-shape/src/offset/wiggle.js","./order/appearance.js":"node_modules/d3-shape/src/order/appearance.js","./order/ascending.js":"node_modules/d3-shape/src/order/ascending.js","./order/descending.js":"node_modules/d3-shape/src/order/descending.js","./order/insideOut.js":"node_modules/d3-shape/src/order/insideOut.js","./order/none.js":"node_modules/d3-shape/src/order/none.js","./order/reverse.js":"node_modules/d3-shape/src/order/reverse.js"}],"node_modules/d3-drag/src/noevent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.nopropagation = nopropagation;
function nopropagation(event) {
  event.stopImmediatePropagation();
}
function _default(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
},{}],"node_modules/d3-drag/src/nodrag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.yesdrag = yesdrag;
var _d3Selection = require("d3-selection");
var _noevent = _interopRequireDefault(require("./noevent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(view) {
  var root = view.document.documentElement,
    selection = (0, _d3Selection.select)(view).on("dragstart.drag", _noevent.default, true);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", _noevent.default, true);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root = view.document.documentElement,
    selection = (0, _d3Selection.select)(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", _noevent.default, true);
    setTimeout(function () {
      selection.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}
},{"d3-selection":"node_modules/d3-selection/src/index.js","./noevent.js":"node_modules/d3-drag/src/noevent.js"}],"node_modules/d3-drag/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = x => () => x;
exports.default = _default;
},{}],"node_modules/d3-drag/src/event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DragEvent;
function DragEvent(type, {
  sourceEvent,
  subject,
  target,
  identifier,
  active,
  x,
  y,
  dx,
  dy,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {
      value: type,
      enumerable: true,
      configurable: true
    },
    sourceEvent: {
      value: sourceEvent,
      enumerable: true,
      configurable: true
    },
    subject: {
      value: subject,
      enumerable: true,
      configurable: true
    },
    target: {
      value: target,
      enumerable: true,
      configurable: true
    },
    identifier: {
      value: identifier,
      enumerable: true,
      configurable: true
    },
    active: {
      value: active,
      enumerable: true,
      configurable: true
    },
    x: {
      value: x,
      enumerable: true,
      configurable: true
    },
    y: {
      value: y,
      enumerable: true,
      configurable: true
    },
    dx: {
      value: dx,
      enumerable: true,
      configurable: true
    },
    dy: {
      value: dy,
      enumerable: true,
      configurable: true
    },
    _: {
      value: dispatch
    }
  });
}
DragEvent.prototype.on = function () {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};
},{}],"node_modules/d3-drag/src/drag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Dispatch = require("d3-dispatch");
var _d3Selection = require("d3-selection");
var _nodrag = _interopRequireWildcard(require("./nodrag.js"));
var _noevent = _interopRequireWildcard(require("./noevent.js"));
var _constant = _interopRequireDefault(require("./constant.js"));
var _event = _interopRequireDefault(require("./event.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Ignore right-click, since that should open the context menu.
function defaultFilter(event) {
  return !event.ctrlKey && !event.button;
}
function defaultContainer() {
  return this.parentNode;
}
function defaultSubject(event, d) {
  return d == null ? {
    x: event.x,
    y: event.y
  } : d;
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function _default() {
  var filter = defaultFilter,
    container = defaultContainer,
    subject = defaultSubject,
    touchable = defaultTouchable,
    gestures = {},
    listeners = (0, _d3Dispatch.dispatch)("start", "drag", "end"),
    active = 0,
    mousedownx,
    mousedowny,
    mousemoving,
    touchending,
    clickDistance2 = 0;
  function drag(selection) {
    selection.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function mousedowned(event, d) {
    if (touchending || !filter.call(this, event, d)) return;
    var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    if (!gesture) return;
    (0, _d3Selection.select)(event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
    (0, _nodrag.default)(event.view);
    (0, _noevent.nopropagation)(event);
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start", event);
  }
  function mousemoved(event) {
    (0, _noevent.default)(event);
    if (!mousemoving) {
      var dx = event.clientX - mousedownx,
        dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag", event);
  }
  function mouseupped(event) {
    (0, _d3Selection.select)(event.view).on("mousemove.drag mouseup.drag", null);
    (0, _nodrag.yesdrag)(event.view, mousemoving);
    (0, _noevent.default)(event);
    gestures.mouse("end", event);
  }
  function touchstarted(event, d) {
    if (!filter.call(this, event, d)) return;
    var touches = event.changedTouches,
      c = container.call(this, event, d),
      n = touches.length,
      i,
      gesture;
    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
        (0, _noevent.nopropagation)(event);
        gesture("start", event, touches[i]);
      }
    }
  }
  function touchmoved(event) {
    var touches = event.changedTouches,
      n = touches.length,
      i,
      gesture;
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        (0, _noevent.default)(event);
        gesture("drag", event, touches[i]);
      }
    }
  }
  function touchended(event) {
    var touches = event.changedTouches,
      n = touches.length,
      i,
      gesture;
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function () {
      touchending = null;
    }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        (0, _noevent.nopropagation)(event);
        gesture("end", event, touches[i]);
      }
    }
  }
  function beforestart(that, container, event, d, identifier, touch) {
    var dispatch = listeners.copy(),
      p = (0, _d3Selection.pointer)(touch || event, container),
      dx,
      dy,
      s;
    if ((s = subject.call(that, new _event.default("beforestart", {
      sourceEvent: event,
      target: drag,
      identifier,
      active,
      x: p[0],
      y: p[1],
      dx: 0,
      dy: 0,
      dispatch
    }), d)) == null) return;
    dx = s.x - p[0] || 0;
    dy = s.y - p[1] || 0;
    return function gesture(type, event, touch) {
      var p0 = p,
        n;
      switch (type) {
        case "start":
          gestures[identifier] = gesture, n = active++;
          break;
        case "end":
          delete gestures[identifier], --active;
        // nobreak
        case "drag":
          p = (0, _d3Selection.pointer)(touch || event, container), n = active;
          break;
      }
      dispatch.call(type, that, new _event.default(type, {
        sourceEvent: event,
        subject: s,
        target: drag,
        identifier,
        active: n,
        x: p[0] + dx,
        y: p[1] + dy,
        dx: p[0] - p0[0],
        dy: p[1] - p0[1],
        dispatch
      }), d);
    };
  }
  drag.filter = function (_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : (0, _constant.default)(!!_), drag) : filter;
  };
  drag.container = function (_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : (0, _constant.default)(_), drag) : container;
  };
  drag.subject = function (_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : (0, _constant.default)(_), drag) : subject;
  };
  drag.touchable = function (_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : (0, _constant.default)(!!_), drag) : touchable;
  };
  drag.on = function () {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };
  drag.clickDistance = function (_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };
  return drag;
}
},{"d3-dispatch":"node_modules/d3-dispatch/src/index.js","d3-selection":"node_modules/d3-selection/src/index.js","./nodrag.js":"node_modules/d3-drag/src/nodrag.js","./noevent.js":"node_modules/d3-drag/src/noevent.js","./constant.js":"node_modules/d3-drag/src/constant.js","./event.js":"node_modules/d3-drag/src/event.js"}],"node_modules/d3-drag/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "drag", {
  enumerable: true,
  get: function () {
    return _drag.default;
  }
});
Object.defineProperty(exports, "dragDisable", {
  enumerable: true,
  get: function () {
    return _nodrag.default;
  }
});
Object.defineProperty(exports, "dragEnable", {
  enumerable: true,
  get: function () {
    return _nodrag.yesdrag;
  }
});
var _drag = _interopRequireDefault(require("./drag.js"));
var _nodrag = _interopRequireWildcard(require("./nodrag.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./drag.js":"node_modules/d3-drag/src/drag.js","./nodrag.js":"node_modules/d3-drag/src/nodrag.js"}],"node_modules/d3-format/src/formatDecimal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.formatDecimalParts = formatDecimalParts;
function _default(x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i,
    coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}
},{}],"node_modules/d3-format/src/exponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _formatDecimal = require("./formatDecimal.js");
function _default(x) {
  return x = (0, _formatDecimal.formatDecimalParts)(Math.abs(x)), x ? x[1] : NaN;
}
},{"./formatDecimal.js":"node_modules/d3-format/src/formatDecimal.js"}],"node_modules/d3-format/src/formatGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(grouping, thousands) {
  return function (value, width) {
    var i = value.length,
      t = [],
      j = 0,
      g = grouping[0],
      length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}
},{}],"node_modules/d3-format/src/formatNumerals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(numerals) {
  return function (value) {
    return value.replace(/[0-9]/g, function (i) {
      return numerals[+i];
    });
  };
}
},{}],"node_modules/d3-format/src/formatSpecifier.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormatSpecifier = FormatSpecifier;
exports.default = formatSpecifier;
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function () {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
},{}],"node_modules/d3-format/src/formatTrim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function _default(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}
},{}],"node_modules/d3-format/src/formatPrefixAuto.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.prefixExponent = void 0;
var _formatDecimal = require("./formatDecimal.js");
var prefixExponent;
function _default(x, p) {
  var d = (0, _formatDecimal.formatDecimalParts)(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
    exponent = d[1],
    i = exponent - (exports.prefixExponent = prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
    n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + (0, _formatDecimal.formatDecimalParts)(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}
},{"./formatDecimal.js":"node_modules/d3-format/src/formatDecimal.js"}],"node_modules/d3-format/src/formatRounded.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _formatDecimal = require("./formatDecimal.js");
function _default(x, p) {
  var d = (0, _formatDecimal.formatDecimalParts)(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
    exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}
},{"./formatDecimal.js":"node_modules/d3-format/src/formatDecimal.js"}],"node_modules/d3-format/src/formatTypes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _formatDecimal = _interopRequireDefault(require("./formatDecimal.js"));
var _formatPrefixAuto = _interopRequireDefault(require("./formatPrefixAuto.js"));
var _formatRounded = _interopRequireDefault(require("./formatRounded.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  "%": function _(x, p) {
    return (x * 100).toFixed(p);
  },
  "b": function b(x) {
    return Math.round(x).toString(2);
  },
  "c": function c(x) {
    return x + "";
  },
  "d": _formatDecimal.default,
  "e": function e(x, p) {
    return x.toExponential(p);
  },
  "f": function f(x, p) {
    return x.toFixed(p);
  },
  "g": function g(x, p) {
    return x.toPrecision(p);
  },
  "o": function o(x) {
    return Math.round(x).toString(8);
  },
  "p": function p(x, _p) {
    return (0, _formatRounded.default)(x * 100, _p);
  },
  "r": _formatRounded.default,
  "s": _formatPrefixAuto.default,
  "X": function X(x) {
    return Math.round(x).toString(16).toUpperCase();
  },
  "x": function x(_x) {
    return Math.round(_x).toString(16);
  }
};
},{"./formatDecimal.js":"node_modules/d3-format/src/formatDecimal.js","./formatPrefixAuto.js":"node_modules/d3-format/src/formatPrefixAuto.js","./formatRounded.js":"node_modules/d3-format/src/formatRounded.js"}],"node_modules/d3-format/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return x;
}
},{}],"node_modules/d3-format/src/locale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _exponent = _interopRequireDefault(require("./exponent.js"));
var _formatGroup = _interopRequireDefault(require("./formatGroup.js"));
var _formatNumerals = _interopRequireDefault(require("./formatNumerals.js"));
var _formatSpecifier = _interopRequireDefault(require("./formatSpecifier.js"));
var _formatTrim = _interopRequireDefault(require("./formatTrim.js"));
var _formatTypes = _interopRequireDefault(require("./formatTypes.js"));
var _formatPrefixAuto = require("./formatPrefixAuto.js");
var _identity = _interopRequireDefault(require("./identity.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var map = Array.prototype.map,
  prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function _default(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? _identity.default : (0, _formatGroup.default)(map.call(locale.grouping, Number), locale.thousands + ""),
    currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
    currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
    decimal = locale.decimal === undefined ? "." : locale.decimal + "",
    numerals = locale.numerals === undefined ? _identity.default : (0, _formatNumerals.default)(map.call(locale.numerals, String)),
    percent = locale.percent === undefined ? "%" : locale.percent + "",
    minus = locale.minus === undefined ? "−" : locale.minus + "",
    nan = locale.nan === undefined ? "NaN" : locale.nan + "";
  function newFormat(specifier) {
    specifier = (0, _formatSpecifier.default)(specifier);
    var fill = specifier.fill,
      align = specifier.align,
      sign = specifier.sign,
      symbol = specifier.symbol,
      zero = specifier.zero,
      width = specifier.width,
      comma = specifier.comma,
      precision = specifier.precision,
      trim = specifier.trim,
      type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!_formatTypes.default[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
      suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = _formatTypes.default[type],
      maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format(value) {
      var valuePrefix = prefix,
        valueSuffix = suffix,
        i,
        n,
        c;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = (0, _formatTrim.default)(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + _formatPrefixAuto.prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
        padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format.toString = function () {
      return specifier + "";
    };
    return format;
  }
  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = (0, _formatSpecifier.default)(specifier), specifier.type = "f", specifier)),
      e = Math.max(-8, Math.min(8, Math.floor((0, _exponent.default)(value) / 3))) * 3,
      k = Math.pow(10, -e),
      prefix = prefixes[8 + e / 3];
    return function (value) {
      return f(k * value) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}
},{"./exponent.js":"node_modules/d3-format/src/exponent.js","./formatGroup.js":"node_modules/d3-format/src/formatGroup.js","./formatNumerals.js":"node_modules/d3-format/src/formatNumerals.js","./formatSpecifier.js":"node_modules/d3-format/src/formatSpecifier.js","./formatTrim.js":"node_modules/d3-format/src/formatTrim.js","./formatTypes.js":"node_modules/d3-format/src/formatTypes.js","./formatPrefixAuto.js":"node_modules/d3-format/src/formatPrefixAuto.js","./identity.js":"node_modules/d3-format/src/identity.js"}],"node_modules/d3-format/src/defaultLocale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultLocale;
exports.formatPrefix = exports.format = void 0;
var _locale = _interopRequireDefault(require("./locale.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = (0, _locale.default)(definition);
  exports.format = format = locale.format;
  exports.formatPrefix = formatPrefix = locale.formatPrefix;
  return locale;
}
},{"./locale.js":"node_modules/d3-format/src/locale.js"}],"node_modules/d3-format/src/precisionFixed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _exponent = _interopRequireDefault(require("./exponent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(step) {
  return Math.max(0, -(0, _exponent.default)(Math.abs(step)));
}
},{"./exponent.js":"node_modules/d3-format/src/exponent.js"}],"node_modules/d3-format/src/precisionPrefix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _exponent = _interopRequireDefault(require("./exponent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor((0, _exponent.default)(value) / 3))) * 3 - (0, _exponent.default)(Math.abs(step)));
}
},{"./exponent.js":"node_modules/d3-format/src/exponent.js"}],"node_modules/d3-format/src/precisionRound.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _exponent = _interopRequireDefault(require("./exponent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, (0, _exponent.default)(max) - (0, _exponent.default)(step)) + 1;
}
},{"./exponent.js":"node_modules/d3-format/src/exponent.js"}],"node_modules/d3-format/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FormatSpecifier", {
  enumerable: true,
  get: function () {
    return _formatSpecifier.FormatSpecifier;
  }
});
Object.defineProperty(exports, "format", {
  enumerable: true,
  get: function () {
    return _defaultLocale.format;
  }
});
Object.defineProperty(exports, "formatDefaultLocale", {
  enumerable: true,
  get: function () {
    return _defaultLocale.default;
  }
});
Object.defineProperty(exports, "formatLocale", {
  enumerable: true,
  get: function () {
    return _locale.default;
  }
});
Object.defineProperty(exports, "formatPrefix", {
  enumerable: true,
  get: function () {
    return _defaultLocale.formatPrefix;
  }
});
Object.defineProperty(exports, "formatSpecifier", {
  enumerable: true,
  get: function () {
    return _formatSpecifier.default;
  }
});
Object.defineProperty(exports, "precisionFixed", {
  enumerable: true,
  get: function () {
    return _precisionFixed.default;
  }
});
Object.defineProperty(exports, "precisionPrefix", {
  enumerable: true,
  get: function () {
    return _precisionPrefix.default;
  }
});
Object.defineProperty(exports, "precisionRound", {
  enumerable: true,
  get: function () {
    return _precisionRound.default;
  }
});
var _defaultLocale = _interopRequireWildcard(require("./defaultLocale.js"));
var _locale = _interopRequireDefault(require("./locale.js"));
var _formatSpecifier = _interopRequireWildcard(require("./formatSpecifier.js"));
var _precisionFixed = _interopRequireDefault(require("./precisionFixed.js"));
var _precisionPrefix = _interopRequireDefault(require("./precisionPrefix.js"));
var _precisionRound = _interopRequireDefault(require("./precisionRound.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
},{"./defaultLocale.js":"node_modules/d3-format/src/defaultLocale.js","./locale.js":"node_modules/d3-format/src/locale.js","./formatSpecifier.js":"node_modules/d3-format/src/formatSpecifier.js","./precisionFixed.js":"node_modules/d3-format/src/precisionFixed.js","./precisionPrefix.js":"node_modules/d3-format/src/precisionPrefix.js","./precisionRound.js":"node_modules/d3-format/src/precisionRound.js"}],"node_modules/d3-scale/src/init.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initInterpolator = initInterpolator;
exports.initRange = initRange;
function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}
function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      {
        if (typeof domain === "function") this.interpolator(domain);else this.range(domain);
        break;
      }
    default:
      {
        this.domain(domain);
        if (typeof interpolator === "function") this.interpolator(interpolator);else this.range(interpolator);
        break;
      }
  }
  return this;
}
},{}],"node_modules/d3-scale/src/ordinal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ordinal;
exports.implicit = void 0;
var _init = require("./init.js");
const implicit = exports.implicit = Symbol("implicit");
function ordinal() {
  var index = new Map(),
    domain = [],
    range = [],
    unknown = implicit;
  function scale(d) {
    var key = d + "",
      i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }
  scale.domain = function (_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new Map();
    for (const value of _) {
      const key = value + "";
      if (index.has(key)) continue;
      index.set(key, domain.push(value));
    }
    return scale;
  };
  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function () {
    return ordinal(domain, range).unknown(unknown);
  };
  _init.initRange.apply(scale, arguments);
  return scale;
}
},{"./init.js":"node_modules/d3-scale/src/init.js"}],"node_modules/d3-scale/src/band.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = band;
exports.point = point;
var _d3Array = require("d3-array");
var _init = require("./init.js");
var _ordinal = _interopRequireDefault(require("./ordinal.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function band() {
  var scale = (0, _ordinal.default)().unknown(undefined),
    domain = scale.domain,
    ordinalRange = scale.range,
    r0 = 0,
    r1 = 1,
    step,
    bandwidth,
    round = false,
    paddingInner = 0,
    paddingOuter = 0,
    align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n = domain().length,
      reverse = r1 < r0,
      start = reverse ? r1 : r0,
      stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = (0, _d3Array.range)(n).map(function (i) {
      return start + step * i;
    });
    return ordinalRange(reverse ? values.reverse() : values);
  }
  scale.domain = function (_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.range = function (_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };
  scale.rangeRound = function (_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };
  scale.bandwidth = function () {
    return bandwidth;
  };
  scale.step = function () {
    return step;
  };
  scale.round = function (_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };
  scale.padding = function (_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };
  scale.paddingInner = function (_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };
  scale.paddingOuter = function (_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };
  scale.align = function (_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };
  scale.copy = function () {
    return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return _init.initRange.apply(rescale(), arguments);
}
function pointish(scale) {
  var copy = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;
  scale.copy = function () {
    return pointish(copy());
  };
  return scale;
}
function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}
},{"d3-array":"node_modules/d3-array/src/index.js","./init.js":"node_modules/d3-scale/src/init.js","./ordinal.js":"node_modules/d3-scale/src/ordinal.js"}],"node_modules/d3-scale/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constants;
function constants(x) {
  return function () {
    return x;
  };
}
},{}],"node_modules/d3-scale/src/number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = number;
function number(x) {
  return +x;
}
},{}],"node_modules/d3-scale/src/continuous.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.default = continuous;
exports.identity = identity;
exports.transformer = transformer;
var _d3Array = require("d3-array");
var _d3Interpolate = require("d3-interpolate");
var _constant = _interopRequireDefault(require("./constant.js"));
var _number = _interopRequireDefault(require("./number.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var unit = [0, 1];
function identity(x) {
  return x;
}
function normalize(a, b) {
  return (b -= a = +a) ? function (x) {
    return (x - a) / b;
  } : (0, _constant.default)(isNaN(b) ? NaN : 0.5);
}
function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function (x) {
    return Math.max(a, Math.min(b, x));
  };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0],
    d1 = domain[1],
    r0 = range[0],
    r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function (x) {
    return r0(d0(x));
  };
}
function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
    d = new Array(j),
    r = new Array(j),
    i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }
  return function (x) {
    var i = (0, _d3Array.bisect)(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit,
    range = unit,
    interpolate = _d3Interpolate.interpolate,
    transform,
    untransform,
    unknown,
    clamp = identity,
    piecewise,
    output,
    input;
  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }
  scale.invert = function (y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), _d3Interpolate.interpolateNumber)))(y)));
  };
  scale.domain = function (_) {
    return arguments.length ? (domain = Array.from(_, _number.default), rescale()) : domain.slice();
  };
  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };
  scale.rangeRound = function (_) {
    return range = Array.from(_), interpolate = _d3Interpolate.interpolateRound, rescale();
  };
  scale.clamp = function (_) {
    return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
  };
  scale.interpolate = function (_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function (t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity, identity);
}
},{"d3-array":"node_modules/d3-array/src/index.js","d3-interpolate":"node_modules/d3-interpolate/src/index.js","./constant.js":"node_modules/d3-scale/src/constant.js","./number.js":"node_modules/d3-scale/src/number.js"}],"node_modules/d3-scale/node_modules/d3-format/src/formatDecimal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.formatDecimalParts = formatDecimalParts;
function _default(x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i,
    coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}
},{}],"node_modules/d3-scale/node_modules/d3-format/src/exponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _formatDecimal = require("./formatDecimal.js");
function _default(x) {
  return x = (0, _formatDecimal.formatDecimalParts)(Math.abs(x)), x ? x[1] : NaN;
}
},{"./formatDecimal.js":"node_modules/d3-scale/node_modules/d3-format/src/formatDecimal.js"}],"node_modules/d3-scale/node_modules/d3-format/src/formatGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(grouping, thousands) {
  return function (value, width) {
    var i = value.length,
      t = [],
      j = 0,
      g = grouping[0],
      length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}
},{}],"node_modules/d3-scale/node_modules/d3-format/src/formatNumerals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(numerals) {
  return function (value) {
    return value.replace(/[0-9]/g, function (i) {
      return numerals[+i];
    });
  };
}
},{}],"node_modules/d3-scale/node_modules/d3-format/src/formatSpecifier.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormatSpecifier = FormatSpecifier;
exports.default = formatSpecifier;
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function () {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
},{}],"node_modules/d3-scale/node_modules/d3-format/src/formatTrim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function _default(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}
},{}],"node_modules/d3-scale/node_modules/d3-format/src/formatPrefixAuto.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.prefixExponent = void 0;
var _formatDecimal = require("./formatDecimal.js");
var prefixExponent;
function _default(x, p) {
  var d = (0, _formatDecimal.formatDecimalParts)(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
    exponent = d[1],
    i = exponent - (exports.prefixExponent = prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
    n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + (0, _formatDecimal.formatDecimalParts)(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}
},{"./formatDecimal.js":"node_modules/d3-scale/node_modules/d3-format/src/formatDecimal.js"}],"node_modules/d3-scale/node_modules/d3-format/src/formatRounded.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _formatDecimal = require("./formatDecimal.js");
function _default(x, p) {
  var d = (0, _formatDecimal.formatDecimalParts)(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
    exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}
},{"./formatDecimal.js":"node_modules/d3-scale/node_modules/d3-format/src/formatDecimal.js"}],"node_modules/d3-scale/node_modules/d3-format/src/formatTypes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _formatDecimal = _interopRequireDefault(require("./formatDecimal.js"));
var _formatPrefixAuto = _interopRequireDefault(require("./formatPrefixAuto.js"));
var _formatRounded = _interopRequireDefault(require("./formatRounded.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": x => Math.round(x).toString(2),
  "c": x => x + "",
  "d": _formatDecimal.default,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": x => Math.round(x).toString(8),
  "p": (x, p) => (0, _formatRounded.default)(x * 100, p),
  "r": _formatRounded.default,
  "s": _formatPrefixAuto.default,
  "X": x => Math.round(x).toString(16).toUpperCase(),
  "x": x => Math.round(x).toString(16)
};
},{"./formatDecimal.js":"node_modules/d3-scale/node_modules/d3-format/src/formatDecimal.js","./formatPrefixAuto.js":"node_modules/d3-scale/node_modules/d3-format/src/formatPrefixAuto.js","./formatRounded.js":"node_modules/d3-scale/node_modules/d3-format/src/formatRounded.js"}],"node_modules/d3-scale/node_modules/d3-format/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return x;
}
},{}],"node_modules/d3-scale/node_modules/d3-format/src/locale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _exponent = _interopRequireDefault(require("./exponent.js"));
var _formatGroup = _interopRequireDefault(require("./formatGroup.js"));
var _formatNumerals = _interopRequireDefault(require("./formatNumerals.js"));
var _formatSpecifier = _interopRequireDefault(require("./formatSpecifier.js"));
var _formatTrim = _interopRequireDefault(require("./formatTrim.js"));
var _formatTypes = _interopRequireDefault(require("./formatTypes.js"));
var _formatPrefixAuto = require("./formatPrefixAuto.js");
var _identity = _interopRequireDefault(require("./identity.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var map = Array.prototype.map,
  prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function _default(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? _identity.default : (0, _formatGroup.default)(map.call(locale.grouping, Number), locale.thousands + ""),
    currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
    currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
    decimal = locale.decimal === undefined ? "." : locale.decimal + "",
    numerals = locale.numerals === undefined ? _identity.default : (0, _formatNumerals.default)(map.call(locale.numerals, String)),
    percent = locale.percent === undefined ? "%" : locale.percent + "",
    minus = locale.minus === undefined ? "−" : locale.minus + "",
    nan = locale.nan === undefined ? "NaN" : locale.nan + "";
  function newFormat(specifier) {
    specifier = (0, _formatSpecifier.default)(specifier);
    var fill = specifier.fill,
      align = specifier.align,
      sign = specifier.sign,
      symbol = specifier.symbol,
      zero = specifier.zero,
      width = specifier.width,
      comma = specifier.comma,
      precision = specifier.precision,
      trim = specifier.trim,
      type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!_formatTypes.default[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
      suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = _formatTypes.default[type],
      maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format(value) {
      var valuePrefix = prefix,
        valueSuffix = suffix,
        i,
        n,
        c;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = (0, _formatTrim.default)(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + _formatPrefixAuto.prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
        padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format.toString = function () {
      return specifier + "";
    };
    return format;
  }
  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = (0, _formatSpecifier.default)(specifier), specifier.type = "f", specifier)),
      e = Math.max(-8, Math.min(8, Math.floor((0, _exponent.default)(value) / 3))) * 3,
      k = Math.pow(10, -e),
      prefix = prefixes[8 + e / 3];
    return function (value) {
      return f(k * value) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}
},{"./exponent.js":"node_modules/d3-scale/node_modules/d3-format/src/exponent.js","./formatGroup.js":"node_modules/d3-scale/node_modules/d3-format/src/formatGroup.js","./formatNumerals.js":"node_modules/d3-scale/node_modules/d3-format/src/formatNumerals.js","./formatSpecifier.js":"node_modules/d3-scale/node_modules/d3-format/src/formatSpecifier.js","./formatTrim.js":"node_modules/d3-scale/node_modules/d3-format/src/formatTrim.js","./formatTypes.js":"node_modules/d3-scale/node_modules/d3-format/src/formatTypes.js","./formatPrefixAuto.js":"node_modules/d3-scale/node_modules/d3-format/src/formatPrefixAuto.js","./identity.js":"node_modules/d3-scale/node_modules/d3-format/src/identity.js"}],"node_modules/d3-scale/node_modules/d3-format/src/defaultLocale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultLocale;
exports.formatPrefix = exports.format = void 0;
var _locale = _interopRequireDefault(require("./locale.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = (0, _locale.default)(definition);
  exports.format = format = locale.format;
  exports.formatPrefix = formatPrefix = locale.formatPrefix;
  return locale;
}
},{"./locale.js":"node_modules/d3-scale/node_modules/d3-format/src/locale.js"}],"node_modules/d3-scale/node_modules/d3-format/src/precisionFixed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _exponent = _interopRequireDefault(require("./exponent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(step) {
  return Math.max(0, -(0, _exponent.default)(Math.abs(step)));
}
},{"./exponent.js":"node_modules/d3-scale/node_modules/d3-format/src/exponent.js"}],"node_modules/d3-scale/node_modules/d3-format/src/precisionPrefix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _exponent = _interopRequireDefault(require("./exponent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor((0, _exponent.default)(value) / 3))) * 3 - (0, _exponent.default)(Math.abs(step)));
}
},{"./exponent.js":"node_modules/d3-scale/node_modules/d3-format/src/exponent.js"}],"node_modules/d3-scale/node_modules/d3-format/src/precisionRound.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _exponent = _interopRequireDefault(require("./exponent.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _default(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, (0, _exponent.default)(max) - (0, _exponent.default)(step)) + 1;
}
},{"./exponent.js":"node_modules/d3-scale/node_modules/d3-format/src/exponent.js"}],"node_modules/d3-scale/node_modules/d3-format/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FormatSpecifier", {
  enumerable: true,
  get: function () {
    return _formatSpecifier.FormatSpecifier;
  }
});
Object.defineProperty(exports, "format", {
  enumerable: true,
  get: function () {
    return _defaultLocale.format;
  }
});
Object.defineProperty(exports, "formatDefaultLocale", {
  enumerable: true,
  get: function () {
    return _defaultLocale.default;
  }
});
Object.defineProperty(exports, "formatLocale", {
  enumerable: true,
  get: function () {
    return _locale.default;
  }
});
Object.defineProperty(exports, "formatPrefix", {
  enumerable: true,
  get: function () {
    return _defaultLocale.formatPrefix;
  }
});
Object.defineProperty(exports, "formatSpecifier", {
  enumerable: true,
  get: function () {
    return _formatSpecifier.default;
  }
});
Object.defineProperty(exports, "precisionFixed", {
  enumerable: true,
  get: function () {
    return _precisionFixed.default;
  }
});
Object.defineProperty(exports, "precisionPrefix", {
  enumerable: true,
  get: function () {
    return _precisionPrefix.default;
  }
});
Object.defineProperty(exports, "precisionRound", {
  enumerable: true,
  get: function () {
    return _precisionRound.default;
  }
});
var _defaultLocale = _interopRequireWildcard(require("./defaultLocale.js"));
var _locale = _interopRequireDefault(require("./locale.js"));
var _formatSpecifier = _interopRequireWildcard(require("./formatSpecifier.js"));
var _precisionFixed = _interopRequireDefault(require("./precisionFixed.js"));
var _precisionPrefix = _interopRequireDefault(require("./precisionPrefix.js"));
var _precisionRound = _interopRequireDefault(require("./precisionRound.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
},{"./defaultLocale.js":"node_modules/d3-scale/node_modules/d3-format/src/defaultLocale.js","./locale.js":"node_modules/d3-scale/node_modules/d3-format/src/locale.js","./formatSpecifier.js":"node_modules/d3-scale/node_modules/d3-format/src/formatSpecifier.js","./precisionFixed.js":"node_modules/d3-scale/node_modules/d3-format/src/precisionFixed.js","./precisionPrefix.js":"node_modules/d3-scale/node_modules/d3-format/src/precisionPrefix.js","./precisionRound.js":"node_modules/d3-scale/node_modules/d3-format/src/precisionRound.js"}],"node_modules/d3-scale/src/tickFormat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tickFormat;
var _d3Array = require("d3-array");
var _d3Format = require("d3-format");
function tickFormat(start, stop, count, specifier) {
  var step = (0, _d3Array.tickStep)(start, stop, count),
    precision;
  specifier = (0, _d3Format.formatSpecifier)(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s":
      {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = (0, _d3Format.precisionPrefix)(step, value))) specifier.precision = precision;
        return (0, _d3Format.formatPrefix)(specifier, value);
      }
    case "":
    case "e":
    case "g":
    case "p":
    case "r":
      {
        if (specifier.precision == null && !isNaN(precision = (0, _d3Format.precisionRound)(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }
    case "f":
    case "%":
      {
        if (specifier.precision == null && !isNaN(precision = (0, _d3Format.precisionFixed)(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
  }
  return (0, _d3Format.format)(specifier);
}
},{"d3-array":"node_modules/d3-array/src/index.js","d3-format":"node_modules/d3-scale/node_modules/d3-format/src/index.js"}],"node_modules/d3-scale/src/linear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = linear;
exports.linearish = linearish;
var _d3Array = require("d3-array");
var _continuous = _interopRequireWildcard(require("./continuous.js"));
var _init = require("./init.js");
var _tickFormat = _interopRequireDefault(require("./tickFormat.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function (count) {
    var d = domain();
    return (0, _d3Array.ticks)(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = function (count, specifier) {
    var d = domain();
    return (0, _tickFormat.default)(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = function (count) {
    if (count == null) count = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = (0, _d3Array.tickIncrement)(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear() {
  var scale = (0, _continuous.default)();
  scale.copy = function () {
    return (0, _continuous.copy)(scale, linear());
  };
  _init.initRange.apply(scale, arguments);
  return linearish(scale);
}
},{"d3-array":"node_modules/d3-array/src/index.js","./continuous.js":"node_modules/d3-scale/src/continuous.js","./init.js":"node_modules/d3-scale/src/init.js","./tickFormat.js":"node_modules/d3-scale/src/tickFormat.js"}],"node_modules/d3-scale/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = identity;
var _linear = require("./linear.js");
var _number = _interopRequireDefault(require("./number.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function identity(domain) {
  var unknown;
  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : x;
  }
  scale.invert = scale;
  scale.domain = scale.range = function (_) {
    return arguments.length ? (domain = Array.from(_, _number.default), scale) : domain.slice();
  };
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function () {
    return identity(domain).unknown(unknown);
  };
  domain = arguments.length ? Array.from(domain, _number.default) : [0, 1];
  return (0, _linear.linearish)(scale);
}
},{"./linear.js":"node_modules/d3-scale/src/linear.js","./number.js":"node_modules/d3-scale/src/number.js"}],"node_modules/d3-scale/src/nice.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nice;
function nice(domain, interval) {
  domain = domain.slice();
  var i0 = 0,
    i1 = domain.length - 1,
    x0 = domain[i0],
    x1 = domain[i1],
    t;
  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }
  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}
},{}],"node_modules/d3-scale/src/log.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = log;
exports.loggish = loggish;
var _d3Array = require("d3-array");
var _d3Format = require("d3-format");
var _nice = _interopRequireDefault(require("./nice.js"));
var _continuous = require("./continuous.js");
var _init = require("./init.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function transformLog(x) {
  return Math.log(x);
}
function transformExp(x) {
  return Math.exp(x);
}
function transformLogn(x) {
  return -Math.log(-x);
}
function transformExpn(x) {
  return -Math.exp(-x);
}
function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : function (x) {
    return Math.pow(base, x);
  };
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function (x) {
    return Math.log(x) / base;
  });
}
function reflect(f) {
  return function (x) {
    return -f(-x);
  };
}
function loggish(transform) {
  var scale = transform(transformLog, transformExp),
    domain = scale.domain,
    base = 10,
    logs,
    pows;
  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }
  scale.base = function (_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };
  scale.domain = function (_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.ticks = function (count) {
    var d = domain(),
      u = d[0],
      v = d[d.length - 1],
      r;
    if (r = v < u) i = u, u = v, v = i;
    var i = logs(u),
      j = logs(v),
      p,
      k,
      t,
      n = count == null ? 10 : +count,
      z = [];
    if (!(base % 1) && j - i < n) {
      i = Math.floor(i), j = Math.ceil(j);
      if (u > 0) for (; i <= j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i <= j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      if (z.length * 2 < n) z = (0, _d3Array.ticks)(u, v, n);
    } else {
      z = (0, _d3Array.ticks)(i, j, Math.min(j - i, n)).map(pows);
    }
    return r ? z.reverse() : z;
  };
  scale.tickFormat = function (count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = (0, _d3Format.format)(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function (d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };
  scale.nice = function () {
    return domain((0, _nice.default)(domain(), {
      floor: function (x) {
        return pows(Math.floor(logs(x)));
      },
      ceil: function (x) {
        return pows(Math.ceil(logs(x)));
      }
    }));
  };
  return scale;
}
function log() {
  var scale = loggish((0, _continuous.transformer)()).domain([1, 10]);
  scale.copy = function () {
    return (0, _continuous.copy)(scale, log()).base(scale.base());
  };
  _init.initRange.apply(scale, arguments);
  return scale;
}
},{"d3-array":"node_modules/d3-array/src/index.js","d3-format":"node_modules/d3-scale/node_modules/d3-format/src/index.js","./nice.js":"node_modules/d3-scale/src/nice.js","./continuous.js":"node_modules/d3-scale/src/continuous.js","./init.js":"node_modules/d3-scale/src/init.js"}],"node_modules/d3-scale/src/symlog.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symlog;
exports.symlogish = symlogish;
var _linear = require("./linear.js");
var _continuous = require("./continuous.js");
var _init = require("./init.js");
function transformSymlog(c) {
  return function (x) {
    return Math.sign(x) * Math.log1p(Math.abs(x / c));
  };
}
function transformSymexp(c) {
  return function (x) {
    return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
  };
}
function symlogish(transform) {
  var c = 1,
    scale = transform(transformSymlog(c), transformSymexp(c));
  scale.constant = function (_) {
    return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
  };
  return (0, _linear.linearish)(scale);
}
function symlog() {
  var scale = symlogish((0, _continuous.transformer)());
  scale.copy = function () {
    return (0, _continuous.copy)(scale, symlog()).constant(scale.constant());
  };
  return _init.initRange.apply(scale, arguments);
}
},{"./linear.js":"node_modules/d3-scale/src/linear.js","./continuous.js":"node_modules/d3-scale/src/continuous.js","./init.js":"node_modules/d3-scale/src/init.js"}],"node_modules/d3-scale/src/pow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pow;
exports.powish = powish;
exports.sqrt = sqrt;
var _linear = require("./linear.js");
var _continuous = require("./continuous.js");
var _init = require("./init.js");
function transformPow(exponent) {
  return function (x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}
function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}
function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}
function powish(transform) {
  var scale = transform(_continuous.identity, _continuous.identity),
    exponent = 1;
  function rescale() {
    return exponent === 1 ? transform(_continuous.identity, _continuous.identity) : exponent === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
  }
  scale.exponent = function (_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };
  return (0, _linear.linearish)(scale);
}
function pow() {
  var scale = powish((0, _continuous.transformer)());
  scale.copy = function () {
    return (0, _continuous.copy)(scale, pow()).exponent(scale.exponent());
  };
  _init.initRange.apply(scale, arguments);
  return scale;
}
function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}
},{"./linear.js":"node_modules/d3-scale/src/linear.js","./continuous.js":"node_modules/d3-scale/src/continuous.js","./init.js":"node_modules/d3-scale/src/init.js"}],"node_modules/d3-scale/src/radial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = radial;
var _continuous = _interopRequireDefault(require("./continuous.js"));
var _init = require("./init.js");
var _linear = require("./linear.js");
var _number = _interopRequireDefault(require("./number.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function square(x) {
  return Math.sign(x) * x * x;
}
function unsquare(x) {
  return Math.sign(x) * Math.sqrt(Math.abs(x));
}
function radial() {
  var squared = (0, _continuous.default)(),
    range = [0, 1],
    round = false,
    unknown;
  function scale(x) {
    var y = unsquare(squared(x));
    return isNaN(y) ? unknown : round ? Math.round(y) : y;
  }
  scale.invert = function (y) {
    return squared.invert(square(y));
  };
  scale.domain = function (_) {
    return arguments.length ? (squared.domain(_), scale) : squared.domain();
  };
  scale.range = function (_) {
    return arguments.length ? (squared.range((range = Array.from(_, _number.default)).map(square)), scale) : range.slice();
  };
  scale.rangeRound = function (_) {
    return scale.range(_).round(true);
  };
  scale.round = function (_) {
    return arguments.length ? (round = !!_, scale) : round;
  };
  scale.clamp = function (_) {
    return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
  };
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function () {
    return radial(squared.domain(), range).round(round).clamp(squared.clamp()).unknown(unknown);
  };
  _init.initRange.apply(scale, arguments);
  return (0, _linear.linearish)(scale);
}
},{"./continuous.js":"node_modules/d3-scale/src/continuous.js","./init.js":"node_modules/d3-scale/src/init.js","./linear.js":"node_modules/d3-scale/src/linear.js","./number.js":"node_modules/d3-scale/src/number.js"}],"node_modules/d3-scale/src/quantile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quantile;
var _d3Array = require("d3-array");
var _init = require("./init.js");
function quantile() {
  var domain = [],
    range = [],
    thresholds = [],
    unknown;
  function rescale() {
    var i = 0,
      n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = (0, _d3Array.quantileSorted)(domain, i / n);
    return scale;
  }
  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : range[(0, _d3Array.bisect)(thresholds, x)];
  }
  scale.invertExtent = function (y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [i > 0 ? thresholds[i - 1] : domain[0], i < thresholds.length ? thresholds[i] : domain[domain.length - 1]];
  };
  scale.domain = function (_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(_d3Array.ascending);
    return rescale();
  };
  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.quantiles = function () {
    return thresholds.slice();
  };
  scale.copy = function () {
    return quantile().domain(domain).range(range).unknown(unknown);
  };
  return _init.initRange.apply(scale, arguments);
}
},{"d3-array":"node_modules/d3-array/src/index.js","./init.js":"node_modules/d3-scale/src/init.js"}],"node_modules/d3-scale/src/quantize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quantize;
var _d3Array = require("d3-array");
var _linear = require("./linear.js");
var _init = require("./init.js");
function quantize() {
  var x0 = 0,
    x1 = 1,
    n = 1,
    domain = [0.5],
    range = [0, 1],
    unknown;
  function scale(x) {
    return x != null && x <= x ? range[(0, _d3Array.bisect)(domain, x, 0, n)] : unknown;
  }
  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }
  scale.domain = function (_) {
    return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
  };
  scale.range = function (_) {
    return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
  };
  scale.invertExtent = function (y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
  };
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };
  scale.thresholds = function () {
    return domain.slice();
  };
  scale.copy = function () {
    return quantize().domain([x0, x1]).range(range).unknown(unknown);
  };
  return _init.initRange.apply((0, _linear.linearish)(scale), arguments);
}
},{"d3-array":"node_modules/d3-array/src/index.js","./linear.js":"node_modules/d3-scale/src/linear.js","./init.js":"node_modules/d3-scale/src/init.js"}],"node_modules/d3-scale/src/threshold.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = threshold;
var _d3Array = require("d3-array");
var _init = require("./init.js");
function threshold() {
  var domain = [0.5],
    range = [0, 1],
    unknown,
    n = 1;
  function scale(x) {
    return x != null && x <= x ? range[(0, _d3Array.bisect)(domain, x, 0, n)] : unknown;
  }
  scale.domain = function (_) {
    return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };
  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };
  scale.invertExtent = function (y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function () {
    return threshold().domain(domain).range(range).unknown(unknown);
  };
  return _init.initRange.apply(scale, arguments);
}
},{"d3-array":"node_modules/d3-array/src/index.js","./init.js":"node_modules/d3-scale/src/init.js"}],"node_modules/d3-time/src/interval.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = newInterval;
var t0 = new Date(),
  t1 = new Date();
function newInterval(floori, offseti, count, field) {
  function interval(date) {
    return floori(date = arguments.length === 0 ? new Date() : new Date(+date)), date;
  }
  interval.floor = function (date) {
    return floori(date = new Date(+date)), date;
  };
  interval.ceil = function (date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval.round = function (date) {
    var d0 = interval(date),
      d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval.offset = function (date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };
  interval.range = function (start, stop, step) {
    var range = [],
      previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start); while (previous < start && start < stop);
    return range;
  };
  interval.filter = function (test) {
    return newInterval(function (date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function (date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };
  if (count) {
    interval.count = function (start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };
    interval.every = function (step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function (d) {
        return field(d) % step === 0;
      } : function (d) {
        return interval.count(0, d) % step === 0;
      });
    };
  }
  return interval;
}
},{}],"node_modules/d3-time/src/millisecond.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.milliseconds = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var millisecond = (0, _interval.default)(function () {
  // noop
}, function (date, step) {
  date.setTime(+date + step);
}, function (start, end) {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = function (k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return (0, _interval.default)(function (date) {
    date.setTime(Math.floor(date / k) * k);
  }, function (date, step) {
    date.setTime(+date + step * k);
  }, function (start, end) {
    return (end - start) / k;
  });
};
var _default = exports.default = millisecond;
var milliseconds = exports.milliseconds = millisecond.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js"}],"node_modules/d3-time/src/duration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.durationYear = exports.durationWeek = exports.durationSecond = exports.durationMonth = exports.durationMinute = exports.durationHour = exports.durationDay = void 0;
const durationSecond = exports.durationSecond = 1000;
const durationMinute = exports.durationMinute = durationSecond * 60;
const durationHour = exports.durationHour = durationMinute * 60;
const durationDay = exports.durationDay = durationHour * 24;
const durationWeek = exports.durationWeek = durationDay * 7;
const durationMonth = exports.durationMonth = durationDay * 30;
const durationYear = exports.durationYear = durationDay * 365;
},{}],"node_modules/d3-time/src/second.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seconds = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
var _duration = require("./duration.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var second = (0, _interval.default)(function (date) {
  date.setTime(date - date.getMilliseconds());
}, function (date, step) {
  date.setTime(+date + step * _duration.durationSecond);
}, function (start, end) {
  return (end - start) / _duration.durationSecond;
}, function (date) {
  return date.getUTCSeconds();
});
var _default = exports.default = second;
var seconds = exports.seconds = second.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js","./duration.js":"node_modules/d3-time/src/duration.js"}],"node_modules/d3-time/src/minute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minutes = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
var _duration = require("./duration.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var minute = (0, _interval.default)(function (date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * _duration.durationSecond);
}, function (date, step) {
  date.setTime(+date + step * _duration.durationMinute);
}, function (start, end) {
  return (end - start) / _duration.durationMinute;
}, function (date) {
  return date.getMinutes();
});
var _default = exports.default = minute;
var minutes = exports.minutes = minute.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js","./duration.js":"node_modules/d3-time/src/duration.js"}],"node_modules/d3-time/src/hour.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hours = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
var _duration = require("./duration.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var hour = (0, _interval.default)(function (date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * _duration.durationSecond - date.getMinutes() * _duration.durationMinute);
}, function (date, step) {
  date.setTime(+date + step * _duration.durationHour);
}, function (start, end) {
  return (end - start) / _duration.durationHour;
}, function (date) {
  return date.getHours();
});
var _default = exports.default = hour;
var hours = exports.hours = hour.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js","./duration.js":"node_modules/d3-time/src/duration.js"}],"node_modules/d3-time/src/day.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.days = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
var _duration = require("./duration.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var day = (0, _interval.default)(date => date.setHours(0, 0, 0, 0), (date, step) => date.setDate(date.getDate() + step), (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * _duration.durationMinute) / _duration.durationDay, date => date.getDate() - 1);
var _default = exports.default = day;
var days = exports.days = day.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js","./duration.js":"node_modules/d3-time/src/duration.js"}],"node_modules/d3-time/src/week.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wednesdays = exports.wednesday = exports.tuesdays = exports.tuesday = exports.thursdays = exports.thursday = exports.sundays = exports.sunday = exports.saturdays = exports.saturday = exports.mondays = exports.monday = exports.fridays = exports.friday = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
var _duration = require("./duration.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function weekday(i) {
  return (0, _interval.default)(function (date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function (start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * _duration.durationMinute) / _duration.durationWeek;
  });
}
var sunday = exports.sunday = weekday(0);
var monday = exports.monday = weekday(1);
var tuesday = exports.tuesday = weekday(2);
var wednesday = exports.wednesday = weekday(3);
var thursday = exports.thursday = weekday(4);
var friday = exports.friday = weekday(5);
var saturday = exports.saturday = weekday(6);
var sundays = exports.sundays = sunday.range;
var mondays = exports.mondays = monday.range;
var tuesdays = exports.tuesdays = tuesday.range;
var wednesdays = exports.wednesdays = wednesday.range;
var thursdays = exports.thursdays = thursday.range;
var fridays = exports.fridays = friday.range;
var saturdays = exports.saturdays = saturday.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js","./duration.js":"node_modules/d3-time/src/duration.js"}],"node_modules/d3-time/src/month.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.months = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var month = (0, _interval.default)(function (date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function (date, step) {
  date.setMonth(date.getMonth() + step);
}, function (start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function (date) {
  return date.getMonth();
});
var _default = exports.default = month;
var months = exports.months = month.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js"}],"node_modules/d3-time/src/year.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.years = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var year = (0, _interval.default)(function (date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function (date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function (start, end) {
  return end.getFullYear() - start.getFullYear();
}, function (date) {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
year.every = function (k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : (0, _interval.default)(function (date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};
var _default = exports.default = year;
var years = exports.years = year.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js"}],"node_modules/d3-time/src/utcMinute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcMinutes = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
var _duration = require("./duration.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var utcMinute = (0, _interval.default)(function (date) {
  date.setUTCSeconds(0, 0);
}, function (date, step) {
  date.setTime(+date + step * _duration.durationMinute);
}, function (start, end) {
  return (end - start) / _duration.durationMinute;
}, function (date) {
  return date.getUTCMinutes();
});
var _default = exports.default = utcMinute;
var utcMinutes = exports.utcMinutes = utcMinute.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js","./duration.js":"node_modules/d3-time/src/duration.js"}],"node_modules/d3-time/src/utcHour.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcHours = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
var _duration = require("./duration.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var utcHour = (0, _interval.default)(function (date) {
  date.setUTCMinutes(0, 0, 0);
}, function (date, step) {
  date.setTime(+date + step * _duration.durationHour);
}, function (start, end) {
  return (end - start) / _duration.durationHour;
}, function (date) {
  return date.getUTCHours();
});
var _default = exports.default = utcHour;
var utcHours = exports.utcHours = utcHour.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js","./duration.js":"node_modules/d3-time/src/duration.js"}],"node_modules/d3-time/src/utcDay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcDays = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
var _duration = require("./duration.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var utcDay = (0, _interval.default)(function (date) {
  date.setUTCHours(0, 0, 0, 0);
}, function (date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function (start, end) {
  return (end - start) / _duration.durationDay;
}, function (date) {
  return date.getUTCDate() - 1;
});
var _default = exports.default = utcDay;
var utcDays = exports.utcDays = utcDay.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js","./duration.js":"node_modules/d3-time/src/duration.js"}],"node_modules/d3-time/src/utcWeek.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcWednesdays = exports.utcWednesday = exports.utcTuesdays = exports.utcTuesday = exports.utcThursdays = exports.utcThursday = exports.utcSundays = exports.utcSunday = exports.utcSaturdays = exports.utcSaturday = exports.utcMondays = exports.utcMonday = exports.utcFridays = exports.utcFriday = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
var _duration = require("./duration.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function utcWeekday(i) {
  return (0, _interval.default)(function (date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function (start, end) {
    return (end - start) / _duration.durationWeek;
  });
}
var utcSunday = exports.utcSunday = utcWeekday(0);
var utcMonday = exports.utcMonday = utcWeekday(1);
var utcTuesday = exports.utcTuesday = utcWeekday(2);
var utcWednesday = exports.utcWednesday = utcWeekday(3);
var utcThursday = exports.utcThursday = utcWeekday(4);
var utcFriday = exports.utcFriday = utcWeekday(5);
var utcSaturday = exports.utcSaturday = utcWeekday(6);
var utcSundays = exports.utcSundays = utcSunday.range;
var utcMondays = exports.utcMondays = utcMonday.range;
var utcTuesdays = exports.utcTuesdays = utcTuesday.range;
var utcWednesdays = exports.utcWednesdays = utcWednesday.range;
var utcThursdays = exports.utcThursdays = utcThursday.range;
var utcFridays = exports.utcFridays = utcFriday.range;
var utcSaturdays = exports.utcSaturdays = utcSaturday.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js","./duration.js":"node_modules/d3-time/src/duration.js"}],"node_modules/d3-time/src/utcMonth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcMonths = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var utcMonth = (0, _interval.default)(function (date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function (date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function (start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function (date) {
  return date.getUTCMonth();
});
var _default = exports.default = utcMonth;
var utcMonths = exports.utcMonths = utcMonth.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js"}],"node_modules/d3-time/src/utcYear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcYears = exports.default = void 0;
var _interval = _interopRequireDefault(require("./interval.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var utcYear = (0, _interval.default)(function (date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function (date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function (start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function (date) {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = function (k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : (0, _interval.default)(function (date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};
var _default = exports.default = utcYear;
var utcYears = exports.utcYears = utcYear.range;
},{"./interval.js":"node_modules/d3-time/src/interval.js"}],"node_modules/d3-time/src/ticks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcTicks = exports.utcTickInterval = exports.timeTicks = exports.timeTickInterval = void 0;
var _d3Array = require("d3-array");
var _duration = require("./duration.js");
var _millisecond = _interopRequireDefault(require("./millisecond.js"));
var _second = _interopRequireDefault(require("./second.js"));
var _minute = _interopRequireDefault(require("./minute.js"));
var _hour = _interopRequireDefault(require("./hour.js"));
var _day = _interopRequireDefault(require("./day.js"));
var _week = require("./week.js");
var _month = _interopRequireDefault(require("./month.js"));
var _year = _interopRequireDefault(require("./year.js"));
var _utcMinute = _interopRequireDefault(require("./utcMinute.js"));
var _utcHour = _interopRequireDefault(require("./utcHour.js"));
var _utcDay = _interopRequireDefault(require("./utcDay.js"));
var _utcWeek = require("./utcWeek.js");
var _utcMonth = _interopRequireDefault(require("./utcMonth.js"));
var _utcYear = _interopRequireDefault(require("./utcYear.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ticker(year, month, week, day, hour, minute) {
  const tickIntervals = [[_second.default, 1, _duration.durationSecond], [_second.default, 5, 5 * _duration.durationSecond], [_second.default, 15, 15 * _duration.durationSecond], [_second.default, 30, 30 * _duration.durationSecond], [minute, 1, _duration.durationMinute], [minute, 5, 5 * _duration.durationMinute], [minute, 15, 15 * _duration.durationMinute], [minute, 30, 30 * _duration.durationMinute], [hour, 1, _duration.durationHour], [hour, 3, 3 * _duration.durationHour], [hour, 6, 6 * _duration.durationHour], [hour, 12, 12 * _duration.durationHour], [day, 1, _duration.durationDay], [day, 2, 2 * _duration.durationDay], [week, 1, _duration.durationWeek], [month, 1, _duration.durationMonth], [month, 3, 3 * _duration.durationMonth], [year, 1, _duration.durationYear]];
  function ticks(start, stop, count) {
    const reverse = stop < start;
    if (reverse) [start, stop] = [stop, start];
    const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
    const ticks = interval ? interval.range(start, +stop + 1) : []; // inclusive stop
    return reverse ? ticks.reverse() : ticks;
  }
  function tickInterval(start, stop, count) {
    const target = Math.abs(stop - start) / count;
    const i = (0, _d3Array.bisector)(([,, step]) => step).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every((0, _d3Array.tickStep)(start / _duration.durationYear, stop / _duration.durationYear, count));
    if (i === 0) return _millisecond.default.every(Math.max((0, _d3Array.tickStep)(start, stop, count), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }
  return [ticks, tickInterval];
}
const [utcTicks, utcTickInterval] = ticker(_utcYear.default, _utcMonth.default, _utcWeek.utcSunday, _utcDay.default, _utcHour.default, _utcMinute.default);
exports.utcTickInterval = utcTickInterval;
exports.utcTicks = utcTicks;
const [timeTicks, timeTickInterval] = ticker(_year.default, _month.default, _week.sunday, _day.default, _hour.default, _minute.default);
exports.timeTickInterval = timeTickInterval;
exports.timeTicks = timeTicks;
},{"d3-array":"node_modules/d3-array/src/index.js","./duration.js":"node_modules/d3-time/src/duration.js","./millisecond.js":"node_modules/d3-time/src/millisecond.js","./second.js":"node_modules/d3-time/src/second.js","./minute.js":"node_modules/d3-time/src/minute.js","./hour.js":"node_modules/d3-time/src/hour.js","./day.js":"node_modules/d3-time/src/day.js","./week.js":"node_modules/d3-time/src/week.js","./month.js":"node_modules/d3-time/src/month.js","./year.js":"node_modules/d3-time/src/year.js","./utcMinute.js":"node_modules/d3-time/src/utcMinute.js","./utcHour.js":"node_modules/d3-time/src/utcHour.js","./utcDay.js":"node_modules/d3-time/src/utcDay.js","./utcWeek.js":"node_modules/d3-time/src/utcWeek.js","./utcMonth.js":"node_modules/d3-time/src/utcMonth.js","./utcYear.js":"node_modules/d3-time/src/utcYear.js"}],"node_modules/d3-time/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "timeDay", {
  enumerable: true,
  get: function () {
    return _day.default;
  }
});
Object.defineProperty(exports, "timeDays", {
  enumerable: true,
  get: function () {
    return _day.days;
  }
});
Object.defineProperty(exports, "timeFriday", {
  enumerable: true,
  get: function () {
    return _week.friday;
  }
});
Object.defineProperty(exports, "timeFridays", {
  enumerable: true,
  get: function () {
    return _week.fridays;
  }
});
Object.defineProperty(exports, "timeHour", {
  enumerable: true,
  get: function () {
    return _hour.default;
  }
});
Object.defineProperty(exports, "timeHours", {
  enumerable: true,
  get: function () {
    return _hour.hours;
  }
});
Object.defineProperty(exports, "timeInterval", {
  enumerable: true,
  get: function () {
    return _interval.default;
  }
});
Object.defineProperty(exports, "timeMillisecond", {
  enumerable: true,
  get: function () {
    return _millisecond.default;
  }
});
Object.defineProperty(exports, "timeMilliseconds", {
  enumerable: true,
  get: function () {
    return _millisecond.milliseconds;
  }
});
Object.defineProperty(exports, "timeMinute", {
  enumerable: true,
  get: function () {
    return _minute.default;
  }
});
Object.defineProperty(exports, "timeMinutes", {
  enumerable: true,
  get: function () {
    return _minute.minutes;
  }
});
Object.defineProperty(exports, "timeMonday", {
  enumerable: true,
  get: function () {
    return _week.monday;
  }
});
Object.defineProperty(exports, "timeMondays", {
  enumerable: true,
  get: function () {
    return _week.mondays;
  }
});
Object.defineProperty(exports, "timeMonth", {
  enumerable: true,
  get: function () {
    return _month.default;
  }
});
Object.defineProperty(exports, "timeMonths", {
  enumerable: true,
  get: function () {
    return _month.months;
  }
});
Object.defineProperty(exports, "timeSaturday", {
  enumerable: true,
  get: function () {
    return _week.saturday;
  }
});
Object.defineProperty(exports, "timeSaturdays", {
  enumerable: true,
  get: function () {
    return _week.saturdays;
  }
});
Object.defineProperty(exports, "timeSecond", {
  enumerable: true,
  get: function () {
    return _second.default;
  }
});
Object.defineProperty(exports, "timeSeconds", {
  enumerable: true,
  get: function () {
    return _second.seconds;
  }
});
Object.defineProperty(exports, "timeSunday", {
  enumerable: true,
  get: function () {
    return _week.sunday;
  }
});
Object.defineProperty(exports, "timeSundays", {
  enumerable: true,
  get: function () {
    return _week.sundays;
  }
});
Object.defineProperty(exports, "timeThursday", {
  enumerable: true,
  get: function () {
    return _week.thursday;
  }
});
Object.defineProperty(exports, "timeThursdays", {
  enumerable: true,
  get: function () {
    return _week.thursdays;
  }
});
Object.defineProperty(exports, "timeTickInterval", {
  enumerable: true,
  get: function () {
    return _ticks.timeTickInterval;
  }
});
Object.defineProperty(exports, "timeTicks", {
  enumerable: true,
  get: function () {
    return _ticks.timeTicks;
  }
});
Object.defineProperty(exports, "timeTuesday", {
  enumerable: true,
  get: function () {
    return _week.tuesday;
  }
});
Object.defineProperty(exports, "timeTuesdays", {
  enumerable: true,
  get: function () {
    return _week.tuesdays;
  }
});
Object.defineProperty(exports, "timeWednesday", {
  enumerable: true,
  get: function () {
    return _week.wednesday;
  }
});
Object.defineProperty(exports, "timeWednesdays", {
  enumerable: true,
  get: function () {
    return _week.wednesdays;
  }
});
Object.defineProperty(exports, "timeWeek", {
  enumerable: true,
  get: function () {
    return _week.sunday;
  }
});
Object.defineProperty(exports, "timeWeeks", {
  enumerable: true,
  get: function () {
    return _week.sundays;
  }
});
Object.defineProperty(exports, "timeYear", {
  enumerable: true,
  get: function () {
    return _year.default;
  }
});
Object.defineProperty(exports, "timeYears", {
  enumerable: true,
  get: function () {
    return _year.years;
  }
});
Object.defineProperty(exports, "utcDay", {
  enumerable: true,
  get: function () {
    return _utcDay.default;
  }
});
Object.defineProperty(exports, "utcDays", {
  enumerable: true,
  get: function () {
    return _utcDay.utcDays;
  }
});
Object.defineProperty(exports, "utcFriday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcFriday;
  }
});
Object.defineProperty(exports, "utcFridays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcFridays;
  }
});
Object.defineProperty(exports, "utcHour", {
  enumerable: true,
  get: function () {
    return _utcHour.default;
  }
});
Object.defineProperty(exports, "utcHours", {
  enumerable: true,
  get: function () {
    return _utcHour.utcHours;
  }
});
Object.defineProperty(exports, "utcMillisecond", {
  enumerable: true,
  get: function () {
    return _millisecond.default;
  }
});
Object.defineProperty(exports, "utcMilliseconds", {
  enumerable: true,
  get: function () {
    return _millisecond.milliseconds;
  }
});
Object.defineProperty(exports, "utcMinute", {
  enumerable: true,
  get: function () {
    return _utcMinute.default;
  }
});
Object.defineProperty(exports, "utcMinutes", {
  enumerable: true,
  get: function () {
    return _utcMinute.utcMinutes;
  }
});
Object.defineProperty(exports, "utcMonday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcMonday;
  }
});
Object.defineProperty(exports, "utcMondays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcMondays;
  }
});
Object.defineProperty(exports, "utcMonth", {
  enumerable: true,
  get: function () {
    return _utcMonth.default;
  }
});
Object.defineProperty(exports, "utcMonths", {
  enumerable: true,
  get: function () {
    return _utcMonth.utcMonths;
  }
});
Object.defineProperty(exports, "utcSaturday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSaturday;
  }
});
Object.defineProperty(exports, "utcSaturdays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSaturdays;
  }
});
Object.defineProperty(exports, "utcSecond", {
  enumerable: true,
  get: function () {
    return _second.default;
  }
});
Object.defineProperty(exports, "utcSeconds", {
  enumerable: true,
  get: function () {
    return _second.seconds;
  }
});
Object.defineProperty(exports, "utcSunday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSunday;
  }
});
Object.defineProperty(exports, "utcSundays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSundays;
  }
});
Object.defineProperty(exports, "utcThursday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcThursday;
  }
});
Object.defineProperty(exports, "utcThursdays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcThursdays;
  }
});
Object.defineProperty(exports, "utcTickInterval", {
  enumerable: true,
  get: function () {
    return _ticks.utcTickInterval;
  }
});
Object.defineProperty(exports, "utcTicks", {
  enumerable: true,
  get: function () {
    return _ticks.utcTicks;
  }
});
Object.defineProperty(exports, "utcTuesday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcTuesday;
  }
});
Object.defineProperty(exports, "utcTuesdays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcTuesdays;
  }
});
Object.defineProperty(exports, "utcWednesday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcWednesday;
  }
});
Object.defineProperty(exports, "utcWednesdays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcWednesdays;
  }
});
Object.defineProperty(exports, "utcWeek", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSunday;
  }
});
Object.defineProperty(exports, "utcWeeks", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSundays;
  }
});
Object.defineProperty(exports, "utcYear", {
  enumerable: true,
  get: function () {
    return _utcYear.default;
  }
});
Object.defineProperty(exports, "utcYears", {
  enumerable: true,
  get: function () {
    return _utcYear.utcYears;
  }
});
var _interval = _interopRequireDefault(require("./interval.js"));
var _millisecond = _interopRequireWildcard(require("./millisecond.js"));
var _second = _interopRequireWildcard(require("./second.js"));
var _minute = _interopRequireWildcard(require("./minute.js"));
var _hour = _interopRequireWildcard(require("./hour.js"));
var _day = _interopRequireWildcard(require("./day.js"));
var _week = require("./week.js");
var _month = _interopRequireWildcard(require("./month.js"));
var _year = _interopRequireWildcard(require("./year.js"));
var _utcMinute = _interopRequireWildcard(require("./utcMinute.js"));
var _utcHour = _interopRequireWildcard(require("./utcHour.js"));
var _utcDay = _interopRequireWildcard(require("./utcDay.js"));
var _utcWeek = require("./utcWeek.js");
var _utcMonth = _interopRequireWildcard(require("./utcMonth.js"));
var _utcYear = _interopRequireWildcard(require("./utcYear.js"));
var _ticks = require("./ticks.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
},{"./interval.js":"node_modules/d3-time/src/interval.js","./millisecond.js":"node_modules/d3-time/src/millisecond.js","./second.js":"node_modules/d3-time/src/second.js","./minute.js":"node_modules/d3-time/src/minute.js","./hour.js":"node_modules/d3-time/src/hour.js","./day.js":"node_modules/d3-time/src/day.js","./week.js":"node_modules/d3-time/src/week.js","./month.js":"node_modules/d3-time/src/month.js","./year.js":"node_modules/d3-time/src/year.js","./utcMinute.js":"node_modules/d3-time/src/utcMinute.js","./utcHour.js":"node_modules/d3-time/src/utcHour.js","./utcDay.js":"node_modules/d3-time/src/utcDay.js","./utcWeek.js":"node_modules/d3-time/src/utcWeek.js","./utcMonth.js":"node_modules/d3-time/src/utcMonth.js","./utcYear.js":"node_modules/d3-time/src/utcYear.js","./ticks.js":"node_modules/d3-time/src/ticks.js"}],"node_modules/d3-time-format/src/locale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatLocale;
var _d3Time = require("d3-time");
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y, m, d) {
  return {
    y: y,
    m: m,
    d: d,
    H: 0,
    M: 0,
    S: 0,
    L: 0
  };
}
function formatLocale(locale) {
  var locale_dateTime = locale.dateTime,
    locale_date = locale.date,
    locale_time = locale.time,
    locale_periods = locale.periods,
    locale_weekdays = locale.days,
    locale_shortWeekdays = locale.shortDays,
    locale_months = locale.months,
    locale_shortMonths = locale.shortMonths;
  var periodRe = formatRe(locale_periods),
    periodLookup = formatLookup(locale_periods),
    weekdayRe = formatRe(locale_weekdays),
    weekdayLookup = formatLookup(locale_weekdays),
    shortWeekdayRe = formatRe(locale_shortWeekdays),
    shortWeekdayLookup = formatLookup(locale_shortWeekdays),
    monthRe = formatRe(locale_months),
    monthLookup = formatLookup(locale_months),
    shortMonthRe = formatRe(locale_shortMonths),
    shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats) {
    return function (date) {
      var string = [],
        i = -1,
        j = 0,
        n = specifier.length,
        c,
        pad,
        format;
      if (!(date instanceof Date)) date = new Date(+date);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function (string) {
      var d = newDate(1900, undefined, 1),
        i = parseSpecifier(d, specifier, string += "", 0),
        week,
        day;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

      // If this is utcParse, never use the local timezone.
      if (Z && !("Z" in d)) d.Z = 0;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If the month was not specified, inherit from the quarter.
      if (d.m === undefined) d.m = "q" in d ? d.q : 0;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? _d3Time.utcMonday.ceil(week) : (0, _d3Time.utcMonday)(week);
          week = _d3Time.utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? _d3Time.timeMonday.ceil(week) : (0, _d3Time.timeMonday)(week);
          week = _d3Time.timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
      n = specifier.length,
      m = string.length,
      c,
      parse;
    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || (j = parse(d, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function (specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function () {
        return specifier;
      };
      return f;
    },
    parse: function (specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function () {
        return specifier;
      };
      return p;
    },
    utcFormat: function (specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function () {
        return specifier;
      };
      return f;
    },
    utcParse: function (specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function () {
        return specifier;
      };
      return p;
    }
  };
}
var pads = {
    "-": "",
    "_": " ",
    "0": "0"
  },
  numberRe = /^\s*\d+/,
  // note: ignores next directive
  percentRe = /^%/,
  requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
    string = (sign ? -value : value) + "",
    length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s) {
  return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad(1 + _d3Time.timeDay.count((0, _d3Time.timeYear)(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad(_d3Time.timeSunday.count((0, _d3Time.timeYear)(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? (0, _d3Time.timeThursday)(d) : _d3Time.timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(_d3Time.timeThursday.count((0, _d3Time.timeYear)(d), d) + ((0, _d3Time.timeYear)(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad(_d3Time.timeMonday.count((0, _d3Time.timeYear)(d) - 1, d), p, 2);
}
function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? (0, _d3Time.timeThursday)(d) : _d3Time.timeThursday.ceil(d);
  return pad(d.getFullYear() % 10000, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad(1 + _d3Time.utcDay.count((0, _d3Time.utcYear)(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad(_d3Time.utcSunday.count((0, _d3Time.utcYear)(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? (0, _d3Time.utcThursday)(d) : _d3Time.utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(_d3Time.utcThursday.count((0, _d3Time.utcYear)(d), d) + ((0, _d3Time.utcYear)(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad(_d3Time.utcMonday.count((0, _d3Time.utcYear)(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? (0, _d3Time.utcThursday)(d) : _d3Time.utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 10000, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}
},{"d3-time":"node_modules/d3-time/src/index.js"}],"node_modules/d3-time-format/src/defaultLocale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultLocale;
exports.utcParse = exports.utcFormat = exports.timeParse = exports.timeFormat = void 0;
var _locale = _interopRequireDefault(require("./locale.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var locale;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale(definition) {
  locale = (0, _locale.default)(definition);
  exports.timeFormat = timeFormat = locale.format;
  exports.timeParse = timeParse = locale.parse;
  exports.utcFormat = utcFormat = locale.utcFormat;
  exports.utcParse = utcParse = locale.utcParse;
  return locale;
}
},{"./locale.js":"node_modules/d3-time-format/src/locale.js"}],"node_modules/d3-time-format/src/isoFormat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isoSpecifier = exports.default = void 0;
var _defaultLocale = require("./defaultLocale.js");
var isoSpecifier = exports.isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date) {
  return date.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : (0, _defaultLocale.utcFormat)(isoSpecifier);
var _default = exports.default = formatIso;
},{"./defaultLocale.js":"node_modules/d3-time-format/src/defaultLocale.js"}],"node_modules/d3-time-format/src/isoParse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isoFormat = require("./isoFormat.js");
var _defaultLocale = require("./defaultLocale.js");
function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}
var parseIso = +new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : (0, _defaultLocale.utcParse)(_isoFormat.isoSpecifier);
var _default = exports.default = parseIso;
},{"./isoFormat.js":"node_modules/d3-time-format/src/isoFormat.js","./defaultLocale.js":"node_modules/d3-time-format/src/defaultLocale.js"}],"node_modules/d3-time-format/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isoFormat", {
  enumerable: true,
  get: function () {
    return _isoFormat.default;
  }
});
Object.defineProperty(exports, "isoParse", {
  enumerable: true,
  get: function () {
    return _isoParse.default;
  }
});
Object.defineProperty(exports, "timeFormat", {
  enumerable: true,
  get: function () {
    return _defaultLocale.timeFormat;
  }
});
Object.defineProperty(exports, "timeFormatDefaultLocale", {
  enumerable: true,
  get: function () {
    return _defaultLocale.default;
  }
});
Object.defineProperty(exports, "timeFormatLocale", {
  enumerable: true,
  get: function () {
    return _locale.default;
  }
});
Object.defineProperty(exports, "timeParse", {
  enumerable: true,
  get: function () {
    return _defaultLocale.timeParse;
  }
});
Object.defineProperty(exports, "utcFormat", {
  enumerable: true,
  get: function () {
    return _defaultLocale.utcFormat;
  }
});
Object.defineProperty(exports, "utcParse", {
  enumerable: true,
  get: function () {
    return _defaultLocale.utcParse;
  }
});
var _defaultLocale = _interopRequireWildcard(require("./defaultLocale.js"));
var _locale = _interopRequireDefault(require("./locale.js"));
var _isoFormat = _interopRequireDefault(require("./isoFormat.js"));
var _isoParse = _interopRequireDefault(require("./isoParse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
},{"./defaultLocale.js":"node_modules/d3-time-format/src/defaultLocale.js","./locale.js":"node_modules/d3-time-format/src/locale.js","./isoFormat.js":"node_modules/d3-time-format/src/isoFormat.js","./isoParse.js":"node_modules/d3-time-format/src/isoParse.js"}],"node_modules/d3-scale/src/time.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calendar = calendar;
exports.default = time;
var _d3Time = require("d3-time");
var _d3TimeFormat = require("d3-time-format");
var _continuous = _interopRequireWildcard(require("./continuous.js"));
var _init = require("./init.js");
var _nice = _interopRequireDefault(require("./nice.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function date(t) {
  return new Date(t);
}
function number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}
function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
  var scale = (0, _continuous.default)(),
    invert = scale.invert,
    domain = scale.domain;
  var formatMillisecond = format(".%L"),
    formatSecond = format(":%S"),
    formatMinute = format("%I:%M"),
    formatHour = format("%I %p"),
    formatDay = format("%a %d"),
    formatWeek = format("%b %d"),
    formatMonth = format("%B"),
    formatYear = format("%Y");
  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond : minute(date) < date ? formatSecond : hour(date) < date ? formatMinute : day(date) < date ? formatHour : month(date) < date ? week(date) < date ? formatDay : formatWeek : year(date) < date ? formatMonth : formatYear)(date);
  }
  scale.invert = function (y) {
    return new Date(invert(y));
  };
  scale.domain = function (_) {
    return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
  };
  scale.ticks = function (interval) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };
  scale.tickFormat = function (count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };
  scale.nice = function (interval) {
    var d = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain((0, _nice.default)(d, interval)) : scale;
  };
  scale.copy = function () {
    return (0, _continuous.copy)(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
  };
  return scale;
}
function time() {
  return _init.initRange.apply(calendar(_d3Time.timeTicks, _d3Time.timeTickInterval, _d3Time.timeYear, _d3Time.timeMonth, _d3Time.timeWeek, _d3Time.timeDay, _d3Time.timeHour, _d3Time.timeMinute, _d3Time.timeSecond, _d3TimeFormat.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}
},{"d3-time":"node_modules/d3-time/src/index.js","d3-time-format":"node_modules/d3-time-format/src/index.js","./continuous.js":"node_modules/d3-scale/src/continuous.js","./init.js":"node_modules/d3-scale/src/init.js","./nice.js":"node_modules/d3-scale/src/nice.js"}],"node_modules/d3-scale/src/utcTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = utcTime;
var _d3Time = require("d3-time");
var _d3TimeFormat = require("d3-time-format");
var _time = require("./time.js");
var _init = require("./init.js");
function utcTime() {
  return _init.initRange.apply((0, _time.calendar)(_d3Time.utcTicks, _d3Time.utcTickInterval, _d3Time.utcYear, _d3Time.utcMonth, _d3Time.utcWeek, _d3Time.utcDay, _d3Time.utcHour, _d3Time.utcMinute, _d3Time.utcSecond, _d3TimeFormat.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
}
},{"d3-time":"node_modules/d3-time/src/index.js","d3-time-format":"node_modules/d3-time-format/src/index.js","./time.js":"node_modules/d3-scale/src/time.js","./init.js":"node_modules/d3-scale/src/init.js"}],"node_modules/d3-scale/src/sequential.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.default = sequential;
exports.sequentialLog = sequentialLog;
exports.sequentialPow = sequentialPow;
exports.sequentialSqrt = sequentialSqrt;
exports.sequentialSymlog = sequentialSymlog;
var _d3Interpolate = require("d3-interpolate");
var _continuous = require("./continuous.js");
var _init = require("./init.js");
var _linear = require("./linear.js");
var _log = require("./log.js");
var _symlog = require("./symlog.js");
var _pow = require("./pow.js");
function transformer() {
  var x0 = 0,
    x1 = 1,
    t0,
    t1,
    k10,
    transform,
    interpolator = _continuous.identity,
    clamp = false,
    unknown;
  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
  }
  scale.domain = function (_) {
    return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
  };
  scale.clamp = function (_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };
  scale.interpolator = function (_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  function range(interpolate) {
    return function (_) {
      var r0, r1;
      return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
    };
  }
  scale.range = range(_d3Interpolate.interpolate);
  scale.rangeRound = range(_d3Interpolate.interpolateRound);
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function (t) {
    transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
    return scale;
  };
}
function copy(source, target) {
  return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
}
function sequential() {
  var scale = (0, _linear.linearish)(transformer()(_continuous.identity));
  scale.copy = function () {
    return copy(scale, sequential());
  };
  return _init.initInterpolator.apply(scale, arguments);
}
function sequentialLog() {
  var scale = (0, _log.loggish)(transformer()).domain([1, 10]);
  scale.copy = function () {
    return copy(scale, sequentialLog()).base(scale.base());
  };
  return _init.initInterpolator.apply(scale, arguments);
}
function sequentialSymlog() {
  var scale = (0, _symlog.symlogish)(transformer());
  scale.copy = function () {
    return copy(scale, sequentialSymlog()).constant(scale.constant());
  };
  return _init.initInterpolator.apply(scale, arguments);
}
function sequentialPow() {
  var scale = (0, _pow.powish)(transformer());
  scale.copy = function () {
    return copy(scale, sequentialPow()).exponent(scale.exponent());
  };
  return _init.initInterpolator.apply(scale, arguments);
}
function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}
},{"d3-interpolate":"node_modules/d3-interpolate/src/index.js","./continuous.js":"node_modules/d3-scale/src/continuous.js","./init.js":"node_modules/d3-scale/src/init.js","./linear.js":"node_modules/d3-scale/src/linear.js","./log.js":"node_modules/d3-scale/src/log.js","./symlog.js":"node_modules/d3-scale/src/symlog.js","./pow.js":"node_modules/d3-scale/src/pow.js"}],"node_modules/d3-scale/src/sequentialQuantile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sequentialQuantile;
var _d3Array = require("d3-array");
var _continuous = require("./continuous.js");
var _init = require("./init.js");
function sequentialQuantile() {
  var domain = [],
    interpolator = _continuous.identity;
  function scale(x) {
    if (x != null && !isNaN(x = +x)) return interpolator(((0, _d3Array.bisect)(domain, x, 1) - 1) / (domain.length - 1));
  }
  scale.domain = function (_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(_d3Array.ascending);
    return scale;
  };
  scale.interpolator = function (_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  scale.range = function () {
    return domain.map((d, i) => interpolator(i / (domain.length - 1)));
  };
  scale.quantiles = function (n) {
    return Array.from({
      length: n + 1
    }, (_, i) => (0, _d3Array.quantile)(domain, i / n));
  };
  scale.copy = function () {
    return sequentialQuantile(interpolator).domain(domain);
  };
  return _init.initInterpolator.apply(scale, arguments);
}
},{"d3-array":"node_modules/d3-array/src/index.js","./continuous.js":"node_modules/d3-scale/src/continuous.js","./init.js":"node_modules/d3-scale/src/init.js"}],"node_modules/d3-scale/src/diverging.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = diverging;
exports.divergingLog = divergingLog;
exports.divergingPow = divergingPow;
exports.divergingSqrt = divergingSqrt;
exports.divergingSymlog = divergingSymlog;
var _d3Interpolate = require("d3-interpolate");
var _continuous = require("./continuous.js");
var _init = require("./init.js");
var _linear = require("./linear.js");
var _log = require("./log.js");
var _sequential = require("./sequential.js");
var _symlog = require("./symlog.js");
var _pow = require("./pow.js");
function transformer() {
  var x0 = 0,
    x1 = 0.5,
    x2 = 1,
    s = 1,
    t0,
    t1,
    t2,
    k10,
    k21,
    interpolator = _continuous.identity,
    transform,
    clamp = false,
    unknown;
  function scale(x) {
    return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (s * x < s * t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
  }
  scale.domain = function (_) {
    return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1, scale) : [x0, x1, x2];
  };
  scale.clamp = function (_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };
  scale.interpolator = function (_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  function range(interpolate) {
    return function (_) {
      var r0, r1, r2;
      return arguments.length ? ([r0, r1, r2] = _, interpolator = (0, _d3Interpolate.piecewise)(interpolate, [r0, r1, r2]), scale) : [interpolator(0), interpolator(0.5), interpolator(1)];
    };
  }
  scale.range = range(_d3Interpolate.interpolate);
  scale.rangeRound = range(_d3Interpolate.interpolateRound);
  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function (t) {
    transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1;
    return scale;
  };
}
function diverging() {
  var scale = (0, _linear.linearish)(transformer()(_continuous.identity));
  scale.copy = function () {
    return (0, _sequential.copy)(scale, diverging());
  };
  return _init.initInterpolator.apply(scale, arguments);
}
function divergingLog() {
  var scale = (0, _log.loggish)(transformer()).domain([0.1, 1, 10]);
  scale.copy = function () {
    return (0, _sequential.copy)(scale, divergingLog()).base(scale.base());
  };
  return _init.initInterpolator.apply(scale, arguments);
}
function divergingSymlog() {
  var scale = (0, _symlog.symlogish)(transformer());
  scale.copy = function () {
    return (0, _sequential.copy)(scale, divergingSymlog()).constant(scale.constant());
  };
  return _init.initInterpolator.apply(scale, arguments);
}
function divergingPow() {
  var scale = (0, _pow.powish)(transformer());
  scale.copy = function () {
    return (0, _sequential.copy)(scale, divergingPow()).exponent(scale.exponent());
  };
  return _init.initInterpolator.apply(scale, arguments);
}
function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}
},{"d3-interpolate":"node_modules/d3-interpolate/src/index.js","./continuous.js":"node_modules/d3-scale/src/continuous.js","./init.js":"node_modules/d3-scale/src/init.js","./linear.js":"node_modules/d3-scale/src/linear.js","./log.js":"node_modules/d3-scale/src/log.js","./sequential.js":"node_modules/d3-scale/src/sequential.js","./symlog.js":"node_modules/d3-scale/src/symlog.js","./pow.js":"node_modules/d3-scale/src/pow.js"}],"node_modules/d3-scale/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "scaleBand", {
  enumerable: true,
  get: function () {
    return _band.default;
  }
});
Object.defineProperty(exports, "scaleDiverging", {
  enumerable: true,
  get: function () {
    return _diverging.default;
  }
});
Object.defineProperty(exports, "scaleDivergingLog", {
  enumerable: true,
  get: function () {
    return _diverging.divergingLog;
  }
});
Object.defineProperty(exports, "scaleDivergingPow", {
  enumerable: true,
  get: function () {
    return _diverging.divergingPow;
  }
});
Object.defineProperty(exports, "scaleDivergingSqrt", {
  enumerable: true,
  get: function () {
    return _diverging.divergingSqrt;
  }
});
Object.defineProperty(exports, "scaleDivergingSymlog", {
  enumerable: true,
  get: function () {
    return _diverging.divergingSymlog;
  }
});
Object.defineProperty(exports, "scaleIdentity", {
  enumerable: true,
  get: function () {
    return _identity.default;
  }
});
Object.defineProperty(exports, "scaleImplicit", {
  enumerable: true,
  get: function () {
    return _ordinal.implicit;
  }
});
Object.defineProperty(exports, "scaleLinear", {
  enumerable: true,
  get: function () {
    return _linear.default;
  }
});
Object.defineProperty(exports, "scaleLog", {
  enumerable: true,
  get: function () {
    return _log.default;
  }
});
Object.defineProperty(exports, "scaleOrdinal", {
  enumerable: true,
  get: function () {
    return _ordinal.default;
  }
});
Object.defineProperty(exports, "scalePoint", {
  enumerable: true,
  get: function () {
    return _band.point;
  }
});
Object.defineProperty(exports, "scalePow", {
  enumerable: true,
  get: function () {
    return _pow.default;
  }
});
Object.defineProperty(exports, "scaleQuantile", {
  enumerable: true,
  get: function () {
    return _quantile.default;
  }
});
Object.defineProperty(exports, "scaleQuantize", {
  enumerable: true,
  get: function () {
    return _quantize.default;
  }
});
Object.defineProperty(exports, "scaleRadial", {
  enumerable: true,
  get: function () {
    return _radial.default;
  }
});
Object.defineProperty(exports, "scaleSequential", {
  enumerable: true,
  get: function () {
    return _sequential.default;
  }
});
Object.defineProperty(exports, "scaleSequentialLog", {
  enumerable: true,
  get: function () {
    return _sequential.sequentialLog;
  }
});
Object.defineProperty(exports, "scaleSequentialPow", {
  enumerable: true,
  get: function () {
    return _sequential.sequentialPow;
  }
});
Object.defineProperty(exports, "scaleSequentialQuantile", {
  enumerable: true,
  get: function () {
    return _sequentialQuantile.default;
  }
});
Object.defineProperty(exports, "scaleSequentialSqrt", {
  enumerable: true,
  get: function () {
    return _sequential.sequentialSqrt;
  }
});
Object.defineProperty(exports, "scaleSequentialSymlog", {
  enumerable: true,
  get: function () {
    return _sequential.sequentialSymlog;
  }
});
Object.defineProperty(exports, "scaleSqrt", {
  enumerable: true,
  get: function () {
    return _pow.sqrt;
  }
});
Object.defineProperty(exports, "scaleSymlog", {
  enumerable: true,
  get: function () {
    return _symlog.default;
  }
});
Object.defineProperty(exports, "scaleThreshold", {
  enumerable: true,
  get: function () {
    return _threshold.default;
  }
});
Object.defineProperty(exports, "scaleTime", {
  enumerable: true,
  get: function () {
    return _time.default;
  }
});
Object.defineProperty(exports, "scaleUtc", {
  enumerable: true,
  get: function () {
    return _utcTime.default;
  }
});
Object.defineProperty(exports, "tickFormat", {
  enumerable: true,
  get: function () {
    return _tickFormat.default;
  }
});
var _band = _interopRequireWildcard(require("./band.js"));
var _identity = _interopRequireDefault(require("./identity.js"));
var _linear = _interopRequireDefault(require("./linear.js"));
var _log = _interopRequireDefault(require("./log.js"));
var _symlog = _interopRequireDefault(require("./symlog.js"));
var _ordinal = _interopRequireWildcard(require("./ordinal.js"));
var _pow = _interopRequireWildcard(require("./pow.js"));
var _radial = _interopRequireDefault(require("./radial.js"));
var _quantile = _interopRequireDefault(require("./quantile.js"));
var _quantize = _interopRequireDefault(require("./quantize.js"));
var _threshold = _interopRequireDefault(require("./threshold.js"));
var _time = _interopRequireDefault(require("./time.js"));
var _utcTime = _interopRequireDefault(require("./utcTime.js"));
var _sequential = _interopRequireWildcard(require("./sequential.js"));
var _sequentialQuantile = _interopRequireDefault(require("./sequentialQuantile.js"));
var _diverging = _interopRequireWildcard(require("./diverging.js"));
var _tickFormat = _interopRequireDefault(require("./tickFormat.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
},{"./band.js":"node_modules/d3-scale/src/band.js","./identity.js":"node_modules/d3-scale/src/identity.js","./linear.js":"node_modules/d3-scale/src/linear.js","./log.js":"node_modules/d3-scale/src/log.js","./symlog.js":"node_modules/d3-scale/src/symlog.js","./ordinal.js":"node_modules/d3-scale/src/ordinal.js","./pow.js":"node_modules/d3-scale/src/pow.js","./radial.js":"node_modules/d3-scale/src/radial.js","./quantile.js":"node_modules/d3-scale/src/quantile.js","./quantize.js":"node_modules/d3-scale/src/quantize.js","./threshold.js":"node_modules/d3-scale/src/threshold.js","./time.js":"node_modules/d3-scale/src/time.js","./utcTime.js":"node_modules/d3-scale/src/utcTime.js","./sequential.js":"node_modules/d3-scale/src/sequential.js","./sequentialQuantile.js":"node_modules/d3-scale/src/sequentialQuantile.js","./diverging.js":"node_modules/d3-scale/src/diverging.js","./tickFormat.js":"node_modules/d3-scale/src/tickFormat.js"}],"js/animalShapes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dogNose = exports.dogHead = exports.dogEar = exports.catNose = exports.catHead = exports.catEar = void 0;
var catNose = exports.catNose = "M43.107,60.675c0,4.168,7.546,7.55,7.546,7.55s7.55-3.382,7.55-7.55S43.107,56.507,43.107,60.675z";
var catEar = exports.catEar = "M98.236,69.06l-9.263-1.48c0.557-1.164,1.032-2.373,1.438-3.615l7.062,1.131c0.13,0.021,0.258,0.028,0.386,0.028\n  c1.167,0,2.193-0.845,2.382-2.034c0.212-1.317-0.686-2.558-2.003-2.769l-6.675-1.067c0.28-1.726,0.427-3.508,0.427-5.343\n  c0-6.845-4.561-22.027-6.425-26.725c-1.431-3.602-2.868-5.95-4.531-8.67c-0.774-1.264-1.604-2.621-2.514-4.245\n  c-0.403-0.718-1.142-1.181-1.964-1.23c-0.849-0.062-1.611,0.324-2.097,0.987c-3.021,4.139-7.708,8.75-9.605,8.75\n  c-0.775,0-2.202-0.176-3.855-0.38c-2.922-0.36-6.562-0.81-10.338-0.81c-3.111,0-6.12,0.394-8.776,0.741\n  c-1.843,0.241-3.434,0.449-4.533,0.449c-3.984,0-8.543-6.114-9.827-8.256c-0.434-0.723-1.213-1.17-2.058-1.175\n  c-0.881-0.004-1.628,0.427-2.072,1.145c-2.846,4.602-4.725,7.642-6.769,12.961C14.749,32.337,10.35,47.23,10.35,53.91\n  c0,1.735,0.136,3.422,0.386,5.062L2.311,60.32c-1.317,0.209-2.215,1.451-2.004,2.769c0.189,1.188,1.217,2.034,2.383,2.034\n  c0.126,0,0.255-0.008,0.385-0.028l8.765-1.402c0.394,1.244,0.859,2.453,1.403,3.62L2.307,69.06\n  c-1.317,0.211-2.215,1.451-2.005,2.771c0.19,1.187,1.217,2.034,2.383,2.034c0.127,0,0.256-0.01,0.386-0.028l12.746-2.039\n  c6.81,9.795,19.501,15.824,35.349,15.824c15.708,0,28.317-5.926,35.172-15.568l11.136,1.781c0.13,0.021,0.258,0.029,0.386,0.029\n  c1.167,0,2.193-0.847,2.382-2.034C100.452,70.511,99.553,69.271,98.236,69.06z ";
var catHead = exports.catHead = "M51.165,82.786\n  c-11.613,0-23.289-3.759-30.068-11.836l2.122-0.338c1.318-0.211,2.215-1.45,2.004-2.77c-0.211-1.317-1.452-2.215-2.767-2.004\n  l-4.327,0.693c-0.595-1.138-1.106-2.338-1.531-3.601l6.621-1.057c1.318-0.212,2.215-1.451,2.004-2.77\n  c-0.211-1.316-1.452-2.215-2.767-2.005l-6.967,1.115c-0.195-1.376-0.31-2.805-0.31-4.302c0-5.423,3.863-19.281,5.955-24.725\n  c1.408-3.665,2.707-6.117,4.445-9.015c2.48,3.151,6.775,7.44,11.767,7.44c1.414,0,3.149-0.227,5.16-0.489\n  c2.508-0.328,5.352-0.7,8.15-0.7c3.479,0,6.953,0.428,9.746,0.772c1.886,0.232,3.375,0.417,4.446,0.417\n  c3.909,0,8.436-4.511,11.267-7.873c0.271,0.448,0.534,0.88,0.793,1.301c1.609,2.635,2.883,4.715,4.16,7.93\n  c2.081,5.247,6.083,19.387,6.083,24.941c0,1.6-0.129,3.12-0.352,4.58l-8.715-1.394c-1.33-0.215-2.558,0.687-2.769,2.005\n  c-0.211,1.317,0.688,2.557,2.004,2.769l8.316,1.329c-0.438,1.258-0.958,2.46-1.567,3.592l-5.984-0.957\n  c-1.332-0.212-2.559,0.687-2.77,2.004s0.688,2.558,2.003,2.769l3.694,0.592C74.207,79.103,62.656,82.786,51.165,82.786z";
var dogNose = exports.dogNose = "M36.399,64.384c0,7.885,8.166,14.282,14.277,14.282c6.111,0,14.28-6.397,14.28-14.282\nC64.956,56.5,36.399,56.5,36.399,64.384z";
var dogEar = exports.dogEar = "M100.659,42.526c-9.083-28.637-34.646-30.306-43.947-29.92c-1.93-0.323-3.935-0.503-6.034-0.503\nc-2.171,0-4.188,0.181-6.067,0.503c-9.299-0.387-34.867,1.279-43.952,29.92c0,0,2.469,8.597,14.729,9.255\nc-0.775,3.45-1.324,6.718-1.324,8.962c0,18.046,15.247,30.65,37.077,30.65c21.829,0,37.075-12.604,37.075-30.65\nc0-2.271-0.555-5.556-1.339-9.012C98.336,50.702,100.659,42.526,100.659,42.526z ";
var dogHead = exports.dogHead = "M51.139,86.646\nc-16.09,0-32.327-8.009-32.327-25.9c0-2.71,1.074-7.764,2.354-12.563c5.087-6.791,12.715-21.385,19.399-29.519\nc2.853-1.112,6.173-1.808,10.112-1.808c3.825,0,7.093,0.62,9.941,1.643c7.361,8.878,15.897,25.73,20.932,31.409\nc1.076,4.235,1.913,8.434,1.913,10.838C83.464,78.637,67.229,86.646,51.139,86.646z";
},{}],"js/Bubble.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bubble = void 0;
var _d3Selection = require("d3-selection");
var _d3Transition = require("d3-transition");
var _LogisticRegression = require("./LogisticRegression");
var _data = require("./data");
var _colors = require("./colors");
var _d3Array = require("d3-array");
var _d3Collection = require("d3-collection");
var _d3Force = require("d3-force");
var _d3Polygon = require("d3-polygon");
var _d3Shape = require("d3-shape");
var _d3Drag = require("d3-drag");
var _d3Ease = require("d3-ease");
var _d3Format = require("d3-format");
var _d3Scale = require("d3-scale");
var _animalShapes = require("./animalShapes");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Bubble = exports.Bubble = /*#__PURE__*/function () {
  function Bubble(opts) {
    _classCallCheck(this, Bubble);
    // set selections
    this.chartContainer = opts.chartContainer;
    this.table = opts.table;
    var windowWidth = window.innerWidth;

    // set SVG size parameters
    this.MARGIN = {
      TOP: window.innerHeight * 0,
      BOTTOM: window.innerHeight * 0,
      LEFT: window.innerWidth * 0,
      RIGHT: window.innerWidth * 0
    };
    this.WIDTH = window.innerWidth < 950 ? windowWidth / 1.15 : windowWidth / 1.75;
    this.HEIGHT = window.innerWidth < 950 ? window.innerHeight / 1.8 : window.innerHeight / 1.95;

    // easy to track main groups here for different group filterings later
    this.mainGroups = ["train", "test", "validation"];
    this.showGroups = ["train"];
    this.currentGroup = "pretrain";
    // need to track which data
    this.current = "intro";

    // chart constants
    this.yGroupHeight = this.HEIGHT / 4.6;
    this.yLabelHeight = 45;
    this.iconScale = window.innerWidth >= 950 ? 0.3 : 0.26;
    this.collideRadius = window.innerWidth >= 950 ? 16 : 12.5;
    this.radius = 7;
    this.padding = 9;
    this.cluster_padding = 10;
    this.strength = 0.2;

    // create svg
    this.svg = (0, _d3Selection.select)(this.chartContainer).append("svg").attr("id", "bubble-svg").attr("width", this.WIDTH + this.MARGIN.LEFT + this.MARGIN.RIGHT).attr("height", this.HEIGHT + this.MARGIN.TOP + this.MARGIN.BOTTOM);

    // g container for bubble chart
    this.chartG = this.svg.append("g").attr("id", "bubble-g").attr("transform", "translate(".concat(this.MARGIN.LEFT, ", ").concat(this.MARGIN.TOP, ")"));

    // Load data.
    this.data = _data.animals;
    this.X = _data.animals.map(function (d) {
      return {
        weight: d.weight,
        fluffiness: d.fluffiness
      };
    });

    // instantiate model
    this.model = new _LogisticRegression.LogisticRegression({
      iterations: 10000,
      learningRate: 0.00025,
      startFeature: "weight"
    });
    this.currentFeature = this.model.startFeature;
    this.fluffScaleX = (0, _d3Scale.scaleLinear)().domain((0, _d3Array.extent)(this.data, function (d) {
      return +d.fluffiness;
    })).range([50, this.WIDTH - 50]);
    this.weightScaleX = (0, _d3Scale.scaleLinear)().domain((0, _d3Array.extent)(this.data, function (d) {
      return +d.weight;
    })).range([50, this.WIDTH - 50]);
    this.fluffScaleY = (0, _d3Scale.scaleLinear)().domain((0, _d3Array.extent)(this.data, function (d) {
      return +d.fluffiness;
    })).range([50, this.HEIGHT - 100]);
    this.weightScaleY = (0, _d3Scale.scaleLinear)().domain((0, _d3Array.extent)(this.data, function (d) {
      return +d.weight;
    })).range([50, this.HEIGHT - 100]);
    this.colorScale = (0, _d3Scale.scaleOrdinal)().domain(["train", "test", "validation"]).range([_colors.trainColor, _colors.testColor, _colors.validationColor]);

    // set groups
    // Group coordinates and meta info (update in redraw func)
    this.groups = {
      intro: {
        x: this.WIDTH / 2,
        y: this.HEIGHT / 2,
        fullname: "Intro"
      },
      test: {
        x: this.WIDTH / 5.5,
        y: this.yGroupHeight,
        fullname: "Test"
      },
      train: {
        x: this.WIDTH / 2,
        y: this.yGroupHeight,
        fullname: "Train"
      },
      validation: {
        x: this.WIDTH / 1.2,
        y: this.yGroupHeight,
        fullname: "Validation"
      },
      offscreen: {
        x: this.WIDTH / 2,
        y: -400,
        fullname: "offscreen"
      }
    };
    this.lineSeparator = this.chartG.append("line").attr("id", "line-x-dimension").attr("stroke", "black").style("stroke-width", 2).style("pointer-events", "none").attr("vector-effect", "non-scaling-stroke").style("opacity", 0.4);
    this.formatData();
    this.addLabels();
  }
  return _createClass(Bubble, [{
    key: "formatData",
    value: function formatData() {
      // track class state for closures
      var self = this;
      // Force to increment nodes to groups.

      // Create node data.
      this.nodes = this.data.map(function (d) {
        return {
          id: "node" + d.id,
          fluffiness: d.fluffiness,
          weight: d.weight,
          animal: d.animal,
          class: d.class,
          x: self.WIDTH / 2 + Math.random(),
          y: self.HEIGHT / 2 + Math.random(),
          r: self.radius,
          group: d.class,
          stages: d.class
        };
      });
      this.labelData = (0, _d3Collection.keys)(this.groups).map(function (d) {
        return {
          name: d
        };
      });

      //  draw
      this.addAnmials();
      this.runForce();
      this.drawHull();
    }
  }, {
    key: "moveCenter",
    value: function moveCenter() {
      var self = this;

      // Forces
      this.simulation.force("center", null).force("x", function (d) {
        return (0, _d3Force.forceX)(d.x);
      }).force("y", function (d) {
        return (0, _d3Force.forceY)(d.y);
      }).force("charge", (0, _d3Force.forceManyBody)()).force("collide", (0, _d3Force.forceCollide)(this.collideRadius)).alpha(0.02).alphaDecay(0).on("tick", ticked);

      // get bounding box info for animals (for hull padding)
      var petDims = (0, _d3Selection.select)("path.animal-head").node().getBBox();
      function ticked(d) {
        // determine how to nudge nodes during force
        var l = 0.1 * self.strength;
        self.nodes.forEach(function (d, i) {
          if (!self.showGroups.includes(d.group)) {
            d.vx -= (d.x - self.groups["offscreen"].x) * l;
            d.vy -= (d.y - self.groups["offscreen"].y) * l;
          } else {
            d.vx -= (d.x - self.groups["intro"].x) * l;
            d.vy -= (d.y - self.groups["intro"].y) * l;
          }
        });

        // this is required for nodes to position based on above
        self.bubbles.attr("transform", function (d) {
          return "translate(".concat(d.x, ", ").concat(d.y, ")");
        });

        // hull constants
        var padding = 20;
        var inverseIconScale = 0.25;

        // init centroid for polygon
        var hullCentroid;
        var hullMinY;
        // update hull path
        self.hullPath.attr("d", function (g) {
          // init arr to store box coords around each pet centroid
          var petCoords = [];

          // loop nodes in view to generate centroid
          self.nodes.filter(function (d) {
            return self.showGroups.includes(d.group);
          }).map(function (d) {
            // get centroids of each animal
            var centeredX = d.x + petDims.width * inverseIconScale;
            var centeredy = d.y + petDims.height * inverseIconScale;

            // store square points around centroid
            petCoords.push([centeredX - padding, centeredy - padding]);
            petCoords.push([centeredX - padding, centeredy + padding]);
            petCoords.push([centeredX + padding, centeredy - padding]);
            petCoords.push([centeredX + padding, centeredy + padding]);
          });

          // get convexHull data
          self.convexHullData = (0, _d3Polygon.polygonHull)(petCoords);

          // need to force closed hull (else gap exists)
          self.convexHullData.push(self.convexHullData[0]);
          hullMinY = (0, _d3Array.max)(self.convexHullData, function (d) {
            return d[1];
          });
          // track hull centroid
          hullCentroid = (0, _d3Polygon.polygonCentroid)(self.convexHullData);

          // generate svg path of convex hull
          return (0, _d3Shape.line)()(self.convexHullData);
        });
        // update position of hull text
        self.hullText.attr("opacity", 1).attr("x", hullCentroid[0]).attr("y", hullMinY).attr("dy", "1.5rem");
      }
    }
  }, {
    key: "runForce",
    value: function runForce() {
      var self = this;

      // Forces
      this.simulation = (0, _d3Force.forceSimulation)(this.nodes).force("x", function (d) {
        return (0, _d3Force.forceX)(d.x);
      }).force("y", function (d) {
        return (0, _d3Force.forceY)(d.y);
      }).force("charge", (0, _d3Force.forceManyBody)()).force("center", (0, _d3Force.forceCenter)(this.WIDTH / 2, this.HEIGHT / 2)).force("collide", (0, _d3Force.forceCollide)(this.collideRadius)).alpha(0.09).alphaDecay(0);
      function ticked() {
        // determine how to nudge nodes during force
        if (self.current === "intro") {
          var l = 0.1 * self.strength;
          self.nodes.forEach(function (d, i) {
            d.vx -= (d.x - self.groups["intro"].x) * l;
            d.vy -= (d.y - self.groups["intro"].y) * l;
          });
        } else if (self.current === "groups") {
          var _l = 0.1 * self.strength;
          self.nodes.forEach(function (d, i) {
            d.vx -= (d.x - self.groups[d.group].x) * _l;
            d.vy -= (d.y - self.groups[d.group].y) * _l;
          });
        } else if (self.current === "bee") {
          var _l2 = 0.1 * self.strength;
          self.nodes.forEach(function (d, i) {
            d.vx -= self.fluffScaleX(d.fluffiness) * _l2;
            d.vy -= (d.y - self.HEIGHT / 2) * _l2;
          });
        }

        // this is required for nodes to position based on above
        self.bubbles.attr("transform", function (d) {
          return "translate(".concat(d.x, ", ").concat(d.y, ")");
        });
      }

      // Adjust position of circles.
      this.simulation.on("tick", ticked);

      // x is fluff, weight is y

      // set up drag
      this.drag = function (simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }
        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
          if (self.currentGroup === "pretrain") {
            d.fx = null;
            d.fy = null;
          } else {
            var scale = self.currentFeature === "weight" ? self.weightScaleX : self.fluffScaleX;
            // update current nodes value of selected feature(s)
            var currentNode = (0, _d3Selection.select)(this)._groups[0][0].__data__;
            if (self.currentFeature === "both") {
              // update x pos
              currentNode["fluffiness"] = self.fluffScaleX.invert(event.x);
              // update y pos
              currentNode["weight"] = self.weightScaleY.invert(event.y);
            } else {
              currentNode[self.currentFeature] = scale.invert(event.x);
            }

            // update decision boundary (if not train data point)
            var moveBoundary = currentNode["group"] === "train" ? true : false;
            self.updateDecisionBoundary(self.currentFeature, moveBoundary);
          }
        }
        return (0, _d3Drag.drag)().on("start", dragstarted).on("drag", dragged).on("end", dragended);
      };
      self.bubbles.call(self.drag(self.simulation));
    }
  }, {
    key: "drawDecisionBoundary",
    value: function drawDecisionBoundary() {
      var scale = this.currentFeature === "weight" ? this.weightScaleX : this.fluffScaleX;
      this.decisionBoundaryLine.style("opacity", 1).attr("x1", 0).attr("x2", 0).attr("y1", this.HEIGHT / 5).attr("y2", this.HEIGHT / 2 + (this.HEIGHT / 2 - this.HEIGHT / 5)).transition().duration(1200).ease(_d3Ease.easeBackInOut).attr("x1", scale(this.model.decisionBoundary)).attr("x2", scale(this.model.decisionBoundary)).attr("y1", this.HEIGHT / 5).attr("y2", this.HEIGHT / 2 + (this.HEIGHT / 2 - this.HEIGHT / 5));
      this.updateDecisionBoundary(this.currentFeature, true);
    }

    // conditionally color animals by train/test/valiation group
  }, {
    key: "colorAnimals",
    value: function colorAnimals(display) {
      var _this = this;
      // determine if coloring animals or not
      var colorApplication = display === "on" ? function (d) {
        return _this.colorScale(d.group);
      } : "black";

      // class selectors for animal paths to color
      var animalClasses = [".animal-ear", ".animal-head", ".animal-nose", ".animal-eye1", ".animal-eye2", ".animal-eye3", ".animal-eye4"];

      // color animal paths as desired
      animalClasses.forEach(function (d) {
        (0, _d3Selection.selectAll)(d).attr("fill", colorApplication);
      });
    }
  }, {
    key: "addAnmials",
    value: function addAnmials() {
      // need to track outer class' scope
      var self = this;

      // g to hold nodes
      this.bubbleG = this.svg.append("g").selectAll(".bubble-g").data(this.nodes);

      // g for each animal
      this.bubbles = this.bubbleG.enter().append("g").attr("class", "bubble-animal").attr("group", function (d) {
        return d.class;
      });

      // append animal svg to each animal g
      // note - in the func below, track the bubble's index (i) as well,
      // otherwise blinking will happen randomly across each individual eye,
      // not pairs of eyes.  (handled in eyeAnimations func)
      (0, _d3Selection.selectAll)(".bubble-animal").each(function (d, i) {
        // get current animal name
        var animal = d.animal;

        // draw animal's ears
        (0, _d3Selection.select)(this).append("path").attr("d", animal === "cat" ? _animalShapes.catEar : _animalShapes.dogEar).attr("class", "animal-ear").attr("transform", "translate(-12,0) scale(".concat(self.iconScale, ", ").concat(self.iconScale, ")"));

        // draw animal's head
        (0, _d3Selection.select)(this).append("path").attr("d", animal === "cat" ? _animalShapes.catHead : _animalShapes.dogHead).attr("class", "animal-head").attr("transform", "translate(-12,0) scale(".concat(self.iconScale, ", ").concat(self.iconScale, ")"));

        // draw animal's nose
        (0, _d3Selection.select)(this).append("path").attr("d", animal === "cat" ? _animalShapes.catNose : _animalShapes.dogNose).attr("class", "animal-nose").attr("transform", "translate(-12,0) scale(".concat(self.iconScale, ", ").concat(self.iconScale, ")"));

        // draw animal's cat's right eye
        (0, _d3Selection.select)(this).append("circle").attr("cx", 66.599).attr("cy", 49.639).attr("r", 4.397).attr("class", function (d) {
          return eyeAnimations(i);
        }).attr("transform", "translate(-12,0) scale(".concat(self.iconScale, ", ").concat(self.iconScale, ")"));

        // draw animal's left eye
        (0, _d3Selection.select)(this).append("circle").attr("cx", 35.735).attr("cy", 49.639).attr("r", 4.397).attr("class", function (d) {
          return eyeAnimations(i);
        }).attr("transform", "translate(-12,0) scale(".concat(self.iconScale, ", ").concat(self.iconScale, ")"));
      });
    }

    // add text labels and rect backgrounds to svg
  }, {
    key: "addLabels",
    value: function addLabels() {
      var _this2 = this;
      // margins for background rectangles
      var borderMarginX = 12;
      var borderMarginY = 5;
      var self = this;

      // add text
      this.labels = this.svg.selectAll(".bubble-label").data(this.labelData.filter(function (d) {
        return self.mainGroups.includes(d.name);
      })).join("text").attr("class", "bubble-label").attr("text-anchor", "middle").attr("x", function (d) {
        return _this2.groups[d.name].x;
      }).attr("y", function (d) {
        return _this2.yLabelHeight;
      }).text(function (d) {
        return _this2.groups[d.name].fullname;
      }).attr("visibility", "hidden");

      // add bbox elements to data
      // note, this has to be done after
      // adding text to dom, so we can
      // get correct bbox of text elements
      this.svg.selectAll(".bubble-label").join(this.labelData).each(function (d) {
        d.bbox = this.getBBox();
      });

      // add background rects to labels
      this.labelsRect = this.svg.selectAll(".bubble-rect").data(this.labelData.filter(function (d) {
        return self.mainGroups.includes(d.name);
      })).join("rect").attr("class", "bubble-rect").attr("text-anchor", "middle").attr("x", function (d) {
        return _this2.groups[d.name].x - d.bbox.width * 0.5;
      }).attr("y", function (d) {
        return _this2.yLabelHeight;
      }).attr("width", function (d) {
        return d.bbox.width + 2 * borderMarginX;
      }).attr("height", function (d) {
        return d.bbox.height + 2 * borderMarginY;
      }).attr("transform", function (d) {
        return "translate(-".concat(borderMarginX, ", -").concat(d.bbox.height * 0.8 + borderMarginY, ")");
      }).attr("visibility", "hidden").attr("stroke", function (d) {
        return self.colorScale(d.name);
      });

      // ensure text in front of background rects
      this.svg.selectAll(".bubble-label").raise();
      this.decisionBoundaryLine = this.chartG.append("line").attr("id", "line-decision-boundary").attr("stroke", "black").style("stroke-width", 8).style("pointer-events", "none").attr("vector-effect", "non-scaling-stroke");
      // .style("opacity", 0);
    }
  }, {
    key: "drawHull",
    value: function drawHull() {
      this.hullG = this.svg.append("g").attr("id", "hull-g");
      this.hullPath = this.hullG.append("path").attr("id", "hull-path").style("stroke", "black").style("fill", "none").style("stroke-width", 5).style("pointer-events", "none").style("stroke-linejoin", "round");

      // append text to hull
      this.hullText = this.hullG.append("text").attr("id", "hull-text").text("Majority Vote: Cat").attr("text-anchor", "middle").attr("opacity", 0);

      // append background rect for hull text
      this.hullRect = this.hullG.append("rect").attr("text-anchor", "middle").attr("width", function (d) {
        return 50 + 2 * 12;
      }).attr("height", function (d) {
        return 20 + 2 * 5;
      }).attr("transform", function (d) {
        return "translate(-".concat(12, ", -", 20 * 0.8 + 5, ")");
      }).attr("visibility", "hidden").attr("stroke", "black");
    }
  }, {
    key: "drawAxesLabels",
    value: function drawAxesLabels(feature) {
      // remove existing axes
      (0, _d3Selection.selectAll)(".axes-text").remove();
      if (feature === "neither") {
        return;
      } else if (feature === "both") {
        // draw x
        this.svg.append("text").attr("class", "axes-text").attr("id", "x-axis-text").text("Fluffiness").attr("x", this.WIDTH / 2).attr("y", this.HEIGHT * 0.95).attr("text-anchor", "middle");
        this.svg.append("text").attr("class", "axes-text").attr("id", "y-axis-text").attr("transform", "rotate(-90)").attr("y", 0).attr("x", 0 - this.HEIGHT / 2).attr("dy", "1rem").style("text-anchor", "middle").text("Weight");
      } else {
        // draw x
        var upperCaseFeature = feature === "weight" ? "Weight" : "Fluffiness";
        this.svg.append("text").attr("class", "axes-text").text(upperCaseFeature).attr("x", this.WIDTH / 2).attr("y", this.HEIGHT * 0.95).attr("text-anchor", "middle");
      }
    }

    // color nodes

    // make decision bondary visible
  }, {
    key: "updateDecisionBoundary",
    value: function updateDecisionBoundary(feature, move) {
      // store feature to state of class
      this.currentFeature = feature;
      if (move === true) {
        if (feature === "both") {
          (0, _d3Selection.select)("#hull-g").style("opacity", 0);
          var decisionLine = function decisionLine(x, weights) {
            return -1 * (weights[1] / weights[2]) * x - weights[0] / weights[2];
          };
          this.model.fit(feature, this.nodes);
          this.moveScatter();
          var _extent = (0, _d3Array.extent)(this.data, function (d) {
              return +d.fluffiness;
            }),
            _extent2 = _slicedToArray(_extent, 2),
            dvX1 = _extent2[0],
            dvX2 = _extent2[1];
          var y1 = decisionLine(dvX1, this.model.weights);
          var y2 = decisionLine(dvX2, this.model.weights);
          this.lineSeparator.style("opacity", 0);
          this.decisionBoundaryLine.style("opacity", 1);
          this.decisionBoundaryLine.transition().duration(1200).ease(_d3Ease.easeBackInOut).attr("x1", this.fluffScaleX(dvX1)).attr("x2", this.fluffScaleX(dvX2)).attr("y1", this.weightScaleY(y1)).attr("y2", this.weightScaleY(y2));
        } else if (feature === "neither") {
          (0, _d3Selection.select)("#hull-g").style("opacity", 1);

          // this.moveBack();
          this.hideLines();
          this.moveCenter();
        } else {
          (0, _d3Selection.select)("#hull-g").style("opacity", 0);

          // redraw lines
          this.showLines();
          // retrain model for the given feature
          this.model.fit(feature, this.nodes);
          var scale = feature === "weight" ? this.weightScaleX : this.fluffScaleX;
          // move nodes to correct position
          this.moveBee();

          // redraw horizontal line
          this.decisionBoundaryLine.attr("opacity", 1).transition().duration(1200).ease(_d3Ease.easeBackInOut).attr("y1", this.HEIGHT / 5).attr("y2", this.HEIGHT / 2 + (this.HEIGHT / 2 - this.HEIGHT / 5)).attr("x1", scale(this.model.decisionBoundary)).attr("x2", scale(this.model.decisionBoundary)).attr("y1", this.HEIGHT / 5).attr("y2", this.HEIGHT / 2 + (this.HEIGHT / 2 - this.HEIGHT / 5));
          this.lineSeparator.style("opacity", 1);
        }
      } else {
        if (feature === "both") {
          (0, _d3Selection.select)("#hull-g").style("opacity", 0);
          this.moveScatter();
        } else if (feature === "neither") {
          // this.moveBack();
          this.hideLines();
          this.moveCenter();
        } else {
          (0, _d3Selection.select)("#hull-g").style("opacity", 0);
          this.moveBee();
        }
      }
      this.calculatePerformance();
    }
  }, {
    key: "calculatePerformance",
    value: function calculatePerformance() {
      var _this3 = this;
      var self = this;
      // this.model.calculatePerformance(this.currentFeature);

      // init metrics to track
      var performance = {
        dataset: "",
        accuracy: 0,
        "cat right": 0,
        "cat wrong": 0,
        "dog right": 0,
        "dog wrong": 0
      };
      performance["dataset"] = this.currentGroup;
      performance["feature"] = this.currentFeature;
      var modelWeights = this.model.weights;
      var z;
      // determine equation (depends on # of features)
      if (this.currentFeature === "both") {
        // if both, use both weights in equation
        z = function z(d) {
          return modelWeights[0] + modelWeights[1] * d["fluffiness"] + modelWeights[2] * d["weight"];
        };
      } else if (this.currentFeature === "neither") {
        z = function z(d) {
          // assign as all cats
          return -1;
        };
      } else {
        z = function z(d) {
          return modelWeights[0] + modelWeights[1] * d[self.currentFeature];
        };
      }

      // filter by group
      var filteredNodes = this.nodes.filter(function (d) {
        return d.class === _this3.currentGroup;
      });
      filteredNodes.forEach(function (d) {
        var zOutput = z(d);
        // use sign of z to determine class
        var pred = zOutput <= 0 ? "cat" : "dog";
        // assign predicted class to data
        d.pred = pred;

        // update performance metrics
        if (d.pred === d.animal) {
          performance["accuracy"] += 1;
          if (d.animal === "cat") {
            performance["cat right"] += 1;
          } else {
            performance["dog right"] += 1;
          }
        } else {
          if (d.animal === "cat") {
            performance["cat wrong"] += 1;
          } else {
            performance["dog wrong"] += 1;
          }
        }
      });

      // track performance metrics
      performance["accuracy"] /= filteredNodes.length;
      performance["accuracy"] = (0, _d3Format.format)(".1%")(performance["accuracy"]);
      if (["test", "validation"].includes(this.currentGroup)) {
        this.table.updateTable(performance);
      }
      return performance;
    }
  }, {
    key: "moveNodes",
    value: function moveNodes() {
      var self = this;
      this.simulation.force("center", null).force("x", function (d) {
        return (0, _d3Force.forceX)(d.x);
      }).force("y", function (d) {
        return (0, _d3Force.forceY)(d.y);
      }).force("charge", (0, _d3Force.forceManyBody)()).force("collide", (0, _d3Force.forceCollide)(this.collideRadius)).alpha(0.09).alphaDecay(0);
      self.current = "groups";
      function ticked() {
        // determine how to nudge nodes during force
        if (self.current === "intro") {
          var l = 0.1 * self.strength;
          self.nodes.forEach(function (d, i) {
            d.vx -= (d.x - self.groups["intro"].x) * l;
            d.vy -= (d.y - self.groups["intro"].y) * l;
          });
        } else if (self.current === "groups") {
          var _l3 = 0.1 * self.strength;
          self.nodes.forEach(function (d, i) {
            d.vx -= (d.x - self.groups[d.group].x) * _l3;
            d.vy -= (d.y - self.groups[d.group].y) * _l3;
          });
        }

        // this is required for nodes to position based on above
        self.bubbles.attr("transform", function (d) {
          return "translate(".concat(d.x, ", ").concat(d.y, ")");
        });
      }

      // Adjust position of circles.
      this.simulation.on("tick", ticked);
    }
  }, {
    key: "hideNonTrainAnimals",
    value: function hideNonTrainAnimals() {
      var trans = (0, _d3Transition.transition)().duration(1200);
      // hide animal bodies
      this.bubbles.filter(function (d) {
        return d.group !== "train";
      }).selectAll("path").transition(trans).attr("transform", "scale(0,0)");

      // hide animal eyes
      this.bubbles.filter(function (d) {
        return d.group !== "train";
      }).selectAll("circle").transition(trans).attr("transform", "scale(0,0)");
    }
  }, {
    key: "hideNonValidationAnimals",
    value: function hideNonValidationAnimals() {
      var trans = (0, _d3Transition.transition)();
      // hide animal bodies
      this.bubbles.filter(function (d) {
        return d.group !== "validation";
      }).selectAll("path").transition(trans).attr("transform", "scale(0,0)");

      // hide animal eyes
      this.bubbles.filter(function (d) {
        return d.group !== "validation";
      }).selectAll("circle").transition(trans).attr("transform", "scale(0,0)");

      // hide non validation labels
      // re-position labels
      this.labels.filter(function (d, i) {
        return [0, 1].includes(i);
      }).transition(trans).attr("y", -this.HEIGHT / 5);
      this.labelsRect.filter(function (d, i) {
        return [0, 1].includes(i);
      }).transition(trans).attr("y", -this.HEIGHT / 5);
    }
  }, {
    key: "hideLines",
    value: function hideLines() {
      this.lineSeparator.transition().attr("x2", 0);
      this.lineSeparator.lower();
      this.decisionBoundaryLine.style("opacity", 0);
    }
  }, {
    key: "showLines",
    value: function showLines() {
      this.lineSeparator.transition().attr("x2", this.WIDTH);
      this.lineSeparator.lower();
      this.decisionBoundaryLine.style("opacity", 1);
    }
  }, {
    key: "drawHorizontalLine",
    value: function drawHorizontalLine() {
      if (this.currentFeature === "weight" || this.currentFeature === "fluffiness") {
        if (this.lineSeparator.attr("x2") < this.WIDTH) {
          this.lineSeparator.attr("x1", 0).attr("y1", 10 + this.HEIGHT / 2).attr("x2", 0).attr("y2", 10 + this.HEIGHT / 2).transition().attr("x2", this.WIDTH);
          this.lineSeparator.lower();
        }
      }
    }
  }, {
    key: "addValidationData",
    value: function addValidationData() {
      var _this4 = this;
      // show animal bodies
      this.bubbles.filter(function (d) {
        return d.group !== "test";
      }).selectAll("path").transition().attr("transform", "scale(".concat(this.iconScale, ", ").concat(this.iconScale, ")"));

      // show animal eyes
      this.bubbles.filter(function (d) {
        return d.group !== "test";
      }).selectAll("circle").transition().attr("transform", "scale(".concat(this.iconScale, ", ").concat(this.iconScale, ")"));

      // hide non test labels
      // re-position labels
      this.labels.filter(function (d, i) {
        return [0, 2].includes(i);
      }).transition().attr("y", function (d) {
        return _this4.yLabelHeight;
      });
      this.labelsRect.filter(function (d, i) {
        return [0, 2].includes(i);
      }).transition().attr("y", function (d) {
        return _this4.yLabelHeight;
      });
    }
  }, {
    key: "showAnimals",
    value: function showAnimals() {
      var _this5 = this;
      var self = this;
      this.nonShowGroups = this.mainGroups.filter(function (x) {
        return !_this5.showGroups.includes(x);
      });
      // show animal bodies
      this.bubbles.filter(function (d) {
        return self.showGroups.includes(d.group);
      }).selectAll("path").attr("opacity", 1).transition().attr("transform", "scale(".concat(this.iconScale, ", ").concat(this.iconScale, ")"));

      // show animal eyes
      this.bubbles.filter(function (d) {
        return self.showGroups.includes(d.group);
      }).selectAll("circle").attr("opacity", 1).transition().attr("transform", "scale(".concat(this.iconScale, ", ").concat(this.iconScale, ")"));

      // hide animal bodies
      this.bubbles.filter(function (d) {
        return self.nonShowGroups.includes(d.group);
      }).selectAll("path").transition().attr("transform", "scale(".concat(this.iconScale, ", ").concat(this.iconScale, ")")).transition();
      // .attr("opacity", 0);

      // hide animal eyes
      this.bubbles.filter(function (d) {
        return self.nonShowGroups.includes(d.group);
      }).selectAll("circle").transition().attr("transform", "scale(".concat(this.iconScale, ", ").concat(this.iconScale, ")")).transition();
      // .attr("opacity", 0);
    }
  }, {
    key: "showNonTrainAnimals",
    value: function showNonTrainAnimals() {
      var nonTrainSelector = function nonTrainSelector(d) {
        return d.group !== "train";
      };
      // show animal bodies
      this.bubbles.filter(nonTrainSelector).selectAll("path").transition().attr("transform", "scale(".concat(this.iconScale, ", ").concat(this.iconScale, ")"));

      // show animal eyes
      this.bubbles.filter(nonTrainSelector).selectAll("circle").transition().attr("transform", "scale(".concat(this.iconScale, ", ").concat(this.iconScale, ")"));
    }
  }, {
    key: "showLabels",
    value: function showLabels(subset) {
      var _this6 = this;
      // resolve which subset of labels to show
      var labelSubset = subset === "all" ? [0, 1, 2] : [1];

      // set shared transition state
      var trans = (0, _d3Transition.transition)().duration(1200);
      this.labels.filter(function (d, i) {
        return labelSubset.includes(i);
      }).transition(trans).attr("visibility", "visible").attr("y", function (d) {
        return _this6.yLabelHeight;
      });
      this.labelsRect.filter(function (d, i) {
        return labelSubset.includes(i);
      }).transition(trans).attr("visibility", "visible").attr("y", function (d) {
        return _this6.yLabelHeight;
      });
    }
  }, {
    key: "hideLabels",
    value: function hideLabels(subset) {
      // resolve which subset of labels to hide
      var labelSubset = subset === "all" ? [0, 1, 2] : [0, 2];

      // set shared transition state
      var trans = (0, _d3Transition.transition)().duration(1200);

      // hide labels
      this.labels.filter(function (d, i) {
        return labelSubset.includes(i);
      }).transition(trans).attr("y", -this.HEIGHT / 5);
      this.labelsRect.filter(function (d, i) {
        return labelSubset.includes(i);
      }).transition(trans).attr("y", -this.HEIGHT / 5);
    }
  }, {
    key: "updateDataPosition",
    value: function updateDataPosition() {
      // if feature is both, add validation data to scatter plot
      if (this.currentFeature === "both") {
        this.moveScatter();
      } else if (this.currentFeature === "neither") {
        this.moveCenter();
      } else {
        this.moveBee();
        // show one dimension data for given feature
      }
      this.updateDecisionBoundary(this.currentFeature, true);
    }
  }, {
    key: "trackCurrentGroups",
    value: function trackCurrentGroups(group) {
      var self = this;
      this.currentGroup = group;
      // need to track which data groups are shown, so can easily cycle between in update funcs
      if (group === "train") {
        this.showGroups = ["train"];
      } else if (group === "validation") {
        this.showGroups = ["train", "validation"];
      } else if (group === "test") {
        this.showGroups = ["train", "test", "validation"];
      }
      this.nonShowGroups = this.mainGroups.filter(function (x) {
        return !self.showGroups.includes(x);
      });
    }

    // moveScatter always uses both features, so only needs group
  }, {
    key: "moveScatter",
    value: function moveScatter() {
      var self = this;
      this.simulation.alpha(0.012).force("center", null).force("collide", (0, _d3Force.forceCollide)(self.collideRadius)).force("x", (0, _d3Force.forceX)(function (d) {
        if (self.showGroups.includes(d.group)) {
          return self.fluffScaleX(d["fluffiness"]);
        } else {
          return d.x;
        }
      }).strength(2)).force("y", (0, _d3Force.forceY)(function (d) {
        if (self.showGroups.includes(d.group)) {
          return self.weightScaleY(d["weight"]);
        } else {
          return d.y;
        }
      }).strength(4)).on("tick", changeNetwork);
      function changeNetwork() {
        self.bubbles.filter(function (d) {
          return self.showGroups.includes(d.group);
        }).attr("transform", function (d) {
          return "translate(".concat(d.x, ", ").concat(d.y, ")");
        });
        self.bubbles.filter(function (d) {
          return self.nonShowGroups.includes(d.group);
        }).attr("transform", function (d) {
          var l = 0.01 * self.strength;
          self.nodes.filter(function (d) {
            return self.nonShowGroups.includes(d.group);
          }).forEach(function (d, i) {
            d.vx -= (d.x - self.groups["offscreen"].x) * l;
            d.vy -= (d.y - self.groups["offscreen"].y) * l;
          });
          return "translate(".concat(d.x, ", ").concat(d.y, ")");
        });
      }
    }
  }, {
    key: "moveBee",
    value: function moveBee() {
      var _this7 = this;
      var self = this;

      // handle case where feature is neither, and reset to fluffiness (need for scroll up 3)
      if (this.currentFeature === "neither") {
        this.currentFeature = "weight";
      }
      // determine scale for x-axis
      var scale = this.currentFeature === "weight" ? this.weightScaleX : this.fluffScaleX;
      this.simulation.alpha(0.012).force("center", null).force("collide", (0, _d3Force.forceCollide)(14)).force("x", (0, _d3Force.forceX)(function (d) {
        if (self.showGroups.includes(d.group)) {
          return scale(d[_this7.currentFeature]);
        } else {
          return d.x;
        }
      }).strength(2)).force("y", (0, _d3Force.forceY)(self.HEIGHT / 2).strength(4)).on("tick", changeNetwork);
      function changeNetwork() {
        self.bubbles.filter(function (d) {
          return self.showGroups.includes(d.group);
        }).attr("transform", function (d) {
          return "translate(".concat(d.x, ", ").concat(d.y, ")");
        });
        self.bubbles.filter(function (d) {
          return self.nonShowGroups.includes(d.group);
        }).attr("transform", function (d) {
          var l = 0.01 * self.strength;
          self.nodes.filter(function (d) {
            return self.nonShowGroups.includes(d.group);
          }).forEach(function (d, i) {
            d.vx -= (d.x - self.groups["offscreen"].x) * l;
            d.vy -= (d.y - self.groups["offscreen"].y) * l;
          });
          return "translate(".concat(d.x, ", ").concat(d.y, ")");
        });
      }
    }

    // move nodes to intro
  }, {
    key: "moveBack",
    value: function moveBack() {
      // intro step
      this.current = "intro";

      // hide train, test, validation text boxes
      this.labels.attr("visibility", "hidden");
      this.labelsRect.attr("visibility", "hidden");
    }
  }, {
    key: "addLegend",
    value: function addLegend() {
      var that = this;
      var legendData = ["Train Error", "Test Error"];
      var nodeWidth = function nodeWidth(d) {
        return d.getBBox().width;
      };
      var legend = this.textSvg.append("g").attr("class", "dd-legend").attr("transform", "translate(0,30)");
      var lg = legend.selectAll("g").data(legendData).enter().append("g");
      var legendCircle = lg.append("rect").attr("width", 9.5).attr("height", 8.5).attr("id", function (d, i) {
        return i % 2 == 0 ? "dd-circle-train" : "dd-circle-test";
      }).attr("x", 0).attr("y", 1).attr("stroke-width", 0);
      lg.append("text").attr("class", "dd-legend-text").style("font-size", "14px").attr("x", 11.5).attr("y", 10).text(function (d) {
        return d;
      });
      var offset = 0;
      lg.attr("transform", function (d) {
        var x = offset;
        offset += nodeWidth(this) + 10;
        return "translate(".concat(x, ", ", 0, ")");
      });
    }
  }, {
    key: "redraw",
    value: function redraw() {
      var _this8 = this;
      // aaaa
      var windowWidth = window.innerWidth;
      var self = this;
      // Extract the width and height self was computed by CSS.
      this.MARGIN = {
        TOP: window.innerHeight * 0,
        BOTTOM: window.innerHeight * 0,
        LEFT: window.innerWidth * 0,
        RIGHT: window.innerWidth * 0
      };
      this.WIDTH = window.innerWidth < 950 ? windowWidth / 1.15 : windowWidth / 1.75;
      this.HEIGHT = window.innerWidth < 950 ? window.innerHeight / 1.8 : window.innerHeight / 1.95;

      // Use the extracted size to set the size of an SVG element.
      this.svg.attr("width", this.WIDTH + this.MARGIN.LEFT + this.MARGIN.RIGHT).attr("height", this.HEIGHT + this.MARGIN.TOP + this.MARGIN.BOTTOM);

      // reset group locations
      this.groups = {
        intro: {
          x: this.WIDTH / 2,
          y: this.HEIGHT / 2,
          fullname: "Intro"
        },
        test: {
          x: this.WIDTH / 5.5,
          y: this.yGroupHeight,
          fullname: "Test"
        },
        train: {
          x: this.WIDTH / 2,
          y: this.yGroupHeight,
          fullname: "Train"
        },
        validation: {
          x: this.WIDTH / 1.2,
          y: this.yGroupHeight,
          fullname: "Validation"
        },
        offscreen: {
          x: this.WIDTH / 2,
          y: -window.innerHeight * 0.8,
          fullname: "offscreen"
        }
      }; // end group

      // update scales
      this.fluffScaleX.range([50, this.WIDTH - 50]);
      this.weightScaleX.range([50, this.WIDTH - 50]);
      this.fluffScaleY.range([50, this.HEIGHT - 100]);
      this.weightScaleY.range([50, this.HEIGHT - 100]);

      // adjust animals to shown feature if later step
      if (this.currentGroup !== "pretrain") {
        // update decision boundary (if not train data point)
        self.updateDecisionBoundary(self.currentFeature, true);

        // move labels
        (0, _d3Selection.select)("#x-axis-text").transition().attr("x", this.WIDTH / 2).attr("y", this.HEIGHT * 0.95);
        (0, _d3Selection.select)("#y-axis-text").transition().attr("x", 0 - this.HEIGHT / 2);
      }
      // change each node to new position
      // re-position labels
      this.labels.transition().attr("x", function (d) {
        return _this8.groups[d.name].x;
      });
      this.labelsRect.transition().attr("x", function (d) {
        return _this8.groups[d.name].x - d.bbox.width * 0.5;
      });
    }
  }]);
}();
function eyeAnimations(i) {
  if (i % 5 === 0) {
    return "animal-eye1";
  } else if (i % 3 === 0) {
    return "animal-eye2";
  } else if (i % 2 === 0) {
    return "animal-eye3";
  } else {
    return "animal-eye4";
  }
}
},{"d3-selection":"node_modules/d3-selection/src/index.js","d3-transition":"node_modules/d3-transition/src/index.js","./LogisticRegression":"js/LogisticRegression.js","./data":"js/data.js","./colors":"js/colors.js","d3-array":"node_modules/d3-array/src/index.js","d3-collection":"node_modules/d3-collection/src/index.js","d3-force":"node_modules/d3-force/src/index.js","d3-polygon":"node_modules/d3-polygon/src/index.js","d3-shape":"node_modules/d3-shape/src/index.js","d3-drag":"node_modules/d3-drag/src/index.js","d3-ease":"node_modules/d3-ease/src/index.js","d3-format":"node_modules/d3-format/src/index.js","d3-scale":"node_modules/d3-scale/src/index.js","./animalShapes":"js/animalShapes.js"}],"js/Table.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = void 0;
var _d3Selection = require("d3-selection");
var _d3Collection = require("d3-collection");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Table = exports.Table = /*#__PURE__*/function () {
  function Table(opts) {
    _classCallCheck(this, Table);
    this.tableContainer = opts.tableContainer;
  }
  return _createClass(Table, [{
    key: "drawTable",
    value: function drawTable() {
      // remove table if exists
      (0, _d3Selection.select)("#data-table").remove();

      // set col names
      this.columnNames = ["dataset", "feature", "# cat right", "# cat wrong", "# dog right", "# dog wrong", "accuracy"];

      // draw base table
      this.table = (0, _d3Selection.select)(this.tableContainer).append("table").attr("id", "data-table");

      // add header
      this.thead = this.table.append("thead");

      // add columns
      this.thead.selectAll("th").data(this.columnNames, function (d) {
        return d;
      }).join(function (enter) {
        return enter.append("th").text(function (d) {
          return d;
        });
      }, function (update) {}, function (exit) {});
      this.startData = [];
    }
  }, {
    key: "updateTable",
    value: function updateTable(newRow) {
      var updatedRow = {
        dataset: newRow["dataset"],
        feature: newRow["feature"],
        "# cat right": newRow["cat right"],
        "# cat wrong": newRow["cat wrong"],
        "# dog right": newRow["dog right"],
        "# dog wrong": newRow["dog wrong"],
        accuracy: newRow["accuracy"]
      };

      // update rows
      this.startData.unshift(updatedRow);

      // don't allow duplicates
      this.startData = Array.from(new Set(this.startData.map(JSON.stringify))).map(JSON.parse);
      var rows = this.table.selectAll("tr").data(this.startData).join(function (enter) {
        return enter.append("tr");
      });
      rows.selectAll("td").data(function (row) {
        return (0, _d3Collection.entries)(row);
      }).join(function (enter) {
        return enter.append("td").text(function (d) {
          return d.value;
        });
      }, function (update) {
        return update.text(function (d) {
          return d.value;
        });
      });
    }
  }]);
}();
},{"d3-selection":"node_modules/d3-selection/src/index.js","d3-collection":"node_modules/d3-collection/src/index.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _Bubble = require("./Bubble");
var _Table = require("./Table");
var _d3Selection = require("d3-selection");
// list of sections for intersectin observer to track
var sections = (0, _d3Selection.selectAll)("section").nodes();

// add table to dom
var table = new _Table.Table({
  tableContainer: "#table"
});
var bubbleChart = new _Bubble.Bubble({
  chartContainer: "#chart",
  table: table
});

// options for intersection observer
var options = {
  threshold: 0.7
};

// dict for function calls
var target2event = {
  0: function _() {
    // intro
    (0, _d3Selection.selectAll)(".axes-text").remove();
    bubbleChart.showGroups = ["train", "test", "validation"];
    bubbleChart.showAnimals();
    bubbleChart.currentGroup = "pretrain";
    bubbleChart.currentFeature = "weight";
    bubbleChart.moveBack();
    bubbleChart.colorAnimals("off");
    bubbleChart.hideLabels("all");
  },
  1: function _() {
    // the split
    (0, _d3Selection.selectAll)(".axes-text").remove();
    bubbleChart.currentGroup = "pretrain";
    bubbleChart.currentFeature = "weight";
    bubbleChart.moveNodes();
    bubbleChart.colorAnimals("on");
    bubbleChart.nonShowGroups = ["train", "test", "validation"];
    bubbleChart.showAnimals();
    bubbleChart.showLabels("all");
  },
  2: function _() {
    // train set
    // stuff to do to ensure refresh works
    bubbleChart.colorAnimals("on");
    (0, _d3Selection.selectAll)(".axes-text").remove();
    bubbleChart.nonShowGroups = ["test", "validation"];
    // reset weight button to be active
    (0, _d3Selection.selectAll)("button.button").classed("active", false);
    (0, _d3Selection.select)("button[value=\"weight\"").classed("active", true);
    bubbleChart.currentFeature = "weight";
    (0, _d3Selection.select)(".button-container").style("opacity", 0);
    bubbleChart.trackCurrentGroups("train");
    bubbleChart.showGroups = ["train"];
    bubbleChart.showAnimals();
    bubbleChart.moveNodes();
    bubbleChart.hideNonTrainAnimals();
    bubbleChart.hideLines();
    bubbleChart.hideLabels("train");
    bubbleChart.showLabels("train");
    bubbleChart.currentGroup = "pretrain";
    (0, _d3Selection.select)("#hull-g").style("opacity", 0);
  },
  3: function _() {
    // model
    bubbleChart.nonShowGroups = ["test", "validation"];
    // stuff to do to ensure refresh works
    bubbleChart.colorAnimals("on");
    (0, _d3Selection.selectAll)(".axes-text").remove();
    (0, _d3Selection.select)(".button-container").style("opacity", 1);
    (0, _d3Selection.selectAll)("button.button").classed("active", false);
    (0, _d3Selection.select)("button[value=\"weight\"").classed("active", true);
    (0, _d3Selection.select)("#hull-g").style("opacity", 0);
    bubbleChart.showGroups = ["train"];
    bubbleChart.showAnimals();
    bubbleChart.currentGroup = "train";
    bubbleChart.currentFeature = "weight";
    bubbleChart.trackCurrentGroups("train");
    bubbleChart.hideNonTrainAnimals();
    bubbleChart.moveBee();
    bubbleChart.drawHorizontalLine();
    bubbleChart.drawDecisionBoundary();
    bubbleChart.hideLabels("all");
    bubbleChart.drawAxesLabels("weight");
    // remove table if exists
    (0, _d3Selection.select)("#data-table").remove();
  },
  4: function _() {
    // validation set
    bubbleChart.nonShowGroups = ["test"];
    // stuff to do to ensure refresh works
    bubbleChart.drawHorizontalLine();
    (0, _d3Selection.select)(".button-container").style("opacity", 1);
    bubbleChart.trackCurrentGroups("validation");
    bubbleChart.colorAnimals("on");
    bubbleChart.showAnimals();
    bubbleChart.table.drawTable();
    bubbleChart.updateDataPosition();
    bubbleChart.calculatePerformance();
  },
  5: function _() {
    // test set
    bubbleChart.nonShowGroups = [];
    // stuff to do to ensure refresh works
    bubbleChart.colorAnimals("on");
    bubbleChart.drawHorizontalLine();
    (0, _d3Selection.select)(".button-container").style("opacity", 1);
    bubbleChart.trackCurrentGroups("test");
    // show validation data
    bubbleChart.showAnimals();
    // if table doesn't exist, draw it and calculate perf
    // (useful if refresh on this step)
    if (!document.getElementById("data-table")) {
      bubbleChart.table.drawTable();
    }
    bubbleChart.updateDataPosition();
    bubbleChart.calculatePerformance();
  },
  6: function _() {
    // test set
    bubbleChart.nonShowGroups = [];

    // stuff to do to ensure refresh works
    bubbleChart.colorAnimals("on");
    bubbleChart.drawHorizontalLine();
    (0, _d3Selection.select)(".button-container").style("opacity", 1);
    bubbleChart.trackCurrentGroups("test");
    // show validation data
    bubbleChart.showAnimals();
    // if table doesn't exist, draw it and calculate perf
    // (useful if refresh on this step)
    if (!document.getElementById("data-table")) {
      bubbleChart.table.drawTable();
    }
    bubbleChart.updateDataPosition();
    bubbleChart.calculatePerformance();
  } // fin
};
var observer = new IntersectionObserver(navCheck, options);
var previousY = 0;
var previousRatio = 0;
function navCheck(entries) {
  entries.forEach(function (entry) {
    var currentRatio = entry.intersectionRatio;
    previousRatio = currentRatio;
    var className = entry.target.className;
    var activeAnchor = (0, _d3Selection.select)("[data-page=".concat(className, "]"));

    // check if visible or not
    if (entry.isIntersecting) {
      // resolve stage in graph
      var target = entry.target.className;
      var entryIndex = entry.target.getAttribute("data-index");
      if (entryIndex in target2event) {
        target2event[entryIndex]();
      }
      (0, _d3Selection.selectAll)("a").classed("selected", false);
      activeAnchor.classed("selected", true);
    }
  });
}
sections.forEach(function (section) {
  observer.observe(section);
});
function redraw() {
  // resize chart
  bubbleChart.redraw();
}

// Draw for the first time to initialize.
redraw();

// Redraw based on the new size whenever the browser window is resized.
window.addEventListener("resize", redraw);
(0, _d3Selection.selectAll)("button.button").on("click", function (d) {
  var currentFeature;
  // get value of clicked button

  // update button colors
  (0, _d3Selection.selectAll)("button.button").classed("active", false);
  (0, _d3Selection.select)(this).classed("active", true);
  currentFeature = (0, _d3Selection.select)(this).attr("value");

  // track current feature
  bubbleChart.currentFeature = currentFeature;
  bubbleChart.drawAxesLabels(currentFeature);
  // update decision boundary for current feature
  bubbleChart.updateDecisionBoundary(currentFeature, true);
});
},{"./Bubble":"js/Bubble.js","./Table":"js/Table.js","d3-selection":"node_modules/d3-selection/src/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59313" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map