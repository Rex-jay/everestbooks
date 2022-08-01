import { error } from 'console';
import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/authors-database';

export const authorsDatabase = () => {
    mongoose.connect(url)
    .then(()=>{
        console.log('Database connected')
    })
    .catch((error: any) => console.log(error)) 
}  