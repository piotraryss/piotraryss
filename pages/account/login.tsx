import { ChangeEventHandler, useState } from 'react'
import styles from '../../styles/account/login.module.scss'
import { IUser, IUserLogon, TUsernameReqErrorId, TPasswordReqErrorId, checkUsernameRequirements, checkPasswordRequirements, checkPassword, encryptPassword, encrypt, decrypt } from '../../lib/user'

export default function Login() {

    const [username, setUsername] = useState("" as string)
    const [usernameError, setUsernameError] = useState(false as boolean)
    const [usernameRequirements, setUsernameRequirements] = useState([] as Array<TUsernameReqErrorId>)
    const [password, setPassword] = useState("" as string)
    const [passwordError, setPasswordError] = useState(false as boolean)
    const [passwordRequirements, setPasswordRequirements] = useState([] as Array<TPasswordReqErrorId>)

    // Obsługa wprowadzania adresu e-mail
    const handleChangeUsername = (event: any) => {
        setUsername(event.target.value)
        setUsernameRequirements(checkUsernameRequirements(event.target.value))
    }

    // Obsługa wprowadzania hasła
    const handleChangePassword = (event: any) => {
        setPassword(event.target.value)
        setPasswordRequirements(checkPasswordRequirements(event.target.value))
    }

    const login = async (event: any) => {

        var formError = false

        // Testuj Username
        setUsernameError(false)
        if(username.length == 0) {
            setUsernameError(true)
            formError = true
        }

        // Testuj Password
        setPasswordError(false)
        if(password.length == 0) {
            setPasswordError(true)
            formError = true
        }

        // Tutorial: https://www.tutorialspoint.com/crypto-createdecipheriv-method-in-node-js
        console.log(encrypt(password))
        console.log(decrypt(encrypt(password)))
        //return
        //checkPassword(password, encryptPassword(password))

        // Formlularz logowania jest poprawny
        if(formError == false) {
            var user: IUser = {
                username: username,
                password: password
            }

            // Wykonaj kompunikację z API
            const resCredentials = await fetch(
                '/api/auth/credentials',
                {
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                }
            )
            console.log(resCredentials)

            return
        }
    }

    return (
        <>
            <div className={styles.formWrapper}>
                <div>
                    <input type="text" placeholder="Enter your email" value={username} onChange={handleChangeUsername}></input>
                    {usernameError == true ? (
                        <div className={styles.fieldError}>Please enter your login</div>
                    ) : (<></>)}
                </div>
                <div>
                    <input type="password" placeholder="Enter your password" value={password} onChange={handleChangePassword}></input>
                    {passwordError == true ? (
                        <div className={styles.fieldError}>Please enter your password</div>
                    ) : (<></>)}
                </div>
                <div>
                    <button onClick={login}>Login</button>
                </div>
            </div>
        </>
    )
}
