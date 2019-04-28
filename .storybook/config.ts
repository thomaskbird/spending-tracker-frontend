/**
 * Storybook configuration
 */
import "@storybook/addon-console";
import * as Storybook from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";

// Enable "knobs" in all stories
Storybook.addDecorator(withKnobs);

// Storybook's styles need some improvement. This styling is unrelated to the
// project's styles and are not essential for Storybook's functionality.
Storybook.addDecorator(
    withInfo({
        inline: true,
        styles: {
            header: {
                body: {
                    border: 0,
                    margin: 0,
                    padding: 0
                },
                h1: {
                    fontSize: "18px",
                    fontWeight: 400,
                    lineHeight: 1,
                    margin: "0 0 4px",
                    padding: 0
                },
                h2: {
                    fontSize: "24px",
                    fontWeight: 700,
                    lineHeight: 1.25,
                    margin: 0,
                    padding: 0
                }
            },
            infoBody: {
                border: 0,
                fontFamily: "'Open Sans', 'Arial', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                margin: 0,
                padding: "16px"
            },
            infoContent: {
                fontSize: "14px",
                margin: 0,
                padding: 0
            },
            infoStory: {
                backgroundColor: "#FFF",
                backgroundImage:
                    "linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(-45deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f5f5f5 75%), linear-gradient(-45deg, transparent 75%, #f5f5f5 75%)",
                backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                backgroundSize: "16px 16px",
                margin: "16px",
                padding: 0
            },
            jsxInfoContent: {
                margin: 0,
                padding: 0
            },
            propTableHead: {
                fontSize: "14px",
                fontWeight: 400,
                margin: "4px 0 8px",
                padding: 0
            },
            source: {
                h1: {
                    border: 0,
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: 1,
                    margin: "24px 0 0",
                    padding: 0
                }
            }
        }
    })
);

const requireStorybook = require.context("./", true, /.stories.tsx?$/);
const requireSrc = require.context("../src", true, /.stories.tsx?$/);

Storybook.configure(() => {
    requireStorybook.keys().forEach((filename) => requireStorybook(filename));
    requireSrc.keys().forEach((filename) => requireSrc(filename));
}, module);
