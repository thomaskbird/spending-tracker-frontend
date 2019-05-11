import React from "react";
import { storiesOf } from "@storybook/react";
import { TagTracker } from "./TagTracker";
import { TaggableType } from "../../../services/Models";

storiesOf("TagTracker", module).add("default", () => (
    <TagTracker
        type={TaggableType.transaction}
        onToggleTag={() => {
            return true;
        }}
    />
));
