import * as React from "react";

interface Props {

}

interface State {

}

export class IsAuthenticated extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}