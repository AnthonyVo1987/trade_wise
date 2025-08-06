"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export function OptionsStrategyForm() {
  return (
    <Card>
      <CardContent className="p-4 grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stockTicker">Stock Ticker</Label>
          <Input
            id="stockTicker"
            name="stockTicker"
            placeholder="e.g., AAPL"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="riskTolerance">Risk Tolerance</Label>
          <Select name="riskTolerance" required defaultValue="moderate">
            <SelectTrigger id="riskTolerance">
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conservative">Conservative</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="aggressive">Aggressive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
