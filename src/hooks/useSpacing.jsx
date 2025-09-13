import { useState } from 'react';

const defaultX = 40;
const defaultY = 80;

const useSpacing = () => {
    const [xSpacing, setXSpacing] = useState(defaultX);
    const [ySpacing, setYSpacing] = useState(defaultY);

    const resetSpacing = () => {
        setXSpacing(defaultX);
        setYSpacing(defaultY);
    }

    return { xSpacing, ySpacing, setXSpacing, setYSpacing, resetSpacing };
}

export default useSpacing;