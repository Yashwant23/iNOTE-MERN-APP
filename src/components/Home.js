import React, { useEffect } from 'react'
import Notes from './Notes';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate("/login")
    }, [])
    return (

        <div className='container my-3'>
            <AddNotes />
            <Notes />
        </div>


    )
}

export default Home

