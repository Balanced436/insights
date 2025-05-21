import { StoryFn } from "@storybook/react";
import Source from "../components/Source";
import { fn } from "@storybook/test";

const meta = {
    title: "Form/Source",
    component: Source,
    tags: ['autodocs'],
    args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof Source> = (args) => <Source {...args} />;

export const Standard = Template.bind({})