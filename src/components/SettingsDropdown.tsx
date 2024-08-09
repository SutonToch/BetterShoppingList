import { useState } from "react"
import "./../styles/settingsDropdown.css"
import { VerticalDots } from "./Icons"
import FileSaver from "file-saver"

interface SettingsDropdownProps {
    allItemList:Array<any>
}

export default function SettingsDropdown(props:SettingsDropdownProps) {
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false)

    function importData() {
        //https://www.codefrontend.com/file-upload-reactjs/
    }

    function exportData() {
        const json = JSON.stringify(props.allItemList)
        const blob = new Blob([json], {
            type: 'application/octet-stream'
        });

        FileSaver.saveAs(blob, "data.json");
    }

  return (
    <>
        <div className="open-dropdown-btn" 
            onClick={() => setShowSettingsDropdown(true)}
        >
            <VerticalDots />
        </div>
        
        {showSettingsDropdown ? 
            <div className="close-settings-overlay"
                onClick={() => setShowSettingsDropdown(false)}
            >
                <div className="settings-dropdown" onClick={(e) => e.stopPropagation()}>
                    <ul>
                        <li onClick={() => importData()}>Daten importieren</li>
                        <li onClick={() => exportData()}>Daten downloaden</li>
                    </ul>
                </div>
            </div>
        : ""}
    </>
  )
}
