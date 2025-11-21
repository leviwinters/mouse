import styled from "styled-components";
import HoverArrow from "@/components/HoverArrow";

const StyledButton = styled.button<{ $variant?: "primary" | "secondary" | "muted" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--space-xl);
  min-width: var(--space-sm);
  padding: 0 var(--space-lg);
  line-height: var(--space-xl);
  border-radius: var(--radius-full);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s, opacity 0.2s, box-shadow 0.2s;

  --bg-color: ${(p) =>
    p.$variant === "primary"
      ? "var(--color-primary)"
      : p.$variant === "secondary"
      ? "var(--color-bg)"
      : "var(--color-bg-muted)"};
  --text-color: ${(p) =>
    p.$variant === "primary"
      ? "var(--color-text-inverse)"
      : p.$variant === "secondary"
      ? "var(--color-text)"
      : "var(--color-text-title)"};
  --hover-bg: ${(p) =>
    p.$variant === "primary"
      ? "var(--color-primary-hover)"
      : p.$variant === "secondary"
      ? "var(--color-bg-hover)"
      : "var(--color-bg-muted-hover)"};

  background-color: var(--bg-color);
  color: var(--text-color);

  &:hover {
    background-color: var(--hover-bg);
    box-shadow: none;
  }

  &:focus {
    box-shadow: none;
  }

  &:hover .HoverArrow__linePath {
    --arrowLineOpacity: 1;
  }

  &:hover .HoverArrow__tipPath {
    --arrowTipTransform: var(--arrowHoverOffset);
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "muted";
  withArrow?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  withArrow = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
      {withArrow && <HoverArrow />}
    </StyledButton>
  );
}
