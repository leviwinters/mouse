import styled from "styled-components";

const StyledArrow = styled.span`
  --arrowSpacing: var(--space-sm);
  --arrowHoverTransition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
  --arrowHoverOffset: translateX(3px);
  --arrowTipTransform: none;
  --arrowLineOpacity: 0;

  position: relative;
  top: 1px;
  margin-left: var(--arrowSpacing);
  display: inline-flex;
  align-items: center;

  svg {
    overflow: visible;
    display: block;
    stroke: currentColor;
    stroke-width: 2px;
    fill: none;
  }

  .HoverArrow__linePath {
    opacity: var(--arrowLineOpacity);
    transition: opacity var(--hoverTransition, var(--arrowHoverTransition));
  }

  .HoverArrow__tipPath {
    transform: var(--arrowTipTransform);
    transition: transform var(--hoverTransition, var(--arrowHoverTransition));
  }
`;

export default function HoverArrow() {
  return (
    <StyledArrow>
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path className="HoverArrow__linePath" d="M0 5 h7" />
        <path className="HoverArrow__tipPath" d="M1 1 l4 4 -4 4" />
      </svg>
    </StyledArrow>
  );
}
