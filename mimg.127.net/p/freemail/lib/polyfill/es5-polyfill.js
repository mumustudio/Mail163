// polyfill
(function () {
    if (!Object.defineProperty || !(function () {
            try {
                Object.defineProperty({}, "x", {});
                return true
            } catch (b) {
                return false
            }
        }())) {
        var a = Object.defineProperty;
        Object.defineProperty = function (d, f, c) {
            if (a) {
                try {
                    return a(d, f, c)
                } catch (b) {}
            }
            if (d !== Object(d)) {
                throw TypeError("Object.defineProperty called on non-object")
            }
            if (Object.prototype.__defineGetter__ && ("get" in c)) {
                Object.prototype.__defineGetter__.call(d, f, c.get)
            }
            if (Object.prototype.__defineSetter__ && ("set" in c)) {
                Object.prototype.__defineSetter__.call(d, f, c.set)
            }
            if ("value" in c) {
                d[f] = c.value
            }
            return d
        }
    }
}());
if (!Array.indexOf) {
    Array.prototype.indexOf = function (b) {
        for (var a = 0; a < this.length; a++) {
            if (this[a] == b) {
                return a
            }
        }
        return -1
    }
}
if (!Object.keys) {
    Object.keys = (function () {
        var c = Object.prototype.hasOwnProperty,
            d = !({
                toString: null
            }).propertyIsEnumerable("toString"),
            b = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            a = b.length;
        return function (g) {
            if (typeof g !== "object" && typeof g !== "function" || g === null) {
                throw new TypeError("Object.keys called on non-object")
            }
            var e = [];
            for (var h in g) {
                if (c.call(g, h)) {
                    e.push(h)
                }
            }
            if (d) {
                for (var f = 0; f < a; f++) {
                    if (c.call(g, b[f])) {
                        e.push(b[f])
                    }
                }
            }
            return e
        }
    })()
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (b) {
        var a = this.length;
        if (typeof b != "function") {
            throw new TypeError()
        }
        var d = arguments[1];
        for (var c = 0; c < a; c++) {
            if (c in this) {
                b.call(d, this[c], c, this)
            }
        }
    }
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (c) {
        if (this === void 0 || this === null) {
            throw new TypeError()
        }
        var f = Object(this);
        var a = f.length >>> 0;
        if (typeof c !== "function") {
            throw new TypeError()
        }
        var e = [];
        var b = arguments.length >= 2 ? arguments[1] : void 0;
        for (var d = 0; d < a; d++) {
            if (d in f) {
                var g = f[d];
                if (c.call(b, g, d, f)) {
                    e.push(g)
                }
            }
        }
        return e
    }
};
