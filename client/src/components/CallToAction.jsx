import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
  return (
    <div className="flex  flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center fle flex-col">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">Checkout these resources with 100 Javascript Projects</p>
        <Button
          className="mx-auto mt-5 rounded-tl-xl rounded-bl-none "
          gradientDuoTone={"purpleToPink"}>
          <a href="https://www.100jsprojects.com" target="_blank" rel="noopener noreferrer">100 Javascript projects</a>
        </Button>
      </div>

      <div className="p-7 flex-1">
        <img
          src="https://www.tutorialrepublic.com/lib/images/javascript-illustration.png"
          alt=""
        />
      </div>
    </div>
  );
}
