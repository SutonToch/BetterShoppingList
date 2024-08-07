import { useState } from "react"
import "./../styles/settingsDropdown.css"
import { VerticalDots } from "./Icons"

interface SettingsDropdownProps {}

export default function SettingsDropdown(props:SettingsDropdownProps) {
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false)

    function exportData() {

    }

    function importData() {
        //https://www.codefrontend.com/file-upload-reactjs/
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
