import mongoose from 'mongoose';

interface Description {
    description: string;
}

export interface Car extends Description {
    model: string,
    color: string,
    year: number,
    accessories: Array<Description>,
    passengers: Number
}

const carSchema = new mongoose.Schema<Car>({
    model: {type: String, required: true},
    color: {type: String, required: true},
    year: {type: Number, required: true},
    accessories: [Object],
    passengers: {type: Number, required: true},
},
    {
        timestamps: true
    }
);

export default mongoose.model<Car>('Car', carSchema);