import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {

        const hashedToken = await bcrypt.hash(userId.toString(),10)

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{
                $set:{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now() + 3600000  // one hour from now
                }
            })
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{
                $set:{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now() + 3600000  // one hour from now
                }
            })
        }


        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_AUTH_USER,
                pass: process.env.MAILTRAP_AUTH_PASSWORD
            }
        } as SMTPTransport.Options );

        const mailOptions = {
            from: 'bakihanma9910@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your Account" : "Reset Your Password",
            html: `<p>CLick <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==='VERIFY' ? "Verify your email" : "Reset your password"}
            or copy and past the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message) 
    }
}