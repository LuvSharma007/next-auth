import User from "@/models/userModel"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"

export const sendEmail = async({email,emailType,userId}:any)=>{
try {

    const hashedToken = await bcrypt.hash(userId.toString(),10)

    if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,
            {verifyToken:hashedToken,verifyTokenEXpiry:Date.now() + 3600000 }
        )
    }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,
            {forgotpPasswordToken:hashedToken,forgotpPasswordTokenExpiry:Date.now() + 3600000 }
        )
    }

    
    var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.USER_OF_MAILTRAP,
        pass: process.env.PASSWORD_OF_MAILTRAP
    }
    });

    const mailOptions = {
    from: 'luvsharma9910@gmail.com',
    to: email,
    subject: emailType === 'VERIFY' ? "verify your email": "Reset your password",
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here</a>to ${emailType === "VERIFY" ? "verify your email":"reset your password"} or copy paste the link below in your browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
    }

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;

    } catch (error:any) {
        console.log("error while sending email");        
        throw new Error(error.message)
    }
}