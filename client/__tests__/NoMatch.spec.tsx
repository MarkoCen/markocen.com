import { shallow } from 'enzyme';
import React from 'react';
import { Redirect } from 'react-router-dom';
import NoMatch from '../containers/NoMatch';
import Routes from '../modules/routes';

describe('<NoMatch />', () => {
    test('should redirect to main page', () => {
        const wrapper = shallow(<NoMatch />);
        const redirectChild = wrapper.findWhere(
            (n) => n.name() === 'Redirect' && n.prop('to') === Routes.Home.path,
        );
        expect(redirectChild.length).toBe(1);
    });
});
