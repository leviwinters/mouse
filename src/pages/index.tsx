import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Button from "@/components/Button";
import { Container } from "@/components/Container";

const Hero = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 0;
  background: var(--color-bg);
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("/hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 40%,
      rgba(0, 0, 0, 0) 80%
    );
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  max-width: var(--width-hero);
  gap: var(--space-xl);

  h1 {
    font-size: var(--font-size-hero);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-tight);
    letter-spacing: -0.015em;
    color: var(--color-text-title);
    margin: 0;
  }

  p {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-light);
    color: var(--color-text);
    margin: 0;
    line-height: var(--line-height-base);
  }

`;

const CTA = styled.div`
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-md);
`;

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Mouse</title>
        <meta name="description" content="Mouse Pro. Moves as fast as you do." />
      </Head>

      <Hero>
        <HeroBg />

        <Container>
          <HeroContent>
            <h1>
              Stay sharp
              <br />
              and in control
              <br />
              <span style={{ whiteSpace: "nowrap" }}> with Mouse Pro</span>
            </h1>

            <p className="body-large">
              Designed for speed and precision, ready for every move.
            </p>

            <CTA>
              <Link href="/products/mouse-pro">
                <Button withArrow>Learn more</Button>
              </Link>
            </CTA>
          </HeroContent>
        </Container>
      </Hero>
    </>
  );
}
