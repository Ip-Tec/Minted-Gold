import { crypt, mail } from "@/app/api/crypt/route";

// Function to generate a key (you can implement your own logic here)

export async function generateKey(email: string) {
  // Implement your key generation logic
  const PasswordKey = await crypt.hash(email, 27)
  return PasswordKey;
}

// Function to send the key to the admin's email
export async function sendKeyToAdmin(adminEmail: string, key: string) {
  // Implement mail configuration and send email logic here
  const transporter = await mail.createTransport({
    service: "gmail",
    auth: {
      user: "otakhorpeter@gmail.com",
      pass: "ilove Glory100",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: adminEmail,
    subject: "Your Admin Access Key",
    text: `Your key is: ${key}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return error
    } else {
      console.log("Email sent:", info.response);
      return info
    }
  });
}
