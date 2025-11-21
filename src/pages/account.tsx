import { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { signOut } from "@/lib/cognito";
import { useOrders } from "@/lib/queries";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: var(--color-bg);
  padding-top: var(--space-xxl);
  padding-bottom: var(--space-xxl);
  display: flex;
  justify-content: center;
`;

const Shell = styled.div`
  width: 100%;
  max-width: var(--width-container);
  display: grid;
  grid-template-columns: var(--width-sidebar-account) 1fr;
  gap: var(--space-lg);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
`;

const Sidebar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: var(--space-xxl);
  padding-right: var(--space-md);

  @media (max-width: 820px) {
    padding-right: 0;
  }
`;

const SidebarGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

const Label = styled.div`
  font-size: 0.85rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  opacity: 0.6;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  text-align: left;
  font-size: var(--font-size-base);
  padding: 0.25rem 0;
  cursor: pointer;
  color: ${(p) => (p.$active ? "var(--color-text-title)" : "var(--color-text)")};
  font-weight: ${(p) =>
    p.$active ? "var(--font-weight-medium)" : "var(--font-weight-regular)"};
  opacity: ${(p) => (p.$active ? 1 : 0.72)};
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const PageTitle = styled.h1`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-title);
  margin: 0;
  letter-spacing: -0.01em;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

const OrderCard = styled(Card)`
  padding: var(--space-xl) var(--space-xl);
  border-radius: var(--radius-md);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
`;

const OrderName = styled.div`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-title);
`;

const OrderMeta = styled.div`
  font-size: var(--font-size-base);
  color: var(--color-text);
  opacity: 0.65;
`;

const OrderTotal = styled.div`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-title);
`;

const SidebarSignOutContainer = styled.div`
  margin-top: var(--space-xxl);
  padding-top: var(--space-lg);
`;

const NoOrdersText = styled.div`
  font-size: var(--font-size-base);
  color: var(--color-text);
  opacity: 0.6;
  padding-top: var(--space-sm);
`;

type OrderItemType = {
  productName?: string;
  [key: string]: string | number | undefined;
};

type Order = {
  id: string | number;
  created_at?: string;
  total?: number | string;
  items?: OrderItemType[] | string;
};

function getFirstItemName(items: Order["items"]): string {
  try {
    const arr =
      typeof items === "string" ? JSON.parse(items) : items;
    if (Array.isArray(arr) && arr[0]?.productName) {
      return arr[0].productName;
    }
  } catch {
    // Fall through to default
  }
  return "Product";
}

export default function AccountPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function getUserId() {
      try {
        const { getCurrentUser } = await import("@/lib/cognito");
        const user = getCurrentUser();
        setUserId(user ? user.getUsername() : null);
      } catch (error) {
        console.error("Failed to get current user", error);
      }
    }
    getUserId();
  }, []);

  const { data: orders = [], isLoading, error } = useOrders(userId);

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Account | Mouse</title>
        <meta name="description" content="Your account and order history" />
      </Head>
      <Wrapper>
        <Shell>
        <Sidebar>
          <SidebarGroup>
            <Label>Account details</Label>
            <Nav>
              <NavItem $active>Order history</NavItem>
              <NavItem>Profile info</NavItem>
              <NavItem>Saved addresses</NavItem>
              <NavItem>Payment methods</NavItem>
              <NavItem>Security settings</NavItem>
              <NavItem>Email notifications</NavItem>
            </Nav>
          </SidebarGroup>

          <SidebarFooter>
            <SidebarSignOutContainer>
              <Button withArrow variant="muted" onClick={handleSignOut}>
                Sign out
              </Button>
            </SidebarSignOutContainer>
          </SidebarFooter>
        </Sidebar>

        <Main>
          <PageTitle>Your orders</PageTitle>

          {isLoading ? (
            <NoOrdersText>Loading orders...</NoOrdersText>
          ) : error ? (
            <NoOrdersText>Failed to load orders. Please try again.</NoOrdersText>
          ) : orders.length === 0 ? (
            <NoOrdersText>No orders found.</NoOrdersText>
          ) : (
            <OrdersList>
              {orders.map((order) => {
                const firstItemName = getFirstItemName(order.items);
                return (
                  <OrderCard key={order.id}>
                    <OrderLeft>
                      <OrderName>{firstItemName}</OrderName>
                      <OrderMeta>Order #{order.id}</OrderMeta>
                      <OrderMeta>
                        {order.created_at
                          ? new Date(order.created_at).toLocaleDateString()
                          : "-"}
                      </OrderMeta>
                    </OrderLeft>
                    <OrderTotal>${Number(order.total || 0).toFixed(2)}</OrderTotal>
                  </OrderCard>
                );
              })}
            </OrdersList>
          )}
        </Main>
      </Shell>
    </Wrapper>
    </>
  );
}
