
# Angular Shipments Project Documentation

## Overview
This Angular project is a robust and scalable shipment management system designed with maintainability and best practices in mind. It allows users to create, list, update (checkout/deliver), and delete shipments through an intuitive interface. The architecture is modular, follows separation of concerns, and uses **NgRx** for state management, ensuring a predictable and reactive data flow.

---

## Project Structure

```
C:.
├── index.html
├── main.ts
├── styles.scss
└── app
    ├── app.component.*
    ├── app.config.ts
    ├── app.routes.ts
    ├── core
    │   ├── layout
    │   │   └── layout.component.*
    │   └── services
    │       └── api.service.ts
    └── features
        └── shipments
            ├── components
            │   ├── create-shipment
            │   │   └── create-shipment.component.*
            │   └── list-shipments
            │       └── list-shipments.component.*
            ├── models
            │   └── shipment.model.ts
            ├── services
            │   └── shipment.service.ts
            └── store
                ├── shipment-action-types.enum.ts
                ├── shipments.actions.ts
                ├── shipments.effects.ts
                ├── shipments.reducer.ts
                ├── shipments.selectors.ts
                └── shipments.state.ts
```

---

## Core Module

### `api.service.ts`
A centralized, reusable HTTP abstraction layer to communicate with backend APIs:
- Supports `GET`, `POST`, `PATCH`, and `DELETE` requests.
- Reduces boilerplate by unifying API access logic.
- Handles errors and allows for global HTTP behavior handling (e.g., loading spinners, auth).

```ts
get<T>(endpoint: string, options?: HttpOptions): Observable<T>
post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T>
patch<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T>
delete<T>(endpoint: string, options?: HttpOptions): Observable<T>
```

---

## Layout

The layout module provides a centralized structure for the UI shell of the application:
- Ensures consistent user experience.
- Simplifies reuse of shared structural components (e.g., header, sidebar, footer).

---

## Features - Shipments

### Components
- **`CreateShipmentComponent`**  
  A form-based UI component for creating a new shipment. Uses reactive forms and validation to ensure data integrity.

- **`ListShipmentsComponent`**  
  Displays a paginated and interactive list of shipments. Supports actions like checkout, deliver, and delete with real-time state updates via NgRx.

### Model
Defines a clear data contract used across the app for strong typing and maintainability.

```ts
export interface Shipment {
  id: string;
  trackingId: string;
  phoneNumber: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
```

### Service - `shipment.service.ts`

Encapsulates business logic and communicates with the backend via `ApiService`. Keeps the component layer clean and focused on UI.

```ts
getAllShipments(page = 1, limit = 10): Observable<ShipmentsResponse>
createShipment(shipmentData): Observable<any>
checkoutShipment(id: string): Observable<Shipment>
deliverShipment(id: string): Observable<Shipment>
deleteShipment(id: string): Observable<void>
```

---

## State Management (NgRx)

A robust state management setup using the NgRx library ensures a reactive and testable architecture.

### `shipment-action-types.enum.ts`
- Enumerates action types to reduce bugs and enforce consistency.

### `shipments.actions.ts`
- Defines actions to load, create, update, and delete shipments.
- Ensures all asynchronous flows are clearly represented.

```ts
loadShipments, loadShipmentsSuccess, loadShipmentsFailure
createShipment, createShipmentSuccess, createShipmentFailure
checkoutShipment, checkoutShipmentSuccess, checkoutShipmentFailure
deliverShipment, deliverShipmentSuccess, deliverShipmentFailure
deleteShipment, deleteShipmentSuccess, deleteShipmentFailure
```

### `shipments.effects.ts`
- Manages side-effects (API calls, routing, notifications).
- Handles success/failure flows and reduces logic inside components.

### `shipments.reducer.ts`
- Updates the state based on dispatched actions.
- Separates state logic from UI logic, improving testability.

### `shipments.selectors.ts`
- Provides optimized, memoized access to the store.
- Allows reusable state queries like:
  - `selectAllShipments`
  - `selectLoading`
  - `selectError`

### `shipments.state.ts`
Defines a rich and scalable structure of the shipment state:

```ts
interface ShipmentState {
  shipments: Shipment[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}
```

---

## Strengths of the Project

- **Highly Modular Architecture**: Separation of core logic, features, and shared services enables code reusability and easier maintenance.
- **Centralized State Management (NgRx)**: Scalable and predictable data flow, ideal for complex business logic.
- **Clean Abstraction Layers**:
  - `ApiService` abstracts HTTP logic.
  - Feature services encapsulate domain-specific business logic.
- **Testability**: The app is well-suited for unit and integration testing due to clean separation of concerns and reactive state.
- **Scalability**: Easily extendable to support more features or different entities beyond shipments.
- **Performance-Oriented**: Uses memoized selectors and effect-based side-effect handling to reduce redundant computations.
- **Best Practices Applied**:
  - Strict type usage via models and interfaces.
  - Strong error handling and loading state tracking.
- **User Experience**: Clean layout system, pagination, and action feedback mechanisms ensure a smooth and responsive UX.

---

## Summary

This Angular shipment management system stands out as a well-architected, maintainable, and scalable solution. Its design follows modern Angular practices, such as modular structure, reactive programming, and clean abstractions. It’s ideal for applications that require robust CRUD operations, centralized state management, and extendability.
