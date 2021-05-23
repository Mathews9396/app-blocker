const express = require('express');

const Router = express.Router();
const userController = require("../controller/userController")

Router.post("/create-user",userController.createUser)

Router.put("/control-work-time",userController.controlWorkTime)

module.exports = Router;