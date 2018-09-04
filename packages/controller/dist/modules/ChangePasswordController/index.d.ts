import * as React from 'react';
import { ForgotPasswordChangeMutationVariables } from '../../schemaTypes';
import { NormalizedErrorMap } from '../../types/NormalizedErrorMap';
interface Props {
    children: (data: {
        submit: (values: ForgotPasswordChangeMutationVariables) => Promise<NormalizedErrorMap | null>;
    }) => JSX.Element | null;
}
export declare const ChangePasswordController: React.ComponentClass<Props>;
export {};
