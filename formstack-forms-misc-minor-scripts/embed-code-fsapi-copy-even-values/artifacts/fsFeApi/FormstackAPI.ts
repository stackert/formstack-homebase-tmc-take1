/**
 * Core interfaces and types for the Formstack Forms Renderer
 */

// Main form renderer interface
export interface TFSForm {
  render: TRenderForm;
  _store: any;
  _actions: any;
  plugins: any;
}

// Form rendering options
export interface FormRenderOptions {
  id?: string;              // Form ID
  viewkey?: string;         // View key for accessing the form
  target?: string | HTMLElement;  // Where to render the form
  fullscreen?: boolean;     // Whether to render in fullscreen
  width?: number | string;  // Form width
  height?: number | string; // Form height
  noRender?: boolean;       // If true, won't render the form
  baseUrl?: string;         // Base URL for API calls
  submitUrl?: string;       // URL for form submission
  loggingConfig?: TLoggingConfig;
  shouldAutofocusForm?: boolean;
}

// Form configuration interface
export interface FormConfig {
  formResponse?: any;       // Pre-loaded form data
  styles?: any;            // Custom styles
  translations?: any;      // Custom translations
}

// Main Form API interface
export interface IFormApi {
  applyTheme(theme: any): void;
  getPagingContext(): IPagingContext;
  getSection(sectionId: string): ISectionApi;
  getSections(predicate?: (section) => boolean): any[];
  isRendered(): boolean;
  isWithErrors(): boolean;
  registerFormEventListener(listener: IFormEventListener): void;
  unregisterFormEventListener(listener: IFormEventListener): void;
  notifyFormEventListeners(type: FormEvents, data: any): Promise<any>;
  empty(): Promise<void>;
  reset(): Promise<void>;
  setValues(values: { [fieldId: string]: IFieldValueUnion }): Promise<void>;
  getSubmissionJSON(): IValidateFormSubmissionDto;
}

// Field value interfaces
export interface IFieldValueText {
  value?: string;
  confirmValue?: string;
}

export interface IFieldValueName {
  first?: string;
  initial?: string;
  last?: string;
  middle?: string;
  prefix?: string;
  suffix?: string;
}

export interface IFieldValueAddress {
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

// Form events enum
export enum FormEvents {
  Ready = 'ready',
  Submit = 'submit',
  CalculationsComplete = 'calculations-complete',
  ValidationComplete = 'validation-complete',
  NextPage = 'next-page',
  PreviousPage = 'prev-page',
  Error = 'error',
  Change = 'change',
  ChangePage = 'change-page'
} 