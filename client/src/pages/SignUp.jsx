import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function SignUp() {
  const [formData ,setformData] = useState({});
  const [errorMessage,seterrorMessage] = useState(null);
  const [loading ,setLoading] = useState(false);

  const navigate = useNavigate()
  const handleChange = (e)=>{
    setformData({...formData,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      seterrorMessage("All fields are required")
    }
    try {
      setLoading(true);
      seterrorMessage(null)
      const res = await fetch("/api/signup",{
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success== false) {
        seterrorMessage(data.message)
      }
  setLoading(false)
  if (res.ok) {
    navigate("/SignIn")
  }
    } catch (error) {
      seterrorMessage(error.message)
      setLoading(false)
    }

  }
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 mx-auto max-w-3xl flex-col md:flex-row gap-4">
      {/* for left side */}
      <div className="flex-1">
      <Link to="/" className=' dark:text-white  font-bold text-4xl'>
     <span className='px-2 py-1 bg-gradient-to-r from-indigo-600   via-purple-500 to-pink-500 rounded-lg text-white'>Usman's</span>Blog
      </Link>
      <p className=' text-sm pt-5'>This is a demo project and you can signup with your email password or with a google</p>
      </div>
      {/* for right side */}
      <div className=" flex-1">

        <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
          <div>
            <Label value='your username'/>
            <TextInput type='text' placeholder='username' id='username' onChange={handleChange} />
          </div>
          <div>
            <Label value='your email'/>
            <TextInput type='email' placeholder='yourmail@gmail.com' id='email' onChange={handleChange} />
          </div>
          <div>
            <Label value='your password'/>
            <TextInput type='password' placeholder='password' id='password' onChange={handleChange} />
          </div>
          <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading}>
            {
              loading?(<>
              <Spinner size="sm"/>
              <span>Loadin...</span>
              </>):
              "SignUp"
            }
         
          </Button>
        </form>
        <div className='text-sm mt-3 flex gap-2'>
          <span>Already have an account ? </span>
          <Link to="/SignIn" className=' text-blue-400 text-sm'>sign-in</Link>
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