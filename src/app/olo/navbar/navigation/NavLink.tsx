import Link from "next/link";

type NavLinkProps = {
  name: string;
  submenu?: boolean;
};
const NavLink = ({ name, submenu }: NavLinkProps) => {
  return (
    <Link href="/" className="relative">
      <span className="py-3   after:content-[''] after:absolute after:w-0 after:hover:w-full after:h-[2px] after:bg-black-200 after:-bottom-[6px] after:left-0 font-medium">
        {name}
      </span>
    </Link>
  );
};

export default NavLink;
