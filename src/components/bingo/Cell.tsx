import { useState } from "react"
import { connect } from "react-redux"
import { addMarkedNumber } from "../../action_creators/CellAction"
function Cell(props: any) {
    const [marked, setMarked] = useState(false)
    if(props.number === Math.ceil(props.size*props.size/2) && props.marked.find((element:number) => element === props.number) === undefined && !marked) {
        mark()
    }
    function mark() {
        if(marked)
            return;
        setMarked(true)
        props.addMarkedNumber(props.number)
    }
    return <button className={"cell " + (marked ? "marked stroke" : "")} disabled={marked} type="button" onClick={mark}>{props.content}</button>
}
const mapDispatchToProps = {
    addMarkedNumber
}
function mapStateToProps(state: any) {
    return {marked: state.marked}
}
export default connect(mapStateToProps, mapDispatchToProps)(Cell)