import React from "react";
import { storiesOf } from "@storybook/react";
import { text, number } from "@storybook/addon-knobs";
import { TagTracker } from "./TagTracker";

storiesOf("TagTracker", module)
    .add("default", () => (
        <TagTracker
        />
    ));