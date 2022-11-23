import { render, screen } from '@testing-library/react';
import App from './App';

// Normally I would just ignore this code, it was boiler plate created, I get 
// them too and just leave them.  However, if you are doing to share the repo
// and use it as an example of what you do, I would reccomend you either delete
// off this as well as setupTests.js, or implemeent tests for your other
// components, as an opportunity to see how tests can be done with React.
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
