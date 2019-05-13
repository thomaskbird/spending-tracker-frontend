import * as React from "react";
import "./SidebarPartial.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface SidebarPartialProps {
    sidebarClass: boolean;
    onClose(): void;
}

interface State {}

const COMPONENT_NAME = "SidebarPartial";

export class SidebarPartial extends React.Component<
    SidebarPartialProps,
    State
> {
    public static readonly displayName = "Sidebar Partial";

    constructor(props: SidebarPartialProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div
                className={
                    this.props.sidebarClass
                        ? `${COMPONENT_NAME} open`
                        : COMPONENT_NAME
                }
            >
                <span
                    className={`${COMPONENT_NAME}--close-btn ${COMPONENT_NAME}--close-btn__sidebar`}
                    onClick={() => {
                        this.props.onClose();
                    }}
                >
                    <FontAwesomeIcon icon={"times"} />
                </span>

                <h2>Sidebar</h2>

                <ul>
                    <li>
                        <Link to={"/admin"}>Home</Link>
                    </li>
                    <li>
                        <a>Visualizations</a>
                    </li>
                    <li>
                        <Link to={"/admin/budgets"}>Budgets</Link>
                    </li>
                    <li>
                        <Link to={"/admin/tags"}>Tags</Link>
                    </li>
                </ul>

                <ul>
                    <li>
                        <a>Logout</a>
                    </li>
                </ul>
            </div>
        );
    }
}
