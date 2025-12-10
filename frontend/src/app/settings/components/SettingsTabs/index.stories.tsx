import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { SettingsTabs } from './index'
import '../../../globals.css'
import './index.css'

const meta = {
  title: 'Settings/SettingsTabs',
  component: SettingsTabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    activeTab: 'members',
    onTabChange: fn(),
  },
} satisfies Meta<typeof SettingsTabs>

export default meta
type Story = StoryObj<typeof meta>

export const MembersActive: Story = {
  args: {
    activeTab: 'members',
  },
}

export const CategoriesActive: Story = {
  args: {
    activeTab: 'categories',
  },
}

export const RecurringActive: Story = {
  args: {
    activeTab: 'recurring',
  },
}

