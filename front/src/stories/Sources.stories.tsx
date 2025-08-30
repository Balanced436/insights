import { StoryFn } from "@storybook/react";
import SourceForm from "../components/forms/SourceForm.tsx";
import { fn } from "@storybook/test";
import Sources from "../components/Sources.tsx";
import sourcesExemple from "../__tests__/fixtures/sources.exemple";
import Source from "../models/source.ts";

const meta = {
    title: "source/Sources",
    component: Sources,
    tags: ["autodocs"],
    args: {onSubmit: fn()},
};

export default meta;

const Template: StoryFn<typeof SourceForm> = (args) => (
    <Sources

        onSourceSelection={function (source: Source): void {
            throw new Error("Function not implemented.");
        }} sources={sourcesExemple}
        {...args}  />
);

export const Standard = Template.bind({});
