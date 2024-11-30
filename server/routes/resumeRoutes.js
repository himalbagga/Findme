const express = require('express');
const { uploadResume, deleteResume, updateResume, downloadResume } = require('../controllers/resumeController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Define file storage configuration using multer
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

// Add routes for managing resumes
router.post('/:userId/resume', upload.single('resume'), uploadResume);
router.put('/:userId/resume', upload.single('resume'), updateResume);
router.delete('/:userId/resume', deleteResume);
router.get('/:userId/resume', downloadResume);

module.exports = router;
