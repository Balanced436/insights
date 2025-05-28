import { StoryFn } from "@storybook/react";
import LoginForm from "../components/forms/LoginForm.tsx";
import { fn } from "@storybook/test";

const meta = {
  title: "Form/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  args: { onSubmit: fn() },
};

export default meta;

const Template: StoryFn<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Standard = Template.bind({});
Standard.args = { variant: "standard" };

export const Outlined = Template.bind({});
Outlined.args = { variant: "outlined" };

export const Filled = Template.bind({});
Filled.args = { variant: "filled" };
