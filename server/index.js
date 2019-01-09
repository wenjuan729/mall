var express = require("express");
var loader = require("./loader");
var globalConfig = require("./config");

var app = new express();

// app.get("/login",loader.get("/login"));


app.listen(globalConfig["port"]);

