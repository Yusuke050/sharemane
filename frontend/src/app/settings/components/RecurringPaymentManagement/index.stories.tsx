import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { RecurringPaymentManagement } from './index'
import '../../../globals.css'
import './index.css'

const meta = {
  title: 'Settings/RecurringPaymentManagement',
  component: RecurringPaymentManagement,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    payments: [],
    onAddClick: fn(),
  },
} satisfies Meta<typeof RecurringPaymentManagement>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithPayments: Story = {
  args: {
    payments: [
      {
        id: 1,
        paidBy: '太郎',
        amount: 50000,
        category: '家賃',
        frequency: 'monthly',
        memo: '家賃',
      },
      {
        id: 2,
        paidBy: '花子',
        amount: 5000,
        category: '光熱費',
        frequency: 'monthly',
        memo: '電気代',
      },
    ],
  },
}

