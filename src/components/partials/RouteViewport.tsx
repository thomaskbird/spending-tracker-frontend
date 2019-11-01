import * as React from "react";
import "./RouteViewport.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RouteViewportProps {
    isLoading: boolean;
}

interface State {}

const COMPONENT_NAME = "RouteViewport";

export class RouteViewport extends React.Component<RouteViewportProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: RouteViewportProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                {this.props.children}

                <div className={`${COMPONENT_NAME}__loading ${this.props.isLoading ? "open" : ""}`}>
                    <div className={`${COMPONENT_NAME}__loading--icon`}>
                        <FontAwesomeIcon
                            spin={true}
                            icon={"spinner"}
                        />
                        <h3>Loading</h3>
                    </div>
                </div>
            </div>
        );
    }
}
