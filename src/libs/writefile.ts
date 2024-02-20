var fs = require("fs");

var currentSearchResult = "example";

fs.readFile("results.json", function (err: any, data: any) {
  var json = JSON.parse(data);
  json.push("search result: " + currentSearchResult);

  fs.writeFile("results.json", JSON.stringify(json));
});
