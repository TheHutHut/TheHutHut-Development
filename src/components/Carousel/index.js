import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import inBrowser from 'src/utils/in-browser';
import styled from '@emotion/styled';

const Wrapper = styled('div')``;

const ImageWrapper = styled('div')`
    position: relative;
    padding-top: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImageCarousel = ({ images, ...rest }) => {
    const [showCarousel, setShowCarousel] = useState(false);

    useEffect(() => {
        if (inBrowser) {
            setShowCarousel(true);
        }
    }, []);

    return (
        <Wrapper {...rest}>
            {showCarousel && (
                <Carousel interval={4000}>
                    {images.map((image, index) => {
                        const description = image.fields.description
                            ? image.fields.description
                            : 'image';
                        return (
                            <ImageWrapper key={index}>
                                <Image
                                    layout="fill"
                                    src={`https:${image.fields.file.url}`}
                                    alt={description}
                                />
                            </ImageWrapper>
                        );
                    })}
                </Carousel>
            )}
        </Wrapper>
    );
};

export default ImageCarousel;
