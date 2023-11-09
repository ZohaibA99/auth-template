import {Link} from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/auth/signup', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData),
        })
        const data = await res.json();
        console.log(data);
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} method='POST' className='flex flex-col gap-4'>
                <input 
                type="text" 
                placeholder='Username' 
                id='username' 
                className='bg-slate-100 p-3 rounded-lg'
                onChange={handleChange}></input>

                <input 
                type="email" 
                placeholder='Pmail' 
                id='email' 
                className='bg-slate-100 p-3 rounded-lg'
                onChange={handleChange}></input>

                <input 
                type="password" 
                placeholder='Password' 
                id='password' 
                className='bg-slate-100 p-3 rounded-lg'
                onChange={handleChange}></input>

                
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' type='submit'>SignUp</button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to='/sign-in'>
                    <span className='text-blue-500'>Sign in</span>
                </Link>
            </div>
        </div>
    )
}