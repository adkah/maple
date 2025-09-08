import { useState } from 'react';

const defaultX = 40;
const defaultY = 80;

const useSpacing = () => {
    const [xSpacing, setXSpacing] = useState(defaultX);
    const [ySpacing, setYSpacing] = useState(defaultY);

    return { xSpacing, ySpacing, setXSpacing, setYSpacing };
}

export default useSpacing;