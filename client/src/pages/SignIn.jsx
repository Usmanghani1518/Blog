import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { signinStart,signinFailure,signinSuccess } from '../redux/user/userSlice.js';
import OAuth from '../Component/OAuth.jsx';

function SignUp() {
  const [formData ,setformData] = useState({});
  const dispatch = useDispatch();
  const {loading,error:errorMessage} = useSelector((state)=>state.user)

  const navigate = useNavigate()
  const handleChange = (e)=>{
    setformData({...formData,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (!formData.email || !formData.password) {
     return dispatch(signinFailure("Email and password is required "))
    }
    try {
     dispatch(signinStart())
      const res = await fetch("/api/signin",{
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success== false) {
       dispatch(signinFailure(data.message))
      }

  if (res.ok) {
    dispatch(signinSuccess(data))
    navigate("/")
    
  }
    } catch (error) {
     dispatch(signinFailure(error.message))
    }

  }
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 mx-auto max-w-3xl flex-col md:flex-row gap-4 md:items-center">
      {/* for left side */}
      <div className="flex-1">
      <Link to="/" className=' dark:text-white  font-bold text-4xl'>
     <span className='px-2 py-1 bg-gradient-to-r from-indigo-600   via-purple-500 to-pink-500 rounded-lg text-white'>Usman's</span>Blog
      </Link>
      <p className=' text-sm pt-5'>This is a demo project and you can sign-in with your email password or with a google</p>
      </div>
      {/* for right side */}
      <div className=" flex-1">

        <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
          <div>
            <Label value='your email'/>
            <TextInput type='email' placeholder='yourmail@gmail.com' id='email' onChange={handleChange} />
          </div>
          <div>
            <Label value='your password'/>
            <TextInput type='password' placeholder='********' id='password' onChange={handleChange} />
          </div>
          <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading}>
            {
              loading?(<>
              <Spinner size="sm"/>
              <span>Loadin...</span>
              </>):
              "SignIn"
            }
         
          </Button>
          <OAuth/>
        </form>
        <div className='text-sm mt-3 flex gap-2'>
          <span>Dont have an account ? </span>
          <Link to="/SignUp" className=' text-blue-400 text-sm'>sign-up</Link>
        </div>
      {
        errorMessage&&(
        <Alert className='mt-3' color="failure">
          {errorMessage}
        </Alert>
        )
      }
      </div>
      </div>
    </div>
  )
}

export default SignUp