import { injectGlobal } from 'styled-components';

const transitionName = 'page-transition';

const duration = 3000;

// tslint:disable-next-line no-unused-expression
injectGlobal`
    .${transitionName}-enter {
        opacity: 0;
    }
    .${transitionName}-enter.${transitionName}-enter-active {
        opacity: 1;
        transition: all ${duration}ms;
    }
    .${transitionName}-exit {
        opacity: 1;
        position: absolute;
    }
    .${transitionName}-exit.${transitionName}-exit-active {
        opacity: 0;
        transform: translateY(100vh);
        transition: all ${duration}ms;
    }
`;

export { transitionName, duration };
