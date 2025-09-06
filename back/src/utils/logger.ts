import winston, { createLogger, format } from 'winston';
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
	level: 'info',
	format: combine(label({ label: `${process.env.NODE_ENV}` }), timestamp(), myFormat),
	transports: [new winston.transports.File({ filename: 'var/log/insights-backend.log' })],
});

export default logger;
