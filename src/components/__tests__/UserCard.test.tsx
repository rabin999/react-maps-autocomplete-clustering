import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserCard from '../UserCard'
import { User } from '../../data/users'

const mockUser: User = {
    id: 1,
    name: 'Test User',
    avatar: 'https://example.com/avatar.jpg',
    rating: 4.5,
    skills: ['React', 'TypeScript', 'Node.js', 'CSS', 'HTML'],
    location: { lat: 27.7, lng: 85.3 }
}

describe('UserCard', () => {
    const mockOnClose = vi.fn()

    it('renders user information correctly', () => {
        render(<UserCard user={mockUser} onClose={mockOnClose} />)

        expect(screen.getByText('Test User')).toBeInTheDocument()
        expect(screen.getByText('4.5')).toBeInTheDocument()
        expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    })

    it('renders skills (limited to 4 + count)', () => {
        render(<UserCard user={mockUser} onClose={mockOnClose} />)

        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('TypeScript')).toBeInTheDocument()
        expect(screen.getByText('Node.js')).toBeInTheDocument()
        expect(screen.getByText('CSS')).toBeInTheDocument()

        // The 5th skill 'HTML' should be hidden behind a count badge
        expect(screen.queryByText('HTML')).not.toBeInTheDocument()
        expect(screen.getByText('+1')).toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        render(<UserCard user={mockUser} onClose={mockOnClose} />)

        const closeButton = screen.getByRole('button')
        fireEvent.click(closeButton)

        expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('has compact styling classes', () => {
        const { container } = render(<UserCard user={mockUser} onClose={mockOnClose} />)
        expect(container.querySelector('.user-card')).toHaveClass('compact')
    })
})
