// Me Sandesh

alert(`Hello, dost!\nWelcome here, the brand new random color kicker is here!!!\nBest of Luck`);
window.points=0;
window.seconds=0;
window.katl=false;
setInterval(()=>{
    if(seconds==60){
        window.seconds++;
        window.katl=true;
        //document.write('');
        alert('Haan ji, Aapka total hua '+points+', 1 minute  me');
    }else{
        if(window.katl==false){
            window.seconds++;
            document.querySelector('.time').innerText='Seconds: '+seconds;
        }
    }
},1000)