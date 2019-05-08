import React from "react";
import { storiesOf } from "@storybook/react";
import { text, number } from "@storybook/addon-knobs";
import { BudgetDial } from "./BudgetDial";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faPlus,
    faHome,
    faBriefcase,
    faBook,
    faFile,
    faPrint,
    faFilePdf,
    faCalendarAlt,
    faDollarSign,
    faCog,
    faEnvelope,
    faLock,
    faCar
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faPlus,
    faHome,
    faBriefcase,
    faBook,
    faFile,
    faPrint,
    faFilePdf,
    faCalendarAlt,
    faDollarSign,
    faCog,
    faEnvelope,
    faLock,
    faCar
);

storiesOf("BudgetDial", module).add("default", () => (
    <BudgetDial
        icon={text("Icon", "car")}
        title={text("Title", "Automotive Care")}
        budgetFigures={{
            used: number("Used", 350),
            budgetTotal: number("Budget total", 500)
        }}
    />
));
