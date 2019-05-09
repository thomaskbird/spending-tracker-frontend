import * as React from "react";
import "./IconPicker.scss";
import { $enum } from "ts-enum-util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AvailableIcons } from "../../services/Models";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
    val?: string;
}

interface State {
    filterText: string;
    isOpen: boolean;
}

const COMPONENT_NAME = "IconPicker";

const iconsList: any = $enum(AvailableIcons).getValues();

export class IconPicker extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            filterText: this.props.val || "",
            isOpen: false
        };
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <div className={`${COMPONENT_NAME}__filter FormGroup`}>
                    <div className={"FormGroup--input-indicator"}>
                        <span
                            className={"FormGroup--input-indicator-icon"}
                            onClick={() => {
                                this.setState({
                                    isOpen: !this.state.isOpen
                                })
                            }}
                        >
                            <FontAwesomeIcon icon={this.state.isOpen ? "chevron-up" : "chevron-down"} />
                        </span>
                        {this.state.filterText ? (
                            <span
                                className={"FormGroup--input-indicator-icon"}
                            >
                                <FontAwesomeIcon icon={this.state.filterText as IconProp} />
                            </span>
                        ) : (undefined)}
                        <input
                            type={"text"}
                            name={"filter"}
                            id={"filter"}
                            placeholder={"Select icon below..."}
                            value={this.state.filterText}
                            onChange={(e: any) => {
                                this.setState({ filterText: e.target.value });
                            }}
                            onFocus={() => {
                                this.setState({ isOpen: true });
                            }}
                            onBlur={() => {
                                console.log("blur");
                            }}
                        />
                        {this.state.filterText ? (
                            <span
                                className={`${COMPONENT_NAME}__filter--clear-btn`}
                                onClick={() => { this.setState({ filterText: "" })}}
                            >
                                <FontAwesomeIcon icon={"times"} />
                            </span>
                        ): (undefined)}
                    </div>
                </div>
                <div className={`${COMPONENT_NAME}__icon-preview ${this.state.isOpen ? "open" : ""}`}>
                    {iconsList.map((icon: any, index: number) => {
                        if(!this.state.filterText || icon.includes(this.state.filterText)) {
                            return (
                                <div
                                    key={index}
                                    className={`${COMPONENT_NAME}__icon-preview--icon`}
                                    onClick={() => {
                                        this.handleIconClick(icon);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={icon}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }

    private handleIconClick(icon: string): void {
        this.setState({
            filterText: icon,
            isOpen: false
        });
    }
}