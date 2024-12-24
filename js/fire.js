// let c = document.getElementById("canvas")
// let ctx = c.getContext("2d")

// let cwidth, cheight;
// let shells = [];
// let pass = [];

// let colors = ['ff5252','#ff4081', '#e040fb', '#7c4dff', '#53dff', '#40cdff', '#18ffff', '#69f0ae', '#b2fff59'];

// window.onresize = function () {reset();}
// reset();
// function reset(){
//     cwidth = window.innerWidth;
//     cheight = window.innerHeight;
//     c.width = cwidth;
//     c.height = cheight;
// }

// function newShell(){
//     let left = (Math.random() > 0.5);
//     let shell = {};
//     shell.X = (1 * left)
//     shell.y = 1;
//     shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1: -1);
//     shell.yoff = 0.01 + Math.random() * 0.007;
//     shell.size = Math.random() *  6+3;
//     shell.color = colors[Math.floor(Math.random() * colors.length)]

//     shells.push(shell);
// }
// function newPass(shell){
//     let pasCount =  Math.ceil(Math.pow(shell.size, 2) * Math.PI);

//     for( i = 0; i < pasCount; i++){
//         let pas = {};
//         pas.x = shell.x * cwidth;
//         pas.y = shell.y * cheight;

//         let a = Math.random() * 4;
//         let s = Math.random() * 10;

//         pas.xoff = s * Math.sin((5-a) * (Math.PI / 2));
//         pas.yoff = s * Math.sin(a * (Math.PI / 2));

//         pas.color = shell.color;
//         pas.size = Math.sqrt(shell.size);

//         if(pass.length < 1000){pass.push(pas);}
//     }
// }

// let lastRun = 0;
// Run();
// function Run(){
//     let dt = 1;
//     if(lastRun != 0){
//         dt = Math.min(50, (performance.now() - lastRun));
//     }
//     lastRun = performance.now();

//     ctx.fillStyle = "rgba(0,0,0,0.25)";
//     ctx.fillRect(0,0,cwidth,cheight);

//     if((shells.length < 10) && (Math.random() < 0.96)){newShell();}

//     for(let ix in shells){
//         let shell = shells[ix];

//         ctx.beginPath();
//         ctx.arc(shell.x * cwidth,shell.y * cheight, shell.size, 0, 2 * Math.PI);
//         ctx.fillStyle = shell.color;
//         ctx.fill();

//         shell.x -= shell.xoff;
//         shell.y -= shell.yoff;
//         shell.xoff -= (shell.xoff * dt * 0.001);
//         shell.yoff -= (shell.yoff + 0.2) * dt * 0.00005;

//         if(shell.yoff < -0.005){
//             newPass(shell);
//             shells.splice(ix, 1);
//         }
//     }

//     for(let ix in pass){
//         let pas = pass[ix];

//         ctx.beginPath();
//         ctx.arc(pas.x, pas.y, pas.size, 0,2 * Math.PI);
//         ctx.fillStyle = pas.color;
//         ctx.fill();

//         pas.x -= pas.xoff;
//         pas.y -= pas.yoff;
//         pas.xoff -= (pas.xoff * dt * 0.001);
//         pas.yoff -= ((pas.yoff + 5) * dt * 0.00005);
//         pas.size -= (dt * 0.002 * Math.random());

//         if((pas.y > cheight) || (pas.y < -50) || (pas.size <= 0)){
//             pass.splice(ix, 1);
//         }
//     }
//     requestAnimationFrame(Run);
// }


let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let cwidth, cheight;
let shells = [];
let pass = [];

let colors = ['#ff5252', '#ff4081', '#e040fb', '#7c4dff', '#53d5ff', '#40cdff', '#18ffff', '#69f0ae', '#b2ff59'];

window.onresize = function () {
    reset();
};
reset();

function reset() {
    cwidth = window.innerWidth;
    cheight = window.innerHeight;
    c.width = cwidth;
    c.height = cheight;
}

function newShell() {
    let left = Math.random() > 0.5;
    let shell = {};
    shell.x = left ? 1 : 0; // Position horizontale initiale
    shell.y = 1; // Position verticale initiale
    shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1); // Déplacement horizontal
    shell.yoff = 0.01 + Math.random() * 0.007; // Déplacement vertical
    shell.size = Math.random() * 6 + 3; // Taille
    shell.color = colors[Math.floor(Math.random() * colors.length)]; // Couleur aléatoire

    shells.push(shell);
}

function newPass(shell) {
    let pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

    for (let i = 0; i < pasCount; i++) {
        let pas = {};
        pas.x = shell.x * cwidth;
        pas.y = shell.y * cheight;

        let angle = Math.random() * 2 * Math.PI; // Angle en radians
        let speed = Math.random() * 10;

        pas.xoff = speed * Math.cos(angle);
        pas.yoff = speed * Math.sin(angle);

        pas.color = shell.color;
        pas.size = Math.sqrt(shell.size);

        if (pass.length < 1000) {
            pass.push(pas);
        }
    }
}

let lastRun = 0;
Run();

function Run() {
    let dt = 1;
    if (lastRun !== 0) {
        dt = Math.min(50, performance.now() - lastRun);
    }
    lastRun = performance.now();

    // Effacer l'écran avec une transparence
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, cwidth, cheight);

    // Ajouter de nouvelles fusées
    if (shells.length < 10 && Math.random() < 0.96) {
        newShell();
    }

    // Mettre à jour les fusées
    for (let i = shells.length - 1; i >= 0; i--) {
        let shell = shells[i];

        ctx.beginPath();
        ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
        ctx.fillStyle = shell.color;
        ctx.fill();

        shell.x -= shell.xoff;
        shell.y -= shell.yoff;
        shell.xoff -= shell.xoff * dt * 0.001;
        shell.yoff -= (shell.yoff + 0.2) * dt * 0.00005;

        if (shell.yoff < -0.005) {
            newPass(shell);
            shells.splice(i, 1);
        }
    }

    // Mettre à jour les particules
    for (let i = pass.length - 1; i >= 0; i--) {
        let pas = pass[i];

        ctx.beginPath();
        ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
        ctx.fillStyle = pas.color;
        ctx.fill();

        pas.x -= pas.xoff;
        pas.y -= pas.yoff;
        pas.xoff -= pas.xoff * dt * 0.001;
        pas.yoff -= (pas.yoff + 5) * dt * 0.00005;
        pas.size -= dt * 0.002 * Math.random();

        if (pas.y > cheight || pas.y < -50 || pas.size <= 0) {
            pass.splice(i, 1);
        }
    }

    requestAnimationFrame(Run);
}
