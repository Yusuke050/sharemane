import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { MemberManagement } from './index'
import '../../../globals.css'
import './index.css'

const meta = {
  title: 'Settings/MemberManagement',
  component: MemberManagement,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    members: ['太郎', '花子'],
    onSave: fn(),
  },
} satisfies Meta<typeof MemberManagement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithManyMembers: Story = {
  args: {
    members: ['太郎', '花子', '次郎', '三郎', '四郎'],
  },
}

export const Empty: Story = {
  args: {
    members: [],
  },
}

export const SingleMember: Story = {
  args: {
    members: ['太郎'],
  },
}

