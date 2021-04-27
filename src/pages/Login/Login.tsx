import { FC, FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { InputPrimary } from '../../components/InputPrimary'
import { ButtonPrimary } from '../../components/ButtonPrimary'
import {
    ACCESS_TOKEN,
    USER_NAME,
} from '../../interfaces/local-storage.constants'
import { api } from '../../api'
import { extractDataFromJWT } from '../../lib/extract-data.util'

export const Login: FC = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            history.push('/')
        }
    }, [history])

    const handleLogin = () => {
        api.login({
            username,
            password,
        })
            .then(({ data: { token } }) => {
                // store sign in to local state
                // TODO: move to state management
                const { user } = extractDataFromJWT(token)
                localStorage.setItem(USER_NAME, user.name)
                localStorage.setItem(ACCESS_TOKEN, token)
                api.addAuthToken(token)
                history.push('/')
            })
            .catch((e) => setError(e.response.data))
    }

    return (
        <div
            className={
                'h-screen flex flex-col items-center justify-center w-full h-full bg-blue-900'
            }
        >
            <div
                className={
                    'animate__animated animate__bounce flex flex-col w-1/3 justify-between bg-white p-8 h-72'
                }
            >
                <h2 className={'font-semibold text-lg'}>Sign In</h2>
                <InputPrimary
                    placeholder={'Username'}
                    value={username}
                    onChange={(event: FormEvent<HTMLInputElement>) =>
                        setUsername(event.currentTarget.value)
                    }
                    data-testid={'username'}
                />
                <InputPrimary
                    type={'password'}
                    placeholder={'Password'}
                    value={password}
                    onChange={(event: FormEvent<HTMLInputElement>) =>
                        setPassword(event.currentTarget.value)
                    }
                    data-testid={'password'}
                />
                {error && (
                    <div
                        className={
                            'animate__animated animate__shakeX text-red-600 text-center'
                        }
                        data-testid={'error'}
                    >
                        {error}
                    </div>
                )}
                <ButtonPrimary
                    disabled={!username || !password}
                    onClick={handleLogin}
                    data-testid={'submit'}
                >
                    Login
                </ButtonPrimary>
            </div>
        </div>
    )
}
