import { Tag, Transaction, TransactionType } from "./Models";

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
    description: "",
    type: TransactionType.expense,
    created_at: "2019-01-22 00:00:00",
    updated_at: "2019-01-22 00:00:00",
    deleted_at: null
  },
  {
    id: 2,
    name: "Oil change",
    slug: "oil-change",
    description: "",
    type: TransactionType.expense,
    created_at: "2019-02-22 00:00:00",
    updated_at: "2019-02-22 00:00:00",
    deleted_at: null
  },
  {
    id: 3,
    name: "Groceries",
    slug: "groceries",
    description: "",
    type: TransactionType.expense,
    created_at: "2019-01-18 00:00:00",
    updated_at: "2019-01-19 00:00:00",
    deleted_at: null
  },
  {
    id: 4,
    name: "Salary",
    slug: "salary",
    description: "",
    type: TransactionType.income,
    created_at: "2019-01-22 00:00:00",
    updated_at: "2019-01-22 00:00:00",
    deleted_at: null
  },
  {
    id: 5,
    name: "Contract work",
    slug: "contract-work",
    description: "",
    type: TransactionType.income,
    created_at: "2018-11-06 00:00:00",
    updated_at: "2018-11-11 00:00:00",
    deleted_at: null
  }
];