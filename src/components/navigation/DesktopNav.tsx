
import { NavLink } from "./NavLink";

export const DesktopNav = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      <NavLink to="/retreats">Retreats</NavLink>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/community-teaser">Community</NavLink>
      <NavLink to="/about-us">About</NavLink>
      <NavLink to="/contact-us">Contact</NavLink>
    </nav>
  );
};
