class PenBrush {

    constructor() {
        this.opacity = 1;
        this.name = "PenBrush";
    }

    draw(ctx, strokeStyle, x, y) {
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.strokeStyle = strokeStyle;
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

class DiscBrush extends PenBrush{
    constructor(){
        super();
        this.name = 'DiscBrush';
    }
    draw(ctx, strokeStyle, x,y){
        let r = 20;
        ctx.beginPath();
        ctx.arc(x,y, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = strokeStyle;
        ctx.fill();
        ctx.closePath();

    }
}

class StarBrush extends PenBrush {
    constructor(){
        super();
        this.name = 'StarBrush';
    }

    draw(ctx, strokeStyle, x, y) {

        let or = 20;
        let ir = 7;
	let v = 5
        ctx.beginPath();

        for(let i = 0; i < 2*v; ++i) {
            let dx = Math.cos(Math.PI/v * i) * ( i % 2 === 0 ? or : ir);
            let dy = Math.sin(Math.PI/v * i) * ( i % 2 === 0 ? or : ir);
            ctx.lineTo(x+dx, y-dy);
        }
        ctx.fillStyle = strokeStyle;
        ctx.fill();

        ctx.closePath();
    }
}

window.brushes = {
    'Penbrush' : PenBrush,
    'Discbrush': DiscBrush,
    'Starbrush': StarBrush
}


