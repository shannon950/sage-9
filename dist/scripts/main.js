/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@popperjs/core/lib/createPopper.js":
/*!*************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/createPopper.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "popperGenerator": function() { return /* binding */ popperGenerator; },
/* harmony export */   "createPopper": function() { return /* binding */ createPopper; },
/* harmony export */   "detectOverflow": function() { return /* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__["default"]; }
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "../../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "../../node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "../../node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "../../node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "../../node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "../../node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "../../node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ contains; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getBoundingClientRect; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "../../node_modules/@popperjs/core/lib/utils/math.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "../../node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getClippingRect; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "../../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "../../node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "../../node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "../../node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getCompositeRect; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNodeScroll.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isScrollParent.js */ "../../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "../../node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getComputedStyle; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDocumentElement; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDocumentRect; }
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "../../node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getHTMLElementScroll; }
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getLayoutRect; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getNodeName; }
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getNodeScroll; }
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOffsetParent; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getWindow.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isTableElement.js */ "../../node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/userAgent.js */ "../../node_modules/@popperjs/core/lib/utils/userAgent.js");








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getParentNode; }
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getScrollParent; }
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "../../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getViewportRect; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLayoutViewport.js */ "../../node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindow; }
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindowScroll; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindowScrollBarX; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": function() { return /* binding */ isElement; },
/* harmony export */   "isHTMLElement": function() { return /* binding */ isHTMLElement; },
/* harmony export */   "isShadowRoot": function() { return /* binding */ isShadowRoot; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isLayoutViewport; }
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/userAgent.js */ "../../node_modules/@popperjs/core/lib/utils/userAgent.js");

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isScrollParent; }
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isTableElement; }
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ listScrollParents; }
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "../../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/enums.js":
/*!******************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/enums.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "top": function() { return /* binding */ top; },
/* harmony export */   "bottom": function() { return /* binding */ bottom; },
/* harmony export */   "right": function() { return /* binding */ right; },
/* harmony export */   "left": function() { return /* binding */ left; },
/* harmony export */   "auto": function() { return /* binding */ auto; },
/* harmony export */   "basePlacements": function() { return /* binding */ basePlacements; },
/* harmony export */   "start": function() { return /* binding */ start; },
/* harmony export */   "end": function() { return /* binding */ end; },
/* harmony export */   "clippingParents": function() { return /* binding */ clippingParents; },
/* harmony export */   "viewport": function() { return /* binding */ viewport; },
/* harmony export */   "popper": function() { return /* binding */ popper; },
/* harmony export */   "reference": function() { return /* binding */ reference; },
/* harmony export */   "variationPlacements": function() { return /* binding */ variationPlacements; },
/* harmony export */   "placements": function() { return /* binding */ placements; },
/* harmony export */   "beforeRead": function() { return /* binding */ beforeRead; },
/* harmony export */   "read": function() { return /* binding */ read; },
/* harmony export */   "afterRead": function() { return /* binding */ afterRead; },
/* harmony export */   "beforeMain": function() { return /* binding */ beforeMain; },
/* harmony export */   "main": function() { return /* binding */ main; },
/* harmony export */   "afterMain": function() { return /* binding */ afterMain; },
/* harmony export */   "beforeWrite": function() { return /* binding */ beforeWrite; },
/* harmony export */   "write": function() { return /* binding */ write; },
/* harmony export */   "afterWrite": function() { return /* binding */ afterWrite; },
/* harmony export */   "modifierPhases": function() { return /* binding */ modifierPhases; }
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/index.js":
/*!******************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterMain; },
/* harmony export */   "afterRead": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterRead; },
/* harmony export */   "afterWrite": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterWrite; },
/* harmony export */   "auto": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.auto; },
/* harmony export */   "basePlacements": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements; },
/* harmony export */   "beforeMain": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeMain; },
/* harmony export */   "beforeRead": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeRead; },
/* harmony export */   "beforeWrite": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeWrite; },
/* harmony export */   "bottom": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom; },
/* harmony export */   "clippingParents": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents; },
/* harmony export */   "end": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.end; },
/* harmony export */   "left": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.left; },
/* harmony export */   "main": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.main; },
/* harmony export */   "modifierPhases": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases; },
/* harmony export */   "placements": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements; },
/* harmony export */   "popper": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper; },
/* harmony export */   "read": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.read; },
/* harmony export */   "reference": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference; },
/* harmony export */   "right": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.right; },
/* harmony export */   "start": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.start; },
/* harmony export */   "top": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.top; },
/* harmony export */   "variationPlacements": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements; },
/* harmony export */   "viewport": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport; },
/* harmony export */   "write": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.write; },
/* harmony export */   "applyStyles": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles; },
/* harmony export */   "arrow": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.arrow; },
/* harmony export */   "computeStyles": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.computeStyles; },
/* harmony export */   "eventListeners": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.eventListeners; },
/* harmony export */   "flip": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.flip; },
/* harmony export */   "hide": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.hide; },
/* harmony export */   "offset": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.offset; },
/* harmony export */   "popperOffsets": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.popperOffsets; },
/* harmony export */   "preventOverflow": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.preventOverflow; },
/* harmony export */   "popperGenerator": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.popperGenerator; },
/* harmony export */   "detectOverflow": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   "createPopperBase": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.createPopper; },
/* harmony export */   "createPopper": function() { return /* reexport safe */ _popper_js__WEBPACK_IMPORTED_MODULE_4__.createPopper; },
/* harmony export */   "createPopperLite": function() { return /* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__.createPopper; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "../../node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "../../node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPopper.js */ "../../node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper.js */ "../../node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popper-lite.js */ "../../node_modules/@popperjs/core/lib/popper-lite.js");

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "../../node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "../../node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "../../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "../../node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapToStyles": function() { return /* binding */ mapToStyles; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "../../node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "../../node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "../../node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "../../node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "../../node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "../../node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/modifiers/index.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": function() { return /* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "arrow": function() { return /* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   "computeStyles": function() { return /* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   "eventListeners": function() { return /* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   "flip": function() { return /* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   "hide": function() { return /* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]; },
/* harmony export */   "offset": function() { return /* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]; },
/* harmony export */   "popperOffsets": function() { return /* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]; },
/* harmony export */   "preventOverflow": function() { return /* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"]; }
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "../../node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "../../node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "../../node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "../../node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "../../node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "../../node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "../../node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "../../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "../../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "distanceAndSkiddingToXY": function() { return /* binding */ distanceAndSkiddingToXY; }
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "../../node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "../../node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "../../node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "../../node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "../../node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "../../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "../../node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/popper-lite.js":
/*!************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/popper-lite.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": function() { return /* binding */ createPopper; },
/* harmony export */   "popperGenerator": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator; },
/* harmony export */   "defaultModifiers": function() { return /* binding */ defaultModifiers; },
/* harmony export */   "detectOverflow": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"]; }
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "../../node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "../../node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "../../node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "../../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "../../node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "../../node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/popper.js":
/*!*******************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/popper.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": function() { return /* binding */ createPopper; },
/* harmony export */   "popperGenerator": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator; },
/* harmony export */   "defaultModifiers": function() { return /* binding */ defaultModifiers; },
/* harmony export */   "detectOverflow": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]; },
/* harmony export */   "createPopperLite": function() { return /* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper; },
/* harmony export */   "applyStyles": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles; },
/* harmony export */   "arrow": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow; },
/* harmony export */   "computeStyles": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles; },
/* harmony export */   "eventListeners": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners; },
/* harmony export */   "flip": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip; },
/* harmony export */   "hide": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide; },
/* harmony export */   "offset": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset; },
/* harmony export */   "popperOffsets": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets; },
/* harmony export */   "preventOverflow": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow; }
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "../../node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "../../node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "../../node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "../../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "../../node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "../../node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "../../node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "../../node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "../../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "../../node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "../../node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "../../node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "../../node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ computeAutoPlacement; }
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "../../node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "../../node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ computeOffsets; }
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "../../node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "../../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ debounce; }
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ detectOverflow; }
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "../../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "../../node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "../../node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "../../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "../../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "../../node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ expandToHashMap; }
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/format.js":
/*!*************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/format.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ format; }
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getAltAxis; }
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getBasePlacement; }
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getFreshSideObject; }
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getMainAxisFromPlacement; }
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOppositePlacement; }
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOppositeVariationPlacement; }
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getVariation; }
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/math.js":
/*!***********************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/math.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": function() { return /* binding */ max; },
/* harmony export */   "min": function() { return /* binding */ min; },
/* harmony export */   "round": function() { return /* binding */ round; }
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergeByName; }
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergePaddingObject; }
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "../../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ orderModifiers; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ rectToClientRect; }
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ uniqueBy; }
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/userAgent.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/userAgent.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getUAString; }
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ validateModifiers; }
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "../../node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "../../node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "../../node_modules/@popperjs/core/lib/utils/within.js":
/*!*************************************************************!*\
  !*** ../../node_modules/@popperjs/core/lib/utils/within.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "within": function() { return /* binding */ within; },
/* harmony export */   "withinMaxClamp": function() { return /* binding */ withinMaxClamp; }
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "../../node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "../../node_modules/bootstrap/dist/js/bootstrap.esm.js":
/*!*************************************************************!*\
  !*** ../../node_modules/bootstrap/dist/js/bootstrap.esm.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alert": function() { return /* binding */ Alert; },
/* harmony export */   "Button": function() { return /* binding */ Button; },
/* harmony export */   "Carousel": function() { return /* binding */ Carousel; },
/* harmony export */   "Collapse": function() { return /* binding */ Collapse; },
/* harmony export */   "Dropdown": function() { return /* binding */ Dropdown; },
/* harmony export */   "Modal": function() { return /* binding */ Modal; },
/* harmony export */   "Offcanvas": function() { return /* binding */ Offcanvas; },
/* harmony export */   "Popover": function() { return /* binding */ Popover; },
/* harmony export */   "ScrollSpy": function() { return /* binding */ ScrollSpy; },
/* harmony export */   "Tab": function() { return /* binding */ Tab; },
/* harmony export */   "Toast": function() { return /* binding */ Toast; },
/* harmony export */   "Tooltip": function() { return /* binding */ Tooltip; }
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "../../node_modules/@popperjs/core/lib/index.js");
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @popperjs/core */ "../../node_modules/@popperjs/core/lib/popper.js");
/* provided dependency */ var __webpack_provided_window_dot_jQuery = __webpack_require__(/*! jquery */ "jquery");
/*!
  * Bootstrap v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var MAX_UID = 1000000;
var MILLISECONDS_MULTIPLIER = 1000;
var TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

var toType = function (object) {
  if (object === null || object === undefined) {
    return ("" + object);
  }

  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
};
/**
 * Public Util API
 */


var getUID = function (prefix) {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));

  return prefix;
};

var getSelector = function (element) {
  var selector = element.getAttribute('data-bs-target');

  if (!selector || selector === '#') {
    var hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273

    if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
      return null;
    } // Just in case some CMS puts out a full URL with the anchor appended


    if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
      hrefAttribute = "#" + (hrefAttribute.split('#')[1]);
    }

    selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
  }

  return selector;
};

var getSelectorFromElement = function (element) {
  var selector = getSelector(element);

  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }

  return null;
};

var getElementFromSelector = function (element) {
  var selector = getSelector(element);
  return selector ? document.querySelector(selector) : null;
};

var getTransitionDurationFromElement = function (element) {
  if (!element) {
    return 0;
  } // Get transition-duration of the element


  var ref = window.getComputedStyle(element);
  var transitionDuration = ref.transitionDuration;
  var transitionDelay = ref.transitionDelay;
  var floatTransitionDuration = Number.parseFloat(transitionDuration);
  var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  } // If multiple durations are defined, take the first


  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};

var triggerTransitionEnd = function (element) {
  element.dispatchEvent(new Event(TRANSITION_END));
};

var isElement = function (object) {
  if (!object || typeof object !== 'object') {
    return false;
  }

  if (typeof object.jquery !== 'undefined') {
    object = object[0];
  }

  return typeof object.nodeType !== 'undefined';
};

var getElement = function (object) {
  // it's a jQuery object or a node element
  if (isElement(object)) {
    return object.jquery ? object[0] : object;
  }

  if (typeof object === 'string' && object.length > 0) {
    return document.querySelector(object);
  }

  return null;
};

var isVisible = function (element) {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false;
  }

  var elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

  var closedDetails = element.closest('details:not([open])');

  if (!closedDetails) {
    return elementIsVisible;
  }

  if (closedDetails !== element) {
    var summary = element.closest('summary');

    if (summary && summary.parentNode !== closedDetails) {
      return false;
    }

    if (summary === null) {
      return false;
    }
  }

  return elementIsVisible;
};

var isDisabled = function (element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }

  if (element.classList.contains('disabled')) {
    return true;
  }

  if (typeof element.disabled !== 'undefined') {
    return element.disabled;
  }

  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};

var findShadowRoot = function (element) {
  if (!document.documentElement.attachShadow) {
    return null;
  } // Can find the shadow root otherwise it'll return the document


  if (typeof element.getRootNode === 'function') {
    var root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }

  if (element instanceof ShadowRoot) {
    return element;
  } // when we don't find a shadow root


  if (!element.parentNode) {
    return null;
  }

  return findShadowRoot(element.parentNode);
};

var noop = function () {};
/**
 * Trick to restart an element's animation
 *
 * @param {HTMLElement} element
 * @return void
 *
 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */


var reflow = function (element) {
  element.offsetHeight; // eslint-disable-line no-unused-expressions
};

var getjQuery = function () {
  if (__webpack_provided_window_dot_jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return __webpack_provided_window_dot_jQuery;
  }

  return null;
};

var DOMContentLoadedCallbacks = [];

var onDOMContentLoaded = function (callback) {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', function () {
        for (var i = 0, list = DOMContentLoadedCallbacks; i < list.length; i += 1) {
          var callback = list[i];

          callback();
        }
      });
    }

    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};

var isRTL = function () { return document.documentElement.dir === 'rtl'; };

var defineJQueryPlugin = function (plugin) {
  onDOMContentLoaded(function () {
    var $ = getjQuery();
    /* istanbul ignore if */

    if ($) {
      var name = plugin.NAME;
      var JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;

      $.fn[name].noConflict = function () {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};

var execute = function (callback) {
  if (typeof callback === 'function') {
    callback();
  }
};

var executeAfterTransition = function (callback, transitionElement, waitForTransition) {
  if ( waitForTransition === void 0 ) waitForTransition = true;

  if (!waitForTransition) {
    execute(callback);
    return;
  }

  var durationPadding = 5;
  var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  var called = false;

  var handler = function (ref) {
    var target = ref.target;

    if (target !== transitionElement) {
      return;
    }

    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };

  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(function () {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};
/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */


var getNextActiveElement = function (list, activeElement, shouldGetNext, isCycleAllowed) {
  var listLength = list.length;
  var index = list.indexOf(activeElement); // if the element does not exist in the list return an element
  // depending on the direction and if cycle is allowed

  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
  }

  index += shouldGetNext ? 1 : -1;

  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }

  return list[Math.max(0, Math.min(index, listLength - 1))];
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
var stripNameRegex = /\..*/;
var stripUidRegex = /::\d+$/;
var eventRegistry = {}; // Events storage

var uidEvent = 1;
var customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
/**
 * Private methods
 */

function makeEventUid(element, uid) {
  return uid && (uid + "::" + (uidEvent++)) || element.uidEvent || uidEvent++;
}

function getElementEvents(element) {
  var uid = makeEventUid(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}

function bootstrapHandler(element, fn) {
  return function handler(event) {
    hydrateObj(event, {
      delegateTarget: element
    });

    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn);
    }

    return fn.apply(element, [event]);
  };
}

function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    var domElements = element.querySelectorAll(selector);

    for (var target = event.target; target && target !== this; target = target.parentNode) {
      for (var i = 0, list = domElements; i < list.length; i += 1) {
        var domElement = list[i];

        if (domElement !== target) {
          continue;
        }

        hydrateObj(event, {
          delegateTarget: target
        });

        if (handler.oneOff) {
          EventHandler.off(element, event.type, selector, fn);
        }

        return fn.apply(target, [event]);
      }
    }
  };
}

function findHandler(events, callable, delegationSelector) {
  if ( delegationSelector === void 0 ) delegationSelector = null;

  return Object.values(events).find(function (event) { return event.callable === callable && event.delegationSelector === delegationSelector; });
}

function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
  var isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

  var callable = isDelegated ? delegationFunction : handler || delegationFunction;
  var typeEvent = getTypeEvent(originalTypeEvent);

  if (!nativeEvents.has(typeEvent)) {
    typeEvent = originalTypeEvent;
  }

  return [isDelegated, callable, typeEvent];
}

function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return;
  }

  var ref = normalizeParameters(originalTypeEvent, handler, delegationFunction);
  var isDelegated = ref[0];
  var callable = ref[1];
  var typeEvent = ref[2]; // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does

  if (originalTypeEvent in customEvents) {
    var wrapFunction = function (fn) {
      return function (event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn.call(this, event);
        }
      };
    };

    callable = wrapFunction(callable);
  }

  var events = getElementEvents(element);
  var handlers = events[typeEvent] || (events[typeEvent] = {});
  var previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);

  if (previousFunction) {
    previousFunction.oneOff = previousFunction.oneOff && oneOff;
    return;
  }

  var uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
  var fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
  fn.delegationSelector = isDelegated ? handler : null;
  fn.callable = callable;
  fn.oneOff = oneOff;
  fn.uidEvent = uid;
  handlers[uid] = fn;
  element.addEventListener(typeEvent, fn, isDelegated);
}

