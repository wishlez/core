import {FormHTMLAttributes, FunctionComponent} from 'react';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';

export type Props = FormHTMLAttributes<HTMLFormElement> & {
    message?: string
    title?: string
    token?: string
};

export const ConfirmationForm: FunctionComponent<Props> = ({title, message, token, ...props}) => (
    <Form {...props}>
        <FormTitle>
            {title}
        </FormTitle>
        <FormFields>
            {message}
            {token && (
                <input
                    name={'csrfToken'}
                    required
                    type={'hidden'}
                    value={token}
                />
            )}
        </FormFields>
        <FormActions>
            <Button>
                {'Yes'}
            </Button>
            <Button
                color={'secondary'}
                type={'reset'}
                variant={'outlined'}
            >
                {'No'}
            </Button>
        </FormActions>
    </Form>
);

ConfirmationForm.defaultProps = {
    message: 'Do wish to proceed?',
    title: 'Confirm'
};
