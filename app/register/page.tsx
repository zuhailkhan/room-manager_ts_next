"use client";
import { useState } from 'react'

export interface IProps { }

const register = ({ }: IProps) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const handleRegistration = async (e: any) => {
        e.preventDefault();
        if(password1 !== password2) {
            alert("Password must match")
        }

        const result = await fetch('/api/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password: password1,
            })
        })

        console.log(result)
    }

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="username"></label>
                    <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email"></label>
                    <input type="text" name="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input type="text" name="password" placeholder="Password" onChange={(e) => setPassword1(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password2"></label>
                    <input type="text" name="password2" placeholder="Confirm Password" onChange={(e) => setPassword2(e.target.value)}/>
                </div>
                <div className='text-center'>
                    <button type="submit" onClick={handleRegistration}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default register