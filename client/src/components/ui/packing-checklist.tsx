import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckSquare, Square, Plus, X } from "lucide-react";

interface ChecklistItem {
  id: string;
  name: string;
  checked: boolean;
  category: 'essentials' | 'clothing' | 'toiletries' | 'electronics' | 'documents' | 'misc';
}

interface PackingChecklistProps {
  destination?: string;
  compact?: boolean;
}

export function PackingChecklist({ destination = "Tokyo", compact = false }: PackingChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: "item1", name: "Passport", checked: true, category: 'documents' },
    { id: "item2", name: "Flight tickets", checked: true, category: 'documents' },
    { id: "item3", name: "Hotel reservation", checked: false, category: 'documents' },
    { id: "item4", name: "Credit cards", checked: false, category: 'essentials' },
    { id: "item5", name: "Local currency", checked: false, category: 'essentials' },
    { id: "item6", name: "Phone charger", checked: false, category: 'electronics' },
    { id: "item7", name: "Power adapter", checked: false, category: 'electronics' },
    { id: "item8", name: "Toothbrush", checked: false, category: 'toiletries' },
    { id: "item9", name: "Medications", checked: false, category: 'essentials' },
    { id: "item10", name: "Comfortable shoes", checked: false, category: 'clothing' },
  ]);
  
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem['category']>('misc');
  const [activeCategory, setActiveCategory] = useState<ChecklistItem['category'] | 'all'>('all');
  
  const handleAddItem = () => {
    if (newItemName) {
      const newItem: ChecklistItem = {
        id: `item${items.length + 1}-${Date.now()}`,
        name: newItemName,
        checked: false,
        category: newItemCategory
      };
      
      setItems([...items, newItem]);
      setNewItemName("");
    }
  };
  
  const handleToggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);
  
  const progress = Math.round((items.filter(item => item.checked).length / items.length) * 100);
  
  const categories: {value: ChecklistItem['category'] | 'all', label: string}[] = [
    { value: 'all', label: 'All Items' },
    { value: 'essentials', label: 'Essentials' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'toiletries', label: 'Toiletries' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'documents', label: 'Documents' },
    { value: 'misc', label: 'Miscellaneous' }
  ];
  
  if (compact) {
    return (
      <Card className="bg-white dark:bg-gray-800 shadow-sm">
        <CardContent className="p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium dark:text-white text-gray-800">Packing List</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">{progress}% packed</span>
          </div>
          
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {items.slice(0, 5).map(item => (
              <div key={item.id} className="flex items-center text-sm">
                <button 
                  className="text-gray-400 dark:text-gray-500 mr-2 focus:outline-none"
                  onClick={() => handleToggleItem(item.id)}
                >
                  {item.checked ? (
                    <CheckSquare className="h-4 w-4 text-primary" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                </button>
                <span className={`text-sm ${item.checked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
          
          {items.length > 5 && (
            <div className="text-xs text-center mt-2 text-primary">
              +{items.length - 5} more items
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium dark:text-white text-gray-800">Packing Checklist for {destination}</h3>
          <div className="text-xs bg-gray-100 dark:bg-gray-700 py-1 px-2 rounded">
            <span className="font-medium">{items.filter(item => item.checked).length}/{items.length}</span> packed
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="mb-3 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-2">
            {categories.map(category => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap text-xs h-7 px-2"
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Checklist Items */}
        <div className="space-y-1 max-h-48 overflow-y-auto mb-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
              No items in this category
            </div>
          ) : (
            filteredItems.map(item => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-2 rounded hover:bg-gray-50 hover:dark:bg-gray-700"
              >
                <div className="flex items-center">
                  <button 
                    className="text-gray-400 dark:text-gray-500 mr-2 focus:outline-none"
                    onClick={() => handleToggleItem(item.id)}
                  >
                    {item.checked ? (
                      <CheckSquare className="h-5 w-5 text-primary" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>
                  <span className={`text-sm ${item.checked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                    {item.name}
                  </span>
                </div>
                <button 
                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
        
        {/* Add New Item */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400">Add Item</h4>
          <div className="flex space-x-2">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item name"
              className="flex-1"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value as ChecklistItem['category'])}
              className="w-28 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="essentials">Essentials</option>
              <option value="clothing">Clothing</option>
              <option value="toiletries">Toiletries</option>
              <option value="electronics">Electronics</option>
              <option value="documents">Documents</option>
              <option value="misc">Misc</option>
            </select>
          </div>
          <Button 
            onClick={handleAddItem}
            disabled={!newItemName}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}