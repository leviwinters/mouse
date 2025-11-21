import styled from "styled-components";
import { ReactNode, CSSProperties } from "react";

const StyledSection = styled.section`
  width: 100%;
  max-width: var(--width-container);
  margin: 0 auto;
  padding: var(--space-xl) var(--space-gutter);
  background: var(--color-bg);
`;

export interface SectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Section = ({ children, className, style }: SectionProps) => (
  <StyledSection className={className} style={style}>
    {children}
  </StyledSection>
);

export default Section;
