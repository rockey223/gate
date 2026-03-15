import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const heroSectionSchema = new Schema(
    {
        heroTitle: {
            type: String,
            required: true,
        },
        heroSubtitle: {
            type: String,   
            required: true,
        },
        bannerImage: {
            type: String,
            // required: true,
        },
    },{ timestamps: true }
);
const HeroSection = models.HeroSection || model("HeroSection", heroSectionSchema);

export default HeroSection;