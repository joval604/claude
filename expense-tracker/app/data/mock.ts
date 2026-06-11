export type Category =
  | "Materials - Blanks"
  | "Materials - Pins"
  | "Printing Supplies"
  | "Packaging"
  | "Shipping"
  | "Equipment"
  | "Software & Tools"
  | "Marketing"
  | "Overhead";

export type TransactionType = "expense" | "income";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category | "Sales - Apparel" | "Sales - Pins" | "Custom Orders";
  productLine: "pins" | "apparel" | "general";
}

export const transactions: Transaction[] = [
  { id: "1", date: "2026-06-01", description: "Blank t-shirts (48 units)", amount: 192.0, type: "expense", category: "Materials - Blanks", productLine: "apparel" },
  { id: "2", date: "2026-06-02", description: "Etsy sales - apparel", amount: 540.0, type: "income", category: "Sales - Apparel", productLine: "apparel" },
  { id: "3", date: "2026-06-03", description: "Enamel pin blanks (100 units)", amount: 85.0, type: "expense", category: "Materials - Pins", productLine: "pins" },
  { id: "4", date: "2026-06-04", description: "USPS shipping supplies", amount: 34.5, type: "expense", category: "Shipping", productLine: "general" },
  { id: "5", date: "2026-06-05", description: "Custom order - 12 shirts", amount: 360.0, type: "income", category: "Custom Orders", productLine: "apparel" },
  { id: "6", date: "2026-06-06", description: "DTF transfer sheets", amount: 67.0, type: "expense", category: "Printing Supplies", productLine: "apparel" },
  { id: "7", date: "2026-06-07", description: "Pin sales - weekend market", amount: 210.0, type: "income", category: "Sales - Pins", productLine: "pins" },
  { id: "8", date: "2026-06-08", description: "Poly mailers & boxes", amount: 28.0, type: "expense", category: "Packaging", productLine: "general" },
  { id: "9", date: "2026-06-09", description: "Adobe Creative Cloud", amount: 54.99, type: "expense", category: "Software & Tools", productLine: "general" },
  { id: "10", date: "2026-06-10", description: "Instagram ads", amount: 50.0, type: "expense", category: "Marketing", productLine: "general" },
  { id: "11", date: "2026-06-10", description: "Etsy sales - pins", amount: 185.0, type: "income", category: "Sales - Pins", productLine: "pins" },
  { id: "12", date: "2026-06-11", description: "Heat press maintenance", amount: 45.0, type: "expense", category: "Equipment", productLine: "apparel" },
  { id: "13", date: "2026-05-28", description: "Blank hoodies (24 units)", amount: 216.0, type: "expense", category: "Materials - Blanks", productLine: "apparel" },
  { id: "14", date: "2026-05-25", description: "Etsy sales - apparel", amount: 620.0, type: "income", category: "Sales - Apparel", productLine: "apparel" },
  { id: "15", date: "2026-05-20", description: "Pin mold setup fee", amount: 120.0, type: "expense", category: "Materials - Pins", productLine: "pins" },
  { id: "16", date: "2026-05-18", description: "Shopify monthly fee", amount: 39.0, type: "expense", category: "Software & Tools", productLine: "general" },
  { id: "17", date: "2026-05-15", description: "Custom order - corporate pins", amount: 480.0, type: "income", category: "Custom Orders", productLine: "pins" },
  { id: "18", date: "2026-05-10", description: "Shipping labels (roll)", amount: 18.0, type: "expense", category: "Shipping", productLine: "general" },
];

export const monthlyData = [
  { month: "Jan", income: 1120, expenses: 580 },
  { month: "Feb", income: 980, expenses: 510 },
  { month: "Mar", income: 1450, expenses: 690 },
  { month: "Apr", income: 1300, expenses: 620 },
  { month: "May", income: 1750, expenses: 780 },
  { month: "Jun", income: 1295, expenses: 556 },
];
