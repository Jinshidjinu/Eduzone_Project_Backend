const tempOtpStorage = new Map();

module.exports = {
    set: (email, otp) => {
        tempOtpStorage.set(email, otp);
        setTimeout(() => {
            tempOtpStorage.delete(email);
        }, 300000); // OTP expires in 5 minutes
    },
    get: (email) => {
        return tempOtpStorage.get(email);
    },
    delete: (email) => {
        tempOtpStorage.delete(email);
    }
};
