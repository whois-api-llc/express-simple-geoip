"use strict";

const GeoIP = require("simple-geoip");

// Retry failed GeoIP lookups at most two times to avoid adding request latency.
const RETRIES = 2;
const VERSION = require("./package.json").version;


/**
 * Create a middlware function to automatically geolocate the IP address of any
 * incoming request.
 *
 * This initializes the middleware configuration using your GeoIPify API key.
 * If you don't have an API key yet, you can get one here: https://geoipify.whoisxmlapi.com/
 *
 * @param {string} apiKey - Your GeoIPify API key.
 */
function expressSimpleGeoIP(apiKey) {
  let geoIP = new GeoIP(apiKey, { retries: RETRIES });

  return function simpleGeoIPMiddleware(req, res, next) {
    geoIP.lookup(req.ip, (err, data) => {
      // If the GeoIP lookup fails for some reason, we'll log a message to the
      // console then move along without raising an error. The reason why is
      // that GeoIP lookups should never cause a broken request -- this just
      // provides extra data on a request.
      if (err) {
        console.error("ERROR express-simple-geoip:", err);
        next();
      }

      // Map location data to `req.geoip` for easy access.
      req.geoip = data && data.location;
      next();
    });
  };
}

module.exports = expressSimpleGeoIP;
