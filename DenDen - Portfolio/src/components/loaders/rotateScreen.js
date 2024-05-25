import React, { useState, useEffect } from 'react';
import "../styles/loader/main.css"
import { setDocumentMode } from '../../functions/lightModeFunctions';

const RotateScreen = () => {
    const [lightMode, setLightMode] = useState(undefined);

    useEffect(() => {
        setDocumentMode(setLightMode);
    }, []);

    return (
        lightMode !== undefined ? (
            <div className='RotateContainer'>
                <div className='rotate-container' style={{ backgroundColor: lightMode ? 'var(--light_orange)' : 'var(--dark_brown)' }}>
                    <div className='rotate-box' style={{ borderColor: lightMode ? 'var(--dark_base)' : 'var(--dark_gray)' }}>
                        <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.42 29.69" className='arrow-1' style={{ stroke: lightMode ? 'var(--dark_base)' : 'var(--dark_gray)' }}>
                            <defs>
                                <style>{`.cls-1{fill:none;stroke:${lightMode ? 'var(--dark_base)' : 'var(--dark_gray)'};stroke-linecap:round;stroke-linejoin:round;stroke-width:4px;}`}</style>
                            </defs>
                            <g id="Layer_4">
                                <polyline className="cls-1" points="19.93 11.26 10.96 2 2 12.46 10.96 2 10.96 27.69 32.42 27.69" />
                            </g>
                        </svg>

                        <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.42 29.69" className='arrow-2' style={{ stroke: lightMode ? 'var(--dark_base)' : 'var(--dark_gray)' }}>
                            <defs>
                                <style>{`.cls-1{fill:none;stroke:${lightMode ? 'var(--dark_base)' : 'var(--dark_gray)'};stroke-linecap:round;stroke-linejoin:round;stroke-width:4px;}`}</style>
                            </defs>
                            <g id="Layer_4">
                                <polyline className="cls-1" points="19.93 11.26 10.96 2 2 12.46 10.96 2 10.96 27.69 32.42 27.69" />
                            </g>
                        </svg>
                    </div>
                    <p className='rotate-text'>Please rotate your screen to a landscape view and refresh for the best experience</p>
                </div>
            </div>
        ) : null
    );
};

export default RotateScreen;
