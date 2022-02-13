import { above } from 'src/components/Media/Global/mediaqueries';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import theme from 'src/styles/theme';
import WysiwygWrapper from 'src/components/Wysiwyg-wrapper/index.js';

const TextWrapper = styled('div')`
    min-height: 90vh;
    width: 100%;
    padding-top: ${theme.height.headerMobile};
    display: flex;
    align-items: center;
    flex-direction: column;

    ${above.laptop} {
        padding-top: ${theme.height.headerMobile};
    }
`;

const HeroHeading = styled(Typography)`
    margin-bottom: 24px;
    width: 90%;
    text-align: center;
    margin-top: 50px;

    ${above.tablet} {
        margin-top: 80px;
        margin-bottom: 32px;
        width: 80%;
    }

    ${above.laptop} {
        margin-top: 100px;
    }
`;

const HeroText = styled(WysiwygWrapper)`
    width: 90%;
    margin-bottom: 40px;

    ${above.tablet} {
        width: 70%;
    }

    ${above.laptop} {
        width: 65%;
    }
`;

const HeroModuleTitleAndText = ({ data }) => {
    const { title, text } = data;

    return (
        <TextWrapper>
            {title && <HeroHeading variant="h1">{title}</HeroHeading>}
            {text && <HeroText data={text} />}
        </TextWrapper>
    );
};

export default HeroModuleTitleAndText;

{
}
