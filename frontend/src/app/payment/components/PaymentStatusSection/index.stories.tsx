import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PaymentStatusSection } from './index'
import '../../../globals.css'
import './index.css'

const meta = {
  title: 'Payment/PaymentStatusSection',
  component: PaymentStatusSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PaymentStatusSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    members: [
      {
        userId: 1,
        userName: '太郎',
        totalPaid: 251003,
        balance: 124752,
      },
      {
        userId: 2,
        userName: '花子',
        totalPaid: 1500,
        balance: -124751,
      },
    ],
    totalExpense: 252503,
    perPerson: 126252,
  },
}

