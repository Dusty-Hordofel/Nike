export interface FooterLink {
  href: string;
  label: string;
  ariaLabel: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterLinksProps {
  footerLinks: FooterSection[];
}