function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  var fn = findHandler(events[typeEvent], handler, delegationSelector);

  if (!fn) {
    return;
  }

  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
  delete events[typeEvent][fn.uidEvent];
}

function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  var storeElementEvent = events[typeEvent] || {};

  for (var i = 0, list = Object.keys(storeElementEvent); i < list.length; i += 1) {
    var handlerKey = list[i];

    if (handlerKey.includes(namespace)) {
      var event = storeElementEvent[handlerKey];
      removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    }
  }
}

function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '');
  return customEvents[event] || event;
}

var EventHandler = {
  on: function on(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, false);
  },

  one: function one(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, true);
  },

  off: function off(element, originalTypeEvent, handler, delegationFunction) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    var ref = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    var isDelegated = ref[0];
    var callable = ref[1];
    var typeEvent = ref[2];
    var inNamespace = typeEvent !== originalTypeEvent;
    var events = getElementEvents(element);
    var storeElementEvent = events[typeEvent] || {};
    var isNamespace = originalTypeEvent.startsWith('.');

    if (typeof callable !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!Object.keys(storeElementEvent).length) {
        return;
      }

      removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
      return;
    }

    if (isNamespace) {
      for (var i = 0, list = Object.keys(events); i < list.length; i += 1) {
        var elementEvent = list[i];

        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      }
    }

    for (var i$1 = 0, list$1 = Object.keys(storeElementEvent); i$1 < list$1.length; i$1 += 1) {
      var keyHandlers = list$1[i$1];

      var handlerKey = keyHandlers.replace(stripUidRegex, '');

      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        var event = storeElementEvent[keyHandlers];
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  },

  trigger: function trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null;
    }

    var $ = getjQuery();
    var typeEvent = getTypeEvent(event);
    var inNamespace = event !== typeEvent;
    var jQueryEvent = null;
    var bubbles = true;
    var nativeDispatch = true;
    var defaultPrevented = false;

    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }

    var evt = new Event(event, {
      bubbles: bubbles,
      cancelable: true
    });
    evt = hydrateObj(evt, args);

    if (defaultPrevented) {
      evt.preventDefault();
    }

    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }

    if (evt.defaultPrevented && jQueryEvent) {
      jQueryEvent.preventDefault();
    }

    return evt;
  }

};

function hydrateObj(obj, meta) {
  var loop = function () {
    var ref = list[i];
    var key = ref[0];
    var value = ref[1];

    try {
      obj[key] = value;
    } catch (_unused) {
      Object.defineProperty(obj, key, {
        configurable: true,

        get: function get() {
          return value;
        }

      });
    }
  };

  for (var i = 0, list = Object.entries(meta || {}); i < list.length; i += 1) loop();

  return obj;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */
var elementMap = new Map();
var Data = {
  set: function set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }

    var instanceMap = elementMap.get(element); // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used

    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error(("Bootstrap doesn't allow more than one instance per element. Bound instance: " + (Array.from(instanceMap.keys())[0]) + "."));
      return;
    }

    instanceMap.set(key, instance);
  },

  get: function get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }

    return null;
  },

  remove: function remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }

    var instanceMap = elementMap.get(element);
    instanceMap.delete(key); // free up element references if there are no instances left for an element

    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
function normalizeData(value) {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (value === Number(value).toString()) {
    return Number(value);
  }

  if (value === '' || value === 'null') {
    return null;
  }

  if (typeof value !== 'string') {
    return value;
  }

  try {
    return JSON.parse(decodeURIComponent(value));
  } catch (_unused) {
    return value;
  }
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, function (chr) { return ("-" + (chr.toLowerCase())); });
}

var Manipulator = {
  setDataAttribute: function setDataAttribute(element, key, value) {
    element.setAttribute(("data-bs-" + (normalizeDataKey(key))), value);
  },

  removeDataAttribute: function removeDataAttribute(element, key) {
    element.removeAttribute(("data-bs-" + (normalizeDataKey(key))));
  },

  getDataAttributes: function getDataAttributes(element) {
    if (!element) {
      return {};
    }

    var attributes = {};
    var bsKeys = Object.keys(element.dataset).filter(function (key) { return key.startsWith('bs') && !key.startsWith('bsConfig'); });

    for (var i = 0, list = bsKeys; i < list.length; i += 1) {
      var key = list[i];

      var pureKey = key.replace(/^bs/, '');
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    }

    return attributes;
  },

  getDataAttribute: function getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(("data-bs-" + (normalizeDataKey(key)))));
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): util/config.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Class definition
 */

var Config = function Config () {};

var staticAccessors = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } };

staticAccessors.Default.get = function () {
  return {};
};

staticAccessors.DefaultType.get = function () {
  return {};
};

staticAccessors.NAME.get = function () {
  throw new Error('You have to implement the static method "NAME", for each component!');
};

Config.prototype._getConfig = function _getConfig (config) {
  config = this._mergeConfigObj(config);
  config = this._configAfterMerge(config);

  this._typeCheckConfig(config);

  return config;
};

Config.prototype._configAfterMerge = function _configAfterMerge (config) {
  return config;
};

Config.prototype._mergeConfigObj = function _mergeConfigObj (config, element) {
  var jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

  return Object.assign({}, this.constructor.Default,
    (typeof jsonConfig === 'object' ? jsonConfig : {}),
    (isElement(element) ? Manipulator.getDataAttributes(element) : {}),
    (typeof config === 'object' ? config : {}));
};

Config.prototype._typeCheckConfig = function _typeCheckConfig (config, configTypes) {
    if ( configTypes === void 0 ) configTypes = this.constructor.DefaultType;

  for (var i = 0, list = Object.keys(configTypes); i < list.length; i += 1) {
    var property = list[i];

      var expectedTypes = configTypes[property];
    var value = config[property];
    var valueType = isElement(value) ? 'element' : toType(value);

    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError(((this.constructor.NAME.toUpperCase()) + ": Option \"" + property + "\" provided type \"" + valueType + "\" but expected type \"" + expectedTypes + "\"."));
    }
  }
};

Object.defineProperties( Config, staticAccessors );

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var VERSION = '5.2.2';
/**
 * Class definition
 */

var BaseComponent = /*@__PURE__*/(function (Config) {
  function BaseComponent(element, config) {
    Config.call(this);
    element = getElement(element);

    if (!element) {
      return;
    }

    this._element = element;
    this._config = this._getConfig(config);
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  if ( Config ) BaseComponent.__proto__ = Config;
  BaseComponent.prototype = Object.create( Config && Config.prototype );
  BaseComponent.prototype.constructor = BaseComponent;

  var staticAccessors$1 = { VERSION: { configurable: true },DATA_KEY: { configurable: true },EVENT_KEY: { configurable: true } }; // Public


  BaseComponent.prototype.dispose = function dispose () {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);

    for (var i = 0, list = Object.getOwnPropertyNames(this); i < list.length; i += 1) {
      var propertyName = list[i];

      this[propertyName] = null;
    }
  };

  BaseComponent.prototype._queueCallback = function _queueCallback (callback, element, isAnimated) {
    if ( isAnimated === void 0 ) isAnimated = true;

    executeAfterTransition(callback, element, isAnimated);
  };

  BaseComponent.prototype._getConfig = function _getConfig (config) {
    config = this._mergeConfigObj(config, this._element);
    config = this._configAfterMerge(config);

    this._typeCheckConfig(config);

    return config;
  }; // Static


  BaseComponent.getInstance = function getInstance (element) {
    return Data.get(getElement(element), this.DATA_KEY);
  };

  BaseComponent.getOrCreateInstance = function getOrCreateInstance (element, config) {
    if ( config === void 0 ) config = {};

    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
  };

  staticAccessors$1.VERSION.get = function () {
    return VERSION;
  };

  staticAccessors$1.DATA_KEY.get = function () {
    return ("bs." + (this.NAME));
  };

  staticAccessors$1.EVENT_KEY.get = function () {
    return ("." + (this.DATA_KEY));
  };

  BaseComponent.eventName = function eventName (name) {
    return ("" + name + (this.EVENT_KEY));
  };

  Object.defineProperties( BaseComponent, staticAccessors$1 );

  return BaseComponent;
}(Config));

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): util/component-functions.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

var enableDismissTrigger = function (component, method) {
  if ( method === void 0 ) method = 'hide';

  var clickEvent = "click.dismiss" + (component.EVENT_KEY);
  var name = component.NAME;
  EventHandler.on(document, clickEvent, ("[data-bs-dismiss=\"" + name + "\"]"), function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    var target = getElementFromSelector(this) || this.closest(("." + name));
    var instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

    instance[method]();
  });
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$f = 'alert';
var DATA_KEY$a = 'bs.alert';
var EVENT_KEY$b = "." + DATA_KEY$a;
var EVENT_CLOSE = "close" + EVENT_KEY$b;
var EVENT_CLOSED = "closed" + EVENT_KEY$b;
var CLASS_NAME_FADE$5 = 'fade';
var CLASS_NAME_SHOW$8 = 'show';
/**
 * Class definition
 */

var Alert = /*@__PURE__*/(function (BaseComponent) {
  function Alert () {
    BaseComponent.apply(this, arguments);
  }

  if ( BaseComponent ) Alert.__proto__ = BaseComponent;
  Alert.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  Alert.prototype.constructor = Alert;

  var staticAccessors$2 = { NAME: { configurable: true } };

  staticAccessors$2.NAME.get = function () {
    return NAME$f;
  }; // Public


  Alert.prototype.close = function close () {
    var this$1 = this;

    var closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);

    if (closeEvent.defaultPrevented) {
      return;
    }

    this._element.classList.remove(CLASS_NAME_SHOW$8);

    var isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);

    this._queueCallback(function () { return this$1._destroyElement(); }, this._element, isAnimated);
  }; // Private


  Alert.prototype._destroyElement = function _destroyElement () {
    this._element.remove();

    EventHandler.trigger(this._element, EVENT_CLOSED);
    this.dispose();
  }; // Static


  Alert.jQueryInterface = function jQueryInterface (config) {
    return this.each(function () {
      var data = Alert.getOrCreateInstance(this);

      if (typeof config !== 'string') {
        return;
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(("No method named \"" + config + "\""));
      }

      data[config](this);
    });
  };

  Object.defineProperties( Alert, staticAccessors$2 );

  return Alert;
}(BaseComponent));
/**
 * Data API implementation
 */


enableDismissTrigger(Alert, 'close');
/**
 * jQuery
 */

defineJQueryPlugin(Alert);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$e = 'button';
var DATA_KEY$9 = 'bs.button';
var EVENT_KEY$a = "." + DATA_KEY$9;
var DATA_API_KEY$6 = '.data-api';
var CLASS_NAME_ACTIVE$3 = 'active';
var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
var EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$a + DATA_API_KEY$6;
/**
 * Class definition
 */

var Button = /*@__PURE__*/(function (BaseComponent) {
  function Button () {
    BaseComponent.apply(this, arguments);
  }

  if ( BaseComponent ) Button.__proto__ = BaseComponent;
  Button.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  Button.prototype.constructor = Button;

  var staticAccessors$3 = { NAME: { configurable: true } };

  staticAccessors$3.NAME.get = function () {
    return NAME$e;
  }; // Public


  Button.prototype.toggle = function toggle () {
    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  }; // Static


  Button.jQueryInterface = function jQueryInterface (config) {
    return this.each(function () {
      var data = Button.getOrCreateInstance(this);

      if (config === 'toggle') {
        data[config]();
      }
    });
  };

  Object.defineProperties( Button, staticAccessors$3 );

  return Button;
}(BaseComponent));
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, function (event) {
  event.preventDefault();
  var button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  var data = Button.getOrCreateInstance(button);
  data.toggle();
});
/**
 * jQuery
 */

defineJQueryPlugin(Button);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var SelectorEngine = {
  find: function find(selector, element) {
    var ref;

    if ( element === void 0 ) element = document.documentElement;
    return (ref = []).concat.apply(ref, Element.prototype.querySelectorAll.call(element, selector));
  },

  findOne: function findOne(selector, element) {
    if ( element === void 0 ) element = document.documentElement;

    return Element.prototype.querySelector.call(element, selector);
  },

  children: function children(element, selector) {
    var ref;

    return (ref = []).concat.apply(ref, element.children).filter(function (child) { return child.matches(selector); });
  },

  parents: function parents(element, selector) {
    var parents = [];
    var ancestor = element.parentNode.closest(selector);

    while (ancestor) {
      parents.push(ancestor);
      ancestor = ancestor.parentNode.closest(selector);
    }

    return parents;
  },

  prev: function prev(element, selector) {
    var previous = element.previousElementSibling;

    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }

      previous = previous.previousElementSibling;
    }

    return [];
  },

  // TODO: this is now unused; remove later along with prev()
  next: function next(element, selector) {
    var next = element.nextElementSibling;

    while (next) {
      if (next.matches(selector)) {
        return [next];
      }

      next = next.nextElementSibling;
    }

    return [];
  },

  focusableChildren: function focusableChildren(element) {
    var focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(function (selector) { return (selector + ":not([tabindex^=\"-\"])"); }).join(',');
    return this.find(focusables, element).filter(function (el) { return !isDisabled(el) && isVisible(el); });
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): util/swipe.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$d = 'swipe';
var EVENT_KEY$9 = '.bs.swipe';
var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$9;
var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$9;
var EVENT_TOUCHEND = "touchend" + EVENT_KEY$9;
var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$9;
var EVENT_POINTERUP = "pointerup" + EVENT_KEY$9;
var POINTER_TYPE_TOUCH = 'touch';
var POINTER_TYPE_PEN = 'pen';
var CLASS_NAME_POINTER_EVENT = 'pointer-event';
var SWIPE_THRESHOLD = 40;
var Default$c = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
};
var DefaultType$c = {
  endCallback: '(function|null)',
  leftCallback: '(function|null)',
  rightCallback: '(function|null)'
};
/**
 * Class definition
 */

var Swipe = /*@__PURE__*/(function (Config) {
  function Swipe(element, config) {
    Config.call(this);
    this._element = element;

    if (!element || !Swipe.isSupported()) {
      return;
    }

    this._config = this._getConfig(config);
    this._deltaX = 0;
    this._supportPointerEvents = Boolean(window.PointerEvent);

    this._initEvents();
  }

  if ( Config ) Swipe.__proto__ = Config;
  Swipe.prototype = Object.create( Config && Config.prototype );
  Swipe.prototype.constructor = Swipe;

  var staticAccessors$4 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$4.Default.get = function () {
    return Default$c;
  };

  staticAccessors$4.DefaultType.get = function () {
    return DefaultType$c;
  };

  staticAccessors$4.NAME.get = function () {
    return NAME$d;
  }; // Public


  Swipe.prototype.dispose = function dispose () {
    EventHandler.off(this._element, EVENT_KEY$9);
  }; // Private


  Swipe.prototype._start = function _start (event) {
    if (!this._supportPointerEvents) {
      this._deltaX = event.touches[0].clientX;
      return;
    }

    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX;
    }
  };

  Swipe.prototype._end = function _end (event) {
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX - this._deltaX;
    }

    this._handleSwipe();

    execute(this._config.endCallback);
  };

  Swipe.prototype._move = function _move (event) {
    this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
  };

  Swipe.prototype._handleSwipe = function _handleSwipe () {
    var absDeltaX = Math.abs(this._deltaX);

    if (absDeltaX <= SWIPE_THRESHOLD) {
      return;
    }

    var direction = absDeltaX / this._deltaX;
    this._deltaX = 0;

    if (!direction) {
      return;
    }

    execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
  };

  Swipe.prototype._initEvents = function _initEvents () {
    var this$1 = this;

    if (this._supportPointerEvents) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) { return this$1._start(event); });
      EventHandler.on(this._element, EVENT_POINTERUP, function (event) { return this$1._end(event); });

      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) { return this$1._start(event); });
      EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) { return this$1._move(event); });
      EventHandler.on(this._element, EVENT_TOUCHEND, function (event) { return this$1._end(event); });
    }
  };

  Swipe.prototype._eventIsPointerPenTouch = function _eventIsPointerPenTouch (event) {
    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
  }; // Static


  Swipe.isSupported = function isSupported () {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
  };

  Object.defineProperties( Swipe, staticAccessors$4 );

  return Swipe;
}(Config));

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$c = 'carousel';
var DATA_KEY$8 = 'bs.carousel';
var EVENT_KEY$8 = "." + DATA_KEY$8;
var DATA_API_KEY$5 = '.data-api';
var ARROW_LEFT_KEY$1 = 'ArrowLeft';
var ARROW_RIGHT_KEY$1 = 'ArrowRight';
var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

