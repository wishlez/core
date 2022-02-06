import {signOut} from 'next-auth/react';
import {useRouter} from 'next/router';
import {FunctionComponent} from 'react';

const SignOut: FunctionComponent = () => {
    const router = useRouter();

    return (
        <>
            Do you want to sign out?
            <button onClick={() => signOut()}>Continue</button>
            <button onClick={() => router.back()}>Cancel</button>
        </>
    );
};

export default SignOut;
