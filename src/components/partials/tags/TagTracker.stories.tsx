import React from "react";
import { storiesOf } from "@storybook/react";
import { TagTracker } from "./TagTracker";
import { TagType } from "../../../services/Models";

storiesOf("TagTracker", module)
    .add("default", () => (
        <TagTracker
            type={TagType.transaction}
        />
    ));