import * as React from 'react';
import { RegisterMutationVariables } from '../../schemaTypes';
import { NormalizedErrorMap } from '../../types/NormalizedErrorMap';
interface Props {
    children: (data: {
        submit: (values: RegisterMutationVariables) => Promise<NormalizedErrorMap | null>;
    }) => JSX.Element | null;
}
export declare const RegisterController: React.ComponentClass<Props>;
export {};
