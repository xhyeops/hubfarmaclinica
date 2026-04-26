export const ADMIN_EMAILS = [
  "dre1@live.com",
]

export function isAdminEmail(email?: string | null) {
  return !!email && ADMIN_EMAILS.includes(email)
}