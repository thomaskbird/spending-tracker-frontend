import * as React from "react";

import { connect } from "react-redux";

import "./HeaderPartial.scss";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange, PanelActionTypes, TransactionCategory } from "../../services/Models";
import { ButtonGroup } from "./library/ButtonGroup";
import { ConnectedPaginationDisplay } from "./PaginationDisplay";
import { toggleDetailPanel, toggleSidebar } from "../../redux/ui-actions";

interface HeaderPartialProps {
    range?: DateRange;
    /**
     * Toggles the transaction panel
     *
     * @param {boolean} isOpen - Indicates whether the panel should be open
     * @param {TransactionPanelActionTypes} actionType - Indicates what action the panel should render
     * @param {undefined} transaction - The transaction data
     */
    onToggleContextPanel?(isOpen: boolean, actionType: PanelActionTypes): void;
    onToggleTransactionType?(): void;
    selectedTransactionType?: any;
    showPagination?: boolean;
    showMenuIcon?: boolean;
    showAddIcon?: boolean;

    // redux mapped actions
    openDetails(panelActionType: PanelActionTypes): void;
    openSidebar(): void;
}

interface State {}

const COMPONENT_NAME = "HeaderPartial";

export class HeaderPartial extends React.Component<HeaderPartialProps, State> {
    public static readonly displayName = "Header Partial";

    public static defaultProps = {
        showPagination: true,
        showMenuIcon: true,
        showAddIcon: true,
    };

    constructor(props: HeaderPartialProps, context: any) {
        super(props, context);
        console.log("props", props);
        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME}`}>
                <div className={`${COMPONENT_NAME}--top`}>
                    {this.props.showMenuIcon ? (
                        <span
                            className={`${COMPONENT_NAME}--top--icons`}
                            onClick={() => this.props.openSidebar()}
                        >
                            <FontAwesomeIcon icon={"bars"} />
                        </span>
                    ): undefined}

                    <Link to={"/admin"}>
                        <div className={"branding"}>
                            <div className={"branding--main"}>Spending</div>
                            <div className={"branding--secondary"}>Tracker</div>
                        </div>
                    </Link>

                    {this.props.showAddIcon ? (
                        <span
                            className={`${COMPONENT_NAME}--top--icons HeaderPartial--top--icons--add ${!this.props.onToggleContextPanel ? "hidden" : ""}`}
                            onClick={() => this.props.openDetails(PanelActionTypes.add)}
                        >
                            <FontAwesomeIcon icon={"plus"} />
                        </span>
                    ): undefined}
                </div>

                {this.props.showPagination ? (
                    <div className={`${COMPONENT_NAME}--bottom`}>
                        <ConnectedPaginationDisplay />
                    </div>
                ): undefined}

                {this.props.onToggleTransactionType ? (
                    <div className={`${COMPONENT_NAME}--bottom sub`}>
                        <ButtonGroup
                            selected={this.props.selectedTransactionType}
                            items={[
                                {
                                    text: "Transactions",
                                    type: TransactionCategory.transactions
                                },
                                {
                                    text: "Queue",
                                    type: TransactionCategory.queue
                                }
                            ]}
                            onSelection={() => this.props.onToggleTransactionType && this.props.onToggleTransactionType()}
                        />
                    </div>
                ): (undefined)}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        openSidebar: () => dispatch(toggleSidebar()),
        openDetails: (actionType: PanelActionTypes) => dispatch(toggleDetailPanel(actionType))
    }
};

export const ConnectedHeaderPartial = connect(null, mapDispatchToProps)(HeaderPartial);
