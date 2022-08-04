import {assign, createMachine} from "xstate";

interface Context {
    username: string,
    position: string,
    phone: string,
    email: string,
    dateOfBirth: string,
    nationalId: string,
    password: string,
    formPercentage: number
}

// type MultiStepFormMachineEvent =
//      {
//     type: 'ENTER_USERNAME';
//     payload: { username: string, position: string };
// }
//
//     | {
//     type: 'ENTER_CONTACT',
//     payload: {phone: string, email: string}
// }



const registrationFormMachine = createMachine<Context>({
    id: 'machine',
    schema: {
        events: {} as
            | { type:'ENTER_USERNAME';  payload: { username: string, position: string }}
            | { type: 'ENTER_CONTACT',   payload: {phone: string, email: string }}
            | { type: 'ENTER_ID',   payload: {dateOfBirth: string, nationalID: string }}
    },
    initial: 'enteringUsername',
    context: {
        username: '',
        position: '',
        phone: '',
        email: '',
        dateOfBirth: '',
        nationalId: '',
        password: '',
        formPercentage: 0,
    },
    states: {
        enteringUsername: {
            on: {
                ENTER_USERNAME: {
                    target: 'enteringContact',
                    actions: ['assignUsername', 'assignPosition', 'increasePercentage']
                }
            }
        },
        enteringContact: {
            on: {
                ENTER_CONTACT: {
                    target: 'enteringID',
                    actions: ['assignPhone', 'assignEmail' , 'increasePercentage']
                },
                PREVIOUS: {
                    target: 'enteringUsername',
                    actions: ['decreasePercentage']
                }
            }
        },
        enteringID: {
            on: {
                ENTER_ID: {
                    target: 'enteringPassword',
                    actions: ['assignDateOfBirth', 'assignNationalID', 'increasePercentage']
                },
                PREVIOUS: {
                    target: 'enteringContact',
                    actions: ['decreasePercentage']
                }
            }
        },
        enteringPassword: {
            on: {
                ENTER_PASSWORD: {
                    target: 'confirming',
                    actions: ['assignPassword', 'increasePercentage']
                },
                PREVIOUS: {
                    target: 'enteringID',
                    actions: ['decreasePercentage']
                }
            }
        },

        confirming: {}
    }
}, {
    actions: {
        assignUsername: assign({
            username: (_, event) => event.payload.username
        }),
        assignPosition: assign({
            position: (_, event) => event.payload.position
        }),

        assignPhone: assign({
            phone:(_, event) => event.payload.phone
        }),

        assignEmail: assign({
            email:(_, event) => event.payload.email
        }),

        assignDateOfBirth: assign({
            dateOfBirth: (_, event) => event.payload.dateOfBirth
        }),

        assignNationalID: assign({
            nationalId: (_, event) => event.payload.nationalID
        }),

        assignPassword: assign({
            password: (_, event) => event.payload.password
        }),

        increasePercentage: assign({
            formPercentage: (ctx) => ctx.formPercentage + 30
        }),

        decreasePercentage: assign({
            formPercentage: (ctx) => ctx.formPercentage - 30
        })

    }
})

export default registrationFormMachine;

