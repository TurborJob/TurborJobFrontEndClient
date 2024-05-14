import localStorage from '../utils/localStorage';
import en from './textJson/en.json'
import vn from './textJson/vn.json'

class i18nCus {
    constructor() {
        this.langFocus = localStorage.get("language") || "en";
        this.data = {en,vn}
    }

    getText(text){
        return this.data?.[this.langFocus]?.[text]
    }
}