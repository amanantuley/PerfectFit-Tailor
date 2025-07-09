"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { navItems, type NavItem } from "@/lib/nav-items";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, Languages, Loader2 } from "lucide-react";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import { LanguageProvider, useLanguage } from "@/contexts/language-context";

// InnerLayout component to use the useLanguage hook
function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { t, setLanguage, loading } = useLanguage();

  const getPageTitle = (path: string): string => {
    const allRoutes = [
      ...navItems,
      { href: '/profile', label: 'Profile' },
      { href: '/settings', label: 'Settings' },
    ];
    const activeItem = allRoutes.find(item => path === item.href || (item.href !== '/' && path.startsWith(item.href)));
    return activeItem ? t(activeItem.label) : t("Dashboard");
  };
  
  return (
    <SidebarProvider open={!isCollapsed} onOpenChange={(open) => setIsCollapsed(!open)}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="text-primary-foreground size-8" />
            <h1 className="text-xl font-semibold text-sidebar-foreground">{t('PerfectFit-Tailors')}</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item: NavItem) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                  tooltip={{ children: t(item.label) }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{t(item.label)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-background px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-xl font-semibold">{getPageTitle(pathname)}</h2>
          </div>
          <div className="flex items-center gap-2">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>PF</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{t('Sanjay Tailor')}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {t('sanjay.tailor@perfectfit-tailors.com')}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>{t('Profile')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t('Settings')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('Log out')}</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <ChatbotWidget />
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <InnerLayout>{children}</InnerLayout>
    </LanguageProvider>
  )
}
