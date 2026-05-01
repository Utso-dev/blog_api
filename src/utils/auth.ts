import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// If your Prisma file is located elsewhere, you can change the path
import nodemailer from 'nodemailer';
import { prisma } from '../../lib/prisma';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', 
  }),
  
  trustedOrigins: [process.env.BETTER_AUTH_URL, 'http://localhost:3000'],
  user:{
    additionalFields:{
      role:{
        type:'string',
        default:'USER',
        required:false,
      },
        phone:{
          type:'string',
          required:false,
          default:null,
        },
        status:{
          type:'string',
          default:'ACTIVE',
          required:false,
        }
    }
  },
   emailAndPassword: { 
    enabled: true, 
  },
  emailVerification:{
    sendOnSignIn:true,
    autoSignInAfterVerification:true,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        const info = await transporter.sendMail({
          from: '"Your App Team" <no-reply@yourdomain.com>',
          to: user.email,
          subject: "Verify your email address",
          text: `Click the link to verify your email: ${url}`,
          html: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h2>Verify your email</h2>
                        <p>Hello ${user.name},</p>
                        <p>Please click the button below to verify your account:</p>
                        <a href="${url}" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
                        <p>If the button doesn't work, copy and paste this link: ${url}</p>
                    </div>
                `,
        });

        console.log("Verification email sent: %s", info.messageId);
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    },
  
  }
  
});
