

(function(){
    var calcs = [];

    $(document).on('click', '#add_calculator', function (){
        var id4Calc = Date.now();
        calcs[id4Calc] = new Calculator(id4Calc);
    });

})();