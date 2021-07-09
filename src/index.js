import { loader } from "./modules/DOM_CONTENT";
import { changeTempType, callApi } from './modules/utils';
const d = document;

d.addEventListener('click', (e) => {
    if(e.target.matches('.modal-btn')) {
        d.querySelector('.bg-modal').remove();
    }
    if(e.target.matches('input[type="submit"]')) {
        const input = document.querySelector('input[type="text"]');
        let city = input.value;
        input.value = ''
        loader()
        callApi(city)
    }
    if(e.target.matches('.checkbox')) changeTempType(e.target.checked)
})

d.addEventListener('DOMContentLoaded', ()=> {
    loader()
    callApi('anderlecht')
})