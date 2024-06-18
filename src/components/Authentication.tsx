import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./../styles/authentication.css"

interface AuthenticationProps {
    setScene:React.Dispatch<React.SetStateAction<string>>
    setUid:React.Dispatch<React.SetStateAction<string>>
}

export default function Authentication(props:AuthenticationProps) {
    const [email, setEmail] = useState("")
    
    const auth = getAuth();

    function authenticateUser(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, "password")
            .then((userCredential) => {
              props.setUid(userCredential.user.uid)
            })
            .then(() => {props.setScene("main")})
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("Code: " + errorCode + " Message: " + errorMessage)
            });
    }

    return (
      <div className="auth">
          <h1 className="auth-title">Einkaufszettel</h1>
          <form onSubmit={(e) => authenticateUser(e)} className="auth-form">
              <input 
                type="text" 
                placeholder="E-Mail-Adresse" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-form-input"
              />
              <input type="submit" value="Login" className="auth-form-submit"/>
          </form>
      </div>
    )
}
