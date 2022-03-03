import {FormEvent, FunctionComponent} from 'react';
import {Modal} from '../../design/modal';
import {ConfirmationForm, Props as ConfirmationFormProps} from './confirmation-form';

type Props = ConfirmationFormProps & {
    isOpen: boolean
    onCancel: () => void
    onConfirm: () => void
}

export const ConfirmationModal: FunctionComponent<Props> = (props) => {
    const handleReset = (event: FormEvent) => {
        event.preventDefault();
        props.onCancel();
    }
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        props.onConfirm();
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onCancel}
        >
            <ConfirmationForm
                message={props.message}
                onReset={handleReset}
                onSubmit={handleSubmit}
                title={props.title}
            />
        </Modal>
    );
};
