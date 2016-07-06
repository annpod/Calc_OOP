class Calculator{

  constructor(id){
    this._idEL = id;
    this._templateEL = null;
    this._screenEL = null;
    this._resetBtn = null;
    this._enterBtn = null;
    this.firstValue = '';
    this.secondValue = '';
    this.actionValue = '';
    this.getValue = '';
    this.generateHTML();


  }

  generateHTML() {
    var self = this;
    $.get("calculator_template.html", function(template){
      self._templateEL = $(template);
      self._screenEL = $('input.screen', self._templateEL);
      //self.updateScreen(self._idEL);
      self._resetBtn = $('span.reset', self._templateEL); 
      self._enterBtn = $('span.enter', self._templateEL);
      self._digitBtn = $('table .button', self._templateEL);
      self._templateEL.attr('id', self._idEL);
      self.addEvents();
      $("#content").append(self._templateEL);
    });
  };

  addEvents() {
    var self = this;
    /*reset button click*/
    self._resetBtn.click(function(){
      self.updateScreen(0);
    });
    /*enter button click*/
    self._enterBtn.click(function(){
      self.calculate();
    });
    /*digit button click*/
    self._digitBtn.click(function(){
      self.inputData();
    });
  };


  updateScreen(newValue){
    this._screenEL.val(newValue);
  };

takeValue(){
  //alert(this._screenEL.val());
  return this._screenEL.val(); 

};

  resetScreen(){
    this.updateScreen(0);
  }

  resetData(){
    this.firstValue = '';
    this.secondValue = '';
    this.actionValue = '';
    this.getValue = '';
  }
    

  inputData(){
    var self = this;
    var action = null;
    var elem = event.target;
    var purpose = elem.getAttribute('data-purpose'); 
    var elemValue = elem.getAttribute('value');
     switch (purpose){
      case "digit":
        if (action === "="){
          self.resetData();
        }
        self.getValue += elemValue;   
        self.updateScreen(parseFloat(self.getValue)); 
        break;
      
      case "action":
        if (( self.firstValue === "" ) || ( this.actionValue ==="=" )){
          self.firstValue = parseFloat(self.takeValue());          
        }
        else {      
          self.secondValue = parseFloat(self.takeValue()); 
          //if(self.firstValue && action && self.secondValue){
            self.firstValue = self.calculate();
            //alert(self.firstValue );
            self.updateScreen(self.firstValue); 
         // } 
        }   
        this.actionValue = elemValue;
        self.getValue = "";
        break;
      };

  };







  calculate() {
     var self = this;
    var a = self.firstValue;
    var op = self.actionValue;
    var b = self.secondValue;
   
  
//console.log("op"+op); 
    var methods = {
      "-": function(a, b) {
        return a - b;
      },
      "+": function(a, b) {
        return a + b;
      },
      "*": function(a, b) {
        return a * b;
      },
      "/": function(a, b) {
        return a / b;
      }
    };

    return methods[op](+a, +b);
  };


}  

