'use client'

import './index.css'

type Props = {
  selectedTarget: 'all' | string
  members: string[]
  onTargetChange: (target: 'all' | string) => void
}

export function DisplayTargetFilter({
  selectedTarget,
  members,
  onTargetChange,
}: Props) {
  return (
    <div className="display-target-filter">
      <label className="filter-label">表示対象</label>
      <div className="filter-buttons">
        <button
          className={`filter-button ${selectedTarget === 'all' ? 'selected' : ''}`}
          onClick={() => onTargetChange('all')}
        >
          全員
        </button>
        {members.map((member) => (
          <button
            key={member}
            className={`filter-button ${
              selectedTarget === member ? 'selected' : ''
            }`}
            onClick={() => onTargetChange(member)}
          >
            {member}
          </button>
        ))}
      </div>
    </div>
  )
}

