import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { Login } from './Login'
import { Router } from 'react-router-dom'
import { ACCESS_TOKEN } from '../../interfaces/local-storage.constants'

describe('Login', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('should redirect if user is already logged in', async () => {
        const historyMock = {
            push: jest.fn(),
            location: {},
            listen: jest.fn(),
        } as any
        localStorage.setItem(ACCESS_TOKEN, 'placeholder')
        render(
            <Router history={historyMock}>
                <Login />
            </Router>
        )

        await waitFor(() => expect(historyMock.push).toHaveBeenCalledWith('/'))
    })

    it('should require a username and password', () => {
        const { getByTestId } = render(<Login />)
        const loginButton = getByTestId('submit')

        expect(loginButton).toBeDisabled()
    })

    it('should display an error if login is unsuccessful', async () => {
        const { getByTestId } = render(<Login />)

        const usernameInput = getByTestId('username')
        const passwordInput = getByTestId('password')
        const loginButton = getByTestId('submit')

        // enter credentials
        fireEvent.change(usernameInput, { target: { value: 'unknown_user' } })
        fireEvent.change(passwordInput, {
            target: { value: 'incorrect_password' },
        })
        await waitFor(() => expect(loginButton).not.toBeDisabled())

        // attempt login
        fireEvent.click(loginButton)
        await waitFor(() => getByTestId('error'))
        const errorMessage = getByTestId('error')
        expect(errorMessage).toBeTruthy()
    })

    it('should redirect on successful login', async () => {
        const historyMock = {
            push: jest.fn(),
            location: {},
            listen: jest.fn(),
        } as any
        const { getByTestId } = render(
            <Router history={historyMock}>
                <Login />
            </Router>
        )

        const usernameInput = getByTestId('username')
        const passwordInput = getByTestId('password')
        const loginButton = getByTestId('submit')

        fireEvent.change(usernameInput, { target: { value: 'jeff1967' } })
        fireEvent.change(passwordInput, { target: { value: 'hotdog' } })

        fireEvent.click(loginButton)
        await waitFor(() => expect(historyMock.push).toHaveBeenCalledWith('/'))
    })
})
