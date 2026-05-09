import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaPaperPlane, FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6'
import { emailJs } from './emailjsConfig'

/** Matches your EmailJS HTML template: {{name}}, {{email}}, {{phone}}, {{message}} */
export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function clearFeedback() {
    setStatus((s) => (s === 'success' || s === 'error' ? 'idle' : s))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        emailJs.serviceId,
        emailJs.templateId,
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
        
        },
        { publicKey: emailJs.publicKey },
      )
      setStatus('success')
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-form-wrap" id="message">
      <h3 className="contact-form__heading">Send a message</h3>
      <p className="contact-form__hint">We usually reply within one business day.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="contact-form__field">
          <span className="contact-form__label">Name</span>
          <input
            className="contact-form__input"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              clearFeedback()
            }}
          />
        </label>
        <label className="contact-form__field">
          <span className="contact-form__label">Email</span>
          <input
            className="contact-form__input"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              clearFeedback()
            }}
          />
        </label>
        <label className="contact-form__field">
          <span className="contact-form__label">Phone</span>
          <input
            className="contact-form__input"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              clearFeedback()
            }}
          />
        </label>
        <label className="contact-form__field contact-form__field--full">
          <span className="contact-form__label">Message</span>
          <textarea
            className="contact-form__textarea"
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              clearFeedback()
            }}
          />
        </label>
        <div className="contact-form__actions">
          <button className="btn btn--primary contact-form__submit" type="submit" disabled={status === 'sending'}>
            <FaPaperPlane aria-hidden style={{ marginRight: 8 }} />
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'success' ? (
            <p className="contact-form__feedback contact-form__feedback--ok" role="status">
              <FaCircleCheck aria-hidden /> Thank you — your message was sent.
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="contact-form__feedback contact-form__feedback--err" role="alert">
              <FaTriangleExclamation aria-hidden /> Something went wrong. Please call or email us instead.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  )
}
