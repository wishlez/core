import {getCsrfToken} from 'next-auth/react';
import {useRouter} from 'next/router';
import {FunctionComponent} from 'react';
import {authenticated} from '../../lib/auth/ss-auth';
import {PageTitle} from '../../lib/components/shared/page-title';

type Props = {
    csrfToken: string
}

const SignOut: FunctionComponent<Props> = ({csrfToken}) => {
    const router = useRouter();

    return (
        <form
            action={'/api/auth/signout'}
            method={'post'}
        >
            <PageTitle title={'Sign Out'}/>
            {'Do you want to sign out?'}
            <input
                name={'csrfToken'}
                required
                type={'hidden'}
                value={csrfToken}
            />
            <button>
                {'Continue'}
            </button>
            <a onClick={() => router.back()}>
                {'Cancel'}
            </a>
        </form>
    );
};

export default SignOut;

export const getServerSideProps = authenticated<Props>(async (context) => {
    const csrfToken = await getCsrfToken(context);

    return {
        props: {
            csrfToken
        }
    };
});
