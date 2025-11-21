import { ReactNode } from "react";
import Navbar from "./Navbar";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding-top: var(--nav-height);
`;

const Layout = ({ children }: LayoutProps) => (
  <LayoutContainer>
    <Navbar />
    <Main>{children}</Main>
  </LayoutContainer>
);

export default Layout;
