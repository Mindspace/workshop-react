# React Workshop: JumpStart

Welcome to the hands-on, coding labs for the **React JumpStart** workshop.

---

Within this workshop we will explore:

- Class-based UI components,
- React Hooks,
- Functional UI components,
- Custom React Hooks,
- Sharing Services with React Context
- Using true Dependency Injection within React
- Using Reactive Stores w/ Zustand

The Jumpstart labs introduce - to the student(s) - a simple React application with master-detail routing between ContactList and ContactDetails views.

<img width="1208" alt="image" src="https://github.com/Mindspace/workshop-react/assets/210413/3f124e23-af5b-4072-be05-7f8e51a23efb">

## Repository Setup

This reposity uses React, Vite, and Nx to quickly setup a fast development environment. You can review the `libs/contacts/data-access` and `libs/contacts/ui` libraries to see how we organize code.

> Notice that the data-services API has already been setup and is ready to use within your application using
> `import { Contact, ContactsService } from '@workshop/data-access';`

## Jumpstart Coding Labs

Using the [Workshop Slides](https://slides.com/thomasburleson/react-workshop-jump-start?token=8ehdpgAe) developers will learn core fundamentals in a chapter-based approach. At the end of each 'chapter', the user will need to complete a Lab.

[![](https://github.com/Mindspace/workshop-react/assets/210413/fbb7f3e3-a2c6-4b9f-a040-da19e75e82ed)](https://slides.com/thomasburleson/react-workshop-jump-start?token=8ehdpgAe)

This workshop includes the following "hands-on" coding labs:

- Chapter 1: Adding Contacts UI components
- Chapter 2: Add routing using React Router
- Chapter 3: Use Functional components
- Chapter 4: Use Custom Hooks
- Chapter 5: Sharing services with Context API
- Chapter 6: Use Dependency Injection (DI)

Each lab will encourage the student to apply lecture ideas and patterns. With hands-on coding, developers will explore the concepts of React Functional Components, hooks, custom hooks and Dependency Injection.

> Note: The solutions to the Jumpstart labs are on the `jumpstart/finish` branch; each lab is organized as a distinct git-commit.

## Getting Started

- Run `npm install`
- Run `nx serve` to build the contacts application and start a dev web server.

Navigate to http://localhost:4200/.

The app will automatically reload if you change any of the source files.
