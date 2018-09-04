import * as React from 'react';
import { SendForgotPasswordEmailMutationVariables } from '../../schemaTypes';
interface Props {
    children: (data: {
        submit: (values: SendForgotPasswordEmailMutationVariables) => Promise<null>;
    }) => JSX.Element | null;
}
export declare const ForgotPasswordController: React.ComponentClass<Props>;
export {};
