import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '@contexts/auth.context'

import { login as loginService } from '@services/auth.service'

import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, TextField } from '@mui/material'

const Login = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [loginError, setLoginError] = useState('')
  const { login } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateIputs()) {
      try {
        const data = new FormData(event.currentTarget)
        const response = await loginService((data.get('email') as string) || '', data.get('password') as string)
        const { token } = response
        login(token)
        navigate('/home')
      } catch (e) {
        setLoginError('Error al iniciar sesión.')
      }
    }
  }

  const validateIputs = () => {
    const email = document.getElementById('email') as HTMLInputElement
    const password = document.getElementById('password') as HTMLInputElement

    let isValid = true

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true)
      setEmailErrorMessage('Correo invalido.')
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage('')
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage('La contraseña no cumple con las politicas de seguridad.')
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage('')
    }

    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <FormControl>
          <Button type="submit" variant="contained">
            Iniciar Sesión
          </Button>
        </FormControl>
        <FormControl>
          <Link
            to={{
              pathname: '/forgotPassword',
              search: `?email=${email}`,
              hash: '#hash',
            }}
          >
            Recordar contraseña
          </Link>
        </FormControl>
        <hr />
        <h4>{loginError}</h4>
      </Box>
    </>
  )
}

export default Login
