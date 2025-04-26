import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

interface CurrencyConverterProps {
  defaultFrom?: string;
  defaultTo?: string;
}

interface ExchangeRate {
  currency: string;
  rate: number;
  symbol: string;
}

export function CurrencyConverter({ 
  defaultFrom = "USD", 
  defaultTo = "JPY" 
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>(defaultFrom);
  const [toCurrency, setToCurrency] = useState<string>(defaultTo);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock exchange rates (in a real app, this would come from an API)
  const exchangeRates: ExchangeRate[] = [
    { currency: "USD", rate: 1, symbol: "$" },
    { currency: "EUR", rate: 0.93, symbol: "€" },
    { currency: "JPY", rate: 149.71, symbol: "¥" },
    { currency: "GBP", rate: 0.81, symbol: "£" },
    { currency: "CAD", rate: 1.36, symbol: "CA$" },
    { currency: "AUD", rate: 1.53, symbol: "A$" },
    { currency: "CNY", rate: 7.18, symbol: "¥" },
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    if (amount && !isNaN(Number(amount))) {
      const fromRate = exchangeRates.find(rate => rate.currency === fromCurrency)?.rate || 1;
      const toRate = exchangeRates.find(rate => rate.currency === toCurrency)?.rate || 1;
      
      // Convert from the base currency (USD) to the target currency
      const result = (Number(amount) * toRate) / fromRate;
      setConvertedAmount(result);
    } else {
      setConvertedAmount(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  const getSymbol = (currency: string): string => {
    return exchangeRates.find(rate => rate.currency === currency)?.symbol || "";
  };

  const formatAmount = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  if (loading) {
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium dark:text-white text-gray-800 mb-3">Currency Converter</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-3/5">
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="w-full"
              />
            </div>
            <div className="w-2/5">
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From" />
                </SelectTrigger>
                <SelectContent>
                  {exchangeRates.map((rate) => (
                    <SelectItem key={rate.currency} value={rate.currency}>
                      {rate.currency} ({rate.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3/5">
              {convertedAmount !== null ? (
                <div className="p-2 border border-gray-200 dark:border-gray-700 rounded h-9 text-sm text-gray-800 dark:text-white flex items-center">
                  {formatAmount(convertedAmount)}
                </div>
              ) : (
                <div className="p-2 border border-gray-200 dark:border-gray-700 rounded h-9 text-sm text-gray-400 flex items-center">
                  Enter amount
                </div>
              )}
            </div>
            <div className="w-2/5">
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="To" />
                </SelectTrigger>
                <SelectContent>
                  {exchangeRates.map((rate) => (
                    <SelectItem key={rate.currency} value={rate.currency}>
                      {rate.currency} ({rate.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {convertedAmount !== null && (
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
            {amount} {fromCurrency} = {getSymbol(toCurrency)}{formatAmount(convertedAmount)} {toCurrency}
          </div>
        )}
      </CardContent>
    </Card>
  );
}