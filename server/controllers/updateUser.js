const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({message: 'User ID is missing.'});
        }

        const { username, password, mobileNumber, languages } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        if (username) user.username = username;
        if (mobileNumber) user.mobileNumber = mobileNumber;
        if (languages) user.languages = languages;

        // if (password) {
        //     const salt = await bcrypt.genSalt(10);
        //     user.password = await bcrypt.hash(password, salt);
        // }

        await user.save();

        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: user._id,
                username: user.username,
                mobileNumber: user.mobileNumber,
                languages: user.languages,
                userType: user.userType,
                location: user.location
            },
        });
    } catch (error) {
        console.error('Error updating user: ', error);
        res.status(500).json({message: 'Server error'});
    } 
};


// Connecting to the update form

// import axios from 'axios';
// import { useState } from 'react';

// const UpdateUser = ({ userId }) => {
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         mobileNumber: '',
//         languages: [],
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value});
//     };

//     const updateUser = async () => {
//         try {
//             const response = await axios.put('http://localhost:5001/api/update/${userId}', formData);
//             console.log('User updated successfully:', response.data);
//         } catch (error) {
//             console.error('Error updating user:', error);
//         }
//     };

//     return(
//         <div>
//             <h2>Update User</h2>
//             <form onSubmit={(e) => { e.preventDefault(); updateUser(); }}>
//             <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//             />
//             <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//             />
//             <input
//                 type="text"
//                 name="mobileNumber"
//                 placeholder="Mobile Number"
//                 value={formData.mobileNumber}
//                 onChange={handleInputChange}
//             />
//             <input
//                 type="text"
//                 name="languages"
//                 placeholder="Languages (comma-separated)"
//                 value={formData.languages.join(', ')}
//                 onChange={(e) => setFormData({ ...formData, languages: e.target.value.split(', ') })}
//             />
//             <button type="submit">Update User</button>
//         </form>
//         </div>
//     );
// };

// export default UpdateUser;