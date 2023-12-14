import Link from "next/link";
// Error: React.Children.only expected to receive a single React element child. Link had space {} and it was considered to be another chidl
const Header = ({ currentUser }) => {
    console.log('currentUser in Header', currentUser)
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    // currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    // currentUser && { label: "My Orders", href: "/orders" },
    // currentUser && { label: "Sign Out", href: "/" },
  ]
  console.log('links to be shown', links)
  const linksToBeShown = links.filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href} className="nav-link">
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/" className="navbar-brand">
        Ticketix
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{linksToBeShown}</ul>
      </div>
    </nav>
  );
};

export default Header;