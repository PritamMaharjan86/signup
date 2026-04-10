import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailVerification = async (email, username, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

  const mailOptions = {
    from: `"Smart Tokari | No Reply" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Smart Tokari account",
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                
                <!-- header -->
                <div style="background-color: #2B5CE6; padding: 24px 32px; border-radius: 12px 12px 0 0; text-align: center;">
                    <span style="color: white; font-size: 22px; font-weight: bold;">
                        Smart Tokari 🧺
                    </span>
                </div>

                <!-- body -->
                <div style="padding: 40px 32px; background-color: #f9fafb; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
                    <h2 style="color: #111827; font-size: 22px; margin: 0 0 8px 0;">
                        Namaste, ${username} 🙏
                    </h2>
                    <p style="color: #6b7280; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
                        Welcome to Smart Tokari! Please verify your email address to activate your account.
                    </p>

                    <!-- button -->
                    <div style="text-align: center; margin: 32px 0;">
                        <a href="${verifyUrl}" style="
                            display: inline-block;
                            background-color: #2B5CE6;
                            color: #ffffff;
                            padding: 14px 40px;
                            border-radius: 8px;
                            text-decoration: none;
                            font-weight: bold;
                            font-size: 16px;
                        ">
                            Verify Email Address
                        </a>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

                    <!-- copy link -->
                    <p style="color: #9ca3af; font-size: 13px; margin: 0 0 8px 0;">
                        Button not working? Copy this link into your browser:
                    </p>
                    <p style="
                        background-color: #f3f4f6;
                        border: 1px solid #e5e7eb;
                        border-radius: 6px;
                        padding: 10px 14px;
                        color: #2B5CE6;
                        font-size: 12px;
                        word-break: break-all;
                    ">
                        ${verifyUrl}
                    </p>
                </div>

                <!-- footer -->
                <div style="
                    background-color: #f3f4f6;
                    padding: 20px 32px;
                    border-radius: 0 0 12px 12px;
                    border: 1px solid #e5e7eb;
                    border-top: none;
                    text-align: center;
                ">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0 0 4px 0;">
                        This link expires in <strong>24 hours</strong>.
                    </p>
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        If you did not register, ignore this email.
                    </p>
                    <p style="color: #d1d5db; font-size: 11px; margin: 16px 0 0 0;">
                        © ${new Date().getFullYear()} Smart Tokari. All rights reserved.
                    </p>
                </div>

            </div>
        `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmailVerification;
