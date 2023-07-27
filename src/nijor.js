import component from './components.js';
import reactiveVars from './reactivity';
// window.nijor is an object used by Nijor during runtime.
// window.nijorfunc is an object that stores all the events like on:click="clicked()" (on:{event}="func()") 
window.nijor={ component, reactiveVars };
window.nijor.hashRouterActivated = false;
window.nijorfunc={};

window.location.query = function(){
    // this function returns the url parameters.
    let params = {};
    let parser = document.createElement('a');
    parser.href = window.location.href;
    let query = parser.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

window.nijor.emitEvent = async function(eventName,data={}){
    document.querySelectorAll('[on'+eventName+']').forEach(element=>{
        if(element.getAttribute('id')===null){
            element.setAttribute('id','id_'+makeid(4,6));
        }
        let regexRoundBraces = /\((.*)\)/;
        let EventNameCalled = element.getAttribute('on'+eventName);
        let EventName = EventNameCalled.split('(')[0];
        let args = EventNameCalled.match(regexRoundBraces)[1];
        args = args.replace('$data',JSON.stringify(data));
        args = args.replace('this','_this');
        let EvaluationString= new Function(`
        let _this = document.getElementById('${element.id}');
        ${EventName}(${args});
        `);
        EvaluationString();
    });
};

window.nijor.reload = async function(eventName){
    await window.nijor.emitEvent('reload'+eventName,null);
};

function makeid(min,max){
    let length = Math.floor(Math.random() * (max - min + 1) + min);
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};