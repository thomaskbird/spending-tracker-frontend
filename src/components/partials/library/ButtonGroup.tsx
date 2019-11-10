import * as React from "react";
import "./ButtonGroup.scss";

interface ButtonGroupItemProps {
    type: any;
    text: string;
}

interface ButtonGroupProps {
    items: ButtonGroupItemProps[];
    selected: any;
    onSelection(item: any): void;
}

interface State {

}

const COMPONENT_NAME = "ButtonGroup";

export class ButtonGroup extends React.Component<ButtonGroupProps, State> {

    public static readonly displayName = COMPONENT_NAME;

    constructor(props: ButtonGroupProps, context: any) {
        super(props, context);

        this.state = {
        };
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME} centered`}>
                {this.props.items && this.props.items.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => this.props.onSelection(item)}
                        className={`${COMPONENT_NAME}--button ${item.type === this.props.selected ? "active" : ""}`}
                    >
                        {item.text}
                    </button>
                ))}
            </div>
        );
    }
}
