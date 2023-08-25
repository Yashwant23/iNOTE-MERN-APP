import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [credential, setCredential] = useState({ name: "", email: "", password: "" })
    const onChange = (e) => {
        // console.log({ [e.target.name]: [e.target.value] })
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = credential
        const res = await fetch("https://inote-mern-app.onrender.com/api/auth/createUser", {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
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
            setCredential({ name: "", email: "", password: "" })
        }
    }

    return (
        <div className='container my-3'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input type="text" className="form-control my-3" id="name" placeholder="Username" name="name" onChange={onChange} value={credential.name} />
                </div>
                <div className="form-group my-6">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control my-3" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} value={credential.email} placeholder="Enter email" />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control my-3" id="password" onChange={onChange} value={credential.password} name="password" />
                </div>

                <button type="submit text-center" className="btn btn-primary">Submit</button>
            </form>

        </div>

    )
}

export default Signup
