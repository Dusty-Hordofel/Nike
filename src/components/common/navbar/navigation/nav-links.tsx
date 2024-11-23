import NavLink from "./nav-link";

interface SubLink {
  Head: string;
  sublink: { name: string; link: string }[];
}

interface NavLinksProps {
  menuLinks: { name: string; sublinks?: SubLink[]; submenu: boolean }[];
}

const NavLinks = ({ menuLinks }: NavLinksProps) => {
  return (
    <ul
      className="flex justify-center items-center menu  flex-wrap min-[960px]:w-[calc(100%-426px)] max-w-[1255px] mx-auto bg-white"
      role="menubar"
      data-menu="DesktopMenu"
    >
      {menuLinks.map((link: any, index: any) => {
        const { name, sublinks, submenu } = link;
        return (
          <>
            <li
              className="h-16 px-3 flex items-center justify-center"
              key={index}
            >
              <NavLink name={name} submenu={submenu} />
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default NavLinks;
