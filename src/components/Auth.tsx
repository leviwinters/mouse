import styled from "styled-components";
import Link from "next/link";
import Card from "./Card";

export const AuthCard = styled(Card)`
  width: 100%;
  max-width: 420px;
  padding: 2.75rem 2.25rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: var(--color-bg-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: var(--font-weight-regular);
  color: var(--color-text-title);
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.01em;
`;

export const AuthForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  align-items: center;
`;

export const AuthInput = styled.input`
  width: 100%;
  max-width: 280px;
  padding: 0.55rem 0.75rem;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: var(--color-bg-gray-light);
  font-size: 0.95rem;
  color: var(--color-text);
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    background: var(--color-bg-secondary);
  }

  &:focus {
    background: var(--color-bg-secondary);
    outline: none;
    box-shadow: none;
  }
`;

export const AuthError = styled.div`
  color: var(--color-error);
  font-size: 0.88rem;
  margin-top: 0.5rem;
  text-align: center;
`;

export const AuthSuccess = styled.div`
  color: var(--color-success);
  font-size: 0.88rem;
  margin-top: 0.5rem;
  text-align: center;
`;

export const AuthFooter = styled.div`
  margin-top: 1.5rem;
  font-size: 0.86rem;
  color: var(--color-text);
  opacity: 0.75;
`;

export const AuthLink = styled(Link)`
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity 0.15s;
  cursor: pointer;

  &:hover {
    opacity: 0.65;
  }
`;
