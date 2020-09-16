import React from "react";
import { Redirect } from "react-router";
import "./AuthWrapper.scss";

interface Props {
}

interface State {
    isLoggedIn: boolean;
}

const COMPONENT_NAME = "AuthWrapper";

export class AuthWrapper extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            isLoggedIn: true,
        };
    }

    public componentDidMount(): void {
        const authResponse = async () => {
            const auth = await this.checkAuth();
            this.setState({ isLoggedIn: auth });
        };

        authResponse();
    }

    public render(): JSX.Element {
        if(!this.state.isLoggedIn) {
            return <Redirect to={"/"} />
        }

        return (
            <div className={`${COMPONENT_NAME}`}>
                {this.props.children}
            </div>
        );
    }

    private async checkAuth(): Promise<boolean> {
        if(await localStorage.getItem("token")) {
            return Promise.resolve(true);
        }

        return Promise.resolve(false);
    }
}
