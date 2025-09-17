const mailer = require("nodemailer")

//SMTP protcol
//GMAIL
const mailSend = async(to,subject,text)=>{


    const transport = mailer.createTransport({
        service:"gmail",
        auth:{
            user:"pythonforsamir@gmail.com",
            pass:"nkee vqzq jahq cpdk"
        }
    })
    const mailOptions = {
        from:"pythonforsamir@gmail.com",
        to:to,
        subject:subject,
        //text:text
        html:`<h1>${text}</h1>`
    }

    const mailResponse = await transport.sendMail(mailOptions)
    console.log(mailResponse)


}

//mailSend("samir.vithlani83955@gmail.com","TEST MAIL","welcome to portal")
module.exports = mailSend