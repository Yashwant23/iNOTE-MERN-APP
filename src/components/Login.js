import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "" })
    const onChange = (e) => {
        // console.log({ [e.target.name]: [e.target.value] })
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = credential
        const res = await fetch("https://inote-mern-app.onrender.com/api/auth/login", {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const json = await res.json();
        // console.log(json)
        if (json.sucess) {
            const token = json.authtoken;
            localStorage.setItem('token', token)
            navigate("/")
        }
        else {
            alert("Invalid")
            setCredential({ email: "", password: "" })
        }
    }

    return (
        <div className='container d-inline-flex p-2 justify-content-center my-5 '>
            <form onSubmit={handleSubmit}>

                <div className="form-group my-6">
                    <label htmlFor="email" className='text-center'>Email address</label>
                    <input type="email" className="form-control my-3 shadow-sm" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} value={credential.email} placeholder="Enter email" />

                </div>
                <div className="form-group">
                    <label htmlFor="password" className='text-center'>Password</label>
                    <input type="password" className="form-control my-3 shadow-sm" id="password" onChange={onChange} value={credential.password} name="password" />
                </div>

                <button type="submit text-center" className="btn btn-primary">Submit</button>
            </form>

        </div>

    )
}
export default Login
