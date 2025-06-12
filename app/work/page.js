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
//                 src="/workpagev2/index.html"
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

'use client';

import React, { useEffect, useState } from 'react';

const Page = () => {
  const [iframeSrc, setIframeSrc] = useState('/workpagev2/index.html');

  useEffect(() => {
    const updateSrc = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setIframeSrc(isMobile ? '/workpagemobile/index.html' : '/workpagev2/index.html');
    };

    updateSrc(); // initial run
    window.addEventListener('resize', updateSrc); // update on resize

    return () => window.removeEventListener('resize', updateSrc);
  }, []);

  return (
    <div
      className="page-content"
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }}
    >
      <iframe
        src={iframeSrc}
        title="Responsive Static HTML"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default Page;

