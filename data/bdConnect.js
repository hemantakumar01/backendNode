import mongoose from "mongoose";
const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, { dbName: "dackendApi" })
    .then((c) => {
      console.log(`Connected to ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
export default connectDB;
