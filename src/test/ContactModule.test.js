import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { prettyDOM } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import ContactForm from "../components/ContactForm/Form";

/*sources: 
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles 
https://testing-library.com/docs/queries/about/#priority
https://reactjs.org/docs/test-utils.html#act
*/

/* Warning: Warning: An update to Formik inside a test was not wrapped in act(...).
Troubleshooting: https://github.com/jaredpalmer/formik/issues/1543
*/

// * CONTACT MODULE TESTING *

/* Test 1 - Test check contact form elements displayed (form not sent)  */
test("check contact form elements displayed (form not sent)", () => {
  render(
    <Router>
      <ContactForm />
    </Router>
  );

  // 1.1 Check elements in contact form loaded (form not sent)
  //console.log("Contact form content\n:" + prettyDOM(document));
  const sendBtn = screen.getByRole("button", { name: /send/i });
  const formTitle = screen.getByRole("heading", { name: /contact us/i });

  expect(sendBtn).toBeInTheDocument();
  expect(formTitle).toBeInTheDocument();
});

/* Test 2 - Test elements displayed when Send button is clicked (form sent)  */
test("After send btn is clicked, check elements displayed", async () => {
  // 2.1 Test first render component
  render(
    <Router>
      <ContactForm />
    </Router>
  );

  // 2.2 Send form process
  const sendBtn = screen.getByRole("button", { name: /send/i });

  await act(async () => {
    fireEvent.click(sendBtn);
  });

  console.log("Contact form (after click)\n:" + prettyDOM(document));

  /* 2.3 After click send btn, check elements displayed 
  Whether an element (error msg) is present in the document or not.*/
  const errorMsgName = screen.getByTestId("error-msg-name");
  expect(errorMsgName).toBeInTheDocument();

  // 2.4 Check text in the error message
  const errorMsgText = screen.getByTestId("error-msg-name").innerHTML;
  expect(errorMsgText).toBe("Error: Please enter a name");
});
