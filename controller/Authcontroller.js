const User = require("../models/User")
const bcrypt = require("bcrypt")
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
module.exports={

    loginPOST :async (req,res) =>{
      
      try {
           
          return res.status(200).json({message:"seta"})

      } catch (error) {
        console.log(error);
      }
    },



      signupPOST: async (req, res) => {
        try {
            const { name, email, password, confirmpassword } = req.body;
            console.log('Received data:', req.body);
            
            // Validation
            if (!name || !email || !password || !confirmpassword) {
                return res.status(400).json({ required: "All fields are required" });
            }
            
            if (!emailRegex.test(email)) {
                return res.status(400).json({ email: "Invalid email format" });
            }
            
            if (password.length < 8) {
                return res.status(400).json({ password: "Password must be at least 8 characters long" });
            }
            
            if (password !== confirmpassword) {
                return res.status(400).json({ confirmpassword: "Passwords do not match" });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ email: "Email already exists. Please use a different email" });
            }
            const saltRounds = 10;
            const hashedpassword = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                name,
                email,
                password: hashedpassword,
            });
            await newUser.save();
            // Respond with success message
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}