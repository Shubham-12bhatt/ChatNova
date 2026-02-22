const { resend, sender } = require("../lib/resend");
const { createWelcomeEmailTemplate } = require("./emailTemplates");


const sendWelcomeEmail = async (to, name,clientURL) => {
    try {
      
        await resend.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to,
            subject: "Welcome to ChatNova",
            html: createWelcomeEmailTemplate(name, clientURL),
        });
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};

module.exports = {sendWelcomeEmail};