var ORDER_NEXT = 'next';
var ORDER_PREV = 'prev';
var DIRECTION_LEFT = 'left';
var DIRECTION_RIGHT = 'right';
var EVENT_SLIDE = "slide" + EVENT_KEY$8;
var EVENT_SLID = "slid" + EVENT_KEY$8;
var EVENT_KEYDOWN$1 = "keydown" + EVENT_KEY$8;
var EVENT_MOUSEENTER$1 = "mouseenter" + EVENT_KEY$8;
var EVENT_MOUSELEAVE$1 = "mouseleave" + EVENT_KEY$8;
var EVENT_DRAG_START = "dragstart" + EVENT_KEY$8;
var EVENT_LOAD_DATA_API$3 = "load" + EVENT_KEY$8 + DATA_API_KEY$5;
var EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$8 + DATA_API_KEY$5;
var CLASS_NAME_CAROUSEL = 'carousel';
var CLASS_NAME_ACTIVE$2 = 'active';
var CLASS_NAME_SLIDE = 'slide';
var CLASS_NAME_END = 'carousel-item-end';
var CLASS_NAME_START = 'carousel-item-start';
var CLASS_NAME_NEXT = 'carousel-item-next';
var CLASS_NAME_PREV = 'carousel-item-prev';
var SELECTOR_ACTIVE = '.active';
var SELECTOR_ITEM = '.carousel-item';
var SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
var SELECTOR_ITEM_IMG = '.carousel-item img';
var SELECTOR_INDICATORS = '.carousel-indicators';
var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
var KEY_TO_DIRECTION = {};
KEY_TO_DIRECTION[ARROW_LEFT_KEY$1] = DIRECTION_RIGHT;
KEY_TO_DIRECTION[ARROW_RIGHT_KEY$1] = DIRECTION_LEFT;
var Default$b = {
  interval: 5000,
  keyboard: true,
  pause: 'hover',
  ride: false,
  touch: true,
  wrap: true
};
var DefaultType$b = {
  interval: '(number|boolean)',
  // TODO:v6 remove boolean support
  keyboard: 'boolean',
  pause: '(string|boolean)',
  ride: '(boolean|string)',
  touch: 'boolean',
  wrap: 'boolean'
};
/**
 * Class definition
 */

var Carousel = /*@__PURE__*/(function (BaseComponent) {
  function Carousel(element, config) {
    BaseComponent.call(this, element, config);
    this._interval = null;
    this._activeElement = null;
    this._isSliding = false;
    this.touchTimeout = null;
    this._swipeHelper = null;
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);

    this._addEventListeners();

    if (this._config.ride === CLASS_NAME_CAROUSEL) {
      this.cycle();
    }
  }

  if ( BaseComponent ) Carousel.__proto__ = BaseComponent;
  Carousel.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  Carousel.prototype.constructor = Carousel;

  var staticAccessors$5 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$5.Default.get = function () {
    return Default$b;
  };

  staticAccessors$5.DefaultType.get = function () {
    return DefaultType$b;
  };

  staticAccessors$5.NAME.get = function () {
    return NAME$c;
  }; // Public


  Carousel.prototype.next = function next () {
    this._slide(ORDER_NEXT);
  };

  Carousel.prototype.nextWhenVisible = function nextWhenVisible () {
    // FIXME TODO use `document.visibilityState`
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  };

  Carousel.prototype.prev = function prev () {
    this._slide(ORDER_PREV);
  };

  Carousel.prototype.pause = function pause () {
    if (this._isSliding) {
      triggerTransitionEnd(this._element);
    }

    this._clearInterval();
  };

  Carousel.prototype.cycle = function cycle () {
    var this$1 = this;

    this._clearInterval();

    this._updateInterval();

    this._interval = setInterval(function () { return this$1.nextWhenVisible(); }, this._config.interval);
  };

  Carousel.prototype._maybeEnableCycle = function _maybeEnableCycle () {
    var this$1 = this;

    if (!this._config.ride) {
      return;
    }

    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, function () { return this$1.cycle(); });
      return;
    }

    this.cycle();
  };

  Carousel.prototype.to = function to (index) {
    var this$1 = this;

    var items = this._getItems();

    if (index > items.length - 1 || index < 0) {
      return;
    }

    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, function () { return this$1.to(index); });
      return;
    }

    var activeIndex = this._getItemIndex(this._getActive());

    if (activeIndex === index) {
      return;
    }

    var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

    this._slide(order, items[index]);
  };

  Carousel.prototype.dispose = function dispose () {
    if (this._swipeHelper) {
      this._swipeHelper.dispose();
    }

    BaseComponent.prototype.dispose.call(this);
  }; // Private


  Carousel.prototype._configAfterMerge = function _configAfterMerge (config) {
    config.defaultInterval = config.interval;
    return config;
  };

  Carousel.prototype._addEventListeners = function _addEventListeners () {
    var this$1 = this;

    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN$1, function (event) { return this$1._keydown(event); });
    }

    if (this._config.pause === 'hover') {
      EventHandler.on(this._element, EVENT_MOUSEENTER$1, function () { return this$1.pause(); });
      EventHandler.on(this._element, EVENT_MOUSELEAVE$1, function () { return this$1._maybeEnableCycle(); });
    }

    if (this._config.touch && Swipe.isSupported()) {
      this._addTouchEventListeners();
    }
  };

  Carousel.prototype._addTouchEventListeners = function _addTouchEventListeners () {
    var this$1 = this;

    for (var i = 0, list = SelectorEngine.find(SELECTOR_ITEM_IMG, this._element); i < list.length; i += 1) {
      var img = list[i];

      EventHandler.on(img, EVENT_DRAG_START, function (event) { return event.preventDefault(); });
    }

    var endCallBack = function () {
      if (this$1._config.pause !== 'hover') {
        return;
      } // If it's a touch-enabled device, mouseenter/leave are fired as
      // part of the mouse compatibility events on first tap - the carousel
      // would stop cycling until user tapped out of it;
      // here, we listen for touchend, explicitly pause the carousel
      // (as if it's the second time we tap on it, mouseenter compat event
      // is NOT fired) and after a timeout (to allow for mouse compatibility
      // events to fire) we explicitly restart cycling


      this$1.pause();

      if (this$1.touchTimeout) {
        clearTimeout(this$1.touchTimeout);
      }

      this$1.touchTimeout = setTimeout(function () { return this$1._maybeEnableCycle(); }, TOUCHEVENT_COMPAT_WAIT + this$1._config.interval);
    };

    var swipeConfig = {
      leftCallback: function () { return this$1._slide(this$1._directionToOrder(DIRECTION_LEFT)); },
      rightCallback: function () { return this$1._slide(this$1._directionToOrder(DIRECTION_RIGHT)); },
      endCallback: endCallBack
    };
    this._swipeHelper = new Swipe(this._element, swipeConfig);
  };

  Carousel.prototype._keydown = function _keydown (event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }

    var direction = KEY_TO_DIRECTION[event.key];

    if (direction) {
      event.preventDefault();

      this._slide(this._directionToOrder(direction));
    }
  };

  Carousel.prototype._getItemIndex = function _getItemIndex (element) {
    return this._getItems().indexOf(element);
  };

  Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement (index) {
    if (!this._indicatorsElement) {
      return;
    }

    var activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
    activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
    activeIndicator.removeAttribute('aria-current');
    var newActiveIndicator = SelectorEngine.findOne(("[data-bs-slide-to=\"" + index + "\"]"), this._indicatorsElement);

    if (newActiveIndicator) {
      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
      newActiveIndicator.setAttribute('aria-current', 'true');
    }
  };

  Carousel.prototype._updateInterval = function _updateInterval () {
    var element = this._activeElement || this._getActive();

    if (!element) {
      return;
    }

    var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
    this._config.interval = elementInterval || this._config.defaultInterval;
  };

  Carousel.prototype._slide = function _slide (order, element) {
    var this$1 = this;
    if ( element === void 0 ) element = null;

    if (this._isSliding) {
      return;
    }

    var activeElement = this._getActive();

    var isNext = order === ORDER_NEXT;
    var nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);

    if (nextElement === activeElement) {
      return;
    }

    var nextElementIndex = this._getItemIndex(nextElement);

    var triggerEvent = function (eventName) {
      return EventHandler.trigger(this$1._element, eventName, {
        relatedTarget: nextElement,
        direction: this$1._orderToDirection(order),
        from: this$1._getItemIndex(activeElement),
        to: nextElementIndex
      });
    };

    var slideEvent = triggerEvent(EVENT_SLIDE);

    if (slideEvent.defaultPrevented) {
      return;
    }

    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      // todo: change tests that use empty divs to avoid this check
      return;
    }

    var isCycling = Boolean(this._interval);
    this.pause();
    this._isSliding = true;

    this._setActiveIndicatorElement(nextElementIndex);

    this._activeElement = nextElement;
    var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
    nextElement.classList.add(orderClassName);
    reflow(nextElement);
    activeElement.classList.add(directionalClassName);
    nextElement.classList.add(directionalClassName);

    var completeCallBack = function () {
      nextElement.classList.remove(directionalClassName, orderClassName);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
      this$1._isSliding = false;
      triggerEvent(EVENT_SLID);
    };

    this._queueCallback(completeCallBack, activeElement, this._isAnimated());

    if (isCycling) {
      this.cycle();
    }
  };

  Carousel.prototype._isAnimated = function _isAnimated () {
    return this._element.classList.contains(CLASS_NAME_SLIDE);
  };

  Carousel.prototype._getActive = function _getActive () {
    return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
  };

  Carousel.prototype._getItems = function _getItems () {
    return SelectorEngine.find(SELECTOR_ITEM, this._element);
  };

  Carousel.prototype._clearInterval = function _clearInterval () {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  };

  Carousel.prototype._directionToOrder = function _directionToOrder (direction) {
    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }

    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  };

  Carousel.prototype._orderToDirection = function _orderToDirection (order) {
    if (isRTL()) {
      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  }; // Static


  Carousel.jQueryInterface = function jQueryInterface (config) {
    return this.each(function () {
      var data = Carousel.getOrCreateInstance(this, config);

      if (typeof config === 'number') {
        data.to(config);
        return;
      }

      if (typeof config === 'string') {
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(("No method named \"" + config + "\""));
        }

        data[config]();
      }
    });
  };

  Object.defineProperties( Carousel, staticAccessors$5 );

  return Carousel;
}(BaseComponent));
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
  var target = getElementFromSelector(this);

  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
    return;
  }

  event.preventDefault();
  var carousel = Carousel.getOrCreateInstance(target);
  var slideIndex = this.getAttribute('data-bs-slide-to');

  if (slideIndex) {
    carousel.to(slideIndex);

    carousel._maybeEnableCycle();

    return;
  }

  if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
    carousel.next();

    carousel._maybeEnableCycle();

    return;
  }

  carousel.prev();

  carousel._maybeEnableCycle();
});
EventHandler.on(window, EVENT_LOAD_DATA_API$3, function () {
  var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

  for (var i = 0, list = carousels; i < list.length; i += 1) {
    var carousel = list[i];

    Carousel.getOrCreateInstance(carousel);
  }
});
/**
 * jQuery
 */

defineJQueryPlugin(Carousel);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$b = 'collapse';
var DATA_KEY$7 = 'bs.collapse';
var EVENT_KEY$7 = "." + DATA_KEY$7;
var DATA_API_KEY$4 = '.data-api';
var EVENT_SHOW$6 = "show" + EVENT_KEY$7;
var EVENT_SHOWN$6 = "shown" + EVENT_KEY$7;
var EVENT_HIDE$6 = "hide" + EVENT_KEY$7;
var EVENT_HIDDEN$6 = "hidden" + EVENT_KEY$7;
var EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$7 + DATA_API_KEY$4;
var CLASS_NAME_SHOW$7 = 'show';
var CLASS_NAME_COLLAPSE = 'collapse';
var CLASS_NAME_COLLAPSING = 'collapsing';
var CLASS_NAME_COLLAPSED = 'collapsed';
var CLASS_NAME_DEEPER_CHILDREN = ":scope ." + CLASS_NAME_COLLAPSE + " ." + CLASS_NAME_COLLAPSE;
var CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
var WIDTH = 'width';
var HEIGHT = 'height';
var SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
var Default$a = {
  parent: null,
  toggle: true
};
var DefaultType$a = {
  parent: '(null|element)',
  toggle: 'boolean'
};
/**
 * Class definition
 */

var Collapse = /*@__PURE__*/(function (BaseComponent) {
  function Collapse(element, config) {
    var this$1 = this;

    BaseComponent.call(this, element, config);
    this._isTransitioning = false;
    this._triggerArray = [];
    var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

    for (var i = 0, list = toggleList; i < list.length; i += 1) {
      var elem = list[i];

      var selector = getSelectorFromElement(elem);
      var filterElement = SelectorEngine.find(selector).filter(function (foundElement) { return foundElement === this$1._element; });

      if (selector !== null && filterElement.length) {
        this._triggerArray.push(elem);
      }
    }

    this._initializeChildren();

    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    }

    if (this._config.toggle) {
      this.toggle();
    }
  }

  if ( BaseComponent ) Collapse.__proto__ = BaseComponent;
  Collapse.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  Collapse.prototype.constructor = Collapse;

  var staticAccessors$6 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$6.Default.get = function () {
    return Default$a;
  };

  staticAccessors$6.DefaultType.get = function () {
    return DefaultType$a;
  };

  staticAccessors$6.NAME.get = function () {
    return NAME$b;
  }; // Public


  Collapse.prototype.toggle = function toggle () {
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  };

  Collapse.prototype.show = function show () {
    var this$1 = this;

    if (this._isTransitioning || this._isShown()) {
      return;
    }

    var activeChildren = []; // find active children

    if (this._config.parent) {
      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(function (element) { return element !== this$1._element; }).map(function (element) { return Collapse.getOrCreateInstance(element, {
        toggle: false
      }); });
    }

    if (activeChildren.length && activeChildren[0]._isTransitioning) {
      return;
    }

    var startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);

    if (startEvent.defaultPrevented) {
      return;
    }

    for (var i = 0, list = activeChildren; i < list.length; i += 1) {
      var activeInstance = list[i];

      activeInstance.hide();
    }

    var dimension = this._getDimension();

    this._element.classList.remove(CLASS_NAME_COLLAPSE);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.style[dimension] = 0;

    this._addAriaAndCollapsedClass(this._triggerArray, true);

    this._isTransitioning = true;

    var complete = function () {
      this$1._isTransitioning = false;

      this$1._element.classList.remove(CLASS_NAME_COLLAPSING);

      this$1._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

      this$1._element.style[dimension] = '';
      EventHandler.trigger(this$1._element, EVENT_SHOWN$6);
    };

    var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    var scrollSize = "scroll" + capitalizedDimension;

    this._queueCallback(complete, this._element, true);

    this._element.style[dimension] = (this._element[scrollSize]) + "px";
  };

  Collapse.prototype.hide = function hide () {
    var this$1 = this;

    if (this._isTransitioning || !this._isShown()) {
      return;
    }

    var startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);

    if (startEvent.defaultPrevented) {
      return;
    }

    var dimension = this._getDimension();

    this._element.style[dimension] = (this._element.getBoundingClientRect()[dimension]) + "px";
    reflow(this._element);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

    for (var i = 0, list = this._triggerArray; i < list.length; i += 1) {
      var trigger = list[i];

      var element = getElementFromSelector(trigger);

      if (element && !this._isShown(element)) {
        this._addAriaAndCollapsedClass([trigger], false);
      }
    }

    this._isTransitioning = true;

    var complete = function () {
      this$1._isTransitioning = false;

      this$1._element.classList.remove(CLASS_NAME_COLLAPSING);

      this$1._element.classList.add(CLASS_NAME_COLLAPSE);

      EventHandler.trigger(this$1._element, EVENT_HIDDEN$6);
    };

    this._element.style[dimension] = '';

    this._queueCallback(complete, this._element, true);
  };

  Collapse.prototype._isShown = function _isShown (element) {
    if ( element === void 0 ) element = this._element;

    return element.classList.contains(CLASS_NAME_SHOW$7);
  }; // Private


  Collapse.prototype._configAfterMerge = function _configAfterMerge (config) {
    config.toggle = Boolean(config.toggle); // Coerce string values

    config.parent = getElement(config.parent);
    return config;
  };

  Collapse.prototype._getDimension = function _getDimension () {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  };

  Collapse.prototype._initializeChildren = function _initializeChildren () {
    if (!this._config.parent) {
      return;
    }

    var children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);

    for (var i = 0, list = children; i < list.length; i += 1) {
      var element = list[i];

      var selected = getElementFromSelector(element);

      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected));
      }
    }
  };

  Collapse.prototype._getFirstLevelChildren = function _getFirstLevelChildren (selector) {
    var children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

    return SelectorEngine.find(selector, this._config.parent).filter(function (element) { return !children.includes(element); });
  };

  Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass (triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }

    for (var i = 0, list = triggerArray; i < list.length; i += 1) {
      var element = list[i];

      element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
      element.setAttribute('aria-expanded', isOpen);
    }
  }; // Static


  Collapse.jQueryInterface = function jQueryInterface (config) {
    var _config = {};

    if (typeof config === 'string' && /show|hide/.test(config)) {
      _config.toggle = false;
    }

    return this.each(function () {
      var data = Collapse.getOrCreateInstance(this, _config);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(("No method named \"" + config + "\""));
        }

        data[config]();
      }
    });
  };

  Object.defineProperties( Collapse, staticAccessors$6 );

  return Collapse;
}(BaseComponent));
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }

  var selector = getSelectorFromElement(this);
  var selectorElements = SelectorEngine.find(selector);

  for (var i = 0, list = selectorElements; i < list.length; i += 1) {
    var element = list[i];

    Collapse.getOrCreateInstance(element, {
      toggle: false
    }).toggle();
  }
});
/**
 * jQuery
 */

