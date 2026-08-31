import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: [true, "User identity reference is required"] 
    },
    docId: { 
        type: String, 
        required: [true, "Doctor identity reference is required"] 
    },
    slotDate: { 
        type: String, 
        required: [true, "Slot date tracking string is required"],
        trim: true
    },
    slotTime: { 
        type: String, 
        required: [true, "Slot time allocation context is required"],
        trim: true
    },
    userData: { 
        type: Object, 
        required: [true, "User immutable data snapshot object is required"] 
    },
    docData: { 
        type: Object, 
        required: [true, "Doctor immutable data snapshot object is required"] 
    },
    amount: { 
        type: Number, 
        required: [true, "Appointment processing fee amount is required"],
        min: [0, "Processing transaction amount parameters cannot be negative"]
    },
    date: { 
        type: Number, 
        required: true,
        default: () => Date.now() // Captures the exact epoch booking timestamp automatically
    },
    cancelled: { 
        type: Boolean, 
        required: true,
        default: false 
    },
    payment: { 
        type: Boolean, 
        required: true,
        default: false 
    },
    isCompleted: { 
        type: Boolean, 
        required: true,
        default: false 
    }
}, { 
    minimize: false,  
    timestamps: true  
});

// Build query indices to optimize high-traffic lookups
appointmentSchema.index({ userId: 1 });
appointmentSchema.index({ docId: 1, slotDate: 1, slotTime: 1 });

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);

export default appointmentModel;
