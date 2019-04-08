# Spending Tracker

Spending tracker is an easy to use web app for tracking your spending, it allows you to enter transactions (income and expense). You can also set budgets and see where you are with your current budgets as well as receive realtime notifications when you are close to user defined thresholds.

| Model                     | Description                           |
|---------------------------|---------------------------------------|
| User                      | Users information                     |

### Hierarchy
- Accounts
    - Description
        - This will allow for individual accounts to be made where transactions, budgets, tags, etc will belong to that account and multiple users can be added to that account. 
- Users
    - Description
        - Will contain all the information for a given user
    - Table format
        - id
        - first_name
        - last_name
        - email
        - password
        - created_at
        - updated_at
- Transactions
    - Description
        - Transactions will have information about each transaction.
        - Transactions can be current or future
        - Transactions can be one time or recurring
        - They will have a type (income|expense)
    - Table format
        - id
        - name
        - amount
        - transaction_type
        - recurrence_type
        - happens_at
        - created_at
        - updated_at
- Budgets
    - Description
        - Budgets will allow a user to set a certain budget amount, then assign tags. The tags will relate directly to transactions of this tag type and compile for the currently spent versus the budget goal.
    - Table format
        - id
        - name
        - slug
        - created_at
        - updated_at
    - Relations
        - Tags
            - Description
                - Tags are organizational, easy to use, way of indicating what type of transaction this item is.
                - Above that, the tag will be directly associated to a budget allowing a user the ability to mark certain tags as part of a given budget.
            - Table format
                - id
                - parent_id
                - name
                - slug
                - created_at
                - updated_at
                 
