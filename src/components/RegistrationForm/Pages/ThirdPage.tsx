import styles from "../RegistrationForm.module.css";
import {useRef} from "react";
import {StateValue} from "xstate";

type thidPageProps = {
    nextButtonHandler : (dateOfBirth: string | undefined, nationalId: string | undefined) => void,
    state: StateValue,
    previousHandler: () => void
}

const ThirdPage = ({nextButtonHandler, state, previousHandler}: thidPageProps) => {
    const dateOfBirthRef = useRef<HTMLInputElement>(null)
    const nationalIdRef = useRef<HTMLInputElement>(null)

    const handleNext = () => {
        nextButtonHandler(dateOfBirthRef.current?.value, nationalIdRef.current?.value)
    }

    return (
        <div className={state === 'enteringID' ? styles['form-step-active'] : styles['form-step']}>
            <div className={styles['input-group']}>
                <label htmlFor='dob'>Date of Birth</label>
                <input type='text' ref={dateOfBirthRef} name={'dob'} id={'dob'}/>
            </div>
            <div className={styles['input-group']}>
                <label htmlFor='ID'>National Id</label>
                <input type='text' ref={nationalIdRef} name={'ID'} id={'ID'}/>
            </div>
            <div className={`btns-group`}>
                <a href="#" className={`btn btn-previous`} onClick={previousHandler}>Previous</a>
                <a href="#" className={`btn btn-next`} onClick={handleNext}>Next</a>
            </div>
        </div>
    )
}

export default ThirdPage;