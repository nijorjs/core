const Handler = {
    set(target,prop,receiver){
        target[prop] = receiver;

        document.querySelectorAll(`nirev[var="${prop}"]`).forEach(el=>{
            el.innerHTML = receiver;
        });

        return true;
    }
};

export default new Proxy({},Handler);