import styles from "../RegistrationForm.module.css";
import {useRef} from "react";
import {StateValue} from "xstate";

type SecondPageProps = {
    nextButtonHandler: (phone: string | undefined, email: string | undefined) => void,
    state: StateValue,
    previousHandler: () => void

}

const SecondPage = ({nextButtonHandler, state, previousHandler} : SecondPageProps) => {

    const phoneRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const handleNext = () => {
        nextButtonHandler(phoneRef.current?.value, emailRef.current?.value)
    }

    return (
        <div className={state === 'enteringContact' ? styles['form-step-active'] : styles['form-step']}>
            <div className={styles['input-group']}>
                <label htmlFor='phone'>Phone</label>
                <input type='text' ref={phoneRef} name={'phone'} id={'phone'}/>
            </div>
            <div className={styles['input-group']}>
                <label htmlFor='email'>Email</label>
                <input type='text' ref={emailRef} name={'email'} id={'email'}/>
            </div>
            <div className={`btns-group`}>
                <a href="#" className={`btn btn-previous`} onClick={previousHandler}>Previous</a>
                <a href="#" className={`btn btn-next`} onClick={handleNext}>Next</a>
            </div>
        </div>
    )
}

export default SecondPage;