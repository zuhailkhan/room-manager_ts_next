"use client";
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
export interface IProps {}

const login = ({}: IProps) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const session = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  const handleLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials',{
      redirect: false,
      username,
      password
    })

    console.log(res);
  }

  return (
    <div className='bg-slate-200 p-4 rounded-lg shadow-lg'>
      <form action="">
        <div className='mb-2 flex gap-2 justify-between'>
          {/* <label htmlFor="username">Username</label> */}
          <input onChange={(e) => setUsername(e.target.value)} value={username} className='rounded-lg border p-2 shadow-sm' type="text" placeholder='Username' name="username"/>
        </div>
        <div className='mb-2 flex gap-2 justify-between'>
          {/* <label htmlFor="Password">Password</label> */}
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-lg border p-2 shadow-sm' type="password" placeholder='Password' name="password"/>
        </div>
        <div className='text-center'>
          <button className='bg-white p-2 rounded-lg  shadow-sm' type="submit" onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default login