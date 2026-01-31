# Security Rules & Governance

This document serves as the "Constitution" for security compliance within this project. It enforces **OWASP Top 10** standards and defensive programming practices.

## 1. API Keys & Secrets Management
- **NEVER** hardcode secrets, API keys, or credentials in the source code.
- Use `.env.local` for local development.
- Access environment variables strictly via `import.meta.env` (Vite) or `process.env` (Node).
- Public variables must be prefixed with `VITE_` (e.g., `VITE_API_URL`).
- **Rule:** Any commit containing a potential secret key will be rejected.

## 2. Cross-Site Scripting (XSS) Prevention
- **React Default Protection:** Rely on React's automatic escaping for data binding.
- **Dangerous Methods:** Avoid `dangerouslySetInnerHTML`. If necessary, sanitize input using a library like `dompurify`.
- **Input Validation:** Validate all user inputs on both client and server sides.

## 3. Cross-Site Request Forgery (CSRF) Protection
- Ensure robust cookie attributes: `SameSite=Strict`, `Secure`, `HttpOnly`.
- Use anti-CSRF tokens for mutating requests (POST, PUT, DELETE) if using session authentication.

## 4. Input Validation & Sanitization
- Validate types, formats, and lengths of all inputs.
- Use Schema/Type validation libraries (e.g., Zod) for form data handling.
- **Tailwind Security:** Do not allow arbitrary class construction from user input. Use the `cn()` utility with predefined secure maps.

## 5. Dependency Management
- Regularly audit dependencies: `npm audit`.
- Pin dependency versions to avoid supply chain attacks via updates.
- Remove unused dependencies to reduce attack surface.

## 6. Authentication & Authorization
- Implement Principle of Least Privilege.
- Use etablished authentication libraries (e.g. Auth0, Clerk, Firebase, NextAuth) rather than rolling your own crypto.

## 7. Component Architecture
- **Shadcn UI:** Keep components lightweight. Avoid installing heavy libraries for single-use cases.
- **CSS:** Use utility classes (Tailwind) to prevent CSS injection attacks.
