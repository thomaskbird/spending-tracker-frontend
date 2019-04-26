import * as React from "react";
import "./BudgetView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import { Redirect, RouteComponentProps } from "react-router";
import {SidebarPartial} from "../partials/SidebarPartial";

interface BudgetViewProps extends RouteComponentProps<any> {}

interface State {
  isSidebarOpen: boolean;
}

const COMPONENT_NAME = "BudgetView";

export class BudgetView extends React.Component<BudgetViewProps, State> {
  public static readonly displayName = "Budget View";

  constructor(props: BudgetViewProps, context: any) {
    super(props, context);

    this.state = {
      isSidebarOpen: false
    };
  }

  public render(): JSX.Element {
    return (
      <div className={COMPONENT_NAME}>
        <HeaderPartial
          onToggleSidebar={() => {
            this.toggleSidebarPanel(true);
          }}
        />

        <div className={"BodyPartial"}>
          <div className={"route--viewport"}>
            <h2>Budgets</h2>
          </div>

          <SidebarPartial
            sidebarClass={this.state.isSidebarOpen}
            onClose={() => {
              this.closeSlidePanels();
            }}
          />
        </div>
      </div>
    );
  }

  /**
   * Toggles the sidebar panel
   * @param {boolean} isOpen - Indicates whether the panel should be open
   */
  private toggleSidebarPanel(isOpen: boolean): void {
    this.setState({
      isSidebarOpen: isOpen
    });
  }

  /**
   * Closes the slide panels
   */
  private closeSlidePanels(): void {
    this.setState({
      isSidebarOpen: false
    });
  }
}
