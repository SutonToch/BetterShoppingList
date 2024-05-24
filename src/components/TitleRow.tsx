import "./../styles/titleRow.css"
import { ArrowLeft, VerticalDots } from "./Icons"

interface TitleRowProps {
  title:string
  backOnClick?:React.MouseEventHandler<HTMLButtonElement>
}

export default function TitleRow(props:TitleRowProps) {

  return (
    <div className="title-row">
        {props.backOnClick ? 
            <button className="back-btn" onClick={props.backOnClick}>
                <ArrowLeft />
            </button> : ""
        }
        <h1 className="title">{props.title}</h1>
        <VerticalDots />
    </div>
  )
}
