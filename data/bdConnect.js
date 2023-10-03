import mongoose from "mongoose";
const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, { dbName: "dackendApi" })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((e) => {
      console.log(e);
    });
};
export default connectDB;
