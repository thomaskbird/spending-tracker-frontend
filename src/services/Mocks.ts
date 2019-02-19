import {
  PaginatedListResults,
  Tag,
  Transaction,
  TransactionType
} from "./Models";

export const MOCK_TAGS: Tag[] = [
  {
    id: 1,
    name: "Entertainment",
    slug: "entertainment",
    description: "Anything related to going out and having fun",
    created_at: "2019-01-22 00:00:00",
    updated_at: "2019-01-22 00:00:00",
    deleted_at: null
  },
  {
    id: 2,
    name: "Child Care",
    slug: "child-care",
    description: "Anything related to the kids and their care",
    created_at: "2019-01-22 00:00:00",
    updated_at: "2019-01-22 00:00:00",
    deleted_at: null
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    name: "Gas",
    slug: "gas",
    description: "Gas for work the other day",
    amount: 10.99,
    type: TransactionType.expense,
    created_at: "2019-01-22 00:00:00",
    updated_at: "2019-01-22 00:00:00",
    deleted_at: null
  },
  {
    id: 2,
    name: "Oil change",
    slug: "oil-change",
    description: "Oil change for the kia forte 2019-01-22 00:00:00",
    amount: 74.99,
    type: TransactionType.expense,
    created_at: "2019-02-22 00:00:00",
    updated_at: "2019-02-22 00:00:00",
    deleted_at: null
  },
  {
    id: 3,
    name: "Groceries",
    slug: "groceries",
    description: "Tacos, spaghetti, salad, yogurt, eggs, bacon, etc",
    amount: 135.00,
    type: TransactionType.expense,
    created_at: "2019-01-18 00:00:00",
    updated_at: "2019-01-19 00:00:00",
    deleted_at: null
  },
  {
    id: 4,
    name: "Salary",
    slug: "salary",
    description: "Main check salary",
    amount: 5203.23,
    type: TransactionType.income,
    created_at: "2019-01-22 00:00:00",
    updated_at: "2019-01-22 00:00:00",
    deleted_at: null
  },
  {
    id: 5,
    name: "Contract work",
    slug: "contract-work",
    description: "Side work one time amount",
    amount: 450.00,
    type: TransactionType.income,
    created_at: "2018-11-06 00:00:00",
    updated_at: "2018-11-11 00:00:00",
    deleted_at: null
  }
];

export const MOCK_PAGINATED_RESULTS: PaginatedListResults = {
  from: 1,
  to: 5,
  total: 50,
  last_page: 5,
  current_page: 1,
  per_page: 10,
  last_page_url: null,
  next_page_url: null,
  prev_page_url: null,
  path: null,
  first_page_url: null,
  data: null
};
