const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to ensure a directory exists; creates it if it doesn't
const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let directory;

        switch (file.fieldname) {
            case 'admin_image':
                directory = path.join('public', 'admin');
                break;
            case 'user_image':
                directory = path.join('public', 'UserImage');
                break;
            case 'user_video':
                directory = path.join('public', 'UserVideo');
                break;
            default:
                return cb(new Error('Invalid field name'), null);
        }

        // Ensure the directory exists
        ensureDirectoryExists(directory);
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter for media types
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB file size limit
    // fileFilter
});

module.exports = upload;
