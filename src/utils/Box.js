import React from 'react';
import { createRoot } from 'react-dom/client';
import BoxNotication from '~/components/helper/BoxNotication';
function Box(open, message = "Test", timeout = 3000, type = 'error') {
    console.log(message);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        open = false;
    };

    // Tìm root container trong DOM
    const root = document.getElementById('root');
    
    // Kiểm tra xem đã có container cho BoxNotication chưa
    let boxContainer = document.getElementById('box-container');
    if (!boxContainer) {
        // Nếu chưa có, tạo mới
        boxContainer = document.createElement('div');
        boxContainer.id = 'box-container';
        root.appendChild(boxContainer); // Thêm container mới vào root
    }

    // Sử dụng React để render BoxNotication vào container mới
    const newRoot = createRoot(boxContainer);
    newRoot.render(
      <div className='h-8 w-8 bg-red-700 absolute top-[50px] right-8' >
        <h1>
            Thông báo
        </h1>
      </div>
    );
    
}

export default Box;
