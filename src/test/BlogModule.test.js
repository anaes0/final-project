import React from "react";
import { render, screen, fireEvent, wait } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import BlogNavBar from "../components/Blog/BlogNavBar/BlogNavBar";
import Blog from "../views/Blog";
import Login from "../components/Blog/PostsList/Login/Login";
import CreatePost from "../components/Blog/PostsList/CreatePost/CreatePost";

import { prettyDOM } from "@testing-library/react";

/* sources: https://testing-library.com/docs/queries/about/
            https://www.w3.org/TR/wai-aria/#role_definitions
            https://testing-library.com/docs/react-testing-library/cheatsheet/ 
            https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/*/

// * BLOG MODULE TESTING *
// 1. Main parts on website (not logged)

/* Test 1 - Test check blog navbar elements on screen (user not logged)*/
/*
test("check blog-navbar elements displayed (user not logged)", () => {
  render(
    <Router>
      <BlogNavBar />
    </Router>
  );

  const loginLink = screen.getByRole("link", { name: "Log in" });
  const blogLink = screen.getByRole("link", { name: "Blog" });

  expect(loginLink).toBeInTheDocument(); //expect(screen.getByText(/blog/i)).toBeInTheDocument();
  expect(blogLink).toBeInTheDocument(); //expect(screen.getByText(/log in/i)).toBeInTheDocument();
});
*/
/* Test 2 - Test check blog navbar element: "Create Post" is NOT on screen (user not logged) This test should fail */

/*
test("renders blog navbar elements:createpost (user not logged)", () => {
  render(
    <Router>
      <BlogNavBar />
    </Router>
  );
  const createpostLink = screen.getByRole("link", { name: "Create post" });
  expect(createpostLink).toBeInTheDocument(); //expect(screen.getByText(/create post/i)).toBeInTheDocument();
});
*/

/* 2. Logging and Sign in process 
STEPS: a) Check page loads b) Check path after btn clicked c) Check elements displayed
*/

// * Test 3- Test elements displayed and path when Login button is clicked
/*
test("After log in btn clicked, check elements displayed and path", async () => {
  render(
    <Router>
      <Blog />
    </Router>
  );
  // 3.1 Check elements in page loaded (user not logged)
  //console.log("Loging page (not logged)\n:" + prettyDOM(document));

  // Login process
  const loginBtn = screen.getByRole("link", { name: "Log in" });
  fireEvent.click(loginBtn);
  //3.2 After click login btn, user is redirected to /blog/login path
  expect(window.location.pathname).toBe("/blog/login");
  console.log("Path document after click: " + window.location);
  //3.3 The path is ok, render login page before checking elements on it
  render(
    <Router>
      <Login />
    </Router>
  );

  //3.4. check elements in login page
  const gogSignText = screen.getByRole("button", {
    name: "Sign in with Google",
  });

  expect(gogSignText).toBeInTheDocument();
 // console.log("Loging page (after click)\n:" + prettyDOM(document));
});
*/

// * Test 4- Test elements displayed and path when Sign in with Google Button is clicked
test("After google btn clicked, check elements displayed and path", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  //console.log("Loging page (not logged)\n:" + prettyDOM(document));

  // Google sign up process
  const googleBtn = screen.getByRole("button", {
    name: "Sign in with Google",
  });

  fireEvent.click(googleBtn);

  /* ERROR:
FirebaseError: Firebase: Error (auth/operation-not-supported-in-this-environment).
Test suite failed to run - Jest worker encountered 4 child process exceptions, exceeding retry limit */
  /*Troubleshooting:
  https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
  https://github.com/firebase/firebase-js-sdk/issues/558
  https://github.com/facebook/jest/issues/8769#issuecomment-919811307
*/
});

// 3. Create post page (website content)
/* Test 5 - Test check create post elements on screen (user logged)*/
test("check create post elements displayed (user logged)", () => {
  render(
    <Router>
      <CreatePost />
    </Router>
  );

  console.log("Create post page (user logged)\n:" + prettyDOM(document));

  const headingCreatePost = screen.getByRole("heading", {
    name: "Create a Post",
  });
  const submitBtn = screen.getByRole("button", { name: "Submit Post" });
  const postTitle = screen.getByPlaceholderText("Post Title...");
  const posttext = screen.getByPlaceholderText("Post text ...");

  expect(submitBtn).toBeInTheDocument();
  expect(headingCreatePost).toBeInTheDocument();
  expect(postTitle).toBeInTheDocument();
  expect(posttext).toBeInTheDocument();
});
