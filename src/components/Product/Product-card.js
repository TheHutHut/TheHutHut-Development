import React, { useState } from 'react';
import { above, below } from 'src/components/Media/Global/mediaqueries';
import { centsToDollarString } from 'src/utils/format-price';
import { formatDateDayMonthYear } from 'src/utils/format-date';
import { Typography, Table, TableRow, TableCell, TableBody } from '@mui/material';
import Card from '@mui/material/Card';
import Carousel from 'src/components/Carousel';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
    min-height: 400px;
    padding: 40px;
    display: flex;
    flex-direction: column-reverse;

    ${below.laptop} {
        align-items: center;
    }

    ${above.laptop} {
        flex-direction: row;
    }
`;

const StyledCarousel = styled(Carousel)`
    width: 100%;

    ${above.tablet} {
        width: 500px;
    }

    ${above.laptop} {
        width: 400px;
    }
`;

const ContentWrapper = styled('div')`
    margin-bottom: 40px;

    ${above.laptop} {
        flex: 1;
        margin-bottom: 0px;
        padding-left: 64px;
    }
`;

const ContentHead = styled('div')`
    width: 100%;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;

    ${above.tablet} {
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }
`;

const StyledTableCell = styled(TableCell)`
    padding-left: 0px;
    border: none;
    font-weight: normal;

    ${below.tablet} {
        display: flex;
        align-items: center;
    }
`;

const StyledCollapseTableRow = styled(TableRow)`
    display: flex;
    flex-direction: column;
`;

const StyledCollapseTableCell = styled(TableCell)`
    padding-left: 0px;
    border: none;
    text-transform: uppercase;
    display: flex;
    align-items: center;
`;

const StyledCheckBoxOutlinedIcon = styled(CheckBoxOutlinedIcon)`
    margin-left: 10px;
`;

const StyledCheckBlankIcon = styled(CheckBoxOutlineBlankOutlinedIcon)`
    margin-left: 10px;
`;

const Title = styled(Typography)``;

const Text = styled(Typography)`
    margin-bottom: 24px;
`;

const Span = styled('span')`
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 10px;
`;

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: '20px',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ data, bookingRequestData }) {
    const [expanded, setExpanded] = useState(false);
    const { bedding, details, images, maximumOccupancy, size, text, title, price } = data.fields;
    const { end_date, start_date } = bookingRequestData;
    const pricePerNight = centsToDollarString(price, 'currency', 'USD');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const detailsArr = [];

    for (const [key, value] of Object.entries(details)) {
        const arr = [key, value];
        detailsArr.push(arr);
    }

    return (
        <StyledCard>
            {images && <StyledCarousel images={images} />}
            <ContentWrapper>
                <ContentHead>
                    <Title variant="h3">{title}</Title>
                </ContentHead>
                <Text variant="body1">{text}</Text>
                <Table>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell>
                                <Span>Price:</Span>
                                {pricePerNight} per night
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>
                                <Span>Check-in:</Span>
                                {formatDateDayMonthYear(start_date)}
                            </StyledTableCell>
                            <StyledTableCell>
                                <Span>Check-out:</Span>
                                {formatDateDayMonthYear(end_date)}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>
                                <Span>Bedding:</Span>
                                {bedding}
                            </StyledTableCell>
                            <StyledTableCell>
                                <Span>Size:</Span>
                                {size}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>
                                <Span>Occupancy:</Span>
                                {maximumOccupancy} guests
                            </StyledTableCell>
                            <StyledTableCell>
                                <Span>More details</Span>
                                <ExpandMore
                                    expand={expanded}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    onClick={handleExpandClick}
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Collapse unmountOnExit in={expanded} timeout="auto">
                    <Table>
                        <TableBody>
                            <StyledCollapseTableRow>
                                {detailsArr.map((detail, i) => {
                                    const amenity = detail[0];
                                    const hasAmenity = detail[1];
                                    return (
                                        <StyledCollapseTableCell key={i}>
                                            {amenity}
                                            {hasAmenity ? (
                                                <StyledCheckBoxOutlinedIcon />
                                            ) : (
                                                <StyledCheckBlankIcon />
                                            )}
                                        </StyledCollapseTableCell>
                                    );
                                })}
                            </StyledCollapseTableRow>
                        </TableBody>
                    </Table>
                </Collapse>
            </ContentWrapper>
        </StyledCard>
    );
}
