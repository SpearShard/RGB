// import React from 'react';

// const page = () => {
//     return (
//         <div className="page-content" style={{ 
//             width: '100%', 
//             height: '100%', 
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             overflow: 'hidden'
//         }}>
//             <iframe
//                 src="/landing_page/index.html"
//                 title="Static HTML"
//                 style={{ 
//                     width: '100%', 
//                     height: '100%', 
//                     border: 'none',
//                     position: 'absolute',
//                     top: 0,
//                     left: 0
//                 }}
//             />
//         </div>
//     );
// };

// export default page;


"use client"
import React, { useEffect } from 'react';

const Page = () => {
    useEffect(() => {
        // Add a class to the body when the landing page is loaded in an iframe
        const message = { type: 'LANDING_PAGE_LOADED' };
        window.parent.postMessage(message, '*');
    }, []);

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
                src="/landing_page/index.html"
                title="RGB Design Studio"
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
                loading="eager"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
        </div>
    );
};

export default Page;
