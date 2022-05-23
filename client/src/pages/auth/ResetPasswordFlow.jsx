import React , {useState} from 'react'
import Auth from './Auth'
import { Loader } from 'semantic-ui-react'
import PasswordRecover from './PasswordRecover'
import PasswordRecoverMail from './PasswordRecoverMail'

export default function ResetPasswordFlow() {

    const [loader, setIsLoader] =useState(false);
    const [isPreview, setIsPreview] = useState(true);
    if (isPreview) {
        return (
         <PasswordRecover/>
        )

    } else {
        return (
            <PasswordRecoverMail />
        )
    }

 
};
