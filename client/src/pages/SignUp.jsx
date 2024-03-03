import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left  */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  rounded-lg text-white">
              Ajay's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. you can Sign up with your email and password or with google.
          </p>
        </div>
        {/* Right */}
        <div className="flex-1">
          <form  className="flex flex-col gap-4">
             <div >
              <Label value="your name" />
              <TextInput 
               type='text'
               placeholder="Username"
               id='username'
              />
             </div>
             <div >
              <Label value="your email" />
              <TextInput 
               type='text'
               placeholder="name@company.com"
               id='email'
              />
             </div>
             <div >
              <Label value="your password" />
              <TextInput 
               type='text'
               placeholder="Password"
               id='password'
              />
             </div>
             <Button
               gradientDuoTone='purpleToPink' type='submit'
             >Sign up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
            <span>Already have an Accounnt?</span>
            <Link to='/signin' className=" text-blue-500 font-bold">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
