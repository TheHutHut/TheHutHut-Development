import React from 'react';
import { above } from 'src/components/Media/Global/mediaqueries';
import styled from '@emotion/styled';
import AtFooterSvg from 'src/assets/icons/at-footer-svg';
import theme from 'src/styles/theme';

const FooterWrapper = styled('div')`
    background-color: ${theme.color.footer};
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 12px;
    padding-left: 12px;

    ${above.tablet} {
        padding-left: 24px;
        padding-right: 24px;
    }

    ${above.laptop} {
        padding-left: 32px;
        padding-right: 32px;
    }
`;

const Text = styled('p')`
    margin-left: 10px;
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <AtFooterSvg />
            <Text>The Hut Hut. All Rights Reserved.</Text>
        </FooterWrapper>
    );
};

export default Footer;
