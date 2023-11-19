import {useReducer} from "react"
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"
import "./styles.css"

// Define action types that can be dispatched by the reducer
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
}

// The reducer function that updates the state based on the dispatched action
function reducer(state, {type, payload}) {
  switch(type){
    case ACTIONS.ADD_DIGIT: 
      // Logic for adding digits to the current operand
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }

    case ACTIONS.DELETE_DIGIT:
      // Logic for deleting digits from the current operand
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if(state.currentOperand == null) return state
      if(state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: "null"
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0,-1)
      }

    case ACTIONS.CHOOSE_OPERATION:
      // Logic for choosing an operation
      if(state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if(state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if(state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: "0",
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: "0"
      }

    case ACTIONS.CLEAR:
      // Logic for clearing the calculator state
      return {
        ...state,
        currentOperand: "0",
        previousOperand: null,
        operation: null
      }

    case ACTIONS.EVALUATE:
      // Logic for evaluating the expression and updating the state
      if(state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }
  }
}

// Helper function to perform arithmetic operations
function evaluate({ currentOperand, previousOperand, operation}) {
   // Logic for performing arithmetic operations
  const prev=parseFloat(previousOperand)
  const current=parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation=""
  switch(operation){
    case "+": 
      computation = prev+current
      break;
    case "-": 
      computation = prev-current
      break;
    case "*": 
      computation = prev*current
      break;
    case "÷": 
      computation = prev/current
      break;
  }
  return computation.toString()
}

// Number formatting for display
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

// Function to format operands for display
function formatOperand(operand){
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal==null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

// Main App component
function App() {
  // Use the reducer to manage the state of the calculator
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {
    currentOperand: "0",  // Set initial value to "0"
    overwrite: false,
    previousOperand: null,
    operation: null,
  });

  return (
    // JSX for rendering the calculator UI
    <div className="calculator-grid">
      <div className="brand">CALCULATOR</div>
      <div className="outputdisplay">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
    <button className="span-two" onClick={()=>dispatch({type: ACTIONS.CLEAR})}>AC</button>
    <button onClick={()=>dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
    <OperationButton operation="÷" dispatch={dispatch} />
    <DigitButton digit="1" dispatch={dispatch} />
    <DigitButton digit="2" dispatch={dispatch} />
    <DigitButton digit="3" dispatch={dispatch} />
    <OperationButton operation="*" dispatch={dispatch} />
    <DigitButton digit="4" dispatch={dispatch} />
    <DigitButton digit="5" dispatch={dispatch} />
    <DigitButton digit="6" dispatch={dispatch} />
    <OperationButton operation="+" dispatch={dispatch} />
    <DigitButton digit="7" dispatch={dispatch} />
    <DigitButton digit="8" dispatch={dispatch} />
    <DigitButton digit="9" dispatch={dispatch} />
    <OperationButton operation="-" dispatch={dispatch} />
    <DigitButton digit="." dispatch={dispatch} />
    <DigitButton digit="0" dispatch={dispatch} />
    <button className="span-two" onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
