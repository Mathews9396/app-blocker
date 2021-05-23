const userData = new Schema( {
    name: {
        members: [{ firstName: String, lastName: String }],
        // required:true
    },
    userName: {
        type: String,
        unique: true
    },
    location: {
        city: String,
        geoLocation: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
            },
            coordinates: {
                type: [Number],
            }
        }
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    schedules: {
        name: String,
        days: [String],
        startTime: Date,
        endTime: Date,
        // appsBlocked:String,
    },
    apps: {
        blocked: [String],
        restricted: {
            name: [String],
            time: Number,
        },
        installed: [String],
        installedNum: Number,
    },
})

const user = mongoose.model('user', userData);


const newUser = new user({
    name: {
        members: [{ firstName: 'Andew', lastName: 'Jon' }],
    },
    userName: 'Andre17',
    location: {
        city: 'Kottayam',
    },
    email: 'andrew@gmail.com',
    schedules: {
        name: 'Day shift FN',
        days: ['Monday', 'Tuesday', 'Wednesday'],
        startTime: '',
        endTime: '',
    },
    apps: {
        blocked: ['FB', 'Instagram', 'InShorts'],
        restricted: {
            name: ['FB', 'Instagram', 'Whatsapp'],
            time: 150
        },
        installed: ['FB', 'Instagram', 'Whatsapp', 'InShorts', 'Files', 'VLC', 'Netflix', 'Prime Video', 'Spotify'],
        installedNum: 9,
    }
});