import React from 'react';
import { above } from 'src/components/Media/Global/mediaqueries';
import { Typography, Button } from '@mui/material';
import Image from 'next/image';
import MuiLink from 'src/components/Link/Mui-link';
import sortLink from 'src/utils/sort-link';
import styled from '@emotion/styled';
import theme from 'src/styles/theme';
import WysiwygWrapper from 'src/components/Wysiwyg-wrapper';

const Wrapper = styled('div')`
    width: 100%;
    ${above.tablet} {
        width: 87.5%;
        display: flex;
        flex-direction: ${(props) => (props.reverseModule ? 'row' : 'row-reverse')};
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
        width: 50%;
    }
`;

const ItemText = styled('div')`
    width: 100%;
    ${above.tablet} {
        width: 50%;
        display: flex;
        justify-content: ${(props) => (props.reverseModule ? 'right' : 'left')};
    }
`;

const OuterImageWrapper = styled('div')`
    width: 100%;

    ${above.tablet} {
        display: flex;
        justify-content: ${(props) => (props.reverseModule ? 'left' : 'right')};
    }
`;

const ImageWrapper = styled('div')`
    position: relative;
    padding-top: 90%;
    width: 100%;

    ${above.laptop} {
        padding-top: 102%;
        max-width: 545px;
    }
`;

const TextWrapper = styled('div')`
    width: 100%;
    height: 100%;

    ${above.tablet} {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: ${(props) => (props.reverseModule ? 'wrap-reverse' : 'nowrap')};
    }

    ${above.laptop} {
        max-width: 545px;
    }
`;
const Title = styled(Typography)`
    border-bottom: 1px solid ${theme.color.text};
    padding-bottom: 4px;
    width: 100%;

    ${above.laptop} {
        width: 404px;
    }
`;

const Text = styled(WysiwygWrapper)`
    width: 100%;
    margin-top: 40px;

    ${above.laptop} {
        width: 404px;
    }
`;

const ButtonWrapper = styled('div')`
    margin-top: 44px;

    ${above.laptop} {
        width: 404px;
    }
`;

const SinglePost = ({ data }) => {
    // reverseModule is required in the cms.
    const { link, image, reverseModule, title, text } = data;

    const imageSrc = image.fields ? image.fields.file.url : '';
    const altImage = image.fields && image.fields.description ? image.fields.description : '';

    const linkData = link ? sortLink(link) : false;

    return (
        <Wrapper reverseModule={reverseModule}>
            <ItemImage>
                <OuterImageWrapper reverseModule={reverseModule}>
                    <ImageWrapper>
                        <Image
                            src={`https:${imageSrc}`}
                            alt={altImage}
                            layout="fill"
                            quality={100}
                        />
                    </ImageWrapper>
                </OuterImageWrapper>
            </ItemImage>
            <ItemText reverseModule={reverseModule}>
                <TextWrapper reverseModule={reverseModule}>
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
        </Wrapper>
    );
};

export default SinglePost;
