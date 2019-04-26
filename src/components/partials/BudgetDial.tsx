import * as React from "react";
import "./BudgetDial.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BudgetFigures} from "../../services/Models";

interface BudgetDialViewProps {
  title: string;
  icon: any;
  budgetFigures: BudgetFigures
}

interface State {}

const COMPONENT_NAME = "BudgetDial";

export class BudgetDial extends React.Component<BudgetDialViewProps, State> {
  public static readonly displayName = "Budget Dial View";

  constructor(props: BudgetDialViewProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    const percent = this.props.budgetFigures.used / this.props.budgetFigures.budgetTotal;
    const percentDegree = percent * 360;
    const figures = {};

    return (
      <div className={COMPONENT_NAME}>
        <div className={`${COMPONENT_NAME}__dial--border`}>
          <div className={`${COMPONENT_NAME}__dial`} style={{ background: `conic-gradient(orange 0deg, red ${percentDegree}deg, white ${percentDegree}deg, white 360deg)` }}>
            <div className={`${COMPONENT_NAME}__dial--icon`}>
              <FontAwesomeIcon
                icon={this.props.icon}
              />
            </div>
          </div>
        </div>

        <div className={`${COMPONENT_NAME}__text`}>
          <h3>{this.props.title}</h3>
          <p className={`${COMPONENT_NAME}__text--subtext`}>
            {percent * 100}% of budget
          </p>
        </div>
      </div>
    );
  }
}
