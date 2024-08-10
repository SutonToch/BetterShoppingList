import { ChangeEvent, SetStateAction, useEffect, useRef, useState } from "react"
import "./../styles/settingsDropdown.css"
import { VerticalDots } from "./Icons"
import FileSaver from "file-saver"

interface SettingsDropdownProps {
    allItemList:Array<any>
    setAllItemList:React.Dispatch<SetStateAction<any>>
}

export default function SettingsDropdown(props:SettingsDropdownProps) {
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false)
    const [file, setFile] = useState<File>();
    const inputRef = useRef<HTMLInputElement | null>(null);

    function redirectUploadData() {
        inputRef.current?.click();
    }

    function uploadData(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        setFile(e.target.files[0]);
    }

    useEffect(() => {
        if(!file) {
            return;
        }

        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: file,
            headers: {
              'content-type': file.type,
              'content-length': `${file.size}`,
            },
          })
            .then((res) => res.json())
            .then((data) => props.setAllItemList(data.json))
            .then(() => setFile(undefined))
            .catch((err) => console.error(err));
    }, [file])

    function downloadData() {
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
                        <li onClick={() => redirectUploadData()}>Daten hochladen</li>
                        <input 
                            type="file"
                            ref={inputRef}
                            onChange={uploadData}
                            style={{display: "none"}}
                        />
                        <li onClick={() => downloadData()}>Daten downloaden</li>
                    </ul>
                </div>
            </div>
        : ""}
    </>
  )
}
