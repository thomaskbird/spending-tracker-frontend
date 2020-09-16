import * as React from "react";
import "./SidebarPartial.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import { User } from "../../services/Models";
import { axiosInstance } from "../../index";
import { connect } from "react-redux";
import { toggleSidebar } from "../../redux/redux-actions";

interface SidebarPartialProps {
    isOpen: boolean;
    toggleSidebar(): void;
}

interface State {
    isLogout: boolean;
    user: User | undefined;
}

const COMPONENT_NAME = "SidebarPartial";

export class SidebarPartial extends React.Component<
    SidebarPartialProps,
    State
> {
    public static readonly displayName = "Sidebar Partial";
    private fileInput: any;

    constructor(props: SidebarPartialProps, context: any) {
        super(props, context);

        this.state = {
            isLogout: false,
            user: undefined
        };
    }

    public componentDidMount(): void {
        const localStorageUser = localStorage.getItem("user");
        if(localStorageUser) {
            this.setState({ user: JSON.parse(localStorageUser)});
        }
    }

    public componentDidUpdate(prevProps: Readonly<SidebarPartialProps>, prevState: Readonly<State>, snapshot?: any): void {
        // console.log("componentDidUpdate", prevProps, this.props);
    }

    public render(): JSX.Element {
        const host = location.hostname;
        const env = host === "localhost" ? `dev` : `api`;
        const imageBaseUrl = `http://budget-${env}.thomaskbird.com`;

        if (this.state.isLogout) {
            return <Redirect to={"/"} />;
        }

        return (
            <div
                className={
                    this.props.isOpen
                        ? `${COMPONENT_NAME} open`
                        : COMPONENT_NAME
                }
            >
                <span
                    className={`${COMPONENT_NAME}--close-btn ${COMPONENT_NAME}--close-btn__sidebar`}
                    onClick={() => {
                        this.props.toggleSidebar();
                    }}
                >
                    <FontAwesomeIcon icon={"times"} />
                </span>

                <div className={`${COMPONENT_NAME}--link-container`}>
                    <div className={`${COMPONENT_NAME}--link-container--top`}>
                        <div className={`${COMPONENT_NAME}--link-container--top__profile`}>
                            {this.state.user ? (
                                <div className={`${COMPONENT_NAME}--link-container--top__profile--image-input`}>
                                    <input
                                        type={"file"}
                                        ref={input => this.fileInput = input}
                                        onChange={event => this.handleUpload(event)}
                                    />
                                    <img
                                        src={`${imageBaseUrl}${this.state.user.profile}`}
                                        alt={`${this.state.user.first_name} ${this.state.user.last_name}`}
                                    />
                                    <span
                                        onClick={() => {
                                            this.fileInput.click();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={"camera"} />
                                    </span>
                                </div>
                            ): (undefined)}
                            <h2>Welcome back, {this.state.user && this.state.user.first_name}!</h2>
                        </div>
                        <ul>
                            {mainNavItems.map((mainNavItem, index) => {
                                return (
                                    <li key={index} onClick={() => this.handleNavigationClick(mainNavItem.to)}>
                                        <Link to={mainNavItem.to}>{mainNavItem.text}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <ul>
                        <li>
                            <Link onClick={() => this.handleNavigationClick("/admin/settings")} to={"/admin/settings"}>Settings</Link>
                        </li>
                        <li>
                            <a onClick={() => {
                                localStorage.removeItem("token");
                                this.setState({ isLogout: true });
                            }}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    private handleNavigationClick(to: string): void {
        if(to === window.location.pathname) {
            this.props.toggleSidebar();
        }
    }

    private handleUpload(event: any):void {
        const data = new FormData();
        data.append("image", event.target.files[0]);

        axiosInstance
            .post(`/upload/profile`, data)
            .then((response) => {
                if(response.status) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.data.user)
                    );
                    this.setState({
                        user: response.data.data.user
                    })
                }
            })
            .catch(error => console.log("error", error));
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

const mapStateToProps = (state: any) => {
    return {
        isOpen: state.ui.sidebarOpen,
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        toggleSidebar: () => dispatch(toggleSidebar()),
    }
};

export const SidebarPartialConnected = connect(mapStateToProps, mapDispatchToProps)(SidebarPartial);
