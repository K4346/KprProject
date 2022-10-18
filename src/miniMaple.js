class MiniMaple {


    calculateDiff(str) {
        let F = str.split(',')[0].replace(" ","")
        let n = str.split(',')[1].replace(" ","")
        let notAllowed = F.indexOf("/") !== -1 || F.indexOf("%") !== -1 || F.indexOf("&") !== -1 || F.indexOf("|") !== -1
        if (notAllowed) throw new Error("Присутствует недопустимый символ")
        let v = 0
        let sign = ''
        let finalExpression = ''
        for (let i = 0; i <= F.length; i++) {
            if (i === 0) continue
            if (F[i] === '+' || F[i] === '-' || i === F.length) {
                let f = this.diffF(F.substring(v, i), n)
                if (f !=='0') {
                    finalExpression += sign + this.diffF(F.substring(v, i), n)
                }
                sign = F[i]
                v = i + 1
            }
        }
        if (finalExpression.charAt(0)==='+')
        return finalExpression.substring(1,finalExpression.length)
        else
        return finalExpression
    }

    diffF(diff, n) {
        // a*x^k
        let array = diff.split(n)
        if (array[1] === ''){
            array[1] = '^1'
        }
        if (array.length === 1) return '0'
        let k = parseInt(array[1].replace('^', ''), 10)
        if (k === 2) {
            array[1] = ""
        } else {
            array[1] = "^" + (k - 1).toString()
        }

        let a = parseInt(array[0].replace('*', ''), 10)
        if (isNaN(a)) {
            a = 1
        }
        array[0] = (a * k).toString() + '*' + n
        return (array.join(''))
    }

}


export {MiniMaple}