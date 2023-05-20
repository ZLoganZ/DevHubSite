import React from 'react';
import { Input, Select } from 'antd';

interface GroupChatModalProps {
  users: any;
  setValue: (value: any) => void;
  setName: (name: any) => void;
}

const GroupChatModal = (Props: GroupChatModalProps) => {
  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <p className="mt-1 text-sm leading-6 text-gray-300">Create a chat with more than 2 people.</p>
        <div className="mt-10 flex flex-col gap-y-8">
          <Input
            placeholder={`Group's name`}
            allowClear
            onChange={(event) => {
              Props.setName(event.currentTarget.value);
            }}
          />
          <Select
            mode="multiple"
            placeholder="Select members"
            options={Props.users.map((user: any) => ({
              label: user.username,
              value: user.username,
              id: user._id,
            }))}
            onChange={(value, options) => {
              options.forEach((option: any, index: any) => {
                value[index] = option.id;
              });
              Props.setValue(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;
