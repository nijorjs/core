window.nijor.RenderTheme = function(){
    if(window.localStorage.getItem('theme')===null || window.localStorage.getItem('theme')==='auto'){
        let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(isDarkMode) document.body.classList.toggle('dark-mode');
    }else{
        let Theme = window.localStorage.getItem('theme');
        if(Theme==="dark"){
            document.body.classList.add('dark-mode');
            window.localStorage.setItem('theme','dark');
            return;
        }
        document.body.classList.remove('light-mode');
        window.localStorage.setItem('theme','light');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{
        if(window.localStorage.getItem('theme')===null || window.localStorage.getItem('theme')==='auto'){
            let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if(isDarkMode) document.body.classList.toggle('dark-mode');
            else document.body.classList.remove('dark-mode');
        }
    });
}

function setTheme(theme){
    if(theme==="light"){
        document.body.classList.remove('dark-mode');
        window.localStorage.setItem('theme','light');
        return;
    }
    if(theme==="dark"){
        document.body.classList.add('dark-mode');
        window.localStorage.setItem('theme','dark');
        return;
    }
    if(theme==="auto"){
        window.localStorage.setItem('theme','auto');
        let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(isDarkMode) document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
    }
}

const getTheme = ()=> window.localStorage.getItem('theme') || 'auto';

const getColorScheme = ()=> window.matchMedia('(prefers-color-scheme: dark)').matches===true ? 'dark' : 'light';

window.nijor.setTheme = setTheme;
window.nijor.getTheme = getTheme;
window.nijor.getColorScheme = getColorScheme;