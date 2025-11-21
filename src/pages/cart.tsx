import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { Divider } from "@/components/Divider";
import { Container } from "@/components/Container";
import { PageWrapper } from "@/components/PageWrapper";
import { useCart } from "@/context/CartContext";
import { getCurrentUser } from "@/lib/cognito";

const Wrapper = styled.section`
  width: 100%;
  background: var(--color-bg);
  padding-top: var(--space-xxl);
  padding-bottom: var(--space-xxl);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr var(--width-sidebar-cart);
  gap: var(--space-xxl);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;


const Title = styled.h1`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-title);
  letter-spacing: -0.01em;
  margin: 0;
`;


const EmptyCard = styled(Card)`
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

const EmptyMessage = styled.div`
  font-size: var(--font-size-base);
  color: var(--color-text);
  opacity: 0.8;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

const CartItem = styled(Card)`
  background: var(--color-bg-secondary);
  padding: var(--space-xl) var(--space-xl);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  display: grid;
  grid-template-columns: var(--width-cart-image) 1fr auto;
  gap: var(--space-lg);
  align-items: center;
`;

const ItemImage = styled.img`
  width: var(--width-cart-image);
  height: var(--width-cart-image);
  object-fit: cover;
  border-radius: var(--radius-sm);
  background: var(--color-bg-gray);
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ItemName = styled.div`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-title);
`;

const ItemPrice = styled.div`
  font-size: var(--font-size-base);
  opacity: 0.75;
  color: var(--color-text);
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-end;
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const QtyButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  padding: 0.2rem 0.45rem;
  color: var(--color-text);
  cursor: pointer;
  opacity: 0.85;

  &:hover {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

const QtyDisplay = styled.div`
  width: 22px;
  text-align: center;
  font-size: 0.95rem;
`;

const Summary = styled(Card)`
  background: var(--color-bg-secondary);
  padding: var(--space-xl);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  height: fit-content;
  position: sticky;
  top: calc(var(--nav-height) + var(--space-md));
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

const SummaryTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: var(--font-weight-medium);
  margin: 0 0 1rem 0;
  color: var(--color-text-title);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.9;
`;

const TotalRow = styled(Row)`
  margin-top: var(--space-sm);
  padding-top: var(--space-sm);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
`;

export default function CartPage() {
  const {
    cart,
    cartLoaded,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  if (!cartLoaded) return null;

  if (cart.length === 0) {
    return (
      <>
        <Head>
          <title>Cart | Mouse</title>
          <meta name="description" content="Your shopping cart" />
        </Head>
        <PageWrapper>
          <EmptyCard>
            <Title>Your cart is empty</Title>
            <EmptyMessage>Add an item to get started.</EmptyMessage>
            <Link href="/products/mouse-pro">
              <Button withArrow variant="primary">
                Shop now
              </Button>
            </Link>
          </EmptyCard>
        </PageWrapper>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Cart ({totalItems}) | Mouse</title>
        <meta name="description" content="Your shopping cart" />
      </Head>

      <Wrapper>
        <Container>
          <Title>Your cart</Title>

          <Grid>
            <ItemsList>
              {cart.map((item) => (
                <CartItem key={item.productId}>
                  <ItemImage src={item.imageUrl} alt={item.productName} />

                  <ItemInfo>
                    <ItemName>{item.productName}</ItemName>
                    <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                  </ItemInfo>

                  <Controls>
                    <QtyRow>
                      <QtyButton
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        –
                      </QtyButton>

                      <QtyDisplay>{item.quantity}</QtyDisplay>

                      <QtyButton
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        +
                      </QtyButton>
                    </QtyRow>
                  </Controls>
                </CartItem>
              ))}
            </ItemsList>

            <Summary>
              <SummaryTitle>Order summary</SummaryTitle>

              <Row>
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </Row>

              <Row>
                <span>Shipping</span>
                <span>Free</span>
              </Row>

              <Divider />

              <TotalRow>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </TotalRow>

              <motion.div
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: "100%" }}
              >
                <Button
                  variant="primary"
                  style={{ marginTop: "1.2rem", width: "100%" }}
                  disabled={checkoutLoading}
                  onClick={async () => {
                  setCheckoutLoading(true);
                  try {
                    const user = getCurrentUser();
                    const userId = user ? user.getUsername() : null;
                    const res = await fetch("/api/checkout", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        userId,
                        items: cart.map((item) => ({
                          productId: item.productId,
                          quantity: item.quantity,
                          productName: item.productName,
                        })),
                      }),
                    });

                    const data = await res.json();
                    if (data.url) {
                      window.location.href = data.url;
                    }
                  } catch (error) {
                    console.error("Checkout failed", error);
                    setCheckoutLoading(false);
                  }
                }}
              >
                Check out
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: "100%" }}
              >
                <Button
                  variant="muted"
                  style={{ width: "100%" }}
                  onClick={clearCart}
                >
                  Empty cart
                </Button>
              </motion.div>
            </Summary>
          </Grid>
        </Container>
      </Wrapper>
    </>
  );
}
