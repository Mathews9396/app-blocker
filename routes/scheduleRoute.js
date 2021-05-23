const express = require('express');
const Schedule = require('../models/scheduleModel');

const Router = express.Router();

Router.get('/', (req, res) => {
    // console.log("create and view all schedules here");
    res.send('Schedules page!!');
})

Router.get('/get-schedules', async (req, res) => {
    console.log("Showing all schedules created by user");
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (error) {
        res.json({ message: error });
    }
})

Router.post('/create-schedule', async (req, res) => {
    console.log(req);
    const schedule = new Schedule({
        name: req.name,
        days: req.days,
        startTime: req.startTime,
        endTime: req.endTime
    });

    await schedule.save().then(() => {
        res.send(schedule);
    }).catch((error) => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
})

module.exports = Router;