import React from 'react';
import styled from '@emotion/styled';
import Link from 'src/components/Link/Mui-link';
import Image from 'next/image';

const WrapperLogo = styled('div')`
    height: 100%;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = () => {
    return (
        <WrapperLogo>
            <Link href="/">
                <Image src="/images/logoNav.png" width="66" height="64" alt="logo" />
            </Link>
        </WrapperLogo>
    );
};

export default Logo;
