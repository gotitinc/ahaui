import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ChatBox from 'components/ChatBox';
import Avatar from 'components/Avatar';
import BubbleChat from 'components/BubbleChat';
import FileAttachment from 'components/FileAttachment';
import SafeAnchor from 'components/SafeAnchor';
import Separator from 'components/Separator';
import Badge from 'components/Badge';
import Icon from 'components/Icon';
import Message from 'components/Message';

export default {
  title: 'ChatBox',
  component: ChatBox,
  argTypes: {
    ref: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="u-flex u-backgroundOpaline" style={{ height: '80vh' }}>
        <div className="u-flexShrink0 u-border u-backgroundWhite u-flex" style={{ width: 360 }}>
          <Story />
        </div>
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatBox>;

const Template : ComponentStory<typeof ChatBox> = (args) => (
  <ChatBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <ChatBox.List>
        <BubbleChat
          text="System message"
          avatar={(() => <Avatar size="small" className="u-backgroundPrimary u-textWhite u-text100" text="EC" />)}
          type="system"
        />
        <BubbleChat
          text="This is a System message with Options."
          avatar={(() => <Avatar size="small" className="u-backgroundPrimary u-textWhite u-text100" text="EC" />)}
          type="system"
          currentOption={1}
          onSelectOption={() => {}}
          options={[
            {
              name: 'Option 1',
              id: 1,
            },
            {
              name: 'Option 2',
              id: 2,
            },
          ]}
        />
        <BubbleChat
          text="This is a System message with Options."
          avatar={(() => <Avatar size="small" className="u-backgroundPrimary u-textWhite u-text100" text="EC" />)}
          type="system"
          currentOption={1}
          disabledOption
          options={[
            {
              name: 'Option 1',
              id: 1,
            },
            {
              name: 'Option 2',
              id: 2,
            },
          ]}
        />
        <BubbleChat
          text="Sender message"
          time="11:23"
          onSelectOption={() => {}}
        />
        <BubbleChat
          text="This is an example for multiple lines or paragraph Sender message."
          time="11:24"
        />
        <BubbleChat
          time="11:25"
        >
          <FileAttachment
            fileType="spreadsheet"
            fileName="DS-File-name-here-11-12-2019-crazy-designer.xlsx"
            closeButton={false}
            actionRight={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Download</SafeAnchor>}
          />
        </BubbleChat>
        <BubbleChat
          time="11:26"
        >
          <FileAttachment
            fileType="image"
            fileName="DS-File-name-here-11-12-2019-crazy-designer.png"
            closeButton={false}
            actionLeft={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Preview</SafeAnchor>}
            actionRight={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Download</SafeAnchor>}
          />
        </BubbleChat>
        <BubbleChat
          text="File attachment message"
          time="11:27"
        />
        <BubbleChat
          text="Reviser message"
          type="outbound"
          avatar={(() => <Avatar size="small" className="u-backgroundPrimaryLighter u-textPrimary u-text100" text="KT" />)}
          time="11:28"
        />
        <Separator label="Light" className="u-marginBottomSmall" variant="light" lineType="dashed" />
        <BubbleChat
          text="This is an example for multiple lines or paragraph Outbound message."
          type="outbound"
          avatar={(() => <Avatar size="small" className="u-backgroundPrimaryLighter u-textPrimary u-text100" text="KT" />)}
          time="11:29"
        />
        <BubbleChat
          type="outbound"
          avatar={(() => <Avatar size="small" className="u-backgroundPrimaryLighter u-textPrimary u-text100" text="KT" />)}
          time="11:30"
        >
          <FileAttachment
            fileType="spreadsheet"
            fileName="DS-File-name-here-11-12-2019-crazy-designer.xlsx"
            closeButton={false}
            actionRight={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Download</SafeAnchor>}
          />
        </BubbleChat>
        <BubbleChat
          type="outbound"
          avatar={(() => <Avatar size="small" className="u-backgroundPrimaryLighter u-textPrimary u-text100" text="KT" />)}
          time="11:31"
        >
          <FileAttachment
            fileType="image"
            fileName="DS-File-name-here-11-12-2019-crazy-designer.png"
            closeButton={false}
            actionLeft={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Preview</SafeAnchor>}
            actionRight={() => <SafeAnchor className="hover:u-textDecorationNone u-block">Download</SafeAnchor>}
          />
        </BubbleChat>
        <BubbleChat
          text="File attachment message"
          type="outbound"
          avatar={(() => <Avatar size="small" className="u-backgroundPrimaryLighter u-textPrimary u-text100" text="KT" />)}
          time="11:32"
        />
        <BubbleChat
          isTyping
          type="outbound"
          avatar={(() => <Avatar size="small" className="u-backgroundPrimaryLighter u-textPrimary u-text100" text="KT" />)}
          time="11:33"
        />
      </ChatBox.List>
      <ChatBox.Context>
        <ChatBox.Notice>
          <Badge variant="black" className="u-alignItemsCenter u-cursorPointer">
            1 new message
            <Icon name="arrowDropdownCircle" className="u-marginLeftTiny" size="tiny" />
          </Badge>
        </ChatBox.Notice>
        <ChatBox.Info>
          <Separator className="u-cursorPointer u-paddingHorizontalExtraSmall u-marginBottomTiny" label="Primary" variant="primary" lineType="dashed" />
          <Message show={false} variant="information" type="system" dismissible onClose={() => {}}>
            <Message.Container>
              Message inside ChatBox
            </Message.Container>
          </Message>
          <ChatBox.Attachment>
            <FileAttachment
              fileName="Bitmap.bmp"
              fileType="image"
            />
            <FileAttachment
              fileName="Bitmap.bmp"
              fileType="image"
            />
          </ChatBox.Attachment>
        </ChatBox.Info>

      </ChatBox.Context>
    </>
  ),
};