defineJQueryPlugin(Collapse);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$a = 'dropdown';
var DATA_KEY$6 = 'bs.dropdown';
var EVENT_KEY$6 = "." + DATA_KEY$6;
var DATA_API_KEY$3 = '.data-api';
var ESCAPE_KEY$2 = 'Escape';
var TAB_KEY$1 = 'Tab';
var ARROW_UP_KEY$1 = 'ArrowUp';
var ARROW_DOWN_KEY$1 = 'ArrowDown';
var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

var EVENT_HIDE$5 = "hide" + EVENT_KEY$6;
var EVENT_HIDDEN$5 = "hidden" + EVENT_KEY$6;
var EVENT_SHOW$5 = "show" + EVENT_KEY$6;
var EVENT_SHOWN$5 = "shown" + EVENT_KEY$6;
var EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$6 + DATA_API_KEY$3;
var EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$6 + DATA_API_KEY$3;
var EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$6 + DATA_API_KEY$3;
var CLASS_NAME_SHOW$6 = 'show';
var CLASS_NAME_DROPUP = 'dropup';
var CLASS_NAME_DROPEND = 'dropend';
var CLASS_NAME_DROPSTART = 'dropstart';
var CLASS_NAME_DROPUP_CENTER = 'dropup-center';
var CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
var SELECTOR_DATA_TOGGLE_SHOWN = SELECTOR_DATA_TOGGLE$3 + "." + CLASS_NAME_SHOW$6;
var SELECTOR_MENU = '.dropdown-menu';
var SELECTOR_NAVBAR = '.navbar';
var SELECTOR_NAVBAR_NAV = '.navbar-nav';
var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
var PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
var PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
var PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
var PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
var PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
var PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
var PLACEMENT_TOPCENTER = 'top';
var PLACEMENT_BOTTOMCENTER = 'bottom';
var Default$9 = {
  autoClose: true,
  boundary: 'clippingParents',
  display: 'dynamic',
  offset: [0, 2],
  popperConfig: null,
  reference: 'toggle'
};
var DefaultType$9 = {
  autoClose: '(boolean|string)',
  boundary: '(string|element)',
  display: 'string',
  offset: '(array|string|function)',
  popperConfig: '(null|object|function)',
  reference: '(string|element|object)'
};
/**
 * Class definition
 */

var Dropdown = /*@__PURE__*/(function (BaseComponent) {
  function Dropdown(element, config) {
    BaseComponent.call(this, element, config);
    this._popper = null;
    this._parent = this._element.parentNode; // dropdown wrapper
    // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

    this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
    this._inNavbar = this._detectNavbar();
  }

  if ( BaseComponent ) Dropdown.__proto__ = BaseComponent;
  Dropdown.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  Dropdown.prototype.constructor = Dropdown;

  var staticAccessors$7 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$7.Default.get = function () {
    return Default$9;
  };

  staticAccessors$7.DefaultType.get = function () {
    return DefaultType$9;
  };

  staticAccessors$7.NAME.get = function () {
    return NAME$a;
  }; // Public


  Dropdown.prototype.toggle = function toggle () {
    return this._isShown() ? this.hide() : this.show();
  };

  Dropdown.prototype.show = function show () {
    var ref;

    if (isDisabled(this._element) || this._isShown()) {
      return;
    }

    var relatedTarget = {
      relatedTarget: this._element
    };
    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);

    if (showEvent.defaultPrevented) {
      return;
    }

    this._createPopper(); // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


    if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
      for (var i = 0, list = (ref = []).concat.apply(ref, document.body.children); i < list.length; i += 1) {
        var element = list[i];

        EventHandler.on(element, 'mouseover', noop);
      }
    }

    this._element.focus();

    this._element.setAttribute('aria-expanded', true);

    this._menu.classList.add(CLASS_NAME_SHOW$6);

    this._element.classList.add(CLASS_NAME_SHOW$6);

    EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
  };

  Dropdown.prototype.hide = function hide () {
    if (isDisabled(this._element) || !this._isShown()) {
      return;
    }

    var relatedTarget = {
      relatedTarget: this._element
    };

    this._completeHide(relatedTarget);
  };

  Dropdown.prototype.dispose = function dispose () {
    if (this._popper) {
      this._popper.destroy();
    }

    BaseComponent.prototype.dispose.call(this);
  };

  Dropdown.prototype.update = function update () {
    this._inNavbar = this._detectNavbar();

    if (this._popper) {
      this._popper.update();
    }
  }; // Private


  Dropdown.prototype._completeHide = function _completeHide (relatedTarget) {
    var ref;

    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);

    if (hideEvent.defaultPrevented) {
      return;
    } // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support


    if ('ontouchstart' in document.documentElement) {
      for (var i = 0, list = (ref = []).concat.apply(ref, document.body.children); i < list.length; i += 1) {
        var element = list[i];

        EventHandler.off(element, 'mouseover', noop);
      }
    }

    if (this._popper) {
      this._popper.destroy();
    }

    this._menu.classList.remove(CLASS_NAME_SHOW$6);

    this._element.classList.remove(CLASS_NAME_SHOW$6);

    this._element.setAttribute('aria-expanded', 'false');

    Manipulator.removeDataAttribute(this._menu, 'popper');
    EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
  };

  Dropdown.prototype._getConfig = function _getConfig (config) {
    config = BaseComponent.prototype._getConfig.call(this, config);

    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
      // Popper virtual elements require a getBoundingClientRect method
      throw new TypeError(((NAME$a.toUpperCase()) + ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method."));
    }

    return config;
  };

  Dropdown.prototype._createPopper = function _createPopper () {
    if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
      throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
    }

    var referenceElement = this._element;

    if (this._config.reference === 'parent') {
      referenceElement = this._parent;
    } else if (isElement(this._config.reference)) {
      referenceElement = getElement(this._config.reference);
    } else if (typeof this._config.reference === 'object') {
      referenceElement = this._config.reference;
    }

    var popperConfig = this._getPopperConfig();

    this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_1__.createPopper(referenceElement, this._menu, popperConfig);
  };

  Dropdown.prototype._isShown = function _isShown () {
    return this._menu.classList.contains(CLASS_NAME_SHOW$6);
  };

  Dropdown.prototype._getPlacement = function _getPlacement () {
    var parentDropdown = this._parent;

    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }

    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    }

    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
      return PLACEMENT_TOPCENTER;
    }

    if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
      return PLACEMENT_BOTTOMCENTER;
    } // We need to trim the value because custom properties can also include spaces


    var isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }

    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  };

  Dropdown.prototype._detectNavbar = function _detectNavbar () {
    return this._element.closest(SELECTOR_NAVBAR) !== null;
  };

  Dropdown.prototype._getOffset = function _getOffset () {
    var this$1 = this;

    var ref = this._config;
    var offset = ref.offset;

    if (typeof offset === 'string') {
      return offset.split(',').map(function (value) { return Number.parseInt(value, 10); });
    }

    if (typeof offset === 'function') {
      return function (popperData) { return offset(popperData, this$1._element); };
    }

    return offset;
  };

  Dropdown.prototype._getPopperConfig = function _getPopperConfig () {
    var defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }]
    }; // Disable Popper if we have a static display or Dropdown is in Navbar

    if (this._inNavbar || this._config.display === 'static') {
      Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // todo:v6 remove

      defaultBsPopperConfig.modifiers = [{
        name: 'applyStyles',
        enabled: false
      }];
    }

    return Object.assign({}, defaultBsPopperConfig,
      (typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig));
  };

  Dropdown.prototype._selectMenuItem = function _selectMenuItem (ref) {
    var key = ref.key;
    var target = ref.target;

    var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(function (element) { return isVisible(element); });

    if (!items.length) {
      return;
    } // if target isn't included in items (e.g. when expanding the dropdown)
    // allow cycling to get the last item in case key equals ARROW_UP_KEY


    getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
  }; // Static


  Dropdown.jQueryInterface = function jQueryInterface (config) {
    return this.each(function () {
      var data = Dropdown.getOrCreateInstance(this, config);

      if (typeof config !== 'string') {
        return;
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(("No method named \"" + config + "\""));
      }

      data[config]();
    });
  };

  Dropdown.clearMenus = function clearMenus (event) {
    if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
      return;
    }

    var openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);

    for (var i = 0, list = openToggles; i < list.length; i += 1) {
      var toggle = list[i];

      var context = Dropdown.getInstance(toggle);

      if (!context || context._config.autoClose === false) {
        continue;
      }

      var composedPath = event.composedPath();
      var isMenuTarget = composedPath.includes(context._menu);

      if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
        continue;
      } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


      if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
        continue;
      }

      var relatedTarget = {
        relatedTarget: context._element
      };

      if (event.type === 'click') {
        relatedTarget.clickEvent = event;
      }

      context._completeHide(relatedTarget);
    }
  };

  Dropdown.dataApiKeydownHandler = function dataApiKeydownHandler (event) {
    // If not an UP | DOWN | ESCAPE key => not a dropdown command
    // If input/textarea && if key is other than ESCAPE => not a dropdown command
    var isInput = /input|textarea/i.test(event.target.tagName);
    var isEscapeEvent = event.key === ESCAPE_KEY$2;
    var isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);

    if (!isUpOrDownEvent && !isEscapeEvent) {
      return;
    }

    if (isInput && !isEscapeEvent) {
      return;
    }

    event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

    var getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
    var instance = Dropdown.getOrCreateInstance(getToggleButton);

    if (isUpOrDownEvent) {
      event.stopPropagation();
      instance.show();

      instance._selectMenuItem(event);

      return;
    }

    if (instance._isShown()) {
      // else is escape and we check if it is shown
      event.stopPropagation();
      instance.hide();
      getToggleButton.focus();
    }
  };

  Object.defineProperties( Dropdown, staticAccessors$7 );

  return Dropdown;
}(BaseComponent));
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  event.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});
/**
 * jQuery
 */

defineJQueryPlugin(Dropdown);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
var SELECTOR_STICKY_CONTENT = '.sticky-top';
var PROPERTY_PADDING = 'padding-right';
var PROPERTY_MARGIN = 'margin-right';
/**
 * Class definition
 */

var ScrollBarHelper = function ScrollBarHelper() {
  this._element = document.body;
}; // Public


ScrollBarHelper.prototype.getWidth = function getWidth () {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  var documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
};

ScrollBarHelper.prototype.hide = function hide () {
  var width = this.getWidth();

  this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


  this._setElementAttributes(this._element, PROPERTY_PADDING, function (calculatedValue) { return calculatedValue + width; }); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


  this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, function (calculatedValue) { return calculatedValue + width; });

  this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, function (calculatedValue) { return calculatedValue - width; });
};

ScrollBarHelper.prototype.reset = function reset () {
  this._resetElementAttributes(this._element, 'overflow');

  this._resetElementAttributes(this._element, PROPERTY_PADDING);

  this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);

  this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
};

ScrollBarHelper.prototype.isOverflowing = function isOverflowing () {
  return this.getWidth() > 0;
}; // Private


ScrollBarHelper.prototype._disableOverFlow = function _disableOverFlow () {
  this._saveInitialAttribute(this._element, 'overflow');

  this._element.style.overflow = 'hidden';
};

ScrollBarHelper.prototype._setElementAttributes = function _setElementAttributes (selector, styleProperty, callback) {
    var this$1 = this;

  var scrollbarWidth = this.getWidth();

  var manipulationCallBack = function (element) {
    if (element !== this$1._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
      return;
    }

    this$1._saveInitialAttribute(element, styleProperty);

    var calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
    element.style.setProperty(styleProperty, ((callback(Number.parseFloat(calculatedValue))) + "px"));
  };

  this._applyManipulationCallback(selector, manipulationCallBack);
};

ScrollBarHelper.prototype._saveInitialAttribute = function _saveInitialAttribute (element, styleProperty) {
  var actualValue = element.style.getPropertyValue(styleProperty);

  if (actualValue) {
    Manipulator.setDataAttribute(element, styleProperty, actualValue);
  }
};

ScrollBarHelper.prototype._resetElementAttributes = function _resetElementAttributes (selector, styleProperty) {
  var manipulationCallBack = function (element) {
    var value = Manipulator.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

    if (value === null) {
      element.style.removeProperty(styleProperty);
      return;
    }

    Manipulator.removeDataAttribute(element, styleProperty);
    element.style.setProperty(styleProperty, value);
  };

  this._applyManipulationCallback(selector, manipulationCallBack);
};

