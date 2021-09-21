import { render,screen } from "@testing-library/react";
import Weather from "./Weather"

test('API should work amg get current weather image when app start running', () => {
    render(<Weather />);
    const currentImg = screen.getByAltText("currentImage");
    expect(currentImg).toBeInTheDocument();
});