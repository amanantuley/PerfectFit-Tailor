
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/language-context";

export default function ChargesPage() {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Service Charges')}</CardTitle>
        <CardDescription>{t('Set and manage your tailoring service charges.')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Service')}</TableHead>
                <TableHead className="text-right">{t('Price (₹)')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Label htmlFor="shirt-stitching" className="font-medium">{t('Shirt Stitching')}</Label>
                </TableCell>
                <TableCell className="text-right">
                  <Input id="shirt-stitching" type="number" defaultValue="800" className="w-32 ml-auto text-right" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label htmlFor="pant-stitching" className="font-medium">{t('Pants Stitching')}</Label>
                </TableCell>
                <TableCell className="text-right">
                  <Input id="pant-stitching" type="number" defaultValue="1000" className="w-32 ml-auto text-right" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label htmlFor="sherwani-stitching" className="font-medium">{t('Sherwani Stitching')}</Label>
                </TableCell>
                <TableCell className="text-right">
                  <Input id="sherwani-stitching" type="number" defaultValue="4500" className="w-32 ml-auto text-right" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label htmlFor="blouse-stitching" className="font-medium">{t('Blouse Stitching')}</Label>
                </TableCell>
                <TableCell className="text-right">
                  <Input id="blouse-stitching" type="number" defaultValue="1200" className="w-32 ml-auto text-right" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label htmlFor="alterations" className="font-medium">{t('Basic Alterations')}</Label>
                </TableCell>
                <TableCell className="text-right">
                  <Input id="alterations" type="number" defaultValue="250" className="w-32 ml-auto text-right" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-end">
            <Button type="submit">{t('Save Charges')}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
