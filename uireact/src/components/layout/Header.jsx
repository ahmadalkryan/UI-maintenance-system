import React from 'react';

const Header = ({ user, onLogout }) => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <h1>���� ����� ����� �������</h1>
                </div>

                <div className="user-info">
                    {user && (
                        <>
                            <span className="user-name">{user.fullName}</span>
                            <span className="user-role">
                                {user.role === 'Employee' ? '����' :
                                    user.role === 'Maintenance' ? '��� �����' : '�����'}
                            </span>
                            <button onClick={onLogout} className="logout-btn">����� ������</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;