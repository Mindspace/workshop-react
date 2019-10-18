## Lab 6: ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎Facades as View Models

Facades allow developers to

- hide complexity
- publish simple API + data models to views
- support 1-way data flows to-from the UI layers

Let's create a `ContactsFacade` that supports the following API:

![](./assets/1595709995307.png)

> Notice that the `ContactsFacade` has an instance of the ContactsService injected into the constructor via DI

<br>

The API maintains the circular, 1-way data flow:

- Data flows outputs (from the facade) are ONLY via streams.
- Inputs are ONLY methods into the Facade

---

<br>

### Tasks

1. Implement the `ContactsFacade` at `libs/contacts/data-access/src/lib/contacts.facade.ts`
2. Ensure you export the Facade from the library public API (see `libs/contacts/data-acess/src/index.ts`)
3. Register the `ContactsFacade` class with the dependency injection (DI) engine (see `libs/contacts/data-access/src/lib/contacts.injector.ts`)
4. Update the `ContactsList` view component to use the `ContactsFacade` instead of the `ContactsService`
5. Update the `ContactDetail` view component to use the `ContactsFacade` instead of the `ContactsService`

<br>

### Code Snippets

##### `libs/contacts/data-access/src/lib/contacts.facade.ts`

![](./assets/1595710010968.png)

<br>

##### `libs/contacts/data-access/src/lib/contacts.injector.ts`

![](./assets/1595710021622.png)

<br>

##### `libs/contacts/ui/src/lib/contacts-list.tsx`

![](./assets/1595710029868.png)

<br>

##### `libs/contacts/ui/src/lib/contact-detail.tsx`

![](./assets/1595710036233.png)

<br>
