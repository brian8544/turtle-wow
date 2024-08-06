!(function (t) {
  var e = {};
  function r(i) {
      if (e[i]) return e[i].exports;
      var n = (e[i] = { i: i, l: !1, exports: {} });
      return t[i].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
  }
  (r.m = t),
      (r.c = e),
      (r.d = function (t, e, i) {
          r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
      }),
      (r.r = function (t) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (r.t = function (t, e) {
          if ((1 & e && (t = r(t)), 8 & e)) return t;
          if (4 & e && "object" == typeof t && t && t.__esModule) return t;
          var i = Object.create(null);
          if ((r.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
              for (var n in t)
                  r.d(
                      i,
                      n,
                      function (e) {
                          return t[e];
                      }.bind(null, n)
                  );
          return i;
      }),
      (r.n = function (t) {
          var e =
              t && t.__esModule
                  ? function () {
                        return t.default;
                    }
                  : function () {
                        return t;
                    };
          return r.d(e, "a", e), e;
      }),
      (r.o = function (t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (r.p = ""),
      r((r.s = 21));
})([
  function (t, e, r) {
      /*!
       * @license twgl.js 4.11.0 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
       * Available via the MIT license.
       * see: http://github.com/greggman/twgl.js for details
       */
      var i;
      "undefined" != typeof self && self,
          (i = function () {
              return (function (t) {
                  var e = {};
                  function r(i) {
                      if (e[i]) return e[i].exports;
                      var n = (e[i] = { i: i, l: !1, exports: {} });
                      return t[i].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
                  }
                  return (
                      (r.m = t),
                      (r.c = e),
                      (r.d = function (t, e, i) {
                          r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
                      }),
                      (r.r = function (t) {
                          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
                      }),
                      (r.t = function (t, e) {
                          if ((1 & e && (t = r(t)), 8 & e)) return t;
                          if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                          var i = Object.create(null);
                          if ((r.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
                              for (var n in t)
                                  r.d(
                                      i,
                                      n,
                                      function (e) {
                                          return t[e];
                                      }.bind(null, n)
                                  );
                          return i;
                      }),
                      (r.n = function (t) {
                          var e =
                              t && t.__esModule
                                  ? function () {
                                        return t.default;
                                    }
                                  : function () {
                                        return t;
                                    };
                          return r.d(e, "a", e), e;
                      }),
                      (r.o = function (t, e) {
                          return Object.prototype.hasOwnProperty.call(t, e);
                      }),
                      (r.p = ""),
                      r((r.s = "./src/twgl-full.js"))
                  );
              })({
                  "./src/attributes.js":
                      /*!***************************!*\
    !*** ./src/attributes.js ***!
    \***************************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.createAttribsFromArrays = m),
                              (e.createBuffersFromArrays = function (t, e) {
                                  var r = {};
                                  Object.keys(e).forEach(function (i) {
                                      r[i] = g(t, e[i], i);
                                  }),
                                      e.indices
                                          ? ((r.numElements = e.indices.length), (r.elementType = i.getGLTypeForTypedArray(p(e.indices), "indices")))
                                          : (r.numElements = (function (t) {
                                                var e, r;
                                                for (r = 0; r < _.length && !((e = _[r]) in t); ++r);
                                                r === _.length && (e = Object.keys(t)[0]);
                                                var i = t[e],
                                                    n = l(i).length,
                                                    a = b(i, e),
                                                    s = n / a;
                                                if (n % a > 0) throw new Error("numComponents ".concat(a, " not correct for length ").concat(n));
                                                return s;
                                            })(e));
                                  return r;
                              }),
                              (e.createBufferFromArray = g),
                              (e.createBufferFromTypedArray = h),
                              (e.createBufferInfoFromArrays = function (t, e, r) {
                                  var n = m(t, e),
                                      a = Object.assign({}, r || {});
                                  a.attribs = Object.assign({}, r ? r.attribs : {}, n);
                                  var o = e.indices;
                                  if (o) {
                                      var u = p(o, "indices");
                                      (a.indices = h(t, u, t.ELEMENT_ARRAY_BUFFER)), (a.numElements = u.length), (a.elementType = i.getGLTypeForTypedArray(u));
                                  } else
                                      a.numElements ||
                                          (a.numElements = (function (t, e) {
                                              var r, i;
                                              for (i = 0; i < _.length && !((r = _[i]) in e) && !((r = s.attribPrefix + r) in e); ++i);
                                              i === _.length && (r = Object.keys(e)[0]);
                                              var n = e[r];
                                              t.bindBuffer(t.ARRAY_BUFFER, n.buffer);
                                              var a = t.getBufferParameter(t.ARRAY_BUFFER, t.BUFFER_SIZE);
                                              t.bindBuffer(t.ARRAY_BUFFER, null);
                                              var o = (function (t, e) {
                                                      return e === t.BYTE ? 1 : e === t.UNSIGNED_BYTE ? 1 : e === t.SHORT ? 2 : e === t.UNSIGNED_SHORT ? 2 : e === t.INT ? 4 : e === t.UNSIGNED_INT ? 4 : e === t.FLOAT ? 4 : 0;
                                                  })(t, n.type),
                                                  h = a / o,
                                                  u = n.numComponents || n.size,
                                                  l = h / u;
                                              if (l % 1 != 0) throw new Error("numComponents ".concat(u, " not correct for length ").concat(length));
                                              return l;
                                          })(t, a.attribs));
                                  return a;
                              }),
                              (e.setAttribInfoBufferFromArray = function (t, e, r, i) {
                                  (r = p(r)), void 0 !== i ? (t.bindBuffer(t.ARRAY_BUFFER, e.buffer), t.bufferSubData(t.ARRAY_BUFFER, i, r)) : o(t, t.ARRAY_BUFFER, e.buffer, r, e.drawType);
                              }),
                              (e.setAttributePrefix = function (t) {
                                  s.attribPrefix = t;
                              }),
                              (e.setAttributeDefaults_ = function (t) {
                                  n.copyExistingProperties(t, s);
                              }),
                              (e.getNumComponents_ = b),
                              (e.getArray_ = l);
                          var i = a(r(/*! ./typedarrays.js */ "./src/typedarrays.js")),
                              n = a(r(/*! ./helper.js */ "./src/helper.js"));
                          function a(t) {
                              if (t && t.__esModule) return t;
                              var e = {};
                              if (null != t)
                                  for (var r in t)
                                      if (Object.prototype.hasOwnProperty.call(t, r)) {
                                          var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                                          i.get || i.set ? Object.defineProperty(e, r, i) : (e[r] = t[r]);
                                      }
                              return (e.default = t), e;
                          }
                          var s = { attribPrefix: "" };
                          function o(t, e, r, i, n) {
                              t.bindBuffer(e, r), t.bufferData(e, i, n || t.STATIC_DRAW);
                          }
                          function h(t, e, r, i) {
                              if (n.isBuffer(t, e)) return e;
                              r = r || t.ARRAY_BUFFER;
                              var a = t.createBuffer();
                              return o(t, r, a, e, i), a;
                          }
                          function u(t) {
                              return "indices" === t;
                          }
                          function l(t) {
                              return t.length ? t : t.data;
                          }
                          var c = /coord|texture/i,
                              f = /color|colour/i;
                          function d(t, e) {
                              var r;
                              if (e % (r = c.test(t) ? 2 : f.test(t) ? 4 : 3) > 0)
                                  throw new Error("Can not guess numComponents for attribute '".concat(t, "'. Tried ").concat(r, " but ").concat(e, " values is not evenly divisible by ").concat(r, ". You should specify it."));
                              return r;
                          }
                          function b(t, e) {
                              return t.numComponents || t.size || d(e, l(t).length);
                          }
                          function p(t, e) {
                              if (i.isArrayBuffer(t)) return t;
                              if (i.isArrayBuffer(t.data)) return t.data;
                              Array.isArray(t) && (t = { data: t });
                              var r = t.type;
                              return r || (r = u(e) ? Uint16Array : Float32Array), new r(t.data);
                          }
                          function m(t, e) {
                              var r = {};
                              return (
                                  Object.keys(e).forEach(function (n) {
                                      if (!u(n)) {
                                          var a = e[n],
                                              o = a.attrib || a.name || a.attribName || s.attribPrefix + n;
                                          if (a.value) {
                                              if (!Array.isArray(a.value) && !i.isArrayBuffer(a.value)) throw new Error("array.value is not array or typedarray");
                                              r[o] = { value: a.value };
                                          } else {
                                              var l, c, f, m;
                                              if (a.buffer && a.buffer instanceof WebGLBuffer) (l = a.buffer), (m = a.numComponents || a.size), (c = a.type), (f = a.normalize);
                                              else if ("number" == typeof a || "number" == typeof a.data) {
                                                  var _ = a.data || a,
                                                      g = a.type || Float32Array,
                                                      v = _ * g.BYTES_PER_ELEMENT;
                                                  (c = i.getGLTypeForTypedArrayType(g)),
                                                      (f = void 0 !== a.normalize ? a.normalize : (y = g) === Int8Array || y === Uint8Array),
                                                      (m = a.numComponents || a.size || d(n, _)),
                                                      (l = t.createBuffer()),
                                                      t.bindBuffer(t.ARRAY_BUFFER, l),
                                                      t.bufferData(t.ARRAY_BUFFER, v, a.drawType || t.STATIC_DRAW);
                                              } else {
                                                  var x = p(a, n);
                                                  (l = h(t, x, void 0, a.drawType)),
                                                      (c = i.getGLTypeForTypedArray(x)),
                                                      (f =
                                                          void 0 !== a.normalize
                                                              ? a.normalize
                                                              : (function (t) {
                                                                    return t instanceof Int8Array || t instanceof Uint8Array;
                                                                })(x)),
                                                      (m = b(a, n));
                                              }
                                              r[o] = { buffer: l, numComponents: m, type: c, normalize: f, stride: a.stride || 0, offset: a.offset || 0, divisor: void 0 === a.divisor ? void 0 : a.divisor, drawType: a.drawType };
                                          }
                                      }
                                      var y;
                                  }),
                                  t.bindBuffer(t.ARRAY_BUFFER, null),
                                  r
                              );
                          }
                          var _ = ["position", "positions", "a_position"];
                          function g(t, e, r) {
                              var i = "indices" === r ? t.ELEMENT_ARRAY_BUFFER : t.ARRAY_BUFFER;
                              return h(t, p(e, r), i);
                          }
                      },
                  "./src/draw.js":
                      /*!*********************!*\
    !*** ./src/draw.js ***!
    \*********************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.drawBufferInfo = n),
                              (e.drawObjectList = function (t, e) {
                                  var r = null,
                                      a = null;
                                  e.forEach(function (e) {
                                      if (!1 !== e.active) {
                                          var s = e.programInfo,
                                              o = e.vertexArrayInfo || e.bufferInfo,
                                              h = !1,
                                              u = void 0 === e.type ? t.TRIANGLES : e.type;
                                          s !== r && ((r = s), t.useProgram(s.program), (h = !0)),
                                              (h || o !== a) && (a && a.vertexArrayObject && !o.vertexArrayObject && t.bindVertexArray(null), (a = o), i.setBuffersAndAttributes(t, s, o)),
                                              i.setUniforms(s, e.uniforms),
                                              n(t, o, u, e.count, e.offset, e.instanceCount);
                                      }
                                  }),
                                      a.vertexArrayObject && t.bindVertexArray(null);
                              });
                          var i = (function (t) {
                              if (t && t.__esModule) return t;
                              var e = {};
                              if (null != t)
                                  for (var r in t)
                                      if (Object.prototype.hasOwnProperty.call(t, r)) {
                                          var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                                          i.get || i.set ? Object.defineProperty(e, r, i) : (e[r] = t[r]);
                                      }
                              return (e.default = t), e;
                          })(r(/*! ./programs.js */ "./src/programs.js"));
                          function n(t, e, r, i, n, a) {
                              r = void 0 === r ? t.TRIANGLES : r;
                              var s = e.indices,
                                  o = e.elementType,
                                  h = void 0 === i ? e.numElements : i;
                              (n = void 0 === n ? 0 : n),
                                  o || s
                                      ? void 0 !== a
                                          ? t.drawElementsInstanced(r, h, void 0 === o ? t.UNSIGNED_SHORT : e.elementType, n, a)
                                          : t.drawElements(r, h, void 0 === o ? t.UNSIGNED_SHORT : e.elementType, n)
                                      : void 0 !== a
                                      ? t.drawArraysInstanced(r, n, h, a)
                                      : t.drawArrays(r, n, h);
                          }
                      },
                  "./src/framebuffers.js":
                      /*!*****************************!*\
    !*** ./src/framebuffers.js ***!
    \*****************************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.bindFramebufferInfo = function (t, e, r) {
                                  (r = r || t.FRAMEBUFFER), e ? (t.bindFramebuffer(r, e.framebuffer), t.viewport(0, 0, e.width, e.height)) : (t.bindFramebuffer(r, null), t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight));
                              }),
                              (e.createFramebufferInfo = function (t, e, r, a) {
                                  var l = t.FRAMEBUFFER,
                                      c = t.createFramebuffer();
                                  t.bindFramebuffer(l, c), (r = r || t.drawingBufferWidth), (a = a || t.drawingBufferHeight);
                                  var f = 0,
                                      d = { framebuffer: c, attachments: [], width: r, height: a };
                                  return (
                                      (e = e || o).forEach(function (e) {
                                          var o = e.attachment,
                                              c = e.format,
                                              b = (function (t) {
                                                  return h[t];
                                              })(c);
                                          if ((b || (b = s + f++), !o))
                                              if (
                                                  (function (t) {
                                                      return u[t];
                                                  })(c)
                                              )
                                                  (o = t.createRenderbuffer()), t.bindRenderbuffer(t.RENDERBUFFER, o), t.renderbufferStorage(t.RENDERBUFFER, c, r, a);
                                              else {
                                                  var p = Object.assign({}, e);
                                                  (p.width = r),
                                                      (p.height = a),
                                                      void 0 === p.auto &&
                                                          ((p.auto = !1),
                                                          (p.min = p.min || p.minMag || t.LINEAR),
                                                          (p.mag = p.mag || p.minMag || t.LINEAR),
                                                          (p.wrapS = p.wrapS || p.wrap || t.CLAMP_TO_EDGE),
                                                          (p.wrapT = p.wrapT || p.wrap || t.CLAMP_TO_EDGE)),
                                                      (o = i.createTexture(t, p));
                                              }
                                          if (n.isRenderbuffer(t, o)) t.framebufferRenderbuffer(l, b, t.RENDERBUFFER, o);
                                          else {
                                              if (!n.isTexture(t, o)) throw new Error("unknown attachment type");
                                              void 0 !== e.layer ? t.framebufferTextureLayer(l, b, o, e.level || 0, e.layer) : t.framebufferTexture2D(l, b, e.texTarget || t.TEXTURE_2D, o, e.level || 0);
                                          }
                                          d.attachments.push(o);
                                      }),
                                      d
                                  );
                              }),
                              (e.resizeFramebufferInfo = function (t, e, r, a, s) {
                                  (a = a || t.drawingBufferWidth),
                                      (s = s || t.drawingBufferHeight),
                                      (e.width = a),
                                      (e.height = s),
                                      (r = r || o).forEach(function (r, o) {
                                          var h = e.attachments[o],
                                              u = r.format;
                                          if (n.isRenderbuffer(t, h)) t.bindRenderbuffer(t.RENDERBUFFER, h), t.renderbufferStorage(t.RENDERBUFFER, u, a, s);
                                          else {
                                              if (!n.isTexture(t, h)) throw new Error("unknown attachment type");
                                              i.resizeTexture(t, h, r, a, s);
                                          }
                                      });
                              });
                          var i = a(r(/*! ./textures.js */ "./src/textures.js")),
                              n = a(r(/*! ./helper.js */ "./src/helper.js"));
                          function a(t) {
                              if (t && t.__esModule) return t;
                              var e = {};
                              if (null != t)
                                  for (var r in t)
                                      if (Object.prototype.hasOwnProperty.call(t, r)) {
                                          var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                                          i.get || i.set ? Object.defineProperty(e, r, i) : (e[r] = t[r]);
                                      }
                              return (e.default = t), e;
                          }
                          var s = 36064,
                              o = [{ format: 6408, type: 5121, min: 9729, wrap: 33071 }, { format: 34041 }],
                              h = {};
                          (h[34041] = 33306), (h[6401] = 36128), (h[36168] = 36128), (h[6402] = 36096), (h[33189] = 36096);
                          var u = {};
                          (u[32854] = !0), (u[32855] = !0), (u[36194] = !0), (u[34041] = !0), (u[33189] = !0), (u[6401] = !0), (u[36168] = !0);
                      },
                  "./src/helper.js":
                      /*!***********************!*\
    !*** ./src/helper.js ***!
    \***********************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.copyExistingProperties = function (t, e) {
                                  Object.keys(e).forEach(function (r) {
                                      e.hasOwnProperty(r) && t.hasOwnProperty(r) && (e[r] = t[r]);
                                  });
                              }),
                              (e.copyNamedProperties = function (t, e, r) {
                                  t.forEach(function (t) {
                                      var i = e[t];
                                      void 0 !== i && (r[t] = i);
                                  });
                              }),
                              (e.isBuffer = function (t, e) {
                                  return "undefined" != typeof WebGLBuffer && e instanceof WebGLBuffer;
                              }),
                              (e.isRenderbuffer = function (t, e) {
                                  return "undefined" != typeof WebGLRenderbuffer && e instanceof WebGLRenderbuffer;
                              }),
                              (e.isShader = function (t, e) {
                                  return "undefined" != typeof WebGLShader && e instanceof WebGLShader;
                              }),
                              (e.isTexture = function (t, e) {
                                  return "undefined" != typeof WebGLTexture && e instanceof WebGLTexture;
                              }),
                              (e.isSampler = function (t, e) {
                                  return "undefined" != typeof WebGLSampler && e instanceof WebGLSampler;
                              }),
                              (e.warn = e.error = void 0);
                          var i = "undefined" != typeof console && console.error && "function" == typeof console.error ? console.error.bind(console) : function () {};
                          e.error = i;
                          var n = "undefined" != typeof console && console.warn && "function" == typeof console.warn ? console.warn.bind(console) : function () {};
                          e.warn = n;
                      },
                  "./src/m4.js":
                      /*!*******************!*\
    !*** ./src/m4.js ***!
    \*******************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.axisRotate = function (t, e, r, i) {
                                  i = i || new n(16);
                                  var a = e[0],
                                      s = e[1],
                                      o = e[2],
                                      h = Math.sqrt(a * a + s * s + o * o),
                                      u = (a /= h) * a,
                                      l = (s /= h) * s,
                                      c = (o /= h) * o,
                                      f = Math.cos(r),
                                      d = Math.sin(r),
                                      b = 1 - f,
                                      p = u + (1 - u) * f,
                                      m = a * s * b + o * d,
                                      _ = a * o * b - s * d,
                                      g = a * s * b - o * d,
                                      v = l + (1 - l) * f,
                                      x = s * o * b + a * d,
                                      y = a * o * b + s * d,
                                      T = s * o * b - a * d,
                                      w = c + (1 - c) * f,
                                      E = t[0],
                                      A = t[1],
                                      M = t[2],
                                      F = t[3],
                                      R = t[4],
                                      S = t[5],
                                      C = t[6],
                                      P = t[7],
                                      I = t[8],
                                      U = t[9],
                                      k = t[10],
                                      D = t[11];
                                  (i[0] = p * E + m * R + _ * I),
                                      (i[1] = p * A + m * S + _ * U),
                                      (i[2] = p * M + m * C + _ * k),
                                      (i[3] = p * F + m * P + _ * D),
                                      (i[4] = g * E + v * R + x * I),
                                      (i[5] = g * A + v * S + x * U),
                                      (i[6] = g * M + v * C + x * k),
                                      (i[7] = g * F + v * P + x * D),
                                      (i[8] = y * E + T * R + w * I),
                                      (i[9] = y * A + T * S + w * U),
                                      (i[10] = y * M + T * C + w * k),
                                      (i[11] = y * F + T * P + w * D),
                                      t !== i && ((i[12] = t[12]), (i[13] = t[13]), (i[14] = t[14]), (i[15] = t[15]));
                                  return i;
                              }),
                              (e.axisRotation = function (t, e, r) {
                                  r = r || new n(16);
                                  var i = t[0],
                                      a = t[1],
                                      s = t[2],
                                      o = Math.sqrt(i * i + a * a + s * s),
                                      h = (i /= o) * i,
                                      u = (a /= o) * a,
                                      l = (s /= o) * s,
                                      c = Math.cos(e),
                                      f = Math.sin(e),
                                      d = 1 - c;
                                  return (
                                      (r[0] = h + (1 - h) * c),
                                      (r[1] = i * a * d + s * f),
                                      (r[2] = i * s * d - a * f),
                                      (r[3] = 0),
                                      (r[4] = i * a * d - s * f),
                                      (r[5] = u + (1 - u) * c),
                                      (r[6] = a * s * d + i * f),
                                      (r[7] = 0),
                                      (r[8] = i * s * d + a * f),
                                      (r[9] = a * s * d - i * f),
                                      (r[10] = l + (1 - l) * c),
                                      (r[11] = 0),
                                      (r[12] = 0),
                                      (r[13] = 0),
                                      (r[14] = 0),
                                      (r[15] = 1),
                                      r
                                  );
                              }),
                              (e.copy = h),
                              (e.frustum = function (t, e, r, i, a, s, o) {
                                  o = o || new n(16);
                                  var h = e - t,
                                      u = i - r,
                                      l = a - s;
                                  return (
                                      (o[0] = (2 * a) / h),
                                      (o[1] = 0),
                                      (o[2] = 0),
                                      (o[3] = 0),
                                      (o[4] = 0),
                                      (o[5] = (2 * a) / u),
                                      (o[6] = 0),
                                      (o[7] = 0),
                                      (o[8] = (t + e) / h),
                                      (o[9] = (i + r) / u),
                                      (o[10] = s / l),
                                      (o[11] = -1),
                                      (o[12] = 0),
                                      (o[13] = 0),
                                      (o[14] = (a * s) / l),
                                      (o[15] = 0),
                                      o
                                  );
                              }),
                              (e.getAxis = function (t, e, r) {
                                  r = r || i.create();
                                  var n = 4 * e;
                                  return (r[0] = t[n + 0]), (r[1] = t[n + 1]), (r[2] = t[n + 2]), r;
                              }),
                              (e.getTranslation = function (t, e) {
                                  return ((e = e || i.create())[0] = t[12]), (e[1] = t[13]), (e[2] = t[14]), e;
                              }),
                              (e.identity = u),
                              (e.inverse = l),
                              (e.lookAt = function (t, e, r, h) {
                                  h = h || new n(16);
                                  var u = a,
                                      l = s,
                                      c = o;
                                  return (
                                      i.normalize(i.subtract(t, e, c), c),
                                      i.normalize(i.cross(r, c, u), u),
                                      i.normalize(i.cross(c, u, l), l),
                                      (h[0] = u[0]),
                                      (h[1] = u[1]),
                                      (h[2] = u[2]),
                                      (h[3] = 0),
                                      (h[4] = l[0]),
                                      (h[5] = l[1]),
                                      (h[6] = l[2]),
                                      (h[7] = 0),
                                      (h[8] = c[0]),
                                      (h[9] = c[1]),
                                      (h[10] = c[2]),
                                      (h[11] = 0),
                                      (h[12] = t[0]),
                                      (h[13] = t[1]),
                                      (h[14] = t[2]),
                                      (h[15] = 1),
                                      h
                                  );
                              }),
                              (e.multiply = function (t, e, r) {
                                  r = r || new n(16);
                                  var i = t[0],
                                      a = t[1],
                                      s = t[2],
                                      o = t[3],
                                      h = t[4],
                                      u = t[5],
                                      l = t[6],
                                      c = t[7],
                                      f = t[8],
                                      d = t[9],
                                      b = t[10],
                                      p = t[11],
                                      m = t[12],
                                      _ = t[13],
                                      g = t[14],
                                      v = t[15],
                                      x = e[0],
                                      y = e[1],
                                      T = e[2],
                                      w = e[3],
                                      E = e[4],
                                      A = e[5],
                                      M = e[6],
                                      F = e[7],
                                      R = e[8],
                                      S = e[9],
                                      C = e[10],
                                      P = e[11],
                                      I = e[12],
                                      U = e[13],
                                      k = e[14],
                                      D = e[15];
                                  return (
                                      (r[0] = i * x + h * y + f * T + m * w),
                                      (r[1] = a * x + u * y + d * T + _ * w),
                                      (r[2] = s * x + l * y + b * T + g * w),
                                      (r[3] = o * x + c * y + p * T + v * w),
                                      (r[4] = i * E + h * A + f * M + m * F),
                                      (r[5] = a * E + u * A + d * M + _ * F),
                                      (r[6] = s * E + l * A + b * M + g * F),
                                      (r[7] = o * E + c * A + p * M + v * F),
                                      (r[8] = i * R + h * S + f * C + m * P),
                                      (r[9] = a * R + u * S + d * C + _ * P),
                                      (r[10] = s * R + l * S + b * C + g * P),
                                      (r[11] = o * R + c * S + p * C + v * P),
                                      (r[12] = i * I + h * U + f * k + m * D),
                                      (r[13] = a * I + u * U + d * k + _ * D),
                                      (r[14] = s * I + l * U + b * k + g * D),
                                      (r[15] = o * I + c * U + p * k + v * D),
                                      r
                                  );
                              }),
                              (e.negate = function (t, e) {
                                  return (
                                      ((e = e || new n(16))[0] = -t[0]),
                                      (e[1] = -t[1]),
                                      (e[2] = -t[2]),
                                      (e[3] = -t[3]),
                                      (e[4] = -t[4]),
                                      (e[5] = -t[5]),
                                      (e[6] = -t[6]),
                                      (e[7] = -t[7]),
                                      (e[8] = -t[8]),
                                      (e[9] = -t[9]),
                                      (e[10] = -t[10]),
                                      (e[11] = -t[11]),
                                      (e[12] = -t[12]),
                                      (e[13] = -t[13]),
                                      (e[14] = -t[14]),
                                      (e[15] = -t[15]),
                                      e
                                  );
                              }),
                              (e.ortho = function (t, e, r, i, a, s, o) {
                                  return (
                                      ((o = o || new n(16))[0] = 2 / (e - t)),
                                      (o[1] = 0),
                                      (o[2] = 0),
                                      (o[3] = 0),
                                      (o[4] = 0),
                                      (o[5] = 2 / (i - r)),
                                      (o[6] = 0),
                                      (o[7] = 0),
                                      (o[8] = 0),
                                      (o[9] = 0),
                                      (o[10] = 2 / (a - s)),
                                      (o[11] = 0),
                                      (o[12] = (e + t) / (t - e)),
                                      (o[13] = (i + r) / (r - i)),
                                      (o[14] = (s + a) / (a - s)),
                                      (o[15] = 1),
                                      o
                                  );
                              }),
                              (e.perspective = function (t, e, r, i, a) {
                                  a = a || new n(16);
                                  var s = Math.tan(0.5 * Math.PI - 0.5 * t),
                                      o = 1 / (r - i);
                                  return (
                                      (a[0] = s / e),
                                      (a[1] = 0),
                                      (a[2] = 0),
                                      (a[3] = 0),
                                      (a[4] = 0),
                                      (a[5] = s),
                                      (a[6] = 0),
                                      (a[7] = 0),
                                      (a[8] = 0),
                                      (a[9] = 0),
                                      (a[10] = (r + i) * o),
                                      (a[11] = -1),
                                      (a[12] = 0),
                                      (a[13] = 0),
                                      (a[14] = r * i * o * 2),
                                      (a[15] = 0),
                                      a
                                  );
                              }),
                              (e.rotateX = function (t, e, r) {
                                  r = r || new n(16);
                                  var i = t[4],
                                      a = t[5],
                                      s = t[6],
                                      o = t[7],
                                      h = t[8],
                                      u = t[9],
                                      l = t[10],
                                      c = t[11],
                                      f = Math.cos(e),
                                      d = Math.sin(e);
                                  (r[4] = f * i + d * h),
                                      (r[5] = f * a + d * u),
                                      (r[6] = f * s + d * l),
                                      (r[7] = f * o + d * c),
                                      (r[8] = f * h - d * i),
                                      (r[9] = f * u - d * a),
                                      (r[10] = f * l - d * s),
                                      (r[11] = f * c - d * o),
                                      t !== r && ((r[0] = t[0]), (r[1] = t[1]), (r[2] = t[2]), (r[3] = t[3]), (r[12] = t[12]), (r[13] = t[13]), (r[14] = t[14]), (r[15] = t[15]));
                                  return r;
                              }),
                              (e.rotateY = function (t, e, r) {
                                  r = r || new n(16);
                                  var i = t[0],
                                      a = t[1],
                                      s = t[2],
                                      o = t[3],
                                      h = t[8],
                                      u = t[9],
                                      l = t[10],
                                      c = t[11],
                                      f = Math.cos(e),
                                      d = Math.sin(e);
                                  (r[0] = f * i - d * h),
                                      (r[1] = f * a - d * u),
                                      (r[2] = f * s - d * l),
                                      (r[3] = f * o - d * c),
                                      (r[8] = f * h + d * i),
                                      (r[9] = f * u + d * a),
                                      (r[10] = f * l + d * s),
                                      (r[11] = f * c + d * o),
                                      t !== r && ((r[4] = t[4]), (r[5] = t[5]), (r[6] = t[6]), (r[7] = t[7]), (r[12] = t[12]), (r[13] = t[13]), (r[14] = t[14]), (r[15] = t[15]));
                                  return r;
                              }),
                              (e.rotateZ = function (t, e, r) {
                                  r = r || new n(16);
                                  var i = t[0],
                                      a = t[1],
                                      s = t[2],
                                      o = t[3],
                                      h = t[4],
                                      u = t[5],
                                      l = t[6],
                                      c = t[7],
                                      f = Math.cos(e),
                                      d = Math.sin(e);
                                  (r[0] = f * i + d * h),
                                      (r[1] = f * a + d * u),
                                      (r[2] = f * s + d * l),
                                      (r[3] = f * o + d * c),
                                      (r[4] = f * h - d * i),
                                      (r[5] = f * u - d * a),
                                      (r[6] = f * l - d * s),
                                      (r[7] = f * c - d * o),
                                      t !== r && ((r[8] = t[8]), (r[9] = t[9]), (r[10] = t[10]), (r[11] = t[11]), (r[12] = t[12]), (r[13] = t[13]), (r[14] = t[14]), (r[15] = t[15]));
                                  return r;
                              }),
                              (e.rotationX = function (t, e) {
                                  e = e || new n(16);
                                  var r = Math.cos(t),
                                      i = Math.sin(t);
                                  return (
                                      (e[0] = 1), (e[1] = 0), (e[2] = 0), (e[3] = 0), (e[4] = 0), (e[5] = r), (e[6] = i), (e[7] = 0), (e[8] = 0), (e[9] = -i), (e[10] = r), (e[11] = 0), (e[12] = 0), (e[13] = 0), (e[14] = 0), (e[15] = 1), e
                                  );
                              }),
                              (e.rotationY = function (t, e) {
                                  e = e || new n(16);
                                  var r = Math.cos(t),
                                      i = Math.sin(t);
                                  return (
                                      (e[0] = r), (e[1] = 0), (e[2] = -i), (e[3] = 0), (e[4] = 0), (e[5] = 1), (e[6] = 0), (e[7] = 0), (e[8] = i), (e[9] = 0), (e[10] = r), (e[11] = 0), (e[12] = 0), (e[13] = 0), (e[14] = 0), (e[15] = 1), e
                                  );
                              }),
                              (e.rotationZ = function (t, e) {
                                  e = e || new n(16);
                                  var r = Math.cos(t),
                                      i = Math.sin(t);
                                  return (
                                      (e[0] = r), (e[1] = i), (e[2] = 0), (e[3] = 0), (e[4] = -i), (e[5] = r), (e[6] = 0), (e[7] = 0), (e[8] = 0), (e[9] = 0), (e[10] = 1), (e[11] = 0), (e[12] = 0), (e[13] = 0), (e[14] = 0), (e[15] = 1), e
                                  );
                              }),
                              (e.scale = function (t, e, r) {
                                  r = r || new n(16);
                                  var i = e[0],
                                      a = e[1],
                                      s = e[2];
                                  (r[0] = i * t[0]),
                                      (r[1] = i * t[1]),
                                      (r[2] = i * t[2]),
                                      (r[3] = i * t[3]),
                                      (r[4] = a * t[4]),
                                      (r[5] = a * t[5]),
                                      (r[6] = a * t[6]),
                                      (r[7] = a * t[7]),
                                      (r[8] = s * t[8]),
                                      (r[9] = s * t[9]),
                                      (r[10] = s * t[10]),
                                      (r[11] = s * t[11]),
                                      t !== r && ((r[12] = t[12]), (r[13] = t[13]), (r[14] = t[14]), (r[15] = t[15]));
                                  return r;
                              }),
                              (e.scaling = function (t, e) {
                                  return (
                                      ((e = e || new n(16))[0] = t[0]),
                                      (e[1] = 0),
                                      (e[2] = 0),
                                      (e[3] = 0),
                                      (e[4] = 0),
                                      (e[5] = t[1]),
                                      (e[6] = 0),
                                      (e[7] = 0),
                                      (e[8] = 0),
                                      (e[9] = 0),
                                      (e[10] = t[2]),
                                      (e[11] = 0),
                                      (e[12] = 0),
                                      (e[13] = 0),
                                      (e[14] = 0),
                                      (e[15] = 1),
                                      e
                                  );
                              }),
                              (e.setAxis = function (t, e, r, i) {
                                  i !== t && (i = h(t, i));
                                  var n = 4 * r;
                                  return (i[n + 0] = e[0]), (i[n + 1] = e[1]), (i[n + 2] = e[2]), i;
                              }),
                              (e.setDefaultType = function (t) {
                                  var e = n;
                                  return (n = t), e;
                              }),
                              (e.setTranslation = function (t, e, r) {
                                  (r = r || u()),
                                      t !== r && ((r[0] = t[0]), (r[1] = t[1]), (r[2] = t[2]), (r[3] = t[3]), (r[4] = t[4]), (r[5] = t[5]), (r[6] = t[6]), (r[7] = t[7]), (r[8] = t[8]), (r[9] = t[9]), (r[10] = t[10]), (r[11] = t[11]));
                                  return (r[12] = e[0]), (r[13] = e[1]), (r[14] = e[2]), (r[15] = 1), r;
                              }),
                              (e.transformDirection = function (t, e, r) {
                                  r = r || i.create();
                                  var n = e[0],
                                      a = e[1],
                                      s = e[2];
                                  return (r[0] = n * t[0] + a * t[4] + s * t[8]), (r[1] = n * t[1] + a * t[5] + s * t[9]), (r[2] = n * t[2] + a * t[6] + s * t[10]), r;
                              }),
                              (e.transformNormal = function (t, e, r) {
                                  r = r || i.create();
                                  var n = l(t),
                                      a = e[0],
                                      s = e[1],
                                      o = e[2];
                                  return (r[0] = a * n[0] + s * n[1] + o * n[2]), (r[1] = a * n[4] + s * n[5] + o * n[6]), (r[2] = a * n[8] + s * n[9] + o * n[10]), r;
                              }),
                              (e.transformPoint = function (t, e, r) {
                                  r = r || i.create();
                                  var n = e[0],
                                      a = e[1],
                                      s = e[2],
                                      o = n * t[3] + a * t[7] + s * t[11] + t[15];
                                  return (r[0] = (n * t[0] + a * t[4] + s * t[8] + t[12]) / o), (r[1] = (n * t[1] + a * t[5] + s * t[9] + t[13]) / o), (r[2] = (n * t[2] + a * t[6] + s * t[10] + t[14]) / o), r;
                              }),
                              (e.translate = function (t, e, r) {
                                  r = r || new n(16);
                                  var i = e[0],
                                      a = e[1],
                                      s = e[2],
                                      o = t[0],
                                      h = t[1],
                                      u = t[2],
                                      l = t[3],
                                      c = t[4],
                                      f = t[5],
                                      d = t[6],
                                      b = t[7],
                                      p = t[8],
                                      m = t[9],
                                      _ = t[10],
                                      g = t[11],
                                      v = t[12],
                                      x = t[13],
                                      y = t[14],
                                      T = t[15];
                                  t !== r && ((r[0] = o), (r[1] = h), (r[2] = u), (r[3] = l), (r[4] = c), (r[5] = f), (r[6] = d), (r[7] = b), (r[8] = p), (r[9] = m), (r[10] = _), (r[11] = g));
                                  return (r[12] = o * i + c * a + p * s + v), (r[13] = h * i + f * a + m * s + x), (r[14] = u * i + d * a + _ * s + y), (r[15] = l * i + b * a + g * s + T), r;
                              }),
                              (e.translation = function (t, e) {
                                  return (
                                      ((e = e || new n(16))[0] = 1),
                                      (e[1] = 0),
                                      (e[2] = 0),
                                      (e[3] = 0),
                                      (e[4] = 0),
                                      (e[5] = 1),
                                      (e[6] = 0),
                                      (e[7] = 0),
                                      (e[8] = 0),
                                      (e[9] = 0),
                                      (e[10] = 1),
                                      (e[11] = 0),
                                      (e[12] = t[0]),
                                      (e[13] = t[1]),
                                      (e[14] = t[2]),
                                      (e[15] = 1),
                                      e
                                  );
                              }),
                              (e.transpose = function (t, e) {
                                  if ((e = e || new n(16)) === t) {
                                      var r;
                                      return (
                                          (r = t[1]),
                                          (t[1] = t[4]),
                                          (t[4] = r),
                                          (r = t[2]),
                                          (t[2] = t[8]),
                                          (t[8] = r),
                                          (r = t[3]),
                                          (t[3] = t[12]),
                                          (t[12] = r),
                                          (r = t[6]),
                                          (t[6] = t[9]),
                                          (t[9] = r),
                                          (r = t[7]),
                                          (t[7] = t[13]),
                                          (t[13] = r),
                                          (r = t[11]),
                                          (t[11] = t[14]),
                                          (t[14] = r),
                                          e
                                      );
                                  }
                                  var i = t[0],
                                      a = t[1],
                                      s = t[2],
                                      o = t[3],
                                      h = t[4],
                                      u = t[5],
                                      l = t[6],
                                      c = t[7],
                                      f = t[8],
                                      d = t[9],
                                      b = t[10],
                                      p = t[11],
                                      m = t[12],
                                      _ = t[13],
                                      g = t[14],
                                      v = t[15];
                                  return (
                                      (e[0] = i), (e[1] = h), (e[2] = f), (e[3] = m), (e[4] = a), (e[5] = u), (e[6] = d), (e[7] = _), (e[8] = s), (e[9] = l), (e[10] = b), (e[11] = g), (e[12] = o), (e[13] = c), (e[14] = p), (e[15] = v), e
                                  );
                              });
                          var i = (function (t) {
                              if (t && t.__esModule) return t;
                              var e = {};
                              if (null != t)
                                  for (var r in t)
                                      if (Object.prototype.hasOwnProperty.call(t, r)) {
                                          var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                                          i.get || i.set ? Object.defineProperty(e, r, i) : (e[r] = t[r]);
                                      }
                              return (e.default = t), e;
                          })(r(/*! ./v3.js */ "./src/v3.js"));
                          var n = Float32Array,
                              a = i.create(),
                              s = i.create(),
                              o = i.create();
                          function h(t, e) {
                              return (
                                  ((e = e || new n(16))[0] = t[0]),
                                  (e[1] = t[1]),
                                  (e[2] = t[2]),
                                  (e[3] = t[3]),
                                  (e[4] = t[4]),
                                  (e[5] = t[5]),
                                  (e[6] = t[6]),
                                  (e[7] = t[7]),
                                  (e[8] = t[8]),
                                  (e[9] = t[9]),
                                  (e[10] = t[10]),
                                  (e[11] = t[11]),
                                  (e[12] = t[12]),
                                  (e[13] = t[13]),
                                  (e[14] = t[14]),
                                  (e[15] = t[15]),
                                  e
                              );
                          }
                          function u(t) {
                              return (
                                  ((t = t || new n(16))[0] = 1),
                                  (t[1] = 0),
                                  (t[2] = 0),
                                  (t[3] = 0),
                                  (t[4] = 0),
                                  (t[5] = 1),
                                  (t[6] = 0),
                                  (t[7] = 0),
                                  (t[8] = 0),
                                  (t[9] = 0),
                                  (t[10] = 1),
                                  (t[11] = 0),
                                  (t[12] = 0),
                                  (t[13] = 0),
                                  (t[14] = 0),
                                  (t[15] = 1),
                                  t
                              );
                          }
                          function l(t, e) {
                              e = e || new n(16);
                              var r = t[0],
                                  i = t[1],
                                  a = t[2],
                                  s = t[3],
                                  o = t[4],
                                  h = t[5],
                                  u = t[6],
                                  l = t[7],
                                  c = t[8],
                                  f = t[9],
                                  d = t[10],
                                  b = t[11],
                                  p = t[12],
                                  m = t[13],
                                  _ = t[14],
                                  g = t[15],
                                  v = d * g,
                                  x = _ * b,
                                  y = u * g,
                                  T = _ * l,
                                  w = u * b,
                                  E = d * l,
                                  A = a * g,
                                  M = _ * s,
                                  F = a * b,
                                  R = d * s,
                                  S = a * l,
                                  C = u * s,
                                  P = c * m,
                                  I = p * f,
                                  U = o * m,
                                  k = p * h,
                                  D = o * f,
                                  O = c * h,
                                  B = r * m,
                                  N = p * i,
                                  L = r * f,
                                  z = c * i,
                                  j = r * h,
                                  H = o * i,
                                  G = v * h + T * f + w * m - (x * h + y * f + E * m),
                                  V = x * i + A * f + R * m - (v * i + M * f + F * m),
                                  q = y * i + M * h + S * m - (T * i + A * h + C * m),
                                  X = E * i + F * h + C * f - (w * i + R * h + S * f),
                                  Y = 1 / (r * G + o * V + c * q + p * X);
                              return (
                                  (e[0] = Y * G),
                                  (e[1] = Y * V),
                                  (e[2] = Y * q),
                                  (e[3] = Y * X),
                                  (e[4] = Y * (x * o + y * c + E * p - (v * o + T * c + w * p))),
                                  (e[5] = Y * (v * r + M * c + F * p - (x * r + A * c + R * p))),
                                  (e[6] = Y * (T * r + A * o + C * p - (y * r + M * o + S * p))),
                                  (e[7] = Y * (w * r + R * o + S * c - (E * r + F * o + C * c))),
                                  (e[8] = Y * (P * l + k * b + D * g - (I * l + U * b + O * g))),
                                  (e[9] = Y * (I * s + B * b + z * g - (P * s + N * b + L * g))),
                                  (e[10] = Y * (U * s + N * l + j * g - (k * s + B * l + H * g))),
                                  (e[11] = Y * (O * s + L * l + H * b - (D * s + z * l + j * b))),
                                  (e[12] = Y * (U * d + O * _ + I * u - (D * _ + P * u + k * d))),
                                  (e[13] = Y * (L * _ + P * a + N * d - (B * d + z * _ + I * a))),
                                  (e[14] = Y * (B * u + H * _ + k * a - (j * _ + U * a + N * u))),
                                  (e[15] = Y * (j * d + D * a + z * u - (L * u + H * d + O * a))),
                                  e
                              );
                          }
                      },
                  "./src/primitives.js":
                      /*!***************************!*\
    !*** ./src/primitives.js ***!
    \***************************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.create3DFVertices = F),
                              (e.createAugmentedTypedArray = f),
                              (e.createCubeVertices = E),
                              (e.createPlaneVertices = y),
                              (e.createSphereVertices = T),
                              (e.createTruncatedConeVertices = A),
                              (e.createXYQuadVertices = x),
                              (e.createCresentVertices = R),
                              (e.createCylinderVertices = S),
                              (e.createTorusVertices = C),
                              (e.createDiscVertices = P),
                              (e.deindexVertices = function (t) {
                                  var e = t.indices,
                                      r = {},
                                      i = e.length;
                                  return (
                                      Object.keys(t)
                                          .filter(d)
                                          .forEach(function (n) {
                                              for (var a = t[n], s = a.numComponents, o = f(s, i, a.constructor), h = 0; h < i; ++h) for (var u = e[h], l = u * s, c = 0; c < s; ++c) o.push(a[l + c]);
                                              r[n] = o;
                                          }),
                                      r
                                  );
                              }),
                              (e.flattenNormals = function (t) {
                                  if (t.indices) throw new Error("can not flatten normals of indexed vertices. deindex them first");
                                  for (var e = t.normal, r = e.length, i = 0; i < r; i += 9) {
                                      var n = e[i + 0],
                                          a = e[i + 1],
                                          s = e[i + 2],
                                          o = e[i + 3],
                                          h = e[i + 4],
                                          u = e[i + 5],
                                          l = e[i + 6],
                                          c = e[i + 7],
                                          f = e[i + 8],
                                          d = n + o + l,
                                          b = a + h + c,
                                          p = s + u + f,
                                          m = Math.sqrt(d * d + b * b + p * p);
                                      (d /= m), (b /= m), (p /= m), (e[i + 0] = d), (e[i + 1] = b), (e[i + 2] = p), (e[i + 3] = d), (e[i + 4] = b), (e[i + 5] = p), (e[i + 6] = d), (e[i + 7] = b), (e[i + 8] = p);
                                  }
                                  return t;
                              }),
                              (e.makeRandomVertexColors = function (t, e) {
                                  e = e || {};
                                  var r = t.position.numElements,
                                      i = f(4, r, Uint8Array),
                                      n =
                                          e.rand ||
                                          function (t, e) {
                                              return e < 3 ? ((r = 256), (Math.random() * r) | 0) : 255;
                                              var r;
                                          };
                                  if (((t.color = i), t.indices)) for (var a = 0; a < r; ++a) i.push(n(a, 0), n(a, 1), n(a, 2), n(a, 3));
                                  else for (var s = e.vertsPerColor || 3, o = r / s, h = 0; h < o; ++h) for (var u = [n(h, 0), n(h, 1), n(h, 2), n(h, 3)], l = 0; l < s; ++l) i.push(u);
                                  return t;
                              }),
                              (e.reorientDirections = m),
                              (e.reorientNormals = _),
                              (e.reorientPositions = g),
                              (e.reorientVertices = v),
                              (e.concatVertices = function (t) {
                                  for (
                                      var e,
                                          r = {},
                                          i = function (i) {
                                              var n = t[i];
                                              Object.keys(n).forEach(function (t) {
                                                  r[t] || (r[t] = []), e || "indices" === t || (e = t);
                                                  var i = n[t],
                                                      a = l(i, t),
                                                      s = u(i),
                                                      o = s.length / a;
                                                  r[t].push(o);
                                              });
                                          },
                                          n = 0;
                                      n < t.length;
                                      ++n
                                  )
                                      i(n);
                                  var a = r[e],
                                      s = {};
                                  return (
                                      Object.keys(r).forEach(function (e) {
                                          var r = (function (e) {
                                                  for (var r, i = 0, n = 0; n < t.length; ++n) {
                                                      var a = t[n],
                                                          s = a[e],
                                                          o = u(s);
                                                      (i += o.length), (r && !s.data) || (r = s);
                                                  }
                                                  return { length: i, spec: r };
                                              })(e),
                                              i = O(r.spec, r.length);
                                          !(function (e, r, i) {
                                              for (var n = 0, a = 0, s = 0; s < t.length; ++s) {
                                                  var o = t[s],
                                                      h = o[e],
                                                      l = u(h);
                                                  "indices" === e ? (D(l, i, a, n), (n += r[s])) : D(l, i, a), (a += l.length);
                                              }
                                          })(e, a, u(i)),
                                              (s[e] = i);
                                      }),
                                      s
                                  );
                              }),
                              (e.duplicateVertices = function (t) {
                                  var e = {};
                                  return (
                                      Object.keys(t).forEach(function (r) {
                                          var i = t[r],
                                              n = u(i),
                                              a = O(i, n.length);
                                          D(n, u(a), 0), (e[r] = a);
                                      }),
                                      e
                                  );
                              }),
                              (e.createDiscBuffers = e.createDiscBufferInfo = e.createTorusBuffers = e.createTorusBufferInfo = e.createCylinderBuffers = e.createCylinderBufferInfo = e.createCresentBuffers = e.createCresentBufferInfo = e.createXYQuadBuffers = e.createXYQuadBufferInfo = e.createTruncatedConeBuffers = e.createTruncatedConeBufferInfo = e.createSphereBuffers = e.createSphereBufferInfo = e.createPlaneBuffers = e.createPlaneBufferInfo = e.createCubeBuffers = e.createCubeBufferInfo = e.create3DFBuffers = e.create3DFBufferInfo = void 0);
                          var i = h(r(/*! ./attributes.js */ "./src/attributes.js")),
                              n = h(r(/*! ./helper.js */ "./src/helper.js")),
                              a = h(r(/*! ./typedarrays.js */ "./src/typedarrays.js")),
                              s = h(r(/*! ./m4.js */ "./src/m4.js")),
                              o = h(r(/*! ./v3.js */ "./src/v3.js"));
                          function h(t) {
                              if (t && t.__esModule) return t;
                              var e = {};
                              if (null != t)
                                  for (var r in t)
                                      if (Object.prototype.hasOwnProperty.call(t, r)) {
                                          var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                                          i.get || i.set ? Object.defineProperty(e, r, i) : (e[r] = t[r]);
                                      }
                              return (e.default = t), e;
                          }
                          var u = i.getArray_,
                              l = i.getNumComponents_;
                          function c(t, e) {
                              var r = 0;
                              return (
                                  (t.push = function () {
                                      for (var e = 0; e < arguments.length; ++e) {
                                          var i = arguments[e];
                                          if (i instanceof Array || a.isArrayBuffer(i)) for (var n = 0; n < i.length; ++n) t[r++] = i[n];
                                          else t[r++] = i;
                                      }
                                  }),
                                  (t.reset = function (t) {
                                      r = t || 0;
                                  }),
                                  (t.numComponents = e),
                                  Object.defineProperty(t, "numElements", {
                                      get: function () {
                                          return (this.length / this.numComponents) | 0;
                                      },
                                  }),
                                  t
                              );
                          }
                          function f(t, e, r) {
                              return c(new (r || Float32Array)(t * e), t);
                          }
                          function d(t) {
                              return "indices" !== t;
                          }
                          function b(t, e, r) {
                              for (var i = t.length, n = new Float32Array(3), a = 0; a < i; a += 3) r(e, [t[a], t[a + 1], t[a + 2]], n), (t[a] = n[0]), (t[a + 1] = n[1]), (t[a + 2] = n[2]);
                          }
                          function p(t, e, r) {
                              r = r || o.create();
                              var i = e[0],
                                  n = e[1],
                                  a = e[2];
                              return (r[0] = i * t[0] + n * t[1] + a * t[2]), (r[1] = i * t[4] + n * t[5] + a * t[6]), (r[2] = i * t[8] + n * t[9] + a * t[10]), r;
                          }
                          function m(t, e) {
                              return b(t, e, s.transformDirection), t;
                          }
                          function _(t, e) {
                              return b(t, s.inverse(e), p), t;
                          }
                          function g(t, e) {
                              return b(t, e, s.transformPoint), t;
                          }
                          function v(t, e) {
                              return (
                                  Object.keys(t).forEach(function (r) {
                                      var i = t[r];
                                      r.indexOf("pos") >= 0 ? g(i, e) : r.indexOf("tan") >= 0 || r.indexOf("binorm") >= 0 ? m(i, e) : r.indexOf("norm") >= 0 && _(i, e);
                                  }),
                                  t
                              );
                          }
                          function x(t, e, r) {
                              return (
                                  (t = t || 2),
                                  {
                                      position: { numComponents: 2, data: [(e = e || 0) + -1 * (t *= 0.5), (r = r || 0) + -1 * t, e + 1 * t, r + -1 * t, e + -1 * t, r + 1 * t, e + 1 * t, r + 1 * t] },
                                      normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                                      texcoord: [0, 0, 1, 0, 0, 1, 1, 1],
                                      indices: [0, 1, 2, 2, 1, 3],
                                  }
                              );
                          }
                          function y(t, e, r, i, n) {
                              (t = t || 1), (e = e || 1), (r = r || 1), (i = i || 1), (n = n || s.identity());
                              for (var a = (r + 1) * (i + 1), o = f(3, a), h = f(3, a), u = f(2, a), l = 0; l <= i; l++)
                                  for (var c = 0; c <= r; c++) {
                                      var d = c / r,
                                          b = l / i;
                                      o.push(t * d - 0.5 * t, 0, e * b - 0.5 * e), h.push(0, 1, 0), u.push(d, b);
                                  }
                              for (var p = r + 1, m = f(3, r * i * 2, Uint16Array), _ = 0; _ < i; _++)
                                  for (var g = 0; g < r; g++) m.push((_ + 0) * p + g, (_ + 1) * p + g, (_ + 0) * p + g + 1), m.push((_ + 1) * p + g, (_ + 1) * p + g + 1, (_ + 0) * p + g + 1);
                              return v({ position: o, normal: h, texcoord: u, indices: m }, n);
                          }
                          function T(t, e, r, i, n, a, s) {
                              if (e <= 0 || r <= 0) throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
                              (i = i || 0), (a = a || 0);
                              for (var o = (n = n || Math.PI) - i, h = (s = s || 2 * Math.PI) - a, u = (e + 1) * (r + 1), l = f(3, u), c = f(3, u), d = f(2, u), b = 0; b <= r; b++)
                                  for (var p = 0; p <= e; p++) {
                                      var m = p / e,
                                          _ = b / r,
                                          g = h * m + a,
                                          v = o * _ + i,
                                          x = Math.sin(g),
                                          y = Math.cos(g),
                                          T = Math.sin(v),
                                          w = y * T,
                                          E = Math.cos(v),
                                          A = x * T;
                                      l.push(t * w, t * E, t * A), c.push(w, E, A), d.push(1 - m, _);
                                  }
                              for (var M = e + 1, F = f(3, e * r * 2, Uint16Array), R = 0; R < e; R++)
                                  for (var S = 0; S < r; S++) F.push((S + 0) * M + R, (S + 0) * M + R + 1, (S + 1) * M + R), F.push((S + 1) * M + R, (S + 0) * M + R + 1, (S + 1) * M + R + 1);
                              return { position: l, normal: c, texcoord: d, indices: F };
                          }
                          var w = [
                              [3, 7, 5, 1],
                              [6, 2, 0, 4],
                              [6, 7, 3, 2],
                              [0, 1, 5, 4],
                              [7, 6, 4, 5],
                              [2, 3, 1, 0],
                          ];
                          function E(t) {
                              for (
                                  var e = (t = t || 1) / 2,
                                      r = [
                                          [-e, -e, -e],
                                          [+e, -e, -e],
                                          [-e, +e, -e],
                                          [+e, +e, -e],
                                          [-e, -e, +e],
                                          [+e, -e, +e],
                                          [-e, +e, +e],
                                          [+e, +e, +e],
                                      ],
                                      i = [
                                          [1, 0, 0],
                                          [-1, 0, 0],
                                          [0, 1, 0],
                                          [0, -1, 0],
                                          [0, 0, 1],
                                          [0, 0, -1],
                                      ],
                                      n = [
                                          [1, 0],
                                          [0, 0],
                                          [0, 1],
                                          [1, 1],
                                      ],
                                      a = f(3, 24),
                                      s = f(3, 24),
                                      o = f(2, 24),
                                      h = f(3, 12, Uint16Array),
                                      u = 0;
                                  u < 6;
                                  ++u
                              ) {
                                  for (var l = w[u], c = 0; c < 4; ++c) {
                                      var d = r[l[c]],
                                          b = i[u],
                                          p = n[c];
                                      a.push(d), s.push(b), o.push(p);
                                  }
                                  var m = 4 * u;
                                  h.push(m + 0, m + 1, m + 2), h.push(m + 0, m + 2, m + 3);
                              }
                              return { position: a, normal: s, texcoord: o, indices: h };
                          }
                          function A(t, e, r, i, n, a, s) {
                              if (i < 3) throw new Error("radialSubdivisions must be 3 or greater");
                              if (n < 1) throw new Error("verticalSubdivisions must be 1 or greater");
                              for (
                                  var o = void 0 === a || a,
                                      h = void 0 === s || s,
                                      u = (o ? 2 : 0) + (h ? 2 : 0),
                                      l = (i + 1) * (n + 1 + u),
                                      c = f(3, l),
                                      d = f(3, l),
                                      b = f(2, l),
                                      p = f(3, i * (n + u) * 2, Uint16Array),
                                      m = i + 1,
                                      _ = Math.atan2(t - e, r),
                                      g = Math.cos(_),
                                      v = Math.sin(_),
                                      x = n + (h ? 2 : 0),
                                      y = o ? -2 : 0;
                                  y <= x;
                                  ++y
                              ) {
                                  var T = y / n,
                                      w = r * T,
                                      E = void 0;
                                  y < 0 ? ((w = 0), (T = 1), (E = t)) : y > n ? ((w = r), (T = 1), (E = e)) : (E = t + (y / n) * (e - t)), (-2 !== y && y !== n + 2) || ((E = 0), (T = 0)), (w -= r / 2);
                                  for (var A = 0; A < m; ++A) {
                                      var M = Math.sin((A * Math.PI * 2) / i),
                                          F = Math.cos((A * Math.PI * 2) / i);
                                      c.push(M * E, w, F * E), d.push(y < 0 || y > n ? 0 : M * g, y < 0 ? -1 : y > n ? 1 : v, y < 0 || y > n ? 0 : F * g), b.push(A / i, 1 - T);
                                  }
                              }
                              for (var R = 0; R < n + u; ++R) for (var S = 0; S < i; ++S) p.push(m * (R + 0) + 0 + S, m * (R + 0) + 1 + S, m * (R + 1) + 1 + S), p.push(m * (R + 0) + 0 + S, m * (R + 1) + 1 + S, m * (R + 1) + 0 + S);
                              return { position: c, normal: d, texcoord: b, indices: p };
                          }
                          function M(t, e) {
                              e = e || [];
                              for (var r = [], i = 0; i < t.length; i += 4) {
                                  var n = t[i],
                                      a = t.slice(i + 1, i + 4);
                                  a.push.apply(a, e);
                                  for (var s = 0; s < n; ++s) r.push.apply(r, a);
                              }
                              return r;
                          }
                          function F() {
                              var t = [
                                      0,
                                      0,
                                      0,
                                      0,
                                      150,
                                      0,
                                      30,
                                      0,
                                      0,
                                      0,
                                      150,
                                      0,
                                      30,
                                      150,
                                      0,
                                      30,
                                      0,
                                      0,
                                      30,
                                      0,
                                      0,
                                      30,
                                      30,
                                      0,
                                      100,
                                      0,
                                      0,
                                      30,
                                      30,
                                      0,
                                      100,
                                      30,
                                      0,
                                      100,
                                      0,
                                      0,
                                      30,
                                      60,
                                      0,
                                      30,
                                      90,
                                      0,
                                      67,
                                      60,
                                      0,
                                      30,
                                      90,
                                      0,
                                      67,
                                      90,
                                      0,
                                      67,
                                      60,
                                      0,
                                      0,
                                      0,
                                      30,
                                      30,
                                      0,
                                      30,
                                      0,
                                      150,
                                      30,
                                      0,
                                      150,
                                      30,
                                      30,
                                      0,
                                      30,
                                      30,
                                      150,
                                      30,
                                      30,
                                      0,
                                      30,
                                      100,
                                      0,
                                      30,
                                      30,
                                      30,
                                      30,
                                      30,
                                      30,
                                      30,
                                      100,
                                      0,
                                      30,
                                      100,
                                      30,
                                      30,
                                      30,
                                      60,
                                      30,
                                      67,
                                      60,
                                      30,
                                      30,
                                      90,
                                      30,
                                      30,
                                      90,
                                      30,
                                      67,
                                      60,
                                      30,
                                      67,
                                      90,
                                      30,
                                      0,
                                      0,
                                      0,
                                      100,
                                      0,
                                      0,
                                      100,
                                      0,
                                      30,
                                      0,
                                      0,
                                      0,
                                      100,
                                      0,
                                      30,
                                      0,
                                      0,
                                      30,
                                      100,
                                      0,
                                      0,
                                      100,
                                      30,
                                      0,
                                      100,
                                      30,
                                      30,
                                      100,
                                      0,
                                      0,
                                      100,
                                      30,
                                      30,
                                      100,
                                      0,
                                      30,
                                      30,
                                      30,
                                      0,
                                      30,
                                      30,
                                      30,
                                      100,
                                      30,
                                      30,
                                      30,
                                      30,
                                      0,
                                      100,
                                      30,
                                      30,
                                      100,
                                      30,
                                      0,
                                      30,
                                      30,
                                      0,
                                      30,
                                      60,
                                      30,
                                      30,
                                      30,
                                      30,
                                      30,
                                      30,
                                      0,
                                      30,
                                      60,
                                      0,
                                      30,
                                      60,
                                      30,
                                      30,
                                      60,
                                      0,
                                      67,
                                      60,
                                      30,
                                      30,
                                      60,
                                      30,
                                      30,
                                      60,
                                      0,
                                      67,
                                      60,
                                      0,
                                      67,
                                      60,
                                      30,
                                      67,
                                      60,
                                      0,
                                      67,
                                      90,
                                      30,
                                      67,
                                      60,
                                      30,
                                      67,
                                      60,
                                      0,
                                      67,
                                      90,
                                      0,
                                      67,
                                      90,
                                      30,
                                      30,
                                      90,
                                      0,
                                      30,
                                      90,
                                      30,
                                      67,
                                      90,
                                      30,
                                      30,
                                      90,
                                      0,
                                      67,
                                      90,
                                      30,
                                      67,
                                      90,
                                      0,
                                      30,
                                      90,
                                      0,
                                      30,
                                      150,
                                      30,
                                      30,
                                      90,
                                      30,
                                      30,
                                      90,
                                      0,
                                      30,
                                      150,
                                      0,
                                      30,
                                      150,
                                      30,
                                      0,
                                      150,
                                      0,
                                      0,
                                      150,
                                      30,
                                      30,
                                      150,
                                      30,
                                      0,
                                      150,
                                      0,
                                      30,
                                      150,
                                      30,
                                      30,
                                      150,
                                      0,
                                      0,
                                      0,
                                      0,
                                      0,
                                      0,
                                      30,
                                      0,
                                      150,
                                      30,
                                      0,
                                      0,
                                      0,
                                      0,
                                      150,
                                      30,
                                      0,
                                      150,
                                      0,
                                  ],
                                  e = M([18, 0, 0, 1, 18, 0, 0, -1, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1, 0, 0, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, -1, 0, 0]),
                                  r = M(
                                      [
                                          18,
                                          200,
                                          70,
                                          120,
                                          18,
                                          80,
                                          70,
                                          200,
                                          6,
                                          70,
                                          200,
                                          210,
                                          6,
                                          200,
                                          200,
                                          70,
                                          6,
                                          210,
                                          100,
                                          70,
                                          6,
                                          210,
                                          160,
                                          70,
                                          6,
                                          70,
                                          180,
                                          210,
                                          6,
                                          100,
                                          70,
                                          210,
                                          6,
                                          76,
                                          210,
                                          100,
                                          6,
                                          140,
                                          210,
                                          80,
                                          6,
                                          90,
                                          130,
                                          110,
                                          6,
                                          160,
                                          160,
                                          220,
                                      ],
                                      [255]
                                  ),
                                  i = t.length / 3,
                                  n = { position: f(3, i), texcoord: f(2, i), normal: f(3, i), color: f(4, i, Uint8Array), indices: f(3, i / 3, Uint16Array) };
                              n.position.push(t),
                                  n.texcoord.push([
                                      0.22,
                                      0.19,
                                      0.22,
                                      0.79,
                                      0.34,
                                      0.19,
                                      0.22,
                                      0.79,
                                      0.34,
                                      0.79,
                                      0.34,
                                      0.19,
                                      0.34,
                                      0.19,
                                      0.34,
                                      0.31,
                                      0.62,
                                      0.19,
                                      0.34,
                                      0.31,
                                      0.62,
                                      0.31,
                                      0.62,
                                      0.19,
                                      0.34,
                                      0.43,
                                      0.34,
                                      0.55,
                                      0.49,
                                      0.43,
                                      0.34,
                                      0.55,
                                      0.49,
                                      0.55,
                                      0.49,
                                      0.43,
                                      0,
                                      0,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      1,
                                      0,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      1,
                                      0,
                                      1,
                                      0,
                                      0,
                                      0,
                                      1,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      1,
                                      1,
                                      0,
                                      0,
                                      0,
                                      1,
                                      1,
                                      0,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      1,
                                      0,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      1,
                                      0,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      0,
                                      0,
                                      1,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      1,
                                      1,
                                      0,
                                      0,
                                      0,
                                      1,
                                      1,
                                      0,
                                      1,
                                      0,
                                      0,
                                      1,
                                      0,
                                      1,
                                      1,
                                      0,
                                      0,
                                      0,
                                      1,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      1,
                                      1,
                                      0,
                                      0,
                                      0,
                                      0,
                                      1,
                                      1,
                                      1,
                                      0,
                                      0,
                                      1,
                                      1,
                                      1,
                                      0,
                                  ]),
                                  n.normal.push(e),
                                  n.color.push(r);
                              for (var a = 0; a < i; ++a) n.indices.push(a);
                              return n;
                          }
                          function R(t, e, r, i, n, a, s) {
                              if (n <= 0) throw new Error("subdivisionDown must be > 0");
                              var h = 2,
                                  u = (s = s || 1) - (a = a || 0),
                                  l = 2 * (n + 1) * (2 + h),
                                  c = f(3, l),
                                  d = f(3, l),
                                  b = f(2, l);
                              function p(t, e, r) {
                                  return t + (e - t) * r;
                              }
                              function m(e, r, s, l, f, m) {
                                  for (var _ = 0; _ <= n; _++) {
                                      var g = r / (h - 1),
                                          v = _ / n,
                                          x = 2 * (g - 0.5),
                                          y = (a + v * u) * Math.PI,
                                          T = Math.sin(y),
                                          w = Math.cos(y),
                                          E = p(t, e, T),
                                          A = x * i,
                                          M = w * t,
                                          F = T * E;
                                      c.push(A, M, F);
                                      var R = o.add(o.multiply([0, T, w], s), l);
                                      d.push(R), b.push(g * f + m, v);
                                  }
                              }
                              for (var _ = 0; _ < h; _++) {
                                  var g = 2 * (_ / (h - 1) - 0.5);
                                  m(e, _, [1, 1, 1], [0, 0, 0], 1, 0), m(e, _, [0, 0, 0], [g, 0, 0], 0, 0), m(r, _, [1, 1, 1], [0, 0, 0], 1, 0), m(r, _, [0, 0, 0], [g, 0, 0], 0, 1);
                              }
                              var v = f(3, 2 * n * (2 + h), Uint16Array);
                              function x(t, e) {
                                  for (var r = 0; r < n; ++r) v.push(t + r + 0, t + r + 1, e + r + 0), v.push(t + r + 1, e + r + 1, e + r + 0);
                              }
                              var y = n + 1;
                              return x(0 * y, 4 * y), x(5 * y, 7 * y), x(6 * y, 2 * y), x(3 * y, 1 * y), { position: c, normal: d, texcoord: b, indices: v };
                          }
                          function S(t, e, r, i, n, a) {
                              return A(t, t, e, r, i, n, a);
                          }
                          function C(t, e, r, i, n, a) {
                              if (r < 3) throw new Error("radialSubdivisions must be 3 or greater");
                              if (i < 3) throw new Error("verticalSubdivisions must be 3 or greater");
                              n = n || 0;
                              for (var s = (a = a || 2 * Math.PI) - n, o = r + 1, h = i + 1, u = o * h, l = f(3, u), c = f(3, u), d = f(2, u), b = f(3, r * i * 2, Uint16Array), p = 0; p < h; ++p)
                                  for (var m = p / i, _ = m * Math.PI * 2, g = Math.sin(_), v = t + g * e, x = Math.cos(_), y = x * e, T = 0; T < o; ++T) {
                                      var w = T / r,
                                          E = n + w * s,
                                          A = Math.sin(E),
                                          M = Math.cos(E),
                                          F = A * v,
                                          R = M * v,
                                          S = A * g,
                                          C = M * g;
                                      l.push(F, y, R), c.push(S, x, C), d.push(w, 1 - m);
                                  }
                              for (var P = 0; P < i; ++P)
                                  for (var I = 0; I < r; ++I) {
                                      var U = 1 + I,
                                          k = 1 + P;
                                      b.push(o * P + I, o * k + I, o * P + U), b.push(o * k + I, o * k + U, o * P + U);
                                  }
                              return { position: l, normal: c, texcoord: d, indices: b };
                          }
                          function P(t, e, r, i, n) {
                              if (e < 3) throw new Error("divisions must be at least 3");
                              (n = n || 1), (i = i || 0);
                              for (var a = (e + 1) * ((r = r || 1) + 1), s = f(3, a), o = f(3, a), h = f(2, a), u = f(3, r * e * 2, Uint16Array), l = 0, c = t - i, d = e + 1, b = 0; b <= r; ++b) {
                                  for (var p = i + c * Math.pow(b / r, n), m = 0; m <= e; ++m) {
                                      var _ = (2 * Math.PI * m) / e,
                                          g = p * Math.cos(_),
                                          v = p * Math.sin(_);
                                      if ((s.push(g, 0, v), o.push(0, 1, 0), h.push(1 - m / e, b / r), b > 0 && m !== e)) {
                                          var x = l + (m + 1),
                                              y = l + m,
                                              T = l + m - d,
                                              w = l + (m + 1) - d;
                                          u.push(x, y, T), u.push(x, T, w);
                                      }
                                  }
                                  l += e + 1;
                              }
                              return { position: s, normal: o, texcoord: h, indices: u };
                          }
                          function I(t) {
                              return function (e) {
                                  var r = t.apply(this, Array.prototype.slice.call(arguments, 1));
                                  return i.createBuffersFromArrays(e, r);
                              };
                          }
                          function U(t) {
                              return function (e) {
                                  var r = t.apply(null, Array.prototype.slice.call(arguments, 1));
                                  return i.createBufferInfoFromArrays(e, r);
                              };
                          }
                          var k = ["numComponents", "size", "type", "normalize", "stride", "offset", "attrib", "name", "attribName"];
                          function D(t, e, r, i) {
                              i = i || 0;
                              for (var n = t.length, a = 0; a < n; ++a) e[r + a] = t[a] + i;
                          }
                          function O(t, e) {
                              var r = u(t),
                                  i = new r.constructor(e),
                                  a = i;
                              return r.numComponents && r.numElements && c(i, r.numComponents), t.data && ((a = { data: i }), n.copyNamedProperties(k, t, a)), a;
                          }
                          var B = U(F);
                          e.create3DFBufferInfo = B;
                          var N = I(F);
                          e.create3DFBuffers = N;
                          var L = U(E);
                          e.createCubeBufferInfo = L;
                          var z = I(E);
                          e.createCubeBuffers = z;
                          var j = U(y);
                          e.createPlaneBufferInfo = j;
                          var H = I(y);
                          e.createPlaneBuffers = H;
                          var G = U(T);
                          e.createSphereBufferInfo = G;
                          var V = I(T);
                          e.createSphereBuffers = V;
                          var q = U(A);
                          e.createTruncatedConeBufferInfo = q;
                          var X = I(A);
                          e.createTruncatedConeBuffers = X;
                          var Y = U(x);
                          e.createXYQuadBufferInfo = Y;
                          var Z = I(x);
                          e.createXYQuadBuffers = Z;
                          var W = U(R);
                          e.createCresentBufferInfo = W;
                          var K = I(R);
                          e.createCresentBuffers = K;
                          var J = U(S);
                          e.createCylinderBufferInfo = J;
                          var Q = I(S);
                          e.createCylinderBuffers = Q;
                          var $ = U(C);
                          e.createTorusBufferInfo = $;
                          var tt = I(C);
                          e.createTorusBuffers = tt;
                          var et = U(P);
                          e.createDiscBufferInfo = et;
                          var rt = I(P);
                          e.createDiscBuffers = rt;
                      },
                  "./src/programs.js":
                      /*!*************************!*\
    !*** ./src/programs.js ***!
    \*************************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.createAttributeSetters = z),
                              (e.createProgram = S),
                              (e.createProgramFromScripts = function (t, e, r, i, n) {
                                  for (var a = A(r, i, n), s = [], o = 0; o < e.length; ++o) {
                                      var h = C(t, e[o], t[M[o]], a.errorCallback);
                                      if (!h) return null;
                                      s.push(h);
                                  }
                                  return S(t, s, a);
                              }),
                              (e.createProgramFromSources = P),
                              (e.createProgramInfo = function (t, e, r, i, n) {
                                  var a = A(r, i, n),
                                      s = !0;
                                  if (
                                      ((e = e.map(function (t) {
                                          if (t.indexOf("\n") < 0) {
                                              var e = h(t);
                                              e ? (t = e.text) : (a.errorCallback("no element with id: " + t), (s = !1));
                                          }
                                          return t;
                                      })),
                                      !s)
                                  )
                                      return null;
                                  var o = P(t, e, a);
                                  if (!o) return null;
                                  return H(t, o);
                              }),
                              (e.createProgramInfoFromProgram = H),
                              (e.createUniformSetters = U),
                              (e.createUniformBlockSpecFromProgram = O),
                              (e.createUniformBlockInfoFromProgram = N),
                              (e.createUniformBlockInfo = function (t, e, r) {
                                  return N(t, e.program, e.uniformBlockSpec, r);
                              }),
                              (e.createTransformFeedback = function (t, e, r) {
                                  var i = t.createTransformFeedback();
                                  return t.bindTransformFeedback(t.TRANSFORM_FEEDBACK, i), t.useProgram(e.program), D(t, e, r), t.bindTransformFeedback(t.TRANSFORM_FEEDBACK, null), i;
                              }),
                              (e.createTransformFeedbackInfo = k),
                              (e.bindTransformFeedbackInfo = D),
                              (e.setAttributes = j),
                              (e.setBuffersAndAttributes = function (t, e, r) {
                                  r.vertexArrayObject ? t.bindVertexArray(r.vertexArrayObject) : (j(e.attribSetters || e, r.attribs), r.indices && t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, r.indices));
                              }),
                              (e.setUniforms = function t(e, r) {
                                  var i = e.uniformSetters || e;
                                  var n = arguments.length;
                                  for (var a = 1; a < n; ++a) {
                                      var s = arguments[a];
                                      if (Array.isArray(s)) for (var o = s.length, h = 0; h < o; ++h) t(i, s[h]);
                                      else
                                          for (var u in s) {
                                              var l = i[u];
                                              l && l(s[u]);
                                          }
                                  }
                              }),
                              (e.setUniformBlock = function (t, e, r) {
                                  L(t, e, r) && t.bufferData(t.UNIFORM_BUFFER, r.array, t.DYNAMIC_DRAW);
                              }),
                              (e.setBlockUniforms = function (t, e) {
                                  var r = t.uniforms;
                                  for (var i in e) {
                                      var n = r[i];
                                      if (n) {
                                          var a = e[i];
                                          a.length ? n.set(a) : (n[0] = a);
                                      }
                                  }
                              }),
                              (e.bindUniformBlock = L);
                          var i = a(r(/*! ./utils.js */ "./src/utils.js")),
                              n = a(r(/*! ./helper.js */ "./src/helper.js"));
                          function a(t) {
                              if (t && t.__esModule) return t;
                              var e = {};
                              if (null != t)
                                  for (var r in t)
                                      if (Object.prototype.hasOwnProperty.call(t, r)) {
                                          var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                                          i.get || i.set ? Object.defineProperty(e, r, i) : (e[r] = t[r]);
                                      }
                              return (e.default = t), e;
                          }
                          var s = n.error,
                              o = n.warn,
                              h =
                                  "undefined" != typeof document && document.getElementById
                                      ? document.getElementById.bind(document)
                                      : function () {
                                            return null;
                                        },
                              u = {};
                          function l(t, e) {
                              return u[e].bindPoint;
                          }
                          function c(t, e) {
                              return function (r) {
                                  t.uniform1i(e, r);
                              };
                          }
                          function f(t, e) {
                              return function (r) {
                                  t.uniform1iv(e, r);
                              };
                          }
                          function d(t, e) {
                              return function (r) {
                                  t.uniform2iv(e, r);
                              };
                          }
                          function b(t, e) {
                              return function (r) {
                                  t.uniform3iv(e, r);
                              };
                          }
                          function p(t, e) {
                              return function (r) {
                                  t.uniform4iv(e, r);
                              };
                          }
                          function m(t, e, r, a) {
                              var s = l(0, e);
                              return i.isWebGL2(t)
                                  ? function (e) {
                                        var i, o;
                                        n.isTexture(t, e) ? ((i = e), (o = null)) : ((i = e.texture), (o = e.sampler)), t.uniform1i(a, r), t.activeTexture(t.TEXTURE0 + r), t.bindTexture(s, i), t.bindSampler(r, o);
                                    }
                                  : function (e) {
                                        t.uniform1i(a, r), t.activeTexture(t.TEXTURE0 + r), t.bindTexture(s, e);
                                    };
                          }
                          function _(t, e, r, a, s) {
                              for (var o = l(0, e), h = new Int32Array(s), u = 0; u < s; ++u) h[u] = r + u;
                              return i.isWebGL2(t)
                                  ? function (e) {
                                        t.uniform1iv(a, h),
                                            e.forEach(function (e, i) {
                                                var a, s;
                                                t.activeTexture(t.TEXTURE0 + h[i]), n.isTexture(t, e) ? ((a = e), (s = null)) : ((a = e.texture), (s = e.sampler)), t.bindSampler(r, s), t.bindTexture(o, a);
                                            });
                                    }
                                  : function (e) {
                                        t.uniform1iv(a, h),
                                            e.forEach(function (e, r) {
                                                t.activeTexture(t.TEXTURE0 + h[r]), t.bindTexture(o, e);
                                            });
                                    };
                          }
                          function g(t, e) {
                              return function (r) {
                                  if (r.value)
                                      switch ((t.disableVertexAttribArray(e), r.value.length)) {
                                          case 4:
                                              t.vertexAttrib4fv(e, r.value);
                                              break;
                                          case 3:
                                              t.vertexAttrib3fv(e, r.value);
                                              break;
                                          case 2:
                                              t.vertexAttrib2fv(e, r.value);
                                              break;
                                          case 1:
                                              t.vertexAttrib1fv(e, r.value);
                                              break;
                                          default:
                                              throw new Error("the length of a float constant value must be between 1 and 4!");
                                      }
                                  else
                                      t.bindBuffer(t.ARRAY_BUFFER, r.buffer),
                                          t.enableVertexAttribArray(e),
                                          t.vertexAttribPointer(e, r.numComponents || r.size, r.type || t.FLOAT, r.normalize || !1, r.stride || 0, r.offset || 0),
                                          void 0 !== r.divisor && t.vertexAttribDivisor(e, r.divisor);
                              };
                          }
                          function v(t, e) {
                              return function (r) {
                                  if (r.value) {
                                      if ((t.disableVertexAttribArray(e), 4 !== r.value.length)) throw new Error("The length of an integer constant value must be 4!");
                                      t.vertexAttrib4iv(e, r.value);
                                  } else
                                      t.bindBuffer(t.ARRAY_BUFFER, r.buffer),
                                          t.enableVertexAttribArray(e),
                                          t.vertexAttribIPointer(e, r.numComponents || r.size, r.type || t.INT, r.stride || 0, r.offset || 0),
                                          void 0 !== r.divisor && t.vertexAttribDivisor(e, r.divisor);
                              };
                          }
                          function x(t, e) {
                              return function (r) {
                                  if (r.value) {
                                      if ((t.disableVertexAttribArray(e), 4 !== r.value.length)) throw new Error("The length of an unsigned integer constant value must be 4!");
                                      t.vertexAttrib4uiv(e, r.value);
                                  } else
                                      t.bindBuffer(t.ARRAY_BUFFER, r.buffer),
                                          t.enableVertexAttribArray(e),
                                          t.vertexAttribIPointer(e, r.numComponents || r.size, r.type || t.UNSIGNED_INT, r.stride || 0, r.offset || 0),
                                          void 0 !== r.divisor && t.vertexAttribDivisor(e, r.divisor);
                              };
                          }
                          function y(t, e, r) {
                              var i = r.size,
                                  n = r.count;
                              return function (r) {
                                  t.bindBuffer(t.ARRAY_BUFFER, r.buffer);
                                  for (var a = r.size || r.numComponents || i, s = a / n, o = r.type || t.FLOAT, h = u[o].size * a, l = r.normalize || !1, c = r.offset || 0, f = h / n, d = 0; d < n; ++d)
                                      t.enableVertexAttribArray(e + d), t.vertexAttribPointer(e + d, s, o, l, h, c + f * d), void 0 !== r.divisor && t.vertexAttribDivisor(e + d, r.divisor);
                              };
                          }
                          (u[5126] = {
                              Type: Float32Array,
                              size: 4,
                              setter: function (t, e) {
                                  return function (r) {
                                      t.uniform1f(e, r);
                                  };
                              },
                              arraySetter: function (t, e) {
                                  return function (r) {
                                      t.uniform1fv(e, r);
                                  };
                              },
                          }),
                              (u[35664] = {
                                  Type: Float32Array,
                                  size: 8,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniform2fv(e, r);
                                      };
                                  },
                              }),
                              (u[35665] = {
                                  Type: Float32Array,
                                  size: 12,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniform3fv(e, r);
                                      };
                                  },
                              }),
                              (u[35666] = {
                                  Type: Float32Array,
                                  size: 16,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniform4fv(e, r);
                                      };
                                  },
                              }),
                              (u[5124] = { Type: Int32Array, size: 4, setter: c, arraySetter: f }),
                              (u[35667] = { Type: Int32Array, size: 8, setter: d }),
                              (u[35668] = { Type: Int32Array, size: 12, setter: b }),
                              (u[35669] = { Type: Int32Array, size: 16, setter: p }),
                              (u[5125] = {
                                  Type: Uint32Array,
                                  size: 4,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniform1ui(e, r);
                                      };
                                  },
                                  arraySetter: function (t, e) {
                                      return function (r) {
                                          t.uniform1uiv(e, r);
                                      };
                                  },
                              }),
                              (u[36294] = {
                                  Type: Uint32Array,
                                  size: 8,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniform2uiv(e, r);
                                      };
                                  },
                              }),
                              (u[36295] = {
                                  Type: Uint32Array,
                                  size: 12,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniform3uiv(e, r);
                                      };
                                  },
                              }),
                              (u[36296] = {
                                  Type: Uint32Array,
                                  size: 16,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniform4uiv(e, r);
                                      };
                                  },
                              }),
                              (u[35670] = { Type: Uint32Array, size: 4, setter: c, arraySetter: f }),
                              (u[35671] = { Type: Uint32Array, size: 8, setter: d }),
                              (u[35672] = { Type: Uint32Array, size: 12, setter: b }),
                              (u[35673] = { Type: Uint32Array, size: 16, setter: p }),
                              (u[35674] = {
                                  Type: Float32Array,
                                  size: 16,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniformMatrix2fv(e, !1, r);
                                      };
                                  },
                              }),
                              (u[35675] = {
                                  Type: Float32Array,
                                  size: 36,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniformMatrix3fv(e, !1, r);
                                      };
                                  },
                              }),
                              (u[35676] = {
                                  Type: Float32Array,
                                  size: 64,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniformMatrix4fv(e, !1, r);
                                      };
                                  },
                              }),
                              (u[35685] = {
                                  Type: Float32Array,
                                  size: 24,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniformMatrix2x3fv(e, !1, r);
                                      };
                                  },
                              }),
                              (u[35686] = {
                                  Type: Float32Array,
                                  size: 32,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniformMatrix2x4fv(e, !1, r);
                                      };
                                  },
                              }),
                              (u[35687] = {
                                  Type: Float32Array,
                                  size: 24,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniformMatrix3x2fv(e, !1, r);
                                      };
                                  },
                              }),
                              (u[35688] = {
                                  Type: Float32Array,
                                  size: 48,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniformMatrix3x4fv(e, !1, r);
                                      };
                                  },
                              }),
                              (u[35689] = {
                                  Type: Float32Array,
                                  size: 32,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniformMatrix4x2fv(e, !1, r);
                                      };
                                  },
                              }),
                              (u[35690] = {
                                  Type: Float32Array,
                                  size: 48,
                                  setter: function (t, e) {
                                      return function (r) {
                                          t.uniformMatrix4x3fv(e, !1, r);
                                      };
                                  },
                              }),
                              (u[35678] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 3553 }),
                              (u[35680] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 34067 }),
                              (u[35679] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 32879 }),
                              (u[35682] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 3553 }),
                              (u[36289] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 35866 }),
                              (u[36292] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 35866 }),
                              (u[36293] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 34067 }),
                              (u[36298] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 3553 }),
                              (u[36299] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 32879 }),
                              (u[36300] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 34067 }),
                              (u[36303] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 35866 }),
                              (u[36306] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 3553 }),
                              (u[36307] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 32879 }),
                              (u[36308] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 34067 }),
                              (u[36311] = { Type: null, size: 0, setter: m, arraySetter: _, bindPoint: 35866 });
                          var T = {};
                          (T[5126] = { size: 4, setter: g }),
                              (T[35664] = { size: 8, setter: g }),
                              (T[35665] = { size: 12, setter: g }),
                              (T[35666] = { size: 16, setter: g }),
                              (T[5124] = { size: 4, setter: v }),
                              (T[35667] = { size: 8, setter: v }),
                              (T[35668] = { size: 12, setter: v }),
                              (T[35669] = { size: 16, setter: v }),
                              (T[5125] = { size: 4, setter: x }),
                              (T[36294] = { size: 8, setter: x }),
                              (T[36295] = { size: 12, setter: x }),
                              (T[36296] = { size: 16, setter: x }),
                              (T[35670] = { size: 4, setter: v }),
                              (T[35671] = { size: 8, setter: v }),
                              (T[35672] = { size: 12, setter: v }),
                              (T[35673] = { size: 16, setter: v }),
                              (T[35674] = { size: 4, setter: y, count: 2 }),
                              (T[35675] = { size: 9, setter: y, count: 3 }),
                              (T[35676] = { size: 16, setter: y, count: 4 });
                          var w = /^[ \t]*\n/;
                          function E(t, e, r, i) {
                              var n = i || s,
                                  a = t.createShader(r),
                                  o = 0;
                              if ((w.test(e) && ((o = 1), (e = e.replace(w, ""))), t.shaderSource(a, e), t.compileShader(a), !t.getShaderParameter(a, t.COMPILE_STATUS))) {
                                  var h = t.getShaderInfoLog(a);
                                  return (
                                      n(
                                          (function (t, e) {
                                              return (
                                                  (e = e || 0),
                                                  ++e,
                                                  t
                                                      .split("\n")
                                                      .map(function (t, r) {
                                                          return r + e + ": " + t;
                                                      })
                                                      .join("\n")
                                              );
                                          })(e, o) +
                                              "\n*** Error compiling shader: " +
                                              h
                                      ),
                                      t.deleteShader(a),
                                      null
                                  );
                              }
                              return a;
                          }
                          function A(t, e, r) {
                              var i;
                              if (("function" == typeof e && ((r = e), (e = void 0)), "function" == typeof t)) (r = t), (t = void 0);
                              else if (t && !Array.isArray(t)) {
                                  if (t.errorCallback) return t;
                                  var n = t;
                                  (r = n.errorCallback), (t = n.attribLocations), (i = n.transformFeedbackVaryings);
                              }
                              var a = { errorCallback: r || s, transformFeedbackVaryings: i };
                              if (t) {
                                  var o = {};
                                  Array.isArray(t)
                                      ? t.forEach(function (t, r) {
                                            o[t] = e ? e[r] : r;
                                        })
                                      : (o = t),
                                      (a.attribLocations = o);
                              }
                              return a;
                          }
                          var M = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
                          function F(t, e) {
                              return e.indexOf("frag") >= 0 ? t.FRAGMENT_SHADER : e.indexOf("vert") >= 0 ? t.VERTEX_SHADER : void 0;
                          }
                          function R(t, e) {
                              e.forEach(function (e) {
                                  t.deleteShader(e);
                              });
                          }
                          function S(t, e, r, i, a) {
                              for (var s = A(r, i, a), o = [], u = [], l = 0; l < e.length; ++l) {
                                  var c = e[l];
                                  if ("string" == typeof c) {
                                      var f = h(c),
                                          d = f ? f.text : c,
                                          b = t[M[l]];
                                      f && f.type && (b = F(t, f.type) || b), (c = E(t, d, b, s.errorCallback)), u.push(c);
                                  }
                                  n.isShader(t, c) && o.push(c);
                              }
                              if (o.length !== e.length) return s.errorCallback("not enough shaders for program"), R(t, u), null;
                              var p = t.createProgram();
                              o.forEach(function (e) {
                                  t.attachShader(p, e);
                              }),
                                  s.attribLocations &&
                                      Object.keys(s.attribLocations).forEach(function (e) {
                                          t.bindAttribLocation(p, s.attribLocations[e], e);
                                      });
                              var m = s.transformFeedbackVaryings;
                              if (
                                  (m && (m.attribs && (m = m.attribs), Array.isArray(m) || (m = Object.keys(m)), t.transformFeedbackVaryings(p, m, s.transformFeedbackMode || t.SEPARATE_ATTRIBS)),
                                  t.linkProgram(p),
                                  !t.getProgramParameter(p, t.LINK_STATUS))
                              ) {
                                  var _ = t.getProgramInfoLog(p);
                                  return s.errorCallback("Error in program linking:" + _), t.deleteProgram(p), R(t, u), null;
                              }
                              return p;
                          }
                          function C(t, e, r, i) {
                              var n,
                                  a = h(e);
                              if (!a) throw new Error("unknown script element: ".concat(e));
                              n = a.text;
                              var s = r || F(t, a.type);
                              if (!s) throw new Error("unknown shader type");
                              return E(t, n, s, i);
                          }
                          function P(t, e, r, i, n) {
                              for (var a = A(r, i, n), s = [], o = 0; o < e.length; ++o) {
                                  var h = E(t, e[o], t[M[o]], a.errorCallback);
                                  if (!h) return null;
                                  s.push(h);
                              }
                              return S(t, s, a);
                          }
                          function I(t) {
                              var e = t.name;
                              return e.startsWith("gl_") || e.startsWith("webgl_");
                          }
                          function U(t, e) {
                              var r = 0;
                              function i(e, i) {
                                  var n,
                                      a = t.getUniformLocation(e, i.name),
                                      s = i.size > 1 && "[0]" === i.name.substr(-3),
                                      o = i.type,
                                      h = u[o];
                                  if (!h) throw new Error("unknown type: 0x".concat(o.toString(16)));
                                  if (h.bindPoint) {
                                      var l = r;
                                      (r += i.size), (n = s ? h.arraySetter(t, o, l, a, i.size) : h.setter(t, o, l, a, i.size));
                                  } else n = h.arraySetter && s ? h.arraySetter(t, a) : h.setter(t, a);
                                  return (n.location = a), n;
                              }
                              for (var n = {}, a = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), s = 0; s < a; ++s) {
                                  var o = t.getActiveUniform(e, s);
                                  if (!I(o)) {
                                      var h = o.name;
                                      "[0]" === h.substr(-3) && (h = h.substr(0, h.length - 3));
                                      var l = i(e, o);
                                      n[h] = l;
                                  }
                              }
                              return n;
                          }
                          function k(t, e) {
                              for (var r = {}, i = t.getProgramParameter(e, t.TRANSFORM_FEEDBACK_VARYINGS), n = 0; n < i; ++n) {
                                  var a = t.getTransformFeedbackVarying(e, n);
                                  r[a.name] = { index: n, type: a.type, size: a.size };
                              }
                              return r;
                          }
                          function D(t, e, r) {
                              for (var i in (e.transformFeedbackInfo && (e = e.transformFeedbackInfo), r.attribs && (r = r.attribs), r)) {
                                  var n = e[i];
                                  if (n) {
                                      var a = r[i];
                                      a.offset ? t.bindBufferRange(t.TRANSFORM_FEEDBACK_BUFFER, n.index, a.buffer, a.offset, a.size) : t.bindBufferBase(t.TRANSFORM_FEEDBACK_BUFFER, n.index, a.buffer);
                                  }
                              }
                          }
                          function O(t, e) {
                              for (var r = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), i = [], n = [], a = 0; a < r; ++a) {
                                  n.push(a), i.push({});
                                  var s = t.getActiveUniform(e, a);
                                  if (I(s)) break;
                                  i[a].name = s.name;
                              }
                              [
                                  ["UNIFORM_TYPE", "type"],
                                  ["UNIFORM_SIZE", "size"],
                                  ["UNIFORM_BLOCK_INDEX", "blockNdx"],
                                  ["UNIFORM_OFFSET", "offset"],
                              ].forEach(function (r) {
                                  var a = r[0],
                                      s = r[1];
                                  t.getActiveUniforms(e, n, t[a]).forEach(function (t, e) {
                                      i[e][s] = t;
                                  });
                              });
                              for (var o = {}, h = t.getProgramParameter(e, t.ACTIVE_UNIFORM_BLOCKS), u = 0; u < h; ++u) {
                                  var l = t.getActiveUniformBlockName(e, u),
                                      c = {
                                          index: u,
                                          usedByVertexShader: t.getActiveUniformBlockParameter(e, u, t.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
                                          usedByFragmentShader: t.getActiveUniformBlockParameter(e, u, t.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
                                          size: t.getActiveUniformBlockParameter(e, u, t.UNIFORM_BLOCK_DATA_SIZE),
                                          uniformIndices: t.getActiveUniformBlockParameter(e, u, t.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES),
                                      };
                                  (c.used = c.usedByVertexSahder || c.usedByFragmentShader), (o[l] = c);
                              }
                              return { blockSpecs: o, uniformData: i };
                          }
                          var B = /\[\d+\]\.$/;
                          function N(t, e, r, i) {
                              var n = r.blockSpecs,
                                  a = r.uniformData,
                                  s = n[i];
                              if (!s) return o("no uniform block object named:", i), { name: i, uniforms: {} };
                              var h = new ArrayBuffer(s.size),
                                  l = t.createBuffer(),
                                  c = s.index;
                              t.bindBuffer(t.UNIFORM_BUFFER, l), t.uniformBlockBinding(e, s.index, c);
                              var f = i + ".";
                              B.test(f) && (f = f.replace(B, "."));
                              var d = {};
                              return (
                                  s.uniformIndices.forEach(function (t) {
                                      var e = a[t],
                                          r = u[e.type],
                                          i = r.Type,
                                          n = e.size * r.size,
                                          s = e.name;
                                      s.substr(0, f.length) === f && (s = s.substr(f.length)), (d[s] = new i(h, e.offset, n / i.BYTES_PER_ELEMENT));
                                  }),
                                  { name: i, array: h, asFloat: new Float32Array(h), buffer: l, uniforms: d }
                              );
                          }
                          function L(t, e, r) {
                              var i = (e.uniformBlockSpec || e).blockSpecs[r.name];
                              if (i) {
                                  var n = i.index;
                                  return t.bindBufferRange(t.UNIFORM_BUFFER, n, r.buffer, r.offset || 0, r.array.byteLength), !0;
                              }
                              return !1;
                          }
                          function z(t, e) {
                              for (var r = {}, i = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), n = 0; n < i; ++n) {
                                  var a = t.getActiveAttrib(e, n);
                                  if (!I(a)) {
                                      var s = t.getAttribLocation(e, a.name),
                                          o = T[a.type],
                                          h = o.setter(t, s, o);
                                      (h.location = s), (r[a.name] = h);
                                  }
                              }
                              return r;
                          }
                          function j(t, e) {
                              for (var r in e) {
                                  var i = t[r];
                                  i && i(e[r]);
                              }
                          }
                          function H(t, e) {
                              var r = { program: e, uniformSetters: U(t, e), attribSetters: z(t, e) };
                              return i.isWebGL2(t) && ((r.uniformBlockSpec = O(t, e)), (r.transformFeedbackInfo = k(t, e))), r;
                          }
                      },
                  "./src/textures.js":
                      /*!*************************!*\
    !*** ./src/textures.js ***!
    \*************************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.setTextureDefaults_ = function (t) {
                                  a.copyExistingProperties(t, o), t.textureColor && w(t.textureColor);
                              }),
                              (e.createSampler = I),
                              (e.createSamplers = function (t, e) {
                                  var r = {};
                                  return (
                                      Object.keys(e).forEach(function (i) {
                                          r[i] = I(t, e[i]);
                                      }),
                                      r
                                  );
                              }),
                              (e.setSamplerParameters = P),
                              (e.createTexture = Z),
                              (e.setEmptyTexture = Y),
                              (e.setTextureFromArray = X),
                              (e.loadTextureFromUrl = G),
                              (e.setTextureFromElement = B),
                              (e.setTextureFilteringForSize = U),
                              (e.setTextureParameters = C),
                              (e.setDefaultTextureColor = w),
                              (e.createTextures = function (t, e, r) {
                                  r = r || N;
                                  var i = 0,
                                      n = [],
                                      a = {},
                                      s = {};
                                  function o() {
                                      0 === i &&
                                          setTimeout(function () {
                                              r(n.length ? n : void 0, a, s);
                                          }, 0);
                                  }
                                  return (
                                      Object.keys(e).forEach(function (r) {
                                          var h,
                                              u,
                                              l = e[r];
                                          ("string" == typeof (u = l.src) || (Array.isArray(u) && "string" == typeof u[0])) &&
                                              ((h = function (t, e, a) {
                                                  (s[r] = a), --i, t && n.push(t), o();
                                              }),
                                              ++i),
                                              (a[r] = Z(t, l, h));
                                      }),
                                      o(),
                                      a
                                  );
                              }),
                              (e.resizeTexture = function (t, e, r, i, n) {
                                  (i = i || r.width), (n = n || r.height);
                                  var a = r.target || t.TEXTURE_2D;
                                  t.bindTexture(a, e);
                                  var s,
                                      o = r.level || 0,
                                      u = r.internalFormat || r.format || t.RGBA,
                                      l = _(u),
                                      c = r.format || l.format,
                                      f = r.src;
                                  s = f && (h(f) || (Array.isArray(f) && "number" == typeof f[0])) ? r.type || y(t, f, l.type) : r.type || l.type;
                                  if (a === t.TEXTURE_CUBE_MAP) for (var d = 0; d < 6; ++d) t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + d, o, u, i, n, 0, c, s, null);
                                  else t.texImage2D(a, o, u, i, n, 0, c, s, null);
                              }),
                              (e.canGenerateMipmap = v),
                              (e.canFilter = x),
                              (e.getNumComponentsForFormat = function (t) {
                                  var e = f[t];
                                  if (!e) throw "unknown format: " + t;
                                  return e.numColorComponents;
                              }),
                              (e.getBytesPerElementForInternalFormat = m),
                              (e.getFormatAndTypeForInternalFormat = _);
                          var i = s(r(/*! ./utils.js */ "./src/utils.js")),
                              n = s(r(/*! ./typedarrays.js */ "./src/typedarrays.js")),
                              a = s(r(/*! ./helper.js */ "./src/helper.js"));
                          function s(t) {
                              if (t && t.__esModule) return t;
                              var e = {};
                              if (null != t)
                                  for (var r in t)
                                      if (Object.prototype.hasOwnProperty.call(t, r)) {
                                          var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                                          i.get || i.set ? Object.defineProperty(e, r, i) : (e[r] = t[r]);
                                      }
                              return (e.default = t), e;
                          }
                          var o = { textureColor: new Uint8Array([128, 192, 255, 255]), textureOptions: {}, crossOrigin: void 0 },
                              h = n.isArrayBuffer,
                              u = "undefined" != typeof document && document.createElement ? document.createElement("canvas").getContext("2d") : null,
                              l = 6407,
                              c = 33319,
                              f = {},
                              d = f;
                          (d[6406] = { numColorComponents: 1 }),
                              (d[6409] = { numColorComponents: 1 }),
                              (d[6410] = { numColorComponents: 2 }),
                              (d[l] = { numColorComponents: 3 }),
                              (d[6408] = { numColorComponents: 4 }),
                              (d[6403] = { numColorComponents: 1 }),
                              (d[36244] = { numColorComponents: 1 }),
                              (d[c] = { numColorComponents: 2 }),
                              (d[33320] = { numColorComponents: 2 }),
                              (d[l] = { numColorComponents: 3 }),
                              (d[36248] = { numColorComponents: 3 }),
                              (d[6408] = { numColorComponents: 4 }),
                              (d[36249] = { numColorComponents: 4 }),
                              (d[6402] = { numColorComponents: 1 }),
                              (d[34041] = { numColorComponents: 2 });
                          var b = {},
                              p = b;
                          function m(t, e) {
                              var r = b[t];
                              if (!r) throw "unknown internal format";
                              var i = r.bytesPerElementMap[e];
                              if (void 0 === i) throw "unknown internal format";
                              return i;
                          }
                          function _(t) {
                              var e = b[t];
                              if (!e) throw "unknown internal format";
                              return { format: e.textureFormat, type: e.type[0] };
                          }
                          function g(t) {
                              return 0 == (t & (t - 1));
                          }
                          function v(t, e, r, n) {
                              if (!i.isWebGL2(t)) return g(e) && g(r);
                              var a = b[n];
                              if (!a) throw "unknown internal format";
                              return a.colorRenderable && a.textureFilterable;
                          }
                          function x(t) {
                              var e = b[t];
                              if (!e) throw "unknown internal format";
                              return e.textureFilterable;
                          }
                          function y(t, e, r) {
                              return h(e) ? n.getGLTypeForTypedArray(e) : r || t.UNSIGNED_BYTE;
                          }
                          function T(t, e, r, i, n) {
                              if (n % 1 != 0) throw "can't guess dimensions";
                              if (r || i) {
                                  if (i) {
                                      if (!r && (r = n / i) % 1) throw "can't guess dimensions";
                                  } else if ((i = n / r) % 1) throw "can't guess dimensions";
                              } else {
                                  var a = Math.sqrt(n / (e === t.TEXTURE_CUBE_MAP ? 6 : 1));
                                  a % 1 == 0 ? ((r = a), (i = a)) : ((r = n), (i = 1));
                              }
                              return { width: r, height: i };
                          }
                          function w(t) {
                              o.textureColor = new Uint8Array([255 * t[0], 255 * t[1], 255 * t[2], 255 * t[3]]);
                          }
                          (p[6406] = { textureFormat: 6406, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [1, 2, 2, 4], type: [5121, 5131, 36193, 5126] }),
                              (p[6409] = { textureFormat: 6409, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [1, 2, 2, 4], type: [5121, 5131, 36193, 5126] }),
                              (p[6410] = { textureFormat: 6410, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [2, 4, 4, 8], type: [5121, 5131, 36193, 5126] }),
                              (p[l] = { textureFormat: l, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [3, 6, 6, 12, 2], type: [5121, 5131, 36193, 5126, 33635] }),
                              (p[6408] = { textureFormat: 6408, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [4, 8, 8, 16, 2, 2], type: [5121, 5131, 36193, 5126, 32819, 32820] }),
                              (p[33321] = { textureFormat: 6403, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [1], type: [5121] }),
                              (p[36756] = { textureFormat: 6403, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [1], type: [5120] }),
                              (p[33325] = { textureFormat: 6403, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [4, 2], type: [5126, 5131] }),
                              (p[33326] = { textureFormat: 6403, colorRenderable: !1, textureFilterable: !1, bytesPerElement: [4], type: [5126] }),
                              (p[33330] = { textureFormat: 36244, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [1], type: [5121] }),
                              (p[33329] = { textureFormat: 36244, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [1], type: [5120] }),
                              (p[33332] = { textureFormat: 36244, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [2], type: [5123] }),
                              (p[33331] = { textureFormat: 36244, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [2], type: [5122] }),
                              (p[33334] = { textureFormat: 36244, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [5125] }),
                              (p[33333] = { textureFormat: 36244, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [5124] }),
                              (p[33323] = { textureFormat: c, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [2], type: [5121] }),
                              (p[36757] = { textureFormat: c, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [2], type: [5120] }),
                              (p[33327] = { textureFormat: c, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [8, 4], type: [5126, 5131] }),
                              (p[33328] = { textureFormat: c, colorRenderable: !1, textureFilterable: !1, bytesPerElement: [8], type: [5126] }),
                              (p[33336] = { textureFormat: 33320, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [2], type: [5121] }),
                              (p[33335] = { textureFormat: 33320, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [2], type: [5120] }),
                              (p[33338] = { textureFormat: 33320, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [5123] }),
                              (p[33337] = { textureFormat: 33320, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [5122] }),
                              (p[33340] = { textureFormat: 33320, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [8], type: [5125] }),
                              (p[33339] = { textureFormat: 33320, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [8], type: [5124] }),
                              (p[32849] = { textureFormat: l, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [3], type: [5121] }),
                              (p[35905] = { textureFormat: l, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [3], type: [5121] }),
                              (p[36194] = { textureFormat: l, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [3, 2], type: [5121, 33635] }),
                              (p[36758] = { textureFormat: l, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [3], type: [5120] }),
                              (p[35898] = { textureFormat: l, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [12, 6, 4], type: [5126, 5131, 35899] }),
                              (p[35901] = { textureFormat: l, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [12, 6, 4], type: [5126, 5131, 35902] }),
                              (p[34843] = { textureFormat: l, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [12, 6], type: [5126, 5131] }),
                              (p[34837] = { textureFormat: l, colorRenderable: !1, textureFilterable: !1, bytesPerElement: [12], type: [5126] }),
                              (p[36221] = { textureFormat: 36248, colorRenderable: !1, textureFilterable: !1, bytesPerElement: [3], type: [5121] }),
                              (p[36239] = { textureFormat: 36248, colorRenderable: !1, textureFilterable: !1, bytesPerElement: [3], type: [5120] }),
                              (p[36215] = { textureFormat: 36248, colorRenderable: !1, textureFilterable: !1, bytesPerElement: [6], type: [5123] }),
                              (p[36233] = { textureFormat: 36248, colorRenderable: !1, textureFilterable: !1, bytesPerElement: [6], type: [5122] }),
                              (p[36209] = { textureFormat: 36248, colorRenderable: !1, textureFilterable: !1, bytesPerElement: [12], type: [5125] }),
                              (p[36227] = { textureFormat: 36248, colorRenderable: !1, textureFilterable: !1, bytesPerElement: [12], type: [5124] }),
                              (p[32856] = { textureFormat: 6408, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [4], type: [5121] }),
                              (p[35907] = { textureFormat: 6408, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [4], type: [5121] }),
                              (p[36759] = { textureFormat: 6408, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [4], type: [5120] }),
                              (p[32855] = { textureFormat: 6408, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [4, 2, 4], type: [5121, 32820, 33640] }),
                              (p[32854] = { textureFormat: 6408, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [4, 2], type: [5121, 32819] }),
                              (p[32857] = { textureFormat: 6408, colorRenderable: !0, textureFilterable: !0, bytesPerElement: [4], type: [33640] }),
                              (p[34842] = { textureFormat: 6408, colorRenderable: !1, textureFilterable: !0, bytesPerElement: [16, 8], type: [5126, 5131] }),
                              (p[34836] = { textureFormat: 6408, colorRenderable: !1, textureFilterable: !1, bytesPerElement: [16], type: [5126] }),
                              (p[36220] = { textureFormat: 36249, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [5121] }),
                              (p[36238] = { textureFormat: 36249, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [5120] }),
                              (p[36975] = { textureFormat: 36249, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [33640] }),
                              (p[36214] = { textureFormat: 36249, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [8], type: [5123] }),
                              (p[36232] = { textureFormat: 36249, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [8], type: [5122] }),
                              (p[36226] = { textureFormat: 36249, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [16], type: [5124] }),
                              (p[36208] = { textureFormat: 36249, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [16], type: [5125] }),
                              (p[33189] = { textureFormat: 6402, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [2, 4], type: [5123, 5125] }),
                              (p[33190] = { textureFormat: 6402, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [5125] }),
                              (p[36012] = { textureFormat: 6402, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [5126] }),
                              (p[35056] = { textureFormat: 34041, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [34042] }),
                              (p[36013] = { textureFormat: 34041, colorRenderable: !0, textureFilterable: !1, bytesPerElement: [4], type: [36269] }),
                              Object.keys(p).forEach(function (t) {
                                  var e = p[t];
                                  (e.bytesPerElementMap = {}),
                                      e.bytesPerElement.forEach(function (t, r) {
                                          var i = e.type[r];
                                          e.bytesPerElementMap[i] = t;
                                      });
                              });
                          var E = {};
                          function A(t, e) {
                              void 0 !== e.colorspaceConversion && ((E.colorspaceConversion = t.getParameter(t.UNPACK_COLORSPACE_CONVERSION_WEBGL)), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.colorspaceConversion)),
                                  void 0 !== e.premultiplyAlpha && ((E.premultiplyAlpha = t.getParameter(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL)), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha)),
                                  void 0 !== e.flipY && ((E.flipY = t.getParameter(t.UNPACK_FLIP_Y_WEBGL)), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, e.flipY));
                          }
                          function M(t, e) {
                              void 0 !== e.colorspaceConversion && t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, E.colorspaceConversion),
                                  void 0 !== e.premultiplyAlpha && t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, E.premultiplyAlpha),
                                  void 0 !== e.flipY && t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, E.flipY);
                          }
                          function F(t) {
                              (E.unpackAlignment = t.getParameter(t.UNPACK_ALIGNMENT)),
                                  i.isWebGL2(t) &&
                                      ((E.unpackRowLength = t.getParameter(t.UNPACK_ROW_LENGTH)),
                                      (E.unpackImageHeight = t.getParameter(t.UNPACK_IMAGE_HEIGHT)),
                                      (E.unpackSkipPixels = t.getParameter(t.UNPACK_SKIP_PIXELS)),
                                      (E.unpackSkipRows = t.getParameter(t.UNPACK_SKIP_ROWS)),
                                      (E.unpackSkipImages = t.getParameter(t.UNPACK_SKIP_IMAGES)));
                          }
                          function R(t) {
                              t.pixelStorei(t.UNPACK_ALIGNMENT, E.unpackAlignment),
                                  i.isWebGL2(t) &&
                                      (t.pixelStorei(t.UNPACK_ROW_LENGTH, E.unpackRowLength),
                                      t.pixelStorei(t.UNPACK_IMAGE_HEIGHT, E.unpackImageHeight),
                                      t.pixelStorei(t.UNPACK_SKIP_PIXELS, E.unpackSkipPixels),
                                      t.pixelStorei(t.UNPACK_SKIP_ROWS, E.unpackSkipRows),
                                      t.pixelStorei(t.UNPACK_SKIP_IMAGES, E.unpackSkipImages));
                          }
                          function S(t, e, r, i) {
                              i.minMag && (r.call(t, e, t.TEXTURE_MIN_FILTER, i.minMag), r.call(t, e, t.TEXTURE_MAG_FILTER, i.minMag)),
                                  i.min && r.call(t, e, t.TEXTURE_MIN_FILTER, i.min),
                                  i.mag && r.call(t, e, t.TEXTURE_MAG_FILTER, i.mag),
                                  i.wrap && (r.call(t, e, t.TEXTURE_WRAP_S, i.wrap), r.call(t, e, t.TEXTURE_WRAP_T, i.wrap), (e === t.TEXTURE_3D || a.isSampler(t, e)) && r.call(t, e, t.TEXTURE_WRAP_R, i.wrap)),
                                  i.wrapR && r.call(t, e, t.TEXTURE_WRAP_R, i.wrapR),
                                  i.wrapS && r.call(t, e, t.TEXTURE_WRAP_S, i.wrapS),
                                  i.wrapT && r.call(t, e, t.TEXTURE_WRAP_T, i.wrapT),
                                  i.minLod && r.call(t, e, t.TEXTURE_MIN_LOD, i.minLod),
                                  i.maxLod && r.call(t, e, t.TEXTURE_MAX_LOD, i.maxLod),
                                  i.baseLevel && r.call(t, e, t.TEXTURE_BASE_LEVEL, i.baseLevel),
                                  i.maxLevel && r.call(t, e, t.TEXTURE_MAX_LEVEL, i.maxLevel);
                          }
                          function C(t, e, r) {
                              var i = r.target || t.TEXTURE_2D;
                              t.bindTexture(i, e), S(t, i, t.texParameteri, r);
                          }
                          function P(t, e, r) {
                              S(t, e, t.samplerParameteri, r);
                          }
                          function I(t, e) {
                              var r = t.createSampler();
                              return P(t, r, e), r;
                          }
                          function U(t, e, r, i, n, a, s) {
                              (r = r || o.textureOptions), (a = a || t.RGBA), (s = s || t.UNSIGNED_BYTE);
                              var h = r.target || t.TEXTURE_2D;
                              if (((i = i || r.width), (n = n || r.height), t.bindTexture(h, e), v(t, i, n, a))) t.generateMipmap(h);
                              else {
                                  var u = x(a) ? t.LINEAR : t.NEAREST;
                                  t.texParameteri(h, t.TEXTURE_MIN_FILTER, u), t.texParameteri(h, t.TEXTURE_MAG_FILTER, u), t.texParameteri(h, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(h, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
                              }
                          }
                          function k(t) {
                              return !0 === t.auto || (void 0 === t.auto && void 0 === t.level);
                          }
                          function D(t, e) {
                              return (
                                  (e = e || {}).cubeFaceOrder || [
                                      t.TEXTURE_CUBE_MAP_POSITIVE_X,
                                      t.TEXTURE_CUBE_MAP_NEGATIVE_X,
                                      t.TEXTURE_CUBE_MAP_POSITIVE_Y,
                                      t.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                                      t.TEXTURE_CUBE_MAP_POSITIVE_Z,
                                      t.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                                  ]
                              );
                          }
                          function O(t, e) {
                              var r = D(t, e).map(function (t, e) {
                                  return { face: t, ndx: e };
                              });
                              return (
                                  r.sort(function (t, e) {
                                      return t.face - e.face;
                                  }),
                                  r
                              );
                          }
                          function B(t, e, r, i) {
                              var n = (i = i || o.textureOptions).target || t.TEXTURE_2D,
                                  a = i.level || 0,
                                  s = r.width,
                                  h = r.height,
                                  l = i.internalFormat || i.format || t.RGBA,
                                  c = _(l),
                                  f = i.format || c.format,
                                  d = i.type || c.type;
                              if ((A(t, i), t.bindTexture(n, e), n === t.TEXTURE_CUBE_MAP)) {
                                  var b,
                                      p,
                                      m = r.width,
                                      g = r.height;
                                  if (m / 6 === g) (b = g), (p = [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0]);
                                  else if (g / 6 === m) (b = m), (p = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5]);
                                  else if (m / 3 == g / 2) (b = m / 3), (p = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1]);
                                  else {
                                      if (m / 2 != g / 3) throw "can't figure out cube map from element: " + (r.src ? r.src : r.nodeName);
                                      (b = m / 2), (p = [0, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1, 2]);
                                  }
                                  u
                                      ? ((u.canvas.width = b),
                                        (u.canvas.height = b),
                                        (s = b),
                                        (h = b),
                                        O(t, i).forEach(function (e) {
                                            var i = p[2 * e.ndx + 0] * b,
                                                n = p[2 * e.ndx + 1] * b;
                                            u.drawImage(r, i, n, b, b, 0, 0, b, b), t.texImage2D(e.face, a, l, f, d, u.canvas);
                                        }),
                                        (u.canvas.width = 1),
                                        (u.canvas.height = 1))
                                      : "undefined" != typeof createImageBitmap &&
                                        ((s = b),
                                        (h = b),
                                        O(t, i).forEach(function (o) {
                                            var u = p[2 * o.ndx + 0] * b,
                                                c = p[2 * o.ndx + 1] * b;
                                            t.texImage2D(o.face, a, l, b, b, 0, f, d, null),
                                                createImageBitmap(r, u, c, b, b, { premultiplyAlpha: "none", colorSpaceConversion: "none" }).then(function (r) {
                                                    A(t, i), t.bindTexture(n, e), t.texImage2D(o.face, a, l, f, d, r), M(t, i), k(i) && U(t, e, i, s, h, l, d);
                                                });
                                        }));
                              } else if (n === t.TEXTURE_3D || n === t.TEXTURE_2D_ARRAY) {
                                  var v = Math.min(r.width, r.height),
                                      x = Math.max(r.width, r.height),
                                      y = x / v;
                                  if (y % 1 != 0) throw "can not compute 3D dimensions of element";
                                  var T = r.width === x ? 1 : 0,
                                      w = r.height === x ? 1 : 0;
                                  F(t),
                                      t.pixelStorei(t.UNPACK_ALIGNMENT, 1),
                                      t.pixelStorei(t.UNPACK_ROW_LENGTH, r.width),
                                      t.pixelStorei(t.UNPACK_IMAGE_HEIGHT, 0),
                                      t.pixelStorei(t.UNPACK_SKIP_IMAGES, 0),
                                      t.texImage3D(n, a, l, v, v, v, 0, f, d, null);
                                  for (var E = 0; E < y; ++E) {
                                      var S = E * v * T,
                                          P = E * v * w;
                                      t.pixelStorei(t.UNPACK_SKIP_PIXELS, S), t.pixelStorei(t.UNPACK_SKIP_ROWS, P), t.texSubImage3D(n, a, 0, 0, E, v, v, 1, f, d, r);
                                  }
                                  R(t);
                              } else t.texImage2D(n, a, l, f, d, r);
                              M(t, i), k(i) && U(t, e, i, s, h, l, d), C(t, e, i);
                          }
                          function N() {}
                          function L(t, e) {
                              return void 0 !== e ||
                                  (function (t) {
                                      if ("undefined" != typeof document) {
                                          var e = document.createElement("a");
                                          return (e.href = t), e.hostname === location.hostname && e.port === location.port && e.protocol === location.protocol;
                                      }
                                      var r = new URL(location.href).origin;
                                      return new URL(t, location.href).origin === r;
                                  })(t)
                                  ? e
                                  : "anonymous";
                          }
                          function z(t) {
                              return ("undefined" != typeof ImageBitmap && t instanceof ImageBitmap) || ("undefined" != typeof ImageData && t instanceof ImageData) || ("undefined" != typeof HTMLElement && t instanceof HTMLElement);
                          }
                          function j(t, e, r) {
                              return z(t)
                                  ? (setTimeout(function () {
                                        r(null, t);
                                    }),
                                    t)
                                  : (function (t, e, r) {
                                        var i;
                                        if (((r = r || N), (e = void 0 !== e ? e : o.crossOrigin), (e = L(t, e)), "undefined" != typeof Image)) {
                                            (i = new Image()), void 0 !== e && (i.crossOrigin = e);
                                            var n = function () {
                                                    i.removeEventListener("error", s), i.removeEventListener("load", h), (i = null);
                                                },
                                                s = function () {
                                                    var e = "couldn't load image: " + t;
                                                    a.error(e), r(e, i), n();
                                                },
                                                h = function () {
                                                    r(null, i), n();
                                                };
                                            return i.addEventListener("error", s), i.addEventListener("load", h), (i.src = t), i;
                                        }
                                        if ("undefined" != typeof ImageBitmap) {
                                            var u,
                                                l,
                                                c = function () {
                                                    r(u, l);
                                                },
                                                f = {};
                                            e && (f.mode = "cors"),
                                                fetch(t, f)
                                                    .then(function (t) {
                                                        if (!t.ok) throw t;
                                                        return t.blob();
                                                    })
                                                    .then(function (t) {
                                                        return createImageBitmap(t, { premultiplyAlpha: "none", colorSpaceConversion: "none" });
                                                    })
                                                    .then(function (t) {
                                                        (l = t), setTimeout(c);
                                                    })
                                                    .catch(function (t) {
                                                        (u = t), setTimeout(c);
                                                    }),
                                                (i = null);
                                        }
                                        return i;
                                    })(t, e, r);
                          }
                          function H(t, e, r) {
                              var i = (r = r || o.textureOptions).target || t.TEXTURE_2D;
                              if ((t.bindTexture(i, e), !1 !== r.color)) {
                                  var n = (function (t) {
                                      return (t = t || o.textureColor), h(t) ? t : new Uint8Array([255 * t[0], 255 * t[1], 255 * t[2], 255 * t[3]]);
                                  })(r.color);
                                  if (i === t.TEXTURE_CUBE_MAP) for (var a = 0; a < 6; ++a) t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, n);
                                  else i === t.TEXTURE_3D || i === t.TEXTURE_2D_ARRAY ? t.texImage3D(i, 0, t.RGBA, 1, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, n) : t.texImage2D(i, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, n);
                              }
                          }
                          function G(t, e, r, i) {
                              return (
                                  (i = i || N),
                                  (r = r || o.textureOptions),
                                  H(t, e, r),
                                  j((r = Object.assign({}, r)).src, r.crossOrigin, function (n, a) {
                                      n ? i(n, e, a) : (B(t, e, a, r), i(null, e, a));
                                  })
                              );
                          }
                          function V(t, e, r, i) {
                              i = i || N;
                              var n = r.src;
                              if (6 !== n.length) throw "there must be 6 urls for a cubemap";
                              var a = r.level || 0,
                                  s = r.internalFormat || r.format || t.RGBA,
                                  o = _(s),
                                  h = r.format || o.format,
                                  u = r.type || t.UNSIGNED_BYTE,
                                  l = r.target || t.TEXTURE_2D;
                              if (l !== t.TEXTURE_CUBE_MAP) throw "target must be TEXTURE_CUBE_MAP";
                              H(t, e, r), (r = Object.assign({}, r));
                              var c,
                                  f = 6,
                                  d = [],
                                  b = D(t, r);
                              c = n.map(function (n, o) {
                                  return j(
                                      n,
                                      r.crossOrigin,
                                      ((p = b[o]),
                                      function (n, o) {
                                          --f,
                                              n
                                                  ? d.push(n)
                                                  : o.width !== o.height
                                                  ? d.push("cubemap face img is not a square: " + o.src)
                                                  : (A(t, r),
                                                    t.bindTexture(l, e),
                                                    5 === f
                                                        ? D(t).forEach(function (e) {
                                                              t.texImage2D(e, a, s, h, u, o);
                                                          })
                                                        : t.texImage2D(p, a, s, h, u, o),
                                                    M(t, r),
                                                    k(r) && t.generateMipmap(l)),
                                              0 === f && i(d.length ? d : void 0, e, c);
                                      })
                                  );
                                  var p;
                              });
                          }
                          function q(t, e, r, i) {
                              i = i || N;
                              var n = r.src,
                                  a = r.internalFormat || r.format || t.RGBA,
                                  s = _(a),
                                  o = r.format || s.format,
                                  h = r.type || t.UNSIGNED_BYTE,
                                  l = r.target || t.TEXTURE_2D_ARRAY;
                              if (l !== t.TEXTURE_3D && l !== t.TEXTURE_2D_ARRAY) throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
                              H(t, e, r), (r = Object.assign({}, r));
                              var c,
                                  f = n.length,
                                  d = [],
                                  b = r.level || 0,
                                  p = r.width,
                                  m = r.height,
                                  g = n.length,
                                  v = !0;
                              c = n.map(function (n, s) {
                                  return j(
                                      n,
                                      r.crossOrigin,
                                      ((_ = s),
                                      function (n, s) {
                                          if ((--f, n)) d.push(n);
                                          else {
                                              if ((A(t, r), t.bindTexture(l, e), v)) {
                                                  (v = !1), (p = r.width || s.width), (m = r.height || s.height), t.texImage3D(l, b, a, p, m, g, 0, o, h, null);
                                                  for (var x = 0; x < g; ++x) t.texSubImage3D(l, b, 0, 0, x, p, m, 1, o, h, s);
                                              } else {
                                                  var y = s;
                                                  (s.width === p && s.height === m) || ((y = u.canvas), (u.canvas.width = p), (u.canvas.height = m), u.drawImage(s, 0, 0, p, m)),
                                                      t.texSubImage3D(l, b, 0, 0, _, p, m, 1, o, h, y),
                                                      y === u.canvas && ((u.canvas.width = 0), (u.canvas.height = 0));
                                              }
                                              M(t, r), k(r) && t.generateMipmap(l);
                                          }
                                          0 === f && i(d.length ? d : void 0, e, c);
                                      })
                                  );
                                  var _;
                              });
                          }
                          function X(t, e, r, a) {
                              var s = (a = a || o.textureOptions).target || t.TEXTURE_2D;
                              t.bindTexture(s, e);
                              var u = a.width,
                                  l = a.height,
                                  c = a.depth,
                                  f = a.level || 0,
                                  d = a.internalFormat || a.format || t.RGBA,
                                  b = _(d),
                                  p = a.format || b.format,
                                  g = a.type || y(t, r, b.type);
                              if (h(r)) r instanceof Uint8ClampedArray && (r = new Uint8Array(r.buffer));
                              else {
                                  var v = n.getTypedArrayTypeForGLType(g);
                                  r = new v(r);
                              }
                              var x,
                                  w = m(d, g),
                                  E = r.byteLength / w;
                              if (E % 1) throw "length wrong size for format: " + i.glEnumToString(t, p);
                              if (s === t.TEXTURE_3D)
                                  if (u || l || c)
                                      !u || (l && c)
                                          ? !l || (u && c)
                                              ? ((x = T(t, s, u, l, E / c)), (u = x.width), (l = x.height))
                                              : ((x = T(t, s, u, c, E / l)), (u = x.width), (c = x.height))
                                          : ((x = T(t, s, l, c, E / u)), (l = x.width), (c = x.height));
                                  else {
                                      var S = Math.cbrt(E);
                                      if (S % 1 != 0) throw "can't guess cube size of array of numElements: " + E;
                                      (u = S), (l = S), (c = S);
                                  }
                              else (x = T(t, s, u, l, E)), (u = x.width), (l = x.height);
                              if ((F(t), t.pixelStorei(t.UNPACK_ALIGNMENT, a.unpackAlignment || 1), A(t, a), s === t.TEXTURE_CUBE_MAP)) {
                                  var C = (E / 6) * (w / r.BYTES_PER_ELEMENT);
                                  O(t, a).forEach(function (e) {
                                      var i = C * e.ndx,
                                          n = r.subarray(i, i + C);
                                      t.texImage2D(e.face, f, d, u, l, 0, p, g, n);
                                  });
                              } else s === t.TEXTURE_3D ? t.texImage3D(s, f, d, u, l, c, 0, p, g, r) : t.texImage2D(s, f, d, u, l, 0, p, g, r);
                              return M(t, a), R(t), { width: u, height: l, depth: c, type: g };
                          }
                          function Y(t, e, r) {
                              var i = r.target || t.TEXTURE_2D;
                              t.bindTexture(i, e);
                              var n = r.level || 0,
                                  a = r.internalFormat || r.format || t.RGBA,
                                  s = _(a),
                                  o = r.format || s.format,
                                  h = r.type || s.type;
                              if ((A(t, r), i === t.TEXTURE_CUBE_MAP)) for (var u = 0; u < 6; ++u) t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + u, n, a, r.width, r.height, 0, o, h, null);
                              else i === t.TEXTURE_3D ? t.texImage3D(i, n, a, r.width, r.height, r.depth, 0, o, h, null) : t.texImage2D(i, n, a, r.width, r.height, 0, o, h, null);
                              M(t, r);
                          }
                          function Z(t, e, r) {
                              (r = r || N), (e = e || o.textureOptions);
                              var i = t.createTexture(),
                                  n = e.target || t.TEXTURE_2D,
                                  a = e.width || 1,
                                  s = e.height || 1,
                                  u = e.internalFormat || t.RGBA,
                                  l = _(u),
                                  c = e.type || l.type;
                              t.bindTexture(n, i), n === t.TEXTURE_CUBE_MAP && (t.texParameteri(n, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(n, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE));
                              var f = e.src;
                              if (f)
                                  if (("function" == typeof f && (f = f(t, e)), "string" == typeof f)) G(t, i, e, r);
                                  else if (h(f) || (Array.isArray(f) && ("number" == typeof f[0] || Array.isArray(f[0]) || h(f[0])))) {
                                      var d = X(t, i, f, e);
                                      (a = d.width), (s = d.height), (c = d.type);
                                  } else if (Array.isArray(f) && ("string" == typeof f[0] || z(f[0]))) n === t.TEXTURE_CUBE_MAP ? V(t, i, e, r) : q(t, i, e, r);
                                  else {
                                      if (!z(f)) throw "unsupported src type";
                                      B(t, i, f, e), (a = f.width), (s = f.height);
                                  }
                              else Y(t, i, e);
                              return k(e) && U(t, i, e, a, s, u, c), C(t, i, e), i;
                          }
                      },
                  "./src/twgl-full.js":
                      /*!**************************!*\
    !*** ./src/twgl-full.js ***!
    \**************************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          e.__esModule = !0;
                          var i = { m4: !0, v3: !0, primitives: !0 };
                          e.primitives = e.v3 = e.m4 = void 0;
                          var n = h(r(/*! ./m4.js */ "./src/m4.js"));
                          e.m4 = n;
                          var a = h(r(/*! ./v3.js */ "./src/v3.js"));
                          e.v3 = a;
                          var s = h(r(/*! ./primitives.js */ "./src/primitives.js"));
                          e.primitives = s;
                          var o = r(/*! ./twgl.js */ "./src/twgl.js");
                          function h(t) {
                              if (t && t.__esModule) return t;
                              var e = {};
                              if (null != t)
                                  for (var r in t)
                                      if (Object.prototype.hasOwnProperty.call(t, r)) {
                                          var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                                          i.get || i.set ? Object.defineProperty(e, r, i) : (e[r] = t[r]);
                                      }
                              return (e.default = t), e;
                          }
                          Object.keys(o).forEach(function (t) {
                              "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(i, t) || (e[t] = o[t]));
                          });
                      },
                  "./src/twgl.js":
                      /*!*********************!*\
    !*** ./src/twgl.js ***!
    \*********************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          e.__esModule = !0;
                          var i = { addExtensionsToContext: !0, getContext: !0, getWebGLContext: !0, resizeCanvasToDisplaySize: !0, setDefaults: !0 };
                          (e.addExtensionsToContext = g),
                              (e.getContext = function (t, e) {
                                  return (function (t, e) {
                                      for (var r = ["webgl2", "webgl", "experimental-webgl"], i = null, n = 0; n < r.length; ++n)
                                          if ((i = t.getContext(r[n], e))) {
                                              b.addExtensionsToContext && g(i);
                                              break;
                                          }
                                      return i;
                                  })(t, e);
                              }),
                              (e.getWebGLContext = function (t, e) {
                                  return (function (t, e) {
                                      for (var r = ["webgl", "experimental-webgl"], i = null, n = 0; n < r.length; ++n)
                                          if ((i = t.getContext(r[n], e))) {
                                              b.addExtensionsToContext && g(i);
                                              break;
                                          }
                                      return i;
                                  })(t, e);
                              }),
                              (e.resizeCanvasToDisplaySize = function (t, e) {
                                  (e = e || 1), (e = Math.max(0, e));
                                  var r = (t.clientWidth * e) | 0,
                                      i = (t.clientHeight * e) | 0;
                                  if (t.width !== r || t.height !== i) return (t.width = r), (t.height = i), !0;
                                  return !1;
                              }),
                              (e.setDefaults = function (t) {
                                  s.copyExistingProperties(t, b), n.setAttributeDefaults_(t), a.setTextureDefaults_(t);
                              });
                          var n = d(r(/*! ./attributes.js */ "./src/attributes.js"));
                          Object.keys(n).forEach(function (t) {
                              "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(i, t) || (e[t] = n[t]));
                          });
                          var a = d(r(/*! ./textures.js */ "./src/textures.js"));
                          Object.keys(a).forEach(function (t) {
                              "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(i, t) || (e[t] = a[t]));
                          });
                          var s = d(r(/*! ./helper.js */ "./src/helper.js")),
                              o = d(r(/*! ./utils.js */ "./src/utils.js"));
                          Object.keys(o).forEach(function (t) {
                              "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(i, t) || (e[t] = o[t]));
                          });
                          var h = r(/*! ./draw.js */ "./src/draw.js");
                          Object.keys(h).forEach(function (t) {
                              "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(i, t) || (e[t] = h[t]));
                          });
                          var u = r(/*! ./framebuffers.js */ "./src/framebuffers.js");
                          Object.keys(u).forEach(function (t) {
                              "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(i, t) || (e[t] = u[t]));
                          });
                          var l = r(/*! ./programs.js */ "./src/programs.js");
                          Object.keys(l).forEach(function (t) {
                              "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(i, t) || (e[t] = l[t]));
                          });
                          var c = r(/*! ./typedarrays.js */ "./src/typedarrays.js");
                          Object.keys(c).forEach(function (t) {
                              "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(i, t) || (e[t] = c[t]));
                          });
                          var f = r(/*! ./vertex-arrays.js */ "./src/vertex-arrays.js");
                          function d(t) {
                              if (t && t.__esModule) return t;
                              var e = {};
                              if (null != t)
                                  for (var r in t)
                                      if (Object.prototype.hasOwnProperty.call(t, r)) {
                                          var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                                          i.get || i.set ? Object.defineProperty(e, r, i) : (e[r] = t[r]);
                                      }
                              return (e.default = t), e;
                          }
                          Object.keys(f).forEach(function (t) {
                              "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(i, t) || (e[t] = f[t]));
                          });
                          var b = { addExtensionsToContext: !0 };
                          var p = /^(.*?)_/;
                          function m(t, e) {
                              o.glEnumToString(t, 0);
                              var r = t.getExtension(e);
                              if (r) {
                                  var i = {},
                                      n = p.exec(e)[1],
                                      a = "_" + n;
                                  for (var h in r) {
                                      var u = r[h],
                                          l = "function" == typeof u,
                                          c = l ? n : a,
                                          f = h;
                                      h.endsWith(c) && (f = h.substring(0, h.length - c.length)),
                                          void 0 !== t[f]
                                              ? l || t[f] === u || s.warn(f, t[f], u, h)
                                              : l
                                              ? (t[f] = (function (t) {
                                                    return function () {
                                                        return t.apply(r, arguments);
                                                    };
                                                })(u))
                                              : ((t[f] = u), (i[f] = u));
                                  }
                                  (i.constructor = { name: r.constructor.name }), o.glEnumToString(i, 0);
                              }
                              return r;
                          }
                          var _ = [
                              "ANGLE_instanced_arrays",
                              "EXT_blend_minmax",
                              "EXT_color_buffer_float",
                              "EXT_color_buffer_half_float",
                              "EXT_disjoint_timer_query",
                              "EXT_disjoint_timer_query_webgl2",
                              "EXT_frag_depth",
                              "EXT_sRGB",
                              "EXT_shader_texture_lod",
                              "EXT_texture_filter_anisotropic",
                              "OES_element_index_uint",
                              "OES_standard_derivatives",
                              "OES_texture_float",
                              "OES_texture_float_linear",
                              "OES_texture_half_float",
                              "OES_texture_half_float_linear",
                              "OES_vertex_array_object",
                              "WEBGL_color_buffer_float",
                              "WEBGL_compressed_texture_atc",
                              "WEBGL_compressed_texture_etc1",
                              "WEBGL_compressed_texture_pvrtc",
                              "WEBGL_compressed_texture_s3tc",
                              "WEBGL_compressed_texture_s3tc_srgb",
                              "WEBGL_depth_texture",
                              "WEBGL_draw_buffers",
                          ];
                          function g(t) {
                              for (var e = 0; e < _.length; ++e) m(t, _[e]);
                          }
                      },
                  "./src/typedarrays.js":
                      /*!****************************!*\
    !*** ./src/typedarrays.js ***!
    \****************************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.getGLTypeForTypedArray = function (t) {
                                  if (t instanceof Int8Array) return i;
                                  if (t instanceof Uint8Array) return n;
                                  if (t instanceof Uint8ClampedArray) return n;
                                  if (t instanceof Int16Array) return a;
                                  if (t instanceof Uint16Array) return s;
                                  if (t instanceof Int32Array) return o;
                                  if (t instanceof Uint32Array) return h;
                                  if (t instanceof Float32Array) return u;
                                  throw new Error("unsupported typed array type");
                              }),
                              (e.getGLTypeForTypedArrayType = function (t) {
                                  if (t === Int8Array) return i;
                                  if (t === Uint8Array) return n;
                                  if (t === Uint8ClampedArray) return n;
                                  if (t === Int16Array) return a;
                                  if (t === Uint16Array) return s;
                                  if (t === Int32Array) return o;
                                  if (t === Uint32Array) return h;
                                  if (t === Float32Array) return u;
                                  throw new Error("unsupported typed array type");
                              }),
                              (e.getTypedArrayTypeForGLType = function (t) {
                                  var e = l[t];
                                  if (!e) throw new Error("unknown gl type");
                                  return e;
                              }),
                              (e.isArrayBuffer = void 0);
                          var i = 5120,
                              n = 5121,
                              a = 5122,
                              s = 5123,
                              o = 5124,
                              h = 5125,
                              u = 5126,
                              l = {},
                              c = l;
                          (c[i] = Int8Array),
                              (c[n] = Uint8Array),
                              (c[a] = Int16Array),
                              (c[s] = Uint16Array),
                              (c[o] = Int32Array),
                              (c[h] = Uint32Array),
                              (c[u] = Float32Array),
                              (c[32819] = Uint16Array),
                              (c[32820] = Uint16Array),
                              (c[33635] = Uint16Array),
                              (c[5131] = Uint16Array),
                              (c[33640] = Uint32Array),
                              (c[35899] = Uint32Array),
                              (c[35902] = Uint32Array),
                              (c[36269] = Uint32Array),
                              (c[34042] = Uint32Array);
                          var f =
                              "undefined" != typeof SharedArrayBuffer
                                  ? function (t) {
                                        return t && t.buffer && (t.buffer instanceof ArrayBuffer || t.buffer instanceof SharedArrayBuffer);
                                    }
                                  : function (t) {
                                        return t && t.buffer && t.buffer instanceof ArrayBuffer;
                                    };
                          e.isArrayBuffer = f;
                      },
                  "./src/utils.js":
                      /*!**********************!*\
    !*** ./src/utils.js ***!
    \**********************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.isWebGL1 = function (t) {
                                  return !t.texStorage2D;
                              }),
                              (e.isWebGL2 = function (t) {
                                  return !!t.texStorage2D;
                              }),
                              (e.glEnumToString = void 0);
                          var i,
                              n,
                              a =
                                  ((i = {}),
                                  (n = {}),
                                  function (t, e) {
                                      return (
                                          (function (t) {
                                              var e = t.constructor.name;
                                              if (!i[e]) {
                                                  for (var r in t)
                                                      if ("number" == typeof t[r]) {
                                                          var a = n[t[r]];
                                                          n[t[r]] = a ? "".concat(a, " | ").concat(r) : r;
                                                      }
                                                  i[e] = !0;
                                              }
                                          })(t),
                                          n[e] || "0x" + e.toString(16)
                                      );
                                  });
                          e.glEnumToString = a;
                      },
                  "./src/v3.js":
                      /*!*******************!*\
    !*** ./src/v3.js ***!
    \*******************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.add = function (t, e, r) {
                                  return ((r = r || new i(3))[0] = t[0] + e[0]), (r[1] = t[1] + e[1]), (r[2] = t[2] + e[2]), r;
                              }),
                              (e.copy = function (t, e) {
                                  return ((e = e || new i(3))[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), e;
                              }),
                              (e.create = function (t, e, r) {
                                  var n = new i(3);
                                  t && (n[0] = t);
                                  e && (n[1] = e);
                                  r && (n[2] = r);
                                  return n;
                              }),
                              (e.cross = function (t, e, r) {
                                  r = r || new i(3);
                                  var n = t[2] * e[0] - t[0] * e[2],
                                      a = t[0] * e[1] - t[1] * e[0];
                                  return (r[0] = t[1] * e[2] - t[2] * e[1]), (r[1] = n), (r[2] = a), r;
                              }),
                              (e.distance = function (t, e) {
                                  var r = t[0] - e[0],
                                      i = t[1] - e[1],
                                      n = t[2] - e[2];
                                  return Math.sqrt(r * r + i * i + n * n);
                              }),
                              (e.distanceSq = function (t, e) {
                                  var r = t[0] - e[0],
                                      i = t[1] - e[1],
                                      n = t[2] - e[2];
                                  return r * r + i * i + n * n;
                              }),
                              (e.divide = function (t, e, r) {
                                  return ((r = r || new i(3))[0] = t[0] / e[0]), (r[1] = t[1] / e[1]), (r[2] = t[2] / e[2]), r;
                              }),
                              (e.divScalar = function (t, e, r) {
                                  return ((r = r || new i(3))[0] = t[0] / e), (r[1] = t[1] / e), (r[2] = t[2] / e), r;
                              }),
                              (e.dot = function (t, e) {
                                  return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
                              }),
                              (e.lerp = function (t, e, r, n) {
                                  return ((n = n || new i(3))[0] = t[0] + r * (e[0] - t[0])), (n[1] = t[1] + r * (e[1] - t[1])), (n[2] = t[2] + r * (e[2] - t[2])), n;
                              }),
                              (e.lerpV = function (t, e, r, n) {
                                  return ((n = n || new i(3))[0] = t[0] + r[0] * (e[0] - t[0])), (n[1] = t[1] + r[1] * (e[1] - t[1])), (n[2] = t[2] + r[2] * (e[2] - t[2])), n;
                              }),
                              (e.length = function (t) {
                                  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
                              }),
                              (e.lengthSq = function (t) {
                                  return t[0] * t[0] + t[1] * t[1] + t[2] * t[2];
                              }),
                              (e.max = function (t, e, r) {
                                  return ((r = r || new i(3))[0] = Math.max(t[0], e[0])), (r[1] = Math.max(t[1], e[1])), (r[2] = Math.max(t[2], e[2])), r;
                              }),
                              (e.min = function (t, e, r) {
                                  return ((r = r || new i(3))[0] = Math.min(t[0], e[0])), (r[1] = Math.min(t[1], e[1])), (r[2] = Math.min(t[2], e[2])), r;
                              }),
                              (e.mulScalar = function (t, e, r) {
                                  return ((r = r || new i(3))[0] = t[0] * e), (r[1] = t[1] * e), (r[2] = t[2] * e), r;
                              }),
                              (e.multiply = function (t, e, r) {
                                  return ((r = r || new i(3))[0] = t[0] * e[0]), (r[1] = t[1] * e[1]), (r[2] = t[2] * e[2]), r;
                              }),
                              (e.negate = function (t, e) {
                                  return ((e = e || new i(3))[0] = -t[0]), (e[1] = -t[1]), (e[2] = -t[2]), e;
                              }),
                              (e.normalize = function (t, e) {
                                  e = e || new i(3);
                                  var r = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
                                      n = Math.sqrt(r);
                                  n > 1e-5 ? ((e[0] = t[0] / n), (e[1] = t[1] / n), (e[2] = t[2] / n)) : ((e[0] = 0), (e[1] = 0), (e[2] = 0));
                                  return e;
                              }),
                              (e.setDefaultType = function (t) {
                                  var e = i;
                                  return (i = t), e;
                              }),
                              (e.subtract = function (t, e, r) {
                                  return ((r = r || new i(3))[0] = t[0] - e[0]), (r[1] = t[1] - e[1]), (r[2] = t[2] - e[2]), r;
                              });
                          var i = Float32Array;
                      },
                  "./src/vertex-arrays.js":
                      /*!******************************!*\
    !*** ./src/vertex-arrays.js ***!
    \******************************/
                      /*! no static exports found */ function (t, e, r) {
                          "use strict";
                          (e.__esModule = !0),
                              (e.createVertexArrayInfo = function (t, e, r) {
                                  var n = t.createVertexArray();
                                  t.bindVertexArray(n), e.length || (e = [e]);
                                  return (
                                      e.forEach(function (e) {
                                          i.setBuffersAndAttributes(t, e, r);
                                      }),
                                      t.bindVertexArray(null),
                                      { numElements: r.numElements, elementType: r.elementType, vertexArrayObject: n }
                                  );
                              }),
                              (e.createVAOAndSetAttributes = n),
                              (e.createVAOFromBufferInfo = function (t, e, r) {
                                  return n(t, e.attribSetters || e, r.attribs, r.indices);
                              });
                          var i = (function (t) {
                              if (t && t.__esModule) return t;
                              var e = {};
                              if (null != t)
                                  for (var r in t)
                                      if (Object.prototype.hasOwnProperty.call(t, r)) {
                                          var i = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(t, r) : {};
                                          i.get || i.set ? Object.defineProperty(e, r, i) : (e[r] = t[r]);
                                      }
                              return (e.default = t), e;
                          })(r(/*! ./programs.js */ "./src/programs.js"));
                          function n(t, e, r, n) {
                              var a = t.createVertexArray();
                              return t.bindVertexArray(a), i.setAttributes(e, r), n && t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, n), t.bindVertexArray(null), a;
                          }
                      },
              });
          }),
          (t.exports = i());
  },
  function (t, e, r) {
      "use strict";
      var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
      function n(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
      }
      (e.assign = function (t) {
          for (var e = Array.prototype.slice.call(arguments, 1); e.length; ) {
              var r = e.shift();
              if (r) {
                  if ("object" != typeof r) throw new TypeError(r + "must be non-object");
                  for (var i in r) n(r, i) && (t[i] = r[i]);
              }
          }
          return t;
      }),
          (e.shrinkBuf = function (t, e) {
              return t.length === e ? t : t.subarray ? t.subarray(0, e) : ((t.length = e), t);
          });
      var a = {
              arraySet: function (t, e, r, i, n) {
                  if (e.subarray && t.subarray) t.set(e.subarray(r, r + i), n);
                  else for (var a = 0; a < i; a++) t[n + a] = e[r + a];
              },
              flattenChunks: function (t) {
                  var e, r, i, n, a, s;
                  for (i = 0, e = 0, r = t.length; e < r; e++) i += t[e].length;
                  for (s = new Uint8Array(i), n = 0, e = 0, r = t.length; e < r; e++) (a = t[e]), s.set(a, n), (n += a.length);
                  return s;
              },
          },
          s = {
              arraySet: function (t, e, r, i, n) {
                  for (var a = 0; a < i; a++) t[n + a] = e[r + a];
              },
              flattenChunks: function (t) {
                  return [].concat.apply([], t);
              },
          };
      (e.setTyped = function (t) {
          t ? ((e.Buf8 = Uint8Array), (e.Buf16 = Uint16Array), (e.Buf32 = Int32Array), e.assign(e, a)) : ((e.Buf8 = Array), (e.Buf16 = Array), (e.Buf32 = Array), e.assign(e, s));
      }),
          e.setTyped(i);
  },
  function (t, e, r) {
      "use strict";
      t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
  },
  function (t, e, r) {
      "use strict";
      t.exports = function (t, e, r, i) {
          for (var n = (65535 & t) | 0, a = ((t >>> 16) & 65535) | 0, s = 0; 0 !== r; ) {
              r -= s = r > 2e3 ? 2e3 : r;
              do {
                  a = (a + (n = (n + e[i++]) | 0)) | 0;
              } while (--s);
              (n %= 65521), (a %= 65521);
          }
          return n | (a << 16) | 0;
      };
  },
  function (t, e, r) {
      "use strict";
      var i = (function () {
          for (var t, e = [], r = 0; r < 256; r++) {
              t = r;
              for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
              e[r] = t;
          }
          return e;
      })();
      t.exports = function (t, e, r, n) {
          var a = i,
              s = n + r;
          t ^= -1;
          for (var o = n; o < s; o++) t = (t >>> 8) ^ a[255 & (t ^ e[o])];
          return -1 ^ t;
      };
  },
  function (t, e, r) {
      "use strict";
      var i = r(1),
          n = !0,
          a = !0;
      try {
          String.fromCharCode.apply(null, [0]);
      } catch (t) {
          n = !1;
      }
      try {
          String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (t) {
          a = !1;
      }
      for (var s = new i.Buf8(256), o = 0; o < 256; o++) s[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1;
      function h(t, e) {
          if (e < 65534 && ((t.subarray && a) || (!t.subarray && n))) return String.fromCharCode.apply(null, i.shrinkBuf(t, e));
          for (var r = "", s = 0; s < e; s++) r += String.fromCharCode(t[s]);
          return r;
      }
      (s[254] = s[254] = 1),
          (e.string2buf = function (t) {
              var e,
                  r,
                  n,
                  a,
                  s,
                  o = t.length,
                  h = 0;
              for (a = 0; a < o; a++)
                  55296 == (64512 & (r = t.charCodeAt(a))) && a + 1 < o && 56320 == (64512 & (n = t.charCodeAt(a + 1))) && ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), a++), (h += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4);
              for (e = new i.Buf8(h), s = 0, a = 0; s < h; a++)
                  55296 == (64512 & (r = t.charCodeAt(a))) && a + 1 < o && 56320 == (64512 & (n = t.charCodeAt(a + 1))) && ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), a++),
                      r < 128
                          ? (e[s++] = r)
                          : r < 2048
                          ? ((e[s++] = 192 | (r >>> 6)), (e[s++] = 128 | (63 & r)))
                          : r < 65536
                          ? ((e[s++] = 224 | (r >>> 12)), (e[s++] = 128 | ((r >>> 6) & 63)), (e[s++] = 128 | (63 & r)))
                          : ((e[s++] = 240 | (r >>> 18)), (e[s++] = 128 | ((r >>> 12) & 63)), (e[s++] = 128 | ((r >>> 6) & 63)), (e[s++] = 128 | (63 & r)));
              return e;
          }),
          (e.buf2binstring = function (t) {
              return h(t, t.length);
          }),
          (e.binstring2buf = function (t) {
              for (var e = new i.Buf8(t.length), r = 0, n = e.length; r < n; r++) e[r] = t.charCodeAt(r);
              return e;
          }),
          (e.buf2string = function (t, e) {
              var r,
                  i,
                  n,
                  a,
                  o = e || t.length,
                  u = new Array(2 * o);
              for (i = 0, r = 0; r < o; )
                  if ((n = t[r++]) < 128) u[i++] = n;
                  else if ((a = s[n]) > 4) (u[i++] = 65533), (r += a - 1);
                  else {
                      for (n &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && r < o; ) (n = (n << 6) | (63 & t[r++])), a--;
                      a > 1 ? (u[i++] = 65533) : n < 65536 ? (u[i++] = n) : ((n -= 65536), (u[i++] = 55296 | ((n >> 10) & 1023)), (u[i++] = 56320 | (1023 & n)));
                  }
              return h(u, i);
          }),
          (e.utf8border = function (t, e) {
              var r;
              for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; r >= 0 && 128 == (192 & t[r]); ) r--;
              return r < 0 ? e : 0 === r ? e : r + s[t[r]] > e ? r : e;
          });
  },
  function (t, e, r) {
      "use strict";
      t.exports = function () {
          (this.input = null),
              (this.next_in = 0),
              (this.avail_in = 0),
              (this.total_in = 0),
              (this.output = null),
              (this.next_out = 0),
              (this.avail_out = 0),
              (this.total_out = 0),
              (this.msg = ""),
              (this.state = null),
              (this.data_type = 2),
              (this.adler = 0);
      };
  },
  function (t, e, r) {
      "use strict";
      t.exports = {
          Z_NO_FLUSH: 0,
          Z_PARTIAL_FLUSH: 1,
          Z_SYNC_FLUSH: 2,
          Z_FULL_FLUSH: 3,
          Z_FINISH: 4,
          Z_BLOCK: 5,
          Z_TREES: 6,
          Z_OK: 0,
          Z_STREAM_END: 1,
          Z_NEED_DICT: 2,
          Z_ERRNO: -1,
          Z_STREAM_ERROR: -2,
          Z_DATA_ERROR: -3,
          Z_BUF_ERROR: -5,
          Z_NO_COMPRESSION: 0,
          Z_BEST_SPEED: 1,
          Z_BEST_COMPRESSION: 9,
          Z_DEFAULT_COMPRESSION: -1,
          Z_FILTERED: 1,
          Z_HUFFMAN_ONLY: 2,
          Z_RLE: 3,
          Z_FIXED: 4,
          Z_DEFAULT_STRATEGY: 0,
          Z_BINARY: 0,
          Z_TEXT: 1,
          Z_UNKNOWN: 2,
          Z_DEFLATED: 8,
      };
  },
  function (t, e, r) {
      "use strict";
      var i = {};
      (0, r(1).assign)(i, r(13), r(16), r(7)), (t.exports = i);
  },
  ,
  ,
  ,
  function (t, e) {
      var r, i;
      (window.requestAnimFrame =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (t, e) {
              window.setTimeout(t, 1e3 / 60);
          }),
          (jQuery.support.cors = !0),
          $.ajaxTransport
              ? ($.ajaxSetup({ flatOptions: { renderer: !0 } }),
                $.ajaxTransport("+binary", function (t, e, r) {
                    if (window.FormData && ((t.dataType && "binary" == t.dataType) || (t.data && ((window.ArrayBuffer && t.data instanceof ArrayBuffer) || (window.Blob && t.data instanceof Blob)))))
                        return {
                            send: function (e, r) {
                                var i = new XMLHttpRequest(),
                                    n = t.url,
                                    a = t.type,
                                    s = t.responseType || "blob",
                                    o = t.data || null;
                                t.renderer &&
                                    i.addEventListener("progress", function (e) {
                                        e.lengthComputable &&
                                            (t.renderer.downloads[this.responseURL] ? (t.renderer.downloads[this.responseURL].loaded = e.loaded) : (t.renderer.downloads[this.responseURL] = { loaded: e.loaded, total: e.total }),
                                            t.renderer.updateProgress());
                                    }),
                                    i.addEventListener("load", function () {
                                        t.renderer && (delete t.renderer.downloads[this.responseURL], t.renderer.updateProgress());
                                        var e = {};
                                        (e[t.dataType] = i.response), r(i.status, i.statusText, e, i.getAllResponseHeaders());
                                    }),
                                    i.open(a, n, !0),
                                    (i.responseType = s),
                                    i.send(o);
                            },
                            abort: function () {
                                r.abort();
                            },
                        };
                }))
              : ((r = $.httpData),
                ($.httpData = function (t, e, i) {
                    return "binary" == e ? t.response : r(t, e, i);
                }),
                $.ajaxSetup({
                    beforeSend: function (t, e) {
                        "binary" == e.dataType &&
                            ((t.responseType = e.responseType || "arraybuffer"),
                            t.addEventListener(
                                "progress",
                                function (t) {
                                    e.renderer &&
                                        t.lengthComputable &&
                                        (e.renderer.downloads[this.responseURL] ? (e.renderer.downloads[this.responseURL].loaded = t.loaded) : (e.renderer.downloads[this.responseURL] = { loaded: t.loaded, total: t.total }),
                                        e.renderer.updateProgress());
                                },
                                !1
                            ),
                            t.addEventListener(
                                "load",
                                function () {
                                    e.renderer && (delete e.renderer.downloads[this.responseURL], e.renderer.updateProgress());
                                },
                                !1
                            ));
                    },
                })),
          (Math.randomInt =
              Math.randomInt ||
              function (t, e) {
                  return Math.floor(Math.random() * (e - t)) + t;
              }),
          "function" != typeof Object.create &&
              (Object.create =
                  ((i = function () {}),
                  function (t) {
                      if (arguments.length > 1) throw Error("Second argument not supported");
                      if ("object" != typeof t) throw TypeError("Argument must be an object");
                      i.prototype = t;
                      var e = new i();
                      return (i.prototype = null), e;
                  })),
          (window.console = window.console || { log: function () {}, error: function () {}, warn: function () {} });
  },
  function (t, e, r) {
      "use strict";
      var i = r(14),
          n = r(1),
          a = r(5),
          s = r(2),
          o = r(6),
          h = Object.prototype.toString,
          u = 0,
          l = -1,
          c = 0,
          f = 8;
      function d(t) {
          if (!(this instanceof d)) return new d(t);
          this.options = n.assign({ level: l, method: f, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, t || {});
          var e = this.options;
          e.raw && e.windowBits > 0 ? (e.windowBits = -e.windowBits) : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16),
              (this.err = 0),
              (this.msg = ""),
              (this.ended = !1),
              (this.chunks = []),
              (this.strm = new o()),
              (this.strm.avail_out = 0);
          var r = i.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
          if (r !== u) throw new Error(s[r]);
          if ((e.header && i.deflateSetHeader(this.strm, e.header), e.dictionary)) {
              var b;
              if (((b = "string" == typeof e.dictionary ? a.string2buf(e.dictionary) : "[object ArrayBuffer]" === h.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary), (r = i.deflateSetDictionary(this.strm, b)) !== u))
                  throw new Error(s[r]);
              this._dict_set = !0;
          }
      }
      function b(t, e) {
          var r = new d(e);
          if ((r.push(t, !0), r.err)) throw r.msg || s[r.err];
          return r.result;
      }
      (d.prototype.push = function (t, e) {
          var r,
              s,
              o = this.strm,
              l = this.options.chunkSize;
          if (this.ended) return !1;
          (s = e === ~~e ? e : !0 === e ? 4 : 0), "string" == typeof t ? (o.input = a.string2buf(t)) : "[object ArrayBuffer]" === h.call(t) ? (o.input = new Uint8Array(t)) : (o.input = t), (o.next_in = 0), (o.avail_in = o.input.length);
          do {
              if ((0 === o.avail_out && ((o.output = new n.Buf8(l)), (o.next_out = 0), (o.avail_out = l)), 1 !== (r = i.deflate(o, s)) && r !== u)) return this.onEnd(r), (this.ended = !0), !1;
              (0 !== o.avail_out && (0 !== o.avail_in || (4 !== s && 2 !== s))) || ("string" === this.options.to ? this.onData(a.buf2binstring(n.shrinkBuf(o.output, o.next_out))) : this.onData(n.shrinkBuf(o.output, o.next_out)));
          } while ((o.avail_in > 0 || 0 === o.avail_out) && 1 !== r);
          return 4 === s ? ((r = i.deflateEnd(this.strm)), this.onEnd(r), (this.ended = !0), r === u) : 2 !== s || (this.onEnd(u), (o.avail_out = 0), !0);
      }),
          (d.prototype.onData = function (t) {
              this.chunks.push(t);
          }),
          (d.prototype.onEnd = function (t) {
              t === u && ("string" === this.options.to ? (this.result = this.chunks.join("")) : (this.result = n.flattenChunks(this.chunks))), (this.chunks = []), (this.err = t), (this.msg = this.strm.msg);
          }),
          (e.Deflate = d),
          (e.deflate = b),
          (e.deflateRaw = function (t, e) {
              return ((e = e || {}).raw = !0), b(t, e);
          }),
          (e.gzip = function (t, e) {
              return ((e = e || {}).gzip = !0), b(t, e);
          });
  },
  function (t, e, r) {
      "use strict";
      var i,
          n = r(1),
          a = r(15),
          s = r(3),
          o = r(4),
          h = r(2),
          u = 0,
          l = 1,
          c = 3,
          f = 4,
          d = 5,
          b = 0,
          p = 1,
          m = -2,
          _ = -3,
          g = -5,
          v = -1,
          x = 1,
          y = 2,
          T = 3,
          w = 4,
          E = 0,
          A = 2,
          M = 8,
          F = 9,
          R = 15,
          S = 8,
          C = 286,
          P = 30,
          I = 19,
          U = 2 * C + 1,
          k = 15,
          D = 3,
          O = 258,
          B = O + D + 1,
          N = 32,
          L = 42,
          z = 69,
          j = 73,
          H = 91,
          G = 103,
          V = 113,
          q = 666,
          X = 1,
          Y = 2,
          Z = 3,
          W = 4,
          K = 3;
      function J(t, e) {
          return (t.msg = h[e]), e;
      }
      function Q(t) {
          return (t << 1) - (t > 4 ? 9 : 0);
      }
      function $(t) {
          for (var e = t.length; --e >= 0; ) t[e] = 0;
      }
      function tt(t) {
          var e = t.state,
              r = e.pending;
          r > t.avail_out && (r = t.avail_out),
              0 !== r && (n.arraySet(t.output, e.pending_buf, e.pending_out, r, t.next_out), (t.next_out += r), (e.pending_out += r), (t.total_out += r), (t.avail_out -= r), (e.pending -= r), 0 === e.pending && (e.pending_out = 0));
      }
      function et(t, e) {
          a._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), (t.block_start = t.strstart), tt(t.strm);
      }
      function rt(t, e) {
          t.pending_buf[t.pending++] = e;
      }
      function it(t, e) {
          (t.pending_buf[t.pending++] = (e >>> 8) & 255), (t.pending_buf[t.pending++] = 255 & e);
      }
      function nt(t, e) {
          var r,
              i,
              n = t.max_chain_length,
              a = t.strstart,
              s = t.prev_length,
              o = t.nice_match,
              h = t.strstart > t.w_size - B ? t.strstart - (t.w_size - B) : 0,
              u = t.window,
              l = t.w_mask,
              c = t.prev,
              f = t.strstart + O,
              d = u[a + s - 1],
              b = u[a + s];
          t.prev_length >= t.good_match && (n >>= 2), o > t.lookahead && (o = t.lookahead);
          do {
              if (u[(r = e) + s] === b && u[r + s - 1] === d && u[r] === u[a] && u[++r] === u[a + 1]) {
                  (a += 2), r++;
                  do {} while (u[++a] === u[++r] && u[++a] === u[++r] && u[++a] === u[++r] && u[++a] === u[++r] && u[++a] === u[++r] && u[++a] === u[++r] && u[++a] === u[++r] && u[++a] === u[++r] && a < f);
                  if (((i = O - (f - a)), (a = f - O), i > s)) {
                      if (((t.match_start = e), (s = i), i >= o)) break;
                      (d = u[a + s - 1]), (b = u[a + s]);
                  }
              }
          } while ((e = c[e & l]) > h && 0 != --n);
          return s <= t.lookahead ? s : t.lookahead;
      }
      function at(t) {
          var e,
              r,
              i,
              a,
              h,
              u,
              l,
              c,
              f,
              d,
              b = t.w_size;
          do {
              if (((a = t.window_size - t.lookahead - t.strstart), t.strstart >= b + (b - B))) {
                  n.arraySet(t.window, t.window, b, b, 0), (t.match_start -= b), (t.strstart -= b), (t.block_start -= b), (e = r = t.hash_size);
                  do {
                      (i = t.head[--e]), (t.head[e] = i >= b ? i - b : 0);
                  } while (--r);
                  e = r = b;
                  do {
                      (i = t.prev[--e]), (t.prev[e] = i >= b ? i - b : 0);
                  } while (--r);
                  a += b;
              }
              if (0 === t.strm.avail_in) break;
              if (
                  ((u = t.strm),
                  (l = t.window),
                  (c = t.strstart + t.lookahead),
                  (f = a),
                  (d = void 0),
                  (d = u.avail_in) > f && (d = f),
                  (r =
                      0 === d
                          ? 0
                          : ((u.avail_in -= d),
                            n.arraySet(l, u.input, u.next_in, d, c),
                            1 === u.state.wrap ? (u.adler = s(u.adler, l, d, c)) : 2 === u.state.wrap && (u.adler = o(u.adler, l, d, c)),
                            (u.next_in += d),
                            (u.total_in += d),
                            d)),
                  (t.lookahead += r),
                  t.lookahead + t.insert >= D)
              )
                  for (
                      h = t.strstart - t.insert, t.ins_h = t.window[h], t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[h + 1]) & t.hash_mask;
                      t.insert && ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[h + D - 1]) & t.hash_mask), (t.prev[h & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = h), h++, t.insert--, !(t.lookahead + t.insert < D));

                  );
          } while (t.lookahead < B && 0 !== t.strm.avail_in);
      }
      function st(t, e) {
          for (var r, i; ; ) {
              if (t.lookahead < B) {
                  if ((at(t), t.lookahead < B && e === u)) return X;
                  if (0 === t.lookahead) break;
              }
              if (
                  ((r = 0),
                  t.lookahead >= D && ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + D - 1]) & t.hash_mask), (r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart)),
                  0 !== r && t.strstart - r <= t.w_size - B && (t.match_length = nt(t, r)),
                  t.match_length >= D)
              )
                  if (((i = a._tr_tally(t, t.strstart - t.match_start, t.match_length - D)), (t.lookahead -= t.match_length), t.match_length <= t.max_lazy_match && t.lookahead >= D)) {
                      t.match_length--;
                      do {
                          t.strstart++, (t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + D - 1]) & t.hash_mask), (r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart);
                      } while (0 != --t.match_length);
                      t.strstart++;
                  } else (t.strstart += t.match_length), (t.match_length = 0), (t.ins_h = t.window[t.strstart]), (t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 1]) & t.hash_mask);
              else (i = a._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++;
              if (i && (et(t, !1), 0 === t.strm.avail_out)) return X;
          }
          return (t.insert = t.strstart < D - 1 ? t.strstart : D - 1), e === f ? (et(t, !0), 0 === t.strm.avail_out ? Z : W) : t.last_lit && (et(t, !1), 0 === t.strm.avail_out) ? X : Y;
      }
      function ot(t, e) {
          for (var r, i, n; ; ) {
              if (t.lookahead < B) {
                  if ((at(t), t.lookahead < B && e === u)) return X;
                  if (0 === t.lookahead) break;
              }
              if (
                  ((r = 0),
                  t.lookahead >= D && ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + D - 1]) & t.hash_mask), (r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart)),
                  (t.prev_length = t.match_length),
                  (t.prev_match = t.match_start),
                  (t.match_length = D - 1),
                  0 !== r &&
                      t.prev_length < t.max_lazy_match &&
                      t.strstart - r <= t.w_size - B &&
                      ((t.match_length = nt(t, r)), t.match_length <= 5 && (t.strategy === x || (t.match_length === D && t.strstart - t.match_start > 4096)) && (t.match_length = D - 1)),
                  t.prev_length >= D && t.match_length <= t.prev_length)
              ) {
                  (n = t.strstart + t.lookahead - D), (i = a._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - D)), (t.lookahead -= t.prev_length - 1), (t.prev_length -= 2);
                  do {
                      ++t.strstart <= n && ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + D - 1]) & t.hash_mask), (r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart));
                  } while (0 != --t.prev_length);
                  if (((t.match_available = 0), (t.match_length = D - 1), t.strstart++, i && (et(t, !1), 0 === t.strm.avail_out))) return X;
              } else if (t.match_available) {
                  if (((i = a._tr_tally(t, 0, t.window[t.strstart - 1])) && et(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out)) return X;
              } else (t.match_available = 1), t.strstart++, t.lookahead--;
          }
          return (
              t.match_available && ((i = a._tr_tally(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)),
              (t.insert = t.strstart < D - 1 ? t.strstart : D - 1),
              e === f ? (et(t, !0), 0 === t.strm.avail_out ? Z : W) : t.last_lit && (et(t, !1), 0 === t.strm.avail_out) ? X : Y
          );
      }
      function ht(t, e, r, i, n) {
          (this.good_length = t), (this.max_lazy = e), (this.nice_length = r), (this.max_chain = i), (this.func = n);
      }
      function ut() {
          (this.strm = null),
              (this.status = 0),
              (this.pending_buf = null),
              (this.pending_buf_size = 0),
              (this.pending_out = 0),
              (this.pending = 0),
              (this.wrap = 0),
              (this.gzhead = null),
              (this.gzindex = 0),
              (this.method = M),
              (this.last_flush = -1),
              (this.w_size = 0),
              (this.w_bits = 0),
              (this.w_mask = 0),
              (this.window = null),
              (this.window_size = 0),
              (this.prev = null),
              (this.head = null),
              (this.ins_h = 0),
              (this.hash_size = 0),
              (this.hash_bits = 0),
              (this.hash_mask = 0),
              (this.hash_shift = 0),
              (this.block_start = 0),
              (this.match_length = 0),
              (this.prev_match = 0),
              (this.match_available = 0),
              (this.strstart = 0),
              (this.match_start = 0),
              (this.lookahead = 0),
              (this.prev_length = 0),
              (this.max_chain_length = 0),
              (this.max_lazy_match = 0),
              (this.level = 0),
              (this.strategy = 0),
              (this.good_match = 0),
              (this.nice_match = 0),
              (this.dyn_ltree = new n.Buf16(2 * U)),
              (this.dyn_dtree = new n.Buf16(2 * (2 * P + 1))),
              (this.bl_tree = new n.Buf16(2 * (2 * I + 1))),
              $(this.dyn_ltree),
              $(this.dyn_dtree),
              $(this.bl_tree),
              (this.l_desc = null),
              (this.d_desc = null),
              (this.bl_desc = null),
              (this.bl_count = new n.Buf16(k + 1)),
              (this.heap = new n.Buf16(2 * C + 1)),
              $(this.heap),
              (this.heap_len = 0),
              (this.heap_max = 0),
              (this.depth = new n.Buf16(2 * C + 1)),
              $(this.depth),
              (this.l_buf = 0),
              (this.lit_bufsize = 0),
              (this.last_lit = 0),
              (this.d_buf = 0),
              (this.opt_len = 0),
              (this.static_len = 0),
              (this.matches = 0),
              (this.insert = 0),
              (this.bi_buf = 0),
              (this.bi_valid = 0);
      }
      function lt(t) {
          var e;
          return t && t.state
              ? ((t.total_in = t.total_out = 0),
                (t.data_type = A),
                ((e = t.state).pending = 0),
                (e.pending_out = 0),
                e.wrap < 0 && (e.wrap = -e.wrap),
                (e.status = e.wrap ? L : V),
                (t.adler = 2 === e.wrap ? 0 : 1),
                (e.last_flush = u),
                a._tr_init(e),
                b)
              : J(t, m);
      }
      function ct(t) {
          var e,
              r = lt(t);
          return (
              r === b &&
                  (((e = t.state).window_size = 2 * e.w_size),
                  $(e.head),
                  (e.max_lazy_match = i[e.level].max_lazy),
                  (e.good_match = i[e.level].good_length),
                  (e.nice_match = i[e.level].nice_length),
                  (e.max_chain_length = i[e.level].max_chain),
                  (e.strstart = 0),
                  (e.block_start = 0),
                  (e.lookahead = 0),
                  (e.insert = 0),
                  (e.match_length = e.prev_length = D - 1),
                  (e.match_available = 0),
                  (e.ins_h = 0)),
              r
          );
      }
      function ft(t, e, r, i, a, s) {
          if (!t) return m;
          var o = 1;
          if ((e === v && (e = 6), i < 0 ? ((o = 0), (i = -i)) : i > 15 && ((o = 2), (i -= 16)), a < 1 || a > F || r !== M || i < 8 || i > 15 || e < 0 || e > 9 || s < 0 || s > w)) return J(t, m);
          8 === i && (i = 9);
          var h = new ut();
          return (
              (t.state = h),
              (h.strm = t),
              (h.wrap = o),
              (h.gzhead = null),
              (h.w_bits = i),
              (h.w_size = 1 << h.w_bits),
              (h.w_mask = h.w_size - 1),
              (h.hash_bits = a + 7),
              (h.hash_size = 1 << h.hash_bits),
              (h.hash_mask = h.hash_size - 1),
              (h.hash_shift = ~~((h.hash_bits + D - 1) / D)),
              (h.window = new n.Buf8(2 * h.w_size)),
              (h.head = new n.Buf16(h.hash_size)),
              (h.prev = new n.Buf16(h.w_size)),
              (h.lit_bufsize = 1 << (a + 6)),
              (h.pending_buf_size = 4 * h.lit_bufsize),
              (h.pending_buf = new n.Buf8(h.pending_buf_size)),
              (h.d_buf = 1 * h.lit_bufsize),
              (h.l_buf = 3 * h.lit_bufsize),
              (h.level = e),
              (h.strategy = s),
              (h.method = r),
              ct(t)
          );
      }
      (i = [
          new ht(0, 0, 0, 0, function (t, e) {
              var r = 65535;
              for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5); ; ) {
                  if (t.lookahead <= 1) {
                      if ((at(t), 0 === t.lookahead && e === u)) return X;
                      if (0 === t.lookahead) break;
                  }
                  (t.strstart += t.lookahead), (t.lookahead = 0);
                  var i = t.block_start + r;
                  if ((0 === t.strstart || t.strstart >= i) && ((t.lookahead = t.strstart - i), (t.strstart = i), et(t, !1), 0 === t.strm.avail_out)) return X;
                  if (t.strstart - t.block_start >= t.w_size - B && (et(t, !1), 0 === t.strm.avail_out)) return X;
              }
              return (t.insert = 0), e === f ? (et(t, !0), 0 === t.strm.avail_out ? Z : W) : (t.strstart > t.block_start && (et(t, !1), t.strm.avail_out), X);
          }),
          new ht(4, 4, 8, 4, st),
          new ht(4, 5, 16, 8, st),
          new ht(4, 6, 32, 32, st),
          new ht(4, 4, 16, 16, ot),
          new ht(8, 16, 32, 32, ot),
          new ht(8, 16, 128, 128, ot),
          new ht(8, 32, 128, 256, ot),
          new ht(32, 128, 258, 1024, ot),
          new ht(32, 258, 258, 4096, ot),
      ]),
          (e.deflateInit = function (t, e) {
              return ft(t, e, M, R, S, E);
          }),
          (e.deflateInit2 = ft),
          (e.deflateReset = ct),
          (e.deflateResetKeep = lt),
          (e.deflateSetHeader = function (t, e) {
              return t && t.state ? (2 !== t.state.wrap ? m : ((t.state.gzhead = e), b)) : m;
          }),
          (e.deflate = function (t, e) {
              var r, n, s, h;
              if (!t || !t.state || e > d || e < 0) return t ? J(t, m) : m;
              if (((n = t.state), !t.output || (!t.input && 0 !== t.avail_in) || (n.status === q && e !== f))) return J(t, 0 === t.avail_out ? g : m);
              if (((n.strm = t), (r = n.last_flush), (n.last_flush = e), n.status === L))
                  if (2 === n.wrap)
                      (t.adler = 0),
                          rt(n, 31),
                          rt(n, 139),
                          rt(n, 8),
                          n.gzhead
                              ? (rt(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)),
                                rt(n, 255 & n.gzhead.time),
                                rt(n, (n.gzhead.time >> 8) & 255),
                                rt(n, (n.gzhead.time >> 16) & 255),
                                rt(n, (n.gzhead.time >> 24) & 255),
                                rt(n, 9 === n.level ? 2 : n.strategy >= y || n.level < 2 ? 4 : 0),
                                rt(n, 255 & n.gzhead.os),
                                n.gzhead.extra && n.gzhead.extra.length && (rt(n, 255 & n.gzhead.extra.length), rt(n, (n.gzhead.extra.length >> 8) & 255)),
                                n.gzhead.hcrc && (t.adler = o(t.adler, n.pending_buf, n.pending, 0)),
                                (n.gzindex = 0),
                                (n.status = z))
                              : (rt(n, 0), rt(n, 0), rt(n, 0), rt(n, 0), rt(n, 0), rt(n, 9 === n.level ? 2 : n.strategy >= y || n.level < 2 ? 4 : 0), rt(n, K), (n.status = V));
                  else {
                      var _ = (M + ((n.w_bits - 8) << 4)) << 8;
                      (_ |= (n.strategy >= y || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6),
                          0 !== n.strstart && (_ |= N),
                          (_ += 31 - (_ % 31)),
                          (n.status = V),
                          it(n, _),
                          0 !== n.strstart && (it(n, t.adler >>> 16), it(n, 65535 & t.adler)),
                          (t.adler = 1);
                  }
              if (n.status === z)
                  if (n.gzhead.extra) {
                      for (
                          s = n.pending;
                          n.gzindex < (65535 & n.gzhead.extra.length) &&
                          (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > s && (t.adler = o(t.adler, n.pending_buf, n.pending - s, s)), tt(t), (s = n.pending), n.pending !== n.pending_buf_size));

                      )
                          rt(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;
                      n.gzhead.hcrc && n.pending > s && (t.adler = o(t.adler, n.pending_buf, n.pending - s, s)), n.gzindex === n.gzhead.extra.length && ((n.gzindex = 0), (n.status = j));
                  } else n.status = j;
              if (n.status === j)
                  if (n.gzhead.name) {
                      s = n.pending;
                      do {
                          if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > s && (t.adler = o(t.adler, n.pending_buf, n.pending - s, s)), tt(t), (s = n.pending), n.pending === n.pending_buf_size)) {
                              h = 1;
                              break;
                          }
                          (h = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0), rt(n, h);
                      } while (0 !== h);
                      n.gzhead.hcrc && n.pending > s && (t.adler = o(t.adler, n.pending_buf, n.pending - s, s)), 0 === h && ((n.gzindex = 0), (n.status = H));
                  } else n.status = H;
              if (n.status === H)
                  if (n.gzhead.comment) {
                      s = n.pending;
                      do {
                          if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > s && (t.adler = o(t.adler, n.pending_buf, n.pending - s, s)), tt(t), (s = n.pending), n.pending === n.pending_buf_size)) {
                              h = 1;
                              break;
                          }
                          (h = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0), rt(n, h);
                      } while (0 !== h);
                      n.gzhead.hcrc && n.pending > s && (t.adler = o(t.adler, n.pending_buf, n.pending - s, s)), 0 === h && (n.status = G);
                  } else n.status = G;
              if (
                  (n.status === G &&
                      (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && tt(t), n.pending + 2 <= n.pending_buf_size && (rt(n, 255 & t.adler), rt(n, (t.adler >> 8) & 255), (t.adler = 0), (n.status = V))) : (n.status = V)),
                  0 !== n.pending)
              ) {
                  if ((tt(t), 0 === t.avail_out)) return (n.last_flush = -1), b;
              } else if (0 === t.avail_in && Q(e) <= Q(r) && e !== f) return J(t, g);
              if (n.status === q && 0 !== t.avail_in) return J(t, g);
              if (0 !== t.avail_in || 0 !== n.lookahead || (e !== u && n.status !== q)) {
                  var v =
                      n.strategy === y
                          ? (function (t, e) {
                                for (var r; ; ) {
                                    if (0 === t.lookahead && (at(t), 0 === t.lookahead)) {
                                        if (e === u) return X;
                                        break;
                                    }
                                    if (((t.match_length = 0), (r = a._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++, r && (et(t, !1), 0 === t.strm.avail_out))) return X;
                                }
                                return (t.insert = 0), e === f ? (et(t, !0), 0 === t.strm.avail_out ? Z : W) : t.last_lit && (et(t, !1), 0 === t.strm.avail_out) ? X : Y;
                            })(n, e)
                          : n.strategy === T
                          ? (function (t, e) {
                                for (var r, i, n, s, o = t.window; ; ) {
                                    if (t.lookahead <= O) {
                                        if ((at(t), t.lookahead <= O && e === u)) return X;
                                        if (0 === t.lookahead) break;
                                    }
                                    if (((t.match_length = 0), t.lookahead >= D && t.strstart > 0 && (i = o[(n = t.strstart - 1)]) === o[++n] && i === o[++n] && i === o[++n])) {
                                        s = t.strstart + O;
                                        do {} while (i === o[++n] && i === o[++n] && i === o[++n] && i === o[++n] && i === o[++n] && i === o[++n] && i === o[++n] && i === o[++n] && n < s);
                                        (t.match_length = O - (s - n)), t.match_length > t.lookahead && (t.match_length = t.lookahead);
                                    }
                                    if (
                                        (t.match_length >= D
                                            ? ((r = a._tr_tally(t, 1, t.match_length - D)), (t.lookahead -= t.match_length), (t.strstart += t.match_length), (t.match_length = 0))
                                            : ((r = a._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++),
                                        r && (et(t, !1), 0 === t.strm.avail_out))
                                    )
                                        return X;
                                }
                                return (t.insert = 0), e === f ? (et(t, !0), 0 === t.strm.avail_out ? Z : W) : t.last_lit && (et(t, !1), 0 === t.strm.avail_out) ? X : Y;
                            })(n, e)
                          : i[n.level].func(n, e);
                  if (((v !== Z && v !== W) || (n.status = q), v === X || v === Z)) return 0 === t.avail_out && (n.last_flush = -1), b;
                  if (v === Y && (e === l ? a._tr_align(n) : e !== d && (a._tr_stored_block(n, 0, 0, !1), e === c && ($(n.head), 0 === n.lookahead && ((n.strstart = 0), (n.block_start = 0), (n.insert = 0)))), tt(t), 0 === t.avail_out))
                      return (n.last_flush = -1), b;
              }
              return e !== f
                  ? b
                  : n.wrap <= 0
                  ? p
                  : (2 === n.wrap
                        ? (rt(n, 255 & t.adler),
                          rt(n, (t.adler >> 8) & 255),
                          rt(n, (t.adler >> 16) & 255),
                          rt(n, (t.adler >> 24) & 255),
                          rt(n, 255 & t.total_in),
                          rt(n, (t.total_in >> 8) & 255),
                          rt(n, (t.total_in >> 16) & 255),
                          rt(n, (t.total_in >> 24) & 255))
                        : (it(n, t.adler >>> 16), it(n, 65535 & t.adler)),
                    tt(t),
                    n.wrap > 0 && (n.wrap = -n.wrap),
                    0 !== n.pending ? b : p);
          }),
          (e.deflateEnd = function (t) {
              var e;
              return t && t.state ? ((e = t.state.status) !== L && e !== z && e !== j && e !== H && e !== G && e !== V && e !== q ? J(t, m) : ((t.state = null), e === V ? J(t, _) : b)) : m;
          }),
          (e.deflateSetDictionary = function (t, e) {
              var r,
                  i,
                  a,
                  o,
                  h,
                  u,
                  l,
                  c,
                  f = e.length;
              if (!t || !t.state) return m;
              if (2 === (o = (r = t.state).wrap) || (1 === o && r.status !== L) || r.lookahead) return m;
              for (
                  1 === o && (t.adler = s(t.adler, e, f, 0)),
                      r.wrap = 0,
                      f >= r.w_size && (0 === o && ($(r.head), (r.strstart = 0), (r.block_start = 0), (r.insert = 0)), (c = new n.Buf8(r.w_size)), n.arraySet(c, e, f - r.w_size, r.w_size, 0), (e = c), (f = r.w_size)),
                      h = t.avail_in,
                      u = t.next_in,
                      l = t.input,
                      t.avail_in = f,
                      t.next_in = 0,
                      t.input = e,
                      at(r);
                  r.lookahead >= D;

              ) {
                  (i = r.strstart), (a = r.lookahead - (D - 1));
                  do {
                      (r.ins_h = ((r.ins_h << r.hash_shift) ^ r.window[i + D - 1]) & r.hash_mask), (r.prev[i & r.w_mask] = r.head[r.ins_h]), (r.head[r.ins_h] = i), i++;
                  } while (--a);
                  (r.strstart = i), (r.lookahead = D - 1), at(r);
              }
              return (
                  (r.strstart += r.lookahead),
                  (r.block_start = r.strstart),
                  (r.insert = r.lookahead),
                  (r.lookahead = 0),
                  (r.match_length = r.prev_length = D - 1),
                  (r.match_available = 0),
                  (t.next_in = u),
                  (t.input = l),
                  (t.avail_in = h),
                  (r.wrap = o),
                  b
              );
          }),
          (e.deflateInfo = "pako deflate (from Nodeca project)");
  },
  function (t, e, r) {
      "use strict";
      var i = r(1),
          n = 4,
          a = 0,
          s = 1,
          o = 2;
      function h(t) {
          for (var e = t.length; --e >= 0; ) t[e] = 0;
      }
      var u = 0,
          l = 1,
          c = 2,
          f = 29,
          d = 256,
          b = d + 1 + f,
          p = 30,
          m = 19,
          _ = 2 * b + 1,
          g = 15,
          v = 16,
          x = 7,
          y = 256,
          T = 16,
          w = 17,
          E = 18,
          A = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
          M = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
          F = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
          R = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
          S = new Array(2 * (b + 2));
      h(S);
      var C = new Array(2 * p);
      h(C);
      var P = new Array(512);
      h(P);
      var I = new Array(256);
      h(I);
      var U = new Array(f);
      h(U);
      var k,
          D,
          O,
          B = new Array(p);
      function N(t, e, r, i, n) {
          (this.static_tree = t), (this.extra_bits = e), (this.extra_base = r), (this.elems = i), (this.max_length = n), (this.has_stree = t && t.length);
      }
      function L(t, e) {
          (this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e);
      }
      function z(t) {
          return t < 256 ? P[t] : P[256 + (t >>> 7)];
      }
      function j(t, e) {
          (t.pending_buf[t.pending++] = 255 & e), (t.pending_buf[t.pending++] = (e >>> 8) & 255);
      }
      function H(t, e, r) {
          t.bi_valid > v - r ? ((t.bi_buf |= (e << t.bi_valid) & 65535), j(t, t.bi_buf), (t.bi_buf = e >> (v - t.bi_valid)), (t.bi_valid += r - v)) : ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += r));
      }
      function G(t, e, r) {
          H(t, r[2 * e], r[2 * e + 1]);
      }
      function V(t, e) {
          var r = 0;
          do {
              (r |= 1 & t), (t >>>= 1), (r <<= 1);
          } while (--e > 0);
          return r >>> 1;
      }
      function q(t, e, r) {
          var i,
              n,
              a = new Array(g + 1),
              s = 0;
          for (i = 1; i <= g; i++) a[i] = s = (s + r[i - 1]) << 1;
          for (n = 0; n <= e; n++) {
              var o = t[2 * n + 1];
              0 !== o && (t[2 * n] = V(a[o]++, o));
          }
      }
      function X(t) {
          var e;
          for (e = 0; e < b; e++) t.dyn_ltree[2 * e] = 0;
          for (e = 0; e < p; e++) t.dyn_dtree[2 * e] = 0;
          for (e = 0; e < m; e++) t.bl_tree[2 * e] = 0;
          (t.dyn_ltree[2 * y] = 1), (t.opt_len = t.static_len = 0), (t.last_lit = t.matches = 0);
      }
      function Y(t) {
          t.bi_valid > 8 ? j(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0);
      }
      function Z(t, e, r, i) {
          var n = 2 * e,
              a = 2 * r;
          return t[n] < t[a] || (t[n] === t[a] && i[e] <= i[r]);
      }
      function W(t, e, r) {
          for (var i = t.heap[r], n = r << 1; n <= t.heap_len && (n < t.heap_len && Z(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !Z(e, i, t.heap[n], t.depth)); ) (t.heap[r] = t.heap[n]), (r = n), (n <<= 1);
          t.heap[r] = i;
      }
      function K(t, e, r) {
          var i,
              n,
              a,
              s,
              o = 0;
          if (0 !== t.last_lit)
              do {
                  (i = (t.pending_buf[t.d_buf + 2 * o] << 8) | t.pending_buf[t.d_buf + 2 * o + 1]),
                      (n = t.pending_buf[t.l_buf + o]),
                      o++,
                      0 === i ? G(t, n, e) : (G(t, (a = I[n]) + d + 1, e), 0 !== (s = A[a]) && H(t, (n -= U[a]), s), G(t, (a = z(--i)), r), 0 !== (s = M[a]) && H(t, (i -= B[a]), s));
              } while (o < t.last_lit);
          G(t, y, e);
      }
      function J(t, e) {
          var r,
              i,
              n,
              a = e.dyn_tree,
              s = e.stat_desc.static_tree,
              o = e.stat_desc.has_stree,
              h = e.stat_desc.elems,
              u = -1;
          for (t.heap_len = 0, t.heap_max = _, r = 0; r < h; r++) 0 !== a[2 * r] ? ((t.heap[++t.heap_len] = u = r), (t.depth[r] = 0)) : (a[2 * r + 1] = 0);
          for (; t.heap_len < 2; ) (a[2 * (n = t.heap[++t.heap_len] = u < 2 ? ++u : 0)] = 1), (t.depth[n] = 0), t.opt_len--, o && (t.static_len -= s[2 * n + 1]);
          for (e.max_code = u, r = t.heap_len >> 1; r >= 1; r--) W(t, a, r);
          n = h;
          do {
              (r = t.heap[1]),
                  (t.heap[1] = t.heap[t.heap_len--]),
                  W(t, a, 1),
                  (i = t.heap[1]),
                  (t.heap[--t.heap_max] = r),
                  (t.heap[--t.heap_max] = i),
                  (a[2 * n] = a[2 * r] + a[2 * i]),
                  (t.depth[n] = (t.depth[r] >= t.depth[i] ? t.depth[r] : t.depth[i]) + 1),
                  (a[2 * r + 1] = a[2 * i + 1] = n),
                  (t.heap[1] = n++),
                  W(t, a, 1);
          } while (t.heap_len >= 2);
          (t.heap[--t.heap_max] = t.heap[1]),
              (function (t, e) {
                  var r,
                      i,
                      n,
                      a,
                      s,
                      o,
                      h = e.dyn_tree,
                      u = e.max_code,
                      l = e.stat_desc.static_tree,
                      c = e.stat_desc.has_stree,
                      f = e.stat_desc.extra_bits,
                      d = e.stat_desc.extra_base,
                      b = e.stat_desc.max_length,
                      p = 0;
                  for (a = 0; a <= g; a++) t.bl_count[a] = 0;
                  for (h[2 * t.heap[t.heap_max] + 1] = 0, r = t.heap_max + 1; r < _; r++)
                      (a = h[2 * h[2 * (i = t.heap[r]) + 1] + 1] + 1) > b && ((a = b), p++),
                          (h[2 * i + 1] = a),
                          i > u || (t.bl_count[a]++, (s = 0), i >= d && (s = f[i - d]), (o = h[2 * i]), (t.opt_len += o * (a + s)), c && (t.static_len += o * (l[2 * i + 1] + s)));
                  if (0 !== p) {
                      do {
                          for (a = b - 1; 0 === t.bl_count[a]; ) a--;
                          t.bl_count[a]--, (t.bl_count[a + 1] += 2), t.bl_count[b]--, (p -= 2);
                      } while (p > 0);
                      for (a = b; 0 !== a; a--) for (i = t.bl_count[a]; 0 !== i; ) (n = t.heap[--r]) > u || (h[2 * n + 1] !== a && ((t.opt_len += (a - h[2 * n + 1]) * h[2 * n]), (h[2 * n + 1] = a)), i--);
                  }
              })(t, e),
              q(a, u, t.bl_count);
      }
      function Q(t, e, r) {
          var i,
              n,
              a = -1,
              s = e[1],
              o = 0,
              h = 7,
              u = 4;
          for (0 === s && ((h = 138), (u = 3)), e[2 * (r + 1) + 1] = 65535, i = 0; i <= r; i++)
              (n = s),
                  (s = e[2 * (i + 1) + 1]),
                  (++o < h && n === s) ||
                      (o < u ? (t.bl_tree[2 * n] += o) : 0 !== n ? (n !== a && t.bl_tree[2 * n]++, t.bl_tree[2 * T]++) : o <= 10 ? t.bl_tree[2 * w]++ : t.bl_tree[2 * E]++,
                      (o = 0),
                      (a = n),
                      0 === s ? ((h = 138), (u = 3)) : n === s ? ((h = 6), (u = 3)) : ((h = 7), (u = 4)));
      }
      function $(t, e, r) {
          var i,
              n,
              a = -1,
              s = e[1],
              o = 0,
              h = 7,
              u = 4;
          for (0 === s && ((h = 138), (u = 3)), i = 0; i <= r; i++)
              if (((n = s), (s = e[2 * (i + 1) + 1]), !(++o < h && n === s))) {
                  if (o < u)
                      do {
                          G(t, n, t.bl_tree);
                      } while (0 != --o);
                  else 0 !== n ? (n !== a && (G(t, n, t.bl_tree), o--), G(t, T, t.bl_tree), H(t, o - 3, 2)) : o <= 10 ? (G(t, w, t.bl_tree), H(t, o - 3, 3)) : (G(t, E, t.bl_tree), H(t, o - 11, 7));
                  (o = 0), (a = n), 0 === s ? ((h = 138), (u = 3)) : n === s ? ((h = 6), (u = 3)) : ((h = 7), (u = 4));
              }
      }
      h(B);
      var tt = !1;
      function et(t, e, r, n) {
          H(t, (u << 1) + (n ? 1 : 0), 3),
              (function (t, e, r, n) {
                  Y(t), n && (j(t, r), j(t, ~r)), i.arraySet(t.pending_buf, t.window, e, r, t.pending), (t.pending += r);
              })(t, e, r, !0);
      }
      (e._tr_init = function (t) {
          tt ||
              ((function () {
                  var t,
                      e,
                      r,
                      i,
                      n,
                      a = new Array(g + 1);
                  for (r = 0, i = 0; i < f - 1; i++) for (U[i] = r, t = 0; t < 1 << A[i]; t++) I[r++] = i;
                  for (I[r - 1] = i, n = 0, i = 0; i < 16; i++) for (B[i] = n, t = 0; t < 1 << M[i]; t++) P[n++] = i;
                  for (n >>= 7; i < p; i++) for (B[i] = n << 7, t = 0; t < 1 << (M[i] - 7); t++) P[256 + n++] = i;
                  for (e = 0; e <= g; e++) a[e] = 0;
                  for (t = 0; t <= 143; ) (S[2 * t + 1] = 8), t++, a[8]++;
                  for (; t <= 255; ) (S[2 * t + 1] = 9), t++, a[9]++;
                  for (; t <= 279; ) (S[2 * t + 1] = 7), t++, a[7]++;
                  for (; t <= 287; ) (S[2 * t + 1] = 8), t++, a[8]++;
                  for (q(S, b + 1, a), t = 0; t < p; t++) (C[2 * t + 1] = 5), (C[2 * t] = V(t, 5));
                  (k = new N(S, A, d + 1, b, g)), (D = new N(C, M, 0, p, g)), (O = new N(new Array(0), F, 0, m, x));
              })(),
              (tt = !0)),
              (t.l_desc = new L(t.dyn_ltree, k)),
              (t.d_desc = new L(t.dyn_dtree, D)),
              (t.bl_desc = new L(t.bl_tree, O)),
              (t.bi_buf = 0),
              (t.bi_valid = 0),
              X(t);
      }),
          (e._tr_stored_block = et),
          (e._tr_flush_block = function (t, e, r, i) {
              var h,
                  u,
                  f = 0;
              t.level > 0
                  ? (t.strm.data_type === o &&
                        (t.strm.data_type = (function (t) {
                            var e,
                                r = 4093624447;
                            for (e = 0; e <= 31; e++, r >>>= 1) if (1 & r && 0 !== t.dyn_ltree[2 * e]) return a;
                            if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return s;
                            for (e = 32; e < d; e++) if (0 !== t.dyn_ltree[2 * e]) return s;
                            return a;
                        })(t)),
                    J(t, t.l_desc),
                    J(t, t.d_desc),
                    (f = (function (t) {
                        var e;
                        for (Q(t, t.dyn_ltree, t.l_desc.max_code), Q(t, t.dyn_dtree, t.d_desc.max_code), J(t, t.bl_desc), e = m - 1; e >= 3 && 0 === t.bl_tree[2 * R[e] + 1]; e--);
                        return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
                    })(t)),
                    (h = (t.opt_len + 3 + 7) >>> 3),
                    (u = (t.static_len + 3 + 7) >>> 3) <= h && (h = u))
                  : (h = u = r + 5),
                  r + 4 <= h && -1 !== e
                      ? et(t, e, r, i)
                      : t.strategy === n || u === h
                      ? (H(t, (l << 1) + (i ? 1 : 0), 3), K(t, S, C))
                      : (H(t, (c << 1) + (i ? 1 : 0), 3),
                        (function (t, e, r, i) {
                            var n;
                            for (H(t, e - 257, 5), H(t, r - 1, 5), H(t, i - 4, 4), n = 0; n < i; n++) H(t, t.bl_tree[2 * R[n] + 1], 3);
                            $(t, t.dyn_ltree, e - 1), $(t, t.dyn_dtree, r - 1);
                        })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, f + 1),
                        K(t, t.dyn_ltree, t.dyn_dtree)),
                  X(t),
                  i && Y(t);
          }),
          (e._tr_tally = function (t, e, r) {
              return (
                  (t.pending_buf[t.d_buf + 2 * t.last_lit] = (e >>> 8) & 255),
                  (t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e),
                  (t.pending_buf[t.l_buf + t.last_lit] = 255 & r),
                  t.last_lit++,
                  0 === e ? t.dyn_ltree[2 * r]++ : (t.matches++, e--, t.dyn_ltree[2 * (I[r] + d + 1)]++, t.dyn_dtree[2 * z(e)]++),
                  t.last_lit === t.lit_bufsize - 1
              );
          }),
          (e._tr_align = function (t) {
              H(t, l << 1, 3),
                  G(t, y, S),
                  (function (t) {
                      16 === t.bi_valid ? (j(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0)) : t.bi_valid >= 8 && ((t.pending_buf[t.pending++] = 255 & t.bi_buf), (t.bi_buf >>= 8), (t.bi_valid -= 8));
                  })(t);
          });
  },
  function (t, e, r) {
      "use strict";
      var i = r(17),
          n = r(1),
          a = r(5),
          s = r(7),
          o = r(2),
          h = r(6),
          u = r(20),
          l = Object.prototype.toString;
      function c(t) {
          if (!(this instanceof c)) return new c(t);
          this.options = n.assign({ chunkSize: 16384, windowBits: 0, to: "" }, t || {});
          var e = this.options;
          e.raw && e.windowBits >= 0 && e.windowBits < 16 && ((e.windowBits = -e.windowBits), 0 === e.windowBits && (e.windowBits = -15)),
              !(e.windowBits >= 0 && e.windowBits < 16) || (t && t.windowBits) || (e.windowBits += 32),
              e.windowBits > 15 && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15),
              (this.err = 0),
              (this.msg = ""),
              (this.ended = !1),
              (this.chunks = []),
              (this.strm = new h()),
              (this.strm.avail_out = 0);
          var r = i.inflateInit2(this.strm, e.windowBits);
          if (r !== s.Z_OK) throw new Error(o[r]);
          if (
              ((this.header = new u()),
              i.inflateGetHeader(this.strm, this.header),
              e.dictionary &&
                  ("string" == typeof e.dictionary ? (e.dictionary = a.string2buf(e.dictionary)) : "[object ArrayBuffer]" === l.call(e.dictionary) && (e.dictionary = new Uint8Array(e.dictionary)),
                  e.raw && (r = i.inflateSetDictionary(this.strm, e.dictionary)) !== s.Z_OK))
          )
              throw new Error(o[r]);
      }
      function f(t, e) {
          var r = new c(e);
          if ((r.push(t, !0), r.err)) throw r.msg || o[r.err];
          return r.result;
      }
      (c.prototype.push = function (t, e) {
          var r,
              o,
              h,
              u,
              c,
              f = this.strm,
              d = this.options.chunkSize,
              b = this.options.dictionary,
              p = !1;
          if (this.ended) return !1;
          (o = e === ~~e ? e : !0 === e ? s.Z_FINISH : s.Z_NO_FLUSH),
              "string" == typeof t ? (f.input = a.binstring2buf(t)) : "[object ArrayBuffer]" === l.call(t) ? (f.input = new Uint8Array(t)) : (f.input = t),
              (f.next_in = 0),
              (f.avail_in = f.input.length);
          do {
              if (
                  (0 === f.avail_out && ((f.output = new n.Buf8(d)), (f.next_out = 0), (f.avail_out = d)),
                  (r = i.inflate(f, s.Z_NO_FLUSH)) === s.Z_NEED_DICT && b && (r = i.inflateSetDictionary(this.strm, b)),
                  r === s.Z_BUF_ERROR && !0 === p && ((r = s.Z_OK), (p = !1)),
                  r !== s.Z_STREAM_END && r !== s.Z_OK)
              )
                  return this.onEnd(r), (this.ended = !0), !1;
              f.next_out &&
                  ((0 !== f.avail_out && r !== s.Z_STREAM_END && (0 !== f.avail_in || (o !== s.Z_FINISH && o !== s.Z_SYNC_FLUSH))) ||
                      ("string" === this.options.to
                          ? ((h = a.utf8border(f.output, f.next_out)), (u = f.next_out - h), (c = a.buf2string(f.output, h)), (f.next_out = u), (f.avail_out = d - u), u && n.arraySet(f.output, f.output, h, u, 0), this.onData(c))
                          : this.onData(n.shrinkBuf(f.output, f.next_out)))),
                  0 === f.avail_in && 0 === f.avail_out && (p = !0);
          } while ((f.avail_in > 0 || 0 === f.avail_out) && r !== s.Z_STREAM_END);
          return r === s.Z_STREAM_END && (o = s.Z_FINISH), o === s.Z_FINISH ? ((r = i.inflateEnd(this.strm)), this.onEnd(r), (this.ended = !0), r === s.Z_OK) : o !== s.Z_SYNC_FLUSH || (this.onEnd(s.Z_OK), (f.avail_out = 0), !0);
      }),
          (c.prototype.onData = function (t) {
              this.chunks.push(t);
          }),
          (c.prototype.onEnd = function (t) {
              t === s.Z_OK && ("string" === this.options.to ? (this.result = this.chunks.join("")) : (this.result = n.flattenChunks(this.chunks))), (this.chunks = []), (this.err = t), (this.msg = this.strm.msg);
          }),
          (e.Inflate = c),
          (e.inflate = f),
          (e.inflateRaw = function (t, e) {
              return ((e = e || {}).raw = !0), f(t, e);
          }),
          (e.ungzip = f);
  },
  function (t, e, r) {
      "use strict";
      var i = r(1),
          n = r(3),
          a = r(4),
          s = r(18),
          o = r(19),
          h = 0,
          u = 1,
          l = 2,
          c = 4,
          f = 5,
          d = 6,
          b = 0,
          p = 1,
          m = 2,
          _ = -2,
          g = -3,
          v = -4,
          x = -5,
          y = 8,
          T = 1,
          w = 2,
          E = 3,
          A = 4,
          M = 5,
          F = 6,
          R = 7,
          S = 8,
          C = 9,
          P = 10,
          I = 11,
          U = 12,
          k = 13,
          D = 14,
          O = 15,
          B = 16,
          N = 17,
          L = 18,
          z = 19,
          j = 20,
          H = 21,
          G = 22,
          V = 23,
          q = 24,
          X = 25,
          Y = 26,
          Z = 27,
          W = 28,
          K = 29,
          J = 30,
          Q = 31,
          $ = 32,
          tt = 852,
          et = 592,
          rt = 15;
      function it(t) {
          return ((t >>> 24) & 255) + ((t >>> 8) & 65280) + ((65280 & t) << 8) + ((255 & t) << 24);
      }
      function nt() {
          (this.mode = 0),
              (this.last = !1),
              (this.wrap = 0),
              (this.havedict = !1),
              (this.flags = 0),
              (this.dmax = 0),
              (this.check = 0),
              (this.total = 0),
              (this.head = null),
              (this.wbits = 0),
              (this.wsize = 0),
              (this.whave = 0),
              (this.wnext = 0),
              (this.window = null),
              (this.hold = 0),
              (this.bits = 0),
              (this.length = 0),
              (this.offset = 0),
              (this.extra = 0),
              (this.lencode = null),
              (this.distcode = null),
              (this.lenbits = 0),
              (this.distbits = 0),
              (this.ncode = 0),
              (this.nlen = 0),
              (this.ndist = 0),
              (this.have = 0),
              (this.next = null),
              (this.lens = new i.Buf16(320)),
              (this.work = new i.Buf16(288)),
              (this.lendyn = null),
              (this.distdyn = null),
              (this.sane = 0),
              (this.back = 0),
              (this.was = 0);
      }
      function at(t) {
          var e;
          return t && t.state
              ? ((e = t.state),
                (t.total_in = t.total_out = e.total = 0),
                (t.msg = ""),
                e.wrap && (t.adler = 1 & e.wrap),
                (e.mode = T),
                (e.last = 0),
                (e.havedict = 0),
                (e.dmax = 32768),
                (e.head = null),
                (e.hold = 0),
                (e.bits = 0),
                (e.lencode = e.lendyn = new i.Buf32(tt)),
                (e.distcode = e.distdyn = new i.Buf32(et)),
                (e.sane = 1),
                (e.back = -1),
                b)
              : _;
      }
      function st(t) {
          var e;
          return t && t.state ? (((e = t.state).wsize = 0), (e.whave = 0), (e.wnext = 0), at(t)) : _;
      }
      function ot(t, e) {
          var r, i;
          return t && t.state
              ? ((i = t.state), e < 0 ? ((r = 0), (e = -e)) : ((r = 1 + (e >> 4)), e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? _ : (null !== i.window && i.wbits !== e && (i.window = null), (i.wrap = r), (i.wbits = e), st(t)))
              : _;
      }
      function ht(t, e) {
          var r, i;
          return t ? ((i = new nt()), (t.state = i), (i.window = null), (r = ot(t, e)) !== b && (t.state = null), r) : _;
      }
      var ut,
          lt,
          ct = !0;
      function ft(t) {
          if (ct) {
              var e;
              for (ut = new i.Buf32(512), lt = new i.Buf32(32), e = 0; e < 144; ) t.lens[e++] = 8;
              for (; e < 256; ) t.lens[e++] = 9;
              for (; e < 280; ) t.lens[e++] = 7;
              for (; e < 288; ) t.lens[e++] = 8;
              for (o(u, t.lens, 0, 288, ut, 0, t.work, { bits: 9 }), e = 0; e < 32; ) t.lens[e++] = 5;
              o(l, t.lens, 0, 32, lt, 0, t.work, { bits: 5 }), (ct = !1);
          }
          (t.lencode = ut), (t.lenbits = 9), (t.distcode = lt), (t.distbits = 5);
      }
      function dt(t, e, r, n) {
          var a,
              s = t.state;
          return (
              null === s.window && ((s.wsize = 1 << s.wbits), (s.wnext = 0), (s.whave = 0), (s.window = new i.Buf8(s.wsize))),
              n >= s.wsize
                  ? (i.arraySet(s.window, e, r - s.wsize, s.wsize, 0), (s.wnext = 0), (s.whave = s.wsize))
                  : ((a = s.wsize - s.wnext) > n && (a = n),
                    i.arraySet(s.window, e, r - n, a, s.wnext),
                    (n -= a) ? (i.arraySet(s.window, e, r - n, n, 0), (s.wnext = n), (s.whave = s.wsize)) : ((s.wnext += a), s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += a))),
              0
          );
      }
      (e.inflateReset = st),
          (e.inflateReset2 = ot),
          (e.inflateResetKeep = at),
          (e.inflateInit = function (t) {
              return ht(t, rt);
          }),
          (e.inflateInit2 = ht),
          (e.inflate = function (t, e) {
              var r,
                  tt,
                  et,
                  rt,
                  nt,
                  at,
                  st,
                  ot,
                  ht,
                  ut,
                  lt,
                  ct,
                  bt,
                  pt,
                  mt,
                  _t,
                  gt,
                  vt,
                  xt,
                  yt,
                  Tt,
                  wt,
                  Et,
                  At,
                  Mt = 0,
                  Ft = new i.Buf8(4),
                  Rt = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
              if (!t || !t.state || !t.output || (!t.input && 0 !== t.avail_in)) return _;
              (r = t.state).mode === U && (r.mode = k), (nt = t.next_out), (et = t.output), (st = t.avail_out), (rt = t.next_in), (tt = t.input), (at = t.avail_in), (ot = r.hold), (ht = r.bits), (ut = at), (lt = st), (wt = b);
              t: for (;;)
                  switch (r.mode) {
                      case T:
                          if (0 === r.wrap) {
                              r.mode = k;
                              break;
                          }
                          for (; ht < 16; ) {
                              if (0 === at) break t;
                              at--, (ot += tt[rt++] << ht), (ht += 8);
                          }
                          if (2 & r.wrap && 35615 === ot) {
                              (r.check = 0), (Ft[0] = 255 & ot), (Ft[1] = (ot >>> 8) & 255), (r.check = a(r.check, Ft, 2, 0)), (ot = 0), (ht = 0), (r.mode = w);
                              break;
                          }
                          if (((r.flags = 0), r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & ot) << 8) + (ot >> 8)) % 31)) {
                              (t.msg = "incorrect header check"), (r.mode = J);
                              break;
                          }
                          if ((15 & ot) !== y) {
                              (t.msg = "unknown compression method"), (r.mode = J);
                              break;
                          }
                          if (((ht -= 4), (Tt = 8 + (15 & (ot >>>= 4))), 0 === r.wbits)) r.wbits = Tt;
                          else if (Tt > r.wbits) {
                              (t.msg = "invalid window size"), (r.mode = J);
                              break;
                          }
                          (r.dmax = 1 << Tt), (t.adler = r.check = 1), (r.mode = 512 & ot ? P : U), (ot = 0), (ht = 0);
                          break;
                      case w:
                          for (; ht < 16; ) {
                              if (0 === at) break t;
                              at--, (ot += tt[rt++] << ht), (ht += 8);
                          }
                          if (((r.flags = ot), (255 & r.flags) !== y)) {
                              (t.msg = "unknown compression method"), (r.mode = J);
                              break;
                          }
                          if (57344 & r.flags) {
                              (t.msg = "unknown header flags set"), (r.mode = J);
                              break;
                          }
                          r.head && (r.head.text = (ot >> 8) & 1), 512 & r.flags && ((Ft[0] = 255 & ot), (Ft[1] = (ot >>> 8) & 255), (r.check = a(r.check, Ft, 2, 0))), (ot = 0), (ht = 0), (r.mode = E);
                      case E:
                          for (; ht < 32; ) {
                              if (0 === at) break t;
                              at--, (ot += tt[rt++] << ht), (ht += 8);
                          }
                          r.head && (r.head.time = ot),
                              512 & r.flags && ((Ft[0] = 255 & ot), (Ft[1] = (ot >>> 8) & 255), (Ft[2] = (ot >>> 16) & 255), (Ft[3] = (ot >>> 24) & 255), (r.check = a(r.check, Ft, 4, 0))),
                              (ot = 0),
                              (ht = 0),
                              (r.mode = A);
                      case A:
                          for (; ht < 16; ) {
                              if (0 === at) break t;
                              at--, (ot += tt[rt++] << ht), (ht += 8);
                          }
                          r.head && ((r.head.xflags = 255 & ot), (r.head.os = ot >> 8)), 512 & r.flags && ((Ft[0] = 255 & ot), (Ft[1] = (ot >>> 8) & 255), (r.check = a(r.check, Ft, 2, 0))), (ot = 0), (ht = 0), (r.mode = M);
                      case M:
                          if (1024 & r.flags) {
                              for (; ht < 16; ) {
                                  if (0 === at) break t;
                                  at--, (ot += tt[rt++] << ht), (ht += 8);
                              }
                              (r.length = ot), r.head && (r.head.extra_len = ot), 512 & r.flags && ((Ft[0] = 255 & ot), (Ft[1] = (ot >>> 8) & 255), (r.check = a(r.check, Ft, 2, 0))), (ot = 0), (ht = 0);
                          } else r.head && (r.head.extra = null);
                          r.mode = F;
                      case F:
                          if (
                              1024 & r.flags &&
                              ((ct = r.length) > at && (ct = at),
                              ct &&
                                  (r.head && ((Tt = r.head.extra_len - r.length), r.head.extra || (r.head.extra = new Array(r.head.extra_len)), i.arraySet(r.head.extra, tt, rt, ct, Tt)),
                                  512 & r.flags && (r.check = a(r.check, tt, ct, rt)),
                                  (at -= ct),
                                  (rt += ct),
                                  (r.length -= ct)),
                              r.length)
                          )
                              break t;
                          (r.length = 0), (r.mode = R);
                      case R:
                          if (2048 & r.flags) {
                              if (0 === at) break t;
                              ct = 0;
                              do {
                                  (Tt = tt[rt + ct++]), r.head && Tt && r.length < 65536 && (r.head.name += String.fromCharCode(Tt));
                              } while (Tt && ct < at);
                              if ((512 & r.flags && (r.check = a(r.check, tt, ct, rt)), (at -= ct), (rt += ct), Tt)) break t;
                          } else r.head && (r.head.name = null);
                          (r.length = 0), (r.mode = S);
                      case S:
                          if (4096 & r.flags) {
                              if (0 === at) break t;
                              ct = 0;
                              do {
                                  (Tt = tt[rt + ct++]), r.head && Tt && r.length < 65536 && (r.head.comment += String.fromCharCode(Tt));
                              } while (Tt && ct < at);
                              if ((512 & r.flags && (r.check = a(r.check, tt, ct, rt)), (at -= ct), (rt += ct), Tt)) break t;
                          } else r.head && (r.head.comment = null);
                          r.mode = C;
                      case C:
                          if (512 & r.flags) {
                              for (; ht < 16; ) {
                                  if (0 === at) break t;
                                  at--, (ot += tt[rt++] << ht), (ht += 8);
                              }
                              if (ot !== (65535 & r.check)) {
                                  (t.msg = "header crc mismatch"), (r.mode = J);
                                  break;
                              }
                              (ot = 0), (ht = 0);
                          }
                          r.head && ((r.head.hcrc = (r.flags >> 9) & 1), (r.head.done = !0)), (t.adler = r.check = 0), (r.mode = U);
                          break;
                      case P:
                          for (; ht < 32; ) {
                              if (0 === at) break t;
                              at--, (ot += tt[rt++] << ht), (ht += 8);
                          }
                          (t.adler = r.check = it(ot)), (ot = 0), (ht = 0), (r.mode = I);
                      case I:
                          if (0 === r.havedict) return (t.next_out = nt), (t.avail_out = st), (t.next_in = rt), (t.avail_in = at), (r.hold = ot), (r.bits = ht), m;
                          (t.adler = r.check = 1), (r.mode = U);
                      case U:
                          if (e === f || e === d) break t;
                      case k:
                          if (r.last) {
                              (ot >>>= 7 & ht), (ht -= 7 & ht), (r.mode = Z);
                              break;
                          }
                          for (; ht < 3; ) {
                              if (0 === at) break t;
                              at--, (ot += tt[rt++] << ht), (ht += 8);
                          }
                          switch (((r.last = 1 & ot), (ht -= 1), 3 & (ot >>>= 1))) {
                              case 0:
                                  r.mode = D;
                                  break;
                              case 1:
                                  if ((ft(r), (r.mode = j), e === d)) {
                                      (ot >>>= 2), (ht -= 2);
                                      break t;
                                  }
                                  break;
                              case 2:
                                  r.mode = N;
                                  break;
                              case 3:
                                  (t.msg = "invalid block type"), (r.mode = J);
                          }
                          (ot >>>= 2), (ht -= 2);
                          break;
                      case D:
                          for (ot >>>= 7 & ht, ht -= 7 & ht; ht < 32; ) {
                              if (0 === at) break t;
                              at--, (ot += tt[rt++] << ht), (ht += 8);
                          }
                          if ((65535 & ot) != ((ot >>> 16) ^ 65535)) {
                              (t.msg = "invalid stored block lengths"), (r.mode = J);
                              break;
                          }
                          if (((r.length = 65535 & ot), (ot = 0), (ht = 0), (r.mode = O), e === d)) break t;
                      case O:
                          r.mode = B;
                      case B:
                          if ((ct = r.length)) {
                              if ((ct > at && (ct = at), ct > st && (ct = st), 0 === ct)) break t;
                              i.arraySet(et, tt, rt, ct, nt), (at -= ct), (rt += ct), (st -= ct), (nt += ct), (r.length -= ct);
                              break;
                          }
                          r.mode = U;
                          break;
                      case N:
                          for (; ht < 14; ) {
                              if (0 === at) break t;
                              at--, (ot += tt[rt++] << ht), (ht += 8);
                          }
                          if (((r.nlen = 257 + (31 & ot)), (ot >>>= 5), (ht -= 5), (r.ndist = 1 + (31 & ot)), (ot >>>= 5), (ht -= 5), (r.ncode = 4 + (15 & ot)), (ot >>>= 4), (ht -= 4), r.nlen > 286 || r.ndist > 30)) {
                              (t.msg = "too many length or distance symbols"), (r.mode = J);
                              break;
                          }
                          (r.have = 0), (r.mode = L);
                      case L:
                          for (; r.have < r.ncode; ) {
                              for (; ht < 3; ) {
                                  if (0 === at) break t;
                                  at--, (ot += tt[rt++] << ht), (ht += 8);
                              }
                              (r.lens[Rt[r.have++]] = 7 & ot), (ot >>>= 3), (ht -= 3);
                          }
                          for (; r.have < 19; ) r.lens[Rt[r.have++]] = 0;
                          if (((r.lencode = r.lendyn), (r.lenbits = 7), (Et = { bits: r.lenbits }), (wt = o(h, r.lens, 0, 19, r.lencode, 0, r.work, Et)), (r.lenbits = Et.bits), wt)) {
                              (t.msg = "invalid code lengths set"), (r.mode = J);
                              break;
                          }
                          (r.have = 0), (r.mode = z);
                      case z:
                          for (; r.have < r.nlen + r.ndist; ) {
                              for (; (_t = ((Mt = r.lencode[ot & ((1 << r.lenbits) - 1)]) >>> 16) & 255), (gt = 65535 & Mt), !((mt = Mt >>> 24) <= ht); ) {
                                  if (0 === at) break t;
                                  at--, (ot += tt[rt++] << ht), (ht += 8);
                              }
                              if (gt < 16) (ot >>>= mt), (ht -= mt), (r.lens[r.have++] = gt);
                              else {
                                  if (16 === gt) {
                                      for (At = mt + 2; ht < At; ) {
                                          if (0 === at) break t;
                                          at--, (ot += tt[rt++] << ht), (ht += 8);
                                      }
                                      if (((ot >>>= mt), (ht -= mt), 0 === r.have)) {
                                          (t.msg = "invalid bit length repeat"), (r.mode = J);
                                          break;
                                      }
                                      (Tt = r.lens[r.have - 1]), (ct = 3 + (3 & ot)), (ot >>>= 2), (ht -= 2);
                                  } else if (17 === gt) {
                                      for (At = mt + 3; ht < At; ) {
                                          if (0 === at) break t;
                                          at--, (ot += tt[rt++] << ht), (ht += 8);
                                      }
                                      (ht -= mt), (Tt = 0), (ct = 3 + (7 & (ot >>>= mt))), (ot >>>= 3), (ht -= 3);
                                  } else {
                                      for (At = mt + 7; ht < At; ) {
                                          if (0 === at) break t;
                                          at--, (ot += tt[rt++] << ht), (ht += 8);
                                      }
                                      (ht -= mt), (Tt = 0), (ct = 11 + (127 & (ot >>>= mt))), (ot >>>= 7), (ht -= 7);
                                  }
                                  if (r.have + ct > r.nlen + r.ndist) {
                                      (t.msg = "invalid bit length repeat"), (r.mode = J);
                                      break;
                                  }
                                  for (; ct--; ) r.lens[r.have++] = Tt;
                              }
                          }
                          if (r.mode === J) break;
                          if (0 === r.lens[256]) {
                              (t.msg = "invalid code -- missing end-of-block"), (r.mode = J);
                              break;
                          }
                          if (((r.lenbits = 9), (Et = { bits: r.lenbits }), (wt = o(u, r.lens, 0, r.nlen, r.lencode, 0, r.work, Et)), (r.lenbits = Et.bits), wt)) {
                              (t.msg = "invalid literal/lengths set"), (r.mode = J);
                              break;
                          }
                          if (((r.distbits = 6), (r.distcode = r.distdyn), (Et = { bits: r.distbits }), (wt = o(l, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, Et)), (r.distbits = Et.bits), wt)) {
                              (t.msg = "invalid distances set"), (r.mode = J);
                              break;
                          }
                          if (((r.mode = j), e === d)) break t;
                      case j:
                          r.mode = H;
                      case H:
                          if (at >= 6 && st >= 258) {
                              (t.next_out = nt),
                                  (t.avail_out = st),
                                  (t.next_in = rt),
                                  (t.avail_in = at),
                                  (r.hold = ot),
                                  (r.bits = ht),
                                  s(t, lt),
                                  (nt = t.next_out),
                                  (et = t.output),
                                  (st = t.avail_out),
                                  (rt = t.next_in),
                                  (tt = t.input),
                                  (at = t.avail_in),
                                  (ot = r.hold),
                                  (ht = r.bits),
                                  r.mode === U && (r.back = -1);
                              break;
                          }
                          for (r.back = 0; (_t = ((Mt = r.lencode[ot & ((1 << r.lenbits) - 1)]) >>> 16) & 255), (gt = 65535 & Mt), !((mt = Mt >>> 24) <= ht); ) {
                              if (0 === at) break t;
                              at--, (ot += tt[rt++] << ht), (ht += 8);
                          }
                          if (_t && 0 == (240 & _t)) {
                              for (vt = mt, xt = _t, yt = gt; (_t = ((Mt = r.lencode[yt + ((ot & ((1 << (vt + xt)) - 1)) >> vt)]) >>> 16) & 255), (gt = 65535 & Mt), !(vt + (mt = Mt >>> 24) <= ht); ) {
                                  if (0 === at) break t;
                                  at--, (ot += tt[rt++] << ht), (ht += 8);
                              }
                              (ot >>>= vt), (ht -= vt), (r.back += vt);
                          }
                          if (((ot >>>= mt), (ht -= mt), (r.back += mt), (r.length = gt), 0 === _t)) {
                              r.mode = Y;
                              break;
                          }
                          if (32 & _t) {
                              (r.back = -1), (r.mode = U);
                              break;
                          }
                          if (64 & _t) {
                              (t.msg = "invalid literal/length code"), (r.mode = J);
                              break;
                          }
                          (r.extra = 15 & _t), (r.mode = G);
                      case G:
                          if (r.extra) {
                              for (At = r.extra; ht < At; ) {
                                  if (0 === at) break t;
                                  at--, (ot += tt[rt++] << ht), (ht += 8);
                              }
                              (r.length += ot & ((1 << r.extra) - 1)), (ot >>>= r.extra), (ht -= r.extra), (r.back += r.extra);
                          }
                          (r.was = r.length), (r.mode = V);
                      case V:
                          for (; (_t = ((Mt = r.distcode[ot & ((1 << r.distbits) - 1)]) >>> 16) & 255), (gt = 65535 & Mt), !((mt = Mt >>> 24) <= ht); ) {
                              if (0 === at) break t;
                              at--, (ot += tt[rt++] << ht), (ht += 8);
                          }
                          if (0 == (240 & _t)) {
                              for (vt = mt, xt = _t, yt = gt; (_t = ((Mt = r.distcode[yt + ((ot & ((1 << (vt + xt)) - 1)) >> vt)]) >>> 16) & 255), (gt = 65535 & Mt), !(vt + (mt = Mt >>> 24) <= ht); ) {
                                  if (0 === at) break t;
                                  at--, (ot += tt[rt++] << ht), (ht += 8);
                              }
                              (ot >>>= vt), (ht -= vt), (r.back += vt);
                          }
                          if (((ot >>>= mt), (ht -= mt), (r.back += mt), 64 & _t)) {
                              (t.msg = "invalid distance code"), (r.mode = J);
                              break;
                          }
                          (r.offset = gt), (r.extra = 15 & _t), (r.mode = q);
                      case q:
                          if (r.extra) {
                              for (At = r.extra; ht < At; ) {
                                  if (0 === at) break t;
                                  at--, (ot += tt[rt++] << ht), (ht += 8);
                              }
                              (r.offset += ot & ((1 << r.extra) - 1)), (ot >>>= r.extra), (ht -= r.extra), (r.back += r.extra);
                          }
                          if (r.offset > r.dmax) {
                              (t.msg = "invalid distance too far back"), (r.mode = J);
                              break;
                          }
                          r.mode = X;
                      case X:
                          if (0 === st) break t;
                          if (((ct = lt - st), r.offset > ct)) {
                              if ((ct = r.offset - ct) > r.whave && r.sane) {
                                  (t.msg = "invalid distance too far back"), (r.mode = J);
                                  break;
                              }
                              ct > r.wnext ? ((ct -= r.wnext), (bt = r.wsize - ct)) : (bt = r.wnext - ct), ct > r.length && (ct = r.length), (pt = r.window);
                          } else (pt = et), (bt = nt - r.offset), (ct = r.length);
                          ct > st && (ct = st), (st -= ct), (r.length -= ct);
                          do {
                              et[nt++] = pt[bt++];
                          } while (--ct);
                          0 === r.length && (r.mode = H);
                          break;
                      case Y:
                          if (0 === st) break t;
                          (et[nt++] = r.length), st--, (r.mode = H);
                          break;
                      case Z:
                          if (r.wrap) {
                              for (; ht < 32; ) {
                                  if (0 === at) break t;
                                  at--, (ot |= tt[rt++] << ht), (ht += 8);
                              }
                              if (((lt -= st), (t.total_out += lt), (r.total += lt), lt && (t.adler = r.check = r.flags ? a(r.check, et, lt, nt - lt) : n(r.check, et, lt, nt - lt)), (lt = st), (r.flags ? ot : it(ot)) !== r.check)) {
                                  (t.msg = "incorrect data check"), (r.mode = J);
                                  break;
                              }
                              (ot = 0), (ht = 0);
                          }
                          r.mode = W;
                      case W:
                          if (r.wrap && r.flags) {
                              for (; ht < 32; ) {
                                  if (0 === at) break t;
                                  at--, (ot += tt[rt++] << ht), (ht += 8);
                              }
                              if (ot !== (4294967295 & r.total)) {
                                  (t.msg = "incorrect length check"), (r.mode = J);
                                  break;
                              }
                              (ot = 0), (ht = 0);
                          }
                          r.mode = K;
                      case K:
                          wt = p;
                          break t;
                      case J:
                          wt = g;
                          break t;
                      case Q:
                          return v;
                      case $:
                      default:
                          return _;
                  }
              return (
                  (t.next_out = nt),
                  (t.avail_out = st),
                  (t.next_in = rt),
                  (t.avail_in = at),
                  (r.hold = ot),
                  (r.bits = ht),
                  (r.wsize || (lt !== t.avail_out && r.mode < J && (r.mode < Z || e !== c))) && dt(t, t.output, t.next_out, lt - t.avail_out)
                      ? ((r.mode = Q), v)
                      : ((ut -= t.avail_in),
                        (lt -= t.avail_out),
                        (t.total_in += ut),
                        (t.total_out += lt),
                        (r.total += lt),
                        r.wrap && lt && (t.adler = r.check = r.flags ? a(r.check, et, lt, t.next_out - lt) : n(r.check, et, lt, t.next_out - lt)),
                        (t.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === U ? 128 : 0) + (r.mode === j || r.mode === O ? 256 : 0)),
                        ((0 === ut && 0 === lt) || e === c) && wt === b && (wt = x),
                        wt)
              );
          }),
          (e.inflateEnd = function (t) {
              if (!t || !t.state) return _;
              var e = t.state;
              return e.window && (e.window = null), (t.state = null), b;
          }),
          (e.inflateGetHeader = function (t, e) {
              var r;
              return t && t.state ? (0 == (2 & (r = t.state).wrap) ? _ : ((r.head = e), (e.done = !1), b)) : _;
          }),
          (e.inflateSetDictionary = function (t, e) {
              var r,
                  i = e.length;
              return t && t.state ? (0 !== (r = t.state).wrap && r.mode !== I ? _ : r.mode === I && n(1, e, i, 0) !== r.check ? g : dt(t, e, i, i) ? ((r.mode = Q), v) : ((r.havedict = 1), b)) : _;
          }),
          (e.inflateInfo = "pako inflate (from Nodeca project)");
  },
  function (t, e, r) {
      "use strict";
      t.exports = function (t, e) {
          var r, i, n, a, s, o, h, u, l, c, f, d, b, p, m, _, g, v, x, y, T, w, E, A, M;
          (r = t.state),
              (i = t.next_in),
              (A = t.input),
              (n = i + (t.avail_in - 5)),
              (a = t.next_out),
              (M = t.output),
              (s = a - (e - t.avail_out)),
              (o = a + (t.avail_out - 257)),
              (h = r.dmax),
              (u = r.wsize),
              (l = r.whave),
              (c = r.wnext),
              (f = r.window),
              (d = r.hold),
              (b = r.bits),
              (p = r.lencode),
              (m = r.distcode),
              (_ = (1 << r.lenbits) - 1),
              (g = (1 << r.distbits) - 1);
          t: do {
              b < 15 && ((d += A[i++] << b), (b += 8), (d += A[i++] << b), (b += 8)), (v = p[d & _]);
              e: for (;;) {
                  if (((d >>>= x = v >>> 24), (b -= x), 0 === (x = (v >>> 16) & 255))) M[a++] = 65535 & v;
                  else {
                      if (!(16 & x)) {
                          if (0 == (64 & x)) {
                              v = p[(65535 & v) + (d & ((1 << x) - 1))];
                              continue e;
                          }
                          if (32 & x) {
                              r.mode = 12;
                              break t;
                          }
                          (t.msg = "invalid literal/length code"), (r.mode = 30);
                          break t;
                      }
                      (y = 65535 & v), (x &= 15) && (b < x && ((d += A[i++] << b), (b += 8)), (y += d & ((1 << x) - 1)), (d >>>= x), (b -= x)), b < 15 && ((d += A[i++] << b), (b += 8), (d += A[i++] << b), (b += 8)), (v = m[d & g]);
                      r: for (;;) {
                          if (((d >>>= x = v >>> 24), (b -= x), !(16 & (x = (v >>> 16) & 255)))) {
                              if (0 == (64 & x)) {
                                  v = m[(65535 & v) + (d & ((1 << x) - 1))];
                                  continue r;
                              }
                              (t.msg = "invalid distance code"), (r.mode = 30);
                              break t;
                          }
                          if (((T = 65535 & v), b < (x &= 15) && ((d += A[i++] << b), (b += 8) < x && ((d += A[i++] << b), (b += 8))), (T += d & ((1 << x) - 1)) > h)) {
                              (t.msg = "invalid distance too far back"), (r.mode = 30);
                              break t;
                          }
                          if (((d >>>= x), (b -= x), T > (x = a - s))) {
                              if ((x = T - x) > l && r.sane) {
                                  (t.msg = "invalid distance too far back"), (r.mode = 30);
                                  break t;
                              }
                              if (((w = 0), (E = f), 0 === c)) {
                                  if (((w += u - x), x < y)) {
                                      y -= x;
                                      do {
                                          M[a++] = f[w++];
                                      } while (--x);
                                      (w = a - T), (E = M);
                                  }
                              } else if (c < x) {
                                  if (((w += u + c - x), (x -= c) < y)) {
                                      y -= x;
                                      do {
                                          M[a++] = f[w++];
                                      } while (--x);
                                      if (((w = 0), c < y)) {
                                          y -= x = c;
                                          do {
                                              M[a++] = f[w++];
                                          } while (--x);
                                          (w = a - T), (E = M);
                                      }
                                  }
                              } else if (((w += c - x), x < y)) {
                                  y -= x;
                                  do {
                                      M[a++] = f[w++];
                                  } while (--x);
                                  (w = a - T), (E = M);
                              }
                              for (; y > 2; ) (M[a++] = E[w++]), (M[a++] = E[w++]), (M[a++] = E[w++]), (y -= 3);
                              y && ((M[a++] = E[w++]), y > 1 && (M[a++] = E[w++]));
                          } else {
                              w = a - T;
                              do {
                                  (M[a++] = M[w++]), (M[a++] = M[w++]), (M[a++] = M[w++]), (y -= 3);
                              } while (y > 2);
                              y && ((M[a++] = M[w++]), y > 1 && (M[a++] = M[w++]));
                          }
                          break;
                      }
                  }
                  break;
              }
          } while (i < n && a < o);
          (i -= y = b >> 3), (d &= (1 << (b -= y << 3)) - 1), (t.next_in = i), (t.next_out = a), (t.avail_in = i < n ? n - i + 5 : 5 - (i - n)), (t.avail_out = a < o ? o - a + 257 : 257 - (a - o)), (r.hold = d), (r.bits = b);
      };
  },
  function (t, e, r) {
      "use strict";
      var i = r(1),
          n = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
          a = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
          s = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
          o = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      t.exports = function (t, e, r, h, u, l, c, f) {
          var d,
              b,
              p,
              m,
              _,
              g,
              v,
              x,
              y,
              T = f.bits,
              w = 0,
              E = 0,
              A = 0,
              M = 0,
              F = 0,
              R = 0,
              S = 0,
              C = 0,
              P = 0,
              I = 0,
              U = null,
              k = 0,
              D = new i.Buf16(16),
              O = new i.Buf16(16),
              B = null,
              N = 0;
          for (w = 0; w <= 15; w++) D[w] = 0;
          for (E = 0; E < h; E++) D[e[r + E]]++;
          for (F = T, M = 15; M >= 1 && 0 === D[M]; M--);
          if ((F > M && (F = M), 0 === M)) return (u[l++] = 20971520), (u[l++] = 20971520), (f.bits = 1), 0;
          for (A = 1; A < M && 0 === D[A]; A++);
          for (F < A && (F = A), C = 1, w = 1; w <= 15; w++) if (((C <<= 1), (C -= D[w]) < 0)) return -1;
          if (C > 0 && (0 === t || 1 !== M)) return -1;
          for (O[1] = 0, w = 1; w < 15; w++) O[w + 1] = O[w] + D[w];
          for (E = 0; E < h; E++) 0 !== e[r + E] && (c[O[e[r + E]]++] = E);
          if (
              (0 === t ? ((U = B = c), (g = 19)) : 1 === t ? ((U = n), (k -= 257), (B = a), (N -= 257), (g = 256)) : ((U = s), (B = o), (g = -1)),
              (I = 0),
              (E = 0),
              (w = A),
              (_ = l),
              (R = F),
              (S = 0),
              (p = -1),
              (m = (P = 1 << F) - 1),
              (1 === t && P > 852) || (2 === t && P > 592))
          )
              return 1;
          for (;;) {
              (v = w - S), c[E] < g ? ((x = 0), (y = c[E])) : c[E] > g ? ((x = B[N + c[E]]), (y = U[k + c[E]])) : ((x = 96), (y = 0)), (d = 1 << (w - S)), (A = b = 1 << R);
              do {
                  u[_ + (I >> S) + (b -= d)] = (v << 24) | (x << 16) | y | 0;
              } while (0 !== b);
              for (d = 1 << (w - 1); I & d; ) d >>= 1;
              if ((0 !== d ? ((I &= d - 1), (I += d)) : (I = 0), E++, 0 == --D[w])) {
                  if (w === M) break;
                  w = e[r + c[E]];
              }
              if (w > F && (I & m) !== p) {
                  for (0 === S && (S = F), _ += A, C = 1 << (R = w - S); R + S < M && !((C -= D[R + S]) <= 0); ) R++, (C <<= 1);
                  if (((P += 1 << R), (1 === t && P > 852) || (2 === t && P > 592))) return 1;
                  u[(p = I & m)] = (F << 24) | (R << 16) | (_ - l) | 0;
              }
          }
          return 0 !== I && (u[_ + I] = ((w - S) << 24) | (64 << 16) | 0), (f.bits = F), 0;
      };
  },
  function (t, e, r) {
      "use strict";
      t.exports = function () {
          (this.text = 0), (this.time = 0), (this.xflags = 0), (this.os = 0), (this.extra = null), (this.extra_len = 0), (this.name = ""), (this.comment = ""), (this.hcrc = 0), (this.done = !1);
      };
  },
  function (t, e, r) {
      "use strict";
      r.r(e);
      var i = {};
      r.r(i),
          r.d(i, "create", function () {
              return v;
          }),
          r.d(i, "fromMat4", function () {
              return x;
          }),
          r.d(i, "clone", function () {
              return y;
          }),
          r.d(i, "copy", function () {
              return T;
          }),
          r.d(i, "fromValues", function () {
              return w;
          }),
          r.d(i, "set", function () {
              return E;
          }),
          r.d(i, "identity", function () {
              return A;
          }),
          r.d(i, "transpose", function () {
              return M;
          }),
          r.d(i, "invert", function () {
              return F;
          }),
          r.d(i, "adjoint", function () {
              return R;
          }),
          r.d(i, "determinant", function () {
              return S;
          }),
          r.d(i, "multiply", function () {
              return C;
          }),
          r.d(i, "translate", function () {
              return P;
          }),
          r.d(i, "rotate", function () {
              return I;
          }),
          r.d(i, "scale", function () {
              return U;
          }),
          r.d(i, "fromTranslation", function () {
              return k;
          }),
          r.d(i, "fromRotation", function () {
              return D;
          }),
          r.d(i, "fromScaling", function () {
              return O;
          }),
          r.d(i, "fromMat2d", function () {
              return B;
          }),
          r.d(i, "fromQuat", function () {
              return N;
          }),
          r.d(i, "normalFromMat4", function () {
              return L;
          }),
          r.d(i, "projection", function () {
              return z;
          }),
          r.d(i, "str", function () {
              return j;
          }),
          r.d(i, "frob", function () {
              return H;
          }),
          r.d(i, "add", function () {
              return G;
          }),
          r.d(i, "subtract", function () {
              return V;
          }),
          r.d(i, "multiplyScalar", function () {
              return q;
          }),
          r.d(i, "multiplyScalarAndAdd", function () {
              return X;
          }),
          r.d(i, "exactEquals", function () {
              return Y;
          }),
          r.d(i, "equals", function () {
              return Z;
          }),
          r.d(i, "mul", function () {
              return W;
          }),
          r.d(i, "sub", function () {
              return K;
          });
      var n = {};
      r.r(n),
          r.d(n, "create", function () {
              return J;
          }),
          r.d(n, "clone", function () {
              return Q;
          }),
          r.d(n, "copy", function () {
              return tt;
          }),
          r.d(n, "fromValues", function () {
              return et;
          }),
          r.d(n, "set", function () {
              return rt;
          }),
          r.d(n, "identity", function () {
              return it;
          }),
          r.d(n, "transpose", function () {
              return nt;
          }),
          r.d(n, "invert", function () {
              return at;
          }),
          r.d(n, "adjoint", function () {
              return st;
          }),
          r.d(n, "determinant", function () {
              return ot;
          }),
          r.d(n, "multiply", function () {
              return ht;
          }),
          r.d(n, "translate", function () {
              return ut;
          }),
          r.d(n, "scale", function () {
              return lt;
          }),
          r.d(n, "rotate", function () {
              return ct;
          }),
          r.d(n, "rotateX", function () {
              return ft;
          }),
          r.d(n, "rotateY", function () {
              return dt;
          }),
          r.d(n, "rotateZ", function () {
              return bt;
          }),
          r.d(n, "fromTranslation", function () {
              return pt;
          }),
          r.d(n, "fromScaling", function () {
              return mt;
          }),
          r.d(n, "fromRotation", function () {
              return _t;
          }),
          r.d(n, "fromXRotation", function () {
              return gt;
          }),
          r.d(n, "fromYRotation", function () {
              return vt;
          }),
          r.d(n, "fromZRotation", function () {
              return xt;
          }),
          r.d(n, "fromRotationTranslation", function () {
              return yt;
          }),
          r.d(n, "fromQuat2", function () {
              return Tt;
          }),
          r.d(n, "getTranslation", function () {
              return wt;
          }),
          r.d(n, "getScaling", function () {
              return Et;
          }),
          r.d(n, "getRotation", function () {
              return At;
          }),
          r.d(n, "fromRotationTranslationScale", function () {
              return Mt;
          }),
          r.d(n, "fromRotationTranslationScaleOrigin", function () {
              return Ft;
          }),
          r.d(n, "fromQuat", function () {
              return Rt;
          }),
          r.d(n, "frustum", function () {
              return St;
          }),
          r.d(n, "perspective", function () {
              return Ct;
          }),
          r.d(n, "perspectiveFromFieldOfView", function () {
              return Pt;
          }),
          r.d(n, "ortho", function () {
              return It;
          }),
          r.d(n, "lookAt", function () {
              return Ut;
          }),
          r.d(n, "targetTo", function () {
              return kt;
          }),
          r.d(n, "str", function () {
              return Dt;
          }),
          r.d(n, "frob", function () {
              return Ot;
          }),
          r.d(n, "add", function () {
              return Bt;
          }),
          r.d(n, "subtract", function () {
              return Nt;
          }),
          r.d(n, "multiplyScalar", function () {
              return Lt;
          }),
          r.d(n, "multiplyScalarAndAdd", function () {
              return zt;
          }),
          r.d(n, "exactEquals", function () {
              return jt;
          }),
          r.d(n, "equals", function () {
              return Ht;
          }),
          r.d(n, "mul", function () {
              return Gt;
          }),
          r.d(n, "sub", function () {
              return Vt;
          });
      var a = {};
      r.r(a),
          r.d(a, "create", function () {
              return qt;
          }),
          r.d(a, "clone", function () {
              return Xt;
          }),
          r.d(a, "length", function () {
              return Yt;
          }),
          r.d(a, "fromValues", function () {
              return Zt;
          }),
          r.d(a, "copy", function () {
              return Wt;
          }),
          r.d(a, "set", function () {
              return Kt;
          }),
          r.d(a, "add", function () {
              return Jt;
          }),
          r.d(a, "subtract", function () {
              return Qt;
          }),
          r.d(a, "multiply", function () {
              return $t;
          }),
          r.d(a, "divide", function () {
              return te;
          }),
          r.d(a, "ceil", function () {
              return ee;
          }),
          r.d(a, "floor", function () {
              return re;
          }),
          r.d(a, "min", function () {
              return ie;
          }),
          r.d(a, "max", function () {
              return ne;
          }),
          r.d(a, "round", function () {
              return ae;
          }),
          r.d(a, "scale", function () {
              return se;
          }),
          r.d(a, "scaleAndAdd", function () {
              return oe;
          }),
          r.d(a, "distance", function () {
              return he;
          }),
          r.d(a, "squaredDistance", function () {
              return ue;
          }),
          r.d(a, "squaredLength", function () {
              return le;
          }),
          r.d(a, "negate", function () {
              return ce;
          }),
          r.d(a, "inverse", function () {
              return fe;
          }),
          r.d(a, "normalize", function () {
              return de;
          }),
          r.d(a, "dot", function () {
              return be;
          }),
          r.d(a, "cross", function () {
              return pe;
          }),
          r.d(a, "lerp", function () {
              return me;
          }),
          r.d(a, "hermite", function () {
              return _e;
          }),
          r.d(a, "bezier", function () {
              return ge;
          }),
          r.d(a, "random", function () {
              return ve;
          }),
          r.d(a, "transformMat4", function () {
              return xe;
          }),
          r.d(a, "transformMat3", function () {
              return ye;
          }),
          r.d(a, "transformQuat", function () {
              return Te;
          }),
          r.d(a, "rotateX", function () {
              return we;
          }),
          r.d(a, "rotateY", function () {
              return Ee;
          }),
          r.d(a, "rotateZ", function () {
              return Ae;
          }),
          r.d(a, "angle", function () {
              return Me;
          }),
          r.d(a, "zero", function () {
              return Fe;
          }),
          r.d(a, "str", function () {
              return Re;
          }),
          r.d(a, "exactEquals", function () {
              return Se;
          }),
          r.d(a, "equals", function () {
              return Ce;
          }),
          r.d(a, "sub", function () {
              return Ie;
          }),
          r.d(a, "mul", function () {
              return Ue;
          }),
          r.d(a, "div", function () {
              return ke;
          }),
          r.d(a, "dist", function () {
              return De;
          }),
          r.d(a, "sqrDist", function () {
              return Oe;
          }),
          r.d(a, "len", function () {
              return Be;
          }),
          r.d(a, "sqrLen", function () {
              return Ne;
          }),
          r.d(a, "forEach", function () {
              return Le;
          });
      var s = {};
      r.r(s),
          r.d(s, "create", function () {
              return ze;
          }),
          r.d(s, "clone", function () {
              return je;
          }),
          r.d(s, "fromValues", function () {
              return He;
          }),
          r.d(s, "copy", function () {
              return Ge;
          }),
          r.d(s, "set", function () {
              return Ve;
          }),
          r.d(s, "add", function () {
              return qe;
          }),
          r.d(s, "subtract", function () {
              return Xe;
          }),
          r.d(s, "multiply", function () {
              return Ye;
          }),
          r.d(s, "divide", function () {
              return Ze;
          }),
          r.d(s, "ceil", function () {
              return We;
          }),
          r.d(s, "floor", function () {
              return Ke;
          }),
          r.d(s, "min", function () {
              return Je;
          }),
          r.d(s, "max", function () {
              return Qe;
          }),
          r.d(s, "round", function () {
              return $e;
          }),
          r.d(s, "scale", function () {
              return tr;
          }),
          r.d(s, "scaleAndAdd", function () {
              return er;
          }),
          r.d(s, "distance", function () {
              return rr;
          }),
          r.d(s, "squaredDistance", function () {
              return ir;
          }),
          r.d(s, "length", function () {
              return nr;
          }),
          r.d(s, "squaredLength", function () {
              return ar;
          }),
          r.d(s, "negate", function () {
              return sr;
          }),
          r.d(s, "inverse", function () {
              return or;
          }),
          r.d(s, "normalize", function () {
              return hr;
          }),
          r.d(s, "dot", function () {
              return ur;
          }),
          r.d(s, "cross", function () {
              return lr;
          }),
          r.d(s, "lerp", function () {
              return cr;
          }),
          r.d(s, "random", function () {
              return fr;
          }),
          r.d(s, "transformMat4", function () {
              return dr;
          }),
          r.d(s, "transformQuat", function () {
              return br;
          }),
          r.d(s, "zero", function () {
              return pr;
          }),
          r.d(s, "str", function () {
              return mr;
          }),
          r.d(s, "exactEquals", function () {
              return _r;
          }),
          r.d(s, "equals", function () {
              return gr;
          }),
          r.d(s, "sub", function () {
              return vr;
          }),
          r.d(s, "mul", function () {
              return xr;
          }),
          r.d(s, "div", function () {
              return yr;
          }),
          r.d(s, "dist", function () {
              return Tr;
          }),
          r.d(s, "sqrDist", function () {
              return wr;
          }),
          r.d(s, "len", function () {
              return Er;
          }),
          r.d(s, "sqrLen", function () {
              return Ar;
          }),
          r.d(s, "forEach", function () {
              return Mr;
          });
      var o = {};
      r.r(o),
          r.d(o, "create", function () {
              return Fr;
          }),
          r.d(o, "identity", function () {
              return Rr;
          }),
          r.d(o, "setAxisAngle", function () {
              return Sr;
          }),
          r.d(o, "getAxisAngle", function () {
              return Cr;
          }),
          r.d(o, "multiply", function () {
              return Pr;
          }),
          r.d(o, "rotateX", function () {
              return Ir;
          }),
          r.d(o, "rotateY", function () {
              return Ur;
          }),
          r.d(o, "rotateZ", function () {
              return kr;
          }),
          r.d(o, "calculateW", function () {
              return Dr;
          }),
          r.d(o, "slerp", function () {
              return Or;
          }),
          r.d(o, "random", function () {
              return Br;
          }),
          r.d(o, "invert", function () {
              return Nr;
          }),
          r.d(o, "conjugate", function () {
              return Lr;
          }),
          r.d(o, "fromMat3", function () {
              return zr;
          }),
          r.d(o, "fromEuler", function () {
              return jr;
          }),
          r.d(o, "str", function () {
              return Hr;
          }),
          r.d(o, "clone", function () {
              return Wr;
          }),
          r.d(o, "fromValues", function () {
              return Kr;
          }),
          r.d(o, "copy", function () {
              return Jr;
          }),
          r.d(o, "set", function () {
              return Qr;
          }),
          r.d(o, "add", function () {
              return $r;
          }),
          r.d(o, "mul", function () {
              return ti;
          }),
          r.d(o, "scale", function () {
              return ei;
          }),
          r.d(o, "dot", function () {
              return ri;
          }),
          r.d(o, "lerp", function () {
              return ii;
          }),
          r.d(o, "length", function () {
              return ni;
          }),
          r.d(o, "len", function () {
              return ai;
          }),
          r.d(o, "squaredLength", function () {
              return si;
          }),
          r.d(o, "sqrLen", function () {
              return oi;
          }),
          r.d(o, "normalize", function () {
              return hi;
          }),
          r.d(o, "exactEquals", function () {
              return ui;
          }),
          r.d(o, "equals", function () {
              return li;
          }),
          r.d(o, "rotationTo", function () {
              return ci;
          }),
          r.d(o, "sqlerp", function () {
              return fi;
          }),
          r.d(o, "setAxes", function () {
              return di;
          });
      var h = {};
      r.r(h),
          r.d(h, "create", function () {
              return bi;
          }),
          r.d(h, "clone", function () {
              return pi;
          }),
          r.d(h, "fromValues", function () {
              return mi;
          }),
          r.d(h, "copy", function () {
              return _i;
          }),
          r.d(h, "set", function () {
              return gi;
          }),
          r.d(h, "add", function () {
              return vi;
          }),
          r.d(h, "subtract", function () {
              return xi;
          }),
          r.d(h, "multiply", function () {
              return yi;
          }),
          r.d(h, "divide", function () {
              return Ti;
          }),
          r.d(h, "ceil", function () {
              return wi;
          }),
          r.d(h, "floor", function () {
              return Ei;
          }),
          r.d(h, "min", function () {
              return Ai;
          }),
          r.d(h, "max", function () {
              return Mi;
          }),
          r.d(h, "round", function () {
              return Fi;
          }),
          r.d(h, "scale", function () {
              return Ri;
          }),
          r.d(h, "scaleAndAdd", function () {
              return Si;
          }),
          r.d(h, "distance", function () {
              return Ci;
          }),
          r.d(h, "squaredDistance", function () {
              return Pi;
          }),
          r.d(h, "length", function () {
              return Ii;
          }),
          r.d(h, "squaredLength", function () {
              return Ui;
          }),
          r.d(h, "negate", function () {
              return ki;
          }),
          r.d(h, "inverse", function () {
              return Di;
          }),
          r.d(h, "normalize", function () {
              return Oi;
          }),
          r.d(h, "dot", function () {
              return Bi;
          }),
          r.d(h, "cross", function () {
              return Ni;
          }),
          r.d(h, "lerp", function () {
              return Li;
          }),
          r.d(h, "random", function () {
              return zi;
          }),
          r.d(h, "transformMat2", function () {
              return ji;
          }),
          r.d(h, "transformMat2d", function () {
              return Hi;
          }),
          r.d(h, "transformMat3", function () {
              return Gi;
          }),
          r.d(h, "transformMat4", function () {
              return Vi;
          }),
          r.d(h, "rotate", function () {
              return qi;
          }),
          r.d(h, "angle", function () {
              return Xi;
          }),
          r.d(h, "zero", function () {
              return Yi;
          }),
          r.d(h, "str", function () {
              return Zi;
          }),
          r.d(h, "exactEquals", function () {
              return Wi;
          }),
          r.d(h, "equals", function () {
              return Ki;
          }),
          r.d(h, "len", function () {
              return Ji;
          }),
          r.d(h, "sub", function () {
              return Qi;
          }),
          r.d(h, "mul", function () {
              return $i;
          }),
          r.d(h, "div", function () {
              return tn;
          }),
          r.d(h, "dist", function () {
              return en;
          }),
          r.d(h, "sqrDist", function () {
              return rn;
          }),
          r.d(h, "sqrLen", function () {
              return nn;
          }),
          r.d(h, "forEach", function () {
              return an;
          });
      r(12);
      var u = r(0),
          l = {};
      const c = { position: 3, normal: 3, tangent: 3, texcoord: 2, texcoord0: 2, texcoord1: 2, texcoord2: 2 };
      var f = {};
      class d {
          constructor() {
              this.attribs = {};
          }
          disableAll() {
              for (let t in this.attribs) this.gl.disableVertexAttribArray(this.attribs[t]);
              this.attribs = {};
          }
          enable(t, e) {
              this.gl = t;
              var r = {};
              for (let n in e) {
                  var i = e[n];
                  void 0 !== i.loc && (void 0 === this.attribs[i.loc] && t.enableVertexAttribArray(i.loc), t.vertexAttribPointer(i.loc, i.size, i.type, !1, i.stride, i.offset), (r[i.loc] = i.loc), (this.attribs[n] = null));
              }
              for (let t in this.attribs);
              this.attribs = r;
          }
      }
      class b {
          static CreateProgramAttributes(t, e) {
              var r = {},
                  i = 0;
              for (let s in e) {
                  var n = e[s],
                      a = c[s];
                  (r[n] = { type: t.FLOAT, size: a, offset: 4 * i }), (i += a);
              }
              for (let t in r) r[t].stride = 4 * i;
              return r;
          }
          CleanUpPrograms() {
              f = {};
          }
          ReleaseProgram(t) {}
          static _GetProgram(t) {
              return f[t];
          }
          static RegisterProgram(t, e) {
              if (!f[t]) {
                  var r = e.shaders;
                  f[t] = { shaders: [r[0], r[1]], attributes: e.attributes };
              }
              return f[t];
          }
          static GetProgram(t, e, r, i) {
              var n = f[e],
                  a = "";
              for (var s in r) a += s + ":" + r[s] + "-";
              if (!n) {
                  var o = e.split("."),
                      h = l[o[0]][o[1]];
                  h && (n = b.RegisterProgram(e, h));
              }
              if (!n) throw "Program not registered: " + o;
              n.programInfo || (n.programInfo = {}), (n.programInfo[a] = b.CompileProgram(t, n.shaders, r)), (i = i || (n.attributes && b.CreateProgramAttributes(t, n.attributes)));
              var u = n.programInfo[a];
              if (i)
                  for (var s in i) {
                      var c = u.attribSetters[s];
                      c && ((i[s] = i[s] || {}), (i[s].loc = c.location));
                  }
              return (u.attributes = i), u;
          }
          static CompileProgram(t, e, r, i) {
              var n = "";
              for (var a in r) {
                  var s = r[a];
                  n = "#define " + a + " " + (null === s ? "" : s) + "\n";
              }
              var o = {},
                  h = [n + e[0], n + e[1]];
              const l = Object(u.createProgramInfo)(t, h, null, null);
              if (i)
                  for (var a in i) {
                      var c = l.attribSetters[a];
                      c && ((i[a] = i[a] || {}), (i[a].loc = c.location));
                  }
              for (var a in l.uniformSetters) o[a] = l.uniformSetters[a].location;
              return (l.uniforms = o), l;
          }
      }
      var p = new b(),
          m = 1e-6,
          _ = "undefined" != typeof Float32Array ? Float32Array : Array,
          g = Math.random;
      Math.PI;
      function v() {
          var t = new _(9);
          return _ != Float32Array && ((t[1] = 0), (t[2] = 0), (t[3] = 0), (t[5] = 0), (t[6] = 0), (t[7] = 0)), (t[0] = 1), (t[4] = 1), (t[8] = 1), t;
      }
      function x(t, e) {
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[4]), (t[4] = e[5]), (t[5] = e[6]), (t[6] = e[8]), (t[7] = e[9]), (t[8] = e[10]), t;
      }
      function y(t) {
          var e = new _(9);
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), (e[4] = t[4]), (e[5] = t[5]), (e[6] = t[6]), (e[7] = t[7]), (e[8] = t[8]), e;
      }
      function T(t, e) {
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), (t[4] = e[4]), (t[5] = e[5]), (t[6] = e[6]), (t[7] = e[7]), (t[8] = e[8]), t;
      }
      function w(t, e, r, i, n, a, s, o, h) {
          var u = new _(9);
          return (u[0] = t), (u[1] = e), (u[2] = r), (u[3] = i), (u[4] = n), (u[5] = a), (u[6] = s), (u[7] = o), (u[8] = h), u;
      }
      function E(t, e, r, i, n, a, s, o, h, u) {
          return (t[0] = e), (t[1] = r), (t[2] = i), (t[3] = n), (t[4] = a), (t[5] = s), (t[6] = o), (t[7] = h), (t[8] = u), t;
      }
      function A(t) {
          return (t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = 1), (t[5] = 0), (t[6] = 0), (t[7] = 0), (t[8] = 1), t;
      }
      function M(t, e) {
          if (t === e) {
              var r = e[1],
                  i = e[2],
                  n = e[5];
              (t[1] = e[3]), (t[2] = e[6]), (t[3] = r), (t[5] = e[7]), (t[6] = i), (t[7] = n);
          } else (t[0] = e[0]), (t[1] = e[3]), (t[2] = e[6]), (t[3] = e[1]), (t[4] = e[4]), (t[5] = e[7]), (t[6] = e[2]), (t[7] = e[5]), (t[8] = e[8]);
          return t;
      }
      function F(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = e[3],
              s = e[4],
              o = e[5],
              h = e[6],
              u = e[7],
              l = e[8],
              c = l * s - o * u,
              f = -l * a + o * h,
              d = u * a - s * h,
              b = r * c + i * f + n * d;
          return b
              ? ((b = 1 / b),
                (t[0] = c * b),
                (t[1] = (-l * i + n * u) * b),
                (t[2] = (o * i - n * s) * b),
                (t[3] = f * b),
                (t[4] = (l * r - n * h) * b),
                (t[5] = (-o * r + n * a) * b),
                (t[6] = d * b),
                (t[7] = (-u * r + i * h) * b),
                (t[8] = (s * r - i * a) * b),
                t)
              : null;
      }
      function R(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = e[3],
              s = e[4],
              o = e[5],
              h = e[6],
              u = e[7],
              l = e[8];
          return (t[0] = s * l - o * u), (t[1] = n * u - i * l), (t[2] = i * o - n * s), (t[3] = o * h - a * l), (t[4] = r * l - n * h), (t[5] = n * a - r * o), (t[6] = a * u - s * h), (t[7] = i * h - r * u), (t[8] = r * s - i * a), t;
      }
      function S(t) {
          var e = t[0],
              r = t[1],
              i = t[2],
              n = t[3],
              a = t[4],
              s = t[5],
              o = t[6],
              h = t[7],
              u = t[8];
          return e * (u * a - s * h) + r * (-u * n + s * o) + i * (h * n - a * o);
      }
      function C(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2],
              s = e[3],
              o = e[4],
              h = e[5],
              u = e[6],
              l = e[7],
              c = e[8],
              f = r[0],
              d = r[1],
              b = r[2],
              p = r[3],
              m = r[4],
              _ = r[5],
              g = r[6],
              v = r[7],
              x = r[8];
          return (
              (t[0] = f * i + d * s + b * u),
              (t[1] = f * n + d * o + b * l),
              (t[2] = f * a + d * h + b * c),
              (t[3] = p * i + m * s + _ * u),
              (t[4] = p * n + m * o + _ * l),
              (t[5] = p * a + m * h + _ * c),
              (t[6] = g * i + v * s + x * u),
              (t[7] = g * n + v * o + x * l),
              (t[8] = g * a + v * h + x * c),
              t
          );
      }
      function P(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2],
              s = e[3],
              o = e[4],
              h = e[5],
              u = e[6],
              l = e[7],
              c = e[8],
              f = r[0],
              d = r[1];
          return (t[0] = i), (t[1] = n), (t[2] = a), (t[3] = s), (t[4] = o), (t[5] = h), (t[6] = f * i + d * s + u), (t[7] = f * n + d * o + l), (t[8] = f * a + d * h + c), t;
      }
      function I(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2],
              s = e[3],
              o = e[4],
              h = e[5],
              u = e[6],
              l = e[7],
              c = e[8],
              f = Math.sin(r),
              d = Math.cos(r);
          return (t[0] = d * i + f * s), (t[1] = d * n + f * o), (t[2] = d * a + f * h), (t[3] = d * s - f * i), (t[4] = d * o - f * n), (t[5] = d * h - f * a), (t[6] = u), (t[7] = l), (t[8] = c), t;
      }
      function U(t, e, r) {
          var i = r[0],
              n = r[1];
          return (t[0] = i * e[0]), (t[1] = i * e[1]), (t[2] = i * e[2]), (t[3] = n * e[3]), (t[4] = n * e[4]), (t[5] = n * e[5]), (t[6] = e[6]), (t[7] = e[7]), (t[8] = e[8]), t;
      }
      function k(t, e) {
          return (t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = 1), (t[5] = 0), (t[6] = e[0]), (t[7] = e[1]), (t[8] = 1), t;
      }
      function D(t, e) {
          var r = Math.sin(e),
              i = Math.cos(e);
          return (t[0] = i), (t[1] = r), (t[2] = 0), (t[3] = -r), (t[4] = i), (t[5] = 0), (t[6] = 0), (t[7] = 0), (t[8] = 1), t;
      }
      function O(t, e) {
          return (t[0] = e[0]), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = e[1]), (t[5] = 0), (t[6] = 0), (t[7] = 0), (t[8] = 1), t;
      }
      function B(t, e) {
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = 0), (t[3] = e[2]), (t[4] = e[3]), (t[5] = 0), (t[6] = e[4]), (t[7] = e[5]), (t[8] = 1), t;
      }
      function N(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = e[3],
              s = r + r,
              o = i + i,
              h = n + n,
              u = r * s,
              l = i * s,
              c = i * o,
              f = n * s,
              d = n * o,
              b = n * h,
              p = a * s,
              m = a * o,
              _ = a * h;
          return (t[0] = 1 - c - b), (t[3] = l - _), (t[6] = f + m), (t[1] = l + _), (t[4] = 1 - u - b), (t[7] = d - p), (t[2] = f - m), (t[5] = d + p), (t[8] = 1 - u - c), t;
      }
      function L(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = e[3],
              s = e[4],
              o = e[5],
              h = e[6],
              u = e[7],
              l = e[8],
              c = e[9],
              f = e[10],
              d = e[11],
              b = e[12],
              p = e[13],
              m = e[14],
              _ = e[15],
              g = r * o - i * s,
              v = r * h - n * s,
              x = r * u - a * s,
              y = i * h - n * o,
              T = i * u - a * o,
              w = n * u - a * h,
              E = l * p - c * b,
              A = l * m - f * b,
              M = l * _ - d * b,
              F = c * m - f * p,
              R = c * _ - d * p,
              S = f * _ - d * m,
              C = g * S - v * R + x * F + y * M - T * A + w * E;
          return C
              ? ((C = 1 / C),
                (t[0] = (o * S - h * R + u * F) * C),
                (t[1] = (h * M - s * S - u * A) * C),
                (t[2] = (s * R - o * M + u * E) * C),
                (t[3] = (n * R - i * S - a * F) * C),
                (t[4] = (r * S - n * M + a * A) * C),
                (t[5] = (i * M - r * R - a * E) * C),
                (t[6] = (p * w - m * T + _ * y) * C),
                (t[7] = (m * x - b * w - _ * v) * C),
                (t[8] = (b * T - p * x + _ * g) * C),
                t)
              : null;
      }
      function z(t, e, r) {
          return (t[0] = 2 / e), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = -2 / r), (t[5] = 0), (t[6] = -1), (t[7] = 1), (t[8] = 1), t;
      }
      function j(t) {
          return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
      }
      function H(t) {
          return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2));
      }
      function G(t, e, r) {
          return (t[0] = e[0] + r[0]), (t[1] = e[1] + r[1]), (t[2] = e[2] + r[2]), (t[3] = e[3] + r[3]), (t[4] = e[4] + r[4]), (t[5] = e[5] + r[5]), (t[6] = e[6] + r[6]), (t[7] = e[7] + r[7]), (t[8] = e[8] + r[8]), t;
      }
      function V(t, e, r) {
          return (t[0] = e[0] - r[0]), (t[1] = e[1] - r[1]), (t[2] = e[2] - r[2]), (t[3] = e[3] - r[3]), (t[4] = e[4] - r[4]), (t[5] = e[5] - r[5]), (t[6] = e[6] - r[6]), (t[7] = e[7] - r[7]), (t[8] = e[8] - r[8]), t;
      }
      function q(t, e, r) {
          return (t[0] = e[0] * r), (t[1] = e[1] * r), (t[2] = e[2] * r), (t[3] = e[3] * r), (t[4] = e[4] * r), (t[5] = e[5] * r), (t[6] = e[6] * r), (t[7] = e[7] * r), (t[8] = e[8] * r), t;
      }
      function X(t, e, r, i) {
          return (
              (t[0] = e[0] + r[0] * i),
              (t[1] = e[1] + r[1] * i),
              (t[2] = e[2] + r[2] * i),
              (t[3] = e[3] + r[3] * i),
              (t[4] = e[4] + r[4] * i),
              (t[5] = e[5] + r[5] * i),
              (t[6] = e[6] + r[6] * i),
              (t[7] = e[7] + r[7] * i),
              (t[8] = e[8] + r[8] * i),
              t
          );
      }
      function Y(t, e) {
          return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5] && t[6] === e[6] && t[7] === e[7] && t[8] === e[8];
      }
      function Z(t, e) {
          var r = t[0],
              i = t[1],
              n = t[2],
              a = t[3],
              s = t[4],
              o = t[5],
              h = t[6],
              u = t[7],
              l = t[8],
              c = e[0],
              f = e[1],
              d = e[2],
              b = e[3],
              p = e[4],
              _ = e[5],
              g = e[6],
              v = e[7],
              x = e[8];
          return (
              Math.abs(r - c) <= m * Math.max(1, Math.abs(r), Math.abs(c)) &&
              Math.abs(i - f) <= m * Math.max(1, Math.abs(i), Math.abs(f)) &&
              Math.abs(n - d) <= m * Math.max(1, Math.abs(n), Math.abs(d)) &&
              Math.abs(a - b) <= m * Math.max(1, Math.abs(a), Math.abs(b)) &&
              Math.abs(s - p) <= m * Math.max(1, Math.abs(s), Math.abs(p)) &&
              Math.abs(o - _) <= m * Math.max(1, Math.abs(o), Math.abs(_)) &&
              Math.abs(h - g) <= m * Math.max(1, Math.abs(h), Math.abs(g)) &&
              Math.abs(u - v) <= m * Math.max(1, Math.abs(u), Math.abs(v)) &&
              Math.abs(l - x) <= m * Math.max(1, Math.abs(l), Math.abs(x))
          );
      }
      var W = C,
          K = V;
      function J() {
          var t = new _(16);
          return (
              _ != Float32Array && ((t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = 0), (t[6] = 0), (t[7] = 0), (t[8] = 0), (t[9] = 0), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0)), (t[0] = 1), (t[5] = 1), (t[10] = 1), (t[15] = 1), t
          );
      }
      function Q(t) {
          var e = new _(16);
          return (
              (e[0] = t[0]),
              (e[1] = t[1]),
              (e[2] = t[2]),
              (e[3] = t[3]),
              (e[4] = t[4]),
              (e[5] = t[5]),
              (e[6] = t[6]),
              (e[7] = t[7]),
              (e[8] = t[8]),
              (e[9] = t[9]),
              (e[10] = t[10]),
              (e[11] = t[11]),
              (e[12] = t[12]),
              (e[13] = t[13]),
              (e[14] = t[14]),
              (e[15] = t[15]),
              e
          );
      }
      function tt(t, e) {
          return (
              (t[0] = e[0]),
              (t[1] = e[1]),
              (t[2] = e[2]),
              (t[3] = e[3]),
              (t[4] = e[4]),
              (t[5] = e[5]),
              (t[6] = e[6]),
              (t[7] = e[7]),
              (t[8] = e[8]),
              (t[9] = e[9]),
              (t[10] = e[10]),
              (t[11] = e[11]),
              (t[12] = e[12]),
              (t[13] = e[13]),
              (t[14] = e[14]),
              (t[15] = e[15]),
              t
          );
      }
      function et(t, e, r, i, n, a, s, o, h, u, l, c, f, d, b, p) {
          var m = new _(16);
          return (m[0] = t), (m[1] = e), (m[2] = r), (m[3] = i), (m[4] = n), (m[5] = a), (m[6] = s), (m[7] = o), (m[8] = h), (m[9] = u), (m[10] = l), (m[11] = c), (m[12] = f), (m[13] = d), (m[14] = b), (m[15] = p), m;
      }
      function rt(t, e, r, i, n, a, s, o, h, u, l, c, f, d, b, p, m) {
          return (t[0] = e), (t[1] = r), (t[2] = i), (t[3] = n), (t[4] = a), (t[5] = s), (t[6] = o), (t[7] = h), (t[8] = u), (t[9] = l), (t[10] = c), (t[11] = f), (t[12] = d), (t[13] = b), (t[14] = p), (t[15] = m), t;
      }
      function it(t) {
          return (t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = 0), (t[5] = 1), (t[6] = 0), (t[7] = 0), (t[8] = 0), (t[9] = 0), (t[10] = 1), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0), (t[15] = 1), t;
      }
      function nt(t, e) {
          if (t === e) {
              var r = e[1],
                  i = e[2],
                  n = e[3],
                  a = e[6],
                  s = e[7],
                  o = e[11];
              (t[1] = e[4]), (t[2] = e[8]), (t[3] = e[12]), (t[4] = r), (t[6] = e[9]), (t[7] = e[13]), (t[8] = i), (t[9] = a), (t[11] = e[14]), (t[12] = n), (t[13] = s), (t[14] = o);
          } else
              (t[0] = e[0]),
                  (t[1] = e[4]),
                  (t[2] = e[8]),
                  (t[3] = e[12]),
                  (t[4] = e[1]),
                  (t[5] = e[5]),
                  (t[6] = e[9]),
                  (t[7] = e[13]),
                  (t[8] = e[2]),
                  (t[9] = e[6]),
                  (t[10] = e[10]),
                  (t[11] = e[14]),
                  (t[12] = e[3]),
                  (t[13] = e[7]),
                  (t[14] = e[11]),
                  (t[15] = e[15]);
          return t;
      }
      function at(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = e[3],
              s = e[4],
              o = e[5],
              h = e[6],
              u = e[7],
              l = e[8],
              c = e[9],
              f = e[10],
              d = e[11],
              b = e[12],
              p = e[13],
              m = e[14],
              _ = e[15],
              g = r * o - i * s,
              v = r * h - n * s,
              x = r * u - a * s,
              y = i * h - n * o,
              T = i * u - a * o,
              w = n * u - a * h,
              E = l * p - c * b,
              A = l * m - f * b,
              M = l * _ - d * b,
              F = c * m - f * p,
              R = c * _ - d * p,
              S = f * _ - d * m,
              C = g * S - v * R + x * F + y * M - T * A + w * E;
          return C
              ? ((C = 1 / C),
                (t[0] = (o * S - h * R + u * F) * C),
                (t[1] = (n * R - i * S - a * F) * C),
                (t[2] = (p * w - m * T + _ * y) * C),
                (t[3] = (f * T - c * w - d * y) * C),
                (t[4] = (h * M - s * S - u * A) * C),
                (t[5] = (r * S - n * M + a * A) * C),
                (t[6] = (m * x - b * w - _ * v) * C),
                (t[7] = (l * w - f * x + d * v) * C),
                (t[8] = (s * R - o * M + u * E) * C),
                (t[9] = (i * M - r * R - a * E) * C),
                (t[10] = (b * T - p * x + _ * g) * C),
                (t[11] = (c * x - l * T - d * g) * C),
                (t[12] = (o * A - s * F - h * E) * C),
                (t[13] = (r * F - i * A + n * E) * C),
                (t[14] = (p * v - b * y - m * g) * C),
                (t[15] = (l * y - c * v + f * g) * C),
                t)
              : null;
      }
      function st(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = e[3],
              s = e[4],
              o = e[5],
              h = e[6],
              u = e[7],
              l = e[8],
              c = e[9],
              f = e[10],
              d = e[11],
              b = e[12],
              p = e[13],
              m = e[14],
              _ = e[15];
          return (
              (t[0] = o * (f * _ - d * m) - c * (h * _ - u * m) + p * (h * d - u * f)),
              (t[1] = -(i * (f * _ - d * m) - c * (n * _ - a * m) + p * (n * d - a * f))),
              (t[2] = i * (h * _ - u * m) - o * (n * _ - a * m) + p * (n * u - a * h)),
              (t[3] = -(i * (h * d - u * f) - o * (n * d - a * f) + c * (n * u - a * h))),
              (t[4] = -(s * (f * _ - d * m) - l * (h * _ - u * m) + b * (h * d - u * f))),
              (t[5] = r * (f * _ - d * m) - l * (n * _ - a * m) + b * (n * d - a * f)),
              (t[6] = -(r * (h * _ - u * m) - s * (n * _ - a * m) + b * (n * u - a * h))),
              (t[7] = r * (h * d - u * f) - s * (n * d - a * f) + l * (n * u - a * h)),
              (t[8] = s * (c * _ - d * p) - l * (o * _ - u * p) + b * (o * d - u * c)),
              (t[9] = -(r * (c * _ - d * p) - l * (i * _ - a * p) + b * (i * d - a * c))),
              (t[10] = r * (o * _ - u * p) - s * (i * _ - a * p) + b * (i * u - a * o)),
              (t[11] = -(r * (o * d - u * c) - s * (i * d - a * c) + l * (i * u - a * o))),
              (t[12] = -(s * (c * m - f * p) - l * (o * m - h * p) + b * (o * f - h * c))),
              (t[13] = r * (c * m - f * p) - l * (i * m - n * p) + b * (i * f - n * c)),
              (t[14] = -(r * (o * m - h * p) - s * (i * m - n * p) + b * (i * h - n * o))),
              (t[15] = r * (o * f - h * c) - s * (i * f - n * c) + l * (i * h - n * o)),
              t
          );
      }
      function ot(t) {
          var e = t[0],
              r = t[1],
              i = t[2],
              n = t[3],
              a = t[4],
              s = t[5],
              o = t[6],
              h = t[7],
              u = t[8],
              l = t[9],
              c = t[10],
              f = t[11],
              d = t[12],
              b = t[13],
              p = t[14],
              m = t[15];
          return (e * s - r * a) * (c * m - f * p) - (e * o - i * a) * (l * m - f * b) + (e * h - n * a) * (l * p - c * b) + (r * o - i * s) * (u * m - f * d) - (r * h - n * s) * (u * p - c * d) + (i * h - n * o) * (u * b - l * d);
      }
      function ht(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2],
              s = e[3],
              o = e[4],
              h = e[5],
              u = e[6],
              l = e[7],
              c = e[8],
              f = e[9],
              d = e[10],
              b = e[11],
              p = e[12],
              m = e[13],
              _ = e[14],
              g = e[15],
              v = r[0],
              x = r[1],
              y = r[2],
              T = r[3];
          return (
              (t[0] = v * i + x * o + y * c + T * p),
              (t[1] = v * n + x * h + y * f + T * m),
              (t[2] = v * a + x * u + y * d + T * _),
              (t[3] = v * s + x * l + y * b + T * g),
              (v = r[4]),
              (x = r[5]),
              (y = r[6]),
              (T = r[7]),
              (t[4] = v * i + x * o + y * c + T * p),
              (t[5] = v * n + x * h + y * f + T * m),
              (t[6] = v * a + x * u + y * d + T * _),
              (t[7] = v * s + x * l + y * b + T * g),
              (v = r[8]),
              (x = r[9]),
              (y = r[10]),
              (T = r[11]),
              (t[8] = v * i + x * o + y * c + T * p),
              (t[9] = v * n + x * h + y * f + T * m),
              (t[10] = v * a + x * u + y * d + T * _),
              (t[11] = v * s + x * l + y * b + T * g),
              (v = r[12]),
              (x = r[13]),
              (y = r[14]),
              (T = r[15]),
              (t[12] = v * i + x * o + y * c + T * p),
              (t[13] = v * n + x * h + y * f + T * m),
              (t[14] = v * a + x * u + y * d + T * _),
              (t[15] = v * s + x * l + y * b + T * g),
              t
          );
      }
      function ut(t, e, r) {
          var i,
              n,
              a,
              s,
              o,
              h,
              u,
              l,
              c,
              f,
              d,
              b,
              p = r[0],
              m = r[1],
              _ = r[2];
          return (
              e === t
                  ? ((t[12] = e[0] * p + e[4] * m + e[8] * _ + e[12]), (t[13] = e[1] * p + e[5] * m + e[9] * _ + e[13]), (t[14] = e[2] * p + e[6] * m + e[10] * _ + e[14]), (t[15] = e[3] * p + e[7] * m + e[11] * _ + e[15]))
                  : ((i = e[0]),
                    (n = e[1]),
                    (a = e[2]),
                    (s = e[3]),
                    (o = e[4]),
                    (h = e[5]),
                    (u = e[6]),
                    (l = e[7]),
                    (c = e[8]),
                    (f = e[9]),
                    (d = e[10]),
                    (b = e[11]),
                    (t[0] = i),
                    (t[1] = n),
                    (t[2] = a),
                    (t[3] = s),
                    (t[4] = o),
                    (t[5] = h),
                    (t[6] = u),
                    (t[7] = l),
                    (t[8] = c),
                    (t[9] = f),
                    (t[10] = d),
                    (t[11] = b),
                    (t[12] = i * p + o * m + c * _ + e[12]),
                    (t[13] = n * p + h * m + f * _ + e[13]),
                    (t[14] = a * p + u * m + d * _ + e[14]),
                    (t[15] = s * p + l * m + b * _ + e[15])),
              t
          );
      }
      function lt(t, e, r) {
          var i = r[0],
              n = r[1],
              a = r[2];
          return (
              (t[0] = e[0] * i),
              (t[1] = e[1] * i),
              (t[2] = e[2] * i),
              (t[3] = e[3] * i),
              (t[4] = e[4] * n),
              (t[5] = e[5] * n),
              (t[6] = e[6] * n),
              (t[7] = e[7] * n),
              (t[8] = e[8] * a),
              (t[9] = e[9] * a),
              (t[10] = e[10] * a),
              (t[11] = e[11] * a),
              (t[12] = e[12]),
              (t[13] = e[13]),
              (t[14] = e[14]),
              (t[15] = e[15]),
              t
          );
      }
      function ct(t, e, r, i) {
          var n,
              a,
              s,
              o,
              h,
              u,
              l,
              c,
              f,
              d,
              b,
              p,
              _,
              g,
              v,
              x,
              y,
              T,
              w,
              E,
              A,
              M,
              F,
              R,
              S = i[0],
              C = i[1],
              P = i[2],
              I = Math.sqrt(S * S + C * C + P * P);
          return I < m
              ? null
              : ((S *= I = 1 / I),
                (C *= I),
                (P *= I),
                (n = Math.sin(r)),
                (s = 1 - (a = Math.cos(r))),
                (o = e[0]),
                (h = e[1]),
                (u = e[2]),
                (l = e[3]),
                (c = e[4]),
                (f = e[5]),
                (d = e[6]),
                (b = e[7]),
                (p = e[8]),
                (_ = e[9]),
                (g = e[10]),
                (v = e[11]),
                (x = S * S * s + a),
                (y = C * S * s + P * n),
                (T = P * S * s - C * n),
                (w = S * C * s - P * n),
                (E = C * C * s + a),
                (A = P * C * s + S * n),
                (M = S * P * s + C * n),
                (F = C * P * s - S * n),
                (R = P * P * s + a),
                (t[0] = o * x + c * y + p * T),
                (t[1] = h * x + f * y + _ * T),
                (t[2] = u * x + d * y + g * T),
                (t[3] = l * x + b * y + v * T),
                (t[4] = o * w + c * E + p * A),
                (t[5] = h * w + f * E + _ * A),
                (t[6] = u * w + d * E + g * A),
                (t[7] = l * w + b * E + v * A),
                (t[8] = o * M + c * F + p * R),
                (t[9] = h * M + f * F + _ * R),
                (t[10] = u * M + d * F + g * R),
                (t[11] = l * M + b * F + v * R),
                e !== t && ((t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), (t[15] = e[15])),
                t);
      }
      function ft(t, e, r) {
          var i = Math.sin(r),
              n = Math.cos(r),
              a = e[4],
              s = e[5],
              o = e[6],
              h = e[7],
              u = e[8],
              l = e[9],
              c = e[10],
              f = e[11];
          return (
              e !== t && ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), (t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), (t[15] = e[15])),
              (t[4] = a * n + u * i),
              (t[5] = s * n + l * i),
              (t[6] = o * n + c * i),
              (t[7] = h * n + f * i),
              (t[8] = u * n - a * i),
              (t[9] = l * n - s * i),
              (t[10] = c * n - o * i),
              (t[11] = f * n - h * i),
              t
          );
      }
      function dt(t, e, r) {
          var i = Math.sin(r),
              n = Math.cos(r),
              a = e[0],
              s = e[1],
              o = e[2],
              h = e[3],
              u = e[8],
              l = e[9],
              c = e[10],
              f = e[11];
          return (
              e !== t && ((t[4] = e[4]), (t[5] = e[5]), (t[6] = e[6]), (t[7] = e[7]), (t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), (t[15] = e[15])),
              (t[0] = a * n - u * i),
              (t[1] = s * n - l * i),
              (t[2] = o * n - c * i),
              (t[3] = h * n - f * i),
              (t[8] = a * i + u * n),
              (t[9] = s * i + l * n),
              (t[10] = o * i + c * n),
              (t[11] = h * i + f * n),
              t
          );
      }
      function bt(t, e, r) {
          var i = Math.sin(r),
              n = Math.cos(r),
              a = e[0],
              s = e[1],
              o = e[2],
              h = e[3],
              u = e[4],
              l = e[5],
              c = e[6],
              f = e[7];
          return (
              e !== t && ((t[8] = e[8]), (t[9] = e[9]), (t[10] = e[10]), (t[11] = e[11]), (t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), (t[15] = e[15])),
              (t[0] = a * n + u * i),
              (t[1] = s * n + l * i),
              (t[2] = o * n + c * i),
              (t[3] = h * n + f * i),
              (t[4] = u * n - a * i),
              (t[5] = l * n - s * i),
              (t[6] = c * n - o * i),
              (t[7] = f * n - h * i),
              t
          );
      }
      function pt(t, e) {
          return (t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = 0), (t[5] = 1), (t[6] = 0), (t[7] = 0), (t[8] = 0), (t[9] = 0), (t[10] = 1), (t[11] = 0), (t[12] = e[0]), (t[13] = e[1]), (t[14] = e[2]), (t[15] = 1), t;
      }
      function mt(t, e) {
          return (t[0] = e[0]), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = 0), (t[5] = e[1]), (t[6] = 0), (t[7] = 0), (t[8] = 0), (t[9] = 0), (t[10] = e[2]), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0), (t[15] = 1), t;
      }
      function _t(t, e, r) {
          var i,
              n,
              a,
              s = r[0],
              o = r[1],
              h = r[2],
              u = Math.sqrt(s * s + o * o + h * h);
          return u < m
              ? null
              : ((s *= u = 1 / u),
                (o *= u),
                (h *= u),
                (i = Math.sin(e)),
                (a = 1 - (n = Math.cos(e))),
                (t[0] = s * s * a + n),
                (t[1] = o * s * a + h * i),
                (t[2] = h * s * a - o * i),
                (t[3] = 0),
                (t[4] = s * o * a - h * i),
                (t[5] = o * o * a + n),
                (t[6] = h * o * a + s * i),
                (t[7] = 0),
                (t[8] = s * h * a + o * i),
                (t[9] = o * h * a - s * i),
                (t[10] = h * h * a + n),
                (t[11] = 0),
                (t[12] = 0),
                (t[13] = 0),
                (t[14] = 0),
                (t[15] = 1),
                t);
      }
      function gt(t, e) {
          var r = Math.sin(e),
              i = Math.cos(e);
          return (t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = 0), (t[5] = i), (t[6] = r), (t[7] = 0), (t[8] = 0), (t[9] = -r), (t[10] = i), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0), (t[15] = 1), t;
      }
      function vt(t, e) {
          var r = Math.sin(e),
              i = Math.cos(e);
          return (t[0] = i), (t[1] = 0), (t[2] = -r), (t[3] = 0), (t[4] = 0), (t[5] = 1), (t[6] = 0), (t[7] = 0), (t[8] = r), (t[9] = 0), (t[10] = i), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0), (t[15] = 1), t;
      }
      function xt(t, e) {
          var r = Math.sin(e),
              i = Math.cos(e);
          return (t[0] = i), (t[1] = r), (t[2] = 0), (t[3] = 0), (t[4] = -r), (t[5] = i), (t[6] = 0), (t[7] = 0), (t[8] = 0), (t[9] = 0), (t[10] = 1), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0), (t[15] = 1), t;
      }
      function yt(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2],
              s = e[3],
              o = i + i,
              h = n + n,
              u = a + a,
              l = i * o,
              c = i * h,
              f = i * u,
              d = n * h,
              b = n * u,
              p = a * u,
              m = s * o,
              _ = s * h,
              g = s * u;
          return (
              (t[0] = 1 - (d + p)),
              (t[1] = c + g),
              (t[2] = f - _),
              (t[3] = 0),
              (t[4] = c - g),
              (t[5] = 1 - (l + p)),
              (t[6] = b + m),
              (t[7] = 0),
              (t[8] = f + _),
              (t[9] = b - m),
              (t[10] = 1 - (l + d)),
              (t[11] = 0),
              (t[12] = r[0]),
              (t[13] = r[1]),
              (t[14] = r[2]),
              (t[15] = 1),
              t
          );
      }
      function Tt(t, e) {
          var r = new _(3),
              i = -e[0],
              n = -e[1],
              a = -e[2],
              s = e[3],
              o = e[4],
              h = e[5],
              u = e[6],
              l = e[7],
              c = i * i + n * n + a * a + s * s;
          return (
              c > 0
                  ? ((r[0] = (2 * (o * s + l * i + h * a - u * n)) / c), (r[1] = (2 * (h * s + l * n + u * i - o * a)) / c), (r[2] = (2 * (u * s + l * a + o * n - h * i)) / c))
                  : ((r[0] = 2 * (o * s + l * i + h * a - u * n)), (r[1] = 2 * (h * s + l * n + u * i - o * a)), (r[2] = 2 * (u * s + l * a + o * n - h * i))),
              yt(t, e, r),
              t
          );
      }
      function wt(t, e) {
          return (t[0] = e[12]), (t[1] = e[13]), (t[2] = e[14]), t;
      }
      function Et(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = e[4],
              s = e[5],
              o = e[6],
              h = e[8],
              u = e[9],
              l = e[10];
          return (t[0] = Math.sqrt(r * r + i * i + n * n)), (t[1] = Math.sqrt(a * a + s * s + o * o)), (t[2] = Math.sqrt(h * h + u * u + l * l)), t;
      }
      function At(t, e) {
          var r = e[0] + e[5] + e[10],
              i = 0;
          return (
              r > 0
                  ? ((i = 2 * Math.sqrt(r + 1)), (t[3] = 0.25 * i), (t[0] = (e[6] - e[9]) / i), (t[1] = (e[8] - e[2]) / i), (t[2] = (e[1] - e[4]) / i))
                  : e[0] > e[5] && e[0] > e[10]
                  ? ((i = 2 * Math.sqrt(1 + e[0] - e[5] - e[10])), (t[3] = (e[6] - e[9]) / i), (t[0] = 0.25 * i), (t[1] = (e[1] + e[4]) / i), (t[2] = (e[8] + e[2]) / i))
                  : e[5] > e[10]
                  ? ((i = 2 * Math.sqrt(1 + e[5] - e[0] - e[10])), (t[3] = (e[8] - e[2]) / i), (t[0] = (e[1] + e[4]) / i), (t[1] = 0.25 * i), (t[2] = (e[6] + e[9]) / i))
                  : ((i = 2 * Math.sqrt(1 + e[10] - e[0] - e[5])), (t[3] = (e[1] - e[4]) / i), (t[0] = (e[8] + e[2]) / i), (t[1] = (e[6] + e[9]) / i), (t[2] = 0.25 * i)),
              t
          );
      }
      function Mt(t, e, r, i) {
          var n = e[0],
              a = e[1],
              s = e[2],
              o = e[3],
              h = n + n,
              u = a + a,
              l = s + s,
              c = n * h,
              f = n * u,
              d = n * l,
              b = a * u,
              p = a * l,
              m = s * l,
              _ = o * h,
              g = o * u,
              v = o * l,
              x = i[0],
              y = i[1],
              T = i[2];
          return (
              (t[0] = (1 - (b + m)) * x),
              (t[1] = (f + v) * x),
              (t[2] = (d - g) * x),
              (t[3] = 0),
              (t[4] = (f - v) * y),
              (t[5] = (1 - (c + m)) * y),
              (t[6] = (p + _) * y),
              (t[7] = 0),
              (t[8] = (d + g) * T),
              (t[9] = (p - _) * T),
              (t[10] = (1 - (c + b)) * T),
              (t[11] = 0),
              (t[12] = r[0]),
              (t[13] = r[1]),
              (t[14] = r[2]),
              (t[15] = 1),
              t
          );
      }
      function Ft(t, e, r, i, n) {
          var a = e[0],
              s = e[1],
              o = e[2],
              h = e[3],
              u = a + a,
              l = s + s,
              c = o + o,
              f = a * u,
              d = a * l,
              b = a * c,
              p = s * l,
              m = s * c,
              _ = o * c,
              g = h * u,
              v = h * l,
              x = h * c,
              y = i[0],
              T = i[1],
              w = i[2],
              E = n[0],
              A = n[1],
              M = n[2],
              F = (1 - (p + _)) * y,
              R = (d + x) * y,
              S = (b - v) * y,
              C = (d - x) * T,
              P = (1 - (f + _)) * T,
              I = (m + g) * T,
              U = (b + v) * w,
              k = (m - g) * w,
              D = (1 - (f + p)) * w;
          return (
              (t[0] = F),
              (t[1] = R),
              (t[2] = S),
              (t[3] = 0),
              (t[4] = C),
              (t[5] = P),
              (t[6] = I),
              (t[7] = 0),
              (t[8] = U),
              (t[9] = k),
              (t[10] = D),
              (t[11] = 0),
              (t[12] = r[0] + E - (F * E + C * A + U * M)),
              (t[13] = r[1] + A - (R * E + P * A + k * M)),
              (t[14] = r[2] + M - (S * E + I * A + D * M)),
              (t[15] = 1),
              t
          );
      }
      function Rt(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = e[3],
              s = r + r,
              o = i + i,
              h = n + n,
              u = r * s,
              l = i * s,
              c = i * o,
              f = n * s,
              d = n * o,
              b = n * h,
              p = a * s,
              m = a * o,
              _ = a * h;
          return (
              (t[0] = 1 - c - b),
              (t[1] = l + _),
              (t[2] = f - m),
              (t[3] = 0),
              (t[4] = l - _),
              (t[5] = 1 - u - b),
              (t[6] = d + p),
              (t[7] = 0),
              (t[8] = f + m),
              (t[9] = d - p),
              (t[10] = 1 - u - c),
              (t[11] = 0),
              (t[12] = 0),
              (t[13] = 0),
              (t[14] = 0),
              (t[15] = 1),
              t
          );
      }
      function St(t, e, r, i, n, a, s) {
          var o = 1 / (r - e),
              h = 1 / (n - i),
              u = 1 / (a - s);
          return (
              (t[0] = 2 * a * o),
              (t[1] = 0),
              (t[2] = 0),
              (t[3] = 0),
              (t[4] = 0),
              (t[5] = 2 * a * h),
              (t[6] = 0),
              (t[7] = 0),
              (t[8] = (r + e) * o),
              (t[9] = (n + i) * h),
              (t[10] = (s + a) * u),
              (t[11] = -1),
              (t[12] = 0),
              (t[13] = 0),
              (t[14] = s * a * 2 * u),
              (t[15] = 0),
              t
          );
      }
      function Ct(t, e, r, i, n) {
          var a,
              s = 1 / Math.tan(e / 2);
          return (
              (t[0] = s / r),
              (t[1] = 0),
              (t[2] = 0),
              (t[3] = 0),
              (t[4] = 0),
              (t[5] = s),
              (t[6] = 0),
              (t[7] = 0),
              (t[8] = 0),
              (t[9] = 0),
              (t[11] = -1),
              (t[12] = 0),
              (t[13] = 0),
              (t[15] = 0),
              null != n && n !== 1 / 0 ? ((a = 1 / (i - n)), (t[10] = (n + i) * a), (t[14] = 2 * n * i * a)) : ((t[10] = -1), (t[14] = -2 * i)),
              t
          );
      }
      function Pt(t, e, r, i) {
          var n = Math.tan((e.upDegrees * Math.PI) / 180),
              a = Math.tan((e.downDegrees * Math.PI) / 180),
              s = Math.tan((e.leftDegrees * Math.PI) / 180),
              o = Math.tan((e.rightDegrees * Math.PI) / 180),
              h = 2 / (s + o),
              u = 2 / (n + a);
          return (
              (t[0] = h),
              (t[1] = 0),
              (t[2] = 0),
              (t[3] = 0),
              (t[4] = 0),
              (t[5] = u),
              (t[6] = 0),
              (t[7] = 0),
              (t[8] = -(s - o) * h * 0.5),
              (t[9] = (n - a) * u * 0.5),
              (t[10] = i / (r - i)),
              (t[11] = -1),
              (t[12] = 0),
              (t[13] = 0),
              (t[14] = (i * r) / (r - i)),
              (t[15] = 0),
              t
          );
      }
      function It(t, e, r, i, n, a, s) {
          var o = 1 / (e - r),
              h = 1 / (i - n),
              u = 1 / (a - s);
          return (
              (t[0] = -2 * o),
              (t[1] = 0),
              (t[2] = 0),
              (t[3] = 0),
              (t[4] = 0),
              (t[5] = -2 * h),
              (t[6] = 0),
              (t[7] = 0),
              (t[8] = 0),
              (t[9] = 0),
              (t[10] = 2 * u),
              (t[11] = 0),
              (t[12] = (e + r) * o),
              (t[13] = (n + i) * h),
              (t[14] = (s + a) * u),
              (t[15] = 1),
              t
          );
      }
      function Ut(t, e, r, i) {
          var n,
              a,
              s,
              o,
              h,
              u,
              l,
              c,
              f,
              d,
              b = e[0],
              p = e[1],
              _ = e[2],
              g = i[0],
              v = i[1],
              x = i[2],
              y = r[0],
              T = r[1],
              w = r[2];
          return Math.abs(b - y) < m && Math.abs(p - T) < m && Math.abs(_ - w) < m
              ? it(t)
              : ((l = b - y),
                (c = p - T),
                (f = _ - w),
                (n = v * (f *= d = 1 / Math.sqrt(l * l + c * c + f * f)) - x * (c *= d)),
                (a = x * (l *= d) - g * f),
                (s = g * c - v * l),
                (d = Math.sqrt(n * n + a * a + s * s)) ? ((n *= d = 1 / d), (a *= d), (s *= d)) : ((n = 0), (a = 0), (s = 0)),
                (o = c * s - f * a),
                (h = f * n - l * s),
                (u = l * a - c * n),
                (d = Math.sqrt(o * o + h * h + u * u)) ? ((o *= d = 1 / d), (h *= d), (u *= d)) : ((o = 0), (h = 0), (u = 0)),
                (t[0] = n),
                (t[1] = o),
                (t[2] = l),
                (t[3] = 0),
                (t[4] = a),
                (t[5] = h),
                (t[6] = c),
                (t[7] = 0),
                (t[8] = s),
                (t[9] = u),
                (t[10] = f),
                (t[11] = 0),
                (t[12] = -(n * b + a * p + s * _)),
                (t[13] = -(o * b + h * p + u * _)),
                (t[14] = -(l * b + c * p + f * _)),
                (t[15] = 1),
                t);
      }
      function kt(t, e, r, i) {
          var n = e[0],
              a = e[1],
              s = e[2],
              o = i[0],
              h = i[1],
              u = i[2],
              l = n - r[0],
              c = a - r[1],
              f = s - r[2],
              d = l * l + c * c + f * f;
          d > 0 && ((l *= d = 1 / Math.sqrt(d)), (c *= d), (f *= d));
          var b = h * f - u * c,
              p = u * l - o * f,
              m = o * c - h * l;
          return (
              (d = b * b + p * p + m * m) > 0 && ((b *= d = 1 / Math.sqrt(d)), (p *= d), (m *= d)),
              (t[0] = b),
              (t[1] = p),
              (t[2] = m),
              (t[3] = 0),
              (t[4] = c * m - f * p),
              (t[5] = f * b - l * m),
              (t[6] = l * p - c * b),
              (t[7] = 0),
              (t[8] = l),
              (t[9] = c),
              (t[10] = f),
              (t[11] = 0),
              (t[12] = n),
              (t[13] = a),
              (t[14] = s),
              (t[15] = 1),
              t
          );
      }
      function Dt(t) {
          return (
              "mat4(" +
              t[0] +
              ", " +
              t[1] +
              ", " +
              t[2] +
              ", " +
              t[3] +
              ", " +
              t[4] +
              ", " +
              t[5] +
              ", " +
              t[6] +
              ", " +
              t[7] +
              ", " +
              t[8] +
              ", " +
              t[9] +
              ", " +
              t[10] +
              ", " +
              t[11] +
              ", " +
              t[12] +
              ", " +
              t[13] +
              ", " +
              t[14] +
              ", " +
              t[15] +
              ")"
          );
      }
      function Ot(t) {
          return Math.sqrt(
              Math.pow(t[0], 2) +
                  Math.pow(t[1], 2) +
                  Math.pow(t[2], 2) +
                  Math.pow(t[3], 2) +
                  Math.pow(t[4], 2) +
                  Math.pow(t[5], 2) +
                  Math.pow(t[6], 2) +
                  Math.pow(t[7], 2) +
                  Math.pow(t[8], 2) +
                  Math.pow(t[9], 2) +
                  Math.pow(t[10], 2) +
                  Math.pow(t[11], 2) +
                  Math.pow(t[12], 2) +
                  Math.pow(t[13], 2) +
                  Math.pow(t[14], 2) +
                  Math.pow(t[15], 2)
          );
      }
      function Bt(t, e, r) {
          return (
              (t[0] = e[0] + r[0]),
              (t[1] = e[1] + r[1]),
              (t[2] = e[2] + r[2]),
              (t[3] = e[3] + r[3]),
              (t[4] = e[4] + r[4]),
              (t[5] = e[5] + r[5]),
              (t[6] = e[6] + r[6]),
              (t[7] = e[7] + r[7]),
              (t[8] = e[8] + r[8]),
              (t[9] = e[9] + r[9]),
              (t[10] = e[10] + r[10]),
              (t[11] = e[11] + r[11]),
              (t[12] = e[12] + r[12]),
              (t[13] = e[13] + r[13]),
              (t[14] = e[14] + r[14]),
              (t[15] = e[15] + r[15]),
              t
          );
      }
      function Nt(t, e, r) {
          return (
              (t[0] = e[0] - r[0]),
              (t[1] = e[1] - r[1]),
              (t[2] = e[2] - r[2]),
              (t[3] = e[3] - r[3]),
              (t[4] = e[4] - r[4]),
              (t[5] = e[5] - r[5]),
              (t[6] = e[6] - r[6]),
              (t[7] = e[7] - r[7]),
              (t[8] = e[8] - r[8]),
              (t[9] = e[9] - r[9]),
              (t[10] = e[10] - r[10]),
              (t[11] = e[11] - r[11]),
              (t[12] = e[12] - r[12]),
              (t[13] = e[13] - r[13]),
              (t[14] = e[14] - r[14]),
              (t[15] = e[15] - r[15]),
              t
          );
      }
      function Lt(t, e, r) {
          return (
              (t[0] = e[0] * r),
              (t[1] = e[1] * r),
              (t[2] = e[2] * r),
              (t[3] = e[3] * r),
              (t[4] = e[4] * r),
              (t[5] = e[5] * r),
              (t[6] = e[6] * r),
              (t[7] = e[7] * r),
              (t[8] = e[8] * r),
              (t[9] = e[9] * r),
              (t[10] = e[10] * r),
              (t[11] = e[11] * r),
              (t[12] = e[12] * r),
              (t[13] = e[13] * r),
              (t[14] = e[14] * r),
              (t[15] = e[15] * r),
              t
          );
      }
      function zt(t, e, r, i) {
          return (
              (t[0] = e[0] + r[0] * i),
              (t[1] = e[1] + r[1] * i),
              (t[2] = e[2] + r[2] * i),
              (t[3] = e[3] + r[3] * i),
              (t[4] = e[4] + r[4] * i),
              (t[5] = e[5] + r[5] * i),
              (t[6] = e[6] + r[6] * i),
              (t[7] = e[7] + r[7] * i),
              (t[8] = e[8] + r[8] * i),
              (t[9] = e[9] + r[9] * i),
              (t[10] = e[10] + r[10] * i),
              (t[11] = e[11] + r[11] * i),
              (t[12] = e[12] + r[12] * i),
              (t[13] = e[13] + r[13] * i),
              (t[14] = e[14] + r[14] * i),
              (t[15] = e[15] + r[15] * i),
              t
          );
      }
      function jt(t, e) {
          return (
              t[0] === e[0] &&
              t[1] === e[1] &&
              t[2] === e[2] &&
              t[3] === e[3] &&
              t[4] === e[4] &&
              t[5] === e[5] &&
              t[6] === e[6] &&
              t[7] === e[7] &&
              t[8] === e[8] &&
              t[9] === e[9] &&
              t[10] === e[10] &&
              t[11] === e[11] &&
              t[12] === e[12] &&
              t[13] === e[13] &&
              t[14] === e[14] &&
              t[15] === e[15]
          );
      }
      function Ht(t, e) {
          var r = t[0],
              i = t[1],
              n = t[2],
              a = t[3],
              s = t[4],
              o = t[5],
              h = t[6],
              u = t[7],
              l = t[8],
              c = t[9],
              f = t[10],
              d = t[11],
              b = t[12],
              p = t[13],
              _ = t[14],
              g = t[15],
              v = e[0],
              x = e[1],
              y = e[2],
              T = e[3],
              w = e[4],
              E = e[5],
              A = e[6],
              M = e[7],
              F = e[8],
              R = e[9],
              S = e[10],
              C = e[11],
              P = e[12],
              I = e[13],
              U = e[14],
              k = e[15];
          return (
              Math.abs(r - v) <= m * Math.max(1, Math.abs(r), Math.abs(v)) &&
              Math.abs(i - x) <= m * Math.max(1, Math.abs(i), Math.abs(x)) &&
              Math.abs(n - y) <= m * Math.max(1, Math.abs(n), Math.abs(y)) &&
              Math.abs(a - T) <= m * Math.max(1, Math.abs(a), Math.abs(T)) &&
              Math.abs(s - w) <= m * Math.max(1, Math.abs(s), Math.abs(w)) &&
              Math.abs(o - E) <= m * Math.max(1, Math.abs(o), Math.abs(E)) &&
              Math.abs(h - A) <= m * Math.max(1, Math.abs(h), Math.abs(A)) &&
              Math.abs(u - M) <= m * Math.max(1, Math.abs(u), Math.abs(M)) &&
              Math.abs(l - F) <= m * Math.max(1, Math.abs(l), Math.abs(F)) &&
              Math.abs(c - R) <= m * Math.max(1, Math.abs(c), Math.abs(R)) &&
              Math.abs(f - S) <= m * Math.max(1, Math.abs(f), Math.abs(S)) &&
              Math.abs(d - C) <= m * Math.max(1, Math.abs(d), Math.abs(C)) &&
              Math.abs(b - P) <= m * Math.max(1, Math.abs(b), Math.abs(P)) &&
              Math.abs(p - I) <= m * Math.max(1, Math.abs(p), Math.abs(I)) &&
              Math.abs(_ - U) <= m * Math.max(1, Math.abs(_), Math.abs(U)) &&
              Math.abs(g - k) <= m * Math.max(1, Math.abs(g), Math.abs(k))
          );
      }
      var Gt = ht,
          Vt = Nt;
      function qt() {
          var t = new _(3);
          return _ != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0)), t;
      }
      function Xt(t) {
          var e = new _(3);
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), e;
      }
      function Yt(t) {
          var e = t[0],
              r = t[1],
              i = t[2];
          return Math.sqrt(e * e + r * r + i * i);
      }
      function Zt(t, e, r) {
          var i = new _(3);
          return (i[0] = t), (i[1] = e), (i[2] = r), i;
      }
      function Wt(t, e) {
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t;
      }
      function Kt(t, e, r, i) {
          return (t[0] = e), (t[1] = r), (t[2] = i), t;
      }
      function Jt(t, e, r) {
          return (t[0] = e[0] + r[0]), (t[1] = e[1] + r[1]), (t[2] = e[2] + r[2]), t;
      }
      function Qt(t, e, r) {
          return (t[0] = e[0] - r[0]), (t[1] = e[1] - r[1]), (t[2] = e[2] - r[2]), t;
      }
      function $t(t, e, r) {
          return (t[0] = e[0] * r[0]), (t[1] = e[1] * r[1]), (t[2] = e[2] * r[2]), t;
      }
      function te(t, e, r) {
          return (t[0] = e[0] / r[0]), (t[1] = e[1] / r[1]), (t[2] = e[2] / r[2]), t;
      }
      function ee(t, e) {
          return (t[0] = Math.ceil(e[0])), (t[1] = Math.ceil(e[1])), (t[2] = Math.ceil(e[2])), t;
      }
      function re(t, e) {
          return (t[0] = Math.floor(e[0])), (t[1] = Math.floor(e[1])), (t[2] = Math.floor(e[2])), t;
      }
      function ie(t, e, r) {
          return (t[0] = Math.min(e[0], r[0])), (t[1] = Math.min(e[1], r[1])), (t[2] = Math.min(e[2], r[2])), t;
      }
      function ne(t, e, r) {
          return (t[0] = Math.max(e[0], r[0])), (t[1] = Math.max(e[1], r[1])), (t[2] = Math.max(e[2], r[2])), t;
      }
      function ae(t, e) {
          return (t[0] = Math.round(e[0])), (t[1] = Math.round(e[1])), (t[2] = Math.round(e[2])), t;
      }
      function se(t, e, r) {
          return (t[0] = e[0] * r), (t[1] = e[1] * r), (t[2] = e[2] * r), t;
      }
      function oe(t, e, r, i) {
          return (t[0] = e[0] + r[0] * i), (t[1] = e[1] + r[1] * i), (t[2] = e[2] + r[2] * i), t;
      }
      function he(t, e) {
          var r = e[0] - t[0],
              i = e[1] - t[1],
              n = e[2] - t[2];
          return Math.sqrt(r * r + i * i + n * n);
      }
      function ue(t, e) {
          var r = e[0] - t[0],
              i = e[1] - t[1],
              n = e[2] - t[2];
          return r * r + i * i + n * n;
      }
      function le(t) {
          var e = t[0],
              r = t[1],
              i = t[2];
          return e * e + r * r + i * i;
      }
      function ce(t, e) {
          return (t[0] = -e[0]), (t[1] = -e[1]), (t[2] = -e[2]), t;
      }
      function fe(t, e) {
          return (t[0] = 1 / e[0]), (t[1] = 1 / e[1]), (t[2] = 1 / e[2]), t;
      }
      function de(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = r * r + i * i + n * n;
          return a > 0 && (a = 1 / Math.sqrt(a)), (t[0] = e[0] * a), (t[1] = e[1] * a), (t[2] = e[2] * a), t;
      }
      function be(t, e) {
          return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
      }
      function pe(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2],
              s = r[0],
              o = r[1],
              h = r[2];
          return (t[0] = n * h - a * o), (t[1] = a * s - i * h), (t[2] = i * o - n * s), t;
      }
      function me(t, e, r, i) {
          var n = e[0],
              a = e[1],
              s = e[2];
          return (t[0] = n + i * (r[0] - n)), (t[1] = a + i * (r[1] - a)), (t[2] = s + i * (r[2] - s)), t;
      }
      function _e(t, e, r, i, n, a) {
          var s = a * a,
              o = s * (2 * a - 3) + 1,
              h = s * (a - 2) + a,
              u = s * (a - 1),
              l = s * (3 - 2 * a);
          return (t[0] = e[0] * o + r[0] * h + i[0] * u + n[0] * l), (t[1] = e[1] * o + r[1] * h + i[1] * u + n[1] * l), (t[2] = e[2] * o + r[2] * h + i[2] * u + n[2] * l), t;
      }
      function ge(t, e, r, i, n, a) {
          var s = 1 - a,
              o = s * s,
              h = a * a,
              u = o * s,
              l = 3 * a * o,
              c = 3 * h * s,
              f = h * a;
          return (t[0] = e[0] * u + r[0] * l + i[0] * c + n[0] * f), (t[1] = e[1] * u + r[1] * l + i[1] * c + n[1] * f), (t[2] = e[2] * u + r[2] * l + i[2] * c + n[2] * f), t;
      }
      function ve(t, e) {
          e = e || 1;
          var r = 2 * g() * Math.PI,
              i = 2 * g() - 1,
              n = Math.sqrt(1 - i * i) * e;
          return (t[0] = Math.cos(r) * n), (t[1] = Math.sin(r) * n), (t[2] = i * e), t;
      }
      function xe(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2],
              s = r[3] * i + r[7] * n + r[11] * a + r[15];
          return (s = s || 1), (t[0] = (r[0] * i + r[4] * n + r[8] * a + r[12]) / s), (t[1] = (r[1] * i + r[5] * n + r[9] * a + r[13]) / s), (t[2] = (r[2] * i + r[6] * n + r[10] * a + r[14]) / s), t;
      }
      function ye(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2];
          return (t[0] = i * r[0] + n * r[3] + a * r[6]), (t[1] = i * r[1] + n * r[4] + a * r[7]), (t[2] = i * r[2] + n * r[5] + a * r[8]), t;
      }
      function Te(t, e, r) {
          var i = r[0],
              n = r[1],
              a = r[2],
              s = r[3],
              o = e[0],
              h = e[1],
              u = e[2],
              l = n * u - a * h,
              c = a * o - i * u,
              f = i * h - n * o,
              d = n * f - a * c,
              b = a * l - i * f,
              p = i * c - n * l,
              m = 2 * s;
          return (l *= m), (c *= m), (f *= m), (d *= 2), (b *= 2), (p *= 2), (t[0] = o + l + d), (t[1] = h + c + b), (t[2] = u + f + p), t;
      }
      function we(t, e, r, i) {
          var n = [],
              a = [];
          return (
              (n[0] = e[0] - r[0]),
              (n[1] = e[1] - r[1]),
              (n[2] = e[2] - r[2]),
              (a[0] = n[0]),
              (a[1] = n[1] * Math.cos(i) - n[2] * Math.sin(i)),
              (a[2] = n[1] * Math.sin(i) + n[2] * Math.cos(i)),
              (t[0] = a[0] + r[0]),
              (t[1] = a[1] + r[1]),
              (t[2] = a[2] + r[2]),
              t
          );
      }
      function Ee(t, e, r, i) {
          var n = [],
              a = [];
          return (
              (n[0] = e[0] - r[0]),
              (n[1] = e[1] - r[1]),
              (n[2] = e[2] - r[2]),
              (a[0] = n[2] * Math.sin(i) + n[0] * Math.cos(i)),
              (a[1] = n[1]),
              (a[2] = n[2] * Math.cos(i) - n[0] * Math.sin(i)),
              (t[0] = a[0] + r[0]),
              (t[1] = a[1] + r[1]),
              (t[2] = a[2] + r[2]),
              t
          );
      }
      function Ae(t, e, r, i) {
          var n = [],
              a = [];
          return (
              (n[0] = e[0] - r[0]),
              (n[1] = e[1] - r[1]),
              (n[2] = e[2] - r[2]),
              (a[0] = n[0] * Math.cos(i) - n[1] * Math.sin(i)),
              (a[1] = n[0] * Math.sin(i) + n[1] * Math.cos(i)),
              (a[2] = n[2]),
              (t[0] = a[0] + r[0]),
              (t[1] = a[1] + r[1]),
              (t[2] = a[2] + r[2]),
              t
          );
      }
      function Me(t, e) {
          var r = Zt(t[0], t[1], t[2]),
              i = Zt(e[0], e[1], e[2]);
          de(r, r), de(i, i);
          var n = be(r, i);
          return n > 1 ? 0 : n < -1 ? Math.PI : Math.acos(n);
      }
      function Fe(t) {
          return (t[0] = 0), (t[1] = 0), (t[2] = 0), t;
      }
      function Re(t) {
          return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
      }
      function Se(t, e) {
          return t[0] === e[0] && t[1] === e[1] && t[2] === e[2];
      }
      function Ce(t, e) {
          var r = t[0],
              i = t[1],
              n = t[2],
              a = e[0],
              s = e[1],
              o = e[2];
          return Math.abs(r - a) <= m * Math.max(1, Math.abs(r), Math.abs(a)) && Math.abs(i - s) <= m * Math.max(1, Math.abs(i), Math.abs(s)) && Math.abs(n - o) <= m * Math.max(1, Math.abs(n), Math.abs(o));
      }
      var Pe,
          Ie = Qt,
          Ue = $t,
          ke = te,
          De = he,
          Oe = ue,
          Be = Yt,
          Ne = le,
          Le =
              ((Pe = qt()),
              function (t, e, r, i, n, a) {
                  var s, o;
                  for (e || (e = 3), r || (r = 0), o = i ? Math.min(i * e + r, t.length) : t.length, s = r; s < o; s += e)
                      (Pe[0] = t[s]), (Pe[1] = t[s + 1]), (Pe[2] = t[s + 2]), n(Pe, Pe, a), (t[s] = Pe[0]), (t[s + 1] = Pe[1]), (t[s + 2] = Pe[2]);
                  return t;
              });
      function ze() {
          var t = new _(4);
          return _ != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 0)), t;
      }
      function je(t) {
          var e = new _(4);
          return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
      }
      function He(t, e, r, i) {
          var n = new _(4);
          return (n[0] = t), (n[1] = e), (n[2] = r), (n[3] = i), n;
      }
      function Ge(t, e) {
          return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
      }
      function Ve(t, e, r, i, n) {
          return (t[0] = e), (t[1] = r), (t[2] = i), (t[3] = n), t;
      }
      function qe(t, e, r) {
          return (t[0] = e[0] + r[0]), (t[1] = e[1] + r[1]), (t[2] = e[2] + r[2]), (t[3] = e[3] + r[3]), t;
      }
      function Xe(t, e, r) {
          return (t[0] = e[0] - r[0]), (t[1] = e[1] - r[1]), (t[2] = e[2] - r[2]), (t[3] = e[3] - r[3]), t;
      }
      function Ye(t, e, r) {
          return (t[0] = e[0] * r[0]), (t[1] = e[1] * r[1]), (t[2] = e[2] * r[2]), (t[3] = e[3] * r[3]), t;
      }
      function Ze(t, e, r) {
          return (t[0] = e[0] / r[0]), (t[1] = e[1] / r[1]), (t[2] = e[2] / r[2]), (t[3] = e[3] / r[3]), t;
      }
      function We(t, e) {
          return (t[0] = Math.ceil(e[0])), (t[1] = Math.ceil(e[1])), (t[2] = Math.ceil(e[2])), (t[3] = Math.ceil(e[3])), t;
      }
      function Ke(t, e) {
          return (t[0] = Math.floor(e[0])), (t[1] = Math.floor(e[1])), (t[2] = Math.floor(e[2])), (t[3] = Math.floor(e[3])), t;
      }
      function Je(t, e, r) {
          return (t[0] = Math.min(e[0], r[0])), (t[1] = Math.min(e[1], r[1])), (t[2] = Math.min(e[2], r[2])), (t[3] = Math.min(e[3], r[3])), t;
      }
      function Qe(t, e, r) {
          return (t[0] = Math.max(e[0], r[0])), (t[1] = Math.max(e[1], r[1])), (t[2] = Math.max(e[2], r[2])), (t[3] = Math.max(e[3], r[3])), t;
      }
      function $e(t, e) {
          return (t[0] = Math.round(e[0])), (t[1] = Math.round(e[1])), (t[2] = Math.round(e[2])), (t[3] = Math.round(e[3])), t;
      }
      function tr(t, e, r) {
          return (t[0] = e[0] * r), (t[1] = e[1] * r), (t[2] = e[2] * r), (t[3] = e[3] * r), t;
      }
      function er(t, e, r, i) {
          return (t[0] = e[0] + r[0] * i), (t[1] = e[1] + r[1] * i), (t[2] = e[2] + r[2] * i), (t[3] = e[3] + r[3] * i), t;
      }
      function rr(t, e) {
          var r = e[0] - t[0],
              i = e[1] - t[1],
              n = e[2] - t[2],
              a = e[3] - t[3];
          return Math.sqrt(r * r + i * i + n * n + a * a);
      }
      function ir(t, e) {
          var r = e[0] - t[0],
              i = e[1] - t[1],
              n = e[2] - t[2],
              a = e[3] - t[3];
          return r * r + i * i + n * n + a * a;
      }
      function nr(t) {
          var e = t[0],
              r = t[1],
              i = t[2],
              n = t[3];
          return Math.sqrt(e * e + r * r + i * i + n * n);
      }
      function ar(t) {
          var e = t[0],
              r = t[1],
              i = t[2],
              n = t[3];
          return e * e + r * r + i * i + n * n;
      }
      function sr(t, e) {
          return (t[0] = -e[0]), (t[1] = -e[1]), (t[2] = -e[2]), (t[3] = -e[3]), t;
      }
      function or(t, e) {
          return (t[0] = 1 / e[0]), (t[1] = 1 / e[1]), (t[2] = 1 / e[2]), (t[3] = 1 / e[3]), t;
      }
      function hr(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = e[3],
              s = r * r + i * i + n * n + a * a;
          return s > 0 && (s = 1 / Math.sqrt(s)), (t[0] = r * s), (t[1] = i * s), (t[2] = n * s), (t[3] = a * s), t;
      }
      function ur(t, e) {
          return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3];
      }
      function lr(t, e, r, i) {
          var n = r[0] * i[1] - r[1] * i[0],
              a = r[0] * i[2] - r[2] * i[0],
              s = r[0] * i[3] - r[3] * i[0],
              o = r[1] * i[2] - r[2] * i[1],
              h = r[1] * i[3] - r[3] * i[1],
              u = r[2] * i[3] - r[3] * i[2],
              l = e[0],
              c = e[1],
              f = e[2],
              d = e[3];
          return (t[0] = c * u - f * h + d * o), (t[1] = -l * u + f * s - d * a), (t[2] = l * h - c * s + d * n), (t[3] = -l * o + c * a - f * n), t;
      }
      function cr(t, e, r, i) {
          var n = e[0],
              a = e[1],
              s = e[2],
              o = e[3];
          return (t[0] = n + i * (r[0] - n)), (t[1] = a + i * (r[1] - a)), (t[2] = s + i * (r[2] - s)), (t[3] = o + i * (r[3] - o)), t;
      }
      function fr(t, e) {
          var r, i, n, a, s, o;
          e = e || 1;
          do {
              s = (r = 2 * g() - 1) * r + (i = 2 * g() - 1) * i;
          } while (s >= 1);
          do {
              o = (n = 2 * g() - 1) * n + (a = 2 * g() - 1) * a;
          } while (o >= 1);
          var h = Math.sqrt((1 - s) / o);
          return (t[0] = e * r), (t[1] = e * i), (t[2] = e * n * h), (t[3] = e * a * h), t;
      }
      function dr(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2],
              s = e[3];
          return (t[0] = r[0] * i + r[4] * n + r[8] * a + r[12] * s), (t[1] = r[1] * i + r[5] * n + r[9] * a + r[13] * s), (t[2] = r[2] * i + r[6] * n + r[10] * a + r[14] * s), (t[3] = r[3] * i + r[7] * n + r[11] * a + r[15] * s), t;
      }
      function br(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2],
              s = r[0],
              o = r[1],
              h = r[2],
              u = r[3],
              l = u * i + o * a - h * n,
              c = u * n + h * i - s * a,
              f = u * a + s * n - o * i,
              d = -s * i - o * n - h * a;
          return (t[0] = l * u + d * -s + c * -h - f * -o), (t[1] = c * u + d * -o + f * -s - l * -h), (t[2] = f * u + d * -h + l * -o - c * -s), (t[3] = e[3]), t;
      }
      function pr(t) {
          return (t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 0), t;
      }
      function mr(t) {
          return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
      }
      function _r(t, e) {
          return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3];
      }
      function gr(t, e) {
          var r = t[0],
              i = t[1],
              n = t[2],
              a = t[3],
              s = e[0],
              o = e[1],
              h = e[2],
              u = e[3];
          return (
              Math.abs(r - s) <= m * Math.max(1, Math.abs(r), Math.abs(s)) &&
              Math.abs(i - o) <= m * Math.max(1, Math.abs(i), Math.abs(o)) &&
              Math.abs(n - h) <= m * Math.max(1, Math.abs(n), Math.abs(h)) &&
              Math.abs(a - u) <= m * Math.max(1, Math.abs(a), Math.abs(u))
          );
      }
      var vr = Xe,
          xr = Ye,
          yr = Ze,
          Tr = rr,
          wr = ir,
          Er = nr,
          Ar = ar,
          Mr = (function () {
              var t = ze();
              return function (e, r, i, n, a, s) {
                  var o, h;
                  for (r || (r = 4), i || (i = 0), h = n ? Math.min(n * r + i, e.length) : e.length, o = i; o < h; o += r)
                      (t[0] = e[o]), (t[1] = e[o + 1]), (t[2] = e[o + 2]), (t[3] = e[o + 3]), a(t, t, s), (e[o] = t[0]), (e[o + 1] = t[1]), (e[o + 2] = t[2]), (e[o + 3] = t[3]);
                  return e;
              };
          })();
      function Fr() {
          var t = new _(4);
          return _ != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0)), (t[3] = 1), t;
      }
      function Rr(t) {
          return (t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 1), t;
      }
      function Sr(t, e, r) {
          r *= 0.5;
          var i = Math.sin(r);
          return (t[0] = i * e[0]), (t[1] = i * e[1]), (t[2] = i * e[2]), (t[3] = Math.cos(r)), t;
      }
      function Cr(t, e) {
          var r = 2 * Math.acos(e[3]),
              i = Math.sin(r / 2);
          return i > m ? ((t[0] = e[0] / i), (t[1] = e[1] / i), (t[2] = e[2] / i)) : ((t[0] = 1), (t[1] = 0), (t[2] = 0)), r;
      }
      function Pr(t, e, r) {
          var i = e[0],
              n = e[1],
              a = e[2],
              s = e[3],
              o = r[0],
              h = r[1],
              u = r[2],
              l = r[3];
          return (t[0] = i * l + s * o + n * u - a * h), (t[1] = n * l + s * h + a * o - i * u), (t[2] = a * l + s * u + i * h - n * o), (t[3] = s * l - i * o - n * h - a * u), t;
      }
      function Ir(t, e, r) {
          r *= 0.5;
          var i = e[0],
              n = e[1],
              a = e[2],
              s = e[3],
              o = Math.sin(r),
              h = Math.cos(r);
          return (t[0] = i * h + s * o), (t[1] = n * h + a * o), (t[2] = a * h - n * o), (t[3] = s * h - i * o), t;
      }
      function Ur(t, e, r) {
          r *= 0.5;
          var i = e[0],
              n = e[1],
              a = e[2],
              s = e[3],
              o = Math.sin(r),
              h = Math.cos(r);
          return (t[0] = i * h - a * o), (t[1] = n * h + s * o), (t[2] = a * h + i * o), (t[3] = s * h - n * o), t;
      }
      function kr(t, e, r) {
          r *= 0.5;
          var i = e[0],
              n = e[1],
              a = e[2],
              s = e[3],
              o = Math.sin(r),
              h = Math.cos(r);
          return (t[0] = i * h + n * o), (t[1] = n * h - i * o), (t[2] = a * h + s * o), (t[3] = s * h - a * o), t;
      }
      function Dr(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2];
          return (t[0] = r), (t[1] = i), (t[2] = n), (t[3] = Math.sqrt(Math.abs(1 - r * r - i * i - n * n))), t;
      }
      function Or(t, e, r, i) {
          var n,
              a,
              s,
              o,
              h,
              u = e[0],
              l = e[1],
              c = e[2],
              f = e[3],
              d = r[0],
              b = r[1],
              p = r[2],
              _ = r[3];
          return (
              (a = u * d + l * b + c * p + f * _) < 0 && ((a = -a), (d = -d), (b = -b), (p = -p), (_ = -_)),
              1 - a > m ? ((n = Math.acos(a)), (s = Math.sin(n)), (o = Math.sin((1 - i) * n) / s), (h = Math.sin(i * n) / s)) : ((o = 1 - i), (h = i)),
              (t[0] = o * u + h * d),
              (t[1] = o * l + h * b),
              (t[2] = o * c + h * p),
              (t[3] = o * f + h * _),
              t
          );
      }
      function Br(t) {
          var e = g(),
              r = g(),
              i = g(),
              n = Math.sqrt(1 - e),
              a = Math.sqrt(e);
          return (t[0] = n * Math.sin(2 * Math.PI * r)), (t[1] = n * Math.cos(2 * Math.PI * r)), (t[2] = a * Math.sin(2 * Math.PI * i)), (t[3] = a * Math.cos(2 * Math.PI * i)), t;
      }
      function Nr(t, e) {
          var r = e[0],
              i = e[1],
              n = e[2],
              a = e[3],
              s = r * r + i * i + n * n + a * a,
              o = s ? 1 / s : 0;
          return (t[0] = -r * o), (t[1] = -i * o), (t[2] = -n * o), (t[3] = a * o), t;
      }
      function Lr(t, e) {
          return (t[0] = -e[0]), (t[1] = -e[1]), (t[2] = -e[2]), (t[3] = e[3]), t;
      }
      function zr(t, e) {
          var r,
              i = e[0] + e[4] + e[8];
          if (i > 0) (r = Math.sqrt(i + 1)), (t[3] = 0.5 * r), (r = 0.5 / r), (t[0] = (e[5] - e[7]) * r), (t[1] = (e[6] - e[2]) * r), (t[2] = (e[1] - e[3]) * r);
          else {
              var n = 0;
              e[4] > e[0] && (n = 1), e[8] > e[3 * n + n] && (n = 2);
              var a = (n + 1) % 3,
                  s = (n + 2) % 3;
              (r = Math.sqrt(e[3 * n + n] - e[3 * a + a] - e[3 * s + s] + 1)),
                  (t[n] = 0.5 * r),
                  (r = 0.5 / r),
                  (t[3] = (e[3 * a + s] - e[3 * s + a]) * r),
                  (t[a] = (e[3 * a + n] + e[3 * n + a]) * r),
                  (t[s] = (e[3 * s + n] + e[3 * n + s]) * r);
          }
          return t;
      }
      function jr(t, e, r, i) {
          var n = (0.5 * Math.PI) / 180;
          (e *= n), (r *= n), (i *= n);
          var a = Math.sin(e),
              s = Math.cos(e),
              o = Math.sin(r),
              h = Math.cos(r),
              u = Math.sin(i),
              l = Math.cos(i);
          return (t[0] = a * h * l - s * o * u), (t[1] = s * o * l + a * h * u), (t[2] = s * h * u - a * o * l), (t[3] = s * h * l + a * o * u), t;
      }
      function Hr(t) {
          return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
      }
      var Gr,
          Vr,
          qr,
          Xr,
          Yr,
          Zr,
          Wr = je,
          Kr = He,
          Jr = Ge,
          Qr = Ve,
          $r = qe,
          ti = Pr,
          ei = tr,
          ri = ur,
          ii = cr,
          ni = nr,
          ai = ni,
          si = ar,
          oi = si,
          hi = hr,
          ui = _r,
          li = gr,
          ci =
              ((Gr = qt()),
              (Vr = Zt(1, 0, 0)),
              (qr = Zt(0, 1, 0)),
              function (t, e, r) {
                  var i = be(e, r);
                  return i < -0.999999
                      ? (pe(Gr, Vr, e), Be(Gr) < 1e-6 && pe(Gr, qr, e), de(Gr, Gr), Sr(t, Gr, Math.PI), t)
                      : i > 0.999999
                      ? ((t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 1), t)
                      : (pe(Gr, e, r), (t[0] = Gr[0]), (t[1] = Gr[1]), (t[2] = Gr[2]), (t[3] = 1 + i), hi(t, t));
              }),
          fi =
              ((Xr = Fr()),
              (Yr = Fr()),
              function (t, e, r, i, n, a) {
                  return Or(Xr, e, n, a), Or(Yr, r, i, a), Or(t, Xr, Yr, 2 * a * (1 - a)), t;
              }),
          di =
              ((Zr = v()),
              function (t, e, r, i) {
                  return (Zr[0] = r[0]), (Zr[3] = r[1]), (Zr[6] = r[2]), (Zr[1] = i[0]), (Zr[4] = i[1]), (Zr[7] = i[2]), (Zr[2] = -e[0]), (Zr[5] = -e[1]), (Zr[8] = -e[2]), hi(t, zr(t, Zr));
              });
      function bi() {
          var t = new _(2);
          return _ != Float32Array && ((t[0] = 0), (t[1] = 0)), t;
      }
      function pi(t) {
          var e = new _(2);
          return (e[0] = t[0]), (e[1] = t[1]), e;
      }
      function mi(t, e) {
          var r = new _(2);
          return (r[0] = t), (r[1] = e), r;
      }
      function _i(t, e) {
          return (t[0] = e[0]), (t[1] = e[1]), t;
      }
      function gi(t, e, r) {
          return (t[0] = e), (t[1] = r), t;
      }
      function vi(t, e, r) {
          return (t[0] = e[0] + r[0]), (t[1] = e[1] + r[1]), t;
      }
      function xi(t, e, r) {
          return (t[0] = e[0] - r[0]), (t[1] = e[1] - r[1]), t;
      }
      function yi(t, e, r) {
          return (t[0] = e[0] * r[0]), (t[1] = e[1] * r[1]), t;
      }
      function Ti(t, e, r) {
          return (t[0] = e[0] / r[0]), (t[1] = e[1] / r[1]), t;
      }
      function wi(t, e) {
          return (t[0] = Math.ceil(e[0])), (t[1] = Math.ceil(e[1])), t;
      }
      function Ei(t, e) {
          return (t[0] = Math.floor(e[0])), (t[1] = Math.floor(e[1])), t;
      }
      function Ai(t, e, r) {
          return (t[0] = Math.min(e[0], r[0])), (t[1] = Math.min(e[1], r[1])), t;
      }
      function Mi(t, e, r) {
          return (t[0] = Math.max(e[0], r[0])), (t[1] = Math.max(e[1], r[1])), t;
      }
      function Fi(t, e) {
          return (t[0] = Math.round(e[0])), (t[1] = Math.round(e[1])), t;
      }
      function Ri(t, e, r) {
          return (t[0] = e[0] * r), (t[1] = e[1] * r), t;
      }
      function Si(t, e, r, i) {
          return (t[0] = e[0] + r[0] * i), (t[1] = e[1] + r[1] * i), t;
      }
      function Ci(t, e) {
          var r = e[0] - t[0],
              i = e[1] - t[1];
          return Math.sqrt(r * r + i * i);
      }
      function Pi(t, e) {
          var r = e[0] - t[0],
              i = e[1] - t[1];
          return r * r + i * i;
      }
      function Ii(t) {
          var e = t[0],
              r = t[1];
          return Math.sqrt(e * e + r * r);
      }
      function Ui(t) {
          var e = t[0],
              r = t[1];
          return e * e + r * r;
      }
      function ki(t, e) {
          return (t[0] = -e[0]), (t[1] = -e[1]), t;
      }
      function Di(t, e) {
          return (t[0] = 1 / e[0]), (t[1] = 1 / e[1]), t;
      }
      function Oi(t, e) {
          var r = e[0],
              i = e[1],
              n = r * r + i * i;
          return n > 0 && (n = 1 / Math.sqrt(n)), (t[0] = e[0] * n), (t[1] = e[1] * n), t;
      }
      function Bi(t, e) {
          return t[0] * e[0] + t[1] * e[1];
      }
      function Ni(t, e, r) {
          var i = e[0] * r[1] - e[1] * r[0];
          return (t[0] = t[1] = 0), (t[2] = i), t;
      }
      function Li(t, e, r, i) {
          var n = e[0],
              a = e[1];
          return (t[0] = n + i * (r[0] - n)), (t[1] = a + i * (r[1] - a)), t;
      }
      function zi(t, e) {
          e = e || 1;
          var r = 2 * g() * Math.PI;
          return (t[0] = Math.cos(r) * e), (t[1] = Math.sin(r) * e), t;
      }
      function ji(t, e, r) {
          var i = e[0],
              n = e[1];
          return (t[0] = r[0] * i + r[2] * n), (t[1] = r[1] * i + r[3] * n), t;
      }
      function Hi(t, e, r) {
          var i = e[0],
              n = e[1];
          return (t[0] = r[0] * i + r[2] * n + r[4]), (t[1] = r[1] * i + r[3] * n + r[5]), t;
      }
      function Gi(t, e, r) {
          var i = e[0],
              n = e[1];
          return (t[0] = r[0] * i + r[3] * n + r[6]), (t[1] = r[1] * i + r[4] * n + r[7]), t;
      }
      function Vi(t, e, r) {
          var i = e[0],
              n = e[1];
          return (t[0] = r[0] * i + r[4] * n + r[12]), (t[1] = r[1] * i + r[5] * n + r[13]), t;
      }
      function qi(t, e, r, i) {
          var n = e[0] - r[0],
              a = e[1] - r[1],
              s = Math.sin(i),
              o = Math.cos(i);
          return (t[0] = n * o - a * s + r[0]), (t[1] = n * s + a * o + r[1]), t;
      }
      function Xi(t, e) {
          var r = t[0],
              i = t[1],
              n = e[0],
              a = e[1],
              s = r * r + i * i;
          s > 0 && (s = 1 / Math.sqrt(s));
          var o = n * n + a * a;
          o > 0 && (o = 1 / Math.sqrt(o));
          var h = (r * n + i * a) * s * o;
          return h > 1 ? 0 : h < -1 ? Math.PI : Math.acos(h);
      }
      function Yi(t) {
          return (t[0] = 0), (t[1] = 0), t;
      }
      function Zi(t) {
          return "vec2(" + t[0] + ", " + t[1] + ")";
      }
      function Wi(t, e) {
          return t[0] === e[0] && t[1] === e[1];
      }
      function Ki(t, e) {
          var r = t[0],
              i = t[1],
              n = e[0],
              a = e[1];
          return Math.abs(r - n) <= m * Math.max(1, Math.abs(r), Math.abs(n)) && Math.abs(i - a) <= m * Math.max(1, Math.abs(i), Math.abs(a));
      }
      var Ji = Ii,
          Qi = xi,
          $i = yi,
          tn = Ti,
          en = Ci,
          rn = Pi,
          nn = Ui,
          an = (function () {
              var t = bi();
              return function (e, r, i, n, a, s) {
                  var o, h;
                  for (r || (r = 2), i || (i = 0), h = n ? Math.min(n * r + i, e.length) : e.length, o = i; o < h; o += r) (t[0] = e[o]), (t[1] = e[o + 1]), a(t, t, s), (e[o] = t[0]), (e[o + 1] = t[1]);
                  return e;
              };
          })();
      const sn = { 147259: !0 },
          on = { 28060: !0, 28063: !0, 28082: !0, 41903: !0, 42147: !0, 44808: !0, 45271: !0 },
          hn = { ITEM: 1, HELM: 2, SHOULDER: 4, NPC: 8, CHARACTER: 16, HUMANOIDNPC: 32, OBJECT: 64, ARMOR: 128, PATH: 256, ITEMVISUAL: 512, COLLECTION: 1024 },
          un = { WARRIOR: 1, PALADIN: 2, HUNTER: 3, ROGUE: 4, PRIEST: 5, DEATHKNIGHT: 6, SHAMAN: 7, MAGE: 8, WARLOCK: 9, MONK: 10, DRUID: 11, DEMONHUNTER: 12 },
          ln = { MALE: 0, FEMALE: 1, 0: "male", 1: "female" },
          cn = {
              HUMAN: 1,
              ORC: 2,
              DWARF: 3,
              NIGHTELF: 4,
              SCOURGE: 5,
              TAUREN: 6,
              GNOME: 7,
              TROLL: 8,
              GOBLIN: 9,
              BLOODELF: 10,
              DRAENEI: 11,
              FELORC: 12,
              NAGA: 13,
              BROKEN: 14,
              SKELETON: 15,
              VRYKUL: 16,
              TUSKARR: 17,
              FORESTTROLL: 18,
              TAUNKA: 19,
              NORTHRENDSKELETON: 20,
              ICETROLL: 21,
              WORGEN: 22,
              WORGENHUMAN: 23,
              PANDAREN: 24,
              PANDAREN_A: 25,
              PANDAREN_H: 26,
              NIGHTBORNE: 27,
              HIGHMOUNTAINTAUREN: 28,
              VOIDELF: 29,
              LIGHTFORGEDDRAENEI: 30,
              ZANDALARITROLL: 31,
              KULTIRAN: 32,
              THINHUMAN: 33,
              DARKIRONDWARF: 34,
              VULPERA: 35,
              MAGHARORC: 36,
              MECHAGNOME: 37,
              1: "human",
              2: "orc",
              3: "dwarf",
              4: "nightelf",
              5: "scourge",
              6: "tauren",
              7: "gnome",
              8: "troll",
              9: "goblin",
              10: "bloodelf",
              11: "draenei",
              12: "felorc",
              13: "naga_",
              14: "broken",
              15: "skeleton",
              16: "vrykul",
              17: "tuskarr",
              18: "foresttroll",
              19: "taunka",
              20: "northrendskeleton",
              21: "icetroll",
              22: "worgen",
              23: "gilnean",
              24: "pandaren",
              25: "pandarena",
              26: "pandarenh",
              27: "nightborne",
              28: "highmountaintauren",
              29: "voidelf",
              30: "lightforgeddraenei",
              31: "zandalaritroll",
              32: "kultiran",
              33: "thinhuman",
              34: "darkirondwarf",
              35: "vulpera",
              36: "magharorc",
              37: "mechagnome",
          },
          fn = [0, 1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 0, 0, 21, 22, 22, 16, 21, 0, 19, 5, 21, 22, 22, 0, 21, 21, 27],
          dn = [0, 16, 0, 15, 1, 8, 10, 5, 6, 6, 7, 0, 0, 17, 18, 19, 14, 20, 0, 9, 8, 21, 22, 23, 0, 24, 25, 0],
          bn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          pn = [0, 2, 0, 4, 128, 128, 128, 128, 128, 128, 128, 0, 0, 1, 1, 1, 128, 1, 0, 128, 128, 1, 1, 1, 0, 1, 1, 2],
          mn = {
              HEAD: 1,
              SHOULDER: 3,
              SHIRT: 4,
              CHEST: 5,
              BELT: 6,
              PANTS: 7,
              BOOTS: 8,
              BRACERS: 9,
              HANDS: 10,
              ONEHAND: 13,
              SHIELD: 14,
              BOW: 15,
              CAPE: 16,
              TWOHAND: 17,
              TABARD: 19,
              ROBE: 20,
              RIGHTHAND: 21,
              LEFTHAND: 22,
              OFFHAND: 23,
              THROWN: 25,
              RANGED: 26,
          },
          _n = { Skin: 0, Face: 1, FacialHair: 2, Hair: 3, Underwear: 4, Custom1: 5, Custom2: 6, Custom3: 7 },
          gn = [
              [0, 5],
              [1, 6],
              [2, 7],
              [3, 8],
              [4, 9],
              [10, 11],
              [12, 13],
              [14, 15],
          ],
          vn = { 1: [5, 5, 13, 0], 2: [5, 5, 13, 0], 4: [5, 5, 12, 12], 10: [5, 5, 12, 12], 27: [5, 5, 13, 0], 28: [5, 5, 13, 0], 30: [5, 5, 12, 0], 31: [5, 5, 13, 0], 34: [6, 5, 13, 0], 35: [5, 5, 13, 0] },
          xn = {
              ArmUpper: 0,
              ArmLower: 1,
              Hand: 2,
              TorsoUpper: 3,
              TorsoLower: 4,
              LegUpper: 5,
              LegLower: 6,
              Foot: 7,
              Accessory: 8,
              FaceUpper: 9,
              FaceLower: 10,
              Unused: 11,
              Base: 12,
              Unknown735: 13,
              old: [
                  { x: 0, y: 0, w: 0.5, h: 0.25 },
                  { x: 0, y: 0.25, w: 0.5, h: 0.25 },
                  { x: 0, y: 0.5, w: 0.5, h: 0.125 },
                  { x: 0.5, y: 0, w: 0.5, h: 0.25 },
                  { x: 0.5, y: 0.25, w: 0.5, h: 0.125 },
                  { x: 0.5, y: 0.375, w: 0.5, h: 0.25 },
                  { x: 0.5, y: 0.625, w: 0.5, h: 0.25 },
                  { x: 0.5, y: 0.875, w: 0.5, h: 0.125 },
                  {},
                  { x: 0, y: 0.625, w: 0.5, h: 0.125 },
                  { x: 0, y: 0.75, w: 0.5, h: 0.25 },
                  {},
                  { x: 0, y: 0, w: 1, h: 1 },
                  { x: 0, y: 0, w: 1, h: 1 },
              ],
              new: [
                  { x: 0, y: 0, w: 0.25, h: 0.25 },
                  { x: 0, y: 0.25, w: 0.25, h: 0.25 },
                  { x: 0, y: 0.5, w: 0.25, h: 0.125 },
                  { x: 0.25, y: 0, w: 0.25, h: 0.25 },
                  { x: 0.25, y: 0.25, w: 0.25, h: 0.125 },
                  { x: 0.25, y: 0.375, w: 0.25, h: 0.25 },
                  { x: 0.25, y: 0.625, w: 0.25, h: 0.25 },
                  { x: 0.25, y: 0.875, w: 0.25, h: 0.125 },
                  { x: 0.75, y: 0.75, w: 0.25, h: 0.25 },
                  { x: 0.5, y: 0, w: 0.5, h: 1 },
                  { x: 0.5, y: 0, w: 0.5, h: 1 },
                  {},
                  { x: 0, y: 0, w: 0.5, h: 1 },
                  { x: 0, y: 0, w: 1, h: 1 },
              ],
          },
          yn = {
              40: [5, 0, 5, 1, 5, 0, 5, 1],
              37: [7, 0, 7, 1, 7, 0, 7, 1],
              36: [2, 0, 2, 1, 2, 0, 2, 1],
              35: [9, 0, 9, 1, 9, 0, 9, 1],
              34: [3, 0, 3, 1, 3, 0, 3, 1],
              33: [5, 1, 0, -1, 5, 0, 0, -1],
              31: [0, -1, 8, 1, 0, -1, 8, 1],
              30: [11, 0, 11, 1, 11, 0, 11, 1],
              29: [10, 0, 10, 1, 10, 0, 10, 1],
              28: [6, 0, 6, 1, 6, 0, 6, 1],
              27: [4, 0, 4, 1, 4, 0, 4, 1],
              26: [24, 0, 24, 1, 24, 0, 24, 1],
              25: [24, 0, 24, 1, 24, 0, 24, 1],
              23: [1, 0, 1, 1, 1, 0, 1, 1],
              15: [5, 0, 5, 1, 5, 0, 5, 1],
          };
      var Tn = { 21: 26, 22: 27, 15: 28, 17: 26, 25: 32, 13: 32, 23: 33, 14: 28, 26: 26 },
          wn = {
              0: { 21: 26, 22: 27 },
              1: { 21: 26, 22: 27 },
              2: { 21: 30, 22: 31 },
              3: { 21: 33, 22: 32 },
              4: { 21: 26, 22: 27, 15: 28 },
              5: { 21: 26 },
              6: { 21: 26, 22: 27 },
              7: { 21: 26, 22: 27 },
              8: { 21: 26, 22: 27 },
              9: { 21: 33, 22: 28 },
          };
      class En {
          static a(t, e, r, i, n) {
              let a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              for (let t = 0; t < e.length; t++) {
                  let s = e[t],
                      o = s.Gender,
                      h = s.Class,
                      u = s.Race,
                      l = s.ExtraData,
                      c = 0;
                  if (r > 1 || o != r) {
                      if (o < 2) continue;
                      c = 0;
                  } else c = 2;
                  let f = 1;
                  if (i > 0 && h == i) f = 0;
                  else if (h > 0) continue;
                  let d = 1;
                  if (n > 0 && u == n) d = 0;
                  else if (u > 0) continue;
                  a[l + 3 * (d + 2 * (c + f))] = s.FileDataId;
              }
              for (let t = 0; t < 2; t++)
                  for (let e = 0; e < 2; e++)
                      for (let r = 0; r < 2; r++) {
                          let i = 3 * (t + 2 * (e + 2 * r));
                          if (a[i] > 0) {
                              let t;
                              return (t = { a: a[i], b: a[i + 1], c: a[i + 2] });
                          }
                      }
              if (t) {
                  let a = t.bT(r, n, !0);
                  if (a && 0 != a[0]) return (n = a[0]), (r = a[1]), En.a(t, e, r, i, n);
              }
              return null;
          }
          static b(t, e, r, i, n, a) {
              let s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              for (let t = 0; t < e.length; t++) {
                  let o = e[t],
                      h = o.Gender,
                      u = o.Class,
                      l = o.Race,
                      c = o.ExtraData,
                      f = 0;
                  if (i > 1 || h != i) {
                      if (h < 2) continue;
                      f = 0;
                  } else f = 2;
                  let d = 1;
                  if (n > 0 && u == n) d = 0;
                  else if (u > 0) continue;
                  let b = 1;
                  if (a > 0 && l == a) b = 0;
                  else if (l > 0) continue;
                  let p = 1;
                  if (-1 == r || c != r) {
                      if (-1 != c && -1 != r) continue;
                  } else p = 0;
                  s[p + 2 * (b + 2 * (f + d))] = o.FileDataId;
              }
              for (let t = 0; t < 2; t++)
                  for (let e = 0; e < 2; e++)
                      for (let r = 0; r < 2; r++)
                          for (let i = 0; i < 2; i++) {
                              let n = i + 2 * (t + 2 * (e + 2 * r));
                              if (s[n]) return s[n];
                          }
              if (t) {
                  var o = t.bT(i, a, !1);
                  if (o && 0 != o[0]) return (a = o[0]), (i = o[1]), En.b(t, e, r, i, n, a);
              }
              return 0;
          }
      }
      var An = class {
          constructor(t) {
              (this.a = t.features), (this.b = t.textureFiles);
          }
          c() {
              this.a = null;
          }
          d(t) {
              return this.a[t];
          }
          e(t) {
              return En.a(null, this.b[t], 3, 0, 0);
          }
          f(t, e, r) {
              var i = this.g(t, e),
                  n = this.d(t);
              if (n) return n.find((t) => !(t.variationIndex != e || (i > 1 && t.colorIndex != r)));
          }
          g(t, e) {
              var r = this.d(t);
              return r ? r.reduce((t, r) => (r.variationIndex == e ? t + 1 : t), 0) : 0;
          }
      };
      var Mn = class {
          constructor(t) {
              (this.a = [t.getFloat(), t.getFloat(), t.getFloat()]),
                  (this.b = [t.getFloat(), t.getFloat(), t.getFloat(), 0]),
                  (this.c = t.getFloat()),
                  (this.d = t.getFloat()),
                  (this.e = t.getFloat()),
                  (this.f = t.getFloat()),
                  (this.g = [t.getUint8(), t.getUint8(), t.getUint8(), t.getUint8()]),
                  (this.h = [t.getUint8(), t.getUint8(), t.getUint8(), t.getUint8()]),
                  (this.i = a.clone(this.a)),
                  (this.j = s.clone(this.b));
          }
          l() {
              (this.a = null), (this.b = null), (this.g = null), (this.h = null), (this.i = null), (this.j = null);
          }
      };
      var Fn = class {
          constructor(t) {
              (this.a = t.getUint16()),
                  (this.b = t.getUint16()),
                  (this.g = t.getUint32()),
                  (this.c = t.getUint32()),
                  (this.d = t.getUint16()),
                  (this.e = t.getUint16()),
                  (this.f = t.getUint16()),
                  (this.h = t.getInt16()),
                  (this.i = t.getUint16()),
                  t.getBool() && (this.j = t.getString());
          }
          k() {}
      };
      class Rn {
          constructor() {
              (this.a = -1), (this.b = null), (this.c = 0);
          }
      }
      class Sn {
          constructor() {
              (this.a = null), (this.b = new Rn()), (this.c = new Rn()), (this.d = 0);
          }
      }
      class Cn {
          f() {
              if (this.b) for (var t = 0; t < this.b.length; ++t) this.b[t] = null;
              return (this.a = null), (this.b = null), null;
          }
          k(t, e, r, i) {
              let n = this;
              if ((null == i && (i = this.g()), this.d >= 0 && (t = this.d < e.length ? e[this.d] : e[0]), 0 != n.c || n.b.length > 1)) {
                  if (n.a.length > 1) {
                      var a = n.a[n.a.length - 1];
                      a > 0 && t > a && (t %= a);
                      for (var s = 0, o = n.a.length, h = 0; h < o; ++h)
                          if (t >= n.a[h] && t < n.a[h + 1]) {
                              s = h;
                              break;
                          }
                      var u = n.a[s],
                          l = n.a[s + 1],
                          c = 0;
                      return u != l && (c = (t - u) / (l - u)), 1 == n.c ? n.h(n.b[s], n.b[s + 1], c, i) : (i = n.i(i, n.b[s]));
                  }
                  return n.b.length > 0 ? (i = n.i(i, n.b[0])) : r;
              }
              return 0 == n.b.length ? i : (i = n.i(i, n.b[0]));
          }
          l(t) {
              var e;
              (this.c = t.getInt16()), (this.d = t.getInt16()), (this.e = t.getBool());
              var r = t.getInt32();
              for (this.a = new Array(r), e = 0; e < r; ++e) this.a[e] = t.getInt32();
              var i = t.getInt32();
              for (this.b = new Array(i), e = 0; e < i; ++e) this.b[e] = this.j(t);
          }
      }
      class Pn extends Cn {
          constructor(t) {
              super();
              (this.ba = a.create()), this.l(t);
          }
          g() {
              return a.create();
          }
          h(t, e, r, i) {
              return a.lerp(i, t, e, r);
          }
          i(t, e) {
              return a.copy(t, e), t;
          }
          j(t) {
              return a.set(a.create(), t.getFloat(), t.getFloat(), t.getFloat());
          }
      }
      class In extends Cn {
          constructor(t) {
              super();
              this.l(t), (this.ba = o.create());
          }
          g() {
              return o.create();
          }
          h(t, e, r, i) {
              return o.slerp(i, t, e, r);
          }
          i(t, e) {
              return o.copy(t, e), t;
          }
          j(t) {
              return o.set(o.create(), t.getFloat(), t.getFloat(), t.getFloat(), t.getFloat());
          }
      }
      class Un extends Cn {
          constructor(t) {
              super();
              this.l(t);
          }
          j(t) {
              return t.getUint16();
          }
          g() {
              return 0;
          }
          h(t, e, r, i) {
              return t + (e - t) * r;
          }
          i(t, e) {
              return e;
          }
      }
      class kn extends Un {
          j(t) {
              return t.getFloat();
          }
      }
      class Dn extends Un {
          j(t) {
              return t.getUint8();
          }
      }
      class On {
          d() {
              for (var t = 0; t < this.b.length; ++t) this.b[t] = null;
              return (this.a = null), (this.b = null), (this.c = null), null;
          }
          i(t, e, r, i) {
              let n = this;
              r || (r = this.e());
              let a = i || n.b;
              if (n.b.length > 1 && n.a.length > 1) {
                  var s = n.a[n.a.length - 1];
                  s > 0 && t > s && (t %= s);
                  for (var o = 0, h = n.a.length, u = 0; u < h - 1; ++u)
                      if (t > n.a[u] && t <= n.a[u + 1]) {
                          o = u;
                          break;
                      }
                  var l = n.a[o],
                      c = n.a[o + 1],
                      f = 0;
                  return l != c && (f = (t - l) / (c - l)), n.f(a[o], a[o + 1], f, r);
              }
              return a.length > 0 ? (r = n.g(r, a[0])) : e;
          }
          j(t) {
              var e,
                  r = t.getInt32();
              for (this.a = new Array(r), e = 0; e < r; ++e) this.a[e] = t.getInt16() / 32767;
              var i = t.getInt32();
              for (this.b = new Array(i), e = 0; e < i; ++e) this.b[e] = this.h(t);
          }
      }
      class Bn extends On {
          constructor(t) {
              super();
              (this.ba = h.create()), this.j(t);
          }
          e() {
              return h.create();
          }
          f(t, e, r, i) {
              return h.lerp(i, t, e, r);
          }
          g(t, e) {
              return h.copy(t, e), t;
          }
          h(t) {
              return h.set(h.create(), t.getFloat(), t.getFloat());
          }
      }
      class Nn extends On {
          constructor(t) {
              super();
              this.j(t);
          }
          e() {
              return a.create();
          }
          f(t, e, r, i) {
              return a.lerp(i, t, e, r);
          }
          g(t, e) {
              return a.copy(t, e), t;
          }
          h(t) {
              return a.set(a.create(), t.getFloat(), t.getFloat(), t.getFloat());
          }
      }
      class Ln extends On {
          constructor(t) {
              super();
              this.j(t);
          }
          e() {
              return 0;
          }
          f(t, e, r, i) {
              return t + (e - t) * r;
          }
          g(t, e) {
              return t;
          }
          h(t) {
              return t.getUint16();
          }
      }
      class zn {
          constructor(t, e) {
              this.b(t, e);
          }
          b(t, e) {
              var r = t.getInt32();
              this.a = new Array(r);
              for (let i = 0; i < r; ++i) this.a[i] = new e(t);
          }
          c(t) {
              return !(!this.a || 0 == this.a.length) && (t >= this.a.length && (t = 0), this.a[t].e);
          }
          d(t, e, r, i) {
              if (!this.a || 0 == this.a.length) return r;
              let n = t.b.a;
              n >= this.a.length && (n = 0);
              let a = this.a[n].k(t.b.c, e, r, i);
              if (t.d < 1 && t.d > 0) {
                  let n = this.a[0].g(),
                      s = t.c.a;
                  s >= this.a.length && (s = 0);
                  let o = this.a[s].k(t.c.c, e, r, n);
                  o || (o = n), (a = this.a[0].h(a, o, 1 - t.d, o)), i && this.a[0].i(i, o);
              }
              return a;
          }
          e() {
              if (this.a && 0 != this.a.length) {
                  for (var t = 0; t < this.a.length; ++t) this.a[t].f(), (this.a[t] = null);
                  return null;
              }
          }
      }
      function jn(t, e) {
          return s.fromValues(t[4 * e + 0], t[4 * e + 1], t[4 * e + 2], 0);
      }
      function Hn(t, e, r) {
          for (let i = 0; i < 4; i++) t[4 * e + i] = r[i];
      }
      var Gn = class {
          constructor(t, e, r) {
              (this.a = t),
                  (this.b = e),
                  (this.c = r.getInt32()),
                  (this.d = r.getUint32()),
                  (this.e = r.getInt16()),
                  (this.f = r.getUint16()),
                  (this.g = r.getUint32()),
                  (this.h = a.fromValues(r.getFloat(), r.getFloat(), r.getFloat())),
                  (this.i = new zn(r, Pn)),
                  (this.j = new zn(r, In)),
                  (this.k = new zn(r, Pn)),
                  (this.l = a.create()),
                  (this.m = n.create()),
                  (this.n = n.create()),
                  (this.o = a.create()),
                  (this.p = o.create()),
                  (this.q = n.create()),
                  (this.r = !1),
                  (this.s = !1),
                  (this.t = !1);
          }
          u() {
              (this.a = null), (this.h = null), (this.l = null), (this.m = null), (this.o = null), (this.p = null), (this.q = null), this.i.e(), this.j.e(), this.k.e(), (this.i = null), (this.j = null), (this.k = null);
          }
          v() {
              this.r = !0;
              for (var t = 0; t < 16; ++t) this.m[t] = 0;
          }
          w() {
              if (this.r) return void this.v();
              if (this.s || this.t) return;
              if (((this.s = !0), !this.a)) return;
              n.identity(this.m);
              var t = this.a.V;
              if (!t) return;
              let e = n.create();
              if ((n.multiply(e, e, this.a.bZ.viewMatrix), n.multiply(e, e, this.a.Z), n.multiply(this.m, this.m, e), this.e > -1)) {
                  this.a.as[this.e].w();
                  let t = n.create();
                  if ((n.copy(t, this.a.as[this.e].m), n.multiply(t, e, t), 1 & this.d || 2 & this.d || 4 & this.d)) {
                      if (4 & this.d && 2 & this.d) Hn(t, 0, jn(e, 0)), Hn(t, 1, jn(e, 1)), Hn(t, 2, jn(e, 2));
                      else if (4 & this.d) {
                          {
                              let r = jn(e, 0),
                                  i = s.length(r);
                              s.scale(r, r, s.length(jn(t, 0)) / i), Hn(t, 0, r);
                          }
                          {
                              let r = jn(e, 1),
                                  i = s.length(r);
                              s.scale(r, r, s.length(jn(t, 1)) / i), Hn(t, 1, r);
                          }
                          {
                              let r = jn(e, 2),
                                  i = s.length(r);
                              s.scale(r, r, s.length(jn(t, 2)) / i), Hn(t, 2, r);
                          }
                      } else if (2 & this.d) {
                          {
                              let r = jn(e, 0),
                                  i = s.length(jn(t, 0));
                              s.scale(r, r, 1 / i), s.scale(r, r, s.length(jn(e, 0))), Hn(t, 0, r);
                          }
                          {
                              let r = jn(e, 1),
                                  i = s.length(jn(t, 1));
                              s.scale(r, r, 1 / i), s.scale(r, r, s.length(jn(e, 1))), Hn(t, 1, r);
                          }
                          {
                              let r = jn(e, 2),
                                  i = s.length(jn(t, 2));
                              s.scale(r, r, 1 / i), s.scale(r, r, s.length(jn(e, 2))), Hn(t, 2, r);
                          }
                      }
                      if (1 & this.d) Hn(t, 3, jn(e, 3));
                      else {
                          let r = s.fromValues(this.h[0], this.h[1], this.h[2], 1),
                              i = s.create();
                          s.copy(i, r), (i[3] = 0);
                          let n = s.create(),
                              a = s.create();
                          s.transformMat4(n, r, this.a.as[this.e].m), s.transformMat4(n, n, e), s.transformMat4(a, i, t), s.subtract(n, n, a), (n[3] = 1), Hn(t, 3, n);
                      }
                  }
                  let r = n.create();
                  n.invert(r, e), n.multiply(t, r, t), n.multiply(this.m, this.m, t);
              }
              var r = this.i.c(t.b.a),
                  i = this.j.c(t.b.a),
                  h = this.k.c(t.b.a);
              let u = 0 != (640 & this.d);
              u &&
                  !this.a.X &&
                  (n.identity(this.n),
                  n.translate(this.n, this.n, this.h),
                  r && ((this.o = this.i.d(t, this.a.bg)), n.translate(this.n, this.n, this.o)),
                  i && ((this.p = this.j.d(t, this.a.bg, o.create())), n.fromQuat(this.q, this.p), n.transpose(this.q, this.q), n.multiply(this.n, this.n, this.q)),
                  h && ((this.o = this.k.d(t, this.a.bg)), n.scale(this.n, this.n, this.o)),
                  n.translate(this.n, this.n, a.negate(this.o, this.h))),
                  n.multiply(this.m, this.m, this.n);
              let l = 120 & this.d;
              if (l) {
                  let t = n.create();
                  n.copy(t, this.m);
                  let e = this.m,
                      r = a.create();
                  n.getScaling(r, this.m);
                  let i = s.create();
                  if (16 == l) {
                      let t = jn(this.m, 0),
                          r = a.length(t);
                      s.scale(t, t, 1 / r), Hn(this.m, 0, t);
                      let n = s.fromValues(e[4], -e[0], 0, 0);
                      Hn(e, 1, s.normalize(n, n)), a.cross(i, n, t), (i[3] = 0), Hn(e, 2, i);
                  } else if (l > 16) {
                      if (32 == l) {
                          let t = jn(e, 1),
                              r = s.length(t);
                          s.scale(t, t, 1 / r), Hn(this.m, 1, t);
                          let n = s.fromValues(-e[5], e[1], 0, 0);
                          Hn(e, 0, s.normalize(n, n)), (i[3] = 0), Hn(e, 2, i);
                      } else if (64 == l) {
                          let t = jn(e, 2);
                          s.normalize(t, t), Hn(e, 2, t);
                          let r = s.fromValues(t[1], -t[0], 0, 0);
                          s.normalize(r, r), Hn(e, 1, r), a.cross(i, t, r), (i[3] = 0), Hn(e, 0, i);
                      }
                  } else if (8 == l)
                      if (u) {
                          let t = jn(this.n, 0);
                          (t = s.fromValues(t[1], t[2], -t[0], 0)), s.normalize(t, t), s.scale(t, t, -1), Hn(e, 0, t);
                          let r = jn(this.n, 1);
                          (r = s.fromValues(r[1], r[2], -r[0], 0)), s.normalize(r, r), s.scale(r, r, -1), Hn(e, 1, r);
                          let i = jn(this.n, 2);
                          (i = s.fromValues(i[1], i[2], -i[0], 0)), s.normalize(i, i), s.scale(i, i, -1), Hn(e, 2, i);
                      } else {
                          let t = s.fromValues(0, 0, -1, 0);
                          s.scale(t, t, -1), Hn(e, 0, t);
                          let r = s.fromValues(1, 0, 0, 0);
                          s.scale(r, r, -1), Hn(e, 1, r);
                          let i = s.fromValues(0, 1, 0, 0);
                          s.scale(i, i, -1), Hn(e, 2, i);
                      }
                  let o = s.fromValues(this.h[0], this.h[1], this.h[2], 1),
                      h = s.fromValues(this.h[0], this.h[1], this.h[2], 0),
                      c = jn(e, 0),
                      f = jn(e, 1),
                      d = jn(e, 2);
                  s.scale(c, c, r[0]), s.scale(f, f, r[1]), s.scale(d, d, r[2]), Hn(e, 0, c), Hn(e, 1, f), Hn(e, 2, d), s.transformMat4(o, o, t), s.transformMat4(h, h, e);
                  let b = s.create();
                  s.subtract(b, o, h), (b[3] = 1), Hn(e, 3, b);
              }
              n.invert(e, e), n.multiply(this.m, e, this.m), a.transformMat4(this.l, this.h, this.m);
          }
      };
      var Vn = class {
              constructor(t) {
                  (this.a = t.getUint16()),
                      (this.b = t.getUint16()),
                      (this.c = t.getUint16()),
                      (this.d = t.getUint16()),
                      (this.e = t.getUint16() + 65536 * this.b),
                      (this.f = t.getUint16()),
                      (this.g = t.getUint16()),
                      (this.h = a.fromValues(t.getFloat(), t.getFloat(), t.getFloat())),
                      (this.i = a.fromValues(t.getFloat(), t.getFloat(), t.getFloat())),
                      (this.j = t.getFloat());
              }
              k() {
                  (this.h = null), (this.i = null);
              }
          },
          qn = r(8);
      var Xn = class {
          constructor(t) {
              (this.a = t.getUint16()), (this.b = t.getUint16());
          }
          static c(t) {
              (t.E = !1), t.o.ay && t.g < t.o.ay.length ? (t.r = t.o.ay[t.g]) : (t.r = { a: 0, b: 0 }), (t.x = 0 != (1 & t.r.a)), (t.y = 0 == (4 & t.r.a)), (t.z = 0 != (16 & t.r.a));
          }
      };
      class Yn {
          static a(t) {
              const e = 32767 & t;
              return e < Zn.length ? Zn[e] : ["PS_Combiners_Opaque", "VS_Diffuse_T1"];
          }
          static b(t, e) {
              var r = "";
              if (-1e3 == t && 3 == e) return "Skin";
              if (-2e3 == t && 1 == e) return "Skin2";
              if (32768 & t) return Yn.a(t)[0];
              if (1 == e) r = 112 & t ? "PS_Combiners_Mod" : "PS_Combiners_Opaque";
              else {
                  r =
                      (112 & t ? "PS_Combiners_Mod" : "PS_Combiners_Opaque") +
                      "_" +
                      (112 & t ? ["Opaque", "Mod", "Mod", "Add", "Mod2x", "Mod", "Mod2xNA", "AddNA"] : ["Opaque", "Mod", "Mod", "AddAlpha", "Mod2x", "Mod", "Mod2xNA", "AddAlpha"])[7 & t];
              }
              return r;
          }
          static c(t, e) {
              var r = "";
              if (-1e3 == t && 3 == e) r = "T1_T1_T1";
              else {
                  if (32768 & t) return Yn.a(t)[1];
                  r = 1 == e ? (128 & t ? "Env" : 16384 & t ? "T2" : "T1") : 128 & t ? (8 & t ? "Env_Env" : "Env_T1") : 8 & t ? "T1_Env" : 16384 & t ? "T1_T2" : "T1_T1";
              }
              return "VS_Diffuse_" + r;
          }
          static d(t, e, r) {
              var i = Yn.b(t, e),
                  n = Yn.c(t, e),
                  a = "Wow." + n + "_" + i;
              if (b._GetProgram(a)) return { name: a };
              var s = { shaders: [Yn.f(n), Yn.g(i, r)], attributes: { position: "aPosition", normal: "aNormal", texcoord0: "aTexCoord0", texcoord1: "aTexCoord1" } };
              return b.RegisterProgram(a, s), { name: a };
          }
          static e(t) {
              var e = {},
                  r = {
                      texcoord1: function (t, e) {
                          t.INPUT_TEXCOORD1 = "aTexCoord" + e;
                      },
                  };
              for (var i in t.options) {
                  var n = t.options[i];
                  r[i](e, n);
              }
              return { name: "Wow." + t.name, config: e };
          }
          static f(t) {
              var e = "";
              if (((e += "vTexCoord1 = (uTextureMatrix1 * vec4(aTexCoord0, 0, 1)).st;\n"), (e += "vTexCoord2 = (uTextureMatrix2 * vec4(aTexCoord1, 0, 1)).st;\n"), "VS" === t.substr(0, 2))) {
                  var r = (t = t.substr(3)).split("_"),
                      i = r[0];
                  if ("Diffuse" === i || "Color" === i) {
                      (e = ""), r.splice(0, 1);
                      var n = { T1: ["uTextureMatrix1", "aTexCoord0"], T2: ["uTextureMatrix2", "aTexCoord1"], T3: ["", "aTexCoord2"], Env: ["", "texEnv"] },
                          a = 1;
                      for (var s in r)
                          n[r[s]]
                              ? (n[r[s]][0] && "texEnv" != n[r[s]][1]
                                    ? (e += "vTexCoord" + a + " = (" + n[r[s]][0] + " * vec4(" + n[r[s]][1] + ", 0, 1)).st;\n")
                                    : "texEnv" == n[r[s]][1]
                                    ? (e += "vTexCoord" + a + " = texEnv;\n")
                                    : (e += "vTexCoord" + a + " = (uTextureMatrix" + a + " * vec4(" + n[r[s]][1] + ", 0, 1)).st;\n"),
                                a++)
                              : WH.debug("Missing vertex shader def?", t);
                  }
              }
              return (
                  "            attribute vec3 aPosition;\n            attribute vec3 aNormal;\n            attribute vec2 aTexCoord0;\n            attribute vec2 aTexCoord1;\n            attribute vec3 aColor;\n            \n            varying vec3 vPosition;\n            varying vec3 vNormal;\n            varying vec2 vTexCoord1;\n            varying vec2 vTexCoord2;\n            varying vec2 vTexCoord3;\n            varying vec2 vTexCoord4;\n            \n            uniform mat4 uModelMatrix;\n            uniform mat4 uPanningMatrix;\n            uniform mat4 uViewMatrix;\n            uniform mat4 uProjMatrix;\n            uniform mat4 uTextureMatrix1;\n            uniform mat4 uTextureMatrix2;\n            uniform mat4 uTextureMatrix3;\n            uniform mat4 uTextureMatrix4;\n            uniform vec3 uCameraPos;\n            uniform bool uHasTexture1;\n            uniform bool uHasTexture2;\n            uniform bool uHasTexture3;\n            uniform bool uHasTexture4;\n            \n            vec2 sphereMap(vec3 vertex, vec3 normal)\n            {\n               vec3 normPos = -(normalize(vertex.xyz));\n               vec3 temp = (normPos - (normal * (2.0 * dot(normPos, normal))));\n               temp = vec3(temp.x, temp.y, temp.z + 1.0);\n               vec2 texCoord = ((normalize(temp).xy * 0.5) + vec2(0.5));\n               return texCoord;\n            }\n            void main(void) {\n              vec4 pos = uViewMatrix * uModelMatrix * vec4(aPosition, 1);\n              vPosition = pos.rgb;\n              vNormal = normalize(mat3(uViewMatrix * uModelMatrix) * aNormal);\n              vec2 texEnv = sphereMap(pos.xyz,vNormal.xyz);\n              gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1);\n            \n            " +
                  e +
                  "\n              vNormal = mat3(uViewMatrix * uModelMatrix) * aNormal;            }"
              );
          }
          static g(t, e) {
              var r = Wn[t];
              r || (WH.debug("Missing pixel shader def", t), (r = Wn[(t = "PS_Combiners_Opaque_Mod")]));
              for (var i = "\t\t" + r.slice(1, r.length).join("\n\t\t"), n = 0; n < r[0]; n++) {
                  var a = n + 1;
                  i = "vec4 tex" + n + " = texture2D(uTexture" + a + ", vTexCoord" + a + ".st);\n" + i;
              }
              return (
                  e.b,
                  "            precision mediump float;            \n            varying vec3 vPosition;\n            varying vec3 vNormal;\n            varying vec2 vTexCoord1;\n            varying vec2 vTexCoord2;\n            varying vec2 vTexCoord3;\n            varying vec2 vTexCoord4;\n            \n            uniform bool uHasTexture1;\n            uniform bool uHasTexture2;\n            uniform bool uHasTexture3;\n            uniform bool uHasTexture4;\n            uniform bool uHasAlpha;\n            uniform int uBlendMode;\n            uniform bool uUnlit;\n            uniform vec4 uColor;\n            uniform vec4 uAmbientColor;\n            uniform vec4 uPrimaryColor;\n            uniform vec4 uSecondaryColor;\n            uniform vec3 uLightDir1;\n            uniform vec3 uLightDir2;\n            uniform vec3 uLightDir3;\n            uniform sampler2D uTexture1;\n            uniform sampler2D uTexture2;\n            uniform sampler2D uTexture3;\n            uniform sampler2D uTexture4;\n            uniform sampler2D uAlpha;\n            \n            void main(void) {\n            vec4 _output = vec4(1.0);\n            vec4 _input = uColor;\n            vec3 _specular = vec3(0.0);            " +
                      i +
                      "\n            \n            if (uBlendMode == 1) {\n                if (_output.a < (128.0/255.0)) {\n                    discard;\n                }\n            }\n            if (uBlendMode > 1) {\n                if (_output.a < (1.0/255.0)) {\n                    discard;\n                }\n            }\n            if (!uUnlit) {                vec4 litColor = uAmbientColor;                vec3 normal = normalize(vNormal);                                float dp = max(0.0, dot(normal, uLightDir1));                litColor += uPrimaryColor * dp;                                dp = max(0.0, dot(normal, uLightDir2));                litColor += uSecondaryColor * dp;                                dp = max(0.0, dot(normal, uLightDir3));                litColor += uSecondaryColor * dp;                                litColor = clamp(litColor, vec4(0,0,0,0), vec4(1,1,1,1));                _output *= litColor;            }            _output += vec4(_specular, 0.0);            gl_FragColor = _output.xyzw;\n            }"
              );
          }
      }
      const Zn = [
              ["PS_Combiners_Opaque_Mod2xNA_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_AddAlpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_AddAlpha_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_Mod2xNA_Alpha_Add", "VS_Diffuse_T1_Env_T1", "HS_T1_T2_T3", "DS_T1_T2_T3"],
              ["PS_Combiners_Mod_AddAlpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_AddAlpha", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Mod_AddAlpha", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Mod_AddAlpha_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_Alpha_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_Mod2xNA_Alpha_3s", "VS_Diffuse_T1_Env_T1", "HS_T1_T2_T3", "DS_T1_T2_T3"],
              ["PS_Combiners_Opaque_AddAlpha_Wgt", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Mod_Add_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_ModNA_Alpha", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Mod_AddAlpha_Wgt", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Mod_AddAlpha_Wgt", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_AddAlpha_Wgt", "VS_Diffuse_T1_T2", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_Mod_Add_Wgt", "VS_Diffuse_T1_Env", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha", "VS_Diffuse_T1_Env_T1", "HS_T1_T2_T3", "DS_T1_T2_T3"],
              ["PS_Combiners_Mod_Dual_Crossfade", "VS_Diffuse_T1", "HS_T1", "DS_T1"],
              ["PS_Combiners_Mod_Depth", "VS_Diffuse_EdgeFade_T1", "HS_T1", "DS_T1"],
              ["PS_Combiners_Opaque_Mod2xNA_Alpha_Alpha", "VS_Diffuse_T1_Env_T2", "HS_T1_T2_T3", "DS_T1_T2_T3"],
              ["PS_Combiners_Mod_Mod", "VS_Diffuse_EdgeFade_T1_T2", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Mod_Masked_Dual_Crossfade", "VS_Diffuse_T1_T2", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_Alpha", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha", "VS_Diffuse_T1_Env_T2", "HS_T1_T2_T3", "DS_T1_T2_T3"],
              ["PS_Combiners_Mod_Depth", "VS_Diffuse_EdgeFade_Env", "HS_T1", "DS_T1"],
              ["PS_Guild", "VS_Diffuse_T1_T2_T1", "HS_T1_T2_T3", "DS_T1_T2"],
              ["PS_Guild_NoBorder", "VS_Diffuse_T1_T2", "HS_T1_T2", "DS_T1_T2_T3"],
              ["PS_Guild_Opaque", "VS_Diffuse_T1_T2_T1", "HS_T1_T2_T3", "DS_T1_T2"],
              ["PS_Illum", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
              ["PS_Combiners_Mod_Mod_Mod_Const", "VS_Diffuse_T1_T2_T3", "HS_T1_T2_T3", "DS_T1_T2_T3"],
              ["PS_Combiners_Mod_Mod_Mod_Const", "VS_Color_T1_T2_T3", "HS_T1_T2_T3", "DS_T1_T2_T3"],
              ["PS_Combiners_Opaque", "VS_Diffuse_T1", "HS_T1", "DS_T1"],
              ["PS_Combiners_Mod_Mod2x", "VS_Diffuse_EdgeFade_T1_T2", "HS_T1_T2", "DS_T1_T2"],
          ],
          Wn = {
              PS_Combiners_Add: [1, "_output.rgb = _input.rgb + tex0.rgb;", "_output.a = _input.a + tex0.a;"],
              PS_Combiners_Decal: [1, "_output.rgb = mix(_input.rgb, tex0.rgb, _input.a);", "_output.a = _input.a;"],
              PS_Combiners_Fade: [1, "_output.rgb = mix(tex0.rgb, _input.rgb, _input.a);", "_output.a = _input.a;"],
              PS_Combiners_Mod: [1, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = _input.a * tex0.a;"],
              PS_Combiners_Mod2x: [1, "_output.rgb = _input.rgb * tex0.rgb * 2.0;", "_output.a = _input.a * tex0.a * 2.0;"],
              PS_Combiners_Opaque: [1, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = _input.a;"],
              PS_Combiners_Add_Add: [2, "_output.rgb = (_input.rgb + tex0.rgb) + tex1.rgb;", "_output.a = (_input.a + tex0.a) + tex1.a;"],
              PS_Combiners_Add_Mod: [2, "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb;", "_output.a = (_input.a + tex0.a) * tex1.a;"],
              PS_Combiners_Add_Mod2x: [2, "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb * 2.0;", "_output.a = (_input.a + tex0.a) * tex1.a * 2.0;"],
              PS_Combiners_Add_Opaque: [2, "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb;", "_output.a = _input.a + tex0.a;"],
              PS_Combiners_Mod_Add: [2, "_output.rgb = (_input.rgb * tex0.rgb) + tex1.rgb;", "_output.a = (_input.a * tex0.a) + tex1.a;"],
              PS_Combiners_Mod_AddNA: [2, "_output.rgb = (_input.rgb * tex0.rgb) + tex1.rgb;", "_output.a = _input.a * tex0.a;"],
              PS_Combiners_Mod_Mod: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;", "_output.a = (_input.a * tex0.a) * tex1.a;"],
              PS_Combiners_Mod_Mod2x: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;", "_output.a = (_input.a * tex0.a) * tex1.a * 2.0;"],
              PS_Combiners_Mod_Mod2xNA: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;", "_output.a = _input.a * tex0.a;"],
              PS_Combiners_Mod_Opaque: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;", "_output.a = _input.a * tex0.a;"],
              PS_Combiners_Mod2x_Add: [2, "_output.rgb = (_input.rgb * tex0.rgb) * 2 + tex1.rgb;", "_output.a = (_input.a * tex0.a) * 2 + tex1.a;"],
              PS_Combiners_Mod2x_Mod2x: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 4.0;", "_output.a = (_input.a * tex0.a) * tex1.a * 4.0;"],
              PS_Combiners_Mod2x_Opaque: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;", "_output.a = _input.a * tex0.a * 2.0;"],
              PS_Combiners_Opaque_Add: [2, "_output.rgb = (_input.rgb * tex0.rgb) + tex1.rgb;", "_output.a = _input.a + tex1.a;"],
              PS_Combiners_Opaque_AddAlpha: [2, "_output.rgb = (_input.rgb * tex0.rgb) + (tex1.rgb * tex1.a);", "_output.a = _input.a;"],
              PS_Combiners_Opaque_AddAlpha_Wgt: [2, "_output.rgb = (_input.rgb * tex0.rgb) + (tex1.rgb * tex1.a);", "_output.a = _input.a;"],
              PS_Combiners_Opaque_AddAlpha_Alpha: [2, "_output.rgb = (_input.rgb * tex0.rgb) + (tex1.rgb * tex1.a * (1.0 - tex0.a));", "_output.a = _input.a;"],
              PS_Combiners_Opaque_AddNA: [2, "_output.rgb = (_input.rgb * tex0.rgb) + tex1.rgb;", "_output.a = _input.a;"],
              PS_Combiners_Opaque_Mod: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;", "_output.a = _input.a * tex1.a;"],
              PS_Combiners_Opaque_Mod2x: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;", "_output.a = _input.a * tex1.a * 2.0;"],
              PS_Combiners_Opaque_Mod2xNA: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;", "_output.a = _input.a;"],
              PS_Combiners_Opaque_Mod2xNA_Alpha: [2, "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex0.rgb, vec3(tex0.a));", "_output.a = _input.a;"],
              PS_Combiners_Opaque_Opaque: [2, "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;", "_output.a = _input.a;"],
              PS_Combiners_Opaque_Mod2xNA_Alpha_Add: [3, "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex0.rgb, vec3(tex0.a));", "_output.a = _input.a + tex1.a;", "_specular = tex2.rgb * tex2.a; "],
              PS_Combiners_Mod_Mod_Mod_Const: [3, "_output.rgb = _input.rgb * (tex0 * tex1 * tex2).rgb;", "_output.a = _input.a * (tex0 * tex1 * tex2).a;"],
              PS_Combiners_Mod_AddAlpha: [2, "_output.rgb = (_input.rgb * tex0.rgb) + (tex1.rgb * tex1.a);", "_output.a = _input.a * tex0.a;"],
              PS_Combiners_Mod_AddAlpha_Wgt: [2, "_output.rgb = (_input.rgb * tex0.rgb) + (tex1.rgb * tex1.a);", "_output.a = _input.a * tex0.a;"],
              PS_Combiners_Mod_AddAlpha_Alpha: [2, "_output.rgb = _input.rgb * tex0.rgb + tex1.rgb * tex1.a * (1.0 - tex0.a);", "_output.a = _input.a * (tex0.a + tex1.a * (0.3 * tex1.r + 0.59 * tex1.g + 0.11 * tex1.b));"],
              PS_Combiners_Opaque_Mod_Add_Wgt: [2, "_output.rgb = _input.rgb * mix(tex0.rgb, tex1.rgb, vec3(tex1.a)) + (tex0.rgb * tex0.a);", "_output.a = _input.a;"],
              PS_Guild: [3, "_output.rgb = _input.rgb * mix(tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a)), tex2.rgb * vec3(1.0, 1.0, 1.0), vec3(tex2.a));", "_output.a = _input.a * tex0.a;"],
              PS_Guild_Opaque: [3, "_output.rgb = _input.rgb * mix(tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a)), tex2.rgb * vec3(1.0, 1.0, 1.0), vec3(tex2.a));", "_output.a = _input.a;"],
              PS_Guild_NoBorder: [2, "_output.rgb = _input.rgb * tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a));", "_output.a = _input.a * tex0.a;"],
              PS_Combiners_Opaque_Alpha_Alpha: [2, "_output.rgb = _input.rgb * mix(mix(tex0.rgb, tex1.rgb, vec3(tex1.a)), tex0.rgb, vec3(tex0.a));", "_output.a = _input.a;"],
              PS_Combiners_Opaque_Mod2xNA_Alpha_3s: [3, "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.000000, tex2.rgb, vec3(tex2.a));", "_output.a = _input.a;"],
              PS_Combiners_Mod_Add_Alpha: [2, "_output.rgb = _input.rgb * tex0.rgb + tex1.rgb * (1.000000 - tex0.a);", "_output.a = _input.a * (tex0.a + tex1.a);"],
              PS_Combiners_Opaque_ModNA_Alpha: [2, "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb, tex0.rgb, vec3(tex0.a));", "_output.a = _input.a;"],
              PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha: [
                  3,
                  "float glowOpacity = clamp((tex2.a * vec4(1.0, 1.0, 1.0, 1.0).z), 0.0, 1.0); _output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.000000, tex0.rgb, vec3(tex0.a)) * (1.000000 - glowOpacity) + tex2.rgb * glowOpacity;",
                  "_output.a = _input.a;",
              ],
              PS_Combiners_Opaque_Mod2xNA_Alpha_Alpha: [3, "_output.rgb = _input.rgb * mix(mix(tex0.rgb * tex1.rgb * 2.000000, tex2.rgb, vec3(tex2.a)), tex0.rgb, vec3(tex0.a));", "_output.a = _input.a;"],
              PS_Combiners_Mod_Depth: [1, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = _input.a * tex0.a;"],
              PS_Combiners_Opaque_Alpha: [2, "_output.rgb = _input.rgb * mix(tex0.rgb, tex1.rgb, vec3(tex1.a));", "_output.a = _input.a;"],
              Skin: [
                  3,
                  "vec3 eyeVec_120 = vPosition.xyz;\nvec3 t121 = -(eyeVec_120);\nvec2 term_126 = vec2(dot(t121, vNormal), dot(normalize(t121), (vNormal * vec3(0.0500000007, 0.0500000007, 1.0))));\nvec2 invTerm_128 = (vec2(1.0) - clamp(term_126, 0.0, 1.0));\nvec2 f_129 = (invTerm_128 * invTerm_128);\nfloat fresnel_rim_133 = pow((f_129.x + f_129.y), 0.600000024);\nvec3 t136 = (tex2.rgb + ((vec3(0.0500000007, 0.0, 0.400000006) * 1.0) * fresnel_rim_133));\nvec3 t142 = t136;float t267 = dot(normalize(vNormal),  normalize(-(vPosition.xyz)));vec3 emissiveTerm_351 = mix(vec3(0.0), 2.0*t142, vec3(pow(clamp(t267, 0.0, 1.0), (( 128.0) + 9.99999975e-006))));_output.rgb = _input.rgb * tex0.rgb + tex1.rgb + emissiveTerm_351.rgb;",
                  "_output.a = _input.a * tex0.a;",
              ],
              Skin2: [1, "_output.rgb = _input.rgb * tex0.rgb;", "_output.a = _input.a * tex0.a;"],
          };
      var Kn = Yn;
      var Jn = class {
          constructor() {
              this.h = !1;
          }
      };
      const Qn = [0, 1, 2, 10, 3, 4, 5, 13];
      var $n = function (t) {
              let e = 0,
                  r = [];
              t.s.forEach((i, n) => {
                  let a = n;
                  var s = null;
                  if (t.s[a])
                      if (t.s[0] && 1 == t.s[0].c && n > 0) 1 == n ? (s = t.o.aM && t.o.aM.b ? { e: t.o.aM.b } : { e: t.o.bZ.blackPixelTexture }) : 2 == n && (s = t.o.aM && t.o.aM.c ? { e: t.o.aM.c } : { e: t.o.bZ.blackPixelTexture });
                      else if (1 == t.s[a].c) t.o.aN ? (s = t.o.aN.a) : t.o.aM && t.o.aM.a && (s = { e: t.o.aM.a });
                      else if (t.s[a].f) s = t.s[a].f;
                      else if ((((t.o.b.type < 8 || t.o.b.type > 32) && 2 == t.s[a].c) || t.s[a].c >= 11) && t.o.F[t.s[a].b]) s = t.o.F[t.s[a].b];
                      else if (-1 != t.s[a].c && t.o.F[t.s[a].c]) s = t.o.F[t.s[a].c];
                      else if (-1 != t.s[a].c && t.o.G[t.s[a].c]) s = t.o.G[t.s[a].c].a;
                      else if (8 == t.s[a].c && t.o.A) s = t.o.A.G[t.s[a].c].a;
                      else if (!t.s[a].e && t.j + e < t.o.az.length) {
                          var o = t.o.az[t.j + e];
                          o && o.f && (s = o.f);
                      } else WH.debug("can't find texture for material", a, "type", t.s[a].c);
                  (r[a] = s), e++;
              });
              let i = {};
              for (let t = 0; t < e; t++) i["Texture" + (t + 1)] = { a: r[t], b: t, c: "uTexture" + (t + 1), d: "TEXTURE" + t };
              return i;
          },
          ta = class {
              constructor(t) {
                  (this.E = !1),
                      (this.F = !1),
                      (this.a = t.getUint8()),
                      (this.b = t.getInt8()),
                      (this.c = t.getUint16()),
                      (this.d = t.getUint16()),
                      (this.e = t.getUint16()),
                      (this.f = t.getInt16()),
                      (this.g = t.getUint16()),
                      (this.h = t.getUint16()),
                      (this.i = t.getUint16()),
                      (this.j = t.getInt16()),
                      (this.k = t.getUint16()),
                      (this.l = t.getInt16()),
                      (this.m = t.getInt16()),
                      (this.n = !0),
                      (this.o = null),
                      (this.p = null),
                      (this.q = 0),
                      (this.r = null),
                      (this.s = []),
                      (this.t = []),
                      (this.u = new Array()),
                      (this.v = null),
                      (this.w = null),
                      (this.x = !1),
                      (this.y = !1),
                      (this.z = !1),
                      (this.A = s.create()),
                      (this.B = a.create()),
                      (this.C = o.create());
              }
              K(t) {
                  (this.o = t), (this.p = t.av[this.d]), (this.q = this.p.a), Xn.c(this);
                  var e = this.o.aA[this.j];
                  let r = this.o.aM;
                  1 == this.i && e > -1 && 1 == this.o.az[e].c && r && (r.g ? ((this.c = -1e3), (this.i = 3)) : ((this.c = -2e3), (this.i = 1)));
                  var i = Kn.d(this.c, this.i, this.r);
                  this.H = i;
                  for (var a = 0; a < this.i; a++)
                      if ((this.j > -1 && this.j < t.aA.length && (e = t.aA[this.j + a]) > -1 && e < t.az.length && this.s.splice(a, 0, t.az[e]), this.m > -1 && this.m < t.aC.length)) {
                          var s = t.aC[this.m + a];
                          s > -1 && t.aB && s < t.aB.length ? this.t.splice(a, 0, t.aB[s]) : this.t.splice(a, 0, null);
                      }
                  this.u = new Array(this.t.length);
                  for (let t = 0; t < this.u.length; t++) this.u[t] = n.create();
                  if ((this.E && ((this.s = this.s.reverse()), (this.t = this.t.reverse())), t.aG && this.f > -1 && this.f < t.aG.length && (this.v = t.aG[this.f]), this.l > -1 && this.l < t.aI.length)) {
                      var o = t.aI[this.l];
                      o > -1 && o < t.aH.length && (this.w = t.aH[o]);
                  }
                  this.D = this.r.b > 1;
              }
              L() {
                  var t = this.o.bZ.context,
                      e = b.GetProgram(t, this.H.name, this.H.config);
                  (this.G = e), (this.H = e.program), (this.I = e.uniforms);
              }
              M() {
                  let t = s.fromValues(this.p.i[0], this.p.i[1], this.p.i[2], 1),
                      e = this.o.as[this.p.g].m,
                      r = n.create();
                  n.multiply(r, r, this.o.bf.uViewMatrix), n.multiply(r, r, this.o.Z), n.multiply(r, r, e), s.transformMat4(t, t, r), (t[3] = 0);
                  let i = s.len(t);
                  if ((3 & this.a) > 0) {
                      let e = s.create();
                      i > 0 ? s.scale(e, t, 1 / i) : s.copy(e, t);
                      let n = a.fromValues(r[8], r[9], r[10]),
                          o = a.length(n) * this.p.j;
                      s.scale(e, e, o), 1 & this.a ? s.subtract(e, t, e) : s.add(e, t, e), (i = s.length(e));
                  }
                  return i;
              }
              N(t) {
                  var e = this,
                      r = e.o,
                      i = e.o.bZ.context,
                      s = e.o.V;
                  if (
                      (e.G || e.L(),
                      e.G.program &&
                          (this.J || ((this.J = new Jn()), (this.J.a = e.G), (this.J.b = Object.assign({}, r.bf))),
                          (this.J.c = r.bb),
                          (this.J.d = r.bc),
                          (this.J.b = Object.assign({}, r.bf)),
                          (e.A[0] = e.A[1] = e.A[2] = e.A[3] = 1),
                          e.v && e.v.g(s, e.o.bg, e.A),
                          e.w && (e.A[3] *= e.w.d(s, e.o.bg)),
                          !(e.A[3] <= 0.001)))
                  ) {
                      var h = e.r.b;
                      (this.J.b.uColor = e.A), (this.J.b.uBlendMode = h), (this.J.e = Qn[h]), (this.J.b.uUnlit = e.x ? 1 : 0), (this.J.m = this.M()), (this.J.l = this.b), (this.J.n = this.h);
                      var u = $n(e),
                          l = !0;
                      for (var c in u) {
                          var f = u[c],
                              d = f.a && f.a.e;
                          (l = l && (null == f.a || null != d)), d && (this.J.b[f.c] = d);
                      }
                      l && !e.F && (e.F = !0),
                          e.o.X ||
                              e.t.forEach((t, r) => {
                                  if ((n.identity(e.u[r]), e.t[r])) {
                                      var i = !1,
                                          h = !1;
                                      e.t[r].a && e.t[r].a.c(s.b.a) ? ((e.B = e.t[r].a.d(s, e.o.bg)), (h = !0)) : a.set(e.B, 0, 0, 0), e.t[r].b && e.t[r].b.c(s.b.a) ? ((e.C = e.t[r].b.d(s, e.o.bg)), (i = !0)) : o.set(e.C, 0, 0, 0, 1);
                                      let t,
                                          u = !1;
                                      if ((e.t[r].c && e.t[r].c.c(s.b.a) && ((t = e.t[r].c.d(s, e.o.bg)), (u = !0)), n.identity(e.u[r]), n.translate(e.u[r], e.u[r], [0.5, 0.5, 0, 0]), u && n.scale(e.u[r], e.u[r], t), i)) {
                                          let t = n.create();
                                          n.fromRotationTranslation(t, e.C, [0, 0, 0]), n.multiply(e.u[r], e.u[r], t);
                                      }
                                      h && n.translate(e.u[r], e.u[r], e.B), n.translate(e.u[r], e.u[r], [-0.5, -0.5, 0, 0]);
                                  }
                                  this.J.b["uTextureMatrix" + (r + 1).toString()] = e.u[r];
                              }),
                          (this.J.h = e.y),
                          (this.J.f = !e.z),
                          (this.J.i = i.TRIANGLES),
                          (this.J.k = 2 * e.p.e),
                          (this.J.j = e.p.f),
                          t.push(this.J);
                  }
              }
              get show() {
                  return this.n;
              }
              set show(t) {
                  this.n = t;
              }
              get meshId() {
                  return this.q;
              }
              O() {
                  (this.o = null), (this.p = null), (this.r = null), (this.s = null), (this.t = null), (this.v = null), (this.w = null), (this.A = null), (this.u = null), (this.B = null), (this.C = null);
              }
          };
      var ea = class {
          constructor(t, e, r) {
              t.bZ.context,
                  0 == r && console.log("Texture file is 0"),
                  (this.b = t),
                  (this.c = e),
                  (this.d = t.k.contentPath + "textures/" + r + ".png"),
                  (this.e = null),
                  (this.g = !1),
                  (function (t, e) {
                      (t.a = new Image()),
                          (t.a.crossOrigin = ""),
                          (t.a.onload = function () {
                              t.j();
                          }),
                          (t.a.onerror = function () {
                              t.a = null;
                          }),
                          (t.a.src = t.d);
                  })(this);
          }
          h() {
              return this.g;
          }
          i() {
              if (this.b) {
                  var t = this.b.bZ.context;
                  this.e && t.deleteTexture(this.e), (this.e = null), (this.b = null);
              }
          }
          j() {
              if (this.b) {
                  var t = this.b.bZ.context;
                  (this.e = t.createTexture()),
                      t.bindTexture(t.TEXTURE_2D, this.e),
                      t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, this.a),
                      r(this.a.width) && r(this.a.height)
                          ? t.generateMipmap(t.TEXTURE_2D)
                          : (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR));
                  var e = this.b.bZ.aniFilterExt;
                  e && t.texParameteri(t.TEXTURE_2D, e.TEXTURE_MAX_ANISOTROPY_EXT, this.b.bZ.aniFilterMax), (this.g = !0);
              }
              function r(t) {
                  return 0 == (t & (t - 1));
              }
          }
      };
      var ra = class {
          constructor(t, e, r) {
              (this.a = t), (this.b = e), (this.c = r.getInt32()), (this.d = r.getUint32()), (this.e = r.getUint32()), (this.f = null), this.h();
          }
          g() {
              (this.a = null), this.f && this.f.i(), (this.f = null);
          }
          h() {
              0 != this.e && (this.f = new ea(this.a, 0, this.e));
          }
      };
      var ia = class {
          constructor(t) {
              (this.a = new zn(t, Pn)), (this.b = new zn(t, In)), (this.c = new zn(t, Pn));
          }
          d() {
              this.a && (this.a.e(), (this.a = null)), this.b && (this.b.e(), (this.b = null)), this.c && (this.c.e(), (this.c = null));
          }
      };
      var na = class {
          constructor(t) {
              (this.a = t.getInt32()), (this.b = t.getInt32()), (this.c = a.fromValues(t.getFloat(), t.getFloat(), t.getFloat())), (this.d = -1);
          }
          e() {
              this.c = null;
          }
      };
      var aa = class {
          constructor(t) {
              (this.a = new zn(t, Pn)), (this.b = new zn(t, Un));
          }
          c() {
              this.a && this.a.e(), this.b && this.b.e();
          }
          d(t) {
              return !!this.a && this.a.c(t);
          }
          e(t) {
              return !!this.b && this.b.c(t);
          }
          f(t) {
              return this.d(t) || this.e(t);
          }
          g(t, e, r) {
              r ? (r[0] = r[1] = r[2] = r[3] = 1) : (r = s.fromValues(1, 1, 1, 1));
              let i = a.fromValues(1, 1, 1);
              return this.d(t.b.a) && this.a.d(t, e, i, i), this.e(t.b.a) && (r[3] = this.b.d(t, e, r[3]) / 32767), (r[0] = i[0]), (r[1] = i[1]), (r[2] = i[2]), r;
          }
      };
      var sa = class {
          constructor(t) {
              this.a = new zn(t, Un);
          }
          b() {
              this.a.e(), (this.a = null);
          }
          c(t) {
              return this.a.c(t);
          }
          d(t, e) {
              var r = 1;
              return this.c(t.b.a) && (r = this.a.d(t, e, r) / 32767), r > 1 ? (r = 1) : r < 0 && (r = 0), r;
          }
      };
      var oa = class {
          constructor(t) {
              this.a = t.hairGeosets;
          }
          b() {
              this.a = null;
          }
          c(t, e) {
              var r = this.a[t];
              if (r) return r.find((t) => t.variationID == e);
          }
          d(t, e, r, i) {
              var n = this.a[e];
              n &&
                  n.forEach(function (e) {
                      if (e.variationID == r && -1 != e.geosetID)
                          if (i) t.bF(e);
                          else {
                              var n = 100 * e.geosetType + e.geosetID;
                              if ((t.bG(n, n, !0), t.A && t.aw.some((t) => t.meshId == n))) {
                                  var a = 100 * e.geosetType;
                                  t.A.bG(a, a + 99, !1);
                              }
                          }
                  });
          }
          e(t, e) {
              var r = this.a[t];
              if (r) return r.find((t) => t.colorIndex == e);
          }
          f(t, e, r) {
              var i = this.a[t];
              if (i) {
                  var n = i.find((t) => t.colorIndex == e && t.geosetType == r);
                  if (n) return n.geosetID;
              }
              return -1;
          }
      };
      var ha = class {
          constructor(t) {
              this.a = t.styles;
          }
          b() {
              this.a = null;
          }
          c(t) {
              return this.a.find((e) => e.variationID == t);
          }
      };
      var ua = class {
          constructor() {
              (this.a = 0), (this.b = 0), (this.c = -1), (this.d = null), (this.e = null);
          }
      };
      var la = class {
          constructor(t, e, r) {
              (this.a = t), (this.d = e), (this.b = null), (this.c = !1), r && this.g(r);
          }
          f() {
              if (((this.a = null), this.b)) {
                  for (var t = 0; t < this.b.length; ++t) {
                      var e = this.b[t];
                      e && (e.e && e.e.bi(), (e.e = null), (e.d = null), (this.b[t] = null));
                  }
                  this.b = null;
              }
          }
          g(t) {
              var e = this;
              e.e = t;
              var r = e.a.k.contentPath + "meta/itemvisual/" + e.e + ".json";
              $.getJSON(r, function (t) {
                  e.h(t);
              });
          }
          h(t) {
              if (((this.b = new Array(7)), t.ItemEffects))
                  for (let r = 0; r < t.ItemEffects.length; ++r) {
                      let i = t.ItemEffects[r];
                      if ((-1 == i.SubClass || this.d == i.SubClass) && i.Model) {
                          this.b[i.Slot - 1] = new ua();
                          var e = { type: hn.PATH, id: i.Model, parent: this.a, shoulder: -1 };
                          this.b[i.Slot - 1].e = new Qa(this.a.bZ, this.a.a, e, 0, !0);
                      }
                  }
              for (var r = 0; r < this.b.length; ++r)
                  t.Equipment[r] && null == this.b[r] && ((this.b[r] = new ua()), (e = { type: hn.PATH, id: t.Equipment[r], parent: this.a, shoulder: -1 }), (this.b[r].e = new Qa(this.a.bZ, this.a.a, e, r, !0)));
              (this.c = !0), this.a.bJ();
          }
      };
      var ca = class {
          constructor(t, e, r, i, n) {
              (this.o = null),
                  (this.a = t),
                  (this.b = e),
                  (this.e = fn[e]),
                  (this.f = dn[e]),
                  (this.i = null),
                  (this.j = null),
                  (this.k = null),
                  (this.g = 0),
                  (this.h = 0),
                  (this.l = !1),
                  (this.m = !1),
                  (this.p = null),
                  (this.n = 0),
                  r && this.w(r, i, n);
          }
          v() {
              var t;
              if (this.i) {
                  for (t = 0; t < this.i.length; ++t) this.i[t].e && this.i[t].e.bi(), (this.i[t].e = null), (this.i[t].d = null), (this.i[t] = null);
                  this.i = null;
              }
              if (this.j) {
                  for (let t = 0; t < this.j.length; ++t) this.j[t].texture && this.j[t].texture.i(), (this.j[t].texture = null), (this.j[t] = null);
                  this.j = null;
              }
              (this.k = null), this.p && (this.p.f(), (this.p = null)), (this.l = !1), this.o && ((this.o.aV = !0), (this.o = null)), this.a && (this.a.bE(), (this.a = null));
          }
          w(t, e, r) {
              var i = this;
              (i.q = t), (i.r = e), (i.s = r);
              var n = "meta/item/";
              (i.b != mn.HEAD &&
                  i.b != mn.SHOULDER &&
                  i.b != mn.SHIRT &&
                  i.b != mn.CHEST &&
                  i.b != mn.BELT &&
                  i.b != mn.PANTS &&
                  i.b != mn.BOOTS &&
                  i.b != mn.BRACERS &&
                  i.b != mn.HANDS &&
                  i.b != mn.CAPE &&
                  i.b != mn.TABARD &&
                  i.b != mn.ROBE) ||
                  (n = "meta/armor/" + i.b + "/");
              var a = i.a.k.contentPath + n + i.q + ".json";
              $.getJSON(a)
                  .done(function (t) {
                      i.x(t);
                  })
                  .fail(function (t, e, r) {
                      var n = e + ", " + r;
                      console.log("Item:load Error loading metadata: " + n), (i.m = !0);
                  });
          }
          x(t) {
              if (
                  ((this.h = parseInt(t.Item.Flags)),
                  (this.b = parseInt(t.Item.InventoryType)),
                  (this.g = parseInt(t.Item.InventoryType)),
                  (this.c = parseInt(t.Item.ItemClass)),
                  (this.d = parseInt(t.Item.ItemSubClass)),
                  t.ComponentTextures)
              )
                  for (var e in ((this.j = []), t.ComponentTextures)) {
                      var r = parseInt(e),
                          i = En.a(this.a, t.TextureFiles[t.ComponentTextures[e]], this.a.n, this.a.o, this.a.m);
                      if (i) {
                          let t;
                          (t = { region: r, gender: this.a.n, file: i.a, texture: null }), r != xn.Base ? (t.texture = new ea(this.a, r, i.a)) : this.b == mn.CAPE && (this.a.F[2] = new ea(this.a, 2, i.a)), this.j.push(t);
                      }
                  }
              if (
                  ((this.k = t.Item.GeosetGroup),
                  this.b == mn.HEAD && (0 == (l = this.a.n) ? (this.t = t.Item.HideGeosetMale) : (this.u = t.Item.HideGeosetFemale)),
                  this.b == mn.SHOULDER ? (this.i = new Array(2)) : pn[this.b] != hn.ARMOR && (this.i = new Array(1)),
                  this.i)
              )
                  for (var n = 0; n < this.i.length; ++n) {
                      let e = { race: this.r, gender: this.s, bone: -1, attachment: null, model: null },
                          r = { type: pn[this.b], id: this.q, parent: this.a, shoulder: 0 };
                      this.b == mn.SHOULDER && (r.shoulder = n + 1), (e.e = new Qa(this.a.bZ, this.a.a, r, n, !0)), e.e.bU(t, r.type), (this.i[n] = e);
                  }
              if ((this.b == mn.BELT || (this.b == mn.CAPE && 0 == (12582912 & this.h))) && t.ComponentModels) {
                  let e = 0;
                  if ((this.b == mn.CAPE && (e = 1), t.ComponentModels[e])) {
                      let r = { type: pn[this.b], id: this.q, parent: this.a, shoulder: 0 },
                          i = new Qa(this.a.bZ, this.a.a, r, 0, !0);
                      i.z = t;
                      let n = { race: 0, gender: 0, bone: -1, attachment: null, model: null };
                      (n.e = i), (this.i = [n]);
                      let a = 1,
                          s = 0,
                          o = 1;
                      this.a && ((a = this.a.m), (s = this.a.n), (o = this.a.o));
                      let h = t.ComponentModels[e],
                          u = En.b(i, t.ModelFiles[h], -1, s, o, a);
                      if (u && (i.bS(hn.PATH, u), t.Textures)) for (let e in t.Textures) 0 != t.Textures[e] && (i.F[+e] = new ea(i, parseInt(e), t.Textures[e]));
                  }
              }
              if ((this.b == mn.SHIRT || this.b == mn.CHEST || this.b == mn.ROBE || this.b == mn.BELT || this.b == mn.PANTS || this.b == mn.HANDS || this.b == mn.BOOTS || this.b == mn.HEAD || this.b == mn.CAPE) && t.ComponentModels) {
                  var a = 0;
                  if (((this.b != mn.HEAD && this.b != mn.BELT) || (a = 1), this.b == mn.CAPE && (t.ComponentModels[0] && (a = 0), t.ComponentModels[1] && (a = 1)), t.ComponentModels[a])) {
                      var s = t.ComponentModels[a];
                      if (s && t.ModelFiles && t.ModelFiles[s]) {
                          var o = { type: pn[this.b], id: this.q, parent: this.a, shoulder: 0 },
                              h = new Qa(this.a.bZ, this.a.a, o, 0, !0);
                          (h.z = t), (h.aV = !0);
                          var u = 1,
                              l = 0,
                              c = 1;
                          this.a && ((u = this.a.m), (l = this.a.n), (c = this.a.o));
                          var f = En.b(h, t.ModelFiles[s], -1, l, c, u);
                          if (f) {
                              this.a ? (this.a.D[f] ? (this.o = this.a.D[f]) : ((this.a.D[f] = h), (this.o = h), h.bS(hn.PATH, f))) : h.bS(hn.PATH, f);
                              let e = 0 == a ? t.Textures : t.Textures2;
                              if (e) for (let t in e) 0 != e[t] && (h.F[+t] = new ea(h, parseInt(t), e[t]));
                          }
                      }
                  }
              }
              if ((this.b == mn.PANTS && this.k[2] > 0 && (this.f += 2), 0 != this.n)) {
                  let t = 2 == this.c ? this.d : -1;
                  this.p = new la(this.i[0].e, t, this.n);
              }
              (this.l = !0), this.a.bJ();
          }
          y(t) {
              this.p && this.p.f(), (this.n = t);
          }
      };
      var fa = class {
          constructor(t) {
              (this.c = t), (this.b = 267320826 ^ t);
              let e = new ArrayBuffer(4);
              this.a = new DataView(e);
          }
          d() {
              let t = this.b;
              return (t ^= t << 13), (t ^= t >> 17), (t ^= t << 5), (this.b = t), t;
          }
          e() {
              let t,
                  e = this.d();
              return this.a.setInt32(0, 1065353216 | (8388607 & e)), (t = 2147483648 & e ? 2 - this.a.getFloat32(0) : this.a.getFloat32(0) - 2);
          }
          f() {
              let t,
                  e = this.d();
              return this.a.setInt32(0, 1065353216 | (8388607 & e)), (t = 2147483648 & e ? 1 - this.a.getFloat32(0) : this.a.getFloat32(0) - 1);
          }
      };
      var da = class {
          constructor() {
              (this.a = 0), (this.b = 0), (this.c = 0), (this.d = 0), (this.e = a.create()), (this.f = 0), (this.g = 0), (this.h = 0), (this.i = 0), (this.j = 0);
          }
      };
      var ba = class {
          constructor(t, e) {
              (this.b = t), (this.c = e), (this.a = new da());
          }
          d() {
              return this.a.d + this.b.e() * this.c.u;
          }
          e() {
              return this.a.d + this.c.u;
          }
          f() {
              return this.a.c + this.c.s;
          }
          g(t) {
              return this.a.c + 30518509e-12 * t * this.c.s;
          }
          h() {
              let t = this.a.a;
              return (t *= 1 + this.a.b * this.b.e());
          }
          i() {
              return this.a;
          }
          j(t) {
              a.copy(t, this.a.e);
          }
      };
      let pa = function (t, e) {
          let r = Math.abs(t),
              i = Math.abs(e);
          return Number((r - Math.floor(r / i) * i).toPrecision(8)) * Math.sign(t);
      };
      var ma = class extends ba {
          k(t, e) {
              let r,
                  i = e * this.b.f(),
                  n = this.b.e();
              (r = n < 1 ? (n > -1 ? Math.trunc(32767 * n + 0.5) : -32767) : 32767), (t.d = r);
              let s = this.g(r);
              s < 0.001 && (s = 0.001), (t.b = pa(i, s)), (t.e = 65535 & this.b.d()), a.set(t.a, this.b.e() * this.a.g * 0.5, this.b.e() * this.a.h * 0.5, 0);
              let o = this.h(),
                  h = this.a.f;
              if (h < 0.001) {
                  let e = this.a.i * this.b.e(),
                      r = this.a.j * this.b.e(),
                      i = Math.sin(e),
                      n = Math.sin(r),
                      s = Math.cos(e),
                      h = Math.cos(r);
                  a.set(t.c, h * i * o, n * i * o, s * o);
              } else {
                  let e = a.create();
                  a.copy(e, t.a), (e[2] = e[2] - h), a.length(e) > 1e-4 && (a.normalize(e, e), a.scale(t.c, e, o));
              }
          }
      };
      let _a = function (t, e) {
          let r = Math.abs(t),
              i = Math.abs(e);
          return Number((r - Math.floor(r / i) * i).toPrecision(8)) * Math.sign(t);
      };
      var ga = class extends ba {
          constructor(t, e, r) {
              super(t, e), (this.ba = r);
          }
          k(t, e) {
              let r,
                  i = e * this.b.f(),
                  n = this.b.e();
              (r = n < 1 ? (n > -1 ? Math.trunc(32767 * n + 0.5) : -32767) : 32767), (t.d = r);
              let s = this.g(r);
              s < 0.001 && (s = 0.001), (t.b = _a(i, s)), (t.e = 65535 & this.b.d());
              let o = this.a.h - this.a.g,
                  h = this.a.g + o * this.b.f(),
                  u = this.a.i * this.b.e(),
                  l = this.a.j * this.b.e(),
                  c = Math.cos(u),
                  f = a.fromValues(c * Math.cos(l), c * Math.sin(l), Math.sin(u));
              a.scale(t.a, f, h);
              let d = this.h(),
                  b = this.a.f,
                  p = a.fromValues(0.5, 0.5, 0.5);
              0 == b ? (this.ba ? a.set(p, 0, 0, 1) : a.set(p, c * Math.cos(l), c * Math.sin(l), Math.sin(u))) : (a.set(p, 0, 0, b), a.subtract(p, t.a, p), a.length(p) > 1e-4 && a.normalize(p, p)), a.scale(t.c, p, d);
          }
      };
      var va = class {
          constructor(t) {
              (this.a = t.getInt32()),
                  (this.b = t.getUint32()),
                  (this.c = a.fromValues(t.getFloat(), t.getFloat(), t.getFloat())),
                  (this.d = t.getInt16()),
                  (this.e = t.getInt16()),
                  0 != (268435456 & this.b) && ((this.f = [0, 0, 0]), (this.f[0] = 31 & this.e), (this.f[1] = (this.e >> 5) & 31), (this.f[2] = (this.e >> 10) & 31)),
                  (this.g = t.getUint8()),
                  (this.h = t.getUint8()),
                  (this.i = t.getUint16()),
                  (this.j = t.getUint16()),
                  (this.k = t.getUint16()),
                  (this.l = t.getUint16()),
                  (this.m = new zn(t, kn)),
                  (this.n = new zn(t, kn)),
                  (this.o = new zn(t, kn)),
                  (this.p = new zn(t, kn)),
                  (this.q = new zn(t, Pn)),
                  (this.r = new zn(t, kn)),
                  (this.s = t.getFloat()),
                  (this.t = new zn(t, kn)),
                  (this.u = t.getFloat()),
                  (this.v = new zn(t, kn)),
                  (this.w = new zn(t, kn)),
                  (this.x = new zn(t, kn)),
                  (this.y = new Nn(t)),
                  (this.z = new Ln(t)),
                  (this.A = new Bn(t)),
                  (this.B = [t.getFloat(), t.getFloat()]),
                  (this.C = new Ln(t)),
                  (this.D = new Ln(t)),
                  (this.E = t.getFloat()),
                  (this.F = t.getFloat()),
                  (this.G = t.getFloat()),
                  (this.H = [t.getFloat(), t.getFloat()]),
                  (this.I = t.getFloat()),
                  (this.J = t.getFloat()),
                  (this.K = t.getFloat()),
                  (this.L = t.getFloat()),
                  (this.M = t.getFloat()),
                  (this.N = t.getFloat()),
                  (this.O = a.fromValues(t.getFloat(), t.getFloat(), t.getFloat())),
                  (this.P = a.fromValues(t.getFloat(), t.getFloat(), t.getFloat())),
                  (this.Q = a.fromValues(t.getFloat(), t.getFloat(), t.getFloat())),
                  (this.R = t.getFloat()),
                  (this.S = t.getFloat()),
                  (this.T = t.getFloat()),
                  (this.U = t.getFloat()),
                  (this.V = t.getFloat());
              var e = t.getInt32();
              this.W = new Array(e);
              for (var r = 0; r < e; r++) this.W[r] = a.fromValues(t.getFloat(), t.getFloat(), t.getFloat());
              (this.X = new zn(t, Dn)),
                  (this.Y = h.fromValues(t.getFloat(), t.getFloat())),
                  (this.Z = [h.fromValues(t.getFloat(), t.getFloat()), h.fromValues(t.getFloat(), t.getFloat())]),
                  (this.aa = [h.fromValues(t.getFloat(), t.getFloat()), h.fromValues(t.getFloat(), t.getFloat())]);
          }
      };
      var xa = class {
          constructor() {
              (this.a = a.create()), (this.b = 0), (this.c = a.create()), (this.d = 0), (this.e = (2147483647 * Math.random()) >> 0), (this.f = [h.create(), h.create()]), (this.g = [h.create(), h.create()]);
          }
      };
      let ya = new Array(128);
      for (let t = 0; t < 128; t++) ya[t] = Math.random();
      const Ta = n.fromValues(0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
          wa = 1e3,
          Ea =
              "        attribute vec3 aPosition;\n        attribute vec4 aColor;        attribute vec2 aTexcoord0;        attribute vec2 aTexcoord1;        attribute vec2 aTexcoord2;                varying vec4 vColor;        varying vec2 vTexcoord0;        varying vec2 vTexcoord1;        varying vec2 vTexcoord2;                uniform mat4 uModelMatrix;        uniform mat4 uViewMatrix;        uniform mat4 uProjMatrix;                void main(void) {            vec4 pos = vec4(aPosition, 1);                        gl_Position = uProjMatrix * pos;                    vColor = aColor;        vTexcoord0 = aTexcoord0;        vTexcoord1 = aTexcoord1;        vTexcoord2 = aTexcoord2;        }    ",
          Aa =
              "        precision mediump float;\n                varying vec4 vColor;        varying vec2 vTexcoord0;        varying vec2 vTexcoord1;        varying vec2 vTexcoord2;                uniform bool uHasTexture;        uniform bool uHasTexture2;        uniform bool uHasTexture3;        uniform bool uHasAlpha;        uniform int uBlendMode;        uniform int uPixelShader;        uniform sampler2D uTexture;        uniform sampler2D uTexture2;        uniform sampler2D uTexture3;        uniform float uAlphaTreshold;                void main(void) {            float lo_thresh = 0.01;            vec4 color = vec4(1, 1, 1, 1);            vec4 tex = vec4(1, 1, 1, 1);            vec4 tex2 = vec4(1, 1, 1, 1);            vec4 tex3 = vec4(1, 1, 1, 1);            if (uHasTexture) {                tex = texture2D(uTexture, vTexcoord0).rgba;            }            if (uHasTexture2) {                tex2 = texture2D(uTexture2, vTexcoord1).rgba;            }            if (uHasTexture3) {                tex3 = texture2D(uTexture3, vTexcoord2).rgba;            }            vec4 finalColor = vec4((tex * vColor ).rgb, tex.a*vColor.a );            if (uPixelShader == 0) {                 vec3 matDiffuse = vColor.xyz * tex.rgb;                finalColor = vec4(matDiffuse.rgb, tex.a*vColor.a);            } else if (uPixelShader == 1) {             vec4 textureMod = tex*tex2;             float texAlpha = (textureMod.w * tex3.w);             float opacity = texAlpha*vColor.a;             vec3 matDiffuse = vColor.xyz * textureMod.rgb;             finalColor = vec4(matDiffuse.rgb, opacity);            } else if (uPixelShader == 2) {              vec4 textureMod = tex*tex2*tex3;             float texAlpha = (textureMod.w);             float opacity = texAlpha*vColor.a;             vec3 matDiffuse = vColor.xyz * textureMod.rgb;             finalColor = vec4(matDiffuse.rgb, opacity);            } else if (uPixelShader == 3) {              vec4 textureMod = tex*tex2*tex3;             float texAlpha = (textureMod.w);             float opacity = texAlpha*vColor.a;             vec3 matDiffuse = vColor.xyz * textureMod.rgb;             finalColor = vec4(matDiffuse.rgb, opacity);            };            if (finalColor.a < uAlphaTreshold ) discard;            if ((uBlendMode >= 3)) {             float Y = 0.2126*255.0*finalColor.r + 0.7152*255.0*finalColor.g + 0.0722*255.0*finalColor.b;             if (Y < 10.0)  discard;            }                        gl_FragColor = finalColor;        }    ";
      class Ma {}
      class Fa {
          constructor() {
              (this.a = a.create()), (this.b = 0), (this.c = { a: h.create(), b: a.create(), c: 0, d: 0, e: 0 });
          }
      }
      function Ra(t) {
          return [((t >> 16) & 255) / 255, ((t >> 8) & 255) / 255, ((t >> 0) & 255) / 255, ((t >> 24) & 255) / 255];
      }
      var Sa = class {
          constructor(t, e) {
              (this.E = 0), (this.U = !1), (this.a = new Date().getTime()), (this.b = t);
              let r = new va(e);
              var o;
              r.i >= 11 &&
                  r.i <= 13 &&
                  (t.z.Item && t.z.Item.ParticleColor ? (o = t.z.Item.ParticleColor) : t.z.Creature && t.z.Creature.ParticleColor && (o = t.z.Creature.ParticleColor),
                  o && ((this.H = [s.create(), s.create(), s.create()]), s.copy(this.H[0], Ra(o.Start[r.i - 11])), s.copy(this.H[1], Ra(o.Mid[r.i - 11])), s.copy(this.H[2], Ra(o.End[r.i - 11])))),
                  (this.c = r),
                  (this.d = n.create()),
                  (this.e = n.create()),
                  (this.f = n.create()),
                  (this.g = n.create()),
                  (this.h = s.create()),
                  (this.i = i.create()),
                  (this.j = a.create()),
                  (this.k = 1),
                  (this.l = a.create()),
                  (this.m = 0),
                  (this.n = a.create()),
                  (this.o = a.create()),
                  (this.p = new Array()),
                  (this.q = a.create()),
                  (this.r = 0),
                  (this.s = 0),
                  (this.t = 0),
                  (this.u = 0),
                  (this.v = a.create()),
                  (this.w = a.create()),
                  (this.x = 0),
                  (this.y = 0),
                  (this.z = 0),
                  (this.A = 0),
                  (this.B = 0),
                  (this.C = 0),
                  (this.D = 0),
                  (this.F = []),
                  (this.G = []);
              for (let t = 0; t < wa; t++) this.G.push(4 * t + 0), this.G.push(4 * t + 1), this.G.push(4 * t + 2), this.G.push(4 * t + 3), this.G.push(4 * t + 2), this.G.push(4 * t + 1);
              switch (((this.J = new fa((2147483647 * Math.random()) >> 0)), this.c.h)) {
                  case 1:
                      this.I = new ma(this.J, r);
                      break;
                  case 2:
                      this.I = new ga(this.J, r, 0 != (256 & this.c.b));
                      break;
                  default:
                      (this.I = null), WH.debug("Found unimplemented generator ", this.c.h);
              }
              const h = this.c.U - this.c.S;
              0 != h ? ((this.s = (this.c.V - this.c.T) / h), (this.t = this.c.T - this.c.S * this.s)) : ((this.s = 0), (this.t = 0));
              let u = this.c.l;
              u <= 0 && (u = 1);
              let l = this.c.k;
              l <= 0 && (l = 1), (this.y = u * l - 1), (this.z = 0);
              let c = u,
                  f = -1;
              do {
                  ++f, (c >>= 1);
              } while (c);
              if (((this.A = f), (this.B = u - 1), (this.z = 0), (32768 & this.c.b) > 0)) {
                  let t = (this.y + 1) * this.J.d();
                  this.z = (t / 4294967296) | 0;
              }
              if (((this.C = 1 / u), (this.D = 1 / l), (269484032 & this.c.b) > 0)) {
                  const t = 0 != (1 & (this.c.b >> 28));
                  this.r = t ? 2 : 3;
              } else this.r = 0;
              this.K = r.g > 1;
          }
          W() {
              (this.b = null),
                  (this.c.c = null),
                  (this.c.O = null),
                  (this.c.P = null),
                  (this.c.m = this.c.m.e()),
                  (this.c.n = this.c.n.e()),
                  (this.c.o = this.c.o.e()),
                  (this.c.p = this.c.p.e()),
                  (this.c.q = this.c.q.e()),
                  (this.c.r = this.c.r.e()),
                  (this.c.t = this.c.t.e()),
                  (this.c.v = this.c.v.e()),
                  (this.c.w = this.c.w.e()),
                  (this.c.x = this.c.x.e()),
                  (this.c.X = this.c.X.e()),
                  (this.c.y = this.c.y.d()),
                  (this.c.z = this.c.z.d()),
                  (this.c.A = this.c.A.d()),
                  (this.c.C = this.c.C.d()),
                  (this.c.D = this.c.D.d()),
                  (this.p = null);
          }
          X(t, e, r) {
              if (!this.I) return;
              let i = n.create(),
                  s = this.I.i(),
                  o = !0;
              this.c.X.c(t.b.a) && (o = this.c.X.d(t, this.b.bg) > 0), (this.T = o);
              const h = a.fromValues(0, 0, 0);
              o &&
                  ((s.a = this.c.m.d(t, this.b.bg, 0)),
                  (s.b = this.c.n.d(t, this.b.bg, 0)),
                  (s.i = this.c.o.d(t, this.b.bg, 0)),
                  (s.j = this.c.p.d(t, this.b.bg, 0)),
                  this.c.q.d(t, this.b.bg, h, s.e),
                  (s.c = this.c.r.d(t, this.b.bg, 0)),
                  (s.d = this.c.t.d(t, this.b.bg, 0)),
                  (s.h = this.c.w.d(t, this.b.bg, 0)),
                  (s.g = this.c.v.d(t, this.b.bg, 0)),
                  (s.f = r ? r.a : this.c.x.d(t, this.b.bg, 0))),
                  n.multiply(i, i, this.b.Z),
                  n.multiply(i, i, this.b.as[this.c.d].m);
              let u = n.create();
              n.fromTranslation(u, a.fromValues(this.c.c[0], this.c.c[1], this.c.c[2])), n.multiply(i, i, u), n.multiply(i, i, Ta);
              let l = n.create(),
                  c = a.create();
              n.invert(l, this.b.bZ.viewMatrix), n.getTranslation(c, l), this.aa(e, i, c, null, this.b.bZ.viewMatrix), this.ak(this.b.bZ.viewMatrix);
              let f = this.b.bZ.context;
              this.L
                  ? (f.bindBuffer(f.ARRAY_BUFFER, this.L), f.bufferData(f.ARRAY_BUFFER, new Float32Array(this.F), f.DYNAMIC_DRAW))
                  : ((this.L = f.createBuffer()), f.bindBuffer(f.ARRAY_BUFFER, this.L), f.bufferData(f.ARRAY_BUFFER, new Float32Array(this.F), f.DYNAMIC_DRAW)),
                  this.M || ((this.M = f.createBuffer()), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, this.M), f.bufferData(f.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.G), f.DYNAMIC_DRAW));
          }
          Y(t) {
              if (this.p.length <= 0) return;
              var e,
                  r = this.b.bZ.context;
              if (
                  (this.V ||
                      ((this.V = new Jn()),
                      (this.V.a = Object(u.createProgramInfo)(r, [Ea, Aa], null, null)),
                      (this.V.b = {}),
                      (this.V.a.attributes = [
                          { loc: r.getAttribLocation(this.V.a.program, "aPosition"), type: r.FLOAT, size: 3, offset: 0, stride: 52 },
                          { loc: r.getAttribLocation(this.V.a.program, "aColor"), type: r.FLOAT, size: 4, offset: 12, stride: 52 },
                          { loc: r.getAttribLocation(this.V.a.program, "aTexcoord0"), type: r.FLOAT, size: 2, offset: 28, stride: 52 },
                          { loc: r.getAttribLocation(this.V.a.program, "aTexcoord1"), type: r.FLOAT, size: 2, offset: 36, stride: 52 },
                          { loc: r.getAttribLocation(this.V.a.program, "aTexcoord2"), type: r.FLOAT, size: 2, offset: 44, stride: 52 },
                      ]),
                      (this.V.c = this.L),
                      (this.V.d = this.M),
                      (this.V.l = this.c.j)),
                  !this.S)
              )
                  if (((this.S = [null, null, null]), 0 != (268435456 & this.c.b)))
                      for (WH.debug("multitexture particle", this.c.f[0], this.c.f[1], this.c.f[2], this), e = 0; e < this.c.f.length; e++) {
                          var i = this.c.f[e];
                          i > -1 && i < this.b.az.length && (this.S[e] = this.b.az[i]);
                      }
                  else this.c.e > -1 && this.c.e < this.b.az.length && (this.S[0] = this.b.az[this.c.e]);
              if (!this.S[0].f || !this.S[0].f.g) return;
              (this.V.b.uViewMatrix = this.b.bZ.viewMatrix), (this.V.b.uProjMatrix = this.b.bZ.projMatrix), (this.V.b.uBlendMode = this.c.g), (this.V.b.uPixelShader = this.r > 1 ? this.r - 1 : 0);
              let n = [this.S[0] && this.S[0].f && this.S[0].f.g, this.S[1] && this.S[1].f && this.S[1].f.g, this.S[2] && this.S[2].f && this.S[2].f.g];
              (this.V.b.uTexture = this.S[0].f.e),
                  (this.V.b.uTexture2 = n[1] ? this.S[1].f.e : null),
                  (this.V.b.uTexture3 = n[2] ? this.S[2].f.e : null),
                  (this.V.b.uHasTexture = n[0] ? 1 : 0),
                  (this.V.b.uHasTexture2 = n[1] ? 1 : 0),
                  (this.V.b.uHasTexture3 = n[2] ? 1 : 0);
              var a = this.c.g;
              4 == a && (a = 3), (this.V.e = a);
              let s = -1;
              1 == a ? (s = 0.501960814) : a > 1 && (s = 1 / 255), (this.V.b.uAlphaTreshold = s), (this.V.h = !1), (this.V.f = !1), (this.V.i = r.TRIANGLES), (this.V.j = (6 * this.E) >> 0), (this.V.k = 0), t.push(this.V);
          }
          Z(t, e) {
              if (0 == (16 & this.c.b))
                  for (var r = 0; r < this.p.length; r++) {
                      var i = this.p[r];
                      a.transformMat4(i.a, i.a, t), a.transformMat3(i.c, i.c, e);
                  }
          }
          aa(t, e, r, i, o) {
              if (null == this.I) return;
              if (this.b.X) return;
              n.getTranslation(this.l, this.d);
              let h = s.create();
              n.getTranslation(h, e), (h[4] = 1), s.transformMat4(h, h, o), (this.m = h[2]);
              let u = a.create();
              if ((n.getTranslation(u, o), this.ab(e, u, i), t > 0)) {
                  let e = a.create();
                  if ((n.getTranslation(e, this.d), 16384 & this.c.b)) {
                      a.subtract(this.o, e, this.l);
                      let r = this.s * (a.length(this.o) / t) + this.t;
                      r >= 0 && (r = Math.min(r, 1)), a.scale(this.n, this.o, r);
                  }
                  if (64 & this.c.b) {
                      this.u += t;
                      let r = 0.03;
                      if (this.u > r)
                          if (((this.u = 0), 0 == this.p.length)) {
                              let t = r / this.u,
                                  i = a.create();
                              a.subtract(i, e, this.l);
                              let n = t * this.c.I;
                              a.multiply(this.v, i, a.fromValues(n, n, n));
                          } else a.set(this.v, 0, 0, 0);
                  }
                  this.ac(t);
              }
          }
          ab(t, e, r) {
              if ((a.copy(this.w, e), null == r || 16 & this.c.b)) n.copy(this.d, t);
              else {
                  let e = n.create();
                  n.invert(e, r), n.multiply(this.d, e, t);
              }
              let i = a.create();
              n.getScaling(i, t), (this.k = i[0]);
          }
          ac(t) {
              if ((t = Math.max(t, 0)) < 0.1) a.copy(this.n, this.o);
              else {
                  let e = Math.floor(t / 0.1);
                  t = -0.1 * e + t;
                  let r = Math.min(Math.floor(this.I.i().lifespan / 0.1), e),
                      i = r + 1,
                      n = 1;
                  (n = i < 0 ? ((1 & i) | (i >> 1)) + ((1 & i) | (i >> 1)) : i), a.scale(this.n, this.o, 1 / n);
                  for (let t = 0; t < r; t++) this.ad(0.1);
              }
              this.ad(t);
          }
          ad(t) {
              let e = new Ma();
              if (t < 0) return;
              this.c.b, this.ae(e, t), this.af(t);
              let r = 0;
              for (; r < this.p.length; ) {
                  let i = this.p[r];
                  (i.b = i.b + t), i.b > Math.max(this.I.g(i.e), 0.001) ? (this.ai(r), r--) : this.aj(i, t, e) || (this.ai(r), r--), r++;
              }
          }
          ae(t, e) {
              (t.a = a.create()), (t.b = a.create()), (t.c = a.create()), (t.d = 0);
              let r = a.fromValues(e, e, e),
                  i = e * e * 0.5,
                  n = a.fromValues(i, i, i);
              a.multiply(t.a, this.c.Q, r);
              let s = a.create();
              this.I.j(s), a.multiply(t.b, s, r), a.multiply(t.c, s, n), (t.d = this.c.J * e);
          }
          af(t) {
              if (!this.T) return;
              let e = this.I.d();
              for (this.x = this.x + t * e; this.x > 1; ) this.ag(t), (this.x -= 1);
          }
          ag(t) {
              let e = this.ah();
              if ((this.I.k(e, t), !(16 & this.c.b))) {
                  let t = s.fromValues(e.a[0], e.a[1], e.a[2], 1),
                      r = s.fromValues(e.c[0], e.c[1], e.c[2], 0);
                  s.transformMat4(t, t, this.d), s.transformMat4(r, r, this.d), a.copy(e.a, t), a.copy(e.c, r), 8192 & this.c.b && (e.a[2] = 0);
              }
              if (64 & this.c.b) {
                  let t = 1 + this.I.i().speedVariation * this.J.e(),
                      r = a.create();
                  a.scale(r, this.v, t), a.add(e.c, e.c, r);
              }
              if (this.r >= 2)
                  for (let t = 0; t < 2; t++) {
                      (e.f[t][0] = this.J.f()), (e.f[t][1] = this.J.f());
                      let r = h.create();
                      h.scale(r, this.c.aa[t], this.J.e()), h.add(e.g[t], r, this.c.Z[t]);
                  }
          }
          ah() {
              let t = new xa();
              return this.p.push(t), t;
          }
          ai(t) {
              this.p.splice(t, 1);
          }
          aj(t, e, r) {
              if (this.r >= 2)
                  for (let r = 0; r < 2; r++) {
                      let i = t.f[r][0] + e * t.g[r][0];
                      (t.f[r][0] = i - Math.floor(i)), (i = t.f[r][1] + e * t.g[r][1]), (t.f[r][1] = i - Math.floor(i));
                  }
              a.add(t.c, t.c, r.a), 16384 & this.c.b && 2 * e < t.b && a.add(t.a, t.a, this.n);
              let i = a.fromValues(e, e, e),
                  s = a.create();
              if ((a.multiply(s, t.c, i), a.add(t.c, t.c, r.b), a.scale(t.c, t.c, 1 - r.d), a.add(t.a, t.a, s), a.add(t.a, t.a, r.c), 2 == this.c.h && 128 & this.c.b)) {
                  let e = a.create();
                  if ((a.copy(e, t.a), 16 & this.c.b)) {
                      if (a.dot(e, s) > 0) return !1;
                  } else {
                      let r = a.create();
                      if ((n.getTranslation(r, this.d), a.subtract(e, t.a, r), a.dot(e, s) > 0)) return !1;
                  }
              }
              return !0;
          }
          ak(t) {
              if (((this.F.length = 0), 0 == this.p.length && null != this.I)) return;
              n.invert(this.f, t);
              let e = i.create();
              i.fromMat4(e, t), this.al(null, t);
              let r = 0;
              for (let t = 0; t < this.p.length; t++) {
                  let e = this.p[t],
                      i = new Fa();
                  if ((this.an(e, i) && (131072 & this.c.b && (this.ap(e, i), r++), 262144 & this.c.b && (this.aq(e, i), r++)), r >= wa)) break;
              }
              this.E = r;
          }
          al(t, e) {
              16 & this.c.b ? n.multiply(this.g, e, this.d) : null != t ? n.multiply(this.g, e, t) : n.copy(this.g, e),
                  n.getTranslation(this.h, e),
                  4096 & this.c.b &&
                      (i.fromMat4(this.i, this.g),
                      16 & this.c.b && Math.abs(this.k) > 0 && i.multiplyScalar(this.i, this.i, 1 / this.k),
                      a.set(this.j, this.i[6], this.i[7], this.i[8]),
                      a.squaredLength(this.j) <= 2.3841858e-7 ? a.set(this.j, 0, 0, 1) : a.normalize(this.j, this.j));
          }
          am(t) {
              let e = 0,
                  r = 0;
              if (0 != this.c.K || 0 != this.c.N) {
                  let i = new fa(t.e);
                  (e = 0 == this.c.L ? this.c.K : this.c.K + i.e() * this.c.L), (r = 0 == this.c.N ? this.c.M : this.c.M + i.e() * this.c.N);
              } else (e = this.c.K), (r = this.c.M);
              return { deltaSpin: r, baseSpin: e };
          }
          an(t, e) {
              let r = this.c.G,
                  i = this.c.H,
                  n = i[0],
                  o = i[1] - n,
                  u = 0,
                  l = t.e,
                  c = t.b;
              if (((r < 1 || 0 != o) && (u = 127 & (c * this.c.F + l)), r < ya[u])) return 0;
              this.ao(t, e, l);
              let f = o * ya[u] + n;
              h.scale(e.c.a, e.c.a, f), 32 & this.c.b && h.scale(e.c.a, e.c.a, this.k);
              let d = s.fromValues(t.a[0], t.a[1], t.a[2], 1);
              return s.transformMat4(d, d, this.g), a.copy(e.a, d), (e.b = 1), 1;
          }
          ao(t, e, r) {
              let i = t.b / this.I.f(),
                  n = new fa(r);
              Math.min(i, 1) <= 0 ? (i = 0) : i >= 1 && (i = 1);
              let s = a.fromValues(255, 255, 255),
                  o = h.fromValues(1, 1),
                  u = 1,
                  l = e.c;
              this.c.y.i(i, s, l.b, this.H), this.H || a.scale(l.b, l.b, 1 / 255), this.c.A.i(i, o, l.a), (l.e = this.c.z.i(i, 1) / 32767);
              let c = 0;
              this.c.C.a.length > 0 ? ((u = 0), (l.c = this.c.C.i(i, u)), (l.c = this.y & (l.c + this.z))) : 65536 & this.c.b ? ((c = (this.y + 1) * n.d()), (l.c = (c / 4294967296) | 0)) : (l.c = 0),
                  (u = 0),
                  (l.d = this.c.D.i(i, u)),
                  (l.d = (l.d + this.z) & this.y);
              let f = 1;
              524288 & this.c.b
                  ? ((f = Math.max(1 + n.e() * this.c.B[1], 99999997e-12)), (l.a[0] = Math.max(1 + n.e() * this.c.B[0], 99999997e-12) * l.a[0]))
                  : ((f = Math.max(1 + n.e() * this.c.B[0], 99999997e-12)), (l.a[0] = f * l.a[0])),
                  (l.a[1] = f * l.a[1]);
          }
          ap(t, e) {
              let r = h.fromValues((e.c.c & this.B) * this.C, (e.c.c >> this.A) * this.D),
                  n = 0,
                  u = 0,
                  l = this.am(t);
              (n = l.baseSpin), (u = l.deltaSpin);
              let c = 0,
                  f = a.fromValues(0, 0, 0),
                  d = a.fromValues(0, 0, 0),
                  b = !1,
                  p = !1;
              if (4 & this.c.b && a.squaredLength(t.c) > 2.3841858e-7)
                  if (((c = 1), 4096 & this.c.b)) b = !0;
                  else {
                      let r = s.fromValues(-t.c[0], -t.c[1], -t.c[2], 0);
                      s.transformMat4(r, r, this.g);
                      let i = a.create();
                      a.copy(i, r);
                      let n = 0,
                          o = a.squaredLength(i);
                      n = o <= 2.3841858e-7 ? 0 : 1 / Math.sqrt(o);
                      let h = a.create();
                      a.copy(h, i), a.scale(h, h, n), a.copy(f, h), a.scale(f, f, e.c.a[0]), (d = a.fromValues(h[1], -h[0], 0)), a.scale(d, d, e.c.a[1]), (p = !0), (b = !1);
                  }
              if ((4096 & this.c.b || b) && !p) {
                  let r = i.create();
                  i.copy(r, this.i);
                  let s = e.c.a[0];
                  if (c) {
                      let n = 0,
                          o = a.fromValues(-t.c[0], -t.c[1], -t.c[2]),
                          h = a.squaredLength(o);
                      (n = h <= 2.3841858e-7 ? 0 : 1 / Math.sqrt(h)),
                          i.multiply(r, this.i, i.fromValues(o[0] * n, o[1] * n, 0, -o[1] * n, o[0] * n, 0, 0, 0, 1)),
                          n > 2.3841858e-7 && (s = e.c.a[0] * (1 / Math.sqrt(a.squaredLength(t.c)) / n));
                  }
                  if ((this.r, a.set(f, r[0], r[1], r[2]), a.scale(f, f, s), a.set(d, r[4], r[5], r[6]), a.scale(d, d, e.c.a[1]), (u = d[0]), (p = !0), 0 != this.c.M || 0 != this.c.N)) {
                      let e = n + u * t.b;
                      512 & this.c.b && 1 & t.e && (e = -e);
                      let r = a.create();
                      a.copy(r, this.j), this.r;
                      let s = i.create(),
                          h = o.create();
                      o.setAxisAngle(h, r, e), i.fromQuat(s, h), a.transformMat3(f, f, s), a.set(d, u, d[1], d[2]), a.transformMat3(d, d, s);
                  }
              }
              if (!p)
                  if (0 != this.c.M || 0 != this.c.N) {
                      let r = n + u * t.b;
                      512 & this.c.b && 1 & t.e && (r = -r);
                      let i = Math.cos(r),
                          s = Math.sin(r);
                      a.set(f, i, s, 0), a.scale(f, f, e.c.a[0]), a.set(d, -s, i, 0), a.scale(d, d, e.c.a[1]), 134217728 & this.c.b && a.add(e.a, e.a, a.fromValues(d[0], d[1], 0));
                  } else a.set(f, e.c.a[0], 0, 0), a.set(d, 0, e.c.a[1], 0);
              return this.ar(f, d, e.a, e.c.b, e.c.e, r[0], r[1], t.f), 0;
          }
          aq(t, e) {
              let r = h.fromValues((e.c.d & this.B) * this.C, (e.c.d >> this.A) * this.D),
                  i = a.fromValues(0, 0, 0),
                  n = a.fromValues(0, 0, 0),
                  o = this.c.E;
              1024 & this.c.b && (o = Math.min(t.b, o));
              let u = s.create();
              a.scale(u, t.c, -1), (u[3] = 0), s.transformMat4(u, u, this.g), a.scale(u, u, o);
              let l = a.fromValues(u[0], u[1], 0);
              if (a.dot(l, l) > 1e-4) {
                  let t = 1 / a.length(l);
                  h.scale(e.c.a, e.c.a, t), h.multiply(l, l, e.c.a), (n = a.fromValues(-l[1], l[0], 0)), a.scale(i, u, 0.5), a.add(e.a, e.a, i);
              } else (i = a.fromValues(0.05 * e.c.a[0], 0, 0)), (n = a.fromValues(0, 0.05 * e.c.a[1], 0));
              return this.ar(i, n, e.a, e.c.b, e.c.e, r[0], r[1], t.f), 1;
          }
          ar(t, e, r, i, n, s, o, u) {
              const l = [-1, -1, 1, 1],
                  c = [1, -1, 1, -1],
                  f = [0, 0, 1, 1],
                  d = [0, 1, 0, 1];
              let b = a.create(),
                  p = h.create(),
                  m = h.create(),
                  _ = h.create();
              for (let g = 0; g < 4; g++)
                  a.set(b, 0, 0, 0),
                      a.scaleAndAdd(b, b, t, l[g]),
                      a.scaleAndAdd(b, b, e, c[g]),
                      a.add(b, b, r),
                      h.set(p, f[g] * this.C + s, d[g] * this.D + o),
                      h.set(m, f[g] * this.c.Y[0] + u[0][0], d[g] * this.c.Y[0] + u[0][1]),
                      h.set(_, f[g] * this.c.Y[1] + u[1][0], d[g] * this.c.Y[1] + u[1][1]),
                      this.F.push(b[0]),
                      this.F.push(b[1]),
                      this.F.push(b[2]),
                      this.F.push(i[0]),
                      this.F.push(i[1]),
                      this.F.push(i[2]),
                      this.F.push(n),
                      this.F.push(p[0]),
                      this.F.push(p[1]),
                      this.F.push(m[0]),
                      this.F.push(m[1]),
                      this.F.push(_[0]),
                      this.F.push(_[1]);
          }
      };
      var Ca = class {
          constructor(t) {
              this.a = t.getFloat();
          }
      };
      var Pa = class {
          constructor(t) {
              (this.buffer = new DataView(t)), (this.position = 0);
          }
          getBool() {
              var t = 0 != this.buffer.getUint8(this.position);
              return (this.position += 1), t;
          }
          getUint8() {
              var t = this.buffer.getUint8(this.position);
              return (this.position += 1), t;
          }
          getInt8() {
              var t = this.buffer.getInt8(this.position);
              return (this.position += 1), t;
          }
          getUint16() {
              var t = this.buffer.getUint16(this.position, !0);
              return (this.position += 2), t;
          }
          getInt16() {
              var t = this.buffer.getInt16(this.position, !0);
              return (this.position += 2), t;
          }
          getUint32() {
              var t = this.buffer.getUint32(this.position, !0);
              return (this.position += 4), t;
          }
          getInt32() {
              var t = this.buffer.getInt32(this.position, !0);
              return (this.position += 4), t;
          }
          getFloat() {
              var t = this.buffer.getFloat32(this.position, !0);
              return (this.position += 4), t;
          }
          getString(t) {
              void 0 === t && (t = this.getUint16());
              for (var e = "", r = 0; r < t; ++r) e += String.fromCharCode(this.getUint8());
              return e;
          }
          setBool(t) {
              this.buffer.setUint8(this.position, t ? 1 : 0), (this.position += 1);
          }
          setUint8(t) {
              this.buffer.setUint8(this.position, t), (this.position += 1);
          }
          setInt8(t) {
              this.buffer.setInt8(this.position, t), (this.position += 1);
          }
          setUint16(t) {
              this.buffer.setUint16(this.position, t, !0), (this.position += 2);
          }
          setInt16(t) {
              this.buffer.setInt16(this.position, t, !0), (this.position += 2);
          }
          setUint32(t) {
              this.buffer.setUint32(this.position, t, !0), (this.position += 4);
          }
          setInt32(t) {
              this.buffer.setInt32(this.position, t, !0), (this.position += 4);
          }
          setFloat(t) {
              this.buffer.setFloat32(this.position, t, !0), (this.position += 4);
          }
      };
      class Ia {
          constructor() {
              (this.a = a.create()), (this.b = s.create()), (this.c = h.create());
          }
      }
      class Ua {}
      const ka = [0, 1, 2, 10, 3, 4, 5, 13];
      function Da(t, e) {
          return a.fromValues(t[4 * e + 0], t[4 * e + 1], t[4 * e + 2]);
      }
      const Oa =
              "        attribute vec3 aPosition;\n        attribute vec4 aColor;\n        attribute vec2 aTexcoord0;\n        uniform mat4 uViewMatrix;\n        uniform mat4 uProjMatrix;\n        varying vec4 vColor;\n        varying vec2 vTexcoord0;\n        void main() {\n            vec4 aPositionVec4 = vec4(aPosition, 1);\n            vColor = aColor;\n            vTexcoord0 = aTexcoord0;\n            gl_Position = uProjMatrix * uViewMatrix * aPositionVec4;\n        }",
          Ba =
              "    precision mediump float;    varying vec4 vColor;\n    varying vec2 vTexcoord0;\n    uniform sampler2D uTexture;\n    void main() {\n        vec4 tex = texture2D(uTexture, vTexcoord0).rgba;\n        gl_FragColor = vec4((vColor.rgb*tex.rgb), tex.a * vColor.a );\n    }";
      class Na {}
      var La = class {
          constructor(t, e) {
              (this.g = a.create()),
                  (this.h = a.create()),
                  (this.p = new Ua()),
                  (this.q = a.create()),
                  (this.r = a.create()),
                  (this.s = a.create()),
                  (this.t = a.create()),
                  (this.u = a.create()),
                  (this.v = a.create()),
                  (this.w = a.create()),
                  (this.x = a.create()),
                  (this.y = a.create()),
                  (this.z = a.create()),
                  (this.A = a.create()),
                  (this.B = a.create()),
                  (this.O = a.create()),
                  (this.V = t.bZ.context),
                  (this.a = t);
              let r = new Na();
              var i;
              if (((r.a = e.getInt32()), (r.b = e.getInt32()), (r.c = a.fromValues(e.getFloat(), e.getFloat(), e.getFloat())), (i = e.getInt32()) > 0)) {
                  r.j = new Array(i);
                  for (let t = 0; t < i; ++t) r.j[t] = e.getInt16();
              }
              if ((i = e.getInt32()) > 0) {
                  r.k = new Array(i);
                  for (let t = 0; t < i; ++t) r.k[t] = e.getInt16();
              }
              (r.l = new zn(e, Pn)),
                  (r.m = new zn(e, Un)),
                  (r.n = new zn(e, kn)),
                  (r.o = new zn(e, kn)),
                  (r.d = e.getFloat()),
                  (r.e = e.getFloat()),
                  (r.f = e.getFloat()),
                  (r.g = e.getInt16()),
                  (r.h = e.getInt16()),
                  (r.p = new zn(e, Un)),
                  (r.q = new zn(e, Dn)),
                  (r.r = e.getInt16()),
                  (this.U = r),
                  (this.ab = new Array(r.k.length)),
                  (this.ae = new Array(r.k.length));
              for (let e = 0; e < r.k.length; e++) this.ae[e] = t.ay[r.k[e]];
              let n = s.fromValues(255, 255, 255, 255),
                  o = new Ua();
              (o.a = 0), (o.b = 0), (o.c = 1), (o.d = 1), this.au(r.d, r.e, n, o, r.h, r.g), this.ag(r.f), this.af(!1);
          }
          af(t) {
              (this.L = t), this.L || (this.J = !1);
          }
          ag(t) {
              this.S = t;
          }
          ah() {
              return !1;
          }
          ai(t) {
              this.R = t;
          }
          aj(t) {
              this.Q = t;
          }
          ak(t) {
              this.F[3] = Math.max(t, 0);
          }
          al() {
              let t = a.create();
              a.sub(t, this.g, this.O);
              let e = a.squaredLength(t);
              a.scale(t, this.q, this.R),
                  a.subtract(this.w, this.g, t),
                  a.scale(t, this.r, this.R),
                  a.subtract(this.x, this.O, t),
                  a.scale(t, this.q, this.Q),
                  a.add(this.y, this.g, t),
                  a.scale(t, this.r, this.Q),
                  a.add(this.z, this.O, t),
                  a.scale(this.u, this.s, e),
                  a.scale(this.v, this.t, e);
          }
          am(t, e, r) {
              let i;
              if (this.M && this.L) {
                  i = t;
                  let r = a.create();
                  n.getTranslation(r, i),
                      a.add(r, r, e),
                      a.copy(this.h, e),
                      this.J ? (a.copy(this.g, this.O), a.copy(this.s, this.t), a.copy(this.q, this.r)) : (a.copy(this.g, r), (this.s = Da(i, 2)), (this.q = Da(i, 1)), (this.f = 0), (this.J = !0)),
                      (this.O = r),
                      (this.t = Da(i, 2)),
                      (this.r = Da(i, 1));
              }
          }
          an(t) {
              var e = i.create();
              i.fromMat4(e, t),
                  (this.s = a.transformMat3(this.s, this.s, e)),
                  (this.q = a.transformMat3(this.q, this.q, e)),
                  (this.t = a.transformMat3(this.t, this.t, e)),
                  (this.r = a.transformMat3(this.r, this.r, e)),
                  (this.g = a.transformMat4(this.g, this.g, t)),
                  (this.O = a.transformMat4(this.O, this.O, t));
              for (var r = 0; r < this.i.length; r++) a.transformMat4(this.i[r].a, this.i[r].a, t);
          }
          ao(t, e, r) {
              (this.F[2] = r), (this.F[1] = e), (this.F[0] = t);
          }
          ap(t) {
              if (this.P != t) {
                  this.P = t;
                  let e = t % this.I,
                      r = e;
                  0 != (2147483648 & e) && (r = ((1 & e) | (e >> 1)) + ((1 & e) | (e >> 1)));
                  let i = r * this.l + this.G.b;
                  this.p.b = i;
                  let n = t / this.I,
                      a = n;
                  0 != (2147483648 & n) && ((a = (n = (1 & n) | (n >> 1)) + n), (i = this.p.b));
                  let s = a * this.m + this.G.a;
                  (this.p.a = s), (this.p.d = i + this.l), (this.p.c = s + this.m);
              }
          }
          aq(t, e, r) {
              let i,
                  n = this.i[2 * this.d],
                  s = this.i[2 * this.d + 1],
                  o = a.create();
              a.scale(o, this.v, 1 - e),
                  a.subtract(o, this.x, o),
                  a.scale(n.a, o, e),
                  a.scale(o, this.u, e),
                  a.add(o, this.w, o),
                  a.scale(o, o, 1 - e),
                  a.add(n.a, n.a, o),
                  a.scale(o, this.v, 1 - e),
                  a.subtract(o, this.z, o),
                  a.scale(s.a, o, e),
                  a.scale(o, this.u, e),
                  a.add(o, this.y, o),
                  a.scale(o, o, 1 - e),
                  a.add(s.a, s.a, o),
                  (this.c[this.d] = t),
                  (i = r),
                  (this.d = this.d + i),
                  this.d >= this.c.length && (this.d -= this.c.length);
          }
          ar(t, e) {
              if (this.a.X) return;
              let r = a.create(),
                  i = 1;
              (r = this.U.l.d(t, this.a.bg, r)), (i = this.U.m.d(t, this.a.bg)), this.ao(r[0], r[1], r[2]), this.ak(i / 32767);
              let s = this.U.n.d(t, this.a.bg);
              this.aj(s);
              let o = this.U.o.d(t, this.a.bg);
              this.ai(o);
              let h = this.U.p.d(t, this.a.bg);
              this.ap(h);
              let u = this.U.q.d(t, this.a.bg, 1);
              this.af(0 != u);
              let l = n.create();
              n.mul(l, this.a.Z, this.a.as[this.U.b].m), n.translate(l, l, this.U.c);
              let c = a.create();
              this.am(l, c, null), this.as(e, !1);
          }
          as(t, e) {
              let r, i, n, a, s, o, h, u, l, c, f, d, b, p, m, _, g, v, x, y, T, w, E, A, M, F, R, S, C, P, I, U, k, D, O, B, N, L, z, j, H, G, V, q, X, Y, Z, W;
              for (this.N || (this.C > 0 && (t = 1 / this.C + 99999997e-12)), t >= 0 ? this.D <= t && (t = this.D) : (t = 0), v = this.e; v != this.d && !(t + this.c[v] <= this.D); v = this.e) this.e = this.at(this.e, 1);
              if (!e && this.M && this.L && this.J) {
                  (I = t * this.C + this.f), (W = this.F), this.al();
                  let e = !1;
                  if (((D = 0), I < 1 ? (e = !0) : ((k = 1 / (I - (Z = this.f))), (g = Math.floor(I - 1)), (D = Math.ceil(Math.max(g, 0)))), -1 == D || e));
                  else
                      for (U = 1, v = 1; (P = this.d), (L = this.i.length), (this.i[2 * P].b = W), (x = 2 * this.d + 1), (z = this.i.length), (this.i[x].b = W), this.aq((v - Z) * k * -t, (v - Z) * k, 1), -1 != --D; v = U)
                          (U += 1), (Z = this.f);
                  (y = Math.floor(I)),
                      (this.f = I - y),
                      this.aq(0, 1, 0),
                      (C = this.d),
                      (j = this.i.length),
                      (T = this.i[2 * C]),
                      (w = this.p.b),
                      (T.c[1] = this.p.a),
                      (T.c[0] = w),
                      (E = 2 * this.d + 1),
                      (H = this.i.length),
                      (A = this.i[E]),
                      (M = this.p.b),
                      (A.c[1] = this.p.c),
                      (A.c[0] = M),
                      (S = this.d),
                      (G = this.i.length),
                      (this.i[2 * S].b = W),
                      (F = 2 * this.d + 1),
                      (V = this.i.length),
                      (this.i[F].b = W);
              }
              (this.A[2] = 34028235e31), (this.A[1] = 34028235e31), (this.A[0] = 34028235e31), (this.B[2] = -34028235e31), (this.B[1] = -34028235e31), (this.B[0] = -34028235e31), (O = this.e);
              for (let e = this.e; e != this.d; O = e)
                  (_ = 2 * e),
                      (Y = this.i.length),
                      (R = O),
                      (N = this.i[2 * e]),
                      (r = _ + 1),
                      (i = this.i[2 * e + 1]),
                      (n = (this.S + this.S) * this.c[R] * t + t * this.S * t),
                      (N.a[2] = N.a[2] + n),
                      (i.a[2] = n + i.a[2]),
                      (a = N.a[0]),
                      (s = this.A[0]) > N.a[0] && ((s = N.a[0]), (this.A[0] = a), (a = N.a[0])),
                      (o = N.a[1]),
                      (h = this.A[1]) > o && ((h = N.a[1]), (this.A[1] = o), (o = N.a[1])),
                      (u = N.a[2]),
                      (l = this.A[2]) > u && ((l = N.a[2]), (this.A[2] = u), (u = N.a[2])),
                      a > this.B[0] && (this.B[0] = a),
                      o > this.B[1] && (this.B[1] = o),
                      u > this.B[2] && (this.B[2] = u),
                      (c = i.a[0]),
                      s > i.a[0] && ((this.A[0] = c), (c = i.a[0])),
                      h > (f = i.a[1]) && ((this.A[1] = f), (f = i.a[1])),
                      l > (d = i.a[2]) && ((this.A[2] = d), (d = i.a[2])),
                      c > this.B[0] && (this.B[0] = c),
                      f > this.B[1] && (this.B[1] = f),
                      d > this.B[2] && (this.B[2] = d),
                      (q = this.c.length),
                      (this.c[R] = t + this.c[R]),
                      (b = this.l),
                      (X = this.c.length),
                      (p = b * this.c[R] * this.k + this.p.b),
                      (N.c[1] = this.p.a),
                      (N.c[0] = p),
                      (i.c[1] = this.p.c),
                      (i.c[0] = p),
                      (e = (B = O + 1) - (m = this.c.length)),
                      m > B && (e = B);
              this.N = !0;
          }
          at(t, e) {
              let r = e + t;
              t = r;
              let i = this.c.length;
              return r >= i && (t = r - i), t;
          }
          au(t, e, r, i, n, a) {
              let o, h, u, l, c, f, d, b;
              (d = Math.ceil(t)), (b = Math.max(0.25, e)), (o = Math.ceil(b * d)), (h = Math.ceil(Math.max(o + 1 + 1, 0))), (this.c = new Array(h)), (this.e = 0), (this.d = 0), (this.f = 0), (this.J = !1), (this.i = new Array(2 * h));
              for (let t = 0; t < this.i.length; t++) {
                  this.i[t] = new Ia();
                  let e = this.i[t];
                  (e.a[0] = 0), (e.a[1] = 0), (e.a[2] = 0), (e.b = s.fromValues(0, 0, 0, 0)), (e.c[0] = 0), (e.c[1] = 0);
              }
              this.j = new Array(4 * h);
              for (let t = 0; t < this.j.length; t++) this.j[t] = t % (2 * h);
              (this.k = 1 / b),
                  (u = a),
                  0 != (2147483648 & a) && (u = ((1 & a) | (a >> 1)) + ((1 & a) | (a >> 1))),
                  (this.l = (i.d - i.b) / u),
                  (l = n),
                  0 != (2147483648 & n) && (l = ((1 & n) | (n >> 1)) + ((1 & n) | (n >> 1))),
                  (this.m = (i.c - i.a) / l),
                  (this.n = 1 / this.l),
                  (this.o = 1 / this.m),
                  (this.C = d),
                  (this.D = b),
                  s.scale(r, r, 1 / 255),
                  (this.F = r),
                  (this.G = i),
                  (this.H = n),
                  (this.I = a),
                  (this.P = 0),
                  (c = 0 * this.l + this.G.b),
                  (this.p.b = c),
                  (f = 0 * this.m + this.G.a),
                  (this.p.a = f),
                  (this.p.d = c + this.l),
                  (this.p.c = f + this.m),
                  (this.Q = 10),
                  (this.R = 10),
                  (this.S = 0),
                  (this.M = !0),
                  (this.L = !0),
                  (this.K = !0);
          }
          av() {
              let t = new Array(this.i.length);
              for (let e = 0, r = 0; e < this.i.length; ++e)
                  (t[r++] = this.i[e].a[0]),
                      (t[r++] = this.i[e].a[1]),
                      (t[r++] = this.i[e].a[2]),
                      (t[r++] = this.i[e].b[0]),
                      (t[r++] = this.i[e].b[1]),
                      (t[r++] = this.i[e].b[2]),
                      (t[r++] = this.i[e].b[3]),
                      (t[r++] = this.i[e].c[0]),
                      (t[r++] = this.i[e].c[1]);
              if (this.ah()) return;
              let e = this.V;
              this.W
                  ? (e.bindBuffer(e.ARRAY_BUFFER, this.W), e.bufferData(e.ARRAY_BUFFER, new Float32Array(t), e.DYNAMIC_DRAW))
                  : ((this.W = e.createBuffer()), e.bindBuffer(e.ARRAY_BUFFER, this.W), e.bufferData(e.ARRAY_BUFFER, new Float32Array(t), e.DYNAMIC_DRAW)),
                  this.X
                      ? (e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.X), e.bufferData(e.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.j), e.DYNAMIC_DRAW))
                      : ((this.X = e.createBuffer()), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.X), e.bufferData(e.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.j), e.DYNAMIC_DRAW));
          }
          aw(t) {
              if (this.ah()) return;
              let e = this.V;
              for (let i = 0; i < this.U.j.length; i++) {
                  if (!this.ab[i]) {
                      let t = new Jn();
                      (t.a = Object(u.createProgramInfo)(e, [Oa, Ba], null, null)),
                          (t.b = {}),
                          (t.a.attributes = [
                              { loc: e.getAttribLocation(t.a.program, "aPosition"), type: e.FLOAT, size: 3, offset: 0, stride: 36 },
                              { loc: e.getAttribLocation(t.a.program, "aColor"), type: e.FLOAT, size: 4, offset: 12, stride: 36 },
                              { loc: e.getAttribLocation(t.a.program, "aTexcoord0"), type: e.FLOAT, size: 2, offset: 28, stride: 36 },
                          ]),
                          (t.c = this.W),
                          (t.d = this.X),
                          (this.ab[i] = t);
                  }
                  var r = this.U.j[i];
                  if (r <= -1 || r > this.a.az.length) continue;
                  let n = this.a.az[r];
                  if (!n.f || !n.f.g) continue;
                  let a = i;
                  a >= this.U.k.length && (a = 0);
                  let s = this.a.ay[this.U.k[a]];
                  (this.ab[i].b.uViewMatrix = this.a.bZ.viewMatrix), (this.ab[i].b.uProjMatrix = this.a.bZ.projMatrix), (this.ab[i].b.uTexture = n.f.e), (this.ab[i].h = !1), (this.ab[i].f = !1), (this.ab[i].e = ka[s.b]);
                  let o = this.d > this.e ? 2 * (this.d - this.e) + 2 : 2 * (this.c.length + this.d - this.e) + 2;
                  (this.ab[i].i = e.TRIANGLE_STRIP), (this.ab[i].j = o), (this.ab[i].k = 2 * this.e * 2), t.push(this.ab[i]);
              }
          }
      };
      class za {
          constructor() {
              (this.a = null), (this.b = null), (this.c = null);
          }
          d() {
              null != this.a && this.a.i(), null != this.b && this.b.i(), null != this.c && this.c.i();
          }
          e() {
              return !(this.a && !this.a.h()) && !(this.b && !this.b.h()) && !(this.c && !this.c.h());
          }
      }
      class ja {
          constructor() {
              (this.a = null), (this.b = null), (this.c = null), (this.d = {}), (this.i = new d());
          }
      }
      const Ha =
              "uniform float x;\nuniform float y;\nuniform float width;\nuniform float height;\n\nattribute vec2 aTextCoord;\nvarying vec2 vTextCoords;\nvoid main() {\n    vTextCoords = aTextCoord;\n\n\n    vec2 pos = vec2(\n        (x + aTextCoord.x*width)* 2.0 - 1.0,\n        (y + aTextCoord.y*height)* 2.0 - 1.0\n    );\n\n    gl_Position = vec4(pos.x, pos.y, 0, 1);\n}",
          Ga =
              "precision mediump float;\n\nvarying vec2 vTextCoords;\nuniform sampler2D uDiffuseTexture;\nuniform sampler2D uSpecularTexture;\nuniform sampler2D uEmissiveTexture;\n\nvoid main() {\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\n    if (diffuse.a < 0.001) discard;    gl_FragColor = diffuse;\n}",
          Va =
              "precision mediump float;\n\nvarying vec2 vTextCoords;\nuniform sampler2D uDiffuseTexture;\nuniform sampler2D uSpecularTexture;\nuniform sampler2D uEmissiveTexture;\n\nvoid main() {\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\n    vec4 specular = texture2D( uSpecularTexture, vTextCoords.xy );\n    if (diffuse.a < 0.001) discard;    gl_FragColor = vec4(specular.rgb, 1.0);\n}",
          qa =
              "precision mediump float;\n\nvarying vec2 vTextCoords;\nuniform sampler2D uDiffuseTexture;\nuniform sampler2D uSpecularTexture;\nuniform sampler2D uEmissiveTexture;\n\nvoid main() {\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\n    vec4 emissive = texture2D( uEmissiveTexture, vTextCoords.xy );\n    if (diffuse.a < 0.001) discard;    gl_FragColor = vec4(emissive.rgb, 1.0);\n}";
      let Xa = null,
          Ya = null;
      class Za {
          constructor(t, e, r) {
              (this.g = !1),
                  (this.d = t),
                  (this.e = e),
                  (this.f = r),
                  (function (t) {
                      (Ya = t.createTexture()), t.bindTexture(t.TEXTURE_2D, Ya), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 1])), t.bindTexture(t.TEXTURE_2D, null);
                      let e = (Xa = new ja());
                      (e.a = Object(u.createProgramInfo)(t, [Ha, Ga], null, null)),
                          (e.b = Object(u.createProgramInfo)(t, [Ha, Va], null, null)),
                          (e.c = Object(u.createProgramInfo)(t, [Ha, qa], null, null)),
                          (e.d = {}),
                          (e.f = t.createBuffer()),
                          t.bindBuffer(t.ARRAY_BUFFER, e.f),
                          t.bufferData(t.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), t.STATIC_DRAW),
                          t.bindBuffer(t.ARRAY_BUFFER, null),
                          (e.e = t.createBuffer()),
                          t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, e.e),
                          t.bufferData(t.ELEMENT_ARRAY_BUFFER, new Int16Array([0, 1, 2, 1, 3, 2]), t.STATIC_DRAW),
                          t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null),
                          (e.g = t.createFramebuffer()),
                          (e.h = { loc: t.getAttribLocation(e.a.program, "aTextCoord"), type: t.FLOAT, size: 2, offset: 0, stride: 0 });
                  })(t);
          }
          h() {
              let t = this.d;
              this.a && t.deleteTexture(this.a),
                  this.b && t.deleteTexture(this.b),
                  this.c && t.deleteTexture(this.c),
                  (this.a = t.createTexture()),
                  t.bindTexture(t.TEXTURE_2D, this.a),
                  t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.e, this.f, 0, t.RGBA, t.UNSIGNED_BYTE, null),
                  t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
                  (this.b = t.createTexture()),
                  t.bindTexture(t.TEXTURE_2D, this.b),
                  t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.e, this.f, 0, t.RGBA, t.UNSIGNED_BYTE, null),
                  t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
                  (this.c = t.createTexture()),
                  t.bindTexture(t.TEXTURE_2D, this.c),
                  t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.e, this.f, 0, t.RGBA, t.UNSIGNED_BYTE, null),
                  t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
                  t.bindTexture(t.TEXTURE_2D, null),
                  t.bindFramebuffer(t.FRAMEBUFFER, Xa.g),
                  t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.a, 0),
                  t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT),
                  t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.b, 0),
                  t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT),
                  t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.c, 0),
                  t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT),
                  t.useProgram(Xa.b.program),
                  t.bindBuffer(t.ARRAY_BUFFER, Xa.f),
                  t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, Xa.e),
                  Xa.i.disableAll(),
                  Xa.i.enable(t, [Xa.h]),
                  t.viewport(0, 0, this.e, this.f);
          }
          i(t, e, r, i, n) {
              let a = this.d;
              (Xa.d.x = e),
                  (Xa.d.y = r),
                  (Xa.d.width = i),
                  (Xa.d.height = n),
                  (null == t.b && null == t.c) || (this.g = !0),
                  (Xa.d.uDiffuseTexture = null != t.a ? t.a.e : Ya),
                  (Xa.d.uSpecularTexture = null != t.b ? t.b.e : Ya),
                  (Xa.d.uEmissiveTexture = null != t.c ? t.c.e : Ya),
                  a.disable(a.CULL_FACE),
                  a.disable(a.DEPTH_TEST),
                  a.enable(a.BLEND),
                  a.blendEquation(a.FUNC_ADD),
                  a.blendFuncSeparate(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE),
                  a.useProgram(Xa.a.program),
                  a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.a, 0),
                  Object(u.setUniforms)(Xa.a, Xa.d),
                  a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0),
                  a.useProgram(Xa.b.program),
                  a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.b, 0),
                  Object(u.setUniforms)(Xa.b, Xa.d),
                  a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0),
                  a.useProgram(Xa.c.program),
                  a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.c, 0),
                  Object(u.setUniforms)(Xa.c, Xa.d),
                  a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0),
                  a.useProgram(null);
          }
          j() {
              let t = this.d;
              t.bindFramebuffer(t.FRAMEBUFFER, null), t.enable(t.CULL_FACE), t.enable(t.DEPTH_TEST);
          }
      }
      let Wa = function (t, e) {
          let r = Math.abs(t),
              i = Math.abs(e);
          return Number((r - Math.floor(r / i) * i).toPrecision(8)) * Math.sign(t);
      };
      const Ka = 10;
      class Ja {
          constructor(t, e, r, i, o, h) {
              (this.f = !1),
                  (this.I = null),
                  (this.V = new Sn()),
                  (this.Y = !1),
                  (this.aq = []),
                  (this.aJ = []),
                  (this.aK = []),
                  (this.aM = null),
                  (this.aV = !1),
                  (this.aW = !1),
                  (this.ba = null),
                  (this.bb = null),
                  (this.bc = null),
                  (this.bg = []);
              if (
                  ((this.f = o),
                  (this.bZ = t),
                  (this.a = e),
                  (this.b = r),
                  (this.c = i),
                  (this.d = null),
                  (this.e = !1),
                  (this.g = !0),
                  (this.h = !0),
                  (this.i = n.create()),
                  (this.k = this.a.options),
                  "classic" == this.k.gameDataEnv ? ((fn[14] = 14), (fn[15] = 15)) : ((fn[14] = 22), (fn[15] = 22)),
                  (this.j = null),
                  (this.l = this.k.mount && this.k.mount.type == hn.NPC && this.k.mount.id == this.b.id),
                  this.b.type == hn.CHARACTER && this.k.mount && this.k.mount.type == hn.NPC && this.k.mount.id && ((this.k.mount.parent = this), (this.j = new Ja(t, e, this.k.mount, 0, !1))),
                  this.k.extraModels && !this.b.parent)
              ) {
                  this.E = [];
                  let r = this.k.extraModels;
                  if ($.isArray(r))
                      for (var u = 0; u < r.length; ++u) {
                          var l = { type: hn.PATH, id: r[u][0], parent: this, shoulder: -1 };
                          this.E.push(new Ja(t, e, l, 0, !1));
                      }
              }
              (this.m = -1),
                  (this.n = -1),
                  (this.o = this.k.cls ? parseInt(this.k.cls) : -1),
                  (this.z = null),
                  (this.p = 0),
                  (this.q = 0),
                  (this.r = 0),
                  (this.s = 0),
                  (this.u = 0),
                  (this.v = 0),
                  (this.w = 0),
                  (this.x = 0),
                  (this.y = 0),
                  (this.A = this.b.parent || null),
                  (this.C = new Map()),
                  (this.D = {}),
                  (this.B = !1),
                  (this.F = {}),
                  (this.aM = null),
                  (this.aN = null),
                  (this.G = {}),
                  (this.H = []);
              for (let t = 0; t < 14; t++) this.H.push({});
              (this.L = !1),
                  (this.M = -1),
                  (this.N = -1),
                  (this.O = 37),
                  (this.P = new Array(this.O)),
                  (this.Q = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
                  (this.R = 0);
              for (u = 0; u < this.O; u++) this.P[u] = 100 * u + this.Q[u];
              (this.S = 0),
                  (this.T = 0),
                  (this.U = null),
                  (this.V.d = 0),
                  (this.V.b.a = -1),
                  (this.W = 0),
                  (this.X = !1),
                  (this.Z = n.create()),
                  (this.aa = !1),
                  (this.ab = [0.35, 0.35, 0.35, 1]),
                  (this.ac = [1, 1, 1, 1]),
                  (this.ad = [0.35, 0.35, 0.35, 1]),
                  (this.ae = a.create()),
                  (this.af = a.create()),
                  (this.ag = a.create()),
                  a.normalize(this.ae, [5, -3, 3]),
                  a.normalize(this.af, [5, 5, 5]),
                  a.normalize(this.ag, [-5, -5, -5]),
                  (this.ah = !1),
                  (this.ai = !1),
                  (this.aj = a.fromValues(0, 0, 0)),
                  (this.ak = a.fromValues(0, 0, 0)),
                  (this.al = a.fromValues(0, 0, 0)),
                  (this.boundsSize = a.fromValues(0, 0, 0)),
                  (this.an = null),
                  (this.ao = null),
                  (this.aq = null),
                  (this.ar = null),
                  (this.as = null),
                  (this.at = null),
                  (this.au = null),
                  (this.av = null),
                  (this.aw = null),
                  (this.ax = null),
                  (this.ay = null),
                  (this.az = null),
                  (this.aA = null),
                  (this.aB = null),
                  (this.aC = null),
                  (this.aD = null),
                  (this.aE = null),
                  (this.aF = null),
                  (this.aG = null),
                  (this.aH = null),
                  (this.aI = null),
                  (this.aJ = null),
                  (this.aK = null),
                  (this.aP = n.create()),
                  (this.aQ = a.create()),
                  (this.aR = a.create()),
                  (this.aS = a.create()),
                  (this.aT = s.create()),
                  (this.aU = n.create()),
                  h || this.bR();
          }
          bh(t) {
              if (this[t]) {
                  for (var e = this[t], r = 0; r < e.length; ++r) e[r] && e[r].destroy && e[r].destroy(), (e[r] = null);
                  this[t] = null;
              }
          }
          bi() {
              var t = this;
              if (((this.aW = !0), t.aN && t.aN.d(), t.H)) for (let e = 0; e < t.H.length; ++e) for (const r in t.H[e]) t.H[e][r].d();
              if (t.G) for (let e in t.G) t.G[e].d();
              if (t.F) for (const e in t.F) t.F[e].i();
              if (
                  (t.ao && (t.ao = null),
                  t.ar && (t.ar = null),
                  t.at && (t.at = null),
                  t.au && (t.au = null),
                  t.ax && (t.ax = null),
                  t.aA && (t.aA = null),
                  t.aC && (t.aC = null),
                  t.aD && (t.aD = null),
                  t.aF && (t.aF = null),
                  t.aI && (t.aI = null),
                  t.ay)
              )
                  for (let e = 0; e < t.ay.length; ++e) t.ay[e] = null;
              if (
                  ((t.ay = null),
                  this.bh("vertices"),
                  this.bh("animations"),
                  this.bh("bones"),
                  this.bh("meshes"),
                  this.bh("texUnits"),
                  this.bh("materials"),
                  this.bh("textureAnims"),
                  this.bh("attachments"),
                  this.bh("colors"),
                  this.bh("alphas"),
                  this.bh("particleEmitters"),
                  this.bh("ribbonEmitters"),
                  this.bh("skins"),
                  this.bh("faces"),
                  this.bh("hairs"),
                  t.C &&
                      t.C.forEach((e, r) => {
                          e.v(), t.C.set(r, null);
                      }),
                  t.D)
              )
                  for (const e in t.D) t.D[e].bi(), (t.D[e] = null);
              t.j && t.j.bi(),
                  (t.j = null),
                  t.aX && t.aX.bi(),
                  (t.aX = null),
                  (t.a = null),
                  (t.b = null),
                  (t.C = null),
                  (t.D = null),
                  (t.F = null),
                  (t.G = null),
                  (t.H = null),
                  (t.P = null),
                  (t.Z = null),
                  (t.ab = null),
                  (t.ac = null),
                  (t.ad = null),
                  (t.ae = null),
                  (t.af = null),
                  (t.ag = null),
                  (t.aj = null),
                  (t.ak = null),
                  (t.al = null),
                  (t.boundsSize = null),
                  (t.aP = null),
                  (t.aQ = null),
                  (t.aR = null),
                  (t.aS = null),
                  (t.aT = null),
                  (t.aU = null);
          }
          getNumAnimations() {
              var t = this.j ? this.j : this;
              return t.aq ? t.aq.length : 0;
          }
          getAnimation(t) {
              var e = this.j ? this.j : this;
              return e.aq && t > -1 && t < e.aq.length ? e.aq[t].j : "";
          }
          resetAnimation() {
              (this.j ? this.j : this).setAnimation("Stand");
          }
          setAnimPaused(t) {
              this.X = t;
          }
          setAnimNoSubAnim(t) {
              this.Y = t;
          }
          setItems(t) {
              for (var e = [], r = 0; r < t.length; r++) e.push([t[r].slot, t[r].display, t[r].visual]);
              e.forEach((t) => {
                  var e = [parseInt(t[0]), parseInt(t[1])];
                  this.k.items.push(e);
              }),
                  this.bM(e),
                  (this.B = !0);
          }
          attachList(t) {
              for (var e = t.split(","), r = [], i = 0; i < e.length; i += 2) r.push([e[i], e[i + 1]]);
              r.forEach((t) => {
                  var e = [parseInt(t[0]), parseInt(t[1])];
                  this.k.items.push(e);
              }),
                  this.bM(r),
                  (this.B = !0);
          }
          clearSlots(t) {
              for (var e = t.split(","), r = 0; r < e.length; ++r) {
                  this.bO(parseInt(e[r]));
                  var i = [];
                  this.k.items.forEach((t) => {
                      0 != this.k.items[r].indexOf(parseInt(t)) && i.push(t);
                  }),
                      (this.k.items = i);
              }
              this.B = !0;
          }
          setAppearance(t, e, r, i, n, a, s, o, h, u, l) {
              (this.p = i), (this.q = t), (this.r = e), (this.s = r), (this.u = n), (this.v = a), (this.w = s), (this.x = o), (this.y = h);
              var c = xn,
                  f = function (t, e) {
                      t[e].d(), delete t[e];
                  };
              this.G[1] && f(this.G, 1),
                  this.G[6] && f(this.G, 6),
                  this.G[8] && f(this.G, 8),
                  this.H[c.LegUpper][1] && f(this.H[c.LegUpper], 1),
                  this.H[c.TorsoUpper][1] && f(this.H[c.TorsoUpper], 1),
                  this.H[c.FaceLower][1] && f(this.H[c.FaceLower], 1),
                  this.H[c.FaceUpper][1] && f(this.H[c.FaceUpper], 1),
                  this.H[c.FaceLower][2] && f(this.H[c.FaceLower], 2),
                  this.H[c.FaceUpper][2] && f(this.H[c.FaceUpper], 2),
                  this.H[c.FaceLower][3] && f(this.H[c.FaceLower], 3),
                  this.H[c.FaceUpper][3] && f(this.H[c.FaceUpper], 3),
                  this.H[c.Base][1] && f(this.H[c.Base], 1),
                  this.H[c.Unknown735][1] && f(this.H[c.Unknown735], 1),
                  (this.M = u),
                  (this.N = l),
                  (this.B = !0),
                  this.bE();
          }
          isLoaded() {
              return this.j ? this.j.e && this.e : this.e;
          }
          setParticlesEnabled(t) {
              (this.g = t),
                  this.C.forEach(function (e) {
                      let r = e;
                      if (r.i)
                          for (let e = 0; e < r.i.length; ++e)
                              if (r.i[e] && (r.i[e].e.setParticlesEnabled(t), r.p && r.p.b)) for (var i = r.i[e].e, n = 0; n < r.p.b.length; n++) i.aE && i.aE[n] && r.p.b[n] && r.p.b[n].e.setParticlesEnabled(t);
                  });
          }
          setRibbonsEnabled(t) {
              this.h = t;
          }
          getTexUnits() {
              return this.aO;
          }
          bw(t, e, r, i) {
              n.copy(this.Z, t), n.multiply(this.Z, this.Z, e), r && n.translate(this.Z, this.Z, r), i && n.multiply(this.Z, this.Z, i);
          }
          bx(t) {
              var e;
              let r = !1;
              for (var i = 0; i < this.aq.length; ++i)
                  if ((e = this.aq[i]).j && e.j == t && 0 == e.b) {
                      (this.W = 0), (r = !0), (this.V.a = e), (this.V.b.a = i), (this.V.b.b = e), (this.V.b.c = 0), (this.V.c = new Rn()), (this.V.d = 0), WH.debug("Set animation to", e.a, e.j);
                      break;
                  }
              "Stand" == t || r || this.bx("Stand");
          }
          setAnimation(t) {
              this.aq &&
                  (null != this.j && (this.j.setAnimation(t), (t = on[this.j.b.id] ? "StealthStand" : "Mount")),
                  this.bx(t),
                  this.C.forEach((e) => {
                      if (e.i) for (let r = 0; r < e.i.length; r++) e.i[r].e.setAnimation(t);
                  }));
          }
          bz(t) {
              var e = Ka,
                  r = this.bZ.context;
              if (this.an && this.ao) {
                  var i = this.an.length * e;
                  if ((this.ba || (this.ba = new Float32Array(i)), t)) {
                      var n = this.ba,
                          a = this.an;
                      for (let t = 0, e = 0; t < i; ++e)
                          (n[t + 0] = a[e].i[0]),
                              (n[t + 1] = a[e].i[1]),
                              (n[t + 2] = a[e].i[2]),
                              (n[t + 3] = a[e].j[0]),
                              (n[t + 4] = a[e].j[1]),
                              (n[t + 5] = a[e].j[2]),
                              (n[t + 6] = a[e].c),
                              (n[t + 7] = a[e].d),
                              (n[t + 8] = a[e].e),
                              (n[t + 9] = a[e].f),
                              (t += Ka);
                  }
                  this.bb
                      ? (r.bindBuffer(r.ARRAY_BUFFER, this.bb), r.bufferSubData(r.ARRAY_BUFFER, 0, this.ba))
                      : ((this.bb = r.createBuffer()),
                        r.bindBuffer(r.ARRAY_BUFFER, this.bb),
                        r.bufferData(r.ARRAY_BUFFER, this.ba, r.DYNAMIC_DRAW),
                        (this.bc = r.createBuffer()),
                        r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, this.bc),
                        r.bufferData(r.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.ao), r.STATIC_DRAW));
              }
          }
          bA() {
              var t,
                  e = s.fromValues(1, 1, 1, 1),
                  r = this.aj,
                  i = this.ak,
                  o = this.aQ;
              if ((a.set(r, 9999, 9999, 999), a.set(i, -9999, -9999, -9999), !this.aw)) return n.identity(this.Z), this.A || (this.bZ.distance = 1), !1;
              for (var h = 0; h < this.aw.length; ++h) {
                  let n = this.aw[h];
                  if (!n.show) continue;
                  if (((e[0] = e[1] = e[2] = e[3] = 1), this.V.b.a > 0 && (n.v && (e = n.v.g(this.V, this.bg)), n.w && (e[3] *= n.w.d(this.V, this.bg))), e[3] < 0.01)) continue;
                  let s = n.p;
                  for (var u = 0; u < s.f; ++u) (t = this.an[this.ao[s.e + u]].i), a.min(r, r, t), a.max(i, i, t);
              }
              var l = this.aX;
              if (l && l.e && l.aw && l.aw.length > 0)
                  for (h = 0; h < l.aw.length; ++h) {
                      let e = l.aw[h];
                      if (!e.show) continue;
                      let n = e.p;
                      for (u = 0; u < n.f; ++u) (t = l.an[l.ao[n.e + u]].i), a.min(r, r, t), a.max(i, i, t);
                  }
              this.j && this.j.e && this.j.bA() && (a.copy(r, a.scale(r, this.j.aj, 1.1)), a.copy(i, a.scale(i, this.j.ak, 1.1)), (i[2] *= 1.75)),
                  this.b.type == hn.NPC && (a.scale(r, r, this.z.Scale), a.scale(i, i, this.z.Scale)),
                  a.subtract(this.boundsSize, i, r),
                  a.scaleAndAdd(this.al, r, this.boundsSize, 0.5);
              var c,
                  f,
                  d = this.boundsSize[2],
                  b = this.z && this.z.Scale ? this.z.Scale : 1;
              if ((this.b.type != hn.ITEM ? ((c = this.boundsSize[1]), (f = this.boundsSize[0])) : ((c = this.boundsSize[0]), (f = this.boundsSize[1])), !this.A)) {
                  var p = this.bZ.width / this.bZ.height,
                      m = 2 * Math.tan((this.bZ.fov / 2) * 0.0174532925),
                      _ = (1.2 * d) / m,
                      g = (1.2 * c) / (m * p);
                  this.bZ.distance = Math.max(Math.max(_, g), 2 * f);
              }
              return n.identity(this.Z), this.b.type != hn.ITEM && n.rotateZ(this.Z, this.Z, Math.PI / 2), n.translate(this.Z, this.Z, a.negate(o, this.al)), a.set(this.aQ, b, b, b), n.scale(this.Z, this.Z, this.aQ), !0;
          }
          bB() {
              var t = vn[this.m];
              if (t) {
                  var e = t[2];
                  if (0 != t[3] && this.o != t[3]) return;
                  return e;
              }
          }
          bC(t) {
              return gn[t][this.L ? 1 : 0];
          }
          bD(t, e) {
              let r = new za();
              return e.a > 0 && (r.a = new ea(this, t, e.a)), e.b > 0 && (r.b = new ea(this, t, e.b)), e.c > 0 && (r.c = new ea(this, t, e.c)), r;
          }
          bE() {
              if (!this.aW)
                  if ((this.b.type != hn.CHARACTER && this.b.type != hn.NPC && this.b.type != hn.HUMANOIDNPC) || this.m < 1) this.bH();
                  else {
                      var t, e, r, i, n, a;
                      if (this.aY) {
                          (t = this.aY.f(this.bC(_n.Skin), 0, this.p)),
                              (e = this.aY.f(this.bC(_n.Face), this.s, this.p)),
                              (r = this.aY.f(this.bC(_n.FacialHair), this.u, this.v)),
                              (i = this.aY.f(this.bC(_n.Hair), this.q, this.r)),
                              (n = this.aY.f(this.bC(_n.Underwear), 0, this.p));
                          var s = vn[this.m];
                          if (s) {
                              var o = s[this.n];
                              0 != s[3] && this.o != s[3] && (o = null), o && (a = this.aY.f(this.bC(o), this.y, this.p));
                          }
                      }
                      this.J && (this.I = this.J.c(_n.Hair, this.q)), this.bJ();
                      var h = xn;
                      if (!this.aN) {
                          if (
                              ((this.B = !0),
                              t && 0 != t.textures[0] && !this.G[1] && (this.G[1] = this.bD(1, this.aY.e(t.textures[0]))),
                              n &&
                                  (0 == n.textures[0] || this.H[h.LegUpper][1] || (this.H[h.LegUpper][1] = this.bD(h.LegUpper, this.aY.e(n.textures[0]))),
                                  0 == n.textures[1] || this.H[h.TorsoUpper][1] || (this.H[h.TorsoUpper][1] = this.bD(h.TorsoUpper, this.aY.e(n.textures[1])))),
                              a)
                          ) {
                              var u = this.bB();
                              u && 0 != a.textures[0] && !this.H[u][1] && (this.H[u][1] = this.bD(u, this.aY.e(a.textures[0])));
                          }
                          e &&
                              (0 == e.textures[0] || this.H[h.FaceLower][1] || (this.H[h.FaceLower][1] = this.bD(h.FaceLower, this.aY.e(e.textures[0]))),
                              0 == e.textures[1] || this.H[h.FaceUpper][1] || (this.H[h.FaceUpper][1] = this.bD(h.FaceUpper, this.aY.e(e.textures[1])))),
                              r &&
                                  (0 == r.textures[0] || this.H[h.FaceLower][2] || (this.H[h.FaceLower][2] = this.bD(h.FaceLower, this.aY.e(r.textures[0]))),
                                  0 == r.textures[1] || this.H[h.FaceUpper][2] || (this.H[h.FaceUpper][2] = this.bD(h.FaceUpper, this.aY.e(r.textures[1])))),
                              this.I &&
                                  (1 == this.I.showscalp
                                      ? (i = this.aY.f(this.bC(_n.Hair), 1, this.r))
                                      : i &&
                                        0 == this.I.showscalp &&
                                        (0 == i.textures[1] || this.H[h.FaceLower][3] || (this.H[h.FaceLower][3] = this.bD(h.FaceLower, this.aY.e(i.textures[1]))),
                                        0 == i.textures[2] || this.H[h.FaceUpper][3] || (this.H[h.FaceUpper][3] = this.bD(h.FaceUpper, this.aY.e(i.textures[2])))));
                      }
                      t && 0 != t.textures[1] && !this.G[8] && (this.G[8] = this.bD(8, this.aY.e(t.textures[1]))), i && 0 != i.textures[0] && !this.G[6] && (this.G[6] = this.bD(6, this.aY.e(i.textures[0])));
                  }
          }
          bF(t) {
              t && (this.P[t.geosetType] = 100 * t.geosetType + t.geosetID);
          }
          bG(t, e, r) {
              var i;
              if (!this.aw || 0 == this.aw.length) return !1;
              for (var n = 0; n < this.aw.length; ++n) (i = this.aw[n]).meshId >= t && i.meshId <= e && (i.show = r);
              return !0;
          }
          bH() {
              if ((this.bG(0, 0, !0), 0 != this.R)) {
                  this.bG(1, 899, !1);
                  for (var t = 0; t < 8; ++t) {
                      var e = (this.R >> (4 * t)) & 15;
                      if (0 != e) {
                          var r = 100 * (t + 1);
                          this.bG(r, r + 99, !1), this.bG(r + e, r + e, !0);
                      }
                  }
              }
          }
          bI(t, e) {
              for (var r = [], i = 0; i < this.as.length; i++) r[this.as[i].g] = i;
              var a = t.as;
              if (a) {
                  for (i = 0; i < a.length; i++) {
                      var s = r[a[i].g];
                      if ("number" == typeof s) {
                          var o = a[i].m,
                              h = this.as[s].m;
                          (a[i].t = !0), n.copy(o, h);
                      }
                  }
                  n.identity(this.aP), t.bw(this.Z, this.aP), t.bX(), t.bY(!1, e);
              }
          }
          bJ() {
              if (this.aw && 0 != this.aw.length) {
                  for (var t = 0; t < this.O; t++) this.P[t] = 100 * t + this.Q[t];
                  if (((this.P[7] = 702), (this.P[17] = 1702), this.J)) {
                      this.m == cn.ZANDALARITROLL
                          ? (this.J.d(this, _n.Custom3, this.x, !0), this.J.d(this, _n.Custom2, this.w, !0))
                          : this.m == cn.VULPERA
                          ? this.J.d(this, _n.Custom2, this.w, !0)
                          : this.m == cn.DARKIRONDWARF
                          ? this.J.d(this, _n.Custom1, this.w, !0)
                          : this.m == cn.LIGHTFORGEDDRAENEI
                          ? this.J.d(this, _n.Custom3, this.x, !0)
                          : this.m == cn.KULTIRAN && (this.J.d(this, _n.Custom3, this.x, !0), this.J.d(this, _n.Custom2, this.w, !0));
                      var e = this.J.e(_n.Skin, this.p);
                      this.bF(e);
                      var r = this.J.c(_n.Face, this.s);
                      this.bF(r);
                  }
                  if ((this.bF(this.I), 0 == this.P[0] && (this.P[0] = 1), this.K)) {
                      var i = this.K.c(this.u);
                      i &&
                          (-1 != i.geoset[0] && (this.P[1] = 100 + i.geoset[0]),
                          -1 != i.geoset[1] && (this.P[3] = 300 + i.geoset[1]),
                          -1 != i.geoset[2] && (this.P[2] = 200 + i.geoset[2]),
                          -1 != i.geoset[3] && (this.P[16] = 1600 + i.geoset[3]),
                          -1 != i.geoset[4] && (this.P[17] = 1700 + i.geoset[4]));
                  }
                  var n = !1;
                  if (this.o == un.DEATHKNIGHT) n = !0;
                  else if (this.aY) {
                      var a = this.aY.f(this.bC(_n.Face), this.s, this.p);
                      n = !!a && 0 != (4 & a.flags);
                  }
                  this.bG(0, 3700, !1), this.bG(0, 0, !0);
                  for (let t = 0; t < this.P.length; t++) n && 17 == t ? this.bG(1703, 1703, !0) : this.bG(this.P[t], this.P[t], !0);
                  var s = !1;
                  if (this.aY) {
                      var o = this.aY ? this.aY.f(this.bC(_n.Skin), 0, this.p) : null;
                      o && (s = 0 != (256 & o.flags));
                  }
                  var h = 1;
                  s || (this.J && (h = this.J ? this.J.f(_n.Skin, this.p, 19) : null)), h <= 0 && (h = 1), this.bG(1900 + h, 1900 + h, !0);
                  var u = this.C.get(mn.HEAD),
                      l = this.C.get(mn.SHIRT),
                      c = this.C.get(mn.CHEST),
                      f = this.C.get(mn.BELT),
                      d = this.C.get(mn.PANTS),
                      b = this.C.get(mn.BOOTS),
                      p = this.C.get(mn.BRACERS),
                      m = this.C.get(mn.HANDS),
                      _ = this.C.get(mn.TABARD),
                      g = this.C.get(mn.CAPE);
                  for (const t in this.D) {
                      let e = this.D[t];
                      e.aV && e.bG(0, 3700, !1) && (e.aV = !1);
                  }
                  if (
                      (this.C.forEach((t) => {
                          if (t && t.o) {
                              var e = t.o;
                              t.b == mn.HEAD
                                  ? (z(e, t.k[0], 2700), z(e, t.k[1], 2100))
                                  : t.b == mn.SHOULDER
                                  ? z(e, t.k[0], 2600)
                                  : t.b == mn.SHIRT
                                  ? (z(e, t.k[0], 800), z(e, t.k[1], 1e3))
                                  : t.b == mn.CHEST || t.b == mn.ROBE
                                  ? (z(e, t.k[0], 800), z(e, t.k[1], 1e3), z(e, t.k[2], 1300), z(e, t.k[3], 2200), z(e, t.k[4], 2800))
                                  : t.b == mn.BELT
                                  ? z(e, t.k[0], 1800)
                                  : t.b == mn.PANTS
                                  ? (z(e, t.k[0], 1100), z(e, t.k[1], 900), z(e, t.k[2], 1300))
                                  : t.b == mn.BOOTS
                                  ? (z(e, t.k[0], 500), z(e, t.k[1], 2e3))
                                  : t.b == mn.HANDS
                                  ? (z(e, t.k[0], 400), z(e, t.k[1], 2300))
                                  : t.b == mn.CAPE
                                  ? z(e, t.k[0], 1500)
                                  : t.b == mn.TABARD && z(e, t.k[0], 1200);
                          }
                      }),
                      u)
                  ) {
                      var v = this.m,
                          x = this.n == ln.MALE ? u.t : u.u;
                      if (x) {
                          var y = [0, 1, 2, 3, 7, 16, 17, 24, 25];
                          for (let t = 0; t < x.length; t++)
                              if (0 != ((1 << v) & x[t])) {
                                  var T = 100 * y[t];
                                  this.bG(T + this.Q[t], T + 99, !1);
                                  var w = T + this.Q[y[t]];
                                  this.bG(w, w, !0);
                              }
                      }
                  }
                  var E = 0;
                  if ((_ && (E |= 16), m && m.k && m.k[0])) {
                      var A = 401 + m.k[0];
                      this.bG(401, 499, !1), this.bG(A, A, !0), (m.f += 2);
                  } else if (c && c.k && c.k[0]) {
                      var M = 801 + c.k[0];
                      this.bG(M, M, !0);
                  }
                  if (!(c || f || p) && l && l.k && l.k[0]) {
                      var F = 801 + l.k[0];
                      this.bG(F, F, !0);
                  }
                  if (_) 0 == (1048576 & _.h) && (this.bG(2200, 2299, !1), this.bG(2202, 2202, !0));
                  else if (c && c.k && c.k[3]) {
                      var R = 2201 + c.k[3];
                      this.bG(2200, 2299, !1), this.bG(R, R, !0);
                  }
                  var S = !1;
                  f && f.k && f.k[0] && (S = 0 != (512 & f.h));
                  var C = !1,
                      P = !1;
                  if (c && c.k && c.k[2]) {
                      (P = !0), this.bG(501, 599, !1), this.bG(902, 999, !1), this.bG(1100, 1199, !1), this.bG(1300, 1399, !1);
                      R = 1301 + c.k[2];
                      this.bG(R, R, !0);
                  } else if (d && d.k && d.k[2]) {
                      (C = !0), this.bG(501, 599, !1), this.bG(902, 999, !1), this.bG(1100, 1199, !1), this.bG(1300, 1399, !1);
                      var I = 1301 + d.k[2];
                      this.bG(I, I, !0);
                  } else if (b && b.k && b.k[0]) {
                      this.bG(501, 599, !1), this.bG(901, 901, !0);
                      var U = 501 + b.k[0];
                      this.bG(U, U, !0);
                  } else {
                      let t;
                      (t = d && d.k && d.k[1] ? 901 + d.k[1] : 901), this.bG(t, t, !0);
                  }
                  (U = b && b.k && b.k[1] ? 2e3 + b.k[1] : b && 0 == (1048576 & b.h) ? 2002 : 2001), this.bG(U, U, !0);
                  var k,
                      D = !1,
                      O = P || C;
                  if (!O && _ && _.k && _.k[0]) (D = !1), S ? ((D = !0), (k = 1203)) : ((D = !0), (k = 1201 + _.k[0])), this.bG(k, k, !0);
                  else 16 & E && (this.bG(1201, 1201, !0), O || (this.bG(1202, 1202, !0), (D = !0)));
                  if (!D && !P)
                      if (c && c.k && c.k[1]) {
                          R = 1001 + c.k[1];
                          this.bG(R, R, !0);
                      } else if (l && l.k && l.k[1]) {
                          F = 1001 + l.k[1];
                          this.bG(F, F, !0);
                      }
                  if (!P && d && d.k && d.k[0]) {
                      var B = d.k[0];
                      I = 1101 + B;
                      B > 2 ? (this.bG(1300, 1399, !1), this.bG(I, I, !0)) : D || this.bG(I, I, !0);
                  }
                  if (g && g.k && g.k[0]) {
                      this.bG(1500, 1599, !1);
                      var N = 1501 + g.k[0];
                      this.bG(N, N, !0);
                  }
                  if (f && f.k && f.k[0]) {
                      this.bG(1800, 1899, !1);
                      var L = 1801 + f.k[0];
                      this.bG(L, L, !0);
                  }
                  d || P || C || D || s || S ? this.bG(1400, 1499, !1) : this.bG(1401, 1401, !0),
                      this.aX &&
                          (this.aX.bG(0, 3700, !1),
                          (this.m != cn.NIGHTELF && this.m != cn.BLOODELF) || this.o != un.DEMONHUNTER
                              ? this.m == cn.MECHAGNOME && (this.J.d(this.aX, _n.Custom1, this.w, !1), this.J.d(this.aX, _n.Custom2, this.x, !1), this.J.d(this.aX, _n.Custom3, this.y, !1))
                              : (d || P || C || D || s || S || this.aX.bG(1401, 1401, !0), this.J.d(this.aX, _n.Custom2, this.w, !1), this.J.d(this.aX, _n.Custom3, this.x, !1))),
                      this.bK();
              }
              function z(t, e, r) {
                  if (t.aw) {
                      var i = r + 1,
                          n = e > 0 ? r + e : i,
                          a = t.aw.some((t) => t.meshId == n);
                      (n = a ? n : i), t.bG(n, n, !0);
                  }
              }
          }
          bK() {
              var t,
                  e = this;
              e.C.forEach((r, i) => {
                  if ((r = e.C.get(i)).i) {
                      var n = e.bP(i, r);
                      for (let i = 0; i < r.i.length; ++i)
                          if (r.i[i] && n.length > i && ((t = e.aE[n[i]]), (r.i[i].c = t.b), (r.i[i].d = t), r.p && r.p.b))
                              for (var a = r.i[i].e, s = 0; s < r.p.b.length; s++) a.aE && a.aE[s] && r.p.b[s] && ((t = a.aE[s]), (r.p.b[s].c = t.b), (r.p.b[s].d = t));
                  }
              });
          }
          bL() {
              for (let t = 0; t < this.H.length; ++t) {
                  let e = !1;
                  for (const r in this.H[t]) this.H[t][r].e() || (e = !0);
                  if (e) return;
              }
              let t = !1;
              if (
                  (this.C.forEach((e) => {
                      if (e.l || e.m) {
                          if (e.j) for (let r = 0; r < e.j.length; ++r) e.j[r].texture && !e.j[r].texture.h() && (t = !0);
                      } else t = !0;
                  }),
                  t)
              )
                  return;
              for (const e in this.G) this.G[e] && !this.G[e].e() && (t = !0);
              if (t) return;
              if (!this.G[1]) return;
              if (!this.aM) {
                  var e = this.G[1].a,
                      r = e.a.width,
                      i = e.a.height;
                  this.aM = new Za(this.bZ.context, r, i);
              }
              let n = this.aM;
              n.h(), n.i(this.G[1], 0, 0, 1, 1);
              var a,
                  s = xn.old;
              n.e != n.f && (s = xn.new);
              for (let t = 1; t <= 3; ++t) {
                  if (this.H[xn.FaceUpper][t]) {
                      if (!this.H[xn.FaceUpper][t].e()) return;
                      (a = s[xn.FaceUpper]), n.i(this.H[xn.FaceUpper][t], a.x, a.y, a.w, a.h);
                  }
                  if (this.H[xn.FaceLower][t]) {
                      if (!this.H[xn.FaceLower][t].e()) return;
                      (a = s[xn.FaceLower]), n.i(this.H[xn.FaceLower][t], a.x, a.y, a.w, a.h);
                  }
              }
              if (this.y > 0) {
                  var o = this.bB();
                  if (o && this.H[o][1]) {
                      if (!this.H[o][1].e()) return;
                      (a = s[o]), n.i(this.H[o][1], a.x, a.y, a.w, a.h);
                  }
              }
              var h = !0,
                  u = !0;
              if (
                  ((this.m != cn.SKELETON && this.m != cn.ICETROLL) || (u = !1),
                  this.C.forEach((t) => {
                      let e = t.e;
                      (e != mn.SHIRT && e != mn.CHEST && e != mn.TABARD) || (h = !1), e == mn.PANTS && (u = !1);
                  }),
                  h && this.H[xn.TorsoUpper][1])
              ) {
                  if (!this.H[xn.TorsoUpper][1].e()) return;
                  (a = s[xn.TorsoUpper]), n.i(this.H[xn.TorsoUpper][1], a.x, a.y, a.w, a.h);
              }
              if (u && this.H[xn.LegUpper][1]) {
                  if (!this.H[xn.LegUpper][1].e()) return;
                  (a = s[xn.LegUpper]), n.i(this.H[xn.LegUpper][1], a.x, a.y, a.w, a.h);
              }
              let l = [];
              this.C.forEach((t) => {
                  l.push(t);
              }),
                  l.sort(function (t, e) {
                      return t.f - e.f;
                  });
              for (let t = 0; t < l.length; ++t) {
                  let e = l[t];
                  if (e.j)
                      for (let t = 0; t < e.j.length; ++t) {
                          let r = e.j[t];
                          if (r.gender == this.n && r.texture && r.texture.h() && r.region != xn.Base) {
                              if (0 != (2 & this.z.RaceFlags) && r.region == xn.Foot) continue;
                              a = s[r.region];
                              let t = new za();
                              (t.a = r.texture), n.i(t, a.x, a.y, a.w, a.h);
                          }
                      }
              }
              n.j(), (this.B = !1);
          }
          bM(t) {
              if ($.isArray(t)) for (var e = 0; e < t.length; ++e) this.bN(t[e][0], t[e][1], t[e][2]);
              else for (var r in t) this.bN(parseInt(r), t[r]);
          }
          bN(t, e, r) {
              var i = new ca(this, t, e, this.m, this.n);
              r && i.y(r);
              var n = i.e,
                  a = bn[t];
              this.C.get(n) && 0 != a ? ((i.e = a), this.C.set(a, i)) : this.C.set(n, i);
          }
          bO(t) {
              var e = this.C.get(t);
              e && (this.C.delete(t), e.v());
          }
          bP(t, e) {
              var r = [];
              if (this.aE && this.aF) {
                  var i = {
                      1: (t) => [11],
                      3: (t) => [6, 5],
                      22: (t) => (t && t.b == mn.SHIELD ? [0] : [2]),
                      21: (t) => [1],
                      17: (t) => [1],
                      15: (t) => [2],
                      25: (t) => [1],
                      13: (t) => [1],
                      14: (t) => [0],
                      23: (t) => [2],
                      6: (t) => [53],
                      26: (t) => [1],
                      16: (t) => [57],
                      27: (t) => [55],
                  };
                  if (i[t])
                      for (var n = i[t](e), a = 0; a < n.length; ++a) {
                          var s = n[a];
                          (this.M >= 0 || this.N >= 0 || this.j) && Tn[t] && (s = Tn[t]),
                              this.M >= 0 && 21 == t && wn[this.M][t] && (s = wn[this.M][t]),
                              this.N >= 0 && 22 == t && wn[this.N][t] && (s = wn[this.N][t]),
                              s >= this.aF.length || -1 == this.aF[s] || r.push(this.aF[s]);
                      }
              }
              return r;
          }
          bQ() {
              if (this.aw) {
                  for (let t = 0; t < this.aw.length; ++t) this.aw[t].K(this);
                  this.aO = this.aw.concat();
              }
              this.setAnimation("Stand"), this.bz(!0), this.bA(), this.bE(), (this.e = !0), this.l && this.A.e && this.A.bA(), this.A && this.A.e && this.A.bJ();
          }
          bR() {
              this.b && this.b.type && this.b.id && this.bS(this.b.type, this.b.id);
          }
          bS(t, e) {
              var r = this,
                  i = hn,
                  n = null;
              t == i.ITEM
                  ? (n = "meta/item/")
                  : t == i.HELM
                  ? (n = "meta/armor/1/")
                  : t == i.SHOULDER
                  ? (n = "meta/armor/3/")
                  : t == i.NPC || t == i.HUMANOIDNPC
                  ? (n = "meta/npc/")
                  : t == i.OBJECT
                  ? (n = "meta/object/")
                  : t == i.CHARACTER
                  ? (n = "meta/character/")
                  : t == i.ITEMVISUAL && (n = "meta/itemvisual/"),
                  n
                      ? ((n = r.k.contentPath + n + e + ".json"),
                        (function (t) {
                            $.getJSON(n)
                                .done(function (e) {
                                    r.bU(e, t);
                                })
                                .fail(function (t, e, r) {
                                    var i = e + ", " + r;
                                    console.log("Model:_load Error loading metadata: " + i);
                                });
                        })(t))
                      : t == i.PATH &&
                        ((r.d = e.toString()),
                        r.z || (r.z = {}),
                        (n = r.k.contentPath + "mo3/" + e + ".mo3"),
                        $.ajax({
                            url: n,
                            type: "GET",
                            dataType: "binary",
                            responseType: "arraybuffer",
                            processData: !1,
                            renderer: r.bZ,
                            success: function (t) {
                                r.bV(t);
                            },
                            error: function (t, e, r) {
                                console.log(r);
                            },
                        }));
          }
          bT(t, e, r) {
              var i = yn[e];
              if (i) {
                  var n = r ? 4 : 0;
                  return i.slice(2 * t + n, 2 * t + n + 2);
              }
          }
          bU(t, e, r) {
              var i,
                  n = this,
                  a = hn;
              if ((e || (e = n.b.type), n.z || (n.z = t), e == a.CHARACTER)) {
                  (f = t.Model), n.k.hd && t.HDModel && ((f = t.HDModel), (n.L = !0)), n.k.cls && (n.o = parseInt(n.k.cls));
                  var s = n.k.contentPath + "meta/charactercustomization/" + t.Race + "_" + t.Gender + ".json";
                  $.getJSON(s, function (t) {
                      (n.aY = new An(t.customFeatures)), (n.J = new oa(t.hairGeosets)), (n.K = new ha(t.facialHairStyles));
                      var e = n.L ? t.HDCustomGeoFileDataID : t.CustomGeoFileDataID;
                      if (e) {
                          let t = { type: a.PATH, id: e, parent: n, shoulder: 0 };
                          n.aX = new Ja(n.bZ, n.a, t, 0, !1);
                      }
                      n.B && n.bE();
                  }),
                      n.k.sheathMain && (n.M = n.k.sheathMain),
                      n.k.sheathOff && (n.N = n.k.sheathOff),
                      n.L && n.z.Creature && n.z.Creature.HDTexture
                          ? (n.aN = this.bD(-1, En.a(null, n.z.TextureFiles[n.z.Creature.HDTexture], 3, 0, 0)))
                          : n.z.Creature && n.z.Creature.Texture && (n.aN = this.bD(-1, En.a(null, n.z.TextureFiles[n.z.Creature.Texture], 3, 0, 0))),
                      (n.m = t.Race),
                      (n.n = t.Gender),
                      n.bS(a.PATH, f),
                      n.z.Equipment && n.bM(n.z.Equipment),
                      n.k.items && n.bM(n.k.items),
                      n.b.type != a.CHARACTER && n.z.Race > 0
                          ? ((n.p = parseInt(n.z.Creature.SkinColor)),
                            (n.q = parseInt(n.z.Creature.HairStyle)),
                            (n.r = parseInt(n.z.Creature.HairColor)),
                            (n.s = parseInt(n.z.Creature.FaceType)),
                            (n.u = parseInt(n.z.Creature.FacialHair)),
                            (n.v = n.r),
                            (n.w = 0),
                            (n.x = 0),
                            (n.y = 0))
                          : (n.k.sk && (n.p = parseInt(n.k.sk)),
                            n.k.ha && (n.q = parseInt(n.k.ha)),
                            n.k.hc && (n.r = parseInt(n.k.hc)),
                            n.k.fa && (n.s = parseInt(n.k.fa)),
                            n.k.fh && (n.u = parseInt(n.k.fh)),
                            n.k.fc && (n.v = parseInt(n.k.fc)),
                            n.k.ho && (n.w = parseInt(n.k.ho)),
                            n.k.ep && (n.x = parseInt(n.k.ep)),
                            n.k.ta && (n.y = parseInt(n.k.ta)));
              } else if (e == a.HELM) {
                  var o = 1,
                      h = 0,
                      u = 1;
                  if ((n.A && ((o = n.A.m), (h = n.A.n), (u = n.A.o)), t.ComponentModels))
                      (f = t.ComponentModels[0]) && t.ModelFiles && t.ModelFiles[f] && (27 == t.Item.InventoryType ? n.bS(a.PATH, t.ModelFiles[f][0].FileDataId) : n.bS(a.PATH, En.b(n, t.ModelFiles[f], -1, h, u, o)));
                  if (t.Textures) for (let e in t.Textures) 0 != t.Textures[e] && (n.F[parseInt(e)] = new ea(n, parseInt(e), t.Textures[e]));
              } else if (e == a.SHOULDER) {
                  (o = 1), (h = 0), (u = 1);
                  n.A && ((o = n.A.m), (h = n.A.n), (u = n.A.o));
                  var l = t.ComponentModels[0],
                      c = t.ComponentModels[1];
                  if (1 == n.b.shoulder || (void 0 === n.b.shoulder && l)) {
                      if ((l && t.ModelFiles[l] && n.bS(a.PATH, En.b(n, t.ModelFiles[l], 0, h, u, o)), t.Textures)) for (i in t.Textures) 0 != t.Textures[i] && (n.F[+i] = new ea(n, parseInt(i), t.Textures[i]));
                  } else if ((2 == n.b.shoulder || (void 0 === n.b.shoulder && c)) && (c && t.ModelFiles[c] && n.bS(a.PATH, En.b(n, t.ModelFiles[c], 1, h, u, o)), t.Textures2))
                      for (i in t.Textures2) 0 != t.Textures2[i] && (n.F[+i] = new ea(n, parseInt(i), t.Textures2[i]));
              } else if (e == a.ITEMVISUAL) n.bS(a.PATH, t.Equipment[n.c]);
              else if (e == a.ITEM) {
                  console.log("loadmeta: item");
                  var f;
                  (o = 1), (h = 0), (u = 1);
                  if ((n.A && ((o = n.A.m), (h = n.A.n), (u = n.A.o)), t.ComponentModels)) (f = t.ComponentModels[0]) && t.ModelFiles && t.ModelFiles[f] && n.bS(a.PATH, En.b(n, t.ModelFiles[f], -1, h, u, o));
                  if (t.Textures) for (i in t.Textures) 0 != t.Textures[i] && (n.F[+i] = new ea(n, parseInt(i), t.Textures[i]));
              } else {
                  if ((t.Creature && 0 != t.Creature.CreatureGeosetData && (n.R = t.Creature.CreatureGeosetData), t.Textures)) for (i in t.Textures) 0 != t.Textures[i] && (n.F[+i] = new ea(n, parseInt(i), t.Textures[i]));
                  else if (t.ComponentTextures && n.A) {
                      var d = n.A.n;
                      for (i in t.ComponentTextures)
                          for (var b = t.TextureFiles[t.ComponentTextures[i]], p = 0; p < b.length; p++) {
                              var m = b[p];
                              (m.Gender != d && 3 != m.Gender) || (n.F[+i] = new ea(n, parseInt(i), m.FileDataId));
                          }
                  }
                  n.k.hd && t.HDModel ? n.bS(a.PATH, t.HDModel) : t.Model ? n.bS(a.PATH, t.Model) : t.Race > 0 && ((f = cn[t.Race] + ln[t.Gender]), (n.m = t.Race), (n.n = t.Gender), n.bS(a.CHARACTER, f));
              }
          }
          bV(t) {
              if (t) {
                  var e = new Pa(t);
                  if (604210112 == e.getUint32())
                      if (e.getUint32() < 2e3) console.log("Bad version");
                      else {
                          var r = e.getUint32(),
                              i = e.getUint32(),
                              n = e.getUint32(),
                              a = e.getUint32(),
                              s = e.getUint32(),
                              o = e.getUint32(),
                              h = e.getUint32(),
                              u = e.getUint32(),
                              l = e.getUint32(),
                              c = e.getUint32(),
                              f = e.getUint32(),
                              b = e.getUint32(),
                              p = e.getUint32(),
                              m = e.getUint32(),
                              _ = e.getUint32(),
                              g = e.getUint32(),
                              v = e.getUint32(),
                              x = e.getUint32(),
                              y = e.getUint32(),
                              T = e.getUint32(),
                              w = e.getUint32(),
                              E = e.getUint32(),
                              A = e.getUint32(),
                              M = e.getUint32(),
                              F = e.getUint32(),
                              R = e.getUint32();
                          (this.bd = { name: "Wow.Generic", config: {} }), (this.be = new d());
                          var S = new Uint8Array(t, e.position),
                              C = null;
                          try {
                              C = Object(qn.inflate)(S);
                          } catch (t) {
                              return void console.log("Decompression error: " + t);
                          }
                          if (C.length < R) console.log("Unexpected data size", C.length, R);
                          else {
                              (e = new Pa(C.buffer)).position = r;
                              var P,
                                  I = e.getInt32();
                              if (I > 0) {
                                  this.an = new Array(I);
                                  for (let t = 0; t < I; ++t) this.an[t] = new Mn(e);
                              }
                              if (((e.position = i), (P = e.getInt32()) > 0)) {
                                  this.ao = new Array(P);
                                  for (let t = 0; t < P; ++t) this.ao[t] = e.getUint16();
                              }
                              if (((e.position = n), (P = e.getInt32()) > 0)) {
                                  (this.ap = new Array(P)), (this.bg = new Array(P));
                                  for (let t = 0; t < P; ++t) (this.ap[t] = e.getUint32()), (this.bg[t] = 0);
                              }
                              e.position = a;
                              var U = e.getInt32();
                              if (U > 0) {
                                  this.aq = new Array(U);
                                  for (let t = 0; t < U; ++t) this.aq[t] = new Fn(e);
                              }
                              e.position = s;
                              var k = e.getInt32();
                              if (k > 0) {
                                  this.ar = new Array(k);
                                  for (let t = 0; t < k; ++t) this.ar[t] = e.getInt16();
                              }
                              e.position = o;
                              var D = e.getInt32();
                              if (D > 0) {
                                  this.as = new Array(D);
                                  for (let t = 0; t < D; ++t) this.as[t] = new Gn(this, t, e);
                              }
                              e.position = h;
                              var O = e.getInt32();
                              if (O > 0) {
                                  this.at = new Array(O);
                                  for (let t = 0; t < O; ++t) this.at[t] = e.getInt16();
                              }
                              e.position = u;
                              var B = e.getInt32();
                              if (B > 0) {
                                  this.au = new Array(B);
                                  for (let t = 0; t < B; ++t) this.au[t] = e.getInt16();
                              }
                              e.position = l;
                              var N = e.getInt32();
                              if (N > 0) {
                                  this.av = new Array(N);
                                  for (let t = 0; t < N; ++t) this.av[t] = new Vn(e);
                              }
                              e.position = c;
                              var L = e.getInt32();
                              if (L > 0) {
                                  this.aw = new Array(L);
                                  for (let t = 0; t < L; ++t) this.aw[t] = new ta(e);
                              }
                              e.position = f;
                              var z = e.getInt32();
                              if (z > 0) {
                                  this.ax = new Array(z);
                                  for (let t = 0; t < z; ++t) this.ax[t] = e.getInt16();
                              }
                              e.position = b;
                              var j = e.getInt32();
                              if (j > 0) {
                                  this.ay = new Array(j);
                                  for (let t = 0; t < j; ++t) this.ay[t] = new Xn(e);
                              }
                              e.position = p;
                              var H = e.getInt32();
                              if (H > 0) {
                                  this.az = new Array(H);
                                  for (let t = 0; t < H; ++t) this.az[t] = new ra(this, t, e);
                              }
                              e.position = m;
                              var G = e.getInt32();
                              if (G > 0) {
                                  this.aA = new Array(G);
                                  for (let t = 0; t < G; ++t) this.aA[t] = e.getInt16();
                              }
                              e.position = _;
                              var V = e.getInt32();
                              if (V > 0) {
                                  this.aB = new Array(V);
                                  for (let t = 0; t < V; ++t) this.aB[t] = new ia(e);
                              }
                              e.position = g;
                              var q = e.getInt32();
                              if (q > 0) {
                                  this.aC = new Array(q);
                                  for (let t = 0; t < q; ++t) this.aC[t] = e.getInt16();
                              }
                              e.position = v;
                              var X = e.getInt32();
                              if (X > 0) {
                                  this.aD = new Array(X);
                                  for (let t = 0; t < X; ++t) this.aD[t] = e.getInt16();
                              }
                              e.position = x;
                              var Y = e.getInt32();
                              if (Y > 0) {
                                  this.aE = new Array(Y);
                                  for (let t = 0; t < Y; ++t) this.aE[t] = new na(e);
                              }
                              e.position = y;
                              var Z = e.getInt32();
                              if (Z > 0) {
                                  this.aF = new Array(Z);
                                  for (let t = 0; t < Z; ++t) this.aF[t] = e.getInt16();
                              }
                              e.position = T;
                              var W = e.getInt32();
                              if (W > 0) {
                                  this.aG = new Array(W);
                                  for (let t = 0; t < W; ++t) this.aG[t] = new aa(e);
                              }
                              e.position = w;
                              var K = e.getInt32();
                              if (K > 0) {
                                  this.aH = new Array(K);
                                  for (let t = 0; t < K; ++t) this.aH[t] = new sa(e);
                              }
                              e.position = E;
                              var J = e.getInt32();
                              if (J > 0) {
                                  this.aI = new Array(J);
                                  for (let t = 0; t < J; ++t) this.aI[t] = e.getInt16();
                              }
                              e.position = A;
                              var Q = e.getInt32();
                              if (Q > 0) {
                                  this.aJ = new Array(Q);
                                  for (let t = 0; t < Q; ++t) this.aJ[t] = new Sa(this, e);
                              }
                              e.position = F;
                              var $ = e.getInt32();
                              if ($ > 0 && F > 0) {
                                  this.aL = new Array($);
                                  for (let t = 0; t < $; ++t) this.aL[t] = new Ca(e);
                              }
                              e.position = M;
                              var tt = e.getInt32();
                              if (tt > 0) {
                                  this.aK = new Array(tt);
                                  for (let t = 0; t < tt; ++t) this.aK[t] = new La(this, e);
                              }
                              this.bQ();
                          }
                      }
                  else console.log("Bad magic value");
              } else console.error("Bad buffer for DataView");
          }
          bW(t) {
              var e = i.create();
              if ((i.fromMat4(e, t), this.aJ)) for (var r = 0; r < this.aJ.length; r++) this.aJ[r].Z(t, e);
              if (this.aK) for (r = 0; r < this.aK.length; r++) this.aK[r].an(t);
          }
          bX() {
              if (!this.e) return;
              this.T++;
              let t = this.bZ.time - this.S;
              if ((t > 0 && (this.S = this.bZ.time), this.f && this.V.b && this.V.b.b)) {
                  let e = a.create();
                  const r = [4, 119, 233, 242, 348, 526, 527, 544, 545];
                  [5, 143, 234, 524, 525, 540, 541, 556, 557].indexOf(this.V.b.b.a) > -1 ? (e = a.fromValues(0, (-5 * t) / 1e3, 0)) : r.indexOf(this.V.b.b.a) > -1 && (e = a.fromValues(0, (-3 * t) / 1e3, 0));
                  let i = n.create();
                  if ((n.fromTranslation(i, e), this.bW(i), this.j && this.j.bW(i), this.aX && this.aX.bW(i), this.E)) for (let t = 0; t < this.E.length; t++) this.aX.bW(i);
              }
              if (this.V.b.a > -1) {
                  0 == this.W && (this.W = this.S);
                  let i = t;
                  for (let t = 0; t < this.bg.length; t++) (this.bg[t] += i), this.ap[t] > 0 && (this.bg[t] %= this.ap[t]);
                  this.V.b.c += i;
                  let n = this.V.b.b.g - this.V.b.c;
                  if (this.V.c.a < 0 && this.V.a.h > -1 && !this.Y) {
                      let t = 32767 * Math.random(),
                          e = 0,
                          r = this.V.a.i,
                          i = this.aq[r];
                      for (e += i.d; e < t && i.h > -1; ) (r = i.h), (e += (i = this.aq[r]).d);
                      (this.V.c.a = r), (this.V.c.b = this.aq[r]), (this.V.c.c = 0);
                  }
                  var e = this.V.b,
                      r = this.V.c;
                  let a = 0,
                      s = null;
                  if ((r.a > -1 && (a = (s = this.aq[r.a]).e), a > 0 && n < a ? ((r.c = Wa(a - n, s.g)), (this.V.d = n / a)) : (this.V.d = 1), n <= 0))
                      if (this.V.c.a > -1) {
                          if (this.V.c.a > -1) for (; 0 == (32 & this.aq[r.a].c) && (64 & this.aq[r.a].c) > 0 && ((r.a = this.aq[r.a].h), (r.b = this.aq[this.V.c.a]), !(this.V.c.a < 0)); );
                          (this.V.b = this.V.c), (this.V.c = new Rn()), (this.V.c.a = -1), (this.V.c.b = null), (this.V.d = 1);
                      } else e.b.g > 0 && (e.c = Wa(e.c, e.b.g));
              }
              var i,
                  o,
                  h,
                  u = this.aw ? this.aw.length : 0;
              for (let t = 0; t < u; ++t)
                  if ((h = this.aw[t]).show) {
                      (i = h.p.f), (o = h.p.e);
                      for (let t = 0; t < i; ++t) this.an[this.ao[o + t]].k = this.T;
                  }
              this.aO &&
                  this.aO.sort(function (t, e) {
                      return t.b != e.b ? t.b - e.b : t.meshId - e.meshId;
                  });
              var l = this.as.length,
                  c = this.ba;
              if (this.as && this.aq) {
                  for (let t = 0; t < l; ++t) this.as[t].s = !1;
                  for (let t = 0; t < l; ++t) this.as[t].w();
                  if (this.an) {
                      var f,
                          d,
                          b,
                          p,
                          m = this.an.length,
                          _ = this.aS,
                          g = this.aT;
                      for (let t = 0; t < m; ++t)
                          if ((f = this.an[t]).k == this.T) {
                              c[(p = t * Ka)] = c[p + 1] = c[p + 2] = c[p + 3] = c[p + 4] = c[p + 5] = 0;
                              for (let t = 0; t < 4; ++t)
                                  (b = f.g[t] / 255) > 0 &&
                                      ((d = this.as[f.h[t]]),
                                      a.transformMat4(_, f.a, d.m),
                                      s.transformMat4(g, f.b, d.m),
                                      (c[p + 0] += _[0] * b),
                                      (c[p + 1] += _[1] * b),
                                      (c[p + 2] += _[2] * b),
                                      (c[p + 3] += g[0] * b),
                                      (c[p + 4] += g[1] * b),
                                      (c[p + 5] += g[2] * b));
                              (f.i[0] = c[p + 0]), (f.i[1] = c[p + 1]), (f.i[2] = c[p + 2]), (f.j[0] = c[p + 3]), (f.j[1] = c[p + 4]), (f.j[2] = c[p + 5]);
                          }
                      this.bz(!1), this.ai || ((this.ai = !0), this.bA());
                  }
              }
              if (this.j && this.j.e) {
                  var v = this.j.aE[this.j.aF[0]],
                      x = 1 / this.j.z.Scale;
                  a.set(this.aQ, x, x, x), n.identity(this.aP), n.scale(this.aP, this.aP, this.aQ), this.bw(this.j.Z, this.j.as[v.b].m, v.c, this.aP);
              }
              sn[this.b.id] && !this.A && (n.identity(this.Z), a.set(this.aQ, 1, 1, -1), n.scale(this.Z, this.Z, this.aQ)), this.B && this.bL();
          }
          bY(t, e) {
              var r = this;
              r.bZ.context;
              if ((r.j && r.j.bY(!1, e), r.e)) {
                  if (
                      (r.bX(),
                      (r.bf = {
                          uModelMatrix: r.Z,
                          uViewMatrix: r.bZ.viewMatrix,
                          uProjMatrix: r.bZ.projMatrix,
                          uCameraPos: r.bZ.eye,
                          uAmbientColor: r.ab,
                          uPrimaryColor: r.ac,
                          uSecondaryColor: r.ad,
                          uLightDir1: r.ae,
                          uLightDir2: r.af,
                          uLightDir3: r.ag,
                      }),
                      r.bb && r.aO)
                  )
                      for (var i = 0; i < r.aO.length; ++i) r.aO[i].show && r.aO[i].N(e);
                  if (r.aJ && r.g)
                      for (i = 0; i < r.aJ.length; ++i) {
                          let t = r.aL ? r.aL[i] : null;
                          r.aJ[i].X(r.V, r.bZ.delta, t), r.aJ[i].Y(e);
                      }
                  if (r.aK && r.h) for (i = 0; i < r.aK.length; ++i) r.aK[i].ar(r.V, r.bZ.delta), r.aK[i].av(), r.aK[i].aw(e);
                  if (
                      (r.aX && r.bI(r.aX, e),
                      this.bK(),
                      r.C.forEach((t, i) => {
                          if (t && t.i)
                              for (var s = 0; s < t.i.length; ++s)
                                  if (t.i[s] && t.i[s].e && t.i[s].c > -1 && t.i[s].c < r.as.length) {
                                      var o = !1,
                                          h = sn[t.i[s].e.b.id];
                                      if (
                                          (n.identity(r.aP),
                                          h && (a.set(r.aQ, 1, 1, -1), n.scale(r.aP, r.aP, r.aQ), (o = !0)),
                                          i == mn.LEFTHAND && 0 != (256 & t.h) && (a.set(r.aQ, 1, -1, 1), n.scale(r.aP, r.aP, r.aQ), (o = !0)),
                                          5 == r.M && t.b == mn.RANGED && 2 == t.c && 18 == t.d && (n.identity(r.aP), n.rotateX(r.aP, r.aP, -Math.PI / 2)),
                                          27 == t.b)
                                      ) {
                                          var u = t.i[s].e.z.Scale;
                                          a.set(r.aQ, u, u, u), n.scale(r.aP, r.aP, r.aQ);
                                      }
                                      if ((t.i[s].e.bw(r.Z, r.as[t.i[s].c].m, t.i[s].d.c, r.aP), t.i[s].e.bX(), t.i[s].e.bY(o, e), t.p && t.p.b && t.i[s].e.e))
                                          for (var l = 0; l < t.p.b.length; l++) {
                                              var c = t.p.b[l];
                                              if (c) {
                                                  let r = a.fromValues(0, 0, 0);
                                                  c && c.d && (r = c.d.c);
                                                  let i = t.i[s].e;
                                                  if (-1 != c.c) {
                                                      let t = i.as[c.c].m;
                                                      c.e.bw(i.Z, t, r, null), c.e.bX(), c.e.bY(o, e);
                                                  }
                                              }
                                          }
                                  } else t.i[s] && t.i[s].e && -1 == t.i[s].c && r.bI(t.i[s].e, e);
                      }),
                      r.E)
                  )
                      for (let t = 0; t < r.E.length; t++)
                          for (let t = 0; t < r.E.length; t++) {
                              let i = r.E[t];
                              if (!i.e) continue;
                              let o = r.aF[r.k.extraModels[t][1]];
                              if (-1 == o) {
                                  console.log("invalid extra model attachment", r.k.extraModels[t][1]);
                                  continue;
                              }
                              let h = r.aE[o];
                              var s = r.k.extraModels[t][2];
                              a.set(r.aQ, s, s, s),
                                  n.identity(r.aP),
                                  n.scale(r.aP, r.aP, r.aQ),
                                  n.rotateX(r.aP, r.aP, r.k.extraModels[t][3]),
                                  n.rotateY(r.aP, r.aP, r.k.extraModels[t][4]),
                                  n.rotateZ(r.aP, r.aP, r.k.extraModels[t][5]),
                                  i.bw(r.Z, r.as[h.b].m, h.c, r.aP),
                                  i.bX(),
                                  i.bY(!1, e);
                          }
                  for (const t in r.D) r.D[t] && r.bI(r.D[t], e);
              }
          }
      }
      var Qa = Ja;
      const $a = 1,
          ts = { 2: "Wowhead", 3: "LolKing", 6: "HeroKing", 7: "DestinyDB" };
      var es = class {
          constructor(t) {
              if (!t.type || !ts[t.type]) throw "Viewer error: Bad viewer type given";
              if (!t.container) throw "Viewer error: Bad container given";
              if (!t.aspect) throw "Viewer error: Bad aspect ratio given";
              if (!t.contentPath) throw "Viewer error: No content path given";
              (this.type = t.type), (this.container = t.container), (this.aspect = parseFloat(t.aspect)), (this.renderer = null), (this.options = t);
              var e = this.container.width(),
                  r = Math.round(e / this.aspect);
              this.init(e, r);
          }
          destroy() {
              this.renderer && this.renderer.destroy(), (this.options = null), (this.container = null);
          }
          init(t, e) {
              if (void 0 !== typeof window.Uint8Array && void 0 !== typeof window.DataView)
                  try {
                      var r = document.createElement("canvas");
                      r.getContext("webgl", { alpha: !1 }) || r.getContext("experimental-webgl", { alpha: !1 });
                  } catch (t) {}
              (this.mode = $a), (this.renderer = new ns(this)), this.renderer.resize(t, e), this.renderer.init();
          }
          method(t, e) {
              return void 0 === e && (e = []), this.renderer ? this.renderer.method(t, [].concat(e)) : null;
          }
          option(t, e) {
              return void 0 !== e && (this.options[t] = e), this.options[t];
          }
          static isFullscreen() {
              return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
          }
          static requestFullscreen(t) {
              document.fullscreenElement ||
                  document.webkitFullscreenElement ||
                  document.mozFullScreenElement ||
                  document.msFullscreenElement ||
                  (t.requestFullscreen
                      ? t.requestFullscreen()
                      : t.webkitRequestFullscreen
                      ? t.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
                      : t.mozRequestFullScreen
                      ? t.mozRequestFullScreen()
                      : t.msRequestFullscreen && t.msRequestFullscreen());
          }
          static exitFullscreen() {
              document.fullscreenElement ||
                  document.webkitFullscreenElement ||
                  document.mozFullScreenElement ||
                  document.msFullscreenElement ||
                  (document.exitFullscreen
                      ? document.exitFullscreen()
                      : document.webkitExitFullscreen
                      ? document.webkitExitFullscreen()
                      : document.mozCancelFullScreen
                      ? document.mozCancelFullScreen()
                      : document.msExitFullscreen && document.msExitFullscreen());
          }
      };
      const rs = "    attribute vec2 aPosition;    attribute vec2 aTexCoord;        varying vec2 vTexCoord;        void main(void) {        vTexCoord = aTexCoord;        gl_Position = vec4(aPosition, 0, 1);    }    ",
          is = "    precision mediump float;    varying vec2 vTexCoord;        uniform sampler2D uTexture;        void main(void) {        gl_FragColor = texture2D(uTexture, vTexCoord);    }    ";
      var ns = class {
          constructor(t) {
              (this.currFrame = 0),
                  (this.addedCss = !1),
                  (this.progressShown = !1),
                  (this.attributeState = new d()),
                  (this.onContextMenu = function (t) {
                      return !1;
                  });
              var e = this;
              (e.viewer = t),
                  (e.options = t.options),
                  (e.downloads = {}),
                  (e.context = null),
                  (e.width = 0),
                  (e.height = 0),
                  (e.time = 0),
                  (e.delta = 0),
                  (e.models = []),
                  (e.screenshotDataURL = null),
                  (e.makeDataURL = !1),
                  (e.screenshotCallback = null),
                  (e.azimuth = 1.5 * Math.PI),
                  (e.zenith = Math.PI / 2),
                  (e.distance = 15),
                  (e.fov = 30),
                  (e.zoom = { rateStep: 0.1, rateAccelerationDecay: 0.4, interpolationRate: 0.3, range: [0.3, 4], rateCurrent: 0, target: 1, current: 1 }),
                  (e.zoom.range = e.zoom.range.map(function (t) {
                      return Math.log(t) / Math.log(1 + e.zoom.rateStep);
                  })),
                  (e.translation = a.fromValues(0, 0, 0)),
                  (e.target = a.fromValues(0, 0, 0)),
                  (e.eye = a.fromValues(0, 0, 0)),
                  (e.up = a.fromValues(0, 0, 1)),
                  (e.lookDir = a.create()),
                  (e.fullscreen = !1),
                  (e.projMatrix = n.create()),
                  (e.viewMatrix = n.create()),
                  (e.panningMatrix = n.create()),
                  (e.viewOffset = a.create()),
                  (e.aniFilterExt = null),
                  (e.aniFilterMax = 0),
                  this.addedCss || ((this.addedCss = !0), $("head").append('<link rel="stylesheet" href="https://legacyplayers.com/model_viewer/viewer/viewer.css" type="text/css" />'));
          }
          updateProgress() {
              var t = 0,
                  e = 0;
              for (var r in this.downloads) (t += this.downloads[r].total), (e += this.downloads[r].loaded);
              if (t <= 0) this.progressShown && (this.progressBg.hide(), this.progressBar.hide(), (this.progressShown = !1));
              else {
                  this.progressShown || (this.progressBg.show(), this.progressBar.show(), (this.progressShown = !0));
                  var i = e / t;
                  this.progressBar.width(Math.round(this.width * i) + "px");
              }
          }
          destroy() {
              if (
                  ((this.stop = !0),
                  this.canvas &&
                      (this.canvas.detach(),
                      this.progressBg.detach(),
                      this.progressBar.detach(),
                      this.canvas.off("mousedown touchstart", this.onMouseDown).off("DOMMouseScroll", this.onMouseScroll).off("mousewheel", this.onMouseWheel).off("dblclick", this.onDoubleClick).off("contextmenu", this.onContextMenu),
                      $(window).off("resize", this.onFullscreen),
                      $(document).off("mouseup touchend", this.onMouseUp).off("mousemove touchmove", this.onMouseMove),
                      (this.canvas = this.progressBg = this.progressBar = null)),
                  this.context)
              ) {
                  var t = this.context;
                  this.bgTexture && t.deleteTexture(this.bgTexture),
                      (this.bgTexture = null),
                      this.program && t.deleteProgram(this.program),
                      (this.program = null),
                      this.vb && t.deleteBuffer(this.vb),
                      this.vs && t.deleteShader(this.vs),
                      this.fs && t.deleteShader(this.fs),
                      (this.vb = this.vs = this.fs = null);
              }
              this.bgImg && (this.bgImg = null);
              for (var e = 0; e < this.models.length; ++e) this.models[e].bi(), (this.models[e] = null);
              this.models = [];
          }
          method(t, e) {
              return this.models.length > 0 && this.models[0] && this.models[0][t] ? this.models[0][t].apply(this.models[0], e) : null;
          }
          getTime() {
              return window.performance && window.performance.now ? window.performance.now() : Date.now();
          }
          draw() {
              var t,
                  e = this.context,
                  r = this.getTime();
              (this.delta = 0.001 * (r - this.time)),
                  (this.time = r),
                  this.currFrame++,
                  this.updateCamera(),
                  e.bindFramebuffer(e.FRAMEBUFFER, null),
                  e.viewport(0, 0, this.width, this.height),
                  e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
                  this.bgTexture &&
                      this.program &&
                      (e.useProgram(this.program),
                      e.activeTexture(e.TEXTURE0),
                      e.bindTexture(e.TEXTURE_2D, this.bgTexture),
                      e.uniform1i(this.uTexture, 0),
                      e.bindBuffer(e.ARRAY_BUFFER, this.vb),
                      e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null),
                      e.enableVertexAttribArray(this.aPosition),
                      e.vertexAttribPointer(this.aPosition, 2, e.FLOAT, !1, 16, 0),
                      e.enableVertexAttribArray(this.aTexCoord),
                      e.vertexAttribPointer(this.aTexCoord, 2, e.FLOAT, !1, 16, 8),
                      e.depthMask(!1),
                      e.disable(e.CULL_FACE),
                      e.blendFunc(e.ONE, e.ZERO),
                      e.drawArrays(e.TRIANGLE_STRIP, 0, 4),
                      e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA),
                      e.enable(e.CULL_FACE),
                      e.depthMask(!0),
                      e.disableVertexAttribArray(this.aPosition),
                      e.disableVertexAttribArray(this.aTexCoord));
              let i = new Array();
              for (t = 0; t < this.models.length; ++t) this.models[t].bY(!1, i);
              i.sort((t, e) => {
                  let r = t.e > 1,
                      i = e.e > 1;
                  return r > i ? 1 : r < i ? -1 : t.l != e.l ? (e.l > t.l ? -1 : 1) : t.m > e.m ? -1 : t.m < e.m ? 1 : e.n != t.n ? (e.n < t.n ? 1 : -1) : e.e != t.e ? (t.e < e.e ? -1 : 1) : 0;
              }),
                  e.viewport(0, 0, this.width, this.height),
                  this.attributeState.disableAll(),
                  i.forEach((t) => {
                      e.useProgram(t.a.program),
                          e.bindBuffer(e.ARRAY_BUFFER, t.c),
                          e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.d),
                          this.attributeState.enable(e, t.a.attributes),
                          Object(u.setUniforms)(t.a, t.b),
                          t.h ? e.enable(e.CULL_FACE) : e.disable(e.CULL_FACE),
                          this.setBlendMode(e, t.e),
                          e.depthMask(t.f),
                          e.drawElements(t.i, t.j, e.UNSIGNED_SHORT, t.k);
                  }),
                  this.attributeState.disableAll();
          }
          setBlendMode(t, e) {
              switch ((0 == e ? t.disable(t.BLEND) : (t.enable(t.BLEND), t.blendEquation(t.FUNC_ADD)), e)) {
                  case 0:
                      break;
                  case 1:
                      t.blendFuncSeparate(t.ONE, t.ZERO, t.ONE, t.ONE);
                      break;
                  case 2:
                      t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE);
                      break;
                  case 3:
                      t.blendFuncSeparate(t.SRC_ALPHA, t.ONE, t.ONE, t.ONE);
                      break;
                  case 4:
                      t.blendFuncSeparate(t.DST_COLOR, t.ZERO, t.ONE, t.ONE);
                      break;
                  case 5:
                      t.blendFuncSeparate(t.DST_COLOR, t.SRC_COLOR, t.ONE, t.ONE);
                      break;
                  case 6:
                      t.blendFuncSeparate(t.DST_COLOR, t.ONE, t.ONE, t.ONE);
                      break;
                  case 10:
                      t.blendFunc(t.ONE, t.ONE);
                      break;
                  case 7:
                      t.blendFuncSeparate(t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE, t.ONE);
                      break;
                  case 8:
                      t.blendFuncSeparate(t.ONE_MINUS_SRC_ALPHA, t.ZERO, t.ONE, t.ONE);
                      break;
                  case 13:
                      t.blendFuncSeparate(t.ONE, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE);
                      break;
                  default:
                      throw 3735927486;
              }
          }
          updateCamera() {
              (this.zoom.target += this.zoom.rateCurrent),
                  (this.zoom.rateCurrent *= 1 - this.zoom.rateAccelerationDecay),
                  (this.zoom.target = -Math.max(Math.min(-this.zoom.target, this.zoom.range[1]), this.zoom.range[0])),
                  (this.zoom.current += (this.zoom.target - this.zoom.current) * this.zoom.interpolationRate);
              var t = this.distance * Math.pow(this.zoom.rateStep + 1, -this.zoom.current),
                  e = this.azimuth,
                  r = this.zenith;
              1 == this.up[2]
                  ? ((this.eye[0] = -t * Math.sin(r) * Math.cos(e) + this.target[0]), (this.eye[1] = -t * Math.sin(r) * Math.sin(e) + this.target[1]), (this.eye[2] = -t * Math.cos(r) + this.target[2]))
                  : ((this.eye[0] = -t * Math.sin(r) * Math.cos(e) + this.target[0]), (this.eye[1] = -t * Math.cos(r) + this.target[1]), (this.eye[2] = -t * Math.sin(r) * Math.sin(e) + this.target[2])),
                  a.subtract(this.lookDir, this.target, this.eye),
                  a.normalize(this.lookDir, this.lookDir),
                  n.lookAt(this.viewMatrix, this.eye, this.target, this.up),
                  n.identity(this.panningMatrix),
                  1 == this.up[2] ? a.set(this.viewOffset, this.translation[0], -this.translation[1], 0) : a.set(this.viewOffset, this.translation[0], 0, this.translation[1]),
                  n.translate(this.panningMatrix, this.panningMatrix, this.viewOffset),
                  n.multiply(this.viewMatrix, this.panningMatrix, this.viewMatrix);
          }
          init() {
              var t,
                  e = this,
                  r = e.context;
              (this.blackPixelTexture = r.createTexture()),
                  r.bindTexture(r.TEXTURE_2D, this.blackPixelTexture),
                  r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, 1, 1, 0, r.RGBA, r.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 1])),
                  r.bindTexture(r.TEXTURE_2D, null),
                  n.perspective(e.projMatrix, 0.0174532925 * e.fov, e.viewer.aspect, 0.1, 5e3),
                  e.updateCamera(),
                  r.clearColor(0, 0, 0, 0),
                  r.enable(r.DEPTH_TEST),
                  r.depthFunc(r.LEQUAL),
                  r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA),
                  r.enable(r.BLEND);
              var i = null;
              switch (e.viewer.type) {
                  case 2:
                      i = Qa;
              }
              if ((e.options.models || e.options.items) && i) {
                  var a = [].concat(e.options.models);
                  if (a.length > 0) for (t = 0; t < a.length; ++t) e.models.push(new i(e, e.viewer, a[t], t, !0));
              }
              !(function t() {
                  if (!e.stop && (window.requestAnimationFrame(t), e.draw(), !1 !== e.makeDataURL)) {
                      if (e.canvas[0].toDataURL) {
                          var i = e.width * e.height * 4,
                              n = new Uint8Array(i);
                          r.readPixels(0, 0, e.width, e.height, r.RGBA, r.UNSIGNED_BYTE, n);
                          for (var a = new Uint8Array(i), s = 0, o = e.height - 1; o >= 0; o--)
                              for (var h = 0; h < e.width; h++) {
                                  var u = o * e.width * 4 + 4 * h;
                                  (a[u + 0] = n[s + 0]), (a[u + 1] = n[s + 1]), (a[u + 2] = n[s + 2]), (a[u + 3] = n[s + 3]), (s += 4);
                              }
                          var l = document.createElement("canvas"),
                              c = l.getContext("2d");
                          (l.width = e.width), (l.height = e.height);
                          var f = c.createImageData(e.width, e.height);
                          f.data.set(a), c.putImageData(f, 0, 0), (e.screenshotDataURL = l.toDataURL.apply(l, e.makeDataURL)), e.screenshotCallback && (e.screenshotCallback(), (e.screenshotCallback = null));
                      }
                      e.makeDataURL = !1;
                  }
              })();
          }
          toggleSize(t) {
              this.resized
                  ? ((this.resized = !1), this.resize(this.restoreWidth, this.restoreHeight), n.perspective(this.projMatrix, 0.0174532925 * this.fov, this.viewer.aspect, 0.1, 5e3))
                  : ((this.restoreWidth = this.width), (this.restoreHeight = this.height), (this.resized = !0), this.resize(640, 480), n.perspective(this.projMatrix, 0.0174532925 * this.fov, 640 / 480, 0.1, 5e3));
          }
          onDoubleClick(t) {
              es.isFullscreen() ? es.exitFullscreen() : es.requestFullscreen(this.canvas[0]);
          }
          onFullscreen(t) {
              let e = this;
              if (e.viewer.container)
                  if (!e.fullscreen && es.isFullscreen()) {
                      (e.restoreWidth = e.width), (e.restoreHeight = e.height), (e.fullscreen = !0);
                      var r = $(window);
                      e.resize(r.width(), r.height()), n.perspective(e.projMatrix, 0.0174532925 * e.fov, r.width() / r.height(), 0.1, 5e3);
                  } else e.fullscreen && !es.isFullscreen() && ((e.fullscreen = !1), e.resize(e.restoreWidth, e.restoreHeight), n.perspective(e.projMatrix, 0.0174532925 * e.fov, e.viewer.aspect, 0.1, 5e3));
          }
          onMouseDown(t) {
              let e = this;
              3 == t.which || t.ctrlKey ? (e.rightMouseDown = !0) : (e.mouseDown = !0),
                  "touchstart" == t.type ? ((e.mouseX = t.originalEvent.touches[0].clientX), (e.mouseY = t.originalEvent.touches[0].clientY)) : ((e.mouseX = t.clientX), (e.mouseY = t.clientY)),
                  $("body").addClass("unselectable");
          }
          onMouseScroll(t) {
              return (this.zoom.rateCurrent += t.originalEvent.detail > 0 ? 1 : -1), t.preventDefault(), !1;
          }
          onMouseWheel(t) {
              return (this.zoom.rateCurrent += t.originalEvent.wheelDelta > 0 ? 1 : -1), t.preventDefault(), !1;
          }
          onMouseUp(t) {
              let e = this;
              (e.mouseDown || e.rightMouseDown) && ($("body").removeClass("unselectable"), (e.mouseDown = !1), (e.rightMouseDown = !1));
          }
          onMouseMove(t) {
              let e = this;
              if ((e.mouseDown || e.rightMouseDown) && void 0 !== e.mouseX) {
                  var r, i;
                  "touchmove" == t.type ? (t.preventDefault(), (r = t.originalEvent.touches[0].clientX), (i = t.originalEvent.touches[0].clientY)) : ((r = t.clientX), (i = t.clientY));
                  var n = ((r - e.mouseX) / e.width) * Math.PI * 2,
                      a = ((i - e.mouseY) / e.width) * Math.PI * 2;
                  if (e.mouseDown) {
                      1 == e.up[2] ? (e.azimuth -= n) : (e.azimuth += n), (e.zenith += a);
                      for (var s = 2 * Math.PI; e.azimuth < 0; ) e.azimuth += s;
                      for (; e.azimuth > s; ) e.azimuth -= s;
                      e.zenith < 1e-4 && (e.zenith = 1e-4), e.zenith >= Math.PI && (e.zenith = Math.PI - 1e-4);
                  } else (e.translation[0] += n), (e.translation[1] += a);
                  (e.mouseX = r), (e.mouseY = i);
              }
          }
          resize(t, e) {
              if (this.width !== t) {
                  if ((this.fullscreen || this.viewer.container.css({ height: e + "px", position: "relative" }), (this.width = t), (this.height = e), this.canvas))
                      this.canvas.attr({ width: t, height: e }), this.canvas.css({ width: t + "px", height: e + "px" }), this.context.viewport(0, 0, this.width, this.height);
                  else {
                      if (
                          ((this.canvas = $("<canvas/>")),
                          this.canvas.attr({ width: t, height: e }),
                          this.viewer.container.append(this.canvas),
                          (this.context = this.canvas[0].getContext("webgl", { alpha: !0, premultipliedAlpha: !1 }) || this.canvas[0].getContext("experimental-webgl", { alpha: !0, premultipliedAlpha: !1 })),
                          (this.progressBg = $("<div/>", { css: { display: "none", position: "absolute", bottom: 0, left: 0, right: 0, height: "10px", backgroundColor: "#000" } })),
                          (this.progressBar = $("<div/>", { css: { display: "none", position: "absolute", bottom: 0, left: 0, width: 0, height: "10px", backgroundColor: "#ccc" } })),
                          this.viewer.container.append(this.progressBg),
                          this.viewer.container.append(this.progressBar),
                          !this.context)
                      )
                          return alert("No WebGL support, sorry! You should totally use Chrome."), this.canvas.detach(), void (this.canvas = null);
                      var r = this.context.getExtension("EXT_texture_filter_anisotropic") || this.context.getExtension("MOZ_EXT_texture_filter_anisotropic") || this.context.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                      r
                          ? ((this.aniFilterExt = r), (this.aniFilterMax = this.context.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT)), WH.debug("Texture anisotropy enabled", this.aniFilterMax))
                          : WH.debug("Texture anisotropy disabled (not supported)"),
                          this.canvas
                              .on("mousedown touchstart", this.onMouseDown.bind(this))
                              .on("DOMMouseScroll", this.onMouseScroll.bind(this))
                              .on("mousewheel", this.onMouseWheel.bind(this))
                              .on("dblclick", this.onDoubleClick.bind(this))
                              .on("contextmenu", this.onContextMenu.bind(this)),
                          $(window).on("resize", this.onFullscreen.bind(this)),
                          $(document).on("mouseup touchend", this.onMouseUp.bind(this)).on("mousemove touchmove", this.onMouseMove.bind(this));
                  }
                  this.options.background && this.loadBackground();
              }
          }
          loadBackground() {
              var t = this,
                  e = t.context,
                  r = function () {
                      (t.vb = e.createBuffer()), e.bindBuffer(e.ARRAY_BUFFER, t.vb), e.bufferData(e.ARRAY_BUFFER, new Float32Array(16), e.DYNAMIC_DRAW);
                      var r = t.compileShader(e.VERTEX_SHADER, rs),
                          i = t.compileShader(e.FRAGMENT_SHADER, is),
                          n = e.createProgram();
                      e.attachShader(n, r),
                          e.attachShader(n, i),
                          e.linkProgram(n),
                          e.getProgramParameter(n, e.LINK_STATUS)
                              ? ((t.vs = r), (t.fs = i), (t.program = n), (t.uTexture = e.getUniformLocation(n, "uTexture")), (t.aPosition = e.getAttribLocation(n, "aPosition")), (t.aTexCoord = e.getAttribLocation(n, "aTexCoord")))
                              : console.error("Error linking shaders");
                  },
                  i = function () {
                      var r = t.width / t.bgImg.width,
                          i = t.height / t.bgImg.height,
                          n = [-1, -1, 0, i, 1, -1, r, i, -1, 1, 0, 0, 1, 1, r, 0];
                      e.bindBuffer(e.ARRAY_BUFFER, t.vb), e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(n));
                  };
              t.bgImg
                  ? t.bgImg.loaded && (t.vb || r(), i())
                  : ((t.bgImg = new Image()),
                    (t.bgImg.crossOrigin = ""),
                    (t.bgImg.onload = function () {
                        (t.bgImg.loaded = !0),
                            (t.bgTexture = e.createTexture()),
                            e.bindTexture(e.TEXTURE_2D, t.bgTexture),
                            e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.bgImg),
                            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
                            t.vb || r(),
                            i();
                    }),
                    (t.bgImg.onerror = function () {
                        t.bgImg = null;
                    }),
                    (t.bgImg.src = t.options.contentPath + t.options.background));
          }
          compileShader(t, e) {
              var r = this.context,
                  i = r.createShader(t);
              if ((r.shaderSource(i, e), r.compileShader(i), !r.getShaderParameter(i, r.COMPILE_STATUS))) throw "Shader compile error: " + r.getShaderInfoLog(i);
              return i;
          }
      };
      let as = { Types: hn };
      var ss = Object.assign(es, { Tools: p, WebGL: ns, WEBGL: 1, WOW: 2, FLASH: 2, Wow: as });
      window.ZamModelViewer = ss;
  },
]);
//# sourceMappingURL=viewer.min.js.map
