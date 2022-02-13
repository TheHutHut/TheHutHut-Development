import React, { useEffect, useState, forwardRef } from 'react';
import { above, below } from 'src/components/Media/Global/mediaqueries.js';
import { Spin as Hamburger } from 'hamburger-react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Link from 'src/components/Link/Mui-link';
import Logo from 'src/components/Layout/Header/logo';
import Slide from '@mui/material/Slide';
import sortLink from 'src/utils/sort-link';
import styled from '@emotion/styled';
import theme from 'src/styles/theme';
import useMediaQuery from '@mui/material/useMediaQuery';

const NavigationWrapper = styled('div')`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-left: 12px;
    padding-right: 12px;

    ${above.tablet} {
        padding-left: 24px;
        padding-right: 24px;
    }

    ${above.laptop} {
        padding-left: 32px;
        padding-right: 32px;
        max-width: 1440px;
        margin: 0 auto;
    }
`;

// Styling for laptop and desktop navigation
const LinksWrapperLaptop = styled('div')`
    ${below.laptop} {
        display: none;
    }
`;

const StyledLinkLaptop = styled(Link)`
    text-underline-offset: 4px;
    margin-left: 56px;
`;

// Styling for mobile and tablet navigation
const HamburgerWrapper = styled('div')`
    ${above.laptop} {
        display: none;
    }
`;

const StyledDialogMobile = styled(Dialog)`
    /* ${above.laptop} {
        display: none;
    } */
`;

const LinksWrapper = styled('div')`
    width: 100%;
    height: 100%;
    background-color: ${theme.color.background};
    margin-top: ${theme.height.headerMobile};
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${above.tablet} {
        margin-top: ${theme.height.header};
    }
`;

const StyledLink = styled(Link)`
    text-underline-offset: 4px;
    margin-bottom: 32px;
`;

const ButtonWrapper = styled('div')``;

const StyledButton = styled(Button)`
    ${above.laptop} {
        margin-left: 56px;
    }
`;

// eslint-disable-next-line prefer-arrow-callback
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const Navigation = ({ headerData }) => {
    const { links, button } = headerData;
    const [open, setOpen] = useState(false);
    const matches = useMediaQuery('(max-width:1152px)');

    const toggleMenu = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!matches) {
            closeMenu();
        }
    }, [matches]);

    const buttonLink = sortLink(button);
    const navigationLinks = links.map((link) => sortLink(link));
    return (
        <NavigationWrapper>
            <div onClick={closeMenu}>
                <Logo />
            </div>
            <LinksWrapperLaptop>
                {navigationLinks.map((link, index) => {
                    return (
                        <StyledLinkLaptop
                            key={index}
                            href={`/${link.url}`}
                            underline="hover"
                            variant="body1"
                        >
                            {link.text}
                        </StyledLinkLaptop>
                    );
                })}
                {buttonLink.showLink && (
                    <StyledButton variant="outlined" component={Link} href={`/${buttonLink.url}`}>
                        {buttonLink.text}
                    </StyledButton>
                )}
            </LinksWrapperLaptop>
            <HamburgerWrapper>
                <Hamburger
                    Hamburger
                    hideOutline
                    color={theme.color.hamburger}
                    size={32}
                    toggled={open}
                    toggle={toggleMenu}
                    label="Menu button"
                />
            </HamburgerWrapper>
            <StyledDialogMobile
                fullScreen
                keepMounted
                open={open}
                TransitionComponent={Transition}
                transitionDuration={1000}
                aria-describedby="alert-dialog-slide-description"
            >
                <LinksWrapper>
                    {navigationLinks.map((link, index) => {
                        return (
                            <StyledLink
                                key={index}
                                href={`/${link.url}`}
                                underline="hover"
                                variant="body1"
                            >
                                {link.text}
                            </StyledLink>
                        );
                    })}
                    {buttonLink.showLink && (
                        <ButtonWrapper>
                            <StyledButton
                                variant="outlined"
                                component={Link}
                                href={`/${buttonLink.url}`}
                            >
                                {buttonLink.text}
                            </StyledButton>
                        </ButtonWrapper>
                    )}
                </LinksWrapper>
            </StyledDialogMobile>
        </NavigationWrapper>
    );
};

export default Navigation;
