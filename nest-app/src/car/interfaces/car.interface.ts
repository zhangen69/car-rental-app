import { Document } from 'mongoose';

export interface Car extends Document {
    readonly model: string;
    readonly brand: string;
    readonly carNumber: string;
}
