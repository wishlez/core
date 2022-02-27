import {FunctionComponent} from 'react';
import {Button} from '../design/button';
import {Form} from '../design/form';
import {FormActions} from '../design/form-actions';
import {FormFields} from '../design/form-fields';
import {FormTitle} from '../design/form-title';
import {Modal} from '../design/modal';

type Props = {
    isOpen: boolean
    message?: string
    onCancel: () => void
    onConfirm: () => void
    title?: string
}

export const ConfirmationModal: FunctionComponent<Props> = (props) => (
    <Modal isOpen={props.isOpen} onClose={props.onCancel}>
        <Form>
            <FormTitle>
                {props.title}
            </FormTitle>
            <FormFields>
                {props.message}
            </FormFields>
            <FormActions>
                <Button variant="filled" color="primary" type="button" onClick={props.onConfirm}>Yes</Button>
                <Button variant="outlined" color="secondary" type="button" onClick={props.onCancel}>No</Button>
            </FormActions>
        </Form>
    </Modal>
);

ConfirmationModal.defaultProps = {
    title: 'Confirm',
    message: 'Do wish to proceed?'
};
