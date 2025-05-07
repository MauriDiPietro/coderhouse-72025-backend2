import { mailConfig, mailConfigHbs, transporter } from "../services/email-service.js"

export const sendMail = async(req,res,next)=>{
    try {
        // const response = await transporter.sendMail(mailConfig);
        const response = await transporter.sendMail(mailConfigHbs);
        res.json(response)
    } catch (error) {
        next(error)
    }
}