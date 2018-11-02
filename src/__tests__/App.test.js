import renderer from "react-test-renderer";
import Header from "../Components/Header";
import React from "react";

const P = () => {
  return <div />;
};

test("Link changes the class when hovered", () => {
  const component = renderer.create(<P />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
