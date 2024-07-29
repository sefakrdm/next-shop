import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on("bağlandı", () => {
            console.log("MongoDB başarılı bir şekilde bağlantı!");
        });
        connection.on("hata", (error) => {
            console.log(`HATA: ${error}`);
            process.exit();
        });
        
    } catch (error) {
        console.log(`Unexpected error occurred`);
        console.log(error);
    }
}

export default dbConnect