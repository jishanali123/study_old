import React from 'react';

import {configure , shallow} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter : new Adapter() });

describe('<NavigationItems /> Tests', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    });

    it('if not authenticated then it should render two <NavigationItem /> element' , ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('if authenticated then it should render three <NavigationItem /> element' , ()=>{
        wrapper.setProps({"isAuth":true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
});