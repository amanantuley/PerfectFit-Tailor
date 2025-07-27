
"use client";

import { useState } from "react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Design } from "@/types";
import { useLanguage } from "@/contexts/language-context";

const designs: Design[] = [
  { id: 'DSN001', title: 'Classic Sherwani', tags: ['ethnic', 'bridal'], imageUrl: 'https://placehold.co/600x400.png', },
  { id: 'DSN002', title: 'Formal Shirt', tags: ['casual', 'formal'], imageUrl: 'https://placehold.co/600x400.png', },
  { id: 'DSN003', title: 'Designer Blouse', tags: ['bridal'], imageUrl: 'https://placehold.co/600x400.png', },
  { id: 'DSN004', title: 'Straight-fit Pants', tags: ['formal'], imageUrl: 'https://placehold.co/600x400.png', },
  { id: 'DSN005', title: 'Anarkali Suit', tags: ['ethnic', 'party'], imageUrl: 'https://placehold.co/600x400.png', },
  { id: 'DSN006', title: 'Linen Kurta', tags: ['casual', 'ethnic'], imageUrl: 'https://placehold.co/600x400.png', },
];

export default function DesignsPage() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-rainbow-animation">{t('Design Catalog')}</h2>
          <p className="text-muted-foreground">
            {t('Browse and manage your collection of designs.')}
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t('Upload Design')}
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('Upload New Design')}</DialogTitle>
              <DialogDescription>
                {t('Add a new design to your catalog.')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">{t('Title')}</Label>
                <Input id="title" placeholder={t('e.g., Classic Blue Shirt')} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">{t('Tags')}</Label>
                <Input id="tags" placeholder={t('e.g., casual, formal')} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">{t('Image')}</Label>
                <Input id="image" type="file" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>{t('Cancel')}</Button>
              <Button type="submit">{t('Save Design')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((design) => (
          <Card key={design.id}>
            <CardHeader className="p-0">
              <Image
                src={design.imageUrl}
                alt={design.title}
                width={600}
                height={400}
                className="rounded-t-lg object-cover"
                data-ai-hint="clothing design"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg text-rainbow-animation">{t(design.title, design.title)}</CardTitle>
            </CardContent>
            <CardFooter className="flex gap-2 p-4 pt-0">
              {design.tags.map(tag => (
                <Badge key={tag} variant="secondary">{t(tag, tag)}</Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
