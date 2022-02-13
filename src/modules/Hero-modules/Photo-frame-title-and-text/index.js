import React from 'react';
import { above, below } from 'src/components/Media/Global/mediaqueries';
import { Typography } from '@mui/material';
import Image from 'next/image';
import styled from '@emotion/styled';
import theme from 'src/styles/theme.js';
import WysiwygWrapper from 'src/components/Wysiwyg-wrapper/index.js';

const Wrapper = styled('div')`
    width: 100%;
    padding-top: ${theme.height.headerMobile};
    padding-bottom: 40px;

    ${above.tablet} {
        display: flex;
        padding-top: ${theme.height.headerMobile};
    }
`;

const ImageWrapper = styled('div')`
    width: 100%;
    margin-bottom: 32px;

    ${above.tablet} {
        margin-bottom: 0px;
        margin-top: 40px;
        width: 50%;
    }
`;

const InnerImageWrapper = styled('div')`
    width: 100%;
    max-height: 100vh;

    ${above.tablet} {
        display: flex;
        justify-content: center;
    }
`;

const ImageLaptop = styled('div')`
    position: relative;
    width: 100%;
    padding-top: 100%;

    ${above.tablet} {
        width: 80%;
        padding-top: 80%;
    }

    ${above.laptop} {
        padding-top: 0;
        width: 500px;
        height: 500px;
    }

    ${below.tablet} {
        display: none;
    }
`;

const ImageMobile = styled('div')`
    position: relative;
    width: 100%;
    padding-top: 90%;

    ${above.tablet} {
        display: none;
    }
`;

const TextWrapper = styled('div')`
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;

    ${above.tablet} {
        margin-top: 60px;
        width: 50%;

        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
    }

    ${above.laptop} {
        margin-top: 88px;
    }
`;

const Heading = styled(Typography)`
    width: 90%;
    padding-bottom: 24px;
    text-align: center;
`;

const Text = styled(WysiwygWrapper)`
    width: 100%;

    ${above.tablet} {
        width: 90%;
    }
`;

const HeroModulePhotoFrame = ({ data }) => {
    const { desktopImage, mobileImage, title, text } = data;
    //TODO: add func for reversing module
    //Desktop image is required in CMS
    const desktopImageSrc = desktopImage.fields ? desktopImage.fields.file.url : '';
    const altTextDesktop =
        desktopImage.fields && desktopImage.fields.description
            ? desktopImage.fields.description
            : '';

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

    return (
        <Wrapper>
            <ImageWrapper>
                <InnerImageWrapper>
                    <ImageMobile>
                        <Image
                            src={`https:${mobileImageSrc}`}
                            alt={altTextMobile}
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                        />
                    </ImageMobile>
                    <ImageLaptop>
                        <Image
                            src={`https:${desktopImageSrc}`}
                            alt={altTextDesktop}
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                        />
                    </ImageLaptop>
                </InnerImageWrapper>
            </ImageWrapper>
            <TextWrapper>
                {title && <Heading variant="h1">{title}</Heading>}
                {text && <Text data={text} />}
            </TextWrapper>
        </Wrapper>
    );
};

export default HeroModulePhotoFrame;
