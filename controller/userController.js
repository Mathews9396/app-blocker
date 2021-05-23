const userModel = require("../models/userModel")


exports.createUser = (req, res) => {
    try {
        const { name } = req.body
        if (!name)
            return res.status(422).send({
                status: false,
                message: "Please provide name"
            })

        userModel.findOne({ name }, (err, data) => {
            if (err || data)
                return res.status(404).send({
                    status: false,
                    message: "This user name already exists"
                })
            else
                userModel.create({ name: name }, (err, app) => {
                    if (err)
                        console.error(err)
                    else
                        return res.status(200).send({
                            status: true,
                            payload: "user created successfully"
                        })
                })
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: "internal server error"
        })
    }
}


exports.controlWorkTime = (req, res) => {
    try {
        const { name, workingDays, offdays } = req.body
        var weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        let updateCondition = {}
        if (workingDays && Object.keys(workingDays).length) {
            updateCondition.workingDays = workingDays
        }
        if (offdays && Object.keys(offdays).length) {
            updateCondition.offDays = offdays
        }
        if (name) {
            updateCondition.name = name
        }
        userModel.findOne({ name }, (err, data) => {
            if (err || !data)
                return res.status(404).send({
                    status: false,
                    message: "No user found"
                })
            else
                userModel.update({ _id: data._id }, updateCondition, (err, app) => {
                    if (err)
                        return res.status(404).send({
                            status: false,
                            message: "Failed to create app"
                        })
                    else
                        return res.status(200).send({
                            status: true,
                            payload: "updated successfully"
                        })
                })

        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: "internal server error"
        })
    }
}


