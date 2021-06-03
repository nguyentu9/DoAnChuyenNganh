import validator from 'validator';
export const validateSignUp = async (req, res, next) => {
    const { 
        userName, passWord, fullName, 
        phone, emailAddr, major, degree, organization, address 
    } = req.body;
    
}