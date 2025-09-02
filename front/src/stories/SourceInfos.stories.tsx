import { StoryFn } from "@storybook/react";
import SourceForm from "../components/forms/SourceForm.tsx";
import { fn } from "@storybook/test";
import sourcesExemple from "../__tests__/fixtures/sources.exemple";
import {SourceInfos} from "../components/Source/Source.tsx";

const meta = {
    title: "source/SourceInfos",
    component: SourceInfos,
    tags: ["autodocs"],
    args: {onSubmit: fn()},
};

export default meta;

const Template: StoryFn<typeof SourceForm> = (args) => (
    <SourceInfos

        source={sourcesExemple[0]}
        {...args}  />
);

export const Standard = Template.bind({});
