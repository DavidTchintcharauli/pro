export function UserDescriptionComponent(props) {
  return (
    <div className="descriptionComponent">
      <div className="descriptionValue">{props.descValue}</div> 
      <div>{props.descProp}</div> 
    </div>
  )
}
