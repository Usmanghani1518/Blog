import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook,BsTwitterX,BsGithub,BsDribbble} from "react-icons/bs"
export default function FooterCom() {
  return (
    <Footer container className=" border border-t-8 border-teal-400">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap dark:text-white font-semibold text-lg sm:text-xl"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-600   via-purple-500 to-pink-500 rounded-lg text-white">
                Usman's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
            <Footer.Title title="About"/>
            <Footer.LinkGroup col>
                <Footer.Link href="/about" target="_blank" rel="noopner noreferrer"> 
                    Ecomerce Project
                </Footer.Link>
                <Footer.Link href="/about" target="_blank" rel="noopner noreferrer"> 
                    About us
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title="Follow  Us"/>
            <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/Usmanghani1518" target="_blank" rel="noopner noreferrer"> 
                    GitHub
                </Footer.Link>
                <Footer.Link href="https://www.linkedin.com/in/usman-gghani-b56431271/" target="_blank" rel="noopner noreferrer"> 
                    LinkedIn
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title="Legal"/>
            <Footer.LinkGroup col>
                <Footer.Link href="#"> 
                    Privacy Plociey
                </Footer.Link>
                <Footer.Link href="#" > 
                    Terms & Conditions
                </Footer.Link>
            </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
            href="#"
            by="Usman's Blog"
            year={new Date().getFullYear()}
            />
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href="#" icon={BsFacebook}/>
                <Footer.Icon href="#" icon={BsTwitterX}/>
                <Footer.Icon href="#" icon={BsGithub}/>
                <Footer.Icon href="#" icon={BsDribbble}/>

            </div>
        </div>
      </div>
    </Footer>
  );
}
