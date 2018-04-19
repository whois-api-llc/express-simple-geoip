# express-simple-geoip

[![NPM Version](https://img.shields.io/npm/v/express-simple-geoip.svg?style=flat)](https://npmjs.org/package/express-simple-geoip)
[![NPM Downloads](http://img.shields.io/npm/dm/express-simple-geoip.svg?style=flat)](https://npmjs.org/package/express-simple-geoip)
[![Build Status](https://img.shields.io/travis/whois-api-llc/express-simple-geoip.svg?style=flat)](https://travis-ci.org/whois-api-llc/express-simple-geoip)

*The simplest geolocation middleware for Express that sets location data on the
request object.*

![Email Verifier Icon](https://github.com/whois-api-llc/express-simple-geoip/raw/master/images/geoip.png)


## Meta

- Author: Randall Degges
- Email: r@rdegges.com
- Twitter: [@rdegges](https://twitter.com/rdegges)
- Site: https://www.rdegges.com
- Status: production ready


## Prerequisites

To use this library, you'll need to create a free GeoIPify account:
https://geoipify.whoisxmlapi.com/

If you haven't done this yet, please do so now.


## Installation

To install `express-simple-geoip` using [npm](https://www.npmjs.org/), simply run:

```console
$ npm install express-simple-geoip
```

In the root of your project directory.


## Usage

Once you have `express-simple-geoip` installed, you can use it to easily get
the physical location of a given IP address for every incoming HTTP request your
web service gets.

This library gives you access to all sorts of geographical location data that
you can use in your application in any number of ways.

```javascript
const express = require("express");
const simpleGeoIP = require("express-simple-geoip");

let app = express();

app.use(simpleGeoIP("your-api-key"));

app.get("/", (req, res) => {
  console.log(req.geoip);   // print the incoming requester's geoip data
  // ...
});

app.listen(3000);
```

If you run this minimal Express app and then visit the `/` URL, you'll see some
geolocation data printed to the console that looks something like this (*based
on your inbound IP address*):

```json
{
  "country": "US",
  "region": "California",
  "city": "Mountain View",
  "lat": 37.40599,
  "lng": -122.078514,
  "postalCode": "94043",
  "timezone": "-08:00"
}
```

This library is built on top of the excellent [node-simple-geoip](https://github.com/whois-api-llc/node-simple-geoip)
library. It will automatically tack geoip data onto each incoming `req` object
as `req.geoip`.

So all you need to do in your code is:

1. Initialize the `simpleGeoIP` middleware, passing in your GeoIPify API key
2. Use the data found in `req.geoip`
3. ???
4. Profit!

Pretty simple, right?!


## Changelog

0.1.1: *04-18-2018*

- Removing images from npm package.

0.1.0: *04-18-2018*

- First release!
