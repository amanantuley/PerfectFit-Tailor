"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Trash2, Wand2 } from "lucide-react";

import { suggestMeasurementAdjustments, type SuggestMeasurementAdjustmentsOutput } from "@/ai/flows/suggest-measurement-adjustments";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AdjustmentResult } from "./adjustment-result";
import { useLanguage } from "@/contexts/language-context";

const formSchema = z.object({
  garmentType: z.string().min(1, "Garment type is required"),
  desiredFit: z.string().min(1, "Desired fit is required"),
  referenceImage: z.any().optional(),
  measurements: z.array(z.object({
      name: z.string().min(1, "Name is required"),
      value: z.coerce.number().min(0.1, "Value must be positive"),
  })),
});

type FormValues = z.infer<typeof formSchema>;

const initialMeasurements = [
    { name: 'Chest', value: 38 },
    { name: 'Waist', value: 32 },
    { name: 'Hips', value: 40 },
    { name: 'Inseam', value: 30 },
]

export function MeasurementForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestMeasurementAdjustmentsOutput | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      garmentType: "Shirt",
      desiredFit: "Regular",
      measurements: initialMeasurements,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "measurements",
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setResult(null);

    try {
        const measurements = data.measurements.reduce((acc, m) => {
            acc[m.name] = m.value;
            return acc;
        }, {} as Record<string, number>);

        let referenceImage: string | undefined;
        if (data.referenceImage && data.referenceImage.length > 0) {
          const file = data.referenceImage[0];
          if (file instanceof File) {
             referenceImage = await fileToBase64(file);
          }
        }
        
      const response = await suggestMeasurementAdjustments({
        garmentType: data.garmentType,
        desiredFit: data.desiredFit,
        measurements: measurements,
        referenceImage: referenceImage,
      });
      setResult(response);
    } catch (error) {
      console.error("AI adjustment suggestion failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get suggestions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="garmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Garment Type')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder={t('Select a garment type')} /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Shirt">{t('Shirt')}</SelectItem>
                      <SelectItem value="Pants">{t('Pants')}</SelectItem>
                      <SelectItem value="Jacket">{t('Jacket')}</SelectItem>
                      <SelectItem value="Blouse">{t('Blouse')}</SelectItem>
                      <SelectItem value="Sherwani">{t('Sherwani')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desiredFit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Desired Fit')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder={t('Select a fit')} /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Slim">{t('Slim Fit')}</SelectItem>
                      <SelectItem value="Regular">{t('Regular Fit')}</SelectItem>
                      <SelectItem value="Loose">{t('Loose Fit')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
             <FormLabel>{t('Measurements (in inches)')}</FormLabel>
             <div className="mt-2 space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name={`measurements.${index}.name`}
                            render={({ field }) => (
                                <FormItem className="flex-1"><Input {...field} placeholder={t("Measurement name")} /></FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`measurements.${index}.value`}
                            render={({ field }) => (
                                <FormItem className="flex-1"><Input type="number" step="0.1" {...field} placeholder={t('Value')} /></FormItem>
                            )}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', value: 0 })}>
                    <Plus className="mr-2 h-4 w-4" /> {t('Add Measurement')}
                </Button>
             </div>
          </div>
          <FormField
            control={form.control}
            name="referenceImage"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>{t('Reference Image (Optional)')}</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            {t('Get Suggestions')}
          </Button>
        </form>
      </Form>

      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">{t('Our AI tailor is analyzing the details...')}</p>
        </div>
      )}

      {result && <AdjustmentResult result={result} />}
    </>
  );
}
