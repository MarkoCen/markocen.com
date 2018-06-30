import { shallow } from 'enzyme';
import React from 'react';
import MainPage from '../containers/Main';

describe('<MainPage />', () => {
    test('should render component', () => {
        const wrapper = shallow(<MainPage />);
        expect(wrapper.find('div').length).toEqual(1);
    });
});
