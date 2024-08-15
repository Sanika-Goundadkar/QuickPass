import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// console.log("Encryption Key:", process.env.ENCRYPTION_KEY);

// Fetch encryption key from environment variable
const SECRET_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const ALGORITHM = "aes-256-cbc";
// console.log("Secret Key Length:", SECRET_KEY.length); // Should print 32

// Encrypt a password
export const encryptPassword = (password) => {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
};

// Decrypt a password
export const decryptPassword = (encryptedData, iv) => {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    SECRET_KEY,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
