import mongoose from 'mongoose'
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
}

export default connectDB
