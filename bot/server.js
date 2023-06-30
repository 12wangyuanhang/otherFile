
function lzcbind1(thisarg, thiss, oldarg) {
    thisarg = !!thisarg ? thisarg : { thisarg }
    Object.defineProperty(thisarg, 'fn', {
        value: thiss,
    })
    return (...newarg) => {
        let allarg = [...oldarg, ...newarg]
        thisarg.fn(...allarg)
    }
}

Function.prototype.lzcbind = function(thisarg, arg){
    lzcbind1(thisarg, this, ...arg)
}


function foo(name, age){
    console.log(this.name, name, age)
}

let fo = foo.lzcbind('lzc', [18, 19]);
fo()