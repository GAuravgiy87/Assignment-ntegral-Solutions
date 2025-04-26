import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus, DollarSign, PiggyBank, Wallet } from "lucide-react";

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: 'accommodation' | 'transport' | 'food' | 'activities' | 'other';
}

interface TripBudgetProps {
  totalBudget?: number;
  destination?: string;
}

export function TripBudget({ totalBudget = 2500, destination = "Tokyo" }: TripBudgetProps) {
  const [budget, setBudget] = useState<number>(totalBudget);
  const [expenses, setExpenses] = useState<BudgetItem[]>([
    { id: "exp1", name: "Hotel (5 nights)", amount: 750, category: 'accommodation' },
    { id: "exp2", name: "Flight tickets", amount: 900, category: 'transport' },
    { id: "exp3", name: "Local transportation", amount: 150, category: 'transport' },
    { id: "exp4", name: "Food & Dining", amount: 350, category: 'food' },
    { id: "exp5", name: "Tokyo Skytree", amount: 25, category: 'activities' },
    { id: "exp6", name: "Sensō-ji Temple Tour", amount: 30, category: 'activities' },
  ]);
  
  const [newExpenseName, setNewExpenseName] = useState<string>("");
  const [newExpenseAmount, setNewExpenseAmount] = useState<string>("");
  const [newExpenseCategory, setNewExpenseCategory] = useState<BudgetItem['category']>('other');
  
  const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);
  const remainingBudget = budget - totalExpenses;
  const percentSpent = (totalExpenses / budget) * 100;
  
  const categoryTotals = expenses.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }
    acc[item.category] += item.amount;
    return acc;
  }, {} as Record<BudgetItem['category'], number>);
  
  const handleAddExpense = () => {
    if (newExpenseName && newExpenseAmount && !isNaN(Number(newExpenseAmount))) {
      const newExpense: BudgetItem = {
        id: `exp${expenses.length + 1}-${Date.now()}`,
        name: newExpenseName,
        amount: Number(newExpenseAmount),
        category: newExpenseCategory
      };
      
      setExpenses([...expenses, newExpense]);
      setNewExpenseName("");
      setNewExpenseAmount("");
    }
  };
  
  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const categoryIcons: Record<BudgetItem['category'], JSX.Element> = {
    'accommodation': <PiggyBank className="h-4 w-4" />,
    'transport': <Wallet className="h-4 w-4" />,
    'food': <DollarSign className="h-4 w-4" />,
    'activities': <Plus className="h-4 w-4" />,
    'other': <Minus className="h-4 w-4" />
  };
  
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium dark:text-white text-gray-800 mb-1">Trip Budget for {destination}</h3>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">
              Budget: {formatCurrency(budget)}
            </span>
            <span className={`font-medium ${remainingBudget >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              Remaining: {formatCurrency(remainingBudget)}
            </span>
          </div>
          
          <Progress 
            value={Math.min(percentSpent, 100)} 
            className="h-2"
          />
          
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500 dark:text-gray-400">
              {formatCurrency(totalExpenses)} spent
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {percentSpent.toFixed(0)}%
            </span>
          </div>
        </div>
        
        {/* Category breakdown */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Expense Categories</h4>
          <div className="space-y-2">
            {Object.entries(categoryTotals).map(([category, total]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 mr-2">
                    {categoryIcons[category as BudgetItem['category']]}
                  </span>
                  <span className="text-sm capitalize text-gray-700 dark:text-gray-300">
                    {category}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    {formatCurrency(total)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {((total / totalExpenses) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Expense list */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Expenses</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {expenses.map(expense => (
              <div key={expense.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {expense.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                    {formatCurrency(expense.amount)}
                  </span>
                  <button 
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                    onClick={() => handleRemoveExpense(expense.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Add expense form */}
        <div>
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Add Expense</h4>
          <div className="flex items-center space-x-2 mb-2">
            <Input
              value={newExpenseName}
              onChange={(e) => setNewExpenseName(e.target.value)}
              placeholder="Expense name"
              className="flex-1"
            />
            <Input
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(e.target.value)}
              placeholder="Amount"
              type="number"
              className="w-24"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={newExpenseCategory}
              onChange={(e) => setNewExpenseCategory(e.target.value as BudgetItem['category'])}
              className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="accommodation">Accommodation</option>
              <option value="transport">Transportation</option>
              <option value="food">Food & Dining</option>
              <option value="activities">Activities</option>
              <option value="other">Other</option>
            </select>
            
            <Button 
              onClick={handleAddExpense}
              disabled={!newExpenseName || !newExpenseAmount || isNaN(Number(newExpenseAmount))}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}