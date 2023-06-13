(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['./module'], factory);
  } else if (typeof exports === 'object' && typeof module === 'object') {
    // CommonJS
    const { foo } = require('./module');
    module.exports = factory(foo);
  } else {
    // 全局变量
    root.myModule = factory(root.module);
  }
})(this, function (module) {
  // 使用 module
});
