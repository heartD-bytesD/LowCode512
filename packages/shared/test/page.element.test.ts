import { describe, expect, test, it } from "vitest";
import { PageElement, Project, Page } from "../src/";

describe("page.element", () => {
    const project = Project.create();

    test("project.name === 1", () => {
        expect(project.name).toBe("New Project");
    });
    test("project.pages.length === 1", () => {
        expect(project.pages.length).toBe(1)
    });
    test("project.json", () => {
      expect(project.getJson()).toMatchInlineSnapshot(`
        {
          "description": "New Project Description",
          "name": "New Project",
          "pages": [
            {
              "description": "New Page Description",
              "elements": [],
              "name": "New Page",
            },
          ],
        }
      `)
  });
});
