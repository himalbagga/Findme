const fs = require('fs');
const User = require('../models/User');

// Upload Resume
exports.uploadResume = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Store resume file information in user document
        user.resume = {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype,
            filename: req.file.filename,
        };

        await user.save();

        // Delete the file from the uploads folder after saving to the database
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

        res.status(200).json({ message: 'Resume uploaded successfully', resume: user.resume.filename });
    } catch (error) {
        console.error('Error uploading resume:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Resume
exports.deleteResume = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.resume || !user.resume.data) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        user.resume = undefined; // Remove resume data from user document

        await user.save();
        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Resume
exports.updateResume = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update resume data
        user.resume = {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype,
            filename: req.file.filename,
        };

        await user.save();

        // Delete the file from the uploads folder after saving to the database
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });

        res.status(200).json({ message: 'Resume updated successfully', resume: user.resume.filename });
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Download Resume
exports.downloadResume = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.resume || !user.resume.data) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // // Trim the resume data for privacy reasons
        // const trimmedResumeData = user.resume.data.toString('base64').slice(0, 50) + '...';
        // // Use trimmed data for display purposes
        // res.status(200).json({
        //     message: 'Resume found',
        //     contentType: user.resume.contentType,
        //     filename: user.resume.filename,
        //     trimmedResumeData,  // Send trimmed version for display
        // });

        // Set the content type and send the resume data
        res.contentType(user.resume.contentType);
        res.setHeader('Content-Disposition', `attachment; filename=${user.resume.filename}`);
        res.send(user.resume.data);

    } catch (error) {
        console.error('Error downloading resume:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
