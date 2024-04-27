module.exports = func => {
    return (req,res,next) => {
        func(req,res,next).catch(next);
    }
}

//To wrap our asynchronous function 
//return a new function that has func executed
//and catches any error that is passes into next