ScrollBarHelper.prototype._applyManipulationCallback = function _applyManipulationCallback (selector, callBack) {
  if (isElement(selector)) {
    callBack(selector);
    return;
  }

  for (var i = 0, list = SelectorEngine.find(selector, this._element); i < list.length; i += 1) {
    var sel = list[i];

      callBack(sel);
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$9 = 'backdrop';
var CLASS_NAME_FADE$4 = 'fade';
var CLASS_NAME_SHOW$5 = 'show';
var EVENT_MOUSEDOWN = "mousedown.bs." + NAME$9;
var Default$8 = {
  className: 'modal-backdrop',
  clickCallback: null,
  isAnimated: false,
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: 'body' // give the choice to place backdrop under different elements

};
var DefaultType$8 = {
  className: 'string',
  clickCallback: '(function|null)',
  isAnimated: 'boolean',
  isVisible: 'boolean',
  rootElement: '(element|string)'
};
/**
 * Class definition
 */

var Backdrop = /*@__PURE__*/(function (Config) {
  function Backdrop(config) {
    Config.call(this);
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }

  if ( Config ) Backdrop.__proto__ = Config;
  Backdrop.prototype = Object.create( Config && Config.prototype );
  Backdrop.prototype.constructor = Backdrop;

  var staticAccessors$8 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$8.Default.get = function () {
    return Default$8;
  };

  staticAccessors$8.DefaultType.get = function () {
    return DefaultType$8;
  };

  staticAccessors$8.NAME.get = function () {
    return NAME$9;
  }; // Public


  Backdrop.prototype.show = function show (callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }

    this._append();

    var element = this._getElement();

    if (this._config.isAnimated) {
      reflow(element);
    }

    element.classList.add(CLASS_NAME_SHOW$5);

    this._emulateAnimation(function () {
      execute(callback);
    });
  };

  Backdrop.prototype.hide = function hide (callback) {
    var this$1 = this;

    if (!this._config.isVisible) {
      execute(callback);
      return;
    }

    this._getElement().classList.remove(CLASS_NAME_SHOW$5);

    this._emulateAnimation(function () {
      this$1.dispose();
      execute(callback);
    });
  };

  Backdrop.prototype.dispose = function dispose () {
    if (!this._isAppended) {
      return;
    }

    EventHandler.off(this._element, EVENT_MOUSEDOWN);

    this._element.remove();

    this._isAppended = false;
  }; // Private


  Backdrop.prototype._getElement = function _getElement () {
    if (!this._element) {
      var backdrop = document.createElement('div');
      backdrop.className = this._config.className;

      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$4);
      }

      this._element = backdrop;
    }

    return this._element;
  };

  Backdrop.prototype._configAfterMerge = function _configAfterMerge (config) {
    // use getElement() with the default "body" to get a fresh Element on each instantiation
    config.rootElement = getElement(config.rootElement);
    return config;
  };

  Backdrop.prototype._append = function _append () {
    var this$1 = this;

    if (this._isAppended) {
      return;
    }

    var element = this._getElement();

    this._config.rootElement.append(element);

    EventHandler.on(element, EVENT_MOUSEDOWN, function () {
      execute(this$1._config.clickCallback);
    });
    this._isAppended = true;
  };

  Backdrop.prototype._emulateAnimation = function _emulateAnimation (callback) {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
  };

  Object.defineProperties( Backdrop, staticAccessors$8 );

  return Backdrop;
}(Config));

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): util/focustrap.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$8 = 'focustrap';
var DATA_KEY$5 = 'bs.focustrap';
var EVENT_KEY$5 = "." + DATA_KEY$5;
var EVENT_FOCUSIN$2 = "focusin" + EVENT_KEY$5;
var EVENT_KEYDOWN_TAB = "keydown.tab" + EVENT_KEY$5;
var TAB_KEY = 'Tab';
var TAB_NAV_FORWARD = 'forward';
var TAB_NAV_BACKWARD = 'backward';
var Default$7 = {
  autofocus: true,
  trapElement: null // The element to trap focus inside of

};
var DefaultType$7 = {
  autofocus: 'boolean',
  trapElement: 'element'
};
/**
 * Class definition
 */

var FocusTrap = /*@__PURE__*/(function (Config) {
  function FocusTrap(config) {
    Config.call(this);
    this._config = this._getConfig(config);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }

  if ( Config ) FocusTrap.__proto__ = Config;
  FocusTrap.prototype = Object.create( Config && Config.prototype );
  FocusTrap.prototype.constructor = FocusTrap;

  var staticAccessors$9 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$9.Default.get = function () {
    return Default$7;
  };

  staticAccessors$9.DefaultType.get = function () {
    return DefaultType$7;
  };

  staticAccessors$9.NAME.get = function () {
    return NAME$8;
  }; // Public


  FocusTrap.prototype.activate = function activate () {
    var this$1 = this;

    if (this._isActive) {
      return;
    }

    if (this._config.autofocus) {
      this._config.trapElement.focus();
    }

    EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop

    EventHandler.on(document, EVENT_FOCUSIN$2, function (event) { return this$1._handleFocusin(event); });
    EventHandler.on(document, EVENT_KEYDOWN_TAB, function (event) { return this$1._handleKeydown(event); });
    this._isActive = true;
  };

  FocusTrap.prototype.deactivate = function deactivate () {
    if (!this._isActive) {
      return;
    }

    this._isActive = false;
    EventHandler.off(document, EVENT_KEY$5);
  }; // Private


  FocusTrap.prototype._handleFocusin = function _handleFocusin (event) {
    var ref = this._config;
    var trapElement = ref.trapElement;

    if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
      return;
    }

    var elements = SelectorEngine.focusableChildren(trapElement);

    if (elements.length === 0) {
      trapElement.focus();
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus();
    } else {
      elements[0].focus();
    }
  };

  FocusTrap.prototype._handleKeydown = function _handleKeydown (event) {
    if (event.key !== TAB_KEY) {
      return;
    }

    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
  };

  Object.defineProperties( FocusTrap, staticAccessors$9 );

  return FocusTrap;
}(Config));

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$7 = 'modal';
var DATA_KEY$4 = 'bs.modal';
var EVENT_KEY$4 = "." + DATA_KEY$4;
var DATA_API_KEY$2 = '.data-api';
var ESCAPE_KEY$1 = 'Escape';
var EVENT_HIDE$4 = "hide" + EVENT_KEY$4;
var EVENT_HIDE_PREVENTED$1 = "hidePrevented" + EVENT_KEY$4;
var EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$4;
var EVENT_SHOW$4 = "show" + EVENT_KEY$4;
var EVENT_SHOWN$4 = "shown" + EVENT_KEY$4;
var EVENT_RESIZE$1 = "resize" + EVENT_KEY$4;
var EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$4;
var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$4;
var EVENT_KEYDOWN_DISMISS$1 = "keydown.dismiss" + EVENT_KEY$4;
var EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$4 + DATA_API_KEY$2;
var CLASS_NAME_OPEN = 'modal-open';
var CLASS_NAME_FADE$3 = 'fade';
var CLASS_NAME_SHOW$4 = 'show';
var CLASS_NAME_STATIC = 'modal-static';
var OPEN_SELECTOR$1 = '.modal.show';
var SELECTOR_DIALOG = '.modal-dialog';
var SELECTOR_MODAL_BODY = '.modal-body';
var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
var Default$6 = {
  backdrop: true,
  focus: true,
  keyboard: true
};
var DefaultType$6 = {
  backdrop: '(boolean|string)',
  focus: 'boolean',
  keyboard: 'boolean'
};
/**
 * Class definition
 */

var Modal = /*@__PURE__*/(function (BaseComponent) {
  function Modal(element, config) {
    BaseComponent.call(this, element, config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();

    this._addEventListeners();
  }

  if ( BaseComponent ) Modal.__proto__ = BaseComponent;
  Modal.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  Modal.prototype.constructor = Modal;

  var staticAccessors$10 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$10.Default.get = function () {
    return Default$6;
  };

  staticAccessors$10.DefaultType.get = function () {
    return DefaultType$6;
  };

  staticAccessors$10.NAME.get = function () {
    return NAME$7;
  }; // Public


  Modal.prototype.toggle = function toggle (relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  };

  Modal.prototype.show = function show (relatedTarget) {
    var this$1 = this;

    if (this._isShown || this._isTransitioning) {
      return;
    }

    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
      relatedTarget: relatedTarget
    });

    if (showEvent.defaultPrevented) {
      return;
    }

    this._isShown = true;
    this._isTransitioning = true;

    this._scrollBar.hide();

    document.body.classList.add(CLASS_NAME_OPEN);

    this._adjustDialog();

    this._backdrop.show(function () { return this$1._showElement(relatedTarget); });
  };

  Modal.prototype.hide = function hide () {
    var this$1 = this;

    if (!this._isShown || this._isTransitioning) {
      return;
    }

    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);

    if (hideEvent.defaultPrevented) {
      return;
    }

    this._isShown = false;
    this._isTransitioning = true;

    this._focustrap.deactivate();

    this._element.classList.remove(CLASS_NAME_SHOW$4);

    this._queueCallback(function () { return this$1._hideModal(); }, this._element, this._isAnimated());
  };

  Modal.prototype.dispose = function dispose () {
    for (var i = 0, list = [window, this._dialog]; i < list.length; i += 1) {
      var htmlElement = list[i];

      EventHandler.off(htmlElement, EVENT_KEY$4);
    }

    this._backdrop.dispose();

    this._focustrap.deactivate();

    BaseComponent.prototype.dispose.call(this);
  };

  Modal.prototype.handleUpdate = function handleUpdate () {
    this._adjustDialog();
  }; // Private


  Modal.prototype._initializeBackDrop = function _initializeBackDrop () {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  };

  Modal.prototype._initializeFocusTrap = function _initializeFocusTrap () {
    return new FocusTrap({
      trapElement: this._element
    });
  };

  Modal.prototype._showElement = function _showElement (relatedTarget) {
    var this$1 = this;

    // try to append dynamic modal
    if (!document.body.contains(this._element)) {
      document.body.append(this._element);
    }

    this._element.style.display = 'block';

    this._element.removeAttribute('aria-hidden');

    this._element.setAttribute('aria-modal', true);

    this._element.setAttribute('role', 'dialog');

    this._element.scrollTop = 0;
    var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

    if (modalBody) {
      modalBody.scrollTop = 0;
    }

    reflow(this._element);

    this._element.classList.add(CLASS_NAME_SHOW$4);

    var transitionComplete = function () {
      if (this$1._config.focus) {
        this$1._focustrap.activate();
      }

      this$1._isTransitioning = false;
      EventHandler.trigger(this$1._element, EVENT_SHOWN$4, {
        relatedTarget: relatedTarget
      });
    };

    this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
  };

  Modal.prototype._addEventListeners = function _addEventListeners () {
    var this$1 = this;

    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, function (event) {
      if (event.key !== ESCAPE_KEY$1) {
        return;
      }

      if (this$1._config.keyboard) {
        event.preventDefault();
        this$1.hide();
        return;
      }

      this$1._triggerBackdropTransition();
    });
    EventHandler.on(window, EVENT_RESIZE$1, function () {
      if (this$1._isShown && !this$1._isTransitioning) {
        this$1._adjustDialog();
      }
    });
    EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, function (event) {
      // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
      EventHandler.one(this$1._element, EVENT_CLICK_DISMISS, function (event2) {
        if (this$1._element !== event.target || this$1._element !== event2.target) {
          return;
        }

        if (this$1._config.backdrop === 'static') {
          this$1._triggerBackdropTransition();

          return;
        }

        if (this$1._config.backdrop) {
          this$1.hide();
        }
      });
    });
  };

  Modal.prototype._hideModal = function _hideModal () {
    var this$1 = this;

    this._element.style.display = 'none';

    this._element.setAttribute('aria-hidden', true);

    this._element.removeAttribute('aria-modal');

    this._element.removeAttribute('role');

    this._isTransitioning = false;

    this._backdrop.hide(function () {
      document.body.classList.remove(CLASS_NAME_OPEN);

      this$1._resetAdjustments();

      this$1._scrollBar.reset();

      EventHandler.trigger(this$1._element, EVENT_HIDDEN$4);
    });
  };

  Modal.prototype._isAnimated = function _isAnimated () {
    return this._element.classList.contains(CLASS_NAME_FADE$3);
  };

  Modal.prototype._triggerBackdropTransition = function _triggerBackdropTransition () {
    var this$1 = this;

    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);

    if (hideEvent.defaultPrevented) {
      return;
    }

    var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    var initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

    if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
      return;
    }

    if (!isModalOverflowing) {
      this._element.style.overflowY = 'hidden';
    }

    this._element.classList.add(CLASS_NAME_STATIC);

    this._queueCallback(function () {
      this$1._element.classList.remove(CLASS_NAME_STATIC);

      this$1._queueCallback(function () {
        this$1._element.style.overflowY = initialOverflowY;
      }, this$1._dialog);
    }, this._dialog);

    this._element.focus();
  };
  /**
   * The following methods are used to handle overflowing modals
   */


  Modal.prototype._adjustDialog = function _adjustDialog () {
    var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

    var scrollbarWidth = this._scrollBar.getWidth();

    var isBodyOverflowing = scrollbarWidth > 0;

    if (isBodyOverflowing && !isModalOverflowing) {
      var property = isRTL() ? 'paddingLeft' : 'paddingRight';
      this._element.style[property] = scrollbarWidth + "px";
    }

    if (!isBodyOverflowing && isModalOverflowing) {
      var property$1 = isRTL() ? 'paddingRight' : 'paddingLeft';
      this._element.style[property$1] = scrollbarWidth + "px";
    }
  };

  Modal.prototype._resetAdjustments = function _resetAdjustments () {
    this._element.style.paddingLeft = '';
    this._element.style.paddingRight = '';
  }; // Static


  Modal.jQueryInterface = function jQueryInterface (config, relatedTarget) {
    return this.each(function () {
      var data = Modal.getOrCreateInstance(this, config);

      if (typeof config !== 'string') {
        return;
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(("No method named \"" + config + "\""));
      }

      data[config](relatedTarget);
    });
  };

  Object.defineProperties( Modal, staticAccessors$10 );

  return Modal;
}(BaseComponent));
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
  var this$1 = this;

  var target = getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  EventHandler.one(target, EVENT_SHOW$4, function (showEvent) {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$4, function () {
      if (isVisible(this$1)) {
        this$1.focus();
      }
    });
  }); // avoid conflict when clicking modal toggler while another one is open

  var alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);

  if (alreadyOpen) {
    Modal.getInstance(alreadyOpen).hide();
  }

  var data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
enableDismissTrigger(Modal);
/**
 * jQuery
 */

defineJQueryPlugin(Modal);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$6 = 'offcanvas';
var DATA_KEY$3 = 'bs.offcanvas';
var EVENT_KEY$3 = "." + DATA_KEY$3;
var DATA_API_KEY$1 = '.data-api';
var EVENT_LOAD_DATA_API$2 = "load" + EVENT_KEY$3 + DATA_API_KEY$1;
var ESCAPE_KEY = 'Escape';
var CLASS_NAME_SHOW$3 = 'show';
var CLASS_NAME_SHOWING$1 = 'showing';
var CLASS_NAME_HIDING = 'hiding';
var CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
var OPEN_SELECTOR = '.offcanvas.show';
var EVENT_SHOW$3 = "show" + EVENT_KEY$3;
var EVENT_SHOWN$3 = "shown" + EVENT_KEY$3;
var EVENT_HIDE$3 = "hide" + EVENT_KEY$3;
var EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$3;
var EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$3;
var EVENT_RESIZE = "resize" + EVENT_KEY$3;
var EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$3 + DATA_API_KEY$1;
var EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$3;
var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
var Default$5 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
var DefaultType$5 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  scroll: 'boolean'
};
/**
 * Class definition
 */

