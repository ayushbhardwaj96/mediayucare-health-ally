import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"],
        trim: true // Aaspas ke extra spaces automatic remove ho jayenge
    },
    email: {
        type: String, 
        required: [true, "Email is required"], 
        unique: true,
        lowercase: true, // "Ayush@Test.com" automatic "ayush@test.com" ban jayega
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"] // Email format validator
    },
    password: {
        type: String, 
        required: [true, "Password is required"]
    },
    image: {
        type: String, 
        required: [true, "Doctor image URL is required"]
    },
    speciality: {
        type: String, 
        required: [true, "Speciality is required"],
        trim: true
    },
    degree: {
        type: String, 
        required: [true, "Degree is required"],
        trim: true
    },
    experience: {
        type: String, 
        required: [true, "Experience is required"]
    },
    about: {
        type: String, 
        required: [true, "About description is required"],
        trim: true
    },
    available: {
        type: Boolean, 
        required: true,
        default: true // By default doctor available dikhega jab tak manually off na kiya jaye
    },
    fee: {
        type: Number, 
        required: [true, "Consultation fee is required"],
        min: [0, "Fee cannot be negative"] // Negative fee validation
    },
    address: {
        type: Object, 
        required: [true, "Address object is required"]
    },
    date: {
        type: Number, 
        required: true,
        default: () => Date.now() // Agar aap timestamp bhejte hain toh thik, nahi toh automatic current epoch time le lega
    },
    slots_booked: {
        type: Object, 
        default: {} // minimize: false ki wajah se empty object empty hi rahega database me
    }
}, {
    minimize: false,
    timestamps: true // Yeh automatic database me 'createdAt' aur 'updatedAt' ke fields bana dega, jo dashboard analytics me kaam aayega
});

// Search performance optimization (Indexing email and speciality fields)
doctorSchema.index({ email: 1 });
doctorSchema.index({ speciality: 1 });

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorModel;
