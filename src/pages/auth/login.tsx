import Head from "next/head";
import Button from "@/components/Button";
import { PageWrapper } from "@/components/PageWrapper";
import {
  AuthCard,
  AuthTitle,
  AuthForm,
  AuthInput,
  AuthError,
  AuthFooter,
  AuthLink,
} from "@/components/Auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "@/lib/cognito";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form.email, form.password);
      router.push("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | Mouse</title>
        <meta name="description" content="Sign in to your account" />
      </Head>
      <PageWrapper>
        <AuthCard>
          <AuthTitle>Sign in</AuthTitle>

          <AuthForm onSubmit={handleLogin}>
            <AuthInput
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <AuthInput
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              disabled={loading}
              withArrow
              style={{ marginTop: "var(--space-sm)" }}
            >
              Sign in
            </Button>
          </AuthForm>

          {error && <AuthError>{error}</AuthError>}

          <AuthFooter>
            Don&apos;t have an account?{" "}
            <AuthLink href="/auth/signup">Sign up</AuthLink>
          </AuthFooter>
        </AuthCard>
      </PageWrapper>
    </>
  );
}
