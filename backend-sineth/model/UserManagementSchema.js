import mongoose from 'mongoose';

const UserManagementSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }

})

const UserManagement = mongoose.model('UserManagement', UserManagementSchema);

export default UserManagement;