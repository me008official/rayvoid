import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto"

export const TRUECALLER_ATTEMPT_COOKIE = "truecallerLoginAttempt"
export const TRUECALLER_ATTEMPT_TTL_SECONDS = 10 * 60

function getEncryptionKey() {
  const secret = process.env.SECRET_KEY
  if (!secret) {
    throw new Error("SECRET_KEY is not configured")
  }

  return createHash("sha256").update(secret).digest()
}

export function encryptTruecallerToken(token) {
  const iv = randomBytes(12)
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv)
  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()

  return [iv, tag, encrypted].map((part) => part.toString("base64url")).join(".")
}

export function decryptTruecallerToken(encryptedToken) {
  const [encodedIv, encodedTag, encodedValue] = encryptedToken.split(".")
  if (!encodedIv || !encodedTag || !encodedValue) {
    throw new Error("Invalid encrypted Truecaller token")
  }

  const decipher = createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(encodedIv, "base64url")
  )
  decipher.setAuthTag(Buffer.from(encodedTag, "base64url"))

  return Buffer.concat([
    decipher.update(Buffer.from(encodedValue, "base64url")),
    decipher.final(),
  ]).toString("utf8")
}

export function normalizePhoneNumber(phoneNumber) {
  return String(phoneNumber || "").replace(/\D/g, "")
}

export function isAllowedTruecallerProfile(profile) {
  const allowedPhone = normalizePhoneNumber(process.env.TRUECALLER_ADMIN_PHONE)
  const verifiedPhones = Array.isArray(profile?.phoneNumbers)
    ? profile.phoneNumbers.map(normalizePhoneNumber)
    : []

  return Boolean(
    allowedPhone && verifiedPhones.some((phone) => phone === allowedPhone)
  )
}
