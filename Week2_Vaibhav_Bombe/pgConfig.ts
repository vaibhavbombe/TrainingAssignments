import { Pool } from "pg";
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "postgres",
    password: "YourPassword1#", //Change this with your password 
    port: 5432,
});

export default pool;