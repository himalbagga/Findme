const multer = require('multer');
const path = require('path');

console.log("Inside multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Rename the file with a timestamp
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.docx', '.png', '.jpeg', '.pdf'];
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only .docx, .png, .jpeg, and .pdf are allowed.'));
    }
};

// Set up multer middleware
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
    fileFilter,
});

module.exports = upload;
