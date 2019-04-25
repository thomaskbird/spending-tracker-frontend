export enum TransactionType {
  expense = "expense",
  income = "income"
}

export enum TransactionStatus {
  new = "new",
  approved = "approved",
  disapproved = "disapproved"
}

export enum RecurringType {
  weekly = "weekly",
  monthly = "monthly",
  yearly = "yearly"
}

export enum TransactionPanelActionTypes {
  view = "view",
  edit = "edit",
  add = "add"
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

export interface Recurring extends Timestamps {
  recurring_type: RecurringType;
  start_at: string;
  end_at: string;
}

export interface RecurringUndefined {
  recurring_type: RecurringType | undefined;
  start_at: string | undefined;
  end_at: string | undefined;
  created_at: string | undefined;
  updated_at: string | undefined;
  deleted_at: string | null | undefined;
}

export interface Transaction extends Timestamps {
  id: number;
  recurring_id: number;
  submitted_by: number;
  title: string;
  description: string | undefined;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  occurred_at: string;
}

export interface TransactionWithRecurring extends Transaction {
  recurring: Recurring | undefined;
}

export interface TransactionWithUndefined {
  id: number | undefined;
  recurring_id: number | undefined;
  submitted_by: number | undefined;
  title: string | undefined;
  description: string | undefined;
  amount: number | undefined;
  type: TransactionType | undefined;
  status: TransactionStatus | undefined;
  occurred_at: string | undefined;
  recurring: RecurringUndefined;
  created_at: string | undefined;
  updated_at: string | undefined;
  deleted_at: string | null | undefined;
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
