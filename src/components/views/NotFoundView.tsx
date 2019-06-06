import * as React from "react";
import "./NotFoundView.scss";
import { HeaderPartial } from "../partials/HeaderPartial";
import { SidebarPartial } from "../partials/SidebarPartial";

interface Props {

}

interface State {
    isSidebarOpen: boolean;
}

const COMPONENT_NAME = "NotFoundView";

export class NotFoundView extends React.Component<Props, State> {
    public static readonly displayName = "Sidebar Partial";

    constructor(props: Props, context: any) {
        super(props, context);

        this.state = {
            isSidebarOpen: false
        };
    }

    public render(): JSX.Element {
        return (
            <div className={COMPONENT_NAME}>
                <HeaderPartial
                    onToggleSidebar={() => {
                        this.toggleSidebarPanel(true);
                    }}
                />

                <div className={"BodyPartial"}>
                    <div className={`route--viewport ${COMPONENT_NAME}__content-container`}>

                        <h1>404</h1>

                        <h2>Uh oh, we couldn't find the page you're looking for please try again!</h2>

                    </div>

                    <SidebarPartial
                        sidebarClass={this.state.isSidebarOpen}
                        onClose={() => {
                            this.closeSlidePanels();
                        }}
                    />
                </div>
            </div>
        )
    }

    /**
     * Toggles the sidebar panel
     * @param {boolean} isOpen - Indicates whether the panel should be open
     */
    private toggleSidebarPanel(isOpen: boolean): void {
        this.setState({
            isSidebarOpen: isOpen
        });
    }

    /**
     * Closes the slide panels
     */
    private closeSlidePanels(): void {
        this.setState({
            isSidebarOpen: false
        });
    }
}