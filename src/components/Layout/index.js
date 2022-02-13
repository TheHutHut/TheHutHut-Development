import React, { useMemo } from 'react';
import { above } from 'src/components/Media/Global/mediaqueries';
import { createHeroContent, createPageContent } from 'src/handler/Modules-handler';
import Footer from 'src/components/Layout/Footer';
import Head from 'next/head';
import Header from 'src/components/Layout/Header';
import styled from '@emotion/styled';
import theme from 'src/styles/theme';

const Wrapper = styled('div')`
    width: 100vw;
    background-color: ${theme.color.background};
`;

const PageContentWrapper = styled('div')`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 60px;

    padding: 12px;
    padding-top: 60px;
    padding-bottom: 60px;

    ${above.tablet} {
        gap: 90px;
        padding: 0px;
        padding-top: 90px;
        padding-bottom: 90px;
    }

    ${above.laptop} {
        gap: 120px;
        padding-top: 120px;
        padding-bottom: 120px;
    }
`;

const HeroContentWrapper = styled('div')`
    width: 100%;
    max-width: 1440px;
    min-height: 100vh;
    margin: 0 auto;
`;

const AllContentWrapper = styled('div')`
    width: 100%;
    min-height: 100vh;
    max-width: 1440px;
    margin: 0 auto;
`;

const FooterWrapper = styled('div')`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
`;

const Layout = ({ data, children }) => {
    const { pageData, headerData, footerData, ContentIsRenderedFromCMS } = data;

    const heroContent = useMemo(() => createHeroContent(pageData), [pageData]);

    const pageContent = useMemo(() => createPageContent(pageData), [pageData]);

    if (ContentIsRenderedFromCMS) {
        return (
            <Wrapper>
                <Head>
                    <title>{`The Hut Hut`}</title>
                    <meta
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                        name="viewport"
                    />
                </Head>
                {headerData && <Header data={headerData} />}
                <main>
                    <HeroContentWrapper>{heroContent && heroContent}</HeroContentWrapper>
                    {pageContent && <PageContentWrapper>{pageContent}</PageContentWrapper>}
                </main>
                {footerData && (
                    <FooterWrapper>
                        <Footer data={footerData} />
                    </FooterWrapper>
                )}
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Head>
                <title>{`The Hut Hut`}</title>
                <meta
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    name="viewport"
                />
            </Head>
            {headerData && <Header data={headerData} />}
            <main>
                <AllContentWrapper>{children}</AllContentWrapper>
            </main>
            {footerData && (
                <FooterWrapper>
                    <Footer data={footerData} />
                </FooterWrapper>
            )}
        </Wrapper>
    );
};

export default Layout;
