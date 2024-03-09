import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="w-full  mx-auto p-3 ">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-5">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilepictur}
            alt="User"
            className="rouFnded-full w-full object-center border-8 border-[lightgray] rounded-full"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col lg:mx-auto gap-6 px-0 sm:px-10">

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Abc@gmail.com"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
        <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer">Delete Account</span>
            <span className="cursor-pointer">Sign Out</span>
        </div>
        </div>

      </form>
    </div>
  );
}
