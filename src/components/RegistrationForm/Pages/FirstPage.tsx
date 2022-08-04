import styles from "../RegistrationForm.module.css";
import {useRef} from "react";
import {StateValue} from "xstate";

type FirstPageProps = {
    nextButtonHandler: (username: string | undefined, position: string | undefined) => void,
    state: StateValue
}

const FirstPage = ({nextButtonHandler, state} : FirstPageProps) => {
    const usernameRef = useRef<HTMLInputElement>(null)
    const positionRef = useRef<HTMLInputElement>(null)

    const handleNext = () => {
        nextButtonHandler(usernameRef.current?.value, positionRef.current?.value)
    }

    return (
        <div className={state === 'enteringUsername' ? styles['form-step-active'] : styles['form-step']}>
            <div className={styles['input-group']}>
                <label htmlFor={'username'} >Username</label>
                <input type='text' ref={usernameRef} name={'username'} id={'username'}/>
            </div>
            <div className={styles['input-group']}>
                <label htmlFor='position'>Position</label>
                <input type='text' ref={positionRef} name={'position'} id={'position'}/>
            </div>
            <div>
                <a href="#" className={`btn btn-next width-50 ml-auto`} onClick={handleNext}>Next</a>
            </div>
        </div>
    )
}

export default FirstPage;