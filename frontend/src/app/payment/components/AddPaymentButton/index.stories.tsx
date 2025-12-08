import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { AddPaymentButton } from './index'
import '../../../globals.css'
import './index.css'

const meta = {
  title: 'Payment/AddPaymentButton',
  component: AddPaymentButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof AddPaymentButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

