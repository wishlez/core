import Link from 'next/link';
import {FunctionComponent, useRef} from 'react';
import {useAuthError} from '../../lib/auth/cs-auth-error';
import {unauthenticated} from '../../lib/auth/ss-auth';
import {AuthFormContainer} from '../../lib/components/shared/auth-form-container';
import {PageTitle} from '../../lib/components/shared/page-title';
import {Button} from '../../lib/design/button';
import {Form} from '../../lib/design/form';
import {FormActions} from '../../lib/design/form-actions';
import {FormFields} from '../../lib/design/form-fields';
import {FormTitle} from '../../lib/design/form-title';
import {Input} from '../../lib/design/input';

const SignUp: FunctionComponent = () => {
    const authError = useAuthError();
    const passwordRef = useRef<HTMLInputElement>();
    const confirmRef = useRef<HTMLInputElement>();

    const handleConfirm = () => {
        if (passwordRef.current.value !== confirmRef.current.value) {
            confirmRef.current.setCustomValidity('Passwords do not match');
        } else {
            confirmRef.current.setCustomValidity('');
        }
    };

    return (
        <>
            <PageTitle title={'Sign Up'}/>
            <AuthFormContainer>
                <Form
                    action={'/api/auth/signup'}
                    method={'post'}
                >
                    <FormTitle>
                        {'Sign Up'}
                    </FormTitle>
                    <FormFields>
                        <Input
                            autoFocus
                            label={'Name'}
                            name={'name'}
                            required
                            type={'text'}
                        />
                        <Input
                            label={'Username'}
                            name={'login'}
                            required
                            type={'text'}
                        />
                        <Input
                            label={'Password'}
                            name={'password'}
                            onInput={handleConfirm}
                            ref={passwordRef}
                            required
                            type={'password'}
                        />
                        <Input
                            label={'Confirm Password'}
                            name={'confirm'}
                            onInput={handleConfirm}
                            ref={confirmRef}
                            required
                            type={'password'}
                        />
                    </FormFields>
                    <FormActions>
                        <Button type={'submit'}>
                            {'Sign Up'}
                        </Button>
                        <Link
                            href={'/auth/sign-in'}
                            passHref
                        >
                            <Button
                                as={'a'}
                                color={'secondary'}
                                variant={'outlined'}
                            >
                                {'Sign In'}
                            </Button>
                        </Link>
                        <Link
                            href={'/'}
                            passHref
                        >
                            <Button
                                as={'a'}
                                color={'secondary'}
                                variant={'text'}
                            >
                                {'Cancel'}
                            </Button>
                        </Link>
                    </FormActions>
                    <div>
                        {authError}
                    </div>
                </Form>
            </AuthFormContainer>
        </>
    );
};

export default SignUp;

export const getServerSideProps = unauthenticated();
