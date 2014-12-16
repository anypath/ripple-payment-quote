"use strict";

var Promise = require("bluebird");
var RippleRestClient = require("ripple-rest-client");
var _ = require("lodash");

var ripple = Promise.promisifyAll(new RippleRestClient({
  api: "https://api.ripple.com/"
}));

var RipplePaymentQuote = (function () {
  var RipplePaymentQuote = function RipplePaymentQuote(params) {
    this._source = params.source;
    this._destination = params.destination;
  };

  RipplePaymentQuote.fetch = function (params) {
    return new RipplePaymentQuote(params).fetch();
  };

  RipplePaymentQuote.prototype.format = function (quote) {
    return {
      source: {
        account: quote.source_account,
        amount: quote.source_amount.value,
        currency: quote.source_amount.currency,
        issuer: quote.source_amount.issuer
      },
      destination: {
        account: quote.destination_account,
        amount: quote.destination_amount.value,
        currency: quote.destination_amount.currency,
        issuer: quote.destination_amount.issuer
      }
    };
  };

  RipplePaymentQuote.prototype.fetch = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
      var source_currencies;
      var paymentParams = {
        recipient: _this._destination.address,
        amount: _this._destination.amount,
        currency: _this._destination.currency
      };
      if (_this._source.currency) {
        source_currencies = [_this._source.currency];
        if (_this._source.issuer) {
          source_currencies[0] += ("+" + _this._source.issuer);
          console.log(source_currencies);
        }
        paymentParams.source_currencies = source_currencies;
      }
      if (_this._destination.issuer) {
        paymentParams.issuer = _this._destination.issuer;
      }
      ripple.account = _this._source.address;
      ripple.buildPaymentAsync(paymentParams).then(function (response) {
        var payments = response.payments;
        payments = _.map(payments, function (payment) {
          return _this.format(payment);
        });
        if (source_currencies) {
          //filter out XRP-to-XRP
          payments = _.filter(payments, function (payment) {
            console.log("PAYMENT", payment);
            return !((payment.destination.currency === "XRP") && (payment.source.currency === "XRP"));
          });
        }
        if (source_currencies) {
          resolve(payments[0]);
        } else {
          resolve(payments);
        }
      })["catch"](reject);
    });
  };

  return RipplePaymentQuote;
})();

module.exports = RipplePaymentQuote;