const mysql = require('mysql2/promise');

const pool = mysql.createPool({
   
});

class AbortError extends Error {
    constructor(message) {
        super(message);
        this.name = "AbortError";
    }
}

const executeQuery = async (signal) => {
    const connection = await pool.getConnection();

    signal.addEventListener("abort", () => {
        connection.destroy();
        throw new AbortError("Query aborted due to timeout");
    });

    return new Promise((resolve, reject) => {
        connection.query('SELECT SLEEP(10)', (error, results) => { // Example long-running query
            if (signal.aborted) return;

            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    }).finally(() => {
        connection.release();
    });
};

module.exports = {
    executeQuery,
    AbortError
};
