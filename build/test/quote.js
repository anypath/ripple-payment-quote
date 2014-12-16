"use strict";

var RipplePaymentQuote = require(__dirname + "/../");
var RippleRestClient = require("ripple-rest-client");
var assert = require("assert");

describe("Ripple Payment Quote", function () {
  it.skip("should verify that a direct payment is possible", function (done) {
    RipplePaymentQuote.fetch({
      destination: {
        address: "rJBrmcc5VRAEEDY4AzVRMFNW192dnVQwXt",
        currency: "XRP",
        amount: 0.001
      },
      source: {
        address: "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
        currency: "BTC"
      }
    }).then(function (quote) {
      assert(quote.source.amount > 0);
      done();
    });
  });

  it.skip("should reject an impossible payment", function () {
    RipplePaymentQuote.fetch({
      destination: {
        address: "rJBrmcc5VRAEEDY4AzVRMFNW192dnVQwXt",
        currency: "XXX",
        amount: 100,
        issuer: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"
      },
      source: {
        address: "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
        currency: "BTC"
      }
    })["catch"](RipplePaymentQuote.Errors.ImpossiblePayment, function (error) {
      assert(error instanceof RipplePaymentQuote.Errors.ImpossiblePayment);
    });
  });

  it("should get price between two specific currencies", function (done) {
    RipplePaymentQuote.fetch({
      destination: {
        address: "rJBrmcc5VRAEEDY4AzVRMFNW192dnVQwXt",
        amount: 1,
        currency: "XRP"
      },
      source: {
        currency: "BTC",
        address: "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
        issuer: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"
      }
    })["catch"](function (error) {
      console.log("ERROR", error);
    }).then(function (quote) {
      assert(quote.source.amount > 0);
      assert(quote.source.currency > 0);
      done();
    });
  });

  it.skip("should get all quotes for a given destination currency", function (done) {
    RipplePaymentQuote.fetch({
      destination: {
        address: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
        currency: "BTC",
        amount: 0.0001,
        issuer: "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"
      },
      source: {
        address: "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk"
      }
    }).then(function (quotes) {
      assert(quotes[0].destination.amount > 0);
      assert(quotes[0].destination.currency);
      done();
    })["catch"](function (error) {
      console.log("ERROR", error);
    });
  });
});