/* eslint-disable func-style */
import { above } from 'src/components/Media/Global/mediaqueries';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import theme from 'src/styles/theme';
import WysiwygWrapper from 'src/components/Wysiwyg-wrapper/index.js';

const Wrapper = styled('div')`
    width: 100%;
    padding-top: 15%;
    padding-bottom: 5%;
`;

const TextWrapper = styled('div')`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const HeroHeading = styled(Typography)`
    text-align: center;
    width: 80%;
    padding-bottom: 16px;

    ${above.tablet} {
        width: 60%;
    }

    ${above.laptop} {
        width: 50%;
        padding-bottom: 24px;
    }
`;

const HeroText = styled(WysiwygWrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin-bottom: 40px;

    ${above.tablet} {
        width: 55%;
    }

    ${above.laptop} {
        width: 45%;
        margin-bottom: 64px;
    }
`;

const Form = styled('form')`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const InputsWrapper = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputWrapper = styled('div')`
    width: 80%;
    margin-top: 25px;
    display: flex;
    flex-direction: column;

    ${above.tablet} {
        width: 60%;
    }

    ${above.laptop} {
        width: 50%;
    }
`;

const Label = styled('label')`
    display: inline-block;
    padding-bottom: 5px;
    padding-left: 10px;
    width: 100%;
`;

const Input = styled('input')`
    border: 1px solid;
    width: 100%;
    font-size: 16px;
    line-height: 1;
    padding: 16px 20px;
    outline: none;
    color: ${theme.color.text};
    background-color: ${theme.color.background};
`;

const Textarea = styled('textarea')`
    border: 1px solid;
    width: 100%;
    font-size: 16px;
    line-height: 1;
    padding: 16px 20px;
    outline: none;
    color: ${theme.color.text};
    background-color: ${theme.color.background};
    resize: none;
`;

const ButtonWrapper = styled('div')`
    width: 80%;

    ${above.tablet} {
        width: 60%;
    }

    ${above.laptop} {
        width: 50%;
    }
`;

const StyledButton = styled(Button)`
    margin-top: 24px;
    min-width: 150px;
`;

const ContactForm = ({ data }) => {
    const { title, text } = data;
    const router = useRouter();

    async function handleOnSubmit(e) {
        e.preventDefault();
        const formData = {};
        Array.from(e.currentTarget.elements).forEach((field) => {
            if (!field.name) {
                return;
            }
            formData[field.name] = field.value;
        });

        const response = await fetch('/api/mail', {
            method: 'post',
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            router.push('/');
        }
    }

    return (
        <Wrapper>
            <TextWrapper>
                {title && <HeroHeading variant="h1">{title}</HeroHeading>}
                {text && <HeroText data={text} />}
            </TextWrapper>
            <Form method="post" onSubmit={handleOnSubmit}>
                <InputsWrapper>
                    <InputWrapper>
                        <Label htmlFor="name">Full name *</Label>
                        <Input required type="text" name="name" />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="email">Email *</Label>
                        <Input required type="email" name="email" />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="tel">Telephone number</Label>
                        <Input type="text" name="tel" />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="text">Text *</Label>
                        <Textarea id="text" name="text" rows="4" cols="50" />
                    </InputWrapper>
                </InputsWrapper>
                <ButtonWrapper>
                    <StyledButton variant="outlined" typ="submit" size="large">
                        Send
                    </StyledButton>
                </ButtonWrapper>
            </Form>
        </Wrapper>
    );
};

export default ContactForm;
