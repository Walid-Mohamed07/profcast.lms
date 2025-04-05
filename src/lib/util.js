import mongoose from 'mongoose';

const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      console.log('Already connected to the database');
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState === 1;
    console.log('Connected to the database');
  } catch (error) {
    // console.log(error);
    throw new Error('Error connecting to the database: ' + error.message);
  }
};
