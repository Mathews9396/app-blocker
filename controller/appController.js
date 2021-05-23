const appModel = require("../models/appModel")
const userModel = require("../models/userModel")
const moment  = require("moment-timezone")




exports.getAllApp =(req,res)=>{
    try{
        let aggregateArray =[
            {
              $project:{
                  name:1,
                  blocked:1,
                  installed:1,
                  restricted:1,
                  hoursToLimit:1
              }
            }

        ]
        appModel.aggregate(aggregateArray,(err,data)=>{
            if(err || !data)
            return res.status(404).send({
                status:false,
                message:"No app found"
            })
            else
            return res.status(200).send({
                status:true,
                payload:data
            })
        })

    }
    catch(error){
        return res.status(500).send({
            status:false,
            message:"internal server error"
        })
    }
}


exports.installNewAPP =(req,res)=>{
    try{
        const {name} = req.body
        if(!name)
        return res.status(422).send({
            status:false,
            message:"Please provide app name"
        })
        else{
            appModel.findOne({name:{$regex:name}},(err,data)=>{
                if(err || data)
                return res.status(404).send({
                    status:false,
                    message:"App with this name already exists"
                })
                else{
                    appModel.create({name},(err,app)=>{
                        if(err)
                        return res.status(404).send({
                            status:false,
                            message:"Failed to create app"
                        })
                        else
                        return res.status(200).send({
                            status:true,
                            payload:"App installed successfully"
                        })
                    })
                }
            })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            status:false,
            message:"internal server error"
        })
    }
}


exports.controlAPP =(req,res)=>{
    try{
        const {name,hoursToLimit} = req.body
        if(!name)
        return res.status(422).send({
            status:false,
            message:"Please provide app name"
        })
        if(!hoursToLimit)
        return res.status(422).send({
            status:false,
            message:"Please provide hourToLimit"
        })
        else{
            appModel.findOne({name:{$regex:name}},(err,data)=>{
                if(err || !data)
                return res.status(404).send({
                    status:false,
                    message:"No app found with this name"
                })
                else{
                    const {_id}= data
                    const updateConditon ={ hoursToLimit }
                    appModel.updateOne({_id},updateConditon,(err,app)=>{
                        if(err)
                        return res.status(404).send({
                            status:false,
                            message:"Failed to update app"
                        })
                        else
                        if(app)
                        return res.status(200).send({
                            status:true,
                            payload:"App installed successfully"
                        })
                    })
                }
            })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            status:false,
            message:"internal server error"
        })
    }
}



const updateApptime = (timeUsedApp,hoursToLimit,appStartTime,_id,res,type)=>{

    if(timeUsedApp>=hoursToLimit){
        return res.status(400).send({
            status:false,
            message:`Cannot ${type} app time exceeded`
        })
    }
    else{
        const updateConditon ={appStartTime : new Date()}
        if(!appStartTime){
            updateConditon.timeUsedApp =0
        }
        else{
            if(timeUsedApp)
            timeUsedApp = timeUsedApp +Math.round(((new Date() -new Date(appStartTime))/1000))/3600
            else
            timeUsedApp = Math.round(((new Date(appStartTime)- new Date())/1000))/3600
            updateConditon.timeUsedApp = timeUsedApp
        }
        
        appModel.updateOne({_id},updateConditon,(err,data)=>{
            if(err)
            return res.status(400).send({
                status:false,
                message:`Failed to ${type} `
            })
            else{
                return res.status(200).send({
                    status:true,
                    message:`App ${type}`
                })
            }

        })
    }

}

