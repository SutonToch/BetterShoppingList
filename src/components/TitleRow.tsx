import "./../styles/titleRow.css"
import { ArrowLeft } from "./Icons"
import SettingsDropdown from "./SettingsDropdown"

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
        <SettingsDropdown />
    </div>
  )
}
