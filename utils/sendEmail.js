const nodemailer = require('nodemailer');

exports.sendEmail = async (email, subject, payload ) => {
    console.log("Sending Email...")
    try{
        let transporter =  nodemailer.createTransport({
            service: "gmail",
            auth:{
                user:'tskeerthikumar123@gmail.com',
                pass:process.env.ADMIN_PASSWORD
            }
        })

        let mailOptions = {
            from:'tskeerthikumar123@gmail.com',
            to:email,
            subject:subject,
            text: JSON.stringify(payload)
        };

        await transporter.sendMail(mailOptions,(err, data) => {
            if(err){
                console.log("Error in sendMail.")
                return false;
            }
            console.log('Email sent successfully')
            return true;
        })
    }catch(error){
        console.log('Error while sending email:', error)
        return false;
    }
}