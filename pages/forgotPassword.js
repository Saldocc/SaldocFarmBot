import React, { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'

function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return <div className="sign-container">
    <Card className="sign-card">

      <Card.Body>
        <h2 className="text-center mb-4">Password Reset</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <button disabled={loading} className="main-btn py-2
            w-100" type="submit">
            Reset Password
        </button>
        </Form>
        <div className="w-100 text-center mt-3">
          <Link href="/login"><a>Login</a></Link>
        </div>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        Need an account? <Link href="/signup"><a>Sign Up</a></Link>
      </div>
    </Card>

  </div>;
}

export default ForgotPassword;