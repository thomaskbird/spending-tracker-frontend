import * as React from "react";
import "./BudgetDial.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    BudgetDialCustomColors,
    BudgetFigures
} from "../../../services/Models";

interface BudgetDialViewProps {
    title: string;
    icon: any;
    budgetFigures: BudgetFigures;
    customColors?: BudgetDialCustomColors;
}

interface State {
    percent: number | undefined;
    percentDegrees: number | undefined;
}

const COMPONENT_NAME = "BudgetDial";

export class BudgetDial extends React.Component<BudgetDialViewProps, State> {
    public static readonly displayName = "BudgetDialView";

    constructor(props: BudgetDialViewProps, context: any) {
        super(props, context);

        this.state = {
            percent: undefined,
            percentDegrees: undefined
        };
    }

    public componentDidMount(): void {
        this.calculateData();
    }

    public componentDidUpdate(prevProps: Readonly<BudgetDialViewProps>): void {
        if(prevProps.budgetFigures.used !== this.props.budgetFigures.used || prevProps.budgetFigures.budgetTotal !== this.props.budgetFigures.budgetTotal) {
            this.calculateData();
        }
    }

    public render(): JSX.Element {
        const colors = {
            start: "orange",
            end: "red"
        };

        if (this.props.customColors) {
            colors.start = this.props.customColors.start;
            colors.end = this.props.customColors.end;
        }

        return (
            <div
                className={COMPONENT_NAME}
                onClick={() => {
                    this.popupInfoDialogue();
                }}
            >
                <div className={`${COMPONENT_NAME}__dial--border`}>
                    <div
                        className={`${COMPONENT_NAME}__dial`}
                        style={{
                            background: `conic-gradient(${colors.start} 0deg, ${
                                colors.end
                            } ${this.state.percentDegrees}deg, white ${
                                this.state.percentDegrees
                            }deg, white 360deg)`
                        }}
                    >
                        <div className={`${COMPONENT_NAME}__dial--icon`}>
                            <FontAwesomeIcon icon={this.props.icon} />
                        </div>
                    </div>
                </div>

                <div className={`${COMPONENT_NAME}__text`}>
                    <h3
                        style={{
                            background: `-webkit-linear-gradient(${
                                colors.start
                            }, ${colors.end})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        {this.props.title}
                    </h3>
                    <p className={`${COMPONENT_NAME}__text--subtext`}>
                        {this.state.percent}% of budget
                    </p>
                </div>
            </div>
        );
    }

    private popupInfoDialogue(): void {
        alert(`${this.state.percent}% of budget`);
    }

    private calculateData(): void {
        const percent = this.props.budgetFigures.used ?
            this.props.budgetFigures.used /
            this.props.budgetFigures.budgetTotal : 0;

        this.setState({
            percent: Math.round(percent * 100),
            percentDegrees: percent * 360
        });
    }
}
