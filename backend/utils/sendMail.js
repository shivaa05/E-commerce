import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (to, OTP) => {
  try {
    const info = await transporter.sendMail({
      from: '"E-commerce App" <process.env.GMAIL>',
      to,
      subject: "Your OTP for Password Reset",
      html: `
      <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
  
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
    <tr>
      <td align="center">
        
        <!-- Card -->
        <table width="400" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:0; color:#333;">🔐 OTP Verification</h2>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td align="center" style="color:#555; font-size:16px; padding-bottom:20px;">
              Use the OTP below to verify your account.  
              This code is valid for <b>10 minutes</b>.
            </td>
          </tr>

          <!-- OTP Box -->
          <tr>
            <td align="center" style="padding:20px 0;">
              <div style="
                display:inline-block;
                padding:15px 30px;
                font-size:28px;
                font-weight:bold;
                letter-spacing:5px;
                color:#ffffff;
                background:linear-gradient(135deg, #667eea, #764ba2);
                border-radius:8px;
              ">
                ${OTP}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="color:#888; font-size:14px; padding-top:20px;">
              If you didn't request this, you can safely ignore this email.
            </td>
          </tr>

          <!-- Brand -->
          <tr>
            <td align="center" style="padding-top:20px; font-size:12px; color:#aaa;">
              © 2026 E commerce App. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`,
    });

  } catch (error) {
    console.log("Error sending email:", error);
  }
};