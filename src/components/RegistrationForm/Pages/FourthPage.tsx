import styles from "../RegistrationForm.module.css";
import {useRef} from "react";
import {StateValue} from "xstate";

type FourthPageProps = {
    nextButtonHandler: (password: string | undefined) => void,
    state: StateValue,
    previousHandler: () => void
}

const FourthPage = ({nextButtonHandler, state, previousHandler}: FourthPageProps) => {

    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    const handleNext = () => {
        nextButtonHandler(passwordRef?.current?.value)
    }
    return (
        <div className={state === 'enteringPassword' ? styles['form-step-active'] : styles['form-step']}>
            <div className={styles['input-group']}>
                <label htmlFor='password'>Password</label>
                <input type='password' ref={passwordRef} name={'password'} id={'password'}/>
            </div>
            <div className={styles['input-group']}>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type='password' ref={confirmPasswordRef} name={'confirmPassword'} id={'confirmPassword'}/>
            </div>
            <div className={`btns-group`}>
                <a href="#" className={`btn btn-previous`} onClick={previousHandler}>Previous</a>
                <input type={"submit"} value={"Submit"} className={`btn`} onClick={handleNext}/>
            </div>
        </div>
    )
}

export default FourthPage;