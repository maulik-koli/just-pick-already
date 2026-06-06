import 'server-only';
import { Resend } from 'resend';
import { env } from '@/lib/env';
import { ContactFormType } from '@/schemas/contact.schema';

const resend = new Resend(env.EMAIL_API_KEY);

export const sendEmail = async (data: ContactFormType) => {
    try {
        const html = `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #333333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #f4623a; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; margin-top: 0;">New Contact Message</h2>
            <p>You received a new message from the <strong>Just Pick Already</strong> contact form.</p>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border: 1px solid #eeeeee; margin: 20px 0;">
                <tr>
                    <td style="padding: 20px; font-family: Arial, Helvetica, sans-serif;">
                        <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${data.name || "Not provided"}</p>
                        <p style="margin: 0 0 20px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #f4623a; text-decoration: none;">${data.email}</a></p>
                        <div style="border-top: 1px solid #dddddd; padding-top: 15px;">
                            <strong>Message:</strong><br><br>
                            ${data.message.replace(/\n/g, '<br>')}
                        </div>
                    </td>
                </tr>
            </table>
            
            <p style="font-size: 12px; color: #888888; text-align: center;">Sent securely from your website.</p>
        </div>
        `;

        const response = await resend.emails.send({
            from: 'Just Pick Already <hello@justpickalready.in>',
            to: "hello@justpickalready.in",
            replyTo: data.email,
            subject: `New contact from ${data.name || "a visitor"}`,
            html
        });

        if (!response || !response.data || response.error) {
            throw new Error("Failed to send email. Please try again later.");
        }

    }
    catch (e: any) {
        console.log('error in sneind mail' , {
            message: e.message,
            statusCode: e.statusCode,
        })

        throw new Error(e.message || "Failed to send email. Please try again later.");
    }
}