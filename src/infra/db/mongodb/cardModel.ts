// import { Schema, Document, model, Model } from 'mongoose';

// export interface CardAttrs {
//     email: string;
//     card_number: string;
//     cvv: string;
//     expiration_year: string;
//     expiration_month: string;
// }

// export interface CardModel extends Model<CardDocument> {
//     addOne(doc: CardAttrs): CardDocument;
// }

// export interface CardDocument extends Document {
//     email: string;
//     card_number: string;
//     cvv: string;
//     expiration_year: string;
//     expiration_month: string;
//     createdAt: string;
//     updatedAt: string;
// }

// export const cardSchema: Schema = new Schema(
//     {
//         email: {
//             type: String,
//             required: true
//         },
//         card_number: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         cvv: {
//             type: String,
//             required: true
//         },
//         expiration_year: {
//             type: String,
//             required: true
//         },
//         expiration_month: {
//             type: String,
//             required: true
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// cardSchema.statics.addOne = (doc: CardAttrs) => {
//     return new Card(doc);
// };

// export const Card = model<CardDocument, CardModel>('cards', cardSchema);
