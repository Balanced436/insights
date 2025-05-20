import { StoryFn } from "@storybook/react";
import Login from "../components/Login";
import { fn } from "@storybook/test";

const meta = {
    title: "UI/Login",
    component: Login,
    tags: ['autodocs'],
    args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof Login> = (args) => <Login {...args} />;

export const Standard = Template.bind({})
Standard.args = {variant : "standard"}


export const Outlined = Template.bind({})
Outlined.args = {variant : "outlined"}

export const Filled = Template.bind({})
Filled.args = {variant : "filled"}