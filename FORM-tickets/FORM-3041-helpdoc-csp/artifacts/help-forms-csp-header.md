# Updating Your Content Security Policy for Formstack Forms

When embedding Formstack forms on websites with Content Security Policy (CSP) enabled, you'll need to configure your CSP to allow specific resources that Forms V4 requires to function properly. This guide will help you update your CSP configuration to ensure your embedded forms work correctly while maintaining your site's security.

## Required CSP Directives

Add the following directives to your site's Content Security Policy. Replace `[ACCOUNT_ALIAS]` with your Formstack account subdomain.

### Essential Domains

```http
default-src 'self';
script-src 'self' https://[ACCOUNT_ALIAS].formstack.com https://ajax.googleapis.com https://code.jquery.com;
style-src 'self' https://[ACCOUNT_ALIAS].formstack.com https://fonts.googleapis.com;
frame-src 'self' https://[ACCOUNT_ALIAS].formstack.com;
img-src 'self' https://[ACCOUNT_ALIAS].formstack.com data:;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://[ACCOUNT_ALIAS].formstack.com;
```

### Additional Features

If you're using additional Formstack features, you may need to allow these domains:

#### Payment Processing (Stripe)

```http
script-src: https://js.stripe.com
frame-src: https://js.stripe.com
```

#### File Upload Preview

```http
img-src: https://*.amazonaws.com
```

#### Google Analytics Integration

```http
script-src: https://www.googletagmanager.com
```

## Common Issues and Solutions

### Form Not Loading

If your form isn't loading, check your browser's console for CSP violation messages. These messages will indicate which resources are being blocked. Common patterns:

```
Refused to load the script 'https://[ACCOUNT_ALIAS].formstack.com/...' because it violates the following Content Security Policy directive...
```

### Images Not Displaying

If images in your form (such as logos or field icons) aren't displaying, ensure your `img-src` directive includes both the Formstack domain and `data:` for inline images:

```http
img-src 'self' https://[ACCOUNT_ALIAS].formstack.com data:;
```

### Custom Fonts Not Loading

If you're using custom fonts in your form theme, make sure your `font-src` directive includes Google Fonts domains:

```http
font-src 'self' https://fonts.gstatic.com;
```

## Testing Your Configuration

1. Open your browser's developer tools (F12 in most browsers)
2. Navigate to the Console tab
3. Load your page with the embedded form
4. Look for any CSP violation messages
5. Add any missing domains to your CSP as needed

## Need Help?

If you're still experiencing issues after implementing these directives, check your browser's console for specific CSP violation messages. These messages will indicate exactly which resources need to be allowed in your CSP configuration.

Contact Formstack Support if you need additional assistance with your CSP configuration.
