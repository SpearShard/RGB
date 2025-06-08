import React from 'react';

const page = () => {
    return (
        <div className="page-content" style={{ 
            width: '100%', 
            height: '100%', 
            position: 'fixed',
            top: 0,
            left: 0,
            overflow: 'hidden'
        }}>
            <iframe
                src="/workpagev2/index.html"
                title="Static HTML"
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            />
        </div>
    );
};

export default page;
