"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { SuggestMeasurementAdjustmentsOutput } from "@/ai/flows/suggest-measurement-adjustments";
import { useLanguage } from "@/contexts/language-context";

type AdjustmentResultProps = {
  result: SuggestMeasurementAdjustmentsOutput;
};

export function AdjustmentResult({ result }: AdjustmentResultProps) {
  const { t } = useLanguage();

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">{t('AI Recommendations')}</h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('Suggested Adjustments')}</CardTitle>
            <CardDescription>{t('Changes to apply for the perfect fit.')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {Object.entries(result.suggestedAdjustments).map(([key, value]) => (
                <li key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}</span>
                  <span className="text-primary">{value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('Reasoning')}</CardTitle>
            <CardDescription>{t('The logic behind the suggestions.')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.reasoning}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
