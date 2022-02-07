import {GetServerSideProps, GetServerSidePropsContext, Redirect} from 'next';
import {Session} from 'next-auth';
import {PreviewData} from 'next/types';
import {ParsedUrlQuery} from 'querystring';
import {AnyObject} from './object';

type ShouldRedirect = (session: Session) => boolean;

type GetRedirect = (context: GetServerSidePropsContext) => Redirect

export type Auth = (checkSession: ShouldRedirect, getRedirect: GetRedirect, auth: boolean) =>
    <P extends AnyObject = AnyObject, Q extends ParsedUrlQuery = ParsedUrlQuery, D extends PreviewData = PreviewData>(getServerSideProps?: GetServerSideProps<P, Q, D>) =>
        GetServerSideProps<P, Q, D>