var Offcanvas = /*@__PURE__*/(function (BaseComponent) {
  function Offcanvas(element, config) {
    BaseComponent.call(this, element, config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();

    this._addEventListeners();
  }

  if ( BaseComponent ) Offcanvas.__proto__ = BaseComponent;
  Offcanvas.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  Offcanvas.prototype.constructor = Offcanvas;

  var staticAccessors$11 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$11.Default.get = function () {
    return Default$5;
  };

  staticAccessors$11.DefaultType.get = function () {
    return DefaultType$5;
  };

  staticAccessors$11.NAME.get = function () {
    return NAME$6;
  }; // Public


  Offcanvas.prototype.toggle = function toggle (relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  };

  Offcanvas.prototype.show = function show (relatedTarget) {
    var this$1 = this;

    if (this._isShown) {
      return;
    }

    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget: relatedTarget
    });

    if (showEvent.defaultPrevented) {
      return;
    }

    this._isShown = true;

    this._backdrop.show();

    if (!this._config.scroll) {
      new ScrollBarHelper().hide();
    }

    this._element.setAttribute('aria-modal', true);

    this._element.setAttribute('role', 'dialog');

    this._element.classList.add(CLASS_NAME_SHOWING$1);

    var completeCallBack = function () {
      if (!this$1._config.scroll || this$1._config.backdrop) {
        this$1._focustrap.activate();
      }

      this$1._element.classList.add(CLASS_NAME_SHOW$3);

      this$1._element.classList.remove(CLASS_NAME_SHOWING$1);

      EventHandler.trigger(this$1._element, EVENT_SHOWN$3, {
        relatedTarget: relatedTarget
      });
    };

    this._queueCallback(completeCallBack, this._element, true);
  };

  Offcanvas.prototype.hide = function hide () {
    var this$1 = this;

    if (!this._isShown) {
      return;
    }

    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

    if (hideEvent.defaultPrevented) {
      return;
    }

    this._focustrap.deactivate();

    this._element.blur();

    this._isShown = false;

    this._element.classList.add(CLASS_NAME_HIDING);

    this._backdrop.hide();

    var completeCallback = function () {
      this$1._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);

      this$1._element.removeAttribute('aria-modal');

      this$1._element.removeAttribute('role');

      if (!this$1._config.scroll) {
        new ScrollBarHelper().reset();
      }

      EventHandler.trigger(this$1._element, EVENT_HIDDEN$3);
    };

    this._queueCallback(completeCallback, this._element, true);
  };

  Offcanvas.prototype.dispose = function dispose () {
    this._backdrop.dispose();

    this._focustrap.deactivate();

    BaseComponent.prototype.dispose.call(this);
  }; // Private


  Offcanvas.prototype._initializeBackDrop = function _initializeBackDrop () {
    var this$1 = this;

    var clickCallback = function () {
      if (this$1._config.backdrop === 'static') {
        EventHandler.trigger(this$1._element, EVENT_HIDE_PREVENTED);
        return;
      }

      this$1.hide();
    }; // 'static' option will be translated to true, and booleans will keep their value


    var isVisible = Boolean(this._config.backdrop);
    return new Backdrop({
      className: CLASS_NAME_BACKDROP,
      isVisible: isVisible,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: isVisible ? clickCallback : null
    });
  };

  Offcanvas.prototype._initializeFocusTrap = function _initializeFocusTrap () {
    return new FocusTrap({
      trapElement: this._element
    });
  };

  Offcanvas.prototype._addEventListeners = function _addEventListeners () {
    var this$1 = this;

    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
      if (event.key !== ESCAPE_KEY) {
        return;
      }

      if (!this$1._config.keyboard) {
        EventHandler.trigger(this$1._element, EVENT_HIDE_PREVENTED);
        return;
      }

      this$1.hide();
    });
  }; // Static


  Offcanvas.jQueryInterface = function jQueryInterface (config) {
    return this.each(function () {
      var data = Offcanvas.getOrCreateInstance(this, config);

      if (typeof config !== 'string') {
        return;
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(("No method named \"" + config + "\""));
      }

      data[config](this);
    });
  };

  Object.defineProperties( Offcanvas, staticAccessors$11 );

  return Offcanvas;
}(BaseComponent));
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
  var this$1 = this;

  var target = getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  EventHandler.one(target, EVENT_HIDDEN$3, function () {
    // focus on trigger when it is closed
    if (isVisible(this$1)) {
      this$1.focus();
    }
  }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

  var alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

  if (alreadyOpen && alreadyOpen !== target) {
    Offcanvas.getInstance(alreadyOpen).hide();
  }

  var data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$2, function () {
  for (var i = 0, list = SelectorEngine.find(OPEN_SELECTOR); i < list.length; i += 1) {
    var selector = list[i];

    Offcanvas.getOrCreateInstance(selector).show();
  }
});
EventHandler.on(window, EVENT_RESIZE, function () {
  for (var i = 0, list = SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]'); i < list.length; i += 1) {
    var element = list[i];

    if (getComputedStyle(element).position !== 'fixed') {
      Offcanvas.getOrCreateInstance(element).hide();
    }
  }
});
enableDismissTrigger(Offcanvas);
/**
 * jQuery
 */

defineJQueryPlugin(Offcanvas);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
 */

var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
 */

var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

var allowedAttribute = function (attribute, allowedAttributeList) {
  var attributeName = attribute.nodeName.toLowerCase();

  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
    }

    return true;
  } // Check if a regular expression validates the attribute.


  return allowedAttributeList.filter(function (attributeRegex) { return attributeRegex instanceof RegExp; }).some(function (regex) { return regex.test(attributeName); });
};

var DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
  var ref, ref$1;

  if (!unsafeHtml.length) {
    return unsafeHtml;
  }

  if (sanitizeFunction && typeof sanitizeFunction === 'function') {
    return sanitizeFunction(unsafeHtml);
  }

  var domParser = new window.DOMParser();
  var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  var elements = (ref = []).concat.apply(ref, createdDocument.body.querySelectorAll('*'));

  for (var i$1 = 0, list$1 = elements; i$1 < list$1.length; i$1 += 1) {
    var element = list$1[i$1];

    var elementName = element.nodeName.toLowerCase();

    if (!Object.keys(allowList).includes(elementName)) {
      element.remove();
      continue;
    }

    var attributeList = (ref$1 = []).concat.apply(ref$1, element.attributes);
    var allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);

    for (var i = 0, list = attributeList; i < list.length; i += 1) {
      var attribute = list[i];

      if (!allowedAttribute(attribute, allowedAttributes)) {
        element.removeAttribute(attribute.nodeName);
      }
    }
  }

  return createdDocument.body.innerHTML;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): util/template-factory.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$5 = 'TemplateFactory';
var Default$4 = {
  allowList: DefaultAllowlist,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: '',
  html: false,
  sanitize: true,
  sanitizeFn: null,
  template: '<div></div>'
};
var DefaultType$4 = {
  allowList: 'object',
  content: 'object',
  extraClass: '(string|function)',
  html: 'boolean',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  template: 'string'
};
var DefaultContentType = {
  entry: '(string|element|function|null)',
  selector: '(string|element)'
};
/**
 * Class definition
 */

var TemplateFactory = /*@__PURE__*/(function (Config) {
  function TemplateFactory(config) {
    Config.call(this);
    this._config = this._getConfig(config);
  }

  if ( Config ) TemplateFactory.__proto__ = Config;
  TemplateFactory.prototype = Object.create( Config && Config.prototype );
  TemplateFactory.prototype.constructor = TemplateFactory;

  var staticAccessors$12 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$12.Default.get = function () {
    return Default$4;
  };

  staticAccessors$12.DefaultType.get = function () {
    return DefaultType$4;
  };

  staticAccessors$12.NAME.get = function () {
    return NAME$5;
  }; // Public


  TemplateFactory.prototype.getContent = function getContent () {
    var this$1 = this;

    return Object.values(this._config.content).map(function (config) { return this$1._resolvePossibleFunction(config); }).filter(Boolean);
  };

  TemplateFactory.prototype.hasContent = function hasContent () {
    return this.getContent().length > 0;
  };

  TemplateFactory.prototype.changeContent = function changeContent (content) {
    this._checkContent(content);

    this._config.content = Object.assign({}, this._config.content,
      content);
    return this;
  };

  TemplateFactory.prototype.toHtml = function toHtml () {
    var ref$1;

    var templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = this._maybeSanitize(this._config.template);

    for (var i = 0, list = Object.entries(this._config.content); i < list.length; i += 1) {
      var ref = list[i];
      var selector = ref[0];
      var text = ref[1];

      this._setContent(templateWrapper, text, selector);
    }

    var template = templateWrapper.children[0];

    var extraClass = this._resolvePossibleFunction(this._config.extraClass);

    if (extraClass) {
      (ref$1 = template.classList).add.apply(ref$1, extraClass.split(' '));
    }

    return template;
  }; // Private


  TemplateFactory.prototype._typeCheckConfig = function _typeCheckConfig (config) {
    Config.prototype._typeCheckConfig.call(this, config);

    this._checkContent(config.content);
  };

  TemplateFactory.prototype._checkContent = function _checkContent (arg) {
    var this$1 = this;

    for (var i = 0, list = Object.entries(arg); i < list.length; i += 1) {
      var ref = list[i];
      var selector = ref[0];
      var content = ref[1];

      Config.prototype._typeCheckConfig.call(this$1, {
        selector: selector,
        entry: content
      }, DefaultContentType);
    }
  };

  TemplateFactory.prototype._setContent = function _setContent (template, content, selector) {
    var templateElement = SelectorEngine.findOne(selector, template);

    if (!templateElement) {
      return;
    }

    content = this._resolvePossibleFunction(content);

    if (!content) {
      templateElement.remove();
      return;
    }

    if (isElement(content)) {
      this._putElementInTemplate(getElement(content), templateElement);

      return;
    }

    if (this._config.html) {
      templateElement.innerHTML = this._maybeSanitize(content);
      return;
    }

    templateElement.textContent = content;
  };

  TemplateFactory.prototype._maybeSanitize = function _maybeSanitize (arg) {
    return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
  };

  TemplateFactory.prototype._resolvePossibleFunction = function _resolvePossibleFunction (arg) {
    return typeof arg === 'function' ? arg(this) : arg;
  };

  TemplateFactory.prototype._putElementInTemplate = function _putElementInTemplate (element, templateElement) {
    if (this._config.html) {
      templateElement.innerHTML = '';
      templateElement.append(element);
      return;
    }

    templateElement.textContent = element.textContent;
  };

  Object.defineProperties( TemplateFactory, staticAccessors$12 );

  return TemplateFactory;
}(Config));

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$4 = 'tooltip';
var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
var CLASS_NAME_FADE$2 = 'fade';
var CLASS_NAME_MODAL = 'modal';
var CLASS_NAME_SHOW$2 = 'show';
var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
var SELECTOR_MODAL = "." + CLASS_NAME_MODAL;
var EVENT_MODAL_HIDE = 'hide.bs.modal';
var TRIGGER_HOVER = 'hover';
var TRIGGER_FOCUS = 'focus';
var TRIGGER_CLICK = 'click';
var TRIGGER_MANUAL = 'manual';
var EVENT_HIDE$2 = 'hide';
var EVENT_HIDDEN$2 = 'hidden';
var EVENT_SHOW$2 = 'show';
var EVENT_SHOWN$2 = 'shown';
var EVENT_INSERTED = 'inserted';
var EVENT_CLICK$1 = 'click';
var EVENT_FOCUSIN$1 = 'focusin';
var EVENT_FOCUSOUT$1 = 'focusout';
var EVENT_MOUSEENTER = 'mouseenter';
var EVENT_MOUSELEAVE = 'mouseleave';
var AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
};
var Default$3 = {
  allowList: DefaultAllowlist,
  animation: true,
  boundary: 'clippingParents',
  container: false,
  customClass: '',
  delay: 0,
  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
  html: false,
  offset: [0, 0],
  placement: 'top',
  popperConfig: null,
  sanitize: true,
  sanitizeFn: null,
  selector: false,
  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  title: '',
  trigger: 'hover focus'
};
var DefaultType$3 = {
  allowList: 'object',
  animation: 'boolean',
  boundary: '(string|element)',
  container: '(string|element|boolean)',
  customClass: '(string|function)',
  delay: '(number|object)',
  fallbackPlacements: 'array',
  html: 'boolean',
  offset: '(array|string|function)',
  placement: '(string|function)',
  popperConfig: '(null|object|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  selector: '(string|boolean)',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string'
};
/**
 * Class definition
 */

var Tooltip = /*@__PURE__*/(function (BaseComponent) {
  function Tooltip(element, config) {
    if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
    }

    BaseComponent.call(this, element, config); // Private

    this._isEnabled = true;
    this._timeout = 0;
    this._isHovered = null;
    this._activeTrigger = {};
    this._popper = null;
    this._templateFactory = null;
    this._newContent = null; // Protected

    this.tip = null;

    this._setListeners();

    if (!this._config.selector) {
      this._fixTitle();
    }
  }

  if ( BaseComponent ) Tooltip.__proto__ = BaseComponent;
  Tooltip.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  Tooltip.prototype.constructor = Tooltip;

  var staticAccessors$13 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$13.Default.get = function () {
    return Default$3;
  };

  staticAccessors$13.DefaultType.get = function () {
    return DefaultType$3;
  };

  staticAccessors$13.NAME.get = function () {
    return NAME$4;
  }; // Public


  Tooltip.prototype.enable = function enable () {
    this._isEnabled = true;
  };

  Tooltip.prototype.disable = function disable () {
    this._isEnabled = false;
  };

  Tooltip.prototype.toggleEnabled = function toggleEnabled () {
    this._isEnabled = !this._isEnabled;
  };

  Tooltip.prototype.toggle = function toggle () {
    if (!this._isEnabled) {
      return;
    }

    this._activeTrigger.click = !this._activeTrigger.click;

    if (this._isShown()) {
      this._leave();

      return;
    }

    this._enter();
  };

  Tooltip.prototype.dispose = function dispose () {
    clearTimeout(this._timeout);
    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

    if (this.tip) {
      this.tip.remove();
    }

    if (this._element.getAttribute('data-bs-original-title')) {
      this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
    }

    this._disposePopper();

    BaseComponent.prototype.dispose.call(this);
  };

  Tooltip.prototype.show = function show () {
    var this$1 = this;
    var ref$1;

    if (this._element.style.display === 'none') {
      throw new Error('Please use show on visible elements');
    }

    if (!(this._isWithContent() && this._isEnabled)) {
      return;
    }

    var showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
    var shadowRoot = findShadowRoot(this._element);

    var isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);

    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    } // todo v6 remove this OR make it optional


    if (this.tip) {
      this.tip.remove();
      this.tip = null;
    }

    var tip = this._getTipElement();

    this._element.setAttribute('aria-describedby', tip.getAttribute('id'));

    var ref = this._config;
    var container = ref.container;

    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.append(tip);
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
    }

    if (this._popper) {
      this._popper.update();
    } else {
      this._popper = this._createPopper(tip);
    }

    tip.classList.add(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

    if ('ontouchstart' in document.documentElement) {
      for (var i = 0, list = (ref$1 = []).concat.apply(ref$1, document.body.children); i < list.length; i += 1) {
        var element = list[i];

        EventHandler.on(element, 'mouseover', noop);
      }
    }

    var complete = function () {
      EventHandler.trigger(this$1._element, this$1.constructor.eventName(EVENT_SHOWN$2));

      if (this$1._isHovered === false) {
        this$1._leave();
      }

      this$1._isHovered = false;
    };

    this._queueCallback(complete, this.tip, this._isAnimated());
  };

  Tooltip.prototype.hide = function hide () {
    var this$1 = this;
    var ref;

    if (!this._isShown()) {
      return;
    }

    var hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));

    if (hideEvent.defaultPrevented) {
      return;
    }

    var tip = this._getTipElement();

    tip.classList.remove(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support

    if ('ontouchstart' in document.documentElement) {
      for (var i = 0, list = (ref = []).concat.apply(ref, document.body.children); i < list.length; i += 1) {
        var element = list[i];

        EventHandler.off(element, 'mouseover', noop);
      }
    }

    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;
    this._isHovered = null; // it is a trick to support manual triggering

    var complete = function () {
      if (this$1._isWithActiveTrigger()) {
        return;
      }

      if (!this$1._isHovered) {
        tip.remove();
      }

      this$1._element.removeAttribute('aria-describedby');

      EventHandler.trigger(this$1._element, this$1.constructor.eventName(EVENT_HIDDEN$2));

      this$1._disposePopper();
    };

    this._queueCallback(complete, this.tip, this._isAnimated());
  };

  Tooltip.prototype.update = function update () {
    if (this._popper) {
      this._popper.update();
    }
  }; // Protected


  Tooltip.prototype._isWithContent = function _isWithContent () {
    return Boolean(this._getTitle());
  };

  Tooltip.prototype._getTipElement = function _getTipElement () {
    if (!this.tip) {
      this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
    }

    return this.tip;
  };

  Tooltip.prototype._createTipElement = function _createTipElement (content) {
    var tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6


    if (!tip) {
      return null;
    }

    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2); // todo: on v6 the following can be achieved with CSS only

    tip.classList.add(("bs-" + (this.constructor.NAME) + "-auto"));
    var tipId = getUID(this.constructor.NAME).toString();
    tip.setAttribute('id', tipId);

    if (this._isAnimated()) {
      tip.classList.add(CLASS_NAME_FADE$2);
    }

    return tip;
  };

  Tooltip.prototype.setContent = function setContent (content) {
    this._newContent = content;

    if (this._isShown()) {
      this._disposePopper();

      this.show();
    }
  };

  Tooltip.prototype._getTemplateFactory = function _getTemplateFactory (content) {
    if (this._templateFactory) {
      this._templateFactory.changeContent(content);
    } else {
      this._templateFactory = new TemplateFactory(Object.assign({}, this._config,
        // the `content` var has to be after `this._config`
        // to override config.content in case of popover
        {content: content,
        extraClass: this._resolvePossibleFunction(this._config.customClass)}));
    }

    return this._templateFactory;
  };

  Tooltip.prototype._getContentForTemplate = function _getContentForTemplate () {
    var obj;

    return ( obj = {}, obj[SELECTOR_TOOLTIP_INNER] = this._getTitle(), obj );
  };

  Tooltip.prototype._getTitle = function _getTitle () {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
  }; // Private


  Tooltip.prototype._initializeOnDelegatedTarget = function _initializeOnDelegatedTarget (event) {
    return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
  };

  Tooltip.prototype._isAnimated = function _isAnimated () {
    return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
  };

  Tooltip.prototype._isShown = function _isShown () {
    return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
  };

  Tooltip.prototype._createPopper = function _createPopper (tip) {
    var placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
    var attachment = AttachmentMap[placement.toUpperCase()];
    return _popperjs_core__WEBPACK_IMPORTED_MODULE_1__.createPopper(this._element, tip, this._getPopperConfig(attachment));
  };

  Tooltip.prototype._getOffset = function _getOffset () {
    var this$1 = this;

    var ref = this._config;
    var offset = ref.offset;

    if (typeof offset === 'string') {
      return offset.split(',').map(function (value) { return Number.parseInt(value, 10); });
    }

    if (typeof offset === 'function') {
      return function (popperData) { return offset(popperData, this$1._element); };
    }

    return offset;
  };

  Tooltip.prototype._resolvePossibleFunction = function _resolvePossibleFunction (arg) {
    return typeof arg === 'function' ? arg.call(this._element) : arg;
  };

  Tooltip.prototype._getPopperConfig = function _getPopperConfig (attachment) {
    var this$1 = this;

    var defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [{
        name: 'flip',
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }, {
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'arrow',
        options: {
          element: ("." + (this.constructor.NAME) + "-arrow")
        }
      }, {
        name: 'preSetPlacement',
        enabled: true,
        phase: 'beforeMain',
        fn: function (data) {
          // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
          // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
          this$1._getTipElement().setAttribute('data-popper-placement', data.state.placement);
        }
      }]
    };
    return Object.assign({}, defaultBsPopperConfig,
      (typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig));
  };

  Tooltip.prototype._setListeners = function _setListeners () {
    var this$1 = this;

    var triggers = this._config.trigger.split(' ');

    for (var i = 0, list = triggers; i < list.length; i += 1) {
      var trigger = list[i];

      if (trigger === 'click') {
        EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, function (event) {
          var context = this$1._initializeOnDelegatedTarget(event);

          context.toggle();
        });
      } else if (trigger !== TRIGGER_MANUAL) {
        var eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
        var eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
        EventHandler.on(this._element, eventIn, this._config.selector, function (event) {
          var context = this$1._initializeOnDelegatedTarget(event);

          context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;

          context._enter();
        });
        EventHandler.on(this._element, eventOut, this._config.selector, function (event) {
          var context = this$1._initializeOnDelegatedTarget(event);

          context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);

          context._leave();
        });
      }
    }

    this._hideModalHandler = function () {
      if (this$1._element) {
        this$1.hide();
      }
    };

    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
  };

  Tooltip.prototype._fixTitle = function _fixTitle () {
    var title = this._element.getAttribute('title');

    if (!title) {
      return;
    }

    if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
      this._element.setAttribute('aria-label', title);
    }

    this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility


    this._element.removeAttribute('title');
  };

  Tooltip.prototype._enter = function _enter () {
    var this$1 = this;

    if (this._isShown() || this._isHovered) {
      this._isHovered = true;
      return;
    }

    this._isHovered = true;

    this._setTimeout(function () {
      if (this$1._isHovered) {
        this$1.show();
      }
    }, this._config.delay.show);
  };

  Tooltip.prototype._leave = function _leave () {
    var this$1 = this;

    if (this._isWithActiveTrigger()) {
      return;
    }

    this._isHovered = false;

    this._setTimeout(function () {
      if (!this$1._isHovered) {
        this$1.hide();
      }
    }, this._config.delay.hide);
  };

  Tooltip.prototype._setTimeout = function _setTimeout (handler, timeout) {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(handler, timeout);
  };

  Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger () {
    return Object.values(this._activeTrigger).includes(true);
  };

  Tooltip.prototype._getConfig = function _getConfig (config) {
    var dataAttributes = Manipulator.getDataAttributes(this._element);

    for (var i = 0, list = Object.keys(dataAttributes); i < list.length; i += 1) {
      var dataAttribute = list[i];

      if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
        delete dataAttributes[dataAttribute];
      }
    }

    config = Object.assign({}, dataAttributes,
      (typeof config === 'object' && config ? config : {}));
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);

    this._typeCheckConfig(config);

    return config;
  };

  Tooltip.prototype._configAfterMerge = function _configAfterMerge (config) {
    config.container = config.container === false ? document.body : getElement(config.container);

    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }

    if (typeof config.title === 'number') {
      config.title = config.title.toString();
    }

    if (typeof config.content === 'number') {
      config.content = config.content.toString();
    }

    return config;
  };

  Tooltip.prototype._getDelegateConfig = function _getDelegateConfig () {
    var config = {};

    for (var key in this._config) {
      if (this.constructor.Default[key] !== this._config[key]) {
        config[key] = this._config[key];
      }
    }

    config.selector = false;
    config.trigger = 'manual'; // In the future can be replaced with:
    // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
    // `Object.fromEntries(keysWithDifferentValues)`

    return config;
  };

  Tooltip.prototype._disposePopper = function _disposePopper () {
    if (this._popper) {
      this._popper.destroy();

      this._popper = null;
    }
  }; // Static


  Tooltip.jQueryInterface = function jQueryInterface (config) {
    return this.each(function () {
      var data = Tooltip.getOrCreateInstance(this, config);

      if (typeof config !== 'string') {
        return;
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(("No method named \"" + config + "\""));
      }

      data[config]();
    });
  };

  Object.defineProperties( Tooltip, staticAccessors$13 );

  return Tooltip;
}(BaseComponent));
/**
 * jQuery
 */


