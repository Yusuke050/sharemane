import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { CategoryManagement } from './index'
import '../../../globals.css'
import './index.css'

const defaultCategories = [
  '食費',
  '日用品',
  '交通費',
  '娯楽',
  '光熱費',
  '家賃',
  '医療',
  'その他',
  '交際費',
]

const meta = {
  title: 'Settings/CategoryManagement',
  component: CategoryManagement,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    categories: defaultCategories,
    onSave: fn(),
  },
} satisfies Meta<typeof CategoryManagement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithFewCategories: Story = {
  args: {
    categories: ['食費', '交通費', '娯楽'],
  },
}

export const Empty: Story = {
  args: {
    categories: [],
  },
}

export const SingleCategory: Story = {
  args: {
    categories: ['食費'],
  },
}

