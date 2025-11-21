import { useState } from "react";
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
import { signUp } from "@/lib/cognito";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signUp(form.name, form.email, form.password);

      router.push({
        pathname: "/auth/confirm",
        query: { email: form.email },
      });
    } catch {
      setError("Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | Mouse</title>
        <meta name="description" content="Create a new account" />
      </Head>
      <PageWrapper>
        <AuthCard>
          <AuthTitle>Create your account</AuthTitle>

          <AuthForm onSubmit={handleSignup}>
            <AuthInput
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />

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
              autoComplete="new-password"
            />

            <Button
              type="submit"
              disabled={loading}
              withArrow
              style={{ marginTop: "var(--space-sm)" }}
            >
              Sign up
            </Button>
          </AuthForm>

          {error && <AuthError>{error}</AuthError>}

          <AuthFooter>
            Already have an account?{" "}
            <AuthLink href="/auth/login">Sign in</AuthLink>
          </AuthFooter>
        </AuthCard>
      </PageWrapper>
    </>
  );
}
