"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = login(formData.email, formData.password);
      if (user) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md border-border shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <LogIn className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Entre com sua conta para agendar consultas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Não tem uma conta?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-muted p-4">
            <p className="text-sm font-medium text-foreground">
              Dados de teste:
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>Admin:</strong> admin@avivet.com / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
