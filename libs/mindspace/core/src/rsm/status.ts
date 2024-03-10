export type RestErrorMessage = { memberNames?: string[]; errorMessage: string };
export type RestErrors = RestErrorMessage[];

// ****************************************************
// Store State
// ****************************************************

export type Errors = { errors?: RestErrors };

// ****************************************************
// Status State
// ****************************************************

export declare type StatusState = SuccessState | ErrorState | PendingState | InitializingState;
export interface SuccessState {
  value: 'success';
}
export interface PendingState {
  value: 'pending';
}
export interface InitializingState {
  value: 'initializing';
}
export interface ErrorState {
  value: 'error';
  errors: RestErrors;
}
