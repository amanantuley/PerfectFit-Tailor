
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('328 81% 56%');

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const color = getComputedStyle(root).getPropertyValue('--primary').trim();
    setPrimaryColor(color);
  }, []);

  const handlePrimaryColorChange = (newColor: string) => {
    setPrimaryColor(newColor);
    const root = document.documentElement;
    root.style.setProperty('--primary', newColor);
    root.style.setProperty('--ring', newColor);
  };
  
  const colorPresets = [
    { name: 'Default Pink', value: '328 81% 56%' },
    { name: 'Sky Blue', value: '207 90% 54%' },
    { name: 'Goldenrod', value: '45 93% 47%' },
    { name: 'Emerald', value: '142 76% 36%' },
    { name: 'Crimson', value: '348 83% 47%' },
  ];

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
       <Card>
        <CardHeader>
          <CardTitle className="text-rainbow-animation">{t('Store Details')}</CardTitle>
          <CardDescription>{t("Update your shop's information.")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">{t('Store Name')}</Label>
            <Input id="store-name" placeholder={t('Your Store Name')} defaultValue="PerfectFit"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-address">{t('Address')}</Label>
            <Input id="store-address" placeholder="123 Main St, Anytown" defaultValue="123 Fashion Street, Mumbai" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-rainbow-animation">{t('Theme')}</CardTitle>
          <CardDescription>{t('Customize the look and feel of your app.')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('Appearance')}</Label>
            <div className="flex gap-2">
              <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>
                <Sun className="mr-2" />
                {t('Light')}
              </Button>
              <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>
                <Moon className="mr-2" />
                {t('Dark')}
              </Button>
            </div>
          </div>
           <div className="space-y-2">
            <Label>{t('Primary Color')}</Label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map(color => (
                <Button key={color.value} variant="outline" size="icon" onClick={() => handlePrimaryColorChange(color.value)} className="h-8 w-8 rounded-full">
                  <div className="h-6 w-6 rounded-full" style={{ backgroundColor: `hsl(${color.value})`}}/>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-rainbow-animation">{t('Notifications')}</CardTitle>
          <CardDescription>
            {t('Manage how you receive notifications.')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="email-notifications" defaultChecked />
            <Label htmlFor="email-notifications">{t('Email notifications for new orders')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sms-notifications" />
            <Label htmlFor="sms-notifications">{t('SMS notifications for ready orders')}</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button>{t('Save Preferences')}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
