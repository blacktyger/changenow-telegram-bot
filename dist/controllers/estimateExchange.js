"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _base = _interopRequireDefault(require("telegraf/scenes/base"));

var _helpers = require("../helpers");

var _api = require("../api");

var _actions = require("../actions");

var _keyboards = require("../keyboards");

var _config = require("../config");

var _messages = require("../messages");

//estimateExchange  scene
var estimateExchange = new _base["default"]('est_exch');
estimateExchange.enter(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(ctx) {
    var amount, curFrom, curTo, fromTo, amountTotal;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            amount = ctx.session.amount;
            curFrom = ctx.session.curFrom;
            curTo = ctx.session.curTo;
            fromTo = "".concat(curFrom, "_").concat(curTo);
            _context.next = 6;
            return (0, _helpers.getAmountTotal)(amount, fromTo);

          case 6:
            amountTotal = _context.sent;
            (0, _helpers.saveToSession)(ctx, 'amountTotal', amountTotal);
            _context.next = 10;
            return (0, _helpers.pause)(1000);

          case 10:
            ctx.replyWithHTML("You\u2019re sending <b>".concat(amount, " ").concat(curFrom.toUpperCase(), "</b>; you\u2019ll get ~<b>").concat(amountTotal, " ").concat(curTo.toUpperCase(), "</b>.\nEnter the recipient <b>").concat(curTo.toUpperCase(), "</b> wallet address."), (0, _keyboards.getAmountKeyboard)(ctx));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
estimateExchange.command('start', function (ctx) {
  return (0, _helpers.startHandler)(ctx);
});
estimateExchange.hears([/(.*)/gi, _config.config.kb.back, _config.config.kb.cancel, _config.config.kb.help],
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(ctx) {
    var txt;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            txt = ctx.message.text;

            if (!(_config.config.kb.back === txt)) {
              _context2.next = 4;
              break;
            }

            ctx.scene.enter('amount');
            return _context2.abrupt("return");

          case 4:
            if (!(_config.config.kb.cancel === txt)) {
              _context2.next = 8;
              break;
            }

            ctx.reply(_messages.messages.cancel, (0, _keyboards.getReplyKeyboard)(ctx));
            (0, _actions.cancelTradeAction)(ctx);
            return _context2.abrupt("return");

          case 8:
            if (!(_config.config.kb.help === txt)) {
              _context2.next = 14;
              break;
            }

            ctx.reply(_messages.messages.support);
            _context2.next = 12;
            return (0, _helpers.pause)(500);

          case 12:
            ctx.reply(process.env.CN_EMAIL);
            return _context2.abrupt("return");

          case 14:
            if (!txt.match(/[^()A-Za-z0-9\s]+/gi)) {
              _context2.next = 17;
              break;
            }

            ctx.reply(_messages.messages.validErr);
            return _context2.abrupt("return");

          case 17:
            if (!txt.match(/[()A-Za-z0-9\s]+/gi)) {
              _context2.next = 20;
              break;
            }

            _context2.next = 20;
            return (0, _actions.typeWalletAction)(ctx);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = estimateExchange;
exports["default"] = _default;