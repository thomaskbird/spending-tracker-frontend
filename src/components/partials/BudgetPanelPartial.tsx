import * as React from "react";
import "./BudgetPanelPartial.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BudgetForm} from "./BudgetForm";
import { Budget, PanelActionTypes } from "../../services/Models";
import { BudgetDetailView } from "src/components/partials/BudgetDetail";

interface BudgetPanelPartialProps {
  isAddBudgetOpen: boolean;
  onClose(): void;
  budgetActionType: PanelActionTypes | undefined;
  budgetToEdit: Budget | undefined;
  onReady(api: BudgetForm.Api): void;
  onBudgetAdd(formData: any): void;
  onToggleBudgetPanel(): void;
}

interface State {}

const COMPONENT_NAME = "BudgetPanelPartial";

export class BudgetPanelPartial extends React.Component<BudgetPanelPartialProps, State> {
  public static readonly displayName = "Budget Panel Partial";

  constructor(props: BudgetPanelPartialProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public componentDidUpdate(prevProps: BudgetPanelPartialProps): void {
    // test
  }

  public render(): JSX.Element {
    return (
      <div
        className={
          this.props.isAddBudgetOpen
            ? `${COMPONENT_NAME} open`
            : COMPONENT_NAME
        }
      >
          <span
            className={`${COMPONENT_NAME}--close-btn ${COMPONENT_NAME}--close-btn__add`}
            onClick={() => {
              this.props.onClose();
            }}
          >
            <FontAwesomeIcon icon={"times"} />
          </span>

        {this.props.budgetActionType !== "view" ? (
          <BudgetForm
            budget={this.props.budgetToEdit}
            onReady={api => {
              this.props.onReady(api);
            }}
            onSubmit={formData => {
              this.props.onBudgetAdd(formData);
            }}
            onCancel={() => {
              this.props.onToggleBudgetPanel();
            }}
          />
        ) : (
          <BudgetDetailView
            budget={this.props.budgetToEdit!}
          />
        )}
      </div>
    );
  }
}
