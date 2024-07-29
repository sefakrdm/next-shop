import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10, // Adjust the connection limit as needed
    queueLimit: 0 // 0 means no limit for waiting connections
});

export async function select({ query }: { query: string}) {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query(query);
        connection.release();
        return rows;
    } catch (error) {
        return error
    }
}

export async function insert({ query, values }: { query: string, values: string[] }) {
    try {
        const connection = await pool.getConnection();
        const result = await connection.query(query, values);
        connection.release(); // Release the connection back to the pool
        return result;
    } catch (error) {
        return error;
    }
}