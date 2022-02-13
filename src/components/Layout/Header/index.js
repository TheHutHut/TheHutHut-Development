import React, { useState, useEffect } from 'react';
import { above } from 'src/components/Media/Global/mediaqueries';
import styled from '@emotion/styled';
import Navigation from 'src/components/Layout/Header/navigation.js';
import theme from 'src/styles/theme';

const HeaderWrapper = styled('div')`
    background-color: ${theme.color.header};
    height: ${theme.height.headerMobile};
    position: fixed;
    top: ${(props) => (props.showHeader ? '0' : '-100px')};
    left: 0;
    width: 100%;
    transition: 1s ease-out;
    z-index: 1500;
    display: flex;
    justify-content: space-between;

    ${above.tablet} {
        height: ${theme.height.header};
    }
`;

const Header = ({ data }) => {
    const [showHeader, setShowHeader] = useState(true);
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;

            const visible = prevScrollPosition > currentScrollPosition;

            if (showHeader !== visible) {
                setShowHeader(visible);
            }
            setPrevScrollPosition(currentScrollPosition);
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <HeaderWrapper showHeader={showHeader}>
            <Navigation headerData={data} />
        </HeaderWrapper>
    );
};

export default Header;
