import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
    width: 100%;
    min-height: 600px;
    height: 100vh;
`;

const ImageWrapperDesktop = styled('div')`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Test = ({ data }) => {
    const imageSrc = data.image.fields ? data.image.fields.file.url : '';

    const altImage =
        data.image.fields && data.image.fields.description ? data.image.fields.description : '';

    return (
        <Wrapper>
            <ImageWrapperDesktop>
                <Image src={`https:${imageSrc}`} alt={altImage} layout="fill" quality={100} />
            </ImageWrapperDesktop>
        </Wrapper>
    );
};

export default Test;
