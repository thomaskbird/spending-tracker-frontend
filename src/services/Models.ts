export enum TransactionType {
  expense = "expense",
  income = "income"
}

interface Timestamps {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DateRange {
  start: any;
  end: any;
}

export interface Transaction extends Timestamps {
  id: number;
  title: string | null;
  amount: number | null;
  description: string | null;
  type: TransactionType | null;
}

export interface Tag extends Timestamps {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface PaginatedListResults {
  from: number;
  to: number;
  total: number;
  last_page: number;
  current_page: number;
  per_page: number;
  last_page_url: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string | null;
  first_page_url: string | null;
  data: any;
}
