import inBrowser from 'src/utils/in-browser';
import loadable from '@loadable/component';
import ModuleNotFound from './Not-found';

const ModuleList = {
    // Hero Modules
    heroAndPageDummyModule: './Test/index.js',
    heroModulePhotoFrameTitleAndText: './Hero-modules/Photo-frame-title-and-text/index.js',
    heroModuleTitleAndText: './Hero-modules/Title-and-text/index.js',
    heroModuleOnlyImage: './Hero-modules/Image-only/index.js',
    //Page Modules
    pageModuleSinglePost: './Page-modules/Single-post/index.js',
    pageModuleSinglePostLandscapeFormat: './Page-modules/Single-post-landscape/index.js',
    contactForm: './Page-modules/Form/index.js',
};

const LoadModule = (type) => {
    const activeModule = ModuleList[type];

    const ModuleComponent = loadable(() => import(`${activeModule}`));

    if (!inBrowser) {
        // The server should always render the module so we get the static HTML.
        if (typeof activeModule === 'undefined') {
            return ModuleNotFound;
        }
        return ModuleComponent;
    }

    if (typeof activeModule === 'undefined') {
        return ModuleNotFound;
    }

    return ModuleComponent;
};

export default LoadModule;
