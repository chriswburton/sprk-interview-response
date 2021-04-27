import { FC } from 'react'
import { ButtonPrimary } from '../../components/ButtonPrimary'
import { useHistory } from 'react-router'
import { api } from '../../api'
import { USER_NAME } from '../../interfaces/local-storage.constants'

export const Dashboard: FC = () => {
    const history = useHistory()
    const name = localStorage.getItem(USER_NAME)

    const handleSignOut = () => {
        api.clearAuthToken()
        localStorage.clear()
        history.push('/login')
    }

    return (
        <>
            <div className={'w-screen h-screen bg-blue-400 text-center p-8'}>
                <div className={'animate__animated animate__fadeIn'}>
                    <div
                        className={
                            'p-3 mb-4 bg-2 bg-green-500 text-white rounded-lg'
                        }
                        data-testid={'greeting'}
                    >
                        Hi {name}! You are now logged in.
                    </div>
                    <ButtonPrimary
                        onClick={handleSignOut}
                        data-testid={'logout'}
                    >
                        Logout
                    </ButtonPrimary>
                </div>
            </div>
        </>
    )
}
