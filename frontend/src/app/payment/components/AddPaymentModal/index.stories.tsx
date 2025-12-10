import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { AddPaymentModal } from './index'
import '../../../globals.css'
import './index.css'

const meta = {
  title: 'Payment/AddPaymentModal',
  component: AddPaymentModal,
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
} satisfies Meta<typeof AddPaymentModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithThreeMembers: Story = {
  args: {
    isOpen: true,
    members: ['太郎', '花子', '次郎'],
  },
}

export const WithManyMembers: Story = {
  args: {
    isOpen: true,
    members: ['太郎', '花子', '次郎', '三郎', '四郎'],
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
  },
}

