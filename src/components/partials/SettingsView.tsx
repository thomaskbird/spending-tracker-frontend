import * as React from "react";
import { HeaderPartial } from "./HeaderPartial";
import { SidebarPartial } from "./SidebarPartial";

interface SettingsViewProps {}

interface State {
    isSidebarOpen: boolean;
}

const COMPONENT_NAME = "SettingsView";

export class SettingsView extends React.Component<SettingsViewProps, State> {
    public static readonly displayName = COMPONENT_NAME;

    constructor(props: SettingsViewProps, context: any) {
        super(props, context);

        this.state = {
            isSidebarOpen: false
        };
    }

    public render(): JSX.Element {
        return (
            <div className={`${COMPONENT_NAME} PageView`}>
                <HeaderPartial
                    onToggleSidebar={() => {
                        this.toggleSidebarPanel(true);
                    }}
                />

                <div className={"BodyPartial"}>
                    <div className={"route--viewport"}>

                        SETTINGS

                    </div>

                    <SidebarPartial
                        sidebarClass={this.state.isSidebarOpen}
                        onClose={() => {
                            this.closeSlidePanels();
                        }}
                    />
                </div>
            </div>
        );
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
