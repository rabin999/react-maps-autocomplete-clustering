import React from 'react'
import { User } from '../data/users'
import './UserCard.css'

interface UserCardProps {
    user: User
    onClose: () => void
}

const UserCard: React.FC<UserCardProps> = ({ user, onClose }) => {
    return (
        <div className="user-card-overlay">
            <div className="user-card compact">
                <div className="card-header-compact">
                    <img src={user.avatar} alt={user.name} className="user-avatar-compact" />
                    <div className="user-info-compact">
                        <h3 className="user-name-compact">{user.name}</h3>
                        <div className="user-rating-compact">
                            <span className="star-icon">★</span>
                            <span>{user.rating}</span>
                        </div>
                    </div>
                    <button className="close-button-compact" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="user-skills-compact">
                    {user.skills.slice(0, 4).map((skill, index) => (
                        <span key={index} className="skill-chip-compact">
                            {skill}
                        </span>
                    ))}
                    {user.skills.length > 4 && <span className="skill-chip-compact">+{user.skills.length - 4}</span>}
                </div>
            </div>
        </div>
    )
}

export default React.memo(UserCard)
