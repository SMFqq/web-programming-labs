console.log("Інструкція: викличте функцію triangle(val1, type1, val2, type2)");
console.log("Типи: leg, hypotenuse, adjacent angle, opposite angle, angle");

function triangle(val1, type1, val2, type2) {
    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Неправильно вказані типи. Перечитайте інструкцію.");
        return "failed";
    }

    if (val1 <= 0 || val2 <= 0) {
        console.log("Zero or negative input");
        return "Zero or negative input";
    }

    const args = [
        { val: val1, type: type1 },
        { val: val2, type: type2 }
    ];

    const getArg = (t) => args.find(arg => arg.type === t);
    const toRad = (deg) => deg * (Math.PI / 180);
    const toDeg = (rad) => rad * (180 / Math.PI);
    // Функція для красивого округлення (до 4 знаків)
    const format = (n) => Number.isInteger(n) ? n : parseFloat(n.toFixed(4));

    let a, b, c, alpha, beta;

    if (type1 === "leg" && type2 === "leg") {
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = toDeg(Math.atan(b / a));
    } 
    else if (getArg("leg") && getArg("hypotenuse")) {
        a = getArg("leg").val;
        c = getArg("hypotenuse").val;

        if (a >= c) {
            console.log("Zero or negative input");
            return "Zero or negative input";
        }

        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    } 
    else if (getArg("leg") && getArg("adjacent angle")) {
        a = getArg("leg").val;
        beta = getArg("adjacent angle").val;

        if (beta >= 90) return "Zero or negative input";

        alpha = 90 - beta;
        c = a / Math.cos(toRad(beta));
        b = Math.sqrt(c * c - a * a);
    } 
    else if (getArg("leg") && getArg("opposite angle")) {
        a = getArg("leg").val;
        alpha = getArg("opposite angle").val;

        if (alpha >= 90) return "Zero or negative input";

        beta = 90 - alpha;
        c = a / Math.sin(toRad(alpha));
        b = Math.sqrt(c * c - a * a);
    } 
    else if (getArg("hypotenuse") && getArg("angle")) {
        c = getArg("hypotenuse").val;
        alpha = getArg("angle").val;

        if (alpha >= 90) return "Zero or negative input";

        beta = 90 - alpha;
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
    } 
    else {
        console.log("Неможлива комбінація аргументів.");
        return "failed";
    }

    console.log(`a = ${format(a)}`);
    console.log(`b = ${format(b)}`);
    console.log(`c = ${format(c)}`);
    console.log(`alpha = ${format(alpha)}`);
    console.log(`beta = ${format(beta)}`);

    return "success";
}