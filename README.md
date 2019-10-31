# React RxJS Workshop

This repository contains the solutions for the hands-on, coding labs for the React RxJS workshops.

![image](https://user-images.githubusercontent.com/210413/67900755-343fa180-fb33-11e9-814e-5d76231ed6ed.png)

## Coding Labs

The RxJS labs introduces - to the student(s) - a simple React application with routing between ContactList and ContactDetails views.

Each lab will encourage the student to apply lecture ideas and patterns - with hands-on coding - to explore concepts of RxJS, Observables, RxJS operators and more. Each lab is organized as a distinct git-commit:

- Step 1: introduce basic search functionality
- Step 2: debounce and skip duplicate input
- Step 3: deal with out-of-order reponses
- Step 4: use takeUntil to mitigate slow initial response
- Step 5: move logic into search API
- Step 6: manage subscriptions
- Step 7: useObservable() + Dependency Injectors

## Getting Started

- Run `yarn install`
- Run `nx serve my-app` to build the applicaiton and start a dev web server.

Navigate to http://localhost:4200/.
The app will automatically reload if you change any of the source files.

## Notable Contents

### Custom `useObservable` Hook

React view components use state and props to render JSX (templates). In scenarios where the state values will be updated asynchronously based on emissions from Observable streams, the required code complexity becomes problematic.

In such scenarios, developers are required to:

- subscribe to the stream
- update the component state with emitted stream values
- trigger view component re-renders
- unsubscribe from the stream:
  - when a new observable instance replaces a previous instance
  - when the component unmounts

_`useObservable<T>()`_ is 'typed' custom hook that dramatically simplifies the implementation of these ^ requirements. The hook itself internally manages the subscription lifecycles and dramatically reduces the code previously required withing a React view component.

[![image](https://user-images.githubusercontent.com/210413/67902428-2724b180-fb37-11e9-9904-558952d2cf66.png)
](https://github.com/Mindspace/react-workshop/blob/finish/rxjs/apps/starter/src/app/ui/contacts/contacts-list.tsx#L41-L55)

<br/>

> For Angular developers, this hook provides the same functionality as the template `async` pipe.

### Dependency Injectors

React does not provide a true _dependency injection_ (DI) infrastructure. In fact, React distorts the View Component hierarchy patterns to provide simulated DI using `<Context.Provider>` + `<Context.Consumer>`.

This implementation provides a programmatic DI that can:

- easily be used at any view level
- supports singleton instances
- supports override (non-singleton) instances
- supports multiple DI providers

Consider this usage:

[![image](https://user-images.githubusercontent.com/210413/67902275-d1e8a000-fb36-11e9-967c-60d2aedc119b.png)
](https://github.com/Mindspace/react-workshop/blob/finish/rxjs/apps/starter/src/app/ui/contacts/contacts-list.tsx#L41)

Where the DI providers were prepared here:

[![image](https://user-images.githubusercontent.com/210413/67991135-30c91a80-fc06-11e9-83f2-efee92f52b32.png)
](https://github.com/Mindspace/react-workshop/blob/finish/rxjs/apps/starter/src/app/%2Bstate/contacts.injector.ts)

> Here is the link to the Injector in [`@mindspace/core`](https://github.com/Mindspace/react-workshop/blob/finish/rxjs/libs/core/src/lib/di/injector.ts)
