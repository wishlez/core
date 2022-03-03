import {FunctionComponent} from 'react';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {Modal} from '../../design/modal';

type Props = {
    isOpen: boolean
    message?: string
    onCancel: () => void
    onConfirm: () => void
    title?: string
}

export const ConfirmationModal: FunctionComponent<Props> = (props) => (
    <Modal
        isOpen={props.isOpen}
        onClose={props.onCancel}
    >
        <Form>
            <FormTitle>
                {props.title}
            </FormTitle>
            <FormFields>
                {props.message}
            </FormFields>
            <FormActions>
                <Button
                    color={'primary'}
                    onClick={props.onConfirm}
                    type={'button'}
                    variant={'filled'}
                >
                    {'Yes'}
                </Button>
                <Button
                    color={'secondary'}
                    onClick={props.onCancel}
                    type={'button'}
                    variant={'outlined'}
                >
                    {'No'}
                </Button>
            </FormActions>
        </Form>
    </Modal>
);

ConfirmationModal.defaultProps = {
    message: 'Do wish to proceed?',
    title: 'Confirm'
};
