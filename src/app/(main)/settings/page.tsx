
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/language-context";

export default function SettingsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
       <Card>
        <CardHeader>
          <CardTitle>{t('Store Details')}</CardTitle>
          <CardDescription>{t("Update your shop's information.")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">{t('Store Name')}</Label>
            <Input id="store-name" placeholder={t('Your Store Name')} defaultValue="PerfectFit-Tailors Boutique"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-address">{t('Address')}</Label>
            <Input id="store-address" placeholder="123 Main St, Anytown" defaultValue="123 Fashion Street, Mumbai" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('Notifications')}</CardTitle>
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
