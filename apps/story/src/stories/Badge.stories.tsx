import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Badge, BadgeVariant } from '@components/Badge';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Data Display/Badge',
  component: Badge,
  argTypes: {
    variant: {
      options: Object.values(BadgeVariant),
      control: { type: 'select' },
    },
    as: {
      control: { type: 'string' },
    },
    children: {
      control: { type: 'string' },
    },
    textClassName: {
      options: ['u-textDark', 'u-textWhite', 'u-textWarning', 'u-textPositive', 'u-textNegative', ''],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Badge>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Control = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Control.args = {
  variant: BadgeVariant.PRIMARY,
  children: 'Badge',
};
