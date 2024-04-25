import Header from "../shared/header/Header";
import { ReactNode } from "react";
import NavBar from "../shared/navigations/NavBar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <NavBar />
      <main className="">{children}</main>
      <footer className="bg-gray-800 text-gray-300 py-4">
    <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
            <div className="w-full md:w-1/2 text-center md:text-left">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-right mt-4 md:mt-0">
                <ul className="flex justify-center md:justify-end">
                    <li className="mr-4"><a href="#" className="hover:text-white">Home</a></li>
                    <li className="mr-4"><a href="#" className="hover:text-white">About</a></li>
                    <li className="mr-4"><a href="#" className="hover:text-white">Services</a></li>
                    <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>

    </div>
  );
};

export default Layout;
