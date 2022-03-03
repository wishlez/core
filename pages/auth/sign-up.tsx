import Link from 'next/link';
import {FunctionComponent, useRef} from 'react';
import {useAuthError} from '../../lib/auth/cs-auth-error';
import {unauthenticated} from '../../lib/auth/ss-auth';
import {PageTitle} from '../../lib/components/shared/page-title';
import styles from './auth.module.css';

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
            <div>
                <form
                    action={'/api/auth/signup'}
                    method={'post'}
                >
                    <label className={styles.label}>
                        {'Name:'}
                        <input
                            autoFocus
                            name={'name'}
                            required
                            type={'text'}
                        />
                    </label>
                    <label className={styles.label}>
                        {'Username:'}
                        <input
                            name={'login'}
                            required
                            type={'text'}
                        />
                    </label>
                    <label className={styles.label}>
                        {'Password:'}
                        <input
                            name={'password'}
                            onInput={handleConfirm}
                            ref={passwordRef}
                            required
                            type={'password'}
                        />
                    </label>
                    <label className={styles.label}>
                        {'Confirm Password:'}
                        <input
                            name={'confirm'}
                            onInput={handleConfirm}
                            ref={confirmRef}
                            required
                            type={'password'}
                        />
                    </label>
                    <button
                        name={'action'}
                        type={'submit'}
                        value={'sign-up'}
                    >
                        {'Sign Up'}
                    </button>
                    <Link href={'/auth/sign-in'}>
                        {'Sign In'}
                    </Link>
                    <Link href={'/'}>
                        {'Cancel'}
                    </Link>
                    <div>
                        {authError}
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;

export const getServerSideProps = unauthenticated();
