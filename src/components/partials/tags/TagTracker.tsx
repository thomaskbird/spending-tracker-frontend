import * as React from "react";
import "./TagTracker.scss";

interface Props {

}

interface State {

}

const COMPONENT_NAME = "TagTracker";

export class TagTracker extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <form className={`${COMPONENT_NAME}__add-wrapper`}>
                    <div className={"FormGroup"}>
                        <div className={"FormGroup--input-indicator"}>
                            <input
                                type="text"
                                name="amount"
                                id={"amount"}
                                placeholder={"Enter amount..."}
                            />
                            <span className={"FormGroup--input-indicator"}>
                                <button type={"submit"} className={"btn btn-primary"}>
                                    Add
                                </button>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}