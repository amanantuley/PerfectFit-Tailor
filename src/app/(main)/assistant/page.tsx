
"use client";

import { MeasurementForm } from "./measurement-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function AssistantPage() {
  const { t } = useLanguage();

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-rainbow-animation">{t('AI Measurement Assistant')}</CardTitle>
        <CardDescription>
          {t('Get AI-powered suggestions for the perfect fit. Provide garment details, measurements, and an optional reference image to receive tailored adjustment recommendations.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MeasurementForm />
      </CardContent>
    </Card>
  );
}
