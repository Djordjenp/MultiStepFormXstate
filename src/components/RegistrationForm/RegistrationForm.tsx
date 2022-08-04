import styles from './RegistrationForm.module.css'
import {useMachine} from "@xstate/react";
import registrationFormMachine from "./RegistrationFormMachine";
import {FormEvent, useRef} from "react";
import FirstPage from "./Pages/FirstPage";
import SecondPage from "./Pages/SecondPage";
import ThirdPage from "./Pages/ThirdPage";
import FourthPage from "./Pages/FourthPage";


const RegistrationForm = () => {

    const [current, send] = useMachine(registrationFormMachine)

    const progressStepOne = useRef<HTMLDivElement>(null)
    const progressStepTwo = useRef<HTMLDivElement>(null)
    const progressStepThree = useRef<HTMLDivElement>(null)



    const firstPageNext = (username: string | undefined, position: string | undefined) => {
        if (!username || !position) return;
        send({type: 'ENTER_USERNAME', payload: {username: username, position: position}})
    }

    const secondPageNext = (phone: string | undefined, email: string | undefined) => {
        if (!phone || !email) return;
        send({type: 'ENTER_CONTACT', payload: {phone: phone, email: email}})
    }

    const thirdPageNext = (dateOfBirth: string | undefined, nationalID: string | undefined) => {
        if (!dateOfBirth || !nationalID) return;
        send({type: 'ENTER_ID', payload: {dateOfBirth: dateOfBirth, nationalID: nationalID}})
    }

    const fourthPageFinish = (password: string | undefined) => {
        if (!password) return;
        send({type: 'ENTER_PASSWORD', payload: {password: password}})
    }

    const previousHandler = () => {
        send({type: 'PREVIOUS'})
    }

    console.log(current.context)

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
    }



    return (
        <form onSubmit={submitHandler} action='#' className={styles.form}>
            <h2 className={`text-center`}>Registration Form</h2>

            <div className={styles[`progressbar`]}>
                <div className={styles[`progress-before`]} style={{width: `${current.context.formPercentage}%`}} />
                <div className={styles[`progress-step`]} data-active={current.matches("enteringUsername") ? "true" : 'false'} data-title={"Intro"}></div>
                <div className={styles[`progress-step`]} data-active={current.matches("enteringContact") ? "true" : 'false'} data-title={"Contact"}></div>
                <div className={styles[`progress-step`]} data-active={current.matches("enteringID") ? "true" : 'false'} data-title={"ID"}></div>
                <div className={styles[`progress-step`]} data-active={current.matches("enteringPassword") ? "true" : 'false'} data-title={"Password"}></div>
            </div>


            <FirstPage nextButtonHandler={firstPageNext} state={current.value} />
            <SecondPage previousHandler={previousHandler} nextButtonHandler={secondPageNext} state={current.value}/>
            <ThirdPage previousHandler={previousHandler} nextButtonHandler={thirdPageNext} state={current.value} />
            <FourthPage nextButtonHandler={fourthPageFinish} state={current.value} previousHandler={previousHandler}/>
            {/*<div className={styles['form-step-active']}>*/}
            {/*    <div className={styles['input-group']}>*/}
            {/*        <label htmlFor={'username'} >Username</label>*/}
            {/*        <input type='text' ref={usernameRef} name={'username'} id={'username'}/>*/}
            {/*    </div>*/}
            {/*    <div className={styles['input-group']}>*/}
            {/*        <label htmlFor='position'>Position</label>*/}
            {/*        <input type='text' ref={positionRef} name={'position'} id={'position'}/>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <a href="#" className={`btn btn-next width-50 ml-auto`} onClick={firstPageNext}>Next</a>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className={styles['form-step']}>*/}
            {/*    <div className={styles['input-group']}>*/}
            {/*        <label htmlFor='phone'>Phone</label>*/}
            {/*        <input type='tel' name={'phone'} id={'phone'}/>*/}
            {/*    </div>*/}
            {/*    <div className={styles['input-group']}>*/}
            {/*        <label htmlFor='email'>Email</label>*/}
            {/*        <input type='email' name={'email'} id={'email'}/>*/}
            {/*    </div>*/}
            {/*    <div className={`btns-group`}>*/}
            {/*        <a href="#" className={`btn btn-previous`}>Previous</a>*/}
            {/*        <a href="#" className={`btn btn-next`}>Next</a>*/}
            {/*    </div>*/}
            {/*</div>*/}


            {/*<div className={styles['form-step']}>*/}
            {/*    <div className={styles['input-group']}>*/}
            {/*        <label htmlFor='dob'>Date of Birth</label>*/}
            {/*        <input type='date' name={'dob'} id={'dob'}/>*/}
            {/*    </div>*/}
            {/*    <div className={styles['input-group']}>*/}
            {/*        <label htmlFor='ID'>National Id</label>*/}
            {/*        <input type='number' name={'ID'} id={'ID'}/>*/}
            {/*    </div>*/}
            {/*    <div className={`btns-group`}>*/}
            {/*        <a href="#" className={`btn btn-previous`}>Previous</a>*/}
            {/*        <a href="#" className={`btn btn-next`}>Next</a>*/}
            {/*    </div>*/}
            {/*</div>*/}


            {/*<div className={styles['form-step']}>*/}
            {/*    <div className={styles['input-group']}>*/}
            {/*        <label htmlFor='password'>Password</label>*/}
            {/*        <input type='password' name={'password'} id={'password'}/>*/}
            {/*    </div>*/}
            {/*    <div className={styles['input-group']}>*/}
            {/*        <label htmlFor='confirmPassword'>Confirm Password</label>*/}
            {/*        <input type='password' name={'confirmPassword'} id={'confirmPassword'}/>*/}
            {/*    </div>*/}
            {/*    <div className={`btns-group`}>*/}
            {/*        <a href="#" className={`btn btn-previous`}>Previous</a>*/}
            {/*        <input type={"submit"} value={"Submit"} className={`btn`}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </form>
    )
}

export default RegistrationForm;