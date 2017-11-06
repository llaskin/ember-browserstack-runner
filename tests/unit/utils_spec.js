var  utils = require("./../../lib/utils");
var assert = require("assert");

describe('Utilities', function(){
  it('should titlize all strings properly', function(){
    assert.equal("Hello", utils.titleCase("hello"));
    assert.equal("Are You Serious?", utils.titleCase("are you serious?"));
  });

  it('should generate 32 char uuid', function(){
    assert.equal(5, utils.uuid().split("-").length);
    assert.equal(32 + 4, utils.uuid().length);
  });

  it('should generate random uuid always', function(){
    assert.notEqual(utils.uuid(), utils.uuid());
    assert.notEqual(utils.uuid(), utils.uuid());
  });

  it('should generate proper browser string for config', function(){
    var chrome_OSX1012_latest = {os: "OS X 10.12", os_version: "Mavericks", "browser": "chrome", "version": "latest"};
    var chrome_windows7_latest = {os: "Windows 7", os_version: "XP", "browser": "firefox", "version": "latest"};
    // var safari_mac = {os: "OS X", os_version: "Mountain Lion", "browser": "safari", "browser_version": "6.1"};
    var ie_windows8_latest = {os: "Windows 8", os_version: "7", "browser": "internet explorer", "version": "latest"};
    var ieedge_windows_latest = {os: "Windows 10", os_version: "7", "browser": "edge", "version": "latest"};
//     var iOS = {os: "iOS", os_version: "6.0", device: "iPhone 5"};
//     var androidConfig = {os: "android", os_version: "4.1"};

    assert.equal("OS X Sierra, Chrome latest", utils.browserString(chrome_OSX1012_latest));
    assert.equal("Windows 7, Firefox latest", utils.browserString(chrome_windows7_latest));
    assert.equal("Windows 8, Internet Explorer latest", utils.browserString(ie_windows8_latest));
    assert.equal("Windows 10, Internet Edge latest", utils.browserString(ieedge_windows_latest));
//     assert.equal("iOS 6.0, iPhone 5", utils.browserString(iOS));
//     assert.equal("android 4.1", utils.browserString(androidConfig));
  });

  it('should return number of keys for this object', function(){
    assert.equal(0, utils.objectSize({}));
    assert.equal(1, utils.objectSize({a: 2}));
  });

  it('should escape special characters incompatible with JSON.parse', function () {
    var testString = '{"tracebacks":[{"actual":null,"message":"Died on test #1     at http://localhost:4200/test/main/globals.js:43:7\n    at http://localhost:4200/test/main/globals.js:67:2: Error","testName":"globals: Exported assertions"}]}';
    var expectString = '{"tracebacks":[{"actual":null,"message":"Died on test #1     at http://localhost:4200/test/main/globals.js:43:7\\n    at http://localhost:4200/test/main/globals.js:67:2: Error","testName":"globals: Exported assertions"}]}';

    var malformedJson = '{ "key" : "Bad\njson contains\rall\tsorts\bof\vhorrible\0 & nasty\fescape sequences" }';
    var expectJson = { "key" : "Bad\njson contains\rall\tsorts\bof\u000bhorrible\u0000 & nasty\fescape sequences" };

    assert.throws(function () { JSON.parse(testString); }, SyntaxError, 'JSON.parse fails');
    assert.equal(testString.escapeSpecialChars(), expectString);
    assert.equal(JSON.parse(malformedJson.escapeSpecialChars()).key, expectJson.key);
  });
});
