import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs'

const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="footerlogo mt-5">
            <Link
              to="/"
              className=" self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Varun's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-2 sm:grid-cols-3 sm:gap-6">
            <div>
                <FooterTitle title="About" />
                <FooterLinkGroup col>
                    <FooterLink href="https://github.com/vishwakarmaVarun?tab=repositories" target="_blank" rel="noopener noreferrer">
                        100JS Projects
                    </FooterLink>
                    <FooterLink href="/about" target="_blank" rel="noopener noreferrer">
                        Varun's Blog
                    </FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <FooterTitle title="Follow Us" />
                <FooterLinkGroup col>
                    <FooterLink href="https://github.com/vishwakarmaVarun" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </FooterLink>
                    <FooterLink href="#">
                        Discord
                    </FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <FooterTitle title="Legal" />
                <FooterLinkGroup col>
                    <FooterLink href="#">
                        Privary Policy
                    </FooterLink>
                    <FooterLink href="#">
                        Terms & Conditions
                    </FooterLink>
                </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="#" by="Varun's Blog" year={new Date().getFullYear()} />
            <div className="flex gap-6 sm:mt-3 mt-4 sm:justify-center">
                <FooterIcon href="#" icon={BsFacebook} />
                <FooterIcon href="#" icon={BsInstagram} />
                <FooterIcon href="#" icon={BsTwitter} />
                <FooterIcon href="https://github.com/vishwakarmaVarun" icon={BsGithub} />
            </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
