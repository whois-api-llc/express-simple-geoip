"use strict";

const assert = require("assert");
const express = require("express");
const request = require("supertest");

const expressSimpleGeoIP = require("..");


const API_KEY = process.env.API_KEY;


describe("expressSimpleGeoIP", () => {
  it("should throw an error if no API key is supplied", () => {
    let app = express();
    assert.throws(() => { app.use(expressSimpleGeoIP()); }, "API key is required");
  });

  it("should throw an error if an invalid API key is supplied", () => {
    let app = express();
    assert.throws(() => { app.use(expressSimpleGeoIP(123)); }, "API key must be a string");
  });

  it("should set req.geoip", (done) => {
    let app = express();

    app.use(expressSimpleGeoIP(API_KEY));
    app.get("/", (req, res) => {
      res.json({ location: req.geoip });
    });

    request(app).get("/").expect(200).then(response => {
      let json = JSON.stringify(response.body);
      assert(json.indexOf("location") !== -1);
      done();
    });
  });
});
