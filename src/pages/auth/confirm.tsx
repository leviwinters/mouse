import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { PageWrapper } from "@/components/PageWrapper";
import {
  AuthCard,
  AuthTitle,
  AuthForm,
  AuthInput,
  AuthError,
  AuthSuccess,
} from "@/components/Auth";
import { confirmSignUp } from "@/lib/cognito";

export default function ConfirmPage() {
  const router = useRouter();
  const emailFromQuery =
    typeof router.query.email === "string" ? router.query.email : "";

  const [form, setForm] = useState({ email: emailFromQuery, code: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await confirmSignUp(form.email, form.code);
      setSuccess("Account confirmed");
      setTimeout(() => router.push("/auth/login"), 1200);
    } catch {
      setError("Invalid confirmation code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Confirm Account | Mouse</title>
        <meta name="description" content="Confirm your account" />
      </Head>
      <PageWrapper>
        <AuthCard>
          <AuthTitle>Confirm your account</AuthTitle>

          <AuthForm onSubmit={handleConfirm}>
            <AuthInput
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <AuthInput
              name="code"
              type="text"
              placeholder="Confirmation code"
              value={form.code}
              onChange={handleChange}
              required
              autoComplete="one-time-code"
            />

            <Button
              type="submit"
              disabled={loading}
              withArrow
              style={{
                width: "100%",
                maxWidth: "280px",
                marginTop: "0.5rem",
              }}
            >
              Confirm
            </Button>
          </AuthForm>

          {error && <AuthError>{error}</AuthError>}
          {success && <AuthSuccess>{success}</AuthSuccess>}
        </AuthCard>
      </PageWrapper>
    </>
  );
}
