"use client";
import Button from "../buttons/Button";
import NavLink from "./NavLink";
import Logo from "../../../../../public/images/logo.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const navItems = [
  // { text: "Home", route: "/" },
  { text: "Feature", route: "/about" },
  { text: "How it works", route: "/services" },
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
  return (
    <div className="w-full gap-2 flex justify-between items-center py-4 px-5 md:px-12">
      <NavLink className="pt-2" href="/">
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
        <MdOutlineKeyboardDoubleArrowDown size={35} />
      </div>
    </div>
  );
};

export default NavBar;
