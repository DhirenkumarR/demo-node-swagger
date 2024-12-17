const fs = require('fs');
const path = require('path');
const moment = require('moment');

module.exports = loggerMiddleware = (req, res, next) => {
    // Skip logging for Swagger requests
    if (req.originalUrl.includes('/api-docs') || req.originalUrl.includes('/api-docs-admin')) {
        return next();
    }

    // Capture the start time for calculating response time
    const startTime = process.hrtime();

    // Intercept response to capture the body
    const originalSend = res.send;
    let responseBody;

    res.send = function (body) {
        responseBody = body;
        return originalSend.apply(res, [body]);
    };

    // After the response is finished, log details
    res.on('finish', () => {
        const logDetails = {
            timestamp: moment().format('DD/MM/YYYY hh:mm:ss A'),
            method: req.method,
            endpoint: req.originalUrl,
            ip: req.ip,
            params: JSON.stringify(req.params),
            query: JSON.stringify(req.query),
            body: JSON.stringify(req.body),
            headers: JSON.stringify(req.headers),
            user: req.user ? JSON.stringify(req.user) : 'Unauthenticated', // Add user info if available
            status: res.statusCode,
            responseTime: getResponseTime(startTime), // Calculate response time
            responseBody: typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody)
        };

        const logMessage = `
        ---------------------------------------------
        Time Stamp   - ${logDetails.timestamp}
        IP Address   - ${logDetails.ip}
        Method       - ${logDetails.method}
        Endpoint     - ${logDetails.endpoint}
        Headers      - ${logDetails.headers}
        Params       - ${logDetails.params}
        Query        - ${logDetails.query}
        Body         - ${logDetails.body}
        User         - ${logDetails.user}
        Status       - ${logDetails.status}
        ResponseTime - ${logDetails.responseTime} ms
        Response     - ${logDetails.responseBody}
        ---------------------------------------------\n`;

        // Directory where logs will be stored
        const logDirectory = path.join(__dirname, '../../logs');

        // Check if the directory exists, if not create it
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory, { recursive: true });
        }

        // File where logs will be stored
        const logFilePath = path.join(logDirectory, 'app.log');

        // Write log to a file (app.log)
        fs.appendFileSync(logFilePath, logMessage);
    });

    next();
};

// Helper function to calculate response time in milliseconds
const getResponseTime = (startTime) => {
    const diff = process.hrtime(startTime);
    return diff[0] * 1000 + diff[1] / 1e6;
};
