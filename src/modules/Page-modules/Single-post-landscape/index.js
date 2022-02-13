import React from 'react';
import { above, below } from 'src/components/Media/Global/mediaqueries';
import { Typography, Button } from '@mui/material';
import Image from 'next/image';
import MuiLink from 'src/components/Link/Mui-link';
import sortLink from 'src/utils/sort-link';
import styled from '@emotion/styled';
import theme from 'src/styles/theme';
import WysiwygWrapper from 'src/components/Wysiwyg-wrapper';

const Wrapper = styled('div')`
    width: 100%;

    ${below.tablet} {
        display: flex;
        flex-direction: column-reverse;
    }

    ${above.tablet} {
        width: 87.5%;
    }

    ${above.laptop} {
        width: 83.3%;
    }
`;

const ItemImage = styled('div')`
    width: 100%;
    margin-bottom: 30px;

    ${above.tablet} {
        margin-bottom: 0px;
    }
`;

const ItemText = styled('div')`
    width: 100%;

    ${above.tablet} {
        margin-bottom: 68px;
    }
`;

const ImageWrapper = styled('div')`
    position: relative;
    padding-top: 30%;

    ${below.tablet} {
        display: none;
    }
`;

const ImageWrapperMobile = styled('div')`
    position: relative;
    padding-top: 90%;

    ${above.tablet} {
        display: none;
    }
`;

const TextWrapper = styled('div')`
    width: 100%;
    height: 100%;

    ${above.tablet} {
        width: 80%;
    }

    ${above.laptop} {
        max-width: 545px;
    }
`;
const Title = styled(Typography)`
    border-bottom: 1px solid ${theme.color.text};
    padding-bottom: 4px;
    width: 100%;

    ${above.tablet} {
        width: 404px;
    }
`;

const Text = styled(WysiwygWrapper)`
    width: 100%;
    margin-top: 40px;

    ${above.tablet} {
        width: 404px;
    }
`;

const ButtonWrapper = styled('div')`
    margin-top: 44px;

    ${above.tablet} {
        width: 404px;
    }
`;

const SinglePostLandscape = ({ data }) => {
    // reverseModule is required in the cms.
    const { desktopImage, link, mobileImage, reverseModule, title, text } = data;

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

    const linkData = link ? sortLink(link) : false;

    return (
        <Wrapper reverseModule={reverseModule}>
            <ItemText>
                <TextWrapper>
                    {title && <Title variant="h4">{title}</Title>}
                    {text && <Text data={text} />}
                    {linkData && (
                        <ButtonWrapper>
                            <Button
                                variant="outlined"
                                size="large"
                                href={`/${linkData.url}`}
                                component={MuiLink}
                            >
                                {linkData.text}
                            </Button>
                        </ButtonWrapper>
                    )}
                </TextWrapper>
            </ItemText>
            <ItemImage reverseModule={reverseModule}>
                <ImageWrapper>
                    <Image
                        src={`https:${desktopImageSrc}`}
                        alt={altTextDesktop}
                        layout="fill"
                        quality={100}
                    />
                </ImageWrapper>
                <ImageWrapperMobile>
                    <Image
                        src={`https:${mobileImageSrc}`}
                        alt={altTextMobile}
                        layout="fill"
                        quality={100}
                    />
                </ImageWrapperMobile>
            </ItemImage>
        </Wrapper>
    );
};

export default SinglePostLandscape;
// import styled from "@emotion/styled";
// import sortLink from "src/utils/sortLink";
// import Image from "next/image";
// import { above, below } from "src/components/Media/Global/mediaqueries";
// import WysiwygWrapper from "src/components/WysiwygWrapper";
// import Button from "@mui/material/Button";
// import MuiLink from "src/components/Link/MuiLink";
// import { Grid } from "@mui/material";

// const StyledGrid = styled("div")`
//     width: 100%;
// `;

// const StyledGridItemImage = styled(Grid)`
//     height: 100px;
//     background-color: red;
// `;

// const ImageWrapper = styled("div")``;

// const StyledGridItemText = styled(Grid)`
//     height: 100px;
//     background-color: black;
// `;

// const SinglePostLandscape = ({ data }) => {
//     // reverseModule is required in the cms.
//     const { desktopImage, link, mobileImage, reverseModule, title, text } =
//         data;