defineJQueryPlugin(Tooltip);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$3 = 'popover';
var SELECTOR_TITLE = '.popover-header';
var SELECTOR_CONTENT = '.popover-body';
var Default$2 = Object.assign({}, Tooltip.Default,
  {content: '',
  offset: [0, 8],
  placement: 'right',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
  trigger: 'click'});
var DefaultType$2 = Object.assign({}, Tooltip.DefaultType,
  {content: '(null|string|element|function)'});
/**
 * Class definition
 */

var Popover = /*@__PURE__*/(function (Tooltip) {
  function Popover () {
    Tooltip.apply(this, arguments);
  }

  if ( Tooltip ) Popover.__proto__ = Tooltip;
  Popover.prototype = Object.create( Tooltip && Tooltip.prototype );
  Popover.prototype.constructor = Popover;

  var staticAccessors$14 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } };

  staticAccessors$14.Default.get = function () {
    return Default$2;
  };

  staticAccessors$14.DefaultType.get = function () {
    return DefaultType$2;
  };

  staticAccessors$14.NAME.get = function () {
    return NAME$3;
  }; // Overrides


  Popover.prototype._isWithContent = function _isWithContent () {
    return this._getTitle() || this._getContent();
  }; // Private


  Popover.prototype._getContentForTemplate = function _getContentForTemplate () {
    var obj;

    return ( obj = {}, obj[SELECTOR_TITLE] = this._getTitle(), obj[SELECTOR_CONTENT] = this._getContent(), obj );
  };

  Popover.prototype._getContent = function _getContent () {
    return this._resolvePossibleFunction(this._config.content);
  }; // Static


  Popover.jQueryInterface = function jQueryInterface (config) {
    return this.each(function () {
      var data = Popover.getOrCreateInstance(this, config);

      if (typeof config !== 'string') {
        return;
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(("No method named \"" + config + "\""));
      }

      data[config]();
    });
  };

  Object.defineProperties( Popover, staticAccessors$14 );

  return Popover;
}(Tooltip));
/**
 * jQuery
 */


defineJQueryPlugin(Popover);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$2 = 'scrollspy';
var DATA_KEY$2 = 'bs.scrollspy';
var EVENT_KEY$2 = "." + DATA_KEY$2;
var DATA_API_KEY = '.data-api';
var EVENT_ACTIVATE = "activate" + EVENT_KEY$2;
var EVENT_CLICK = "click" + EVENT_KEY$2;
var EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$2 + DATA_API_KEY;
var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
var CLASS_NAME_ACTIVE$1 = 'active';
var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
var SELECTOR_TARGET_LINKS = '[href]';
var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
var SELECTOR_NAV_LINKS = '.nav-link';
var SELECTOR_NAV_ITEMS = '.nav-item';
var SELECTOR_LIST_ITEMS = '.list-group-item';
var SELECTOR_LINK_ITEMS = SELECTOR_NAV_LINKS + ", " + SELECTOR_NAV_ITEMS + " > " + SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS;
var SELECTOR_DROPDOWN = '.dropdown';
var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
var Default$1 = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: '0px 0px -25%',
  smoothScroll: false,
  target: null,
  threshold: [0.1, 0.5, 1]
};
var DefaultType$1 = {
  offset: '(number|null)',
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: 'string',
  smoothScroll: 'boolean',
  target: 'element',
  threshold: 'array'
};
/**
 * Class definition
 */

var ScrollSpy = /*@__PURE__*/(function (BaseComponent) {
  function ScrollSpy(element, config) {
    BaseComponent.call(this, element, config); // this._element is the observablesContainer and config.target the menu links wrapper

    this._targetLinks = new Map();
    this._observableSections = new Map();
    this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
    this._activeTarget = null;
    this._observer = null;
    this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    };
    this.refresh(); // initialize
  }

  if ( BaseComponent ) ScrollSpy.__proto__ = BaseComponent;
  ScrollSpy.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  ScrollSpy.prototype.constructor = ScrollSpy;

  var staticAccessors$15 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$15.Default.get = function () {
    return Default$1;
  };

  staticAccessors$15.DefaultType.get = function () {
    return DefaultType$1;
  };

  staticAccessors$15.NAME.get = function () {
    return NAME$2;
  }; // Public


  ScrollSpy.prototype.refresh = function refresh () {
    this._initializeTargetsAndObservables();

    this._maybeEnableSmoothScroll();

    if (this._observer) {
      this._observer.disconnect();
    } else {
      this._observer = this._getNewObserver();
    }

    for (var i = 0, list = this._observableSections.values(); i < list.length; i += 1) {
      var section = list[i];

      this._observer.observe(section);
    }
  };

  ScrollSpy.prototype.dispose = function dispose () {
    this._observer.disconnect();

    BaseComponent.prototype.dispose.call(this);
  }; // Private


  ScrollSpy.prototype._configAfterMerge = function _configAfterMerge (config) {
    // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
    config.target = getElement(config.target) || document.body; // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only

    config.rootMargin = config.offset ? ((config.offset) + "px 0px -30%") : config.rootMargin;

    if (typeof config.threshold === 'string') {
      config.threshold = config.threshold.split(',').map(function (value) { return Number.parseFloat(value); });
    }

    return config;
  };

  ScrollSpy.prototype._maybeEnableSmoothScroll = function _maybeEnableSmoothScroll () {
    var this$1 = this;

    if (!this._config.smoothScroll) {
      return;
    } // unregister any previous listeners


    EventHandler.off(this._config.target, EVENT_CLICK);
    EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, function (event) {
      var observableSection = this$1._observableSections.get(event.target.hash);

      if (observableSection) {
        event.preventDefault();
        var root = this$1._rootElement || window;
        var height = observableSection.offsetTop - this$1._element.offsetTop;

        if (root.scrollTo) {
          root.scrollTo({
            top: height,
            behavior: 'smooth'
          });
          return;
        } // Chrome 60 doesn't support `scrollTo`


        root.scrollTop = height;
      }
    });
  };

  ScrollSpy.prototype._getNewObserver = function _getNewObserver () {
    var this$1 = this;

    var options = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver(function (entries) { return this$1._observerCallback(entries); }, options);
  }; // The logic of selection


  ScrollSpy.prototype._observerCallback = function _observerCallback (entries) {
    var this$1 = this;

    var targetElement = function (entry) { return this$1._targetLinks.get(("#" + (entry.target.id))); };

    var activate = function (entry) {
      this$1._previousScrollData.visibleEntryTop = entry.target.offsetTop;

      this$1._process(targetElement(entry));
    };

    var parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
    var userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = parentScrollTop;

    for (var i = 0, list = entries; i < list.length; i += 1) {
      var entry = list[i];

      if (!entry.isIntersecting) {
        this._activeTarget = null;

        this._clearActiveClass(targetElement(entry));

        continue;
      }

      var entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

      if (userScrollsDown && entryIsLowerThanPrevious) {
        activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

        if (!parentScrollTop) {
          return;
        }

        continue;
      } // if we are scrolling up, pick the smallest offsetTop


      if (!userScrollsDown && !entryIsLowerThanPrevious) {
        activate(entry);
      }
    }
  };

  ScrollSpy.prototype._initializeTargetsAndObservables = function _initializeTargetsAndObservables () {
    this._targetLinks = new Map();
    this._observableSections = new Map();
    var targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);

    for (var i = 0, list = targetLinks; i < list.length; i += 1) {
      // ensure that the anchor has an id and is not disabled
      var anchor = list[i];

      if (!anchor.hash || isDisabled(anchor)) {
        continue;
      }

      var observableSection = SelectorEngine.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

      if (isVisible(observableSection)) {
        this._targetLinks.set(anchor.hash, anchor);

        this._observableSections.set(anchor.hash, observableSection);
      }
    }
  };

  ScrollSpy.prototype._process = function _process (target) {
    if (this._activeTarget === target) {
      return;
    }

    this._clearActiveClass(this._config.target);

    this._activeTarget = target;
    target.classList.add(CLASS_NAME_ACTIVE$1);

    this._activateParents(target);

    EventHandler.trigger(this._element, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  };

  ScrollSpy.prototype._activateParents = function _activateParents (target) {
    // Activate dropdown parents
    if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
      return;
    }

    for (var i$1 = 0, list$1 = SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP); i$1 < list$1.length; i$1 += 1) {
      // Set triggered links parents as active
      // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
      var listGroup = list$1[i$1];

      for (var i = 0, list = SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS); i < list.length; i += 1) {
        var item = list[i];

        item.classList.add(CLASS_NAME_ACTIVE$1);
      }
    }
  };

  ScrollSpy.prototype._clearActiveClass = function _clearActiveClass (parent) {
    parent.classList.remove(CLASS_NAME_ACTIVE$1);
    var activeNodes = SelectorEngine.find((SELECTOR_TARGET_LINKS + "." + CLASS_NAME_ACTIVE$1), parent);

    for (var i = 0, list = activeNodes; i < list.length; i += 1) {
      var node = list[i];

      node.classList.remove(CLASS_NAME_ACTIVE$1);
    }
  }; // Static


  ScrollSpy.jQueryInterface = function jQueryInterface (config) {
    return this.each(function () {
      var data = ScrollSpy.getOrCreateInstance(this, config);

      if (typeof config !== 'string') {
        return;
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(("No method named \"" + config + "\""));
      }

      data[config]();
    });
  };

  Object.defineProperties( ScrollSpy, staticAccessors$15 );

  return ScrollSpy;
}(BaseComponent));
/**
 * Data API implementation
 */


EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
  for (var i = 0, list = SelectorEngine.find(SELECTOR_DATA_SPY); i < list.length; i += 1) {
    var spy = list[i];

    ScrollSpy.getOrCreateInstance(spy);
  }
});
/**
 * jQuery
 */

defineJQueryPlugin(ScrollSpy);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME$1 = 'tab';
var DATA_KEY$1 = 'bs.tab';
var EVENT_KEY$1 = "." + DATA_KEY$1;
var EVENT_HIDE$1 = "hide" + EVENT_KEY$1;
var EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$1;
var EVENT_SHOW$1 = "show" + EVENT_KEY$1;
var EVENT_SHOWN$1 = "shown" + EVENT_KEY$1;
var EVENT_CLICK_DATA_API = "click" + EVENT_KEY$1;
var EVENT_KEYDOWN = "keydown" + EVENT_KEY$1;
var EVENT_LOAD_DATA_API = "load" + EVENT_KEY$1;
var ARROW_LEFT_KEY = 'ArrowLeft';
var ARROW_RIGHT_KEY = 'ArrowRight';
var ARROW_UP_KEY = 'ArrowUp';
var ARROW_DOWN_KEY = 'ArrowDown';
var CLASS_NAME_ACTIVE = 'active';
var CLASS_NAME_FADE$1 = 'fade';
var CLASS_NAME_SHOW$1 = 'show';
var CLASS_DROPDOWN = 'dropdown';
var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
var SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
var NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
var SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
var SELECTOR_OUTER = '.nav-item, .list-group-item';
var SELECTOR_INNER = ".nav-link" + NOT_SELECTOR_DROPDOWN_TOGGLE + ", .list-group-item" + NOT_SELECTOR_DROPDOWN_TOGGLE + ", [role=\"tab\"]" + NOT_SELECTOR_DROPDOWN_TOGGLE;
var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // todo:v6: could be only `tab`

var SELECTOR_INNER_ELEM = SELECTOR_INNER + ", " + SELECTOR_DATA_TOGGLE;
var SELECTOR_DATA_TOGGLE_ACTIVE = "." + CLASS_NAME_ACTIVE + "[data-bs-toggle=\"tab\"], ." + CLASS_NAME_ACTIVE + "[data-bs-toggle=\"pill\"], ." + CLASS_NAME_ACTIVE + "[data-bs-toggle=\"list\"]";
/**
 * Class definition
 */

