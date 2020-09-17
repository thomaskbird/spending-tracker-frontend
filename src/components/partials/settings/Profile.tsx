import * as React from "react";
import "./Profile.scss";
import { User } from "../../../services/Models";

interface ProfileProps {
}

interface State {
    user: User;
}

const COMPONENT_NAME = "Profile";

export class Profile extends React.Component<
    ProfileProps,
    State
> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: ProfileProps, context: any) {
        super(props, context);

        this.state = {
            user: JSON.parse(localStorage.getItem("user") as any)
        };

        console.log("user", this.state.user);
    }

    public render(): JSX.Element {

        return (
            <div
                className={`${COMPONENT_NAME}`}
            >
                <h2>Profile: {this.state.user.first_name} {this.state.user.last_name}</h2>

                <div className={`${COMPONENT_NAME}__detail`}>
                    <p>Email:</p>
                    <h5>{this.state.user.email}</h5>
                </div>

                <div className={`${COMPONENT_NAME}__detail`}>
                    <p>Created:</p>
                    <h5>{this.state.user.created_at}</h5>
                </div>
            </div>
        );
    }
}
