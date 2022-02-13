/* eslint-disable prefer-rest-params */
import { useState, useLayoutEffect } from 'react';
import inBrowser from 'src/utils/in-browser';

const debounce = function (fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    };
};

export default function useWindowSize() {
    const [dimensions, setDimensions] = useState({
        height: inBrowser ? window.innerHeight : null,
        width: inBrowser ? window.innerWidth : null,
    });

    useLayoutEffect(() => {
        const debouncedHandleResize = debounce(() => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }, 500);

        window.addEventListener('resize', debouncedHandleResize);

        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    });

    return dimensions;
}
