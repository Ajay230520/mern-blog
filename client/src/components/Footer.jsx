import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import {BsFacebook,BsInstagram,BsTwitterX,BsLinkedin,BsGithub} from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className=" w-full border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-col-1">
          <div className="mb-6">
            <Link
              to="/"
              className=" self-center whitespace-nowrap mb-6 text-lg sm:text-xl"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  rounded-lg text-white">
                Ajay's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid  grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6 ">
            <div>
              <Footer.Title title="ABOUT" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://ajay230520.github.io/nike/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nike Website
                </Footer.Link>
                <Footer.Link href="/about" rel="noopener noreferrer">
                  Ajay's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="FOLLOW US" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Ajay230520"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/ajay-muniya-7b2b56251/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkdin
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="LEGAL" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between flex-wrap
        ">
          <Footer.Copyright
            href="#"
            by="Ajay's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 mt-4 sm:mt-0 flex-wrap  ">
            <Footer.Icon href="https://github.com/Ajay230520" icon={BsGithub}/>
            <Footer.Icon href="https://www.linkedin.com/in/ajay-muniya-7b2b56251/" icon={BsLinkedin}/>
            <Footer.Icon href="#" icon={BsFacebook}/>
            <Footer.Icon href="#" icon={BsTwitterX}/>
            <Footer.Icon href="#" icon={BsInstagram}/>
            
            

          </div>
        </div>
      </div>
    </Footer>
  );
}
