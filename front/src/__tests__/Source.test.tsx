import { render, screen } from "@testing-library/react";
import SourcesGrid from "../components/Source/SourcesGrid.tsx";
import SourcesExemple from "./fixtures/sources.exemple";
it("Should display no sources ", async () => {
  render(<SourcesGrid sources={[]} />);
  screen.getByText("No sources");
});

it("Should display all provided sources ", async () => {
  render(<SourcesGrid sources={SourcesExemple} />);
  screen.getByText("No sources");
});
