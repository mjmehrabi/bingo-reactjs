import { useState } from "react"
import { connect } from "react-redux"
import { addMarkedNumber } from "../../action_creators/CellAction"
function Cell(props: any) {
    const [marked, setMarked] = useState(false)
    const centerCell = props.number === Math.ceil(props.size*props.size/2);
    if(centerCell && props.marked.find((element:number) => element === props.number) === undefined && !marked) {
        mark()
    }
    function mark() {
        if(marked)
            return;
        setMarked(true)
        props.addMarkedNumber(props.number)
    }
    return <button className={"cell" + (marked ? " marked" + (!centerCell ? " stroke" : "") : "")} disabled={marked} type="button" onClick={mark}>{centerCell ? "Made With ❤️" : props.content}</button>
}
const mapDispatchToProps = {
    addMarkedNumber
}
function mapStateToProps(state: any) {
    return {marked: state.marked}
}
export default connect(mapStateToProps, mapDispatchToProps)(Cell)