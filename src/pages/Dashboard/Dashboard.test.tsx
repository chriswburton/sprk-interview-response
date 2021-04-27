import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Dashboard } from './Dashboard'
import { USER_NAME } from '../../interfaces/local-storage.constants'
import { Router } from 'react-router-dom'

const name = 'John'

describe('Dashboard', () => {
    beforeEach(() => {
        localStorage.clear()
        localStorage.setItem(USER_NAME, name)
    })

    it('should display a personalised greeting', () => {
        const { getByTestId } = render(<Dashboard />)
        const greeting = getByTestId('greeting')

        expect(greeting.textContent).toBe(`Hi ${name}! You are now logged in.`)
    })

    it('should log the user out when the button is pressed', async () => {
        const historyMock = {
            push: jest.fn(),
            location: {},
            listen: jest.fn(),
        } as any
        const { getByTestId } = render(
            <Router history={historyMock}>
                <Dashboard />
            </Router>
        )

        const logoutButton = getByTestId('logout')
        fireEvent.click(logoutButton)

        await waitFor(() =>
            expect(historyMock.push).toHaveBeenCalledWith('/login')
        )
    })
})
