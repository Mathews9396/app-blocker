const express = require('express');

const Router = express.Router();
const userController = require("../controller/userController")

// Router.use(express.json())

Router.put("/control-work-time",userController.controlWorkTime)

Router.post("/create-user",userController.createUser)


module.exports = Router;