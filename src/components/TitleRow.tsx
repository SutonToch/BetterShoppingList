import "./../styles/titleRow.css"

interface TitleRowProps {
  title:string
  backOnClick?:React.MouseEventHandler<HTMLButtonElement>
}

export default function TitleRow(props:TitleRowProps) {

  return (
    <div className="title-row">
        {props.backOnClick ? 
            <button className="back-btn" onClick={props.backOnClick}>
                {"<-"}
            </button> : ""
        }
        <h1 className="title">{props.title}</h1>
        <button className="settings-btn">
            s {/*to be replaced with an image*/}
        </button>
    </div>
  )
}
