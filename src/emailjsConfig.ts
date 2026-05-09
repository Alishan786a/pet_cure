/** Prefer VITE_EMAILJS_* in .env; fallbacks match your EmailJS project. */
export const emailJs = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_7pxsgt9',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_jdv8xc9',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'qOCVTF_MJcIBGOBH4',
} as const
