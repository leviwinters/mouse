import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: calc(var(--nav-height) + 3rem);
  padding-bottom: var(--space-xxl);
  background: var(--color-bg);
`;
