import { StoryFn } from "@storybook/react";
import { fn } from "@storybook/test";
import Corpus from "../components/Corpus";

const meta = {
    title: "Form/Corpus",
    component: Corpus,
    tags: ['autodocs'],
    args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof Corpus> = (args) => <Corpus {...args} />;

export const Standard = Template.bind({})
