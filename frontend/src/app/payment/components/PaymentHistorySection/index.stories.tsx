import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { PaymentHistorySection } from './index'
import '../../../globals.css'
import './index.css'

const meta = {
  title: 'Payment/PaymentHistorySection',
  component: PaymentHistorySection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onDelete: fn(),
  },
} satisfies Meta<typeof PaymentHistorySection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    history: [
      {
        id: 1,
        category: '交際費',
        amount: 500,
        description: '500',
        paidBy: '太郎',
        date: '12/1',
      },
      {
        id: 2,
        category: '家賃',
        amount: 3,
        description: '',
        paidBy: '太郎',
        date: '12/1',
      },
      {
        id: 3,
        category: '家賃',
        amount: 100000,
        description: '',
        paidBy: '太郎',
        date: '12/1',
      },
      {
        id: 4,
        category: '食費',
        amount: 5000,
        description: 'スーパーで買い物',
        paidBy: '太郎',
        date: '12/2',
      },
      {
        id: 5,
        category: '光熱費',
        amount: 15000,
        description: '電気代',
        paidBy: '花子',
        date: '12/3',
      },
      {
        id: 6,
        category: '通信費',
        amount: 8500,
        description: '携帯料金',
        paidBy: '太郎',
        date: '12/5',
      },
    ],
  },
}

