import { StoryFn } from "@storybook/react";
import SourceForm from "../components/forms/SourceForm.tsx";
import { fn } from "@storybook/test";

const meta = {
    title: "Form/SourceForm",
    component: SourceForm,
    tags: ['autodocs'],
    args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof SourceForm> = (args) => <SourceForm {...args} />;

export const Standard = Template.bind({})