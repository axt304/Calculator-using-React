import {ACTIONS} from './App'

// DigitButton component represents a button for entering digits in the calculator.
// It dispatches an action to add the clicked digit to the current operand.
export default function DigitButton({dispatch,digit}){
    return (
    // Button component with an onClick handler that dispatches the ADD_DIGIT action
    <button onClick={()=>dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}>
        {digit}
    </button>
    )
}