export default function TextInput(props) {
    return (
        <input type="text" onChange={props.stateFunc}></input>
    )
}