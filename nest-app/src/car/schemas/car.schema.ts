import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
    model: String,
    brand: String,
    carNumber: String,
});
