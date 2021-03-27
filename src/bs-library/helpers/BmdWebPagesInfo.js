


export default class BmdWebPagesInfo {

    /** CONSTS */
    static PAGES = {
        doesNotExistPage: { doesNeedAuthentication: true, },
        home: { doesNeedAuthentication: false, },
        profile: { doesNeedAuthentication: true, },
    };


    /** PROPERTIES */



    /** HELPER FUNCS */



    /** MAIN FUNCS */
    static getPageInfo(pageName) {
        const page = BmdWebPagesInfo.PAGES[pageName];
        if (!page) { return BmdWebPagesInfo.PAGES.doesNotExistPage; }
        return page;
    }



    /**
     * 
     * CASES:
     *  null
     *  ''
     *  'page'
     *  'page/subpage'
     *  '/'
     *  '/page'
     *  '/page/subpage'
     */
    static getParsedWebPageName(relativePathOrPageName) {
        const pathValues = relativePathOrPageName?.split('/');
        let pageName = 'home';

        if (!pathValues) { return pageName; }

        if (pathValues.length == 1) {
            const value = pathValues[0].trim();
            if (value != '') { pageName = value; }
        } 
        else if (pathValues.length > 1) {

            const value1 = pathValues[0].trim();
            const value2 = pathValues[1].trim();

            if (value1 != '') { pageName = value1; }
            else if (value2 != '') { pageName = value2; }
        }

        return pageName;
    }



    /** EVENT FUNCS */
}