var Tab = /*@__PURE__*/(function (BaseComponent) {
  function Tab(element) {
    var this$1 = this;

    BaseComponent.call(this, element);
    this._parent = this._element.closest(SELECTOR_TAB_PANEL);

    if (!this._parent) {
      return; // todo: should Throw exception on v6
      // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
    } // Set up initial aria attributes


    this._setInitialAttributes(this._parent, this._getChildren());

    EventHandler.on(this._element, EVENT_KEYDOWN, function (event) { return this$1._keydown(event); });
  }

  if ( BaseComponent ) Tab.__proto__ = BaseComponent;
  Tab.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  Tab.prototype.constructor = Tab;

  var staticAccessors$16 = { NAME: { configurable: true } }; // Getters


  staticAccessors$16.NAME.get = function () {
    return NAME$1;
  }; // Public


  Tab.prototype.show = function show () {
    // Shows this elem and deactivate the active sibling if exists
    var innerElem = this._element;

    if (this._elemIsActive(innerElem)) {
      return;
    } // Search for active tab on same parent to deactivate it


    var active = this._getActiveElem();

    var hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
      relatedTarget: innerElem
    }) : null;
    var showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
      relatedTarget: active
    });

    if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
      return;
    }

    this._deactivate(active, innerElem);

    this._activate(innerElem, active);
  }; // Private


  Tab.prototype._activate = function _activate (element, relatedElem) {
    var this$1 = this;

    if (!element) {
      return;
    }

    element.classList.add(CLASS_NAME_ACTIVE);

    this._activate(getElementFromSelector(element)); // Search and activate/show the proper section


    var complete = function () {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.add(CLASS_NAME_SHOW$1);
        return;
      }

      element.removeAttribute('tabindex');
      element.setAttribute('aria-selected', true);

      this$1._toggleDropDown(element, true);

      EventHandler.trigger(element, EVENT_SHOWN$1, {
        relatedTarget: relatedElem
      });
    };

    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  };

  Tab.prototype._deactivate = function _deactivate (element, relatedElem) {
    var this$1 = this;

    if (!element) {
      return;
    }

    element.classList.remove(CLASS_NAME_ACTIVE);
    element.blur();

    this._deactivate(getElementFromSelector(element)); // Search and deactivate the shown section too


    var complete = function () {
      if (element.getAttribute('role') !== 'tab') {
        element.classList.remove(CLASS_NAME_SHOW$1);
        return;
      }

      element.setAttribute('aria-selected', false);
      element.setAttribute('tabindex', '-1');

      this$1._toggleDropDown(element, false);

      EventHandler.trigger(element, EVENT_HIDDEN$1, {
        relatedTarget: relatedElem
      });
    };

    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  };

  Tab.prototype._keydown = function _keydown (event) {
    if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
      return;
    }

    event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page

    event.preventDefault();
    var isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
    var nextActiveElement = getNextActiveElement(this._getChildren().filter(function (element) { return !isDisabled(element); }), event.target, isNext, true);

    if (nextActiveElement) {
      nextActiveElement.focus({
        preventScroll: true
      });
      Tab.getOrCreateInstance(nextActiveElement).show();
    }
  };

  Tab.prototype._getChildren = function _getChildren () {
    // collection of inner elements
    return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
  };

  Tab.prototype._getActiveElem = function _getActiveElem () {
    var this$1 = this;

    return this._getChildren().find(function (child) { return this$1._elemIsActive(child); }) || null;
  };

  Tab.prototype._setInitialAttributes = function _setInitialAttributes (parent, children) {
    this._setAttributeIfNotExists(parent, 'role', 'tablist');

    for (var i = 0, list = children; i < list.length; i += 1) {
      var child = list[i];

      this._setInitialAttributesOnChild(child);
    }
  };

  Tab.prototype._setInitialAttributesOnChild = function _setInitialAttributesOnChild (child) {
    child = this._getInnerElement(child);

    var isActive = this._elemIsActive(child);

    var outerElem = this._getOuterElement(child);

    child.setAttribute('aria-selected', isActive);

    if (outerElem !== child) {
      this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
    }

    if (!isActive) {
      child.setAttribute('tabindex', '-1');
    }

    this._setAttributeIfNotExists(child, 'role', 'tab'); // set attributes to the related panel too


    this._setInitialAttributesOnTargetPanel(child);
  };

  Tab.prototype._setInitialAttributesOnTargetPanel = function _setInitialAttributesOnTargetPanel (child) {
    var target = getElementFromSelector(child);

    if (!target) {
      return;
    }

    this._setAttributeIfNotExists(target, 'role', 'tabpanel');

    if (child.id) {
      this._setAttributeIfNotExists(target, 'aria-labelledby', ("#" + (child.id)));
    }
  };

  Tab.prototype._toggleDropDown = function _toggleDropDown (element, open) {
    var outerElem = this._getOuterElement(element);

    if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
      return;
    }

    var toggle = function (selector, className) {
      var element = SelectorEngine.findOne(selector, outerElem);

      if (element) {
        element.classList.toggle(className, open);
      }
    };

    toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
    toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
    outerElem.setAttribute('aria-expanded', open);
  };

  Tab.prototype._setAttributeIfNotExists = function _setAttributeIfNotExists (element, attribute, value) {
    if (!element.hasAttribute(attribute)) {
      element.setAttribute(attribute, value);
    }
  };

  Tab.prototype._elemIsActive = function _elemIsActive (elem) {
    return elem.classList.contains(CLASS_NAME_ACTIVE);
  }; // Try to get the inner element (usually the .nav-link)


  Tab.prototype._getInnerElement = function _getInnerElement (elem) {
    return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
  }; // Try to get the outer element (usually the .nav-item)


  Tab.prototype._getOuterElement = function _getOuterElement (elem) {
    return elem.closest(SELECTOR_OUTER) || elem;
  }; // Static


  Tab.jQueryInterface = function jQueryInterface (config) {
    return this.each(function () {
      var data = Tab.getOrCreateInstance(this);

      if (typeof config !== 'string') {
        return;
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(("No method named \"" + config + "\""));
      }

      data[config]();
    });
  };

  Object.defineProperties( Tab, staticAccessors$16 );

  return Tab;
}(BaseComponent));
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  Tab.getOrCreateInstance(this).show();
});
/**
 * Initialize on focus
 */

EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
  for (var i = 0, list = SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE); i < list.length; i += 1) {
    var element = list[i];

    Tab.getOrCreateInstance(element);
  }
});
/**
 * jQuery
 */

defineJQueryPlugin(Tab);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.2): toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

var NAME = 'toast';
var DATA_KEY = 'bs.toast';
var EVENT_KEY = "." + DATA_KEY;
var EVENT_MOUSEOVER = "mouseover" + EVENT_KEY;
var EVENT_MOUSEOUT = "mouseout" + EVENT_KEY;
var EVENT_FOCUSIN = "focusin" + EVENT_KEY;
var EVENT_FOCUSOUT = "focusout" + EVENT_KEY;
var EVENT_HIDE = "hide" + EVENT_KEY;
var EVENT_HIDDEN = "hidden" + EVENT_KEY;
var EVENT_SHOW = "show" + EVENT_KEY;
var EVENT_SHOWN = "shown" + EVENT_KEY;
var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

var CLASS_NAME_SHOW = 'show';
var CLASS_NAME_SHOWING = 'showing';
var DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
var Default = {
  animation: true,
  autohide: true,
  delay: 5000
};
/**
 * Class definition
 */

var Toast = /*@__PURE__*/(function (BaseComponent) {
  function Toast(element, config) {
    BaseComponent.call(this, element, config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;

    this._setListeners();
  }

  if ( BaseComponent ) Toast.__proto__ = BaseComponent;
  Toast.prototype = Object.create( BaseComponent && BaseComponent.prototype );
  Toast.prototype.constructor = Toast;

  var staticAccessors$17 = { Default: { configurable: true },DefaultType: { configurable: true },NAME: { configurable: true } }; // Getters


  staticAccessors$17.Default.get = function () {
    return Default;
  };

  staticAccessors$17.DefaultType.get = function () {
    return DefaultType;
  };

  staticAccessors$17.NAME.get = function () {
    return NAME;
  }; // Public


  Toast.prototype.show = function show () {
    var this$1 = this;

    var showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

    if (showEvent.defaultPrevented) {
      return;
    }

    this._clearTimeout();

    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }

    var complete = function () {
      this$1._element.classList.remove(CLASS_NAME_SHOWING);

      EventHandler.trigger(this$1._element, EVENT_SHOWN);

      this$1._maybeScheduleHide();
    };

    this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


    reflow(this._element);

    this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);

    this._queueCallback(complete, this._element, this._config.animation);
  };

  Toast.prototype.hide = function hide () {
    var this$1 = this;

    if (!this.isShown()) {
      return;
    }

    var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

    if (hideEvent.defaultPrevented) {
      return;
    }

    var complete = function () {
      this$1._element.classList.add(CLASS_NAME_HIDE); // @deprecated


      this$1._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);

      EventHandler.trigger(this$1._element, EVENT_HIDDEN);
    };

    this._element.classList.add(CLASS_NAME_SHOWING);

    this._queueCallback(complete, this._element, this._config.animation);
  };

  Toast.prototype.dispose = function dispose () {
    this._clearTimeout();

    if (this.isShown()) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }

    BaseComponent.prototype.dispose.call(this);
  };

  Toast.prototype.isShown = function isShown () {
    return this._element.classList.contains(CLASS_NAME_SHOW);
  }; // Private


  Toast.prototype._maybeScheduleHide = function _maybeScheduleHide () {
    var this$1 = this;

    if (!this._config.autohide) {
      return;
    }

    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }

    this._timeout = setTimeout(function () {
      this$1.hide();
    }, this._config.delay);
  };

  Toast.prototype._onInteraction = function _onInteraction (event, isInteracting) {
    switch (event.type) {
      case 'mouseover':
      case 'mouseout':
        {
          this._hasMouseInteraction = isInteracting;
          break;
        }

      case 'focusin':
      case 'focusout':
        {
          this._hasKeyboardInteraction = isInteracting;
          break;
        }
    }

    if (isInteracting) {
      this._clearTimeout();

      return;
    }

    var nextElement = event.relatedTarget;

    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }

    this._maybeScheduleHide();
  };

  Toast.prototype._setListeners = function _setListeners () {
    var this$1 = this;

    EventHandler.on(this._element, EVENT_MOUSEOVER, function (event) { return this$1._onInteraction(event, true); });
    EventHandler.on(this._element, EVENT_MOUSEOUT, function (event) { return this$1._onInteraction(event, false); });
    EventHandler.on(this._element, EVENT_FOCUSIN, function (event) { return this$1._onInteraction(event, true); });
    EventHandler.on(this._element, EVENT_FOCUSOUT, function (event) { return this$1._onInteraction(event, false); });
  };

  Toast.prototype._clearTimeout = function _clearTimeout () {
    clearTimeout(this._timeout);
    this._timeout = null;
  }; // Static


  Toast.jQueryInterface = function jQueryInterface (config) {
    return this.each(function () {
      var data = Toast.getOrCreateInstance(this, config);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(("No method named \"" + config + "\""));
        }

        data[config](this);
      }
    });
  };

  Object.defineProperties( Toast, staticAccessors$17 );

  return Toast;
}(BaseComponent));
/**
 * Data API implementation
 */


enableDismissTrigger(Toast);
/**
 * jQuery
 */

defineJQueryPlugin(Toast);


//# sourceMappingURL=bootstrap.esm.js.map


/***/ }),

/***/ "./scripts/autoload/_bootstrap.js":
/*!****************************************!*\
  !*** ./scripts/autoload/_bootstrap.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "../../node_modules/bootstrap/dist/js/bootstrap.esm.js");



/***/ }),

/***/ "./scripts/routes/about.js":
/*!*********************************!*\
  !*** ./scripts/routes/about.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the about us page
  },
});


/***/ }),

/***/ "./scripts/routes/common.js":
/*!**********************************!*\
  !*** ./scripts/routes/common.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on all pages

    // Set offCanvas section
    var offCanvas = document.getElementById('offcanvasNavbar');

    // Show offCanvas
    offCanvas.addEventListener('show.bs.offcanvas', function () {
      $('.hamburger').addClass('is-active');
    });
    // Hide offCanvas
    offCanvas.addEventListener('hide.bs.offcanvas', function () {
      $('.hamburger').removeClass('is-active');
    });
  },
  finalize: function finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
});


/***/ }),

/***/ "./scripts/routes/home.js":
/*!********************************!*\
  !*** ./scripts/routes/home.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // JavaScript to be fired on the home page
  },
  finalize: function finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
});


/***/ }),

/***/ "./scripts/util/Router.js":
/*!********************************!*\
  !*** ./scripts/util/Router.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _camelCase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camelCase */ "./scripts/util/camelCase.js");


/**
 * DOM-based Routing
 *
 * Based on {@link http://goo.gl/EUTi53|Markup-based Unobtrusive Comprehensive DOM-ready Execution} by Paul Irish
 *
 * The routing fires all common scripts, followed by the page specific scripts.
 * Add additional events for more control over timing e.g. a finalize event
 */
var Router = function Router(routes) {
  this.routes = routes;
};

/**
 * Fire Router events
 * @param {string} route DOM-based route derived from body classes (`<body class="...">`)
 * @param {string} [event] Events on the route. By default, `init` and `finalize` events are called.
 * @param {string} [arg] Any custom argument to be passed to the event.
 */
Router.prototype.fire = function fire (route, event, arg) {
    if ( event === void 0 ) event = 'init';

  document.dispatchEvent(new CustomEvent('routed', {
    bubbles: true,
    detail: {
      route: route,
      fn: event,
    },
  }));
    
  var fire = route !== '' && this.routes[route] && typeof this.routes[route][event] === 'function';
  if (fire) {
    this.routes[route][event](arg);
  }
};

/**
 * Automatically load and fire Router events
 *
 * Events are fired in the following order:
 ** common init
 ** page-specific init
 ** page-specific finalize
 ** common finalize
 */
Router.prototype.loadEvents = function loadEvents () {
    var this$1 = this;

  // Fire common init JS
  this.fire('common');

  // Fire page-specific init JS, and then finalize JS
  document.body.className
    .toLowerCase()
    .replace(/-/g, '_')
    .split(/\s+/)
    .map(_camelCase__WEBPACK_IMPORTED_MODULE_0__["default"])
    .forEach(function (className) {
      this$1.fire(className);
      this$1.fire(className, 'finalize');
    });

  // Fire common finalize JS
  this.fire('common', 'finalize');
};

/* harmony default export */ __webpack_exports__["default"] = (Router);


/***/ }),

/***/ "./scripts/util/camelCase.js":
/*!***********************************!*\
  !*** ./scripts/util/camelCase.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/**
 * the most terrible camelizer on the internet, guaranteed!
 * @param {string} str String that isn't camel-case, e.g., CAMeL_CaSEiS-harD
 * @return {string} String converted to camel-case, e.g., camelCaseIsHard
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(str) { return ("" + (str.charAt(0).toLowerCase()) + (str.replace(/[\W_]/g, '|').split('|')
  .map(function (part) { return ("" + (part.charAt(0).toUpperCase()) + (part.slice(1))); })
  .join('')
  .slice(1))); };


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _autoload_bootstrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autoload/_bootstrap.js */ "./scripts/autoload/_bootstrap.js");
/* harmony import */ var _util_Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/Router */ "./scripts/util/Router.js");
/* harmony import */ var _routes_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/common */ "./scripts/routes/common.js");
/* harmony import */ var _routes_home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/home */ "./scripts/routes/home.js");
/* harmony import */ var _routes_about__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/about */ "./scripts/routes/about.js");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");
// import external dependencies


// Import everything from autoload


// import local dependencies





/** Populate Router instance with DOM routes */
var routes = new _util_Router__WEBPACK_IMPORTED_MODULE_2__["default"]({
  // All pages
  common: _routes_common__WEBPACK_IMPORTED_MODULE_3__["default"],
  // Home page
  home: _routes_home__WEBPACK_IMPORTED_MODULE_4__["default"],
  // About Us page, note the change from about-us to aboutUs.
  aboutUs: _routes_about__WEBPACK_IMPORTED_MODULE_5__["default"],
});

// Load Events
jQuery(document).ready(function () { return routes.loadEvents(); });

}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=main.js.map