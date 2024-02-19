import Link from "next/link";
import Links from "./links/Links";

const Navbar = async () => {
  return (
    <div className="flex ">
      <Link href="/">Logo</Link>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
