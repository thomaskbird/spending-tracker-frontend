import * as React from "react";
import "./SidebarPartial.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";

interface SidebarPartialProps {
    sidebarClass: boolean;
    onClose(): void;
}

interface State {
    isLogout: boolean;
}

const COMPONENT_NAME = "SidebarPartial";

export class SidebarPartial extends React.Component<
    SidebarPartialProps,
    State
> {
    public static readonly displayName = "Sidebar Partial";

    constructor(props: SidebarPartialProps, context: any) {
        super(props, context);

        this.state = {
            isLogout: false
        };
    }

    public componentDidUpdate(prevProps: Readonly<SidebarPartialProps>, prevState: Readonly<State>, snapshot?: any): void {
        // console.log("componentDidUpdate", prevProps, this.props);
    }

    public render(): JSX.Element {
        if (this.state.isLogout) {
            return <Redirect to={"/"} />;
        }

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

                <div className={`${COMPONENT_NAME}--link-container`}>
                    <ul>
                        {mainNavItems.map((mainNavItem, index) => {
                            return (
                                <li key={index}>
                                    <Link to={mainNavItem.to}>{mainNavItem.text}</Link>
                                </li>
                            );
                        })}
                    </ul>

                    <ul>
                        <li>
                            <a onClick={() => { this.setState({ isLogout: true }) }}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

interface NavItem {
    to: string;
    text: string;
}

const mainNavItems: NavItem[] = [
    {
        to: "/admin",
        text: "Home"
    },
    {
        to: "/admin/visualizations",
        text: "Visualize"
    },
    {
        to: "/admin/budgets",
        text: "Budgets"
    },
    {
        to: "/admin/tags",
        text: "Tags"
    }
];
