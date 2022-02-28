import {getCsrfToken} from 'next-auth/react';
import Link from 'next/link';
import {FunctionComponent} from 'react';
import {useAuthError} from '../../lib/auth/cs-auth-error';
import {unauthenticated} from '../../lib/auth/ss-auth';
import {PageTitle} from '../../lib/components/page-title';
import styles from './auth.module.css';

type Props = {
    csrfToken: string
}

const SignIn: FunctionComponent<Props> = ({csrfToken}) => {
    const authError = useAuthError();

    return (
        <>
            <PageTitle title="Sign In"/>
            <div>
                <form action={'/api/auth/callback/credentials'} method="post">
                    <input type="hidden" name="csrfToken" value={csrfToken} required/>
                    <label className={styles.label}>
                        Username:
                        <input type="text" name="login" autoFocus required/></label>
                    <label className={styles.label}>
                        Password:
                        <input type="password" name="password" required/>
                    </label>
                    <button type="submit" value="sign-in" name="action">Sign In</button>
                    <Link href={'/auth/sign-up'}>
                        Sign Up
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

export default SignIn;

export const getServerSideProps = unauthenticated<Props>(async (context) => {
    const csrfToken = await getCsrfToken(context);

    return {
        props: {
            csrfToken
        }
    };
});
