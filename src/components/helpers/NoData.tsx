import * as React from "react";

interface Props {
    type: string;
}

export class NoData extends React.Component<Props> {
    constructor(props: Props, context: any) {
        super(props, context);
    }

    public render(): JSX.Element {
        return (
            <p
                style={{
                    margin: "40px auto",
                    width: "fit-content"
                }}
            >No {this.props.type}, try changing the ranges...</p>
        )
    }
}