const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+\d][\d\s().-]{7,}$/
const postalCodePattern = /^[a-zA-Z0-9][a-zA-Z0-9\s-]{2,9}$/

export function validateRequired(value, label) {
  return value.trim() ? '' : `${label} is required.`
}

export function validateEmail(value) {
  if (!value.trim()) return 'Email is required.'
  return emailPattern.test(value.trim()) ? '' : 'Enter a valid email address.'
}

export function validatePassword(value) {
  if (!value) return 'Password is required.'
  return value.length >= 8 ? '' : 'Password must be at least 8 characters.'
}

export function validateConfirmPassword(password, confirmation) {
  if (!confirmation) return 'Please confirm your password.'
  return password === confirmation ? '' : 'Passwords do not match.'
}

export function validatePhone(value) {
  if (!value.trim()) return 'Phone number is required.'
  return phonePattern.test(value.trim()) ? '' : 'Enter a valid phone number.'
}

export function validatePostalCode(value) {
  if (!value.trim()) return 'Postal code is required.'
  return postalCodePattern.test(value.trim()) ? '' : 'Enter a valid postal code.'
}

export function validateCardNumber(value) {
  if (!value.trim()) return 'Card number is required.'
  const digits = value.replace(/\s+/g, '')
  return /^\d{16}$/.test(digits) ? '' : 'Enter a valid 16-digit card number.'
}

export function validateExpiry(value) {
  if (!value.trim()) return 'Expiry date is required.'
  return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value.trim()) ? '' : 'Use MM/YY format.'
}

export function validateCvc(value) {
  if (!value.trim()) return 'CVC is required.'
  return /^\d{3,4}$/.test(value.trim()) ? '' : 'Enter a valid CVC.'
}