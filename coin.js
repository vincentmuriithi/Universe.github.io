window.onload = () => {
    //var canvas = document.querySelector("#canvas");
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var color = "blue";
    let level = $("#level");
    let x = 240;
    let y = 95;
    let t = Date.now();
    let speed = 300;
    var dir = 0;
    var cx = Math.random() * (640 - 20);
    var cy = Math.random() * (400 - 30);
    var up = document.getElementById("up");
    let down = document.querySelector("#down");
    let left = document.querySelector("#left");
    let right = document.querySelector("#right");
    var timePassed;
    let score = 0;
    const keys = {};
    var tom = new Image();
    tom.src = "toml.jpg";
    var bg = new Image();
    bg.src = "cv_bg.jpg";
    var lv = 2;
    const audio = new Audio("cgr.m4a");
    const dior = new Audio("dior.wav");
    let level_up = $("#level_up");
    level_up.fadeOut();
    let blue_rect_length = 30;
    let blue_rect_width = 40;
    let coin_rect_length = 20;
    let coin_rect_width = 30;

    const mediaQuery = window.matchMedia("(max-width: 600px)");
    mediaQuery.addListener( (event) =>
    {
        if (mediaQuery.matches)
        {
            canvas.height = 550;
        }
    } 
    );



    $(document).on("keydown", (event) => {
        keys[event.key] = true;
    });
    $(document).on("keyup", (event) => {
        keys[event.key] = false;
    });
    up.onmousedown = () => dir = 4;
    down.onmousedown = () => dir = 3;
    left.onmousedown = () => dir = 2;
    right.onmousedown = () => dir = 1;

    up.onmouseup = () => { dir = 0; }
    down.onmouseup = () => { dir = 0; }
    left.onmouseup = () => { dir = 0; }
    right.onmouseup = () => { dir = 0; }

     up.ontouchstart = () => dir = 4;
    down.ontouchstart = () => dir = 3;
    left.ontouchstart = () => dir = 2;
    right.ontouchstart = () => dir = 1;

    up.ontouchend = () => { dir = 0; }
    down.ontouchend = () => { dir = 0; }
    left.ontouchend = () => { dir = 0; }
    right.ontouchend = () => { dir = 0; }

    const key_checker = () => {
        if (keys["ArrowUp"] && y > 0)
            y -= speed * timePassed;
        else if (keys["ArrowDown"] && y + blue_rect_width < canvas.height)
            y += speed * timePassed;
        else if (keys["ArrowRight"] && x + blue_rect_length < canvas.width)
            x += speed * timePassed;
        else if (keys["ArrowLeft"] && x > 0)
            x -= speed * timePassed;

    };
    const draw = () => {
        timePassed = (Date.now() - t) / 1000;
        t = Date.now();

        ctx.clearRect(0, 0, 640, 400);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.font = "22px Aerial ";
        ctx.fillText("Score: " + score, 1, 20);

        ctx.beginPath();

        ctx.rect(x, y, blue_rect_length, blue_rect_width);

        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(cx, cy, coin_rect_length, coin_rect_width);
        ctx.fillStyle = "yellow";
        ctx.fill();

        if (dir === 1 && x + coin_rect_length < 640) {
            x += speed * timePassed;
        } else if (dir === 2 && x > 0) {
            x -= speed * timePassed;
        } else if (dir === 3 && y + coin_rect_width < 400) {
            y += speed * timePassed;
        } else if (dir === 4 && y > 0) {
            y -= speed * timePassed;
        }
        key_checker();
        
        if (cx <= x + blue_rect_length && x <= cx + coin_rect_length && cy <= y + blue_rect_width && y <= cy + coin_rect_width) {
            score++;
            cx = Math.random() * (640 - 20);
            cy = Math.random() * (400 - 30);
            if (score > 0 && score % 20 == 0 ) {
                level.text(`level ${lv}`);
                lv++;
                audio.play();
                            }
                            if (score > 10 && score % 10 == 0)
                             {
                                dior.play();
                                 level_up.fadeToggle(200);
                                                             }
                             else
                                level_up.fadeOut(200);
        }
        window.requestAnimationFrame(draw);

    };
    draw();
}