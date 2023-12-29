import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      console.log("Reach Mail Helper", hashedToken);
      await User.findByIdAndUpdate(userId, {
        varifyToken: hashedToken,
        varifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d4d299ae06549f",
        pass: "f32bad95444a71",
      },
    });
    const mailOptions = {
      from: "vikas@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : "reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
          ro copy paste the link below in your browser.<br> ${
            process.env.DOMAIN
          }/verifyemail?token=${hashedToken}
          </p>`,
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
