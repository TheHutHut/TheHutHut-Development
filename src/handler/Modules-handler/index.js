import { createElement } from 'react';
import Modules from 'src/modules/load-module';

const createHeroContent = (pageData) => {
    const contentTypeExists = !!(
        pageData &&
        pageData.heroModule &&
        pageData.heroModule.sys &&
        pageData.heroModule.sys.contentType &&
        pageData.heroModule.sys.contentType.sys &&
        pageData.heroModule.sys.contentType.sys.id
    );

    if (contentTypeExists) {
        const heroModule = pageData.heroModule;
        return createElement(Modules(heroModule.sys.contentType.sys.id), {
            key: heroModule.sys.id,
            module: heroModule.sys.contentType.sys.id,
            title: '',
            data: heroModule.fields,
        });
    }

    return null;
};

const createPageContent = (pageData) => {
    if (pageData && pageData.pageContentModule) {
        return pageData.pageContentModule.map((data, index) => {
            const contentTypeExists = !!(
                data &&
                data.sys &&
                data.sys.contentType &&
                data.sys.contentType.sys &&
                data.sys.contentType.sys.id
            );

            if (contentTypeExists) {
                return createElement(Modules(data.sys.contentType.sys.id), {
                    key: index,
                    module: data.sys.contentType.sys.id,
                    title: '',
                    data: data.fields,
                });
            }
            return null;
        });
    }
    return null;
};

export { createHeroContent, createPageContent };
