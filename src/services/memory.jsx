import { createContext, useReducer } from "react";

export const Context = createContext(null);
const paymentList = [
    {   
        "id":1,
        "service_logo": "https://download.logo.wine/logo/Netflix/Netflix-Logo.wine.png",
        "service": "Netflix",
        "paymentDate": "2023-02-28",
        "amount": 25.9
    },
    {
        "id":2,
        "service_logo": "https://download.logo.wine/logo/Prime_Video/Prime_Video-Logo.wine.png",
        "service": "Amazon Prime Video",
        "paymentDate": "2023-03-01",
        "amount": 25.9
    },
];

const initialState = {
    order:[],
    objects: {}
};

function reducer(state,action){
    switch (action.type){
        case 'list': {
            const payments = action.payments;
            const newState = {
                order: payments.map(payment => payment.id),
                objects: payments.reduce((object, payment) => ({ ...object, [payment.id]:payment}), {})
            };
            return newState;
        }
        case 'create': {
            const id = action.payment.id;
            const newState = {
                order: [...state.order, id],
                objects: {
                    ...state.objects,
                    [id]:action.payment
                }
            };
            return newState;
        }
    }
}

const payments = reducer(initialState, {type: 'list', payments: paymentList})

function Memory({children}) {
    const [state, dispatch] = useReducer(reducer,payments)
    return ( 
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
     );
}

export default Memory;