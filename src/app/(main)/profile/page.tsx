
"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/language-context";

export default function ProfilePage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{t('Profile')}</CardTitle>
          <CardDescription>{t('Manage your personal and contact information.')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <Button>{t('Change Photo')}</Button>
              <p className="text-xs text-muted-foreground">{t('JPG, PNG, GIF up to 5MB.')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t('Full Name')}</Label>
              <Input id="name" defaultValue="Sanjay Tailor" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">{t('Phone Number')}</Label>
              <Input id="phone" type="tel" defaultValue="9876543210" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{t('Email')}</Label>
            <Input id="email" type="email" defaultValue="sanjay.tailor@perfectfit-tailors.com" readOnly />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">{t('Address')}</Label>
            <Textarea id="address" defaultValue="123 Fashion Street, Mumbai, Maharashtra 400001" placeholder={t('Your shop or contact address')} />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>{t('Save Changes')}</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('Professional Details')}</CardTitle>
          <CardDescription>{t('Showcase your expertise and experience.')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="experience">{t('Years of Experience')}</Label>
              <Input id="experience" type="number" placeholder="5" defaultValue="15" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="specializations">{t('Specializations')}</Label>
              <Input id="specializations" placeholder={t("e.g., Bridal, Suits")} defaultValue="Bridal Gowns, Men's Suits, Alterations"/>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="education">{t('Education & Certifications')}</Label>
            <Textarea id="education" placeholder={t("List any tailoring schools, courses, or certifications.")} defaultValue="Advanced Tailoring from National Institute of Fashion Technology" />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>{t('Save Professional Details')}</Button>
        </CardFooter>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle>{t('Portfolio')}</CardTitle>
              <CardDescription>{t('Upload images of your best work to attract customers.')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="grid gap-2">
                  <Label htmlFor="proof-upload">{t('Upload Proof')}</Label>
                  <div className="flex gap-2">
                      <Input id="proof-upload" type="file" className="flex-1" />
                      <Button>{t('Upload')}</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{t('Upload JPG or PNG files, max 5MB.')}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                  <h4 className="font-medium">{t('Your Gallery')}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Image src="https://placehold.co/600x400.png" data-ai-hint="tailored suit" alt="Portfolio item 1" width={200} height={200} className="rounded-md object-cover aspect-square" />
                      <Image src="https://placehold.co/600x400.png" data-ai-hint="wedding dress" alt="Portfolio item 2" width={200} height={200} className="rounded-md object-cover aspect-square" />
                      <Image src="https://placehold.co/600x400.png" data-ai-hint="custom shirt" alt="Portfolio item 3" width={200} height={200} className="rounded-md object-cover aspect-square" />
                  </div>
              </div>
          </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('Change Password')}</CardTitle>
          <CardDescription>{t('Update your password for better security.')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="grid gap-2">
            <Label htmlFor="current-password">{t('Current Password')}</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">{t('New Password')}</Label>
            <Input id="new-password" type="password" />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="confirm-password">{t('Confirm New Password')}</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
           <Button>{t('Update Password')}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
