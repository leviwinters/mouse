import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { PageWrapper } from "@/components/PageWrapper";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

const SuccessCard = styled(Card)`
  max-width: var(--width-cart-empty);
  width: 100%;
  padding: var(--space-xxl) var(--space-xl);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  text-align: center;
`;

const Title = styled.h1`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-title);
  letter-spacing: -0.01em;
  margin: 0 0 var(--space-sm);
`;

const EmptyMessage = styled.p`
  opacity: 0.8;
  font-size: 0.95rem;
  margin: 0;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    const shouldClear = sessionStorage.getItem("orderComplete");
    if (!shouldClear) return;

    // Clear cart after order completion (defer to avoid race conditions)
    clearCart();
    sessionStorage.removeItem("orderComplete");
  }, [clearCart]);

  return (
    <>
      <Head>
        <title>Order Complete | Mouse</title>
        <meta name="description" content="Your order has been completed" />
      </Head>

      <PageWrapper>
        <CenteredContainer>
          <SuccessCard>
            <Title>Your order is complete</Title>
            <EmptyMessage>
              We&apos;re preparing your items. You&apos;ll receive a
              confirmation email soon.
            </EmptyMessage>
            <Link href="/">
              <Button withArrow>Continue shopping</Button>
            </Link>
          </SuccessCard>
        </CenteredContainer>
      </PageWrapper>
    </>
  );
}
