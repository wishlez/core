import Link from 'next/link';
import {FunctionComponent, useRef} from 'react';
import {useAuthError} from '../../lib/auth/cs-auth-error';
import {unauthenticated} from '../../lib/auth/ss-auth';
import {PageTitle} from '../../lib/components/page-title';
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
            <PageTitle title="Sign Up"/>
            <div>
                <form action="/api/auth/signup" method="post">
                    <label className={styles.label}>
                        Name:
                        <input type="text" name="name" autoFocus required/></label>
                    <label className={styles.label}>
                        Username:
                        <input type="text" name="login" required/>
                    </label>
                    <label className={styles.label}>
                        Password:
                        <input ref={passwordRef} type="password" name="password" onInput={handleConfirm} required/>
                    </label>
                    <label className={styles.label}>
                        Confirm Password:
                        <input ref={confirmRef} type="password" name="confirm" onInput={handleConfirm} required/>
                    </label>
                    <button type="submit" value="sign-up" name="action">Sign Up</button>
                    <Link href={'/auth/sign-in'}>
                        Sign In
                    </Link>
                    <Link href={'/'}>
                        Cancel
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
