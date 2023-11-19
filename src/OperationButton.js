import {ACTIONS} from './App'

// OperationButton component represents a button for selecting mathematical operations.
// It dispatches an action to choose the clicked operation, triggering the calculator state update.
export default function OperationButton({dispatch,operation}){
    return (
    // Button component with an onClick handler that dispatches the CHOOSE_OPERATION action
    <button onClick={()=>dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>
        {operation}
    </button>
    )
}