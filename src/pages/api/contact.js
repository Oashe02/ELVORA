import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function (req, res) {
	try {
		if (req.method !== "POST") {
			return res.status(405).json({ message: "Method not allowed" });
		}

		// console.log(req.body);
		const { name, email, mobileNumber, message, selectedService } = req.body;

		// console.log({
		//   name,
		//   email,
		//   mobileNumber,
		//   message,
		//   selectedService,
		// });

		await resend.emails.send({
			from: "Notification <noreply@dunestodowntown.com>",
			to: ["dunestodowntown@gmail.com"],
			bcc: ["booking@dunestodowntown.com", "ashadnasim123@gmail.com"],
			subject: `New Message from ${name}`,
			html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Message </title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        background-color: #4CAF50;
        color: white;
        text-align: center;
        padding: 15px 20px;
        font-size: 20px;
      }
      .email-body {
        padding: 20px;
      }
      .highlight {
        padding: 12px;
        border-left: 4px solid #d0d0d0;
        background: #f4f4f4;
        font-style: italic;
      }
      .email-footer {
        margin-top: 20px;
        font-size: 14px;
        color: #777;
        text-align: center;
        padding: 10px;
        background: #f4f4f4;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        New Message
      </div>
      <div class="email-body">
        <p>Hello Dunes to Downtown Team,</p>
        <p>You have received a new service request from <strong>${name}</strong>.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${mobileNumber}</p>
        <p><strong>Selected Service:</strong> ${selectedService}</p>
        <div class="highlight">${message}</div>
        <p>Best regards,<br>DunesToDowntown Team</p>
      </div>
      <div class="email-footer">
        This is an automated message. Please do not reply directly to this email.
      </div>
    </div>
  </body>
  </html>
  `,
		});

		return res.status(200).json({ success: true });
	} catch (error) {
		console.error("Error sending email:", error);
		return res
			.status(500)
			.json({ success: false, error: "Internal Server Error" });
	}
}
