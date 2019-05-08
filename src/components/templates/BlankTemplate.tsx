import * as React from "react";
import "./pathToFile.scss";

interface BlankTemplateProps {}

interface State {}

const COMPONENT_NAME = "BlankTemplate";

export class BlankTemplate extends React.Component<BlankTemplateProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: BlankTemplateProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return <div className={COMPONENT_NAME} />;
    }
}
