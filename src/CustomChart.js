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
        let fromX = 5, fromY = 0, toX = 75, toY
        const amount = Math.abs(util.formatFloatToDisplayingAmount(floatFixed(values[0].value - values[1].value)))
        if (values[0].value === values[1].value) {
            toY = 0
            text = 'Не изменилось'
        } else if (values[0].value < values[1].value) {
            fromY = 70
            toY = 0
            text= `+${amount}₽`
        } else {
            fromY = 0
            toY = 70
            text= `-${amount}₽`
        }
        const ctx = this.canvas.getContext(`2d`)
        ctx.beginPath();
        canvas_arrow(ctx, fromX, fromY, toX, toY);
        ctx.font = `18px Tahoma`;
        ctx.fillText(text, toX + 5, (fromY + toY) / 2);
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


}

export {CustomChart}