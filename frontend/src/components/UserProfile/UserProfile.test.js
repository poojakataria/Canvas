import React from 'react';
import UserProfile from './UserProfile';
import renderer from 'react-test-renderer';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { mount } from 'enzyme';

it('Component render as expected', () => {
    const component = mount(<UserProfile></UserProfile>);
    expect(component).toMatchSnapshot();
});

it('changes the class when hovered', () => {
    const component = renderer.create(
        <UserProfile></UserProfile>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    console.log(tree.props)
    // manually trigger the callback
    //   tree.props.onMouseEnter();
    //   // re-rendering
    //   tree = component.toJSON();
    //   expect(tree).toMatchSnapshot();

});
