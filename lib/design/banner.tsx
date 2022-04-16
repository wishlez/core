import {FunctionComponent} from 'react';
import styled, {css} from 'styled-components';
import {Title} from './title';

type Props = {
    orientation: 'vertical' | 'horizontal'
}

const Container = styled(Title).attrs({
    size: 'h1'
})<Props>`
    display: inline-flex;
    font-size: 2em;

    ${(props) => {
        return props.orientation === 'horizontal' ? css`
            align-items: end;
        ` : css`
            flex-direction: column;
            align-items: center;
        `;
    }}
`;

const WLogo = styled.svg`
    height: 1.40625em;
    width: 1.40625em;
`;

const WTitle = styled.svg`
    height: 1.25em;
    width: 3.02734375em;

    path {
        fill: var(--mono-000);
    }
`;

export const Banner: FunctionComponent<Props> = (props) => (
    <Container orientation={props.orientation}>
        <WLogo viewBox={'0 0 512 512'}>
            <rect
                fill={'#fefefe'}
                height={'488'}
                rx={'244'}
                ry={'244'}
                width={'488'}
                x={'12'}
                y={'12'}
            />
            <path
                d={'M136.554,159.427h8.921s7.6,43.361-27.755,42.55c-26.436-.189-31.559-24.351-31.72-37.6,0.622-24.008,16.394-40.571,42.624-40.571,36.192,0,46.076,24.738,57.493,52.445,5.275,14.98,27.755,87.08,27.755,87.08s24.676,73.78,23.79,107.859c23.012-21.11-38.711-193.664-46.589-213.74a74.546,74.546,0,0,0-15.86-25.728l5.947-4.947s9.011,4.572,16.852,23.748c20.122,49.217,58.866,174.94,52.536,199.887,13.763-24.431,40.7-73.118,44.607-99.943-1.488-29.716-20.968-51.986-21.808-96.975,0-14.5,3.361-24.961,19.825-27.707,29.954,0.086,26.93,39.321,26.764,50.466,0.1,23.883-7.581,36.705-10.9,74.216,3.228,35.441,31.72,118.744,31.72,118.744S415.884,261.288,415.1,166.354c-2.886-24.118-9.883-32.923-27.755-32.655s-23.79,2.969-23.79,2.969l-0.991-10.885s25.629-5.567,38.659-.989,24.349,13.173,24.781,41.56c-2.388,87.227-44.64,160.613-77.318,211.761-7.665,10.069-6.78,10.167-15.86,9.895-3.028-17.762-30.072-102.253-31.72-115.775-2.1,14.162-50.377,98.6-53.528,104.891-3.772,6.083-5.54,10.95-18.833,11.874,4.957-27.619-3.33-57.787-22.8-122.7-2.5-8.332-28.747-87.079-28.747-87.079S161.32,133.29,128.624,133.7s-33.842,26.145-33.7,31.666,4.556,26.717,22.8,26.717S136.944,179.27,136.554,159.427Zm165.539,70.257s-36.5-93.724-6.938-92.026S302.093,229.684,302.093,229.684Z'}
                fillRule={'evenodd'}
            />
        </WLogo>
        <WTitle viewBox={'0 0 310 128'}>
            <path
                d={'M29.454,89.8a6.33,6.33,0,0,1-.684-3.451,46.168,46.168,0,0,1,.456-6.022Q29.681,76.908,30.5,73.1t1.921-7.845q1.106-4.036,2.409-7.943l9.635-28.125q0.781-2.344,1.53-4.85t1.3-4.98q0.552-2.474.879-4.85a33.011,33.011,0,0,0,.325-4.46,11.3,11.3,0,0,0-2.116-7.064Q44.265,0.215,39.969.215a20.549,20.549,0,0,0-7.422,1.758,54.83,54.83,0,0,0-9.538,5.176,112.817,112.817,0,0,0-11,8.4A131.62,131.62,0,0,0,.255,27.038l1.758,8.138a149.15,149.15,0,0,1,10.482-13.7,101.619,101.619,0,0,1,8.984-9.18,54.274,54.274,0,0,1,7.357-5.6A35.968,35.968,0,0,1,34.37,3.828a16.428,16.428,0,0,1,3.581-1.042q1.3-.162,1.5-0.163A1.935,1.935,0,0,1,41.3,3.665a6.176,6.176,0,0,1,.553,2.865,24.368,24.368,0,0,1-.488,4.46q-0.488,2.573-1.335,5.566t-1.953,6.217Q36.973,26,35.867,29.186L27.078,54.251a146.074,146.074,0,0,0-4.3,14.453,53.878,53.878,0,0,0-1.628,12.37q0,6.186,2.181,9.928a7.317,7.317,0,0,0,6.8,3.743,9.133,9.133,0,0,0,3.841-.977,19.089,19.089,0,0,0,4.622-3.32A45.73,45.73,0,0,0,44.1,84.1a102.569,102.569,0,0,0,6.413-10.059q-0.261,1.889-.358,3.646t-0.1,3.451a29.191,29.191,0,0,0,.488,5.566A13.2,13.2,0,0,0,52.111,91,7.962,7.962,0,0,0,54.78,93.77a7.28,7.28,0,0,0,3.874.977q3.45,0,7.617-3.516a52.8,52.8,0,0,0,8.626-9.8,133.913,133.913,0,0,0,9.082-15.072Q88.6,57.572,92.9,47.025l0.391-.977a22.918,22.918,0,0,0,2.018,3.125q0.976,1.237,1.628,2.018L98.888,49.5a37.626,37.626,0,0,1-2.507-3.288,32.951,32.951,0,0,1-1.921-3.223,103.21,103.21,0,0,0,4.492-14.876,54.428,54.428,0,0,0,1.367-10.645,9.231,9.231,0,0,0-.325-2.637,5.142,5.142,0,0,0-.846-1.725,3.288,3.288,0,0,0-1.139-.944,2.8,2.8,0,0,0-1.2-.293,4.685,4.685,0,0,0-2.734.977,8.392,8.392,0,0,0-2.441,3.06A20.573,20.573,0,0,0,89.9,21.178a39,39,0,0,0-.651,7.682,39.668,39.668,0,0,0,.684,7.845A37.184,37.184,0,0,0,91.6,42.6q-0.327.781-.586,1.53t-0.586,1.465q-2.475,5.991-5.143,11.621T79.91,67.891q-2.7,5.046-5.371,9.245A65.45,65.45,0,0,1,69.3,84.362a28.78,28.78,0,0,1-4.915,4.72,7.607,7.607,0,0,1-4.362,1.693,2.917,2.917,0,0,1-2.637-1.628,8.976,8.976,0,0,1-.944-4.492,43.58,43.58,0,0,1,.423-5.762q0.423-3.157,1.237-6.673t1.986-7.259q1.172-3.743,2.539-7.65L78.771,11.869H71.023L55.594,54.251q-1.433,3.972-2.7,7.682t-3.027,7.878a94.18,94.18,0,0,1-5.078,8.561,64.236,64.236,0,0,1-5.046,6.641,27.5,27.5,0,0,1-4.557,4.264,6.718,6.718,0,0,1-3.678,1.5A2.338,2.338,0,0,1,29.454,89.8Zm62.891-62.76a25.045,25.045,0,0,1,.814-3.939,10.947,10.947,0,0,1,1.172-2.734,1.791,1.791,0,0,1,1.432-1.009,0.886,0.886,0,0,1,.846.846,7.8,7.8,0,0,1,.2,1.758,19.336,19.336,0,0,1-.325,3.19q-0.327,1.889-.846,4.134T94.4,34q-0.717,2.475-1.5,4.883a28.035,28.035,0,0,1-.846-7.292A34.712,34.712,0,0,1,92.345,27.038Zm31.51-5.632a5.377,5.377,0,0,0-1.692,1.2,6.572,6.572,0,0,0-1.237,1.855,5.831,5.831,0,0,0-.489,2.441,5.13,5.13,0,0,0,1.172,3.288,3.734,3.734,0,0,0,3.06,1.465,4.23,4.23,0,0,0,2.181-.553,5.922,5.922,0,0,0,1.628-1.4,6.108,6.108,0,0,0,1.042-1.921,6.683,6.683,0,0,0,.358-2.116,5.151,5.151,0,0,0-1.107-3.288,3.687,3.687,0,0,0-3.06-1.4A4.52,4.52,0,0,0,123.855,21.406ZM99.865,80.358q-1.367,3.191-2.148,5.4a11.827,11.827,0,0,0-.781,3.841,3.68,3.68,0,0,0,1.3,2.9,4.764,4.764,0,0,0,3.255,1.139,9.3,9.3,0,0,0,2.442-.326,9.029,9.029,0,0,0,2.408-1.074,16.2,16.2,0,0,0,2.572-2.051,32.833,32.833,0,0,0,2.93-3.255L126.232,69.16l-1.628-1.3L112.69,82.572a14.16,14.16,0,0,1-2.734,2.669,4.129,4.129,0,0,1-2.214.911,1.566,1.566,0,0,1-.944-0.26,1.225,1.225,0,0,1-.358-1.042,3.66,3.66,0,0,1,.2-1.074c0.131-.412.282-0.835,0.456-1.269l10.938-26.367a30.1,30.1,0,0,0,1.172-3.255,10.146,10.146,0,0,0,.455-2.8,3.419,3.419,0,0,0-.846-2.246,3.381,3.381,0,0,0-2.734-1.009,5.887,5.887,0,0,0-3.874,1.6,28.7,28.7,0,0,0-3.548,3.678L94.005,70.2l1.628,1.3,12.89-15.95a1.463,1.463,0,0,1,1.172-.716,0.936,0.936,0,0,1,.554.163,0.636,0.636,0,0,1,.228.553,1.979,1.979,0,0,1-.2.716Zm18.75,11.816a2.754,2.754,0,0,0,1.041.879,4.39,4.39,0,0,0,1.433.423,12.073,12.073,0,0,0,1.5.1,14.5,14.5,0,0,0,2.181-.163,16.285,16.285,0,0,0,2.181-.488,45.363,45.363,0,0,0,7.78-2.9,55.794,55.794,0,0,0,8.236-4.85A77.06,77.06,0,0,0,159.37,69.421l-1.628-1.3a80.1,80.1,0,0,1-11,11.654A63.405,63.405,0,0,1,136.453,87a37.206,37.206,0,0,0,4.623-5.339,39.34,39.34,0,0,0,6.184-13.314,29.552,29.552,0,0,0,.912-7.259,30.513,30.513,0,0,0-.423-5.306q-0.424-2.376-.912-4.2t-0.911-2.995a5.757,5.757,0,0,1-.423-1.693,2.712,2.712,0,0,1,.455-1.237q0.454-.781,1.009-1.628t1.01-1.628a2.72,2.72,0,0,0,.455-1.237,1.768,1.768,0,0,0-.911-1.79,4.058,4.058,0,0,0-1.693-.423,6.788,6.788,0,0,0-3.092.814,11.412,11.412,0,0,0-2.9,2.116,12.091,12.091,0,0,0-2.149,2.9,6.591,6.591,0,0,0-.846,3.093,3.617,3.617,0,0,0,.228,1.27q0.227,0.62.553,1.335-2.67,3.842-6.38,8.691t-8.919,11.491l1.627,1.3q5.469-6.966,9.017-11.588t5.762-7.812a23.717,23.717,0,0,1,1.66,4.069,20.7,20.7,0,0,1,.749,6.087,41.761,41.761,0,0,1-.977,8.822,37.592,37.592,0,0,1-2.7,8.17,21.164,21.164,0,0,1-4.069,5.99,7.09,7.09,0,0,1-5.078,2.344,0.8,0.8,0,0,1-.976-0.814q0-.813.1-1.79a4.8,4.8,0,0,0-.13-1.79,1.355,1.355,0,0,0-1.53-.814,4.329,4.329,0,0,0-2.344.879,15.856,15.856,0,0,0-2.474,2.083,12.811,12.811,0,0,0-1.953,2.572,4.941,4.941,0,0,0-.781,2.344A2.483,2.483,0,0,0,118.615,92.175Zm50.976-14.746,26.628-63.216h-7.878l-7.617,18.164-2.279,4.557q-1.107,2.214-2.409,4.655t-2.962,5.241q-1.661,2.8-4.069,6.283t-5.664,7.78q-3.255,4.3-7.682,9.766l1.627,1.3q3.126-3.841,5.567-6.966t4.329-5.664q1.889-2.539,3.255-4.525t2.409-3.613l-12.76,30.534q-1.3,3.125-2.051,5.338a12.061,12.061,0,0,0-.749,3.711q0,2.866,3,2.865a5.925,5.925,0,0,0,3.744-1.595,26.1,26.1,0,0,0,4.459-5.371l21.485-31.9a3.812,3.812,0,0,1,1.269-1.3,2.479,2.479,0,0,1,1.14-.325,1.123,1.123,0,0,1,1.237,1.3,2.452,2.452,0,0,1-.2.977L182.872,80.358q-1.367,3.191-2.148,5.4a11.82,11.82,0,0,0-.781,3.841,3.676,3.676,0,0,0,1.3,2.9,4.761,4.761,0,0,0,3.255,1.139,9.29,9.29,0,0,0,2.441-.326,9.021,9.021,0,0,0,2.409-1.074,16.242,16.242,0,0,0,2.572-2.051,32.959,32.959,0,0,0,2.93-3.255L209.24,69.16l-1.628-1.3L195.7,82.572a14.16,14.16,0,0,1-2.734,2.669,4.129,4.129,0,0,1-2.214.911,1.564,1.564,0,0,1-.944-0.26,1.225,1.225,0,0,1-.358-1.042,3.66,3.66,0,0,1,.195-1.074q0.195-.618.456-1.269l11.328-27.734q0.326-.911.651-2.116a8.849,8.849,0,0,0,.326-2.311,3.361,3.361,0,0,0-1.3-2.864,6.224,6.224,0,0,0-3.777-.977,6.507,6.507,0,0,0-2.766.618,11.006,11.006,0,0,0-2.8,1.986,28.527,28.527,0,0,0-3.125,3.548q-1.66,2.182-3.743,5.306L171.284,78.21a2.264,2.264,0,0,1-1.563,1.3,0.525,0.525,0,0,1-.52-0.651,2.558,2.558,0,0,1,.195-0.846,4.589,4.589,0,0,1,.2-0.586h0Zm76.3-63.216h-7.812l-7.422,17.643q-1.237,2.409-2.311,4.655t-2.377,4.72q-1.3,2.475-2.994,5.273t-4.1,6.315q-2.409,3.516-5.729,7.91t-7.813,9.928l1.628,1.3q3.19-3.906,5.631-7.064t4.362-5.7q1.92-2.539,3.288-4.557T222.651,51L210.346,80.358q-1.3,3.191-2.116,5.4a11.424,11.424,0,0,0-.813,3.841,3.679,3.679,0,0,0,1.3,2.9,4.763,4.763,0,0,0,3.255,1.139,8.58,8.58,0,0,0,2.376-.326,8.325,8.325,0,0,0,2.279-1.074,14.8,14.8,0,0,0,2.409-2.051q1.269-1.3,2.832-3.255L236.258,69.16l-1.628-1.3L222.716,82.572a14.16,14.16,0,0,1-2.734,2.669,4.129,4.129,0,0,1-2.214.911,1.566,1.566,0,0,1-.944-0.26,1.225,1.225,0,0,1-.358-1.042,3.66,3.66,0,0,1,.195-1.074c0.131-.412.282-0.835,0.456-1.269Zm-6.445,75.456q-1.368-1.3-1.367-4.818a19.1,19.1,0,0,1,.488-4.1,43.5,43.5,0,0,1,1.335-4.687,22.824,22.824,0,0,0,5.892-.846,36.888,36.888,0,0,0,6.25-2.311,37.36,37.36,0,0,0,5.924-3.516,30.191,30.191,0,0,0,4.981-4.492,22.459,22.459,0,0,0,3.45-5.176,13.029,13.029,0,0,0,1.3-5.664,8.538,8.538,0,0,0-1.53-5.241q-1.53-2.051-4.98-2.051a15.15,15.15,0,0,0-5.6,1.3,34.6,34.6,0,0,0-6.608,3.678,48.2,48.2,0,0,0-6.706,5.7,46.123,46.123,0,0,0-5.892,7.324,39.784,39.784,0,0,0-4.2,8.561,28.382,28.382,0,0,0-1.595,9.44,11.223,11.223,0,0,0,1.139,5.4,9.6,9.6,0,0,0,2.832,3.288,10.246,10.246,0,0,0,3.646,1.66,15.614,15.614,0,0,0,3.516.456,24.052,24.052,0,0,0,2.539-.163,14.844,14.844,0,0,0,3.45-.879,28.563,28.563,0,0,0,4.46-2.181,41.432,41.432,0,0,0,5.631-4.1,85.361,85.361,0,0,0,6.9-6.641q3.776-4,8.269-9.733l-1.628-1.3q-5.274,6.577-9.5,10.905a63.293,63.293,0,0,1-7.715,6.868,27.381,27.381,0,0,1-6.25,3.581,14.589,14.589,0,0,1-5.111,1.042A4.633,4.633,0,0,1,239.448,89.668Zm21.094-39.616a3.538,3.538,0,0,1,.586,2.376,16.919,16.919,0,0,1-1.465,6.445,25.135,25.135,0,0,1-4.167,6.673,27.944,27.944,0,0,1-6.51,5.534,22.99,22.99,0,0,1-8.431,3.158,64.29,64.29,0,0,1,4.069-8.756,74.181,74.181,0,0,1,5.078-7.975,39.536,39.536,0,0,1,5.11-5.827q2.474-2.246,4.232-2.246A1.975,1.975,0,0,1,260.542,50.052Zm48.112,18.457a172.619,172.619,0,0,1-12.533,13.8q-5.762,5.6-10.514,9.44a13.266,13.266,0,0,0-1.074-2.637,10.986,10.986,0,0,0-1.661-2.311,53.38,53.38,0,0,0,7.813-7,69.456,69.456,0,0,0,6.868-8.659,52.357,52.357,0,0,0,4.883-8.984,21.1,21.1,0,0,0,1.856-7.975,10.427,10.427,0,0,0-.619-3.874,7.006,7.006,0,0,0-1.562-2.441,5.617,5.617,0,0,0-2.084-1.3,6.724,6.724,0,0,0-2.181-.391q-3.841,0-8.984,3.483A50.249,50.249,0,0,0,278.12,60.241q-1.627,2.019-3.19,3.906-1.3,1.628-2.67,3.32T270.047,70.2l1.627,1.3q1.173-1.431,2.572-3.223t2.7-3.353l3-3.646a32.821,32.821,0,0,1,5.664-5.794A8.543,8.543,0,0,1,290.62,53.4a3.4,3.4,0,0,1,2.539,1.074,4.99,4.99,0,0,1,1.042,3.548,18.454,18.454,0,0,1-1.14,5.5A57.5,57.5,0,0,1,290,70.82a70.137,70.137,0,0,1-4.427,7.65,44.91,44.91,0,0,1-5.241,6.576,14.557,14.557,0,0,0-1.79-.553,8.745,8.745,0,0,0-2.051-.228,11.69,11.69,0,0,0-3.353.423,7.409,7.409,0,0,0-2.311,1.107,4.9,4.9,0,0,0-1.367,1.5,3.263,3.263,0,0,0-.456,1.595,2.012,2.012,0,0,0,.912,1.823,4.006,4.006,0,0,0,2.213.586,11.22,11.22,0,0,0,3.093-.456,19.006,19.006,0,0,0,3.287-1.3,11.412,11.412,0,0,1,.782,2.637,17.325,17.325,0,0,1,.26,3.027q0,1.041-.1,2.083t-0.227,2.148q-2.539,2.408-5.534,5.533a81.294,81.294,0,0,0-5.567,6.446,45.013,45.013,0,0,0-4.3,6.608,13.144,13.144,0,0,0-1.725,6.022,3.529,3.529,0,0,0,1.237,3.125,4.541,4.541,0,0,0,2.6.846,7.727,7.727,0,0,0,4.037-1.4,22.568,22.568,0,0,0,4.459-3.842,43.892,43.892,0,0,0,4.362-5.664,49.518,49.518,0,0,0,3.744-6.836,45.7,45.7,0,0,0,2.6-7.421,29.722,29.722,0,0,0,.977-7.39V94.876a3.049,3.049,0,0,0-.066-0.586q3.321-2.735,6.25-5.339t5.8-5.436q2.863-2.832,5.827-6.152t6.347-7.552Zm-43.3,57.389a0.927,0.927,0,0,1-.488-0.227,1.532,1.532,0,0,1-.391-0.619,3.293,3.293,0,0,1-.162-1.139,10.562,10.562,0,0,1,1.5-4.753,48.173,48.173,0,0,1,3.646-5.729,67.029,67.029,0,0,1,4.622-5.632q2.475-2.7,4.427-4.524a59.1,59.1,0,0,1-6.054,15.527,30.339,30.339,0,0,1-3.614,5.143q-1.789,1.986-3.027,1.986A3.7,3.7,0,0,1,265.359,125.9Zm5.6-36.458a1.108,1.108,0,0,1-.325-0.749,1.839,1.839,0,0,1,.781-1.27,4.192,4.192,0,0,1,2.734-.684,4.421,4.421,0,0,1,3.06,1.107,12.821,12.821,0,0,1-2.6,1.432,6.948,6.948,0,0,1-2.6.521A1.347,1.347,0,0,1,270.958,89.44Z'}
                fillRule={'evenodd'}
            />
        </WTitle>
    </Container>
);