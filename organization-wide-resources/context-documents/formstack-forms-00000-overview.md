# Formstack Application Architecture

## Overview

> **Naming Convention:** Throughout this document, we use uppercase to refer to specific codebases/services:
>
> - WEB: Backend application
> - FORM: Public form frontend
> - WEB_FRONTEND: Form builder UI
> - FSID: Authentication service

Formstack's Forms product is distributed across four primary codebases, each serving a distinct purpose in the application ecosystem:

### 1. WEB (Backend Application)

**Location:** `../web`, https://github.com/formstack/web

- Core backend application handling business logic
- Manages data persistence (forms, submissions, etc.)
- Provides API endpoints for form management and submission processing
- Handles server-side validation and processing
- Manages integrations with third-party services

### 2. FORM (Public Form Frontend)

**Location:** `../form`, https://github.com/formstack/form

- Public-facing application for form submissions
- Modern React-based implementation (v4)
- Maintains compatibility with legacy Smarty templates (v3)
- Handles form submission collection
- Optimized for high performance and accessibility
- Usually no authentication required - designed for public form respondents

### Version Evolution

- V3 (Legacy):
  - Server-side rendered using Smarty templates
  - Located in /tmpl/forms/3/\* directories
  - Still maintained for backward compatibility
- V4 (Current):
  - React-based frontend application
  - Located in the forms repository
  - Preferred implementation for new forms
  - Provides improved performance and maintainability

### Migration Status

The application is in an ongoing migration from v3 (Smarty templates) to v4 (React). While most new development occurs in v4, some legacy templates remain active. Developers should:

- Build new features in v4
- Migrate v3 templates when touching legacy code
- Be aware of version-specific behaviors when debugging

### 3. WEB_FRONTEND (Form Builder UI)

**Location:** `../web-frontend`, https://github.com/formstack/web-frontend

- Customer-facing application for form creation and management
- Provides form builder interface
- Submission management and reporting
- Account settings and user management
- Integration configuration
- Requires authentication through FSID

### 4. FSID (Authentication Service)

**Location:** Black-boxed, documented in forms-authentication.yml

- Centralized authentication and authorization service
- Manages user sessions across Formstack products
- Handles SSO (Single Sign-On) integration
- OAuth2 provider for the ecosystem
- Role-based access control

#### 4.1 Black-Boxed

I believe the Forms/FSID communications is mostly handled through the sdk package
https://github.com/formstack/sso-sdk-php (See context-documents/context-documentation-fsid-00000-overview.md for more details about FSID)

## Key Integration Points

### Authentication Flow

1. Customers access WEB_FRONTEND requiring authentication
2. FSID handles authentication through:
   - Platform SSO (/admin/platform-sso/start)
   - Third-party providers (/admin/session/authprovider_api/{providerId})
   - OAuth2 flow (/oauth/authorize)

### Inter-service Communication

- WEB_FRONTEND → WEB: API calls for form creation, management, and submission access
- FORM → WEB: API calls for form rendering and submission processing
- WEB_FRONTEND → FSID: Authentication and session management
- FORM → FSID: No direct interaction (public facing)

- It should be noted authentication can be a little complex and it doesn't always follow a simple flow.

### Data Flow

1. Form Creation: Customer uses WEB_FRONTEND to build form → WEB stores configuration
2. Form Display: FORM service fetches configuration from WEB → renders public form
3. Form Submission: End user submits via FORM → WEB processes and stores
4. Submission Management: Customer views/manages submissions via WEB_FRONTEND → WEB provides data
5. Authentication: WEB_FRONTEND validates sessions with FSID

## Security Boundaries

- Public Access: FORM service only (no auth required)
- Customer Access: WEB_FRONTEND (requires authentication)
- API Access: WEB service (requires authentication)
- Authentication: Centralized through FSID

This architecture enables clear separation between public form submission (FORM), customer form management (WEB_FRONTEND), and core business logic (WEB), while maintaining secure authentication (FSID).
