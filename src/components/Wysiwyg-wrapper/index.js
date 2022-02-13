import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Typography } from '@mui/material';
import Link from 'src/components/Link/Mui-link';
import styled from '@emotion/styled';

const StyledParagraph = styled(Typography)``;

const StyledBold = styled(Typography)`
    font-weight: 600;
`;

const StyledUnorderedList = styled(Typography)`
    padding: 0;
`;

const StyledLink = styled(Link)`
    border-bottom: 1px solid;
    font-style: italic;
`;

const StyledH1 = styled(Typography)``;
const StyledH2 = styled(Typography)``;
const StyledH3 = styled(Typography)``;
const StyledH4 = styled(Typography)``;
const StyledH5 = styled(Typography)``;
const StyledH6 = styled(Typography)``;

const Bold = ({ children }) => <StyledBold variant="body2">{children}</StyledBold>;

const Text = ({ children }) => <StyledParagraph variant="body1">{children}</StyledParagraph>;

const UnorderedList = ({ children }) => (
    <StyledUnorderedList variant="body2">{children}</StyledUnorderedList>
);

const H1 = ({ children }) => <StyledH1 variant="h1">{children}</StyledH1>;

const H2 = ({ children }) => <StyledH2 variant="h2">{children}</StyledH2>;

const H3 = ({ children }) => <StyledH3 variant="h3">{children}</StyledH3>;

const H4 = ({ children }) => <StyledH4 variant="h4">{children}</StyledH4>;

const H5 = ({ children }) => <StyledH5 variant="h5">{children}</StyledH5>;

const H6 = ({ children }) => <StyledH6 variant="h6">{children}</StyledH6>;

const options = {
    renderMark: {
        [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
    renderNode: {
        [INLINES.HYPERLINK]: (node, children) => {
            return <StyledLink href={node.data.uri}>{children}</StyledLink>;
        },
        [BLOCKS.PARAGRAPH]: (node, children) => {
            if (node.content[0].value === '' && node.content.length === 1) {
                return <br />;
            }
            return <Text>{children}</Text>;
        },
        [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
        [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
        [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
        [BLOCKS.HEADING_4]: (node, children) => <H4>{children}</H4>,
        [BLOCKS.HEADING_5]: (node, children) => <H5>{children}</H5>,
        [BLOCKS.HEADING_6]: (node, children) => <H6>{children}</H6>,
        [BLOCKS.UL_LIST]: (node, children) => <UnorderedList>{children}</UnorderedList>,
    },
    //   renderText: text => text.replace('!', '?'),
};

const TextWrapper = styled('div')``;

const WysiwygWrapper = ({ data, ...rest }) => {
    return <TextWrapper {...rest}>{documentToReactComponents(data, options)}</TextWrapper>;
};

export default WysiwygWrapper;
