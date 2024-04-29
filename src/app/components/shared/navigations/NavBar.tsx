"use client";
import Button from "../buttons/Button";
import NavLink from "./NavLink";
import Logo from "../../../../../public/images/Logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useState } from "react";

const navItems = [
  // { text: "Home", route: "/" },
  { text: " Home", route: "/" },
  { text: "FAQs", route: "/faq" },
];

// Create a component to render the navigation items
const Navigation = () => (
  <nav className="flex justify-center gap-16">
    {navItems.map(({ text, route }, index) => (
      <div key={index}>
        <div>
          <NavLink href={route}>{text}</NavLink>
        </div>
      </div>
    ))}
  </nav>
);

const NavBar = () => {
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="w-full gap-2 fixed top-0 left-0 bg-white z-[100] flex justify-between items-center py-4 px-5 md:px-12 ">
      <NavLink href="/">
        <Image src={Logo} alt="logo" className="h-14 w-auto" />
      </NavLink>

      <div className="min-[820px]:flex hidden items-center">
        <Navigation />
      </div>

      <div className="min-[820px]:flex hidden gap-8 items-center">
        <NavLink className="pt-2" href="/sign-in">
          Sign In
        </NavLink>
        <Button
          size="large"
          variant="primary"
          showIcon={false}
          onClick={() => router.push("/sign-up")}
        >
          Get Started
        </Button>
      </div>

      <div className="block min-[820px]:hidden text-jsPrimary100">
        {!navOpen ? (
          <MdOutlineKeyboardDoubleArrowDown
            onClick={() => setNavOpen(true)}
            size={35}
          />
        ) : (
          <MdOutlineKeyboardDoubleArrowUp
            size={35}
            onClick={() => setNavOpen(false)}
          />
        )}
      </div>
      {navOpen && (
        <div
          className={`absolute left-0 w-full mt-40 ${
            navOpen ? "min-h-10" : "h-0"
          }`}
        >
          <div className="bg-white pt-8">
            <div className="min-[820px] items-center">
              <Navigation />
            </div>

            <div className="pt-8 min-[820px] justify-center flex gap-8 items-center">
              <NavLink className="pt-2" href="/sign-in">
                Sign In
              </NavLink>
              <Button
                size="large"
                variant="primary"
                showIcon={false}
                onClick={() => router.push("/sign-up")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