exports.startAPP =(req,res)=>{
    try{
        const {appName,userName} = req.body
        if(!userName)
        return res.status(422).send({
            status:false,
            message:"Please provide user name"
        })
        if(!appName)
        return res.status(422).send({
            status:false,
            message:"Please provide app name"
        })
        else{
            appModel.findOne({name:{$regex:appName}},(err,data)=>{
                if(err || !data)
                return res.status(404).send({
                    status:false,
                    message:"No app found with this name"
                })
                else{
                    let {_id,hoursToLimit,restricted,timeUsedApp,appStartTime}= data
                    userModel.findOne({name:userName},(err,user)=>{
                        if(err||!user){
                            return res.status(404).send({
                                status:false,
                                message:"No user found "
                            })
                        }
                        else{
                            const currentTime = new Date()
                            const {workingDays,offDays} = user
                            const day =moment().format("dddd").toLocaleLowerCase()
                            const date = moment().format("YYYY-MM-DD")
                            let startTimeWork
                            let endTimeWork
                            let startTimeoffDays
                            let endTimeoffDays
                            if(workingDays && Object.keys(workingDays).length && Object.keys(workingDays).includes(day)){
                                 startTimeWork = new Date(`${date}T${workingDays[day].startTime}:00.0Z`)
                                 endTimeWork = new Date(`${date}T${workingDays[day].endTime}:00.0Z`)
                                if(startTimeWork>endTimeWork){
                                    endTimeWork =new Date(moment(endTimeWork).add("1","day"))
                                }
                            }                                
                                let previousDay = moment().subtract("1","days").format("dddd")
                                if(workingDays && Object.keys(workingDays).length && Object.keys(workingDays).includes(previousDay)){
                                    let previousDate =moment().subtract("1","days").format("YYYY-MM-DD")
                                    let previousDayStartTime = new Date(`${previousDate}T${workingDays[previousDay].startTime}:00.0Z`)
                                    let previousDayEndTime = new Date(`${previousDate}T${workingDays[previousDay].endTime}:00.0Z`)
                                    if(previousDayStartTime>previousDayEndTime) previousDayEndTime = new Date(moment(previousDayEndTime).add("1","day"))
                                    if(previousDayEndTime >= currentTime){
                                        startTimeWork =previousDayStartTime
                                        endTimeWork =previousDayEndTime
                                    }
                                }

                                if(offDays && Object.keys(offDays).length && Object.keys(offDays).includes(day)){
                                    startTimeoffDays = new Date(`${date}T${offDays[day].startTime}:00.0Z`)
                                    endTimeoffDays = new Date(`${date}T${offDays[day].endTime}:00.0Z`)
                                   if(startTimeoffDays>endTimeoffDays){
                                    endTimeoffDays =new Date(moment(endTimeoffDays).add("1","day"))
                                   }
                               }                                
                                   let previousDayOff = moment().subtract("1","days").format("dddd")
                                   if(offDays && Object.keys(offDays).length && Object.keys(offDays).includes(previousDayOff)){
                                       let previousDate =moment().subtract("1","days").format("YYYY-MM-DD")
                                       let previousDayStartTime = new Date(`${previousDate}T${offDays[previousDayOff].startTime}:00.0Z`)
                                       let previousDayEndTime = new Date(`${previousDate}T${offDays[previousDayOff].endTime}:00.0Z`)
                                       if(previousDayStartTime>previousDayEndTime) previousDayEndTime = new Date(moment(previousDayEndTime).add("1","day"))
                                      if(previousDayEndTime >= currentTime){
                                        startTimeoffDays =previousDayStartTime
                                        endTimeoffDays =previousDayEndTime
                                       }
                                   } 
                                    if(startTimeWork <= currentTime && endTimeWork >=currentTime){
                                        if(startTimeoffDays <= currentTime && endTimeoffDays >= currentTime){
                                            if(timeUsedApp>=hoursToLimit){
                                                return res.status(400).send({
                                                    status:false,
                                                    message:"Cannot start app time exceeded "
                                                })
                                            }
                                            else
                                            updateApptime(timeUsedApp,hoursToLimit,appStartTime,_id,res,"start")
                                        }
                                        else{
                                            return res.status(400).send({
                                                status:false,
                                                message:"App is restricted while working hour "
                                            })
                                        }
                                    }
                                    else{
                                        updateApptime(timeUsedApp,hoursToLimit,appStartTime,_id,res,"start")
                                    }
                        }
                    })

                    
                }
            })
        }
    }
    catch(error){
        return res.status(500).send({
            status:false,
            message:"internal server error"
        })
    }
}

exports.stopAPP = (req,res)=>{
    try{
        const {appName} =req.body

        if(!appName)
        return res.status(422).send({
            status:false,
            message:"Please provide app name"
        })
        else{
            appModel.findOne({name:{$regex:appName}},(err,data)=>{
                if(err || !data)
                return res.status(404).send({
                    status:false,
                    message:"No app found with this name"
                })
                else{
                    let {_id,hoursToLimit,restricted,timeUsedApp,appStartTime}= data
                    updateApptime(timeUsedApp,hoursToLimit,appStartTime,_id,res,"stop")

                }
            })


    }
}
    catch(error){
        return res.status(500).send({
            status:false,
            message:"internal server error"
        })
    }
}
