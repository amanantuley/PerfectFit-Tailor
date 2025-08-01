
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
import { User, Settings, LogOut, Languages, Loader2, Moon, Sun } from "lucide-react";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import { LanguageProvider, useLanguage } from "@/contexts/language-context";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";


// InnerLayout component to use the useLanguage hook
function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { t, setLanguage, loading } = useLanguage();
  const { theme, setTheme } = useTheme();

  const getPageTitle = (path: string): string => {
    const allRoutes = [
      ...navItems,
      { href: '/profile', label: 'Profile' },
      { href: '/settings', label: 'Settings' },
    ];
    // Handle dynamic routes
    if (path.startsWith('/customers/')) {
        return t('Customer Details');
    }
    const activeItem = allRoutes.find(item => path === item.href || (item.href !== '/' && path.startsWith(item.href)));
    return activeItem ? t(activeItem.label) : t("Dashboard");
  };
  
  return (
    <SidebarProvider open={!isCollapsed} onOpenChange={(open) => setIsCollapsed(!open)}>
      <Sidebar>
        <SidebarHeader>
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="flex items-center gap-2"
          >
            <Logo />
            <h1 className="text-xl font-semibold text-sidebar-foreground">
              {t('PerfectFit')}
            </h1>
          </motion.div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.filter(item => !item.hidden).map((item: NavItem, index: number) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <SidebarMenuItem>
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
              </motion.div>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-background px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <motion.h2
              key={getPageTitle(pathname)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold">{getPageTitle(pathname)}</motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
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
                      {t('sanjay.tailor@perfectfit.com')}
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
          </motion.div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
         <footer className="border-t bg-background p-4 text-center text-sm text-muted-foreground">
            © 2025 {t('PerfectFit')}. All Rights Reserved.
        </footer>
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
