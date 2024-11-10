import { exec } from "node:child_process";
import path from "node:path";

const dbConfig = {
	host: process.env.DB_HOST || "localhost",
	database: process.env.DB_NAME || "dvdrental",
	user: process.env.DB_USERNAME || "postgres",
	password: process.env.DB_PASSWORD || "postgres",
	port: Number.parseInt(process.env.DB_PORT || "5432"),
};

const pathToBackupFile = path.resolve(__dirname, "../dvdrental.tar");

const runPgRestore = (filePath: string) => {
	const env = { ...process.env, PGPASSWORD: dbConfig.password };

	const command = `pg_restore -U ${dbConfig.user} -d ${dbConfig.database} -h ${dbConfig.host} -p ${dbConfig.port} ${filePath}`;

	exec(command, { env }, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing command: ${error.message}`);
			return;
		}
		if (stderr) {
			console.error(`stderr: ${stderr}`);
			return;
		}
		console.log("Database restored successfully");
	});
};

runPgRestore(pathToBackupFile);
