import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

import {
  Container,
  Nav,
  Navbar,
  NavbarCollapse,
  NavLink,
  NavbarBrand,
  NavbarToggle,
} from "react-bootstrap";

export const metadata: Metadata = {
  title: "Server Dashboard",
  description: "Monitor Your Server Status Here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
          <Container>
            <NavbarBrand href="/">Server Monitoring</NavbarBrand>
            <NavbarToggle aria-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink href="/">Dashboard</NavLink>
                <NavLink href="#">Events</NavLink>
                <NavLink href="#">Options</NavLink>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>
        {children}
      </body>
    </html>
  );
}
