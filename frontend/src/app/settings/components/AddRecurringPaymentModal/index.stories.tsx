import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { AddRecurringPaymentModal } from './index'
import '../../../globals.css'
import './index.css'

const meta = {
  title: 'Settings/AddRecurringPaymentModal',
  component: AddRecurringPaymentModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: fn(),
    onSubmit: fn(),
    members: ['太郎', '花子'],
  },
} satisfies Meta<typeof AddRecurringPaymentModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Closed: Story = {
  args: {
    isOpen: false,
  },
}

export const WithThreeMembers: Story = {
  args: {
    isOpen: true,
    members: ['太郎', '花子', '次郎'],
  },
}

