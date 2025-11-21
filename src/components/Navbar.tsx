import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/lib/cognito";

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  background: var(--color-primary);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-md) 0;
  box-shadow: var(--shadow);
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: var(--width-container);
  padding: 0 var(--space-xl);
  margin: 0 auto;
`;

const Logo = styled.img`
  height: var(--space-xl);
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: var(--space-lg);

  a {
    text-decoration: none;
    color: var(--color-text-title);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    font-family: var(--font-family);
    padding: var(--space-sm) var(--space-md);
    letter-spacing: -0.01em;
    transition: opacity 0.2s ease;
    display: flex;
    align-items: center;
  }
  a:hover {
    opacity: var(--opacity-nav-hover);
  }
`;

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateAuth = () => setIsSignedIn(!!getCurrentUser());
    
    // Defer to avoid hydration mismatch
    Promise.resolve().then(() => {
      updateAuth();
      setMounted(true);
    });

    router.events.on("routeChangeComplete", updateAuth);
    return () => router.events.off("routeChangeComplete", updateAuth);
  }, [router.events]);

  return (
    <Header>
      <Inner>
        <Link href="/">
          <Logo src="/logo.svg" alt="Mouse Logo" />
        </Link>

        <NavLinks>
          <Link href="/products/mouse-pro">Shop</Link>
          {mounted && isSignedIn ? (
            <Link href="/account">Account</Link>
          ) : (
            <Link href="/auth/login">Sign in</Link>
          )}
          <Link href="/cart">Cart</Link>
        </NavLinks>
      </Inner>
    </Header>
  );
};

export default Navbar;
