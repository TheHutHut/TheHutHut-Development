import React from 'react';
import { above, below } from 'src/components/Media/Global/mediaqueries';
import Image from 'next/image';
import styled from '@emotion/styled';
import theme from 'src/styles/theme';

const Wrapper = styled('div')`
    width: 100vw;
    height: 100vh;
`;

const ImageWrapper = styled('div')`
    width: 100%;
    height: 100%;
`;

const ImageLaptop = styled('div')`
    position: relative;
    width: 100%;
    height: 100%;
    ${below.laptop} {
        display: none;
    }
`;

const ImageTablet = styled('div')`
    position: relative;
    width: 100%;
    height: 100%;

    ${theme.media.above.laptop} {
        display: none;
    }

    ${below.tablet} {
        display: none;
    }
`;

const ImageMobile = styled('div')`
    position: relative;
    width: 100%;
    height: 100%;

    ${above.tablet} {
        display: none;
    }
`;

const HeroModuleOnlyImage = ({ data }) => {
    const { desktopImage, mobileImage, tabletImage } = data;
    //Desktop image is required in CMS
    const desktopImageSrc = desktopImage.fields ? desktopImage.fields.file.url : '';
    const altTextDesktop =
        desktopImage.fields && desktopImage.fields.description
            ? desktopImage.fields.description
            : '';

    const tabletImageSrc =
        tabletImage && tabletImage.fields && tabletImage.fields.file.url
            ? tabletImage.fields.file.url
            : desktopImageSrc;

    const altTextTablet =
        tabletImage &&
        tabletImage.fields &&
        tabletImage.fields.description &&
        tabletImage.fields.description
            ? tabletImage.fields.description
            : altTextDesktop;

    const mobileImageSrc =
        mobileImage && mobileImage.fields && mobileImage.fields.file.url
            ? mobileImage.fields.file.url
            : desktopImageSrc;
    const altTextMobile =
        mobileImage &&
        mobileImage.fields &&
        mobileImage.fields.description &&
        mobileImage.fields.description
            ? mobileImage.fields.description
            : altTextDesktop;

    console.log('above.desktop_xl', above.desktop_xl);
    console.log('above.desktop', above.desktop);
    console.log('above.laptop', above.laptop);
    console.log('above.tablet', above.tablet);
    console.log('above.mobile', above.mobile);

    console.log('below.desktop_xl', below.desktop_xl);
    console.log('below.desktop', below.desktop);
    console.log('below.laptop', below.laptop);
    console.log('below.tablet', below.tablet);
    console.log('below.mobile', below.laptop);
    return (
        <Wrapper>
            <ImageWrapper>
                <ImageMobile>
                    <Image
                        src={`https:${mobileImageSrc}`}
                        alt={altTextMobile}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </ImageMobile>
                <ImageTablet>
                    <Image
                        src={`https:${tabletImageSrc}`}
                        alt={altTextTablet}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </ImageTablet>
                <ImageLaptop>
                    <Image
                        src={`https:${desktopImageSrc}`}
                        alt={altTextDesktop}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </ImageLaptop>
                {/* <picture>
                        <source media="(max-width: 799px)" srcSet={`https:${mobileImageSrc}`} />
                        <source media="(min-width: 800px)" srcSet={`https:${desktopImageSrc}`} />
                        <img
                            src={`https:${desktopImageSrc}`}
                            alt="Chris standing up holding his daughter Elva"
                        />
                    </picture> */}
            </ImageWrapper>
        </Wrapper>
    );
};

export default HeroModuleOnlyImage;
