const User = require("../models/User")
const bcrypt = require("bcrypt")
const generateOTP = require('../utility/generateOtp')
const tempOtpStorage = require("../utility/tembstorage")
const sendOTPEmail = require('../utility/nodemailer')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



module.exports={

    loginPOST: async (req, res) => {
        try {
            const { LoginData } = req.body;
            console.log(LoginData);

            if (!LoginData.email || !LoginData.password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            if (!emailRegex.test(LoginData.email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }

            const user = await User.findOne({ email: LoginData.email });

            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            if (!user.verified) {
                return res.status(403).json({ message: "Please verify your email before logging in" });
            }

            const validPassword = await bcrypt.compare(LoginData.password, user.password);

            if (!validPassword) {
                return res.status(401).json({ message: "Invalid password" });
            }

            return res.status(200).json({ message: "Login successful" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
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

            const otp = generateOTP();
            await sendOTPEmail(email, otp);

            // Store OTP temporarily
            tempOtpStorage.set(email, otp);
            console.log(otp, "otp");
            console.log(tempOtpStorage, 'tempstorage');

            const newUser = new User({
                name,
                email,
                password: hashedpassword,
            });

            // Save the user after sending the OTP email
            await newUser.save();

            // Respond with success message
            return res.status(201).json({ message: 'OTP sent to your email. Please verify to complete registration.' });

        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

   

    VerifyOtpPOST: async (req, res) => {
        try {
            const { email, otpString } = req.body;
    
            console.log("email .....", email);
            console.log('Received OTP:', otpString);
            console.log('Full request body:', req.body);

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
     
            const storedOtp = tempOtpStorage.get(email);
            console.log('Stored OTP:', storedOtp);
          
            if (!storedOtp) {
                return res.status(400).json({ message: 'OTP has expired or not found' });
            }
          
            if (storedOtp === otpString) {
                tempOtpStorage.delete(email);
                 
                await User.updateOne({email:email},
                    {
                    $set: {verified:true}
                }
            )
                return res.status(200).json({ message: 'OTP verified successfully' });
            } else {
                return res.status(400).json({ message: 'Invalid OTP' });
            }
        } catch (error) {
            console.error('Error in VerifyOtpPOST:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
      }






};
