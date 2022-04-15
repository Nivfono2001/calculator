import React, { Component } from "react";
function createNumberButtons (num) {
    let buttons=[]
    for(let i=0;i<num-1;i++)      
        buttons[i]={key:i,id:i,value:""+i}
    return  buttons 
}

class Calculator extends Component{
 
    state={
        numberBtns: createNumberButtons(10),
        operatorBtns: [{id:0,value:'+'},
        {id:1,value:'-'},{id:2,value:'/'},
        {id:3,value:'*'}],
        expression:"",
        result:0
   };
   clear=()=>{
       this.setState({result:0 ,expression:""})

   }
   getExpression=()=>{
       return this.state.expression
   }
   chagneExpression=charachter=>{
         this.setState({expression: this.state.expression+=charachter})
    }
   
    calculate=async()=>{
        let currentExp=this.state.expression
        const data= {currentExp}
        const response= await fetch('/api',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(data)
        })
        const retdata= await response.json()
        console.log(retdata)
        this.setState({result:this.state.result=retdata.body})
        
        
    
    }
    getResult=()=>{
        return this.state.result
    }
    render(){
        return(
            <div>             
            <h1>welcome to my calculator:</h1>
            <h2>please enter an expression:{this.getExpression()}</h2>
            {this.state.numberBtns.map(btn =><button  onClick={()=>this.chagneExpression(btn.value)}>{btn.value}</button>)}
            <h4>opeators:</h4>
            {this.state.operatorBtns.map(btn =><button  onClick={()=>this.chagneExpression(btn.value)} >{btn.value}</button>)}
            <button   color="#f194ff" onClick={()=>this.calculate()}>Calculate</button>
            <button onClick={()=>this.clear()}>clear</button>
            <h2>Answer:{this.getResult()}</h2>
            </div>
            
        );

    }    
} 
export default Calculator;