import React from 'react'
import { render } from '@testing-library/react'
import { Login } from './Login'

describe('Login', () => {
    it('should render successfully', () => {
        render(<Login />)
    })
})
