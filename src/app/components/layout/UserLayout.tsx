import Header from "../shared/header/Header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main className="mt-28">{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} My Website</p>
      </footer>
    </div>
  );
};

export default Layout;
