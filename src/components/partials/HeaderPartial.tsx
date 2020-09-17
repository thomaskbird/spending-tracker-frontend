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

    // redux mapped actions
    showPaginationBar: boolean;
    openDetails(panelActionType: PanelActionTypes): void;
    openSidebar(): void;
}

interface State {}

const COMPONENT_NAME = "HeaderPartial";

export class HeaderPartial extends React.Component<HeaderPartialProps, State> {
    public static readonly displayName = "Header Partial";

    constructor(props: HeaderPartialProps, context: any) {
        super(props, context);
        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME}`}>
                <div className={`${COMPONENT_NAME}--top`}>
                    <span
                        className={`${COMPONENT_NAME}--top--icons`}
                        onClick={() => this.props.openSidebar()}
                    >
                        <FontAwesomeIcon icon={"bars"} />
                    </span>

                    <Link to={"/admin"}>
                        <div className={"branding"}>
                            <div className={"branding--main"}>Spending</div>
                            <div className={"branding--secondary"}>Tracker</div>
                        </div>
                    </Link>

                    <span
                        className={`${COMPONENT_NAME}--top--icons HeaderPartial--top--icons--add ${!this.props.onToggleContextPanel ? "hidden" : ""}`}
                        onClick={() => this.props.openDetails(PanelActionTypes.add)}
                    >
                        <FontAwesomeIcon icon={"plus"} />
                    </span>
                </div>

                {this.props.showPaginationBar ? (
                    <div className={`${COMPONENT_NAME}--bottom`}>
                        <ConnectedPaginationDisplay />
                    </div>
                ) : undefined}

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

const mapStateToProps = (state: any) => {
    return {
        showPaginationBar: state.ui.showPaginationBar,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        openSidebar: () => dispatch(toggleSidebar()),
        openDetails: (actionType: PanelActionTypes) => dispatch(toggleDetailPanel(actionType))
    }
};

export const ConnectedHeaderPartial = connect(mapStateToProps, mapDispatchToProps)(HeaderPartial);
