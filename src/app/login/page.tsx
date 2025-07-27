"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons/logo';
import { LanguageProvider, useLanguage } from '@/contexts/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, Loader2 } from 'lucide-react';

function LoginForm() {
  const { t, setLanguage, loading } = useLanguage();

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <div className="flex justify-center mb-4 items-center gap-2">
            <Logo />
             <h1 className="text-2xl font-semibold text-foreground">
              PerfectFit-Tailors
            </h1>
        </div>
        <CardTitle className="text-2xl text-center">{t('Login to PerfectFit-Tailors')}</CardTitle>
        <CardDescription className="text-center">
          {t('Enter your credentials to access your dashboard.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('Email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              defaultValue="tailor@perfectfit-tailors.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('Password')}</Label>
            <Input id="password" type="password" required defaultValue="password" />
          </div>
          <Button asChild className="w-full">
            <Link href="/">{t('Login')}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


export default function LoginPage() {
  return (
    <LanguageProvider>
        <div className="relative flex items-center justify-center min-h-screen bg-background p-4">
          <div className="absolute top-4 right-4">
            <LanguageSwitcher />
          </div>
          <LoginForm />
        </div>
    </LanguageProvider>
  );
}

function LanguageSwitcher() {
    const { t, setLanguage, loading } = useLanguage();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Languages className="h-5 w-5" />}
                    <span className="sr-only">{t('Change language')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setLanguage('en')}>{t('English')}</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage('hi')}>{t('Hindi')}</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage('mr')}>{t('Marathi')}</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setLanguage('ur')}>{t('Urdu')}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
