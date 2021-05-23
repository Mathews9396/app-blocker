const express = require('express');
const Router = express.Router();
const appController = require("../controller/appController")

Router.get("/get-all-app",appController.getAllApp)

Router.post("/install-new-app",appController.installNewAPP)

Router.put("/control-app",appController.controlAPP)

Router.put("/start-app",appController.startAPP)

Router.put("/stop-app",appController.stopAPP)





module.exports = Router;