import * as mysql from "mysql2/promise";
import { Connection } from "mysql2";
import { CustomConnection } from "../../types";

const connection: CustomConnection = {};

export const connectToDB = async (): Promise<void> => {
    try {
        if (connection.isConnected) return;

        const db = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        connection.isConnected = true; // Assuming the connection is successful.
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
