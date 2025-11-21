import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Button from "@/components/Button";
import { Divider } from "@/components/Divider";
import Section from "@/components/Section";
import Image from "next/image";
import { useState } from "react";
import { GetServerSideProps } from "next";
import pool from "@/lib/db";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

import {
  Weight,
  Gauge,
  Zap,
  BatteryCharging,
  MousePointerClick,
} from "lucide-react";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
`;

const ProductLayout = styled(Section)`
  max-width: var(--width-container);
  margin: 0 auto;
  padding-top: var(--space-xxl);
  padding-bottom: var(--space-xxl);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xxl);
  align-items: start;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled(motion.div)`
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  align-items: center;
`;

const MainImage = styled.div`
  width: 100%;
  max-width: 360px;
  height: 360px;
  border-radius: var(--radius-md);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  @media (max-width: 820px) {
    height: 300px;
  }
`;

const Thumbs = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

const Thumb = styled(motion.button)<{ $active?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  border: 1px solid
    ${(p) => (p.$active ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0.08)")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${(p) => (p.$active ? 1 : 0.55)};
  transition: opacity var(--hoverTransition), border-color 140ms ease;
  overflow: hidden;
  position: relative;

  &:hover {
    opacity: 0.8;
    border-color: rgba(0, 0, 0, 0.15);
  }
`;

const Info = styled(motion.div)`
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: var(--font-weight-regular);
  color: var(--color-text-title);
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.1;
`;

const Price = styled.div`
  font-size: 1.05rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-title);
  opacity: 0.95;
`;

const SectionTitle = styled.div`
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  opacity: 0.6;
`;


const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);

  p {
    margin: 0;
    font-size: 0.95rem;
    color: var(--color-text);
    line-height: 1.55;
    opacity: 0.9;
  }
`;

const SpecsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

const SpecRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

const SpecText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const SpecLabel = styled.div`
  font-size: 0.82rem;
  opacity: 0.55;
`;

const SpecValue = styled.div`
  font-size: 0.95rem;
  color: var(--color-text);
`;

const IncludedList = styled.ul`
  margin: 0;
  padding-left: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);

  li {
    font-size: 0.9rem;
    color: var(--color-text);
  }
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  font-size: 0.85rem;
  color: var(--color-text);
  opacity: 0.65;
`;

const ReturnLink = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.85rem;

  &:hover {
    opacity: 0.65;
  }
`;

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string[];
  createdAt: Date;
}

interface ProductPageProps {
  product: Product | null;
}

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function ProductPage({ product }: ProductPageProps) {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState(0);
  const [adding, setAdding] = useState(false);

  const gallery = product?.imageUrl || [];

  if (!product) {
    return (
      <Wrapper>
        <ProductLayout>
          <p>Product not found</p>
        </ProductLayout>
      </Wrapper>
    );
  }

  const descriptionLines = product.description
    .split("\n")
    .filter((line) => line.trim());

  const handleAdd = async () => {
    if (!product || adding) return;

    setAdding(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    addToCart(
      {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        price: Number(product.price),
        imageUrl: gallery[0] || "",
      },
      1
    );

    setAdding(false);
  };

  return (
    <Wrapper>
      <Head>
        <title>{product.name} | Mouse</title>
        <meta name="description" content={product.description.split("\n")[0]} />
      </Head>

      <ProductLayout>
        <Grid>
          <ImageCard
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <MainImage>
              <AnimatePresence mode="wait">
                {gallery[selected] && (
                  <motion.div
                    key={gallery[selected]}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src={gallery[selected]}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </MainImage>

            <Thumbs>
              {gallery.map((url, i) => (
                <Thumb
                  key={url}
                  $active={i === selected}
                  onClick={() => setSelected(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                >
                  <Image
                    src={url}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Thumb>
              ))}
            </Thumbs>
          </ImageCard>

          <Info
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
          >
            <Title>{product.name}</Title>
            <Price>${Number(product.price).toFixed(2)}</Price>

            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.015 }}
              style={{ alignSelf: "flex-start" }}
            >
              <Button
                onClick={handleAdd}
                variant="primary"
                style={{ marginTop: "0.15rem" }}
                disabled={adding}
              >
                {adding ? <Spinner /> : "Add to cart"}
              </Button>
            </motion.div>
            <Divider />

            <SectionTitle>Overview</SectionTitle>

            <Description>
              {descriptionLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </Description>

            <Divider />

            <SectionTitle>Specifications</SectionTitle>

            <SpecsGrid>
              <SpecRow>
                <Weight size={20} strokeWidth={1.8} />
                <SpecText>
                  <SpecLabel>Weight</SpecLabel>
                  <SpecValue>59 g</SpecValue>
                </SpecText>
              </SpecRow>

              <SpecRow>
                <Gauge size={20} strokeWidth={1.8} />
                <SpecText>
                  <SpecLabel>Polling rate</SpecLabel>
                  <SpecValue>1000 Hz</SpecValue>
                </SpecText>
              </SpecRow>

              <SpecRow>
                <Zap size={20} strokeWidth={1.8} />
                <SpecText>
                  <SpecLabel>Charging</SpecLabel>
                  <SpecValue>USB-C</SpecValue>
                </SpecText>
              </SpecRow>

              <SpecRow>
                <BatteryCharging size={20} strokeWidth={1.8} />
                <SpecText>
                  <SpecLabel>Wireless runtime</SpecLabel>
                  <SpecValue>Up to 70 hours</SpecValue>
                </SpecText>
              </SpecRow>

              <SpecRow>
                <MousePointerClick size={20} strokeWidth={1.8} />
                <SpecText>
                  <SpecLabel>Click response</SpecLabel>
                  <SpecValue>Instant</SpecValue>
                </SpecText>
              </SpecRow>
            </SpecsGrid>

            <Divider />

            <SectionTitle>What&apos;s included</SectionTitle>

            <IncludedList>
              <li>Mouse Pro</li>
              <li>USB-C charging cable</li>
              <li>Quick start card</li>
            </IncludedList>

            <Meta>
              <ReturnLink href="/returns">Return policy</ReturnLink>
            </Meta>
          </Info>
        </Grid>
      </ProductLayout>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  ctx
) => {
  const slug = ctx.params?.slug as string;

  if (!slug) {
    return { props: { product: null } };
  }

  try {
    const result = await pool.query('SELECT * FROM "Product" WHERE slug = $1', [
      slug,
    ]);

    if (!result.rows.length) {
      return { props: { product: null } };
    }

    const product = result.rows[0];

    return {
      props: {
        product: {
          ...product,
          createdAt:
            product.createdat?.toISOString() ?? new Date().toISOString(),
        },
      },
    };
  } catch (error) {
    console.error("Product fetch failed", error);
    return { props: { product: null } };
  }
};
