import * as React from "react";
import "./IconPicker.scss";
import { $enum } from "ts-enum-util";
import { AvailableIcons } from "../../services/Models";

interface Props {

}

interface State {
    filterText: string;
}

const COMPONENT_NAME = "IconPicker";

export class IconPicker extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            filterText: ""
        };

        const iconsList = $enum(AvailableIcons).getValues();

        console.log("iconsList", iconsList);
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <div className={`${COMPONENT_NAME}__filter`}>
                    <input
                        type={"text"}
                        name={"filter"}
                        id={"filter"}
                        onChange={(e: any) => {
                            this.setState({ filterText: e.target.value });
                        }}
                    />
                </div>
                <div className={`${COMPONENT_NAME}__icon-preview`}>
                    test
                </div>
            </div>
        );
    }
}