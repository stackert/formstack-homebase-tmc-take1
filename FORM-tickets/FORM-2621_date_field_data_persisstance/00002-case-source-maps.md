Running the code base 'npm run dev' (or similar) command.

End-user facing error message:

```
Something went wrong:
Error: Cannot read properties of undefined (reading 'some')
at NotificationRecipients (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:278434:28) at div at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974) at LoadingBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:280604:23) at div at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974) at LoadingBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:280604:23) at NotificationEmailContent (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:277782:35) at ConnectFunction (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73155:85) at div at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974) at ModalSplitViewContent (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:281677:17) at div at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974) at div at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974) at ModalContent (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:4282:24) at div at div at ModalPortal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:70593:5) at Modal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:70277:5) at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974) at ModalContainer (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:4169:5) at Modal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:4077:24) at EmailModal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:286596:19) at Formik (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:157911:19) at C (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:158302:39) at ConnectFunction (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73155:85) at DialogInstance (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:840:5) at DialogLauncher (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:986:5) at ErrorBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:278602:28) at App (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:286247:38) at ConnectFunction (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73155:85) at RenderedRoute (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:251906:5) at RenderErrorBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:251853:5) at dist_DataRoutes (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:253499:5) at Router (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:252574:15) at dist_RouterProvider (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:253282:5) at Provider (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73355:3) at FormSettingsApp
```

Console error:

```
The above error occurred in the <NotificationRecipients> component:

    at NotificationRecipients (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:278434:28)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at LoadingBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:280604:23)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at LoadingBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:280604:23)
    at NotificationEmailContent (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:277782:35)
    at ConnectFunction (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73155:85)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at ModalSplitViewContent (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:281677:17)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at ModalContent (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:4282:24)
    at div
    at div
    at ModalPortal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:70593:5)
    at Modal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:70277:5)
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at ModalContainer (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:4169:5)
    at Modal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:4077:24)
    at EmailModal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:286596:19)
    at Formik (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:157911:19)
    at C (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:158302:39)
    at ConnectFunction (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73155:85)
    at DialogInstance (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:840:5)
    at DialogLauncher (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:986:5)
    at ErrorBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:278602:28)
    at App (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:286247:38)
    at ConnectFunction (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73155:85)
    at RenderedRoute (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:251906:5)
    at RenderErrorBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:251853:5)
    at dist_DataRoutes (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:253499:5)
    at Router (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:252574:15)
    at dist_RouterProvider (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:253282:5)
    at Provider (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73355:3)
    at FormSettingsApp

React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.
```

Console error:

```

Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
```

Console error:

````
fs-networking.ts:211 Warning: Component "t" contains the string ref "el". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref
    at t (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:242296:5997)
    at RichTextEditor (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:121454:5)
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at TextEditorWithFields (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:283185:17)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at OverlayContainer (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:12432:23)
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at LoadingBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:280604:23)
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at FormElement (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:2111:23)
    at Subject (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:278517:25)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at LoadingBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:280604:23)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at LoadingBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:280604:23)
    at NotificationEmailContent (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:277782:35)
    at ConnectFunction (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73155:85)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at ModalSplitViewContent (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:281677:17)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at div
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at ModalContent (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:4282:24)
    at div
    at div
    at ModalPortal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:70593:5)
    at Modal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:70277:5)
    at O (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:82032:18974)
    at ModalContainer (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:4169:5)
    at Modal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:4077:24)
    at EmailModal (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:286596:19)
    at Formik (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:157911:19)
    at C (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:158302:39)
    at ConnectFunction (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73155:85)
    at DialogInstance (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:840:5)
    at DialogLauncher (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:986:5)
    at ErrorBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:278602:28)
    at App (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:286247:38)
    at ConnectFunction (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73155:85)
    at RenderedRoute (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:251906:5)
    at RenderErrorBoundary (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:251853:5)
    at dist_DataRoutes (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:253499:5)
    at Router (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:252574:15)
    at dist_RouterProvider (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings.js:253282:5)
    at Provider (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global.js:73355:3)
    at FormSettingsApp
    ```




````
