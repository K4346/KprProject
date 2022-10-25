class CustomChart {

    constructor(canvas) {
        this.canvas = canvas
    }

    clear() {
        this.canvas.getContext(`2d`).clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawArrow(values, util) {
        function floatFixed(fValue){
            return parseFloat( fValue.toFixed(8) );
        }
        this.clear()
        let text
        let fromx = 5, fromy = 0, tox = 75, toy
        const amount = Math.abs(util.formatFloatToDisplayingAmount(floatFixed(values[0].value - values[1].value)))
        if (values[0].value === values[1].value) {
            toy = 0
            text = 'Не изменилось'
        } else if (values[0].value < values[1].value) {
            fromy = 70
            toy = 0
            text= `+${amount}₽`
        } else {
            fromy = 0
            toy = 70
            text= `$-{amount}₽`
        }
        const ctx = this.canvas.getContext(`2d`)
        ctx.beginPath();
        canvas_arrow(ctx, fromx, fromy, tox, toy);
        ctx.font = `18px Tahoma`;
        ctx.fillText(text, tox + 5, (fromy + toy) / 2);
        // canvas_arrow(ctx, 100, 200, 400, 50);
        // canvas_arrow(ctx, 200, 30, 10, 150);
        // canvas_arrow(ctx, 400, 200, 100, 50);
        ctx.stroke();


        function canvas_arrow(context, fromx, fromy, tox, toy) {
            var headlen = 25;
            var dx = tox - fromx;
            var dy = toy - fromy;
            var angle = Math.atan2(dy, dx);
            context.moveTo(fromx, fromy);
            context.lineTo(tox, toy);
            context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
            context.moveTo(tox, toy);
            context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        }
    }

    draw(values) {
        const max = Math.max(...values.map(o => o.value))
        const ctx = this.canvas.getContext(`2d`)


        const Gap = {
            HORIZONTAL: 100,
            VERTICAL: 30
        }

        const BarCoordinate = {
            INITIAL_X: 80,
            INITIAL_Y: 0
        }

        const BarSize = {
            MAX_HEIGHT: this.canvas.height,
            WIDTH: 50
        };

        const LabelCoordinate = {
            INITIAL_X: 30,
            INITIAL_Y: 70
        }


        this.clear()

        let currentBarX = BarCoordinate.INITIAL_X;
        let currentLabelY = LabelCoordinate.INITIAL_Y;

        const gapBetweenBars = BarSize.WIDTH + Gap.HORIZONTAL;

        for (let i = 0; i < values.length; i++) {

            const barHeight = (values[i].value * BarSize.MAX_HEIGHT) / max;
            ctx.save();

            ctx.translate(0, this.canvas.height);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(values[i].date.toUpperCase(), LabelCoordinate.INITIAL_X, currentLabelY);
            ctx.restore();


            ctx.fillRect(currentBarX, BarCoordinate.INITIAL_Y, BarSize.WIDTH, barHeight);

            currentBarX += gapBetweenBars;
            currentLabelY += gapBetweenBars;
        }
    }
}

export {CustomChart}