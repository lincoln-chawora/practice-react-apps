import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
export interface CustomerState {
    fullName: string;
    nationalID: string;
    createdAt: string;
}

// Define the initial state using the interface
const initialState: CustomerState = {
    fullName: '',
    nationalID: '',
    createdAt: ''
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        createCustomer: {
            // Reducer now has state typed as CustomerState and action typed as PayloadAction<CreateCustomerPayload>
            reducer(state: CustomerState, action: PayloadAction<CustomerState>) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = action.payload.createdAt;
            },
            // Prepare method types its arguments and returns an object with the typed payload
            prepare(fullName: string, nationalID: string) {
                return {
                    payload: {
                        fullName,
                        nationalID,
                        createdAt: new Date().toISOString()
                    }
                };
            },
        },
    },
});

// Export the action
export const { createCustomer } = customerSlice.actions;

// Export the reducer
export default customerSlice.reducer;
