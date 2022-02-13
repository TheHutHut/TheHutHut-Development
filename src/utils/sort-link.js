const sortSubpageLinks = (data) => {
    const links = data.map((link) => {
        const subLinkObj = {
            id: "",
            showLink: false,
            isExternal: false,
            isInternal: false,
            isFirstLevelPage: false,
            isSubpage: false,
            url: "",
            text: "",
            firstLevelSlug: "",
            secondLevelSlug: "",
        };

        if (!data) {
            return subLinkObj;
        }

        if (
            link.fields.parentPageUrl.fields.urlFirstLevel &&
            link.fields.urlSecondLevel
        ) {
            subLinkObj.id = link.sys.id;
            subLinkObj.showLink = true;
            subLinkObj.isSubpage = true;
            subLinkObj.isInternal = true;
            subLinkObj.url = `${link.fields.parentPageUrl.fields.urlFirstLevel}/${link.fields.urlSecondLevel}`;
            subLinkObj.text = link.fields.title;
            subLinkObj.firstLevelSlug =
                link.fields.parentPageUrl.fields.urlFirstLevel;
            subLinkObj.secondLevelSlug = link.fields.urlSecondLevel;
        }

        return subLinkObj;
    });

    return links;
};

const sortLink = (data) => {
    const linkObj = {
        showLink: false,
        isExternal: false,
        isInternal: false,
        isFirstLevelPage: false,
        isSubpage: false,
        hasSubpage: false,
        url: "",
        text: "",
        firstLevelSlug: "",
        secondLevelSlug: "",
        subpageArray: null,
    };

    if (!data) {
        return linkObj;
    }

    const hasFirstLevelPageLink = !!(
        data &&
        data.fields &&
        data.fields.link &&
        data.fields.link.fields &&
        data.fields.link.fields.urlFirstLevel
    );

    const hasSubpageLinks = !!(data && data.fields && data.fields.subpageLinks);

    const isExternalLink = !!(
        data &&
        data.fields &&
        data.fields.link &&
        data.fields.link.fields.urlExternal
    );

    const isSingleSubPageLink = !!(
        data &&
        data.fields &&
        data.fields.link &&
        data.fields.link.fields &&
        data.fields.link.fields.parentPageUrl &&
        data.fields.link.fields.urlSecondLevel
    );

    if (hasFirstLevelPageLink && !hasSubpageLinks) {
        linkObj.showLink = true;
        linkObj.isInternal = true;
        linkObj.isFirstLevelPage = true;
        linkObj.hasSubpage = false;
        linkObj.text = data.fields.title;
        linkObj.url = data.fields.link.fields.urlFirstLevel;
        linkObj.firstLevelSlug = data.fields.link.fields.urlFirstLevel;

        return linkObj;
    }

    if (hasFirstLevelPageLink && hasSubpageLinks) {
        linkObj.showLink = true;
        linkObj.isInternal = true;
        linkObj.isFirstLevelPage = true;
        linkObj.hasSubpage = true;
        linkObj.text = data.fields.title;
        linkObj.url = data.fields.link.fields.urlFirstLevel;
        linkObj.firstLevelSlug = data.fields.link.fields.urlFirstLevel;
        linkObj.subpageArray = sortSubpageLinks(data.fields.subpageLinks);

        return linkObj;
    }

    if (isSingleSubPageLink) {
        linkObj.showLink = true;
        linkObj.isSubpage = true;
        linkObj.isInternal = true;
        linkObj.url = `${data.fields.link.fields.parentPageUrl.fields.urlFirstLevel}/${data.fields.link.fields.urlSecondLevel}`;
        linkObj.text = data.fields.title;
        linkObj.firstLevelSlug =
            data.fields.link.fields.parentPageUrl.fields.urlFirstLevel;
        linkObj.secondLevelSlug = data.fields.link.fields.urlSecondLevel;

        return linkObj;
    }

    if (isExternalLink) {
        linkObj.showLink = true;
        linkObj.isExternal = true;
        linkObj.text = data.fields.title;
        linkObj.url = data.fields.link.fields.urlExternal;

        return linkObj;
    }

    return linkObj;
};

export default sortLink;