//     //Desktop image is required in CMS
//     const desktopImageSrc = desktopImage.fields
//         ? desktopImage.fields.file.url
//         : "";
//     const altTextDesktop =
//         desktopImage.fields && desktopImage.fields.description
//             ? desktopImage.fields.description
//             : "";

//     const mobileImageSrc =
//         mobileImage && mobileImage.fields && mobileImage.fields.file.url
//             ? mobileImage.fields.file.url
//             : desktopImageSrc;
//     const altTextMobile =
//         mobileImage &&
//         mobileImage.fields &&
//         mobileImage.fields.description &&
//         mobileImage.fields.description
//             ? mobileImage.fields.description
//             : altTextDesktop;

//     const linkData = link ? sortLink(link) : false;

//     return (
//         <StyledGrid>
//             {/* <StyledGridItemText item mobile={12}></StyledGridItemText>
//             <StyledGridItemImage item mobile={12}></StyledGridItemImage> */}
//         </StyledGrid>
//     );
// };

// export default SinglePostLandscape;
// const Wrapper = styled("div")`
//     width: 100%;
//     /* padding-top: 10vh;
//     padding-bottom: 10vh; */

//     display: flex;
//     flex-direction: column-reverse;

//     ${below.tablet} {
//         align-items: center;
//         justify-content: center;
//     }
// `;

// const ImageFrame = styled("div")`
//     width: 90%;
//     padding-top: 68px;
//     display: flex;
//     justify-content: center;

//     ${above.tablet} {
//         width: 100%;
//     }
// `;

// const ImageOuterWrapper = styled("div")`
//     position: relative;
//     width: 100%;
//     padding-top: 90%;

//     ${above.tablet} {
//         width: 95%;
//         padding-top: 30%;
//     }

//     ${above.laptop} {
//         width: 1100px;
//         padding-top: 20%;
//     }
// `;

// const ImageWrapper = styled("div")`
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
// `;

// const ImageInnerWrapper = styled("div")`
//     position: relative;
//     width: 100%;
//     height: 100%;

//     ${below.tablet} {
//         display: none;
//     }
// `;

// const ImageInnerWrapperMobile = styled("div")`
//     position: relative;
//     width: 100%;
//     height: 100%;

//     ${above.tablet} {
//         display: none;
//     }
// `;

// const TextFrame = styled("div")`
//     width: 90%;
//     display: flex;
//     justify-content: center;

//     ${above.tablet} {
//         width: 100%;
//     }
// `;

// const TextWrapper = styled("div")`
//     width: 100%;

//     ${above.tablet} {
//         width: 95%;
//     }

//     ${above.laptop} {
//         width: 1100px;
//     }
// `;

// const Title = styled("h2")`
//     width: 100%;
//     border-bottom: 1px solid;
//     padding-bottom: 8px;

//     ${above.tablet} {
//         width: 404px;
//     }
// `;

// const Text = styled(WysiwygWrapper)`
//     width: 100%;
//     margin-top: 30px;

//     ${above.tablet} {
//         width: 404px;
//     }
// `;

// const ButtonWrapper = styled("div")`
//     width: 100%;
//     margin-top: 50px;

//     ${above.tablet} {
//         width: 404px;
//     }
// `;

{
    /* <Wrapper reverse={reverseModule}>
                <ImageFrame reverse={reverseModule}>
                    <ImageOuterWrapper>
                        <ImageWrapper>
                            <ImageInnerWrapper>
                                <Image
                                    src={`https:${desktopImageSrc}`}
                                    alt={altTextDesktop}
                                    layout="fill"
                                    quality={100}
                                />
                            </ImageInnerWrapper>
                            <ImageInnerWrapperMobile>
                                <Image
                                    src={`https:${mobileImageSrc}`}
                                    alt={altTextMobile}
                                    layout="fill"
                                    quality={100}
                                />
                            </ImageInnerWrapperMobile>
                        </ImageWrapper>
                    </ImageOuterWrapper>
                </ImageFrame>
                <TextFrame reverse={reverseModule}>
                    <TextWrapper reverse={reverseModule}>
                        {title && <Title>{title}</Title>}
                        {text && <Text data={text} />}
                        {linkData && (
                            <ButtonWrapper>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    href={`/${linkData.url}`}
                                    component={MuiLink}
                                >
                                    {linkData.text}
                                </Button>
                            </ButtonWrapper>
                        )}
                    </TextWrapper>
                </TextFrame>
            </Wrapper> */
}
