import Head from "next/head";
import Card from "@/components/Card";
import { PageWrapper } from "@/components/PageWrapper";
import styled from "styled-components";

const ContentCard = styled(Card)`
  max-width: var(--width-hero);
  width: 100%;
  padding: var(--space-xl) var(--space-lg);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

const Title = styled.h1`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-title);
  text-align: center;
  letter-spacing: -0.01em;
  margin: 0;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Overline = styled.div`
  font-size: var(--font-size-xs);
  letter-spacing: 0.06em;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  opacity: 0.6;
`;

const Subtitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-title);
  margin: 0;
  letter-spacing: -0.005em;
`;

const Text = styled.p`
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-text);
  margin: 0;
`;

export default function ReturnsPage() {
  return (
    <>
      <Head>
        <title>Returns and Warranty | Mouse</title>
        <meta name="description" content="Returns and warranty information" />
      </Head>

      <PageWrapper>
        <ContentCard>
          <Title>Returns and warranty</Title>

          <Block>
            <Overline>Returns</Overline>
            <Subtitle>14-day free returns</Subtitle>
            <Text>
              Return within 14 days of delivery. Items must be in like-new condition. Contact support and we&apos;ll help you through the process.
            </Text>
          </Block>

          <Block>
            <Overline>Warranty</Overline>
            <Subtitle>2-year warranty</Subtitle>
            <Text>
              Covers manufacturing defects. If you think your product has an issue, reach out and we&apos;ll help.
            </Text>
          </Block>
        </ContentCard>
      </PageWrapper>
    </>
  );